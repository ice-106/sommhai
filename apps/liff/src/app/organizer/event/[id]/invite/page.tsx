'use client';
import { useParams } from 'next/navigation';
import React from 'react';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import SelectAll from '@/components/common/SelectAll';

const SearchContainer = () => {
  const Search = React.lazy(() => import('@/components/organizer/Search'));

  return (
    <Suspense fallback={<Loading />}>
      <Search placeholder='Search...' />
    </Suspense>
  );
};

import { Attendee } from '@sommhai/shared-type/src';

import AttendeeCard from '@/components/organizer/event/invite/AttendeeCard';
import { API_BASE_URL } from '@/env';

const AttendeeContainer = () => {
  const [Attendee, setAttendee] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id as string;
  useEffect(() => {
    function fetchEvents() {
      try {
        const res = fetch(`${API_BASE_URL}/org/events/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log(data.attendees);
            setAttendee(data.attendees);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {Attendee.map((attendee) => (
        <AttendeeCard key={attendee.uid} name={attendee.uid} />
      ))}
    </>
  );
};

function InvitePage() {
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Who to invite?' />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer />
      </div>
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SelectAll />
      </div>
      <div className='mx-24 flex h-[69%] w-full flex-col items-center gap-16 overflow-y-auto'>
        <AttendeeContainer />
      </div>
    </div>
  );
}
export default InvitePage;
