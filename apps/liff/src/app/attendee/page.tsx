'use client';
import { SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';

const SearchContainer = () => {
  // Using dynamic import with React.lazy for the component using useSearchParams
  const Search = React.lazy(() => import('@/components/attendee/Search'));

  return (
    <Suspense fallback={<Loading />}>
      <Search placeholder='Search...' />
    </Suspense>
  );
};

import { Events } from '@sommhai/shared-type/src';

import AtdEventCard from '@/components/attendee/AtdEventCard';
import { API_BASE_URL } from '@/env';

const EventContainer = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function fetchEvents() {
      try {
        const res = fetch(`${API_BASE_URL}/atd/events`, {
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
        <AtdEventCard date={event.date} key={event.eid} link={event.eid} name={event.name} />
      ))}
    </>
  );
};

function OrganizerPage() {
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Your Events' />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer />
        <SlidersHorizontal />
      </div>
      <div className='mx-24 flex h-[69%] flex-col gap-16 overflow-y-auto'>
        <EventContainer />
      </div>
    </div>
  );
}

export default OrganizerPage;
