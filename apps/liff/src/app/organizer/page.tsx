import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { Suspense } from 'react';

import CreateEvent from '@/components/CreateEvent';
import HeaderBurgur from '@/components/HeaderBurgur';

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
    <div className='bg-g flex h-screen w-screen flex-col justify-start'>
      <HeaderBurgur name='Home' />
      <div className='my-5 flex max-h-5 w-full items-center gap-2 px-7'>
        <Suspense fallback={<div className='flex-1'>Loading search...</div>}>
          <SearchContainer />
        </Suspense>
        <SlidersHorizontal />
      </div>
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <CreateEvent />
      </div>
    </div>
  );
}

export default OrganizerPage;
