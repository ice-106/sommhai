import Link from 'next/link';
import React from 'react';

import EventCard from '@/components/EventCard';

function HomePage(): React.ReactElement {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>HomePage</h1>
      <Link href='/event/create'>
        <h1 className='font-bold text-blue-500'>Create an event</h1>
      </Link>
      <div>
        <EventCard />
      </div>
    </div>
  );
}

export default HomePage;
