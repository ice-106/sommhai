'use client';
import { SlidersHorizontal } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Suspense } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import CreateEvent from '@/components/organizer/CreateEvent';

const SearchContainer = () => {
  // Using dynamic import with React.lazy for the component using useSearchParams
  const Search = React.lazy(() => import('@/components/organizer/Search'));

  return (
    <Suspense fallback={<Loading />}>
      <Search placeholder='Search...' />
    </Suspense>
  );
};

import { Events } from '@sommhai/shared-type/src';

import EventCard from '@/components/organizer/EventCard';
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
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='flex h-full w-full flex-col gap-5 overflow-y-auto'>
      {events.map((event) => (
        <EventCard key={event.eid} link={event.eid} name={event.name} />
      ))}
    </div>
  );
};

function OrganizerPage() {
  // const session = useSession();
  // const router = useRouter();
  // const [loaded, setLoad] = React.useState(false);
  // useEffect(() => {
  //   if (session.status === 'unauthenticated') {
  //     router.push('/auth');
  //     setLoad(true);
  //   }
  // }, []);
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Home' />
      <div className='mt-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer />
        <SlidersHorizontal />
      </div>
      <div className='mt-5 flex w-full items-center justify-center px-7'>
        <CreateEvent />
      </div>
      <div className='w-ful mx-24 flex h-[69%] flex-col gap-16 overflow-y-auto'>
        <EventContainer />
      </div>
    </div>
  );
}

export default OrganizerPage;
