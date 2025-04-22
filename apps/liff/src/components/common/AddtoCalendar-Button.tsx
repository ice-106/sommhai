'use client';
import { Button } from '@sommhai/ui/components/ui/button';

function AddtoCalendar() {
  return (
    <div className='flex h-full w-full flex-col justify-center text-start'>
      <Button className='bg-orange-2 hover:bg-orange-3-hover text-black-pure mt-[16px] h-full w-full items-start rounded-3xl text-2xl font-medium'>
        <div className='text-white-bg w-full truncate'>Add to Calendar</div>
      </Button>
    </div>
  );
}

export default AddtoCalendar;
