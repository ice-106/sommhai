'use client';
import { Invite } from '@sommhai/shared-type/src';
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

  useEffect(() => {
    fetch(`${API_BASE_URL}/org/events/${id}/invites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log('data', data);
      });
  });

  return (
    <div className='bg-white-bg flex min-h-screen w-screen flex-col'>
      <HeaderBurgur name='Dashboard' />

      <ParticipantCard invites={data} />
      <PreferChart invites={data} />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer placeholder='Search...' />
      </div>
      <CollabsibleAccepted invites={data} />
      <CollabsibleDenied invites={data} />
      <div className='mt-[19px]'></div>
    </div>
  );
}

export default DashboardPage;
