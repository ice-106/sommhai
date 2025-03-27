import React from 'react';

import HeaderBurgur from '@/components/HeaderBurgur';

function HomePage(): React.ReactElement {
  return (
    <div className='bg-g flex h-full w-screen flex-col'>
      <HeaderBurgur name='Home' />
    </div>
  );
}

export default HomePage;
