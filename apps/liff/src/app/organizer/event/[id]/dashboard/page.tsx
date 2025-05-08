'use client';
import { Answer, Invite } from '@sommhai/shared-type/src';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import { PreferChart } from '@/components/organizer/dashboard/BarChart';
import { CollabsibleAccepted, CollabsibleDenied } from '@/components/organizer/dashboard/Collabsible';
import ParticipantCard from '@/components/organizer/dashboard/ParticipantCard';
import { SearchContainer } from '@/components/organizer/Search';
import { API_BASE_URL } from '@/env';

function DashboardPage() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<Invite[]>([]);
  const [answer, setAnswer] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadQuestion, setLoadQuestion] = useState(true);
  const [attendee, setAttendee] = useState<Invite[]>([]);
  const [notAttendee, setNotAttendee] = useState<Invite[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (loading) {
      fetch(`${API_BASE_URL}/org/events/${id}/invites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.invites);
          if (data.invites.length > 0) {
            setAttendee(data.invites.filter((invite: Invite) => invite.accept === true));
            setNotAttendee(data.invites.filter((invite: Invite) => invite.accept === false));
          }
          console.log('data', data);
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    const getData = () => {
      fetch(`${API_BASE_URL}/org/events/${id}/questions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAnswer(data);
          console.log('answer', data);
          setLoading(false);
        });
    };
    if (loadQuestion) getData();
  }, [loadQuestion]);

  return (
    <div className='bg-white-bg flex min-h-screen w-screen flex-col'>
      <HeaderBurgur name='Dashboard' />

      <ParticipantCard invites={data} />
      <PreferChart data={answer} />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer placeholder='Search...' onSearch={handleSearch} />
      </div>
      <CollabsibleAccepted answers={answer} invites={attendee} searchQuery={searchQuery} />
      <CollabsibleDenied invites={notAttendee} searchQuery={searchQuery} />
      <div className='mt-[19px]'></div>
    </div>
  );
}

export default DashboardPage;
