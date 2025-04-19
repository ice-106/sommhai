import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { Suspense } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import CreateEvent from '@/components/organizer/CreateEventbutton';
import { EventCardTestStatic } from '@/components/organizer/EventCard';

const SearchContainer = () => {
  // Using dynamic import with React.lazy for the component using useSearchParams
  const Search = React.lazy(() => import('@/components/organizer/Search'));

  return (
    <Suspense fallback={<Loading />}>
      <Search placeholder='Search...' />
    </Suspense>
  );
};

function OrganizerPage() {
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Home' />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer />
        <SlidersHorizontal />
      </div>
      <div className='my-5 flex w-full items-center justify-center px-7'>
        <CreateEvent />
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
