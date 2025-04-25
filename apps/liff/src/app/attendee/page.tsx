'use client';
import { SlidersHorizontal } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
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
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

const EventContainer = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(LiffContext);

  useEffect(() => {
    function fetchEvents() {
      try {
        const res = fetch(`${API_BASE_URL}/org/events?userId=${userId}`, {
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
  }, [userId]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='flex h-full w-full flex-col gap-5 overflow-y-auto'>
      {events.map((event) => (
        <AtdEventCard
          date={typeof event.date === 'string' ? new Date(event.date) : (event.date ?? new Date())}
          detail={event.description ?? ''}
          key={event.eid}
          link={event.eid}
          name={event.name}
        />
      ))}
    </div>
  );
};

function OrganizerPage() {
  return (
    <div className='flex h-full w-full flex-col'>
      <HeaderBurgur name='Your Events' />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer />
        <SlidersHorizontal />
      </div>
      <div className='mx-24 flex h-[75%] w-full flex-col gap-16 overflow-y-auto pt-12'>
        <EventContainer />
      </div>
    </div>
  );
}

export default OrganizerPage;
