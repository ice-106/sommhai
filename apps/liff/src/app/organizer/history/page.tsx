import { Button } from '@sommhai/ui/components/ui/button';
import React from 'react';

import HeaderBurgur from '@/components/HeaderBurgur';

function page() {
  return (
    <div className='bg-g flex h-full w-screen flex-col'>
      <HeaderBurgur name='History' />
      <Button></Button>
    </div>
  );
}

export default page;
