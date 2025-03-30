import React from 'react';

import HeaderBurgur from '@/components/HeaderBurgur';

function page() {
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Your event' />
      <div className='my-7 flex w-full justify-center px-5'></div>
    </div>
  );
}

export default page;
