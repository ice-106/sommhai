import { Button } from '@sommhai/ui/components/ui/button';
import React from 'react';

function CreateEvent() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='inline-flex'>
        <Button className='bg-orange-3 relative h-[56px] w-[345px] items-center justify-between rounded-3xl p-4 text-2xl font-semibold hover:bg-[#F8CF52]'>
          <div>Create Event</div>
          <div>+</div>
        </Button>
      </div>
    </div>
  );
}

export default CreateEvent;
