import { SlidersHorizontal } from 'lucide-react';
import React from 'react';

import HeaderBurgur from '@/components/HeaderBurgur';
import CreateEventButton from '@/components/landing/organizer/button';
import Search from '@/components/Search';

function page() {
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Home' />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <Search placeholder='Search...' />
        <SlidersHorizontal />
      </div>
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <CreateEventButton />
      </div>
    </div>
  );
}

export default page;
