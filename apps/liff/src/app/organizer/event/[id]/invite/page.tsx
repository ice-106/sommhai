'use client';
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

import { Events } from '@sommhai/shared-type/src';

import EventCard from '@/components/organizer/EventCard';
import { API_BASE_URL } from '@/env';

const AttendeeContainer = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function fetchEvents() {
      try {
        const res = fetch(`${API_BASE_URL}/org/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setEvents(data);
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
      {events.map((event) => (
        <EventCard key={event.eid} link={event.eid} name={event.name} />
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
