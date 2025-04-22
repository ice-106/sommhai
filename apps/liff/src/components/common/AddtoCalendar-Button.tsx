'use client';
import { Button } from '@sommhai/ui/components/ui/button';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

function AddtoCalendar() {
  return (
    <Link className='flex h-[122px] w-[292px] flex-col' href='/reminder'>
      <Button className='bg-orange-2 hover:bg-orange-3-hover text-black-pure border-orange-3 mt-[-16px] h-full w-full flex-col items-start rounded-3xl border-[3px] text-2xl font-medium'>
        <div className='text-white-bg w-full items-start justify-items-center truncate'>
          Add to Calendar
          <Calendar className='text-white-bg !size-40' />
        </div>
      </Button>
    </Link>
  );
}

export default AddtoCalendar;
