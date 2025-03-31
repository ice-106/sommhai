import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { Suspense } from 'react';

import HeaderBurgur from '@/components/HeaderBurgur';
import { CreateEventButton } from '@/components/ui/organizer/button';
import { EventCardTestStatic } from '@/components/ui/organizer/EventCard';

const SearchContainer = () => {
  // Using dynamic import with React.lazy for the component using useSearchParams
  const Search = React.lazy(() => import('@/components/Search'));

  return (
    <Suspense fallback={<div className='h-10 flex-1 animate-pulse rounded bg-gray-100'>Loading...</div>}>
      <Search placeholder='Search...' />
    </Suspense>
  );
};

function OrganizerPage() {
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Home' />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <Suspense fallback={<div className='flex-1'>Loading search...</div>}>
          <SearchContainer />
        </Suspense>
        <SlidersHorizontal />
      </div>
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <CreateEventButton />
      </div>
      <div className='mx-24 flex h-[69%] flex-col gap-16 overflow-y-auto'>
        <EventCardTestStatic />
        <EventCardTestStatic />
        <EventCardTestStatic />
        <EventCardTestStatic />
        <EventCardTestStatic />
        <EventCardTestStatic />
        <EventCardTestStatic />
      </div>
    </div>
  );
}

export default OrganizerPage;
