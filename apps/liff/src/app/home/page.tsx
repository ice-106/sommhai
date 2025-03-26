import Link from 'next/link';
import React from 'react';

function HomePage(): React.ReactElement {
  return (
    <div className='bg-g flex h-full w-screen flex-col items-center justify-center'>
      <h1>HomePage</h1>
      <Link href='/event/create'>
        <h1 className='font-bold text-blue-500'>Create an event</h1>
      </Link>
      <div className='h-400 flex w-full bg-red-200'>hi</div>
    </div>
  );
}

export default HomePage;
