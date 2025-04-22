'use client';
import { Circle, User } from 'lucide-react';
import { useParams } from 'next/navigation';

import AtdEventText from '@/components/attendee/event/AtdEventText';
import AtdMessage from '@/components/attendee/event/AtdMessageText';
import HeaderBurgur from '@/components/common/HeaderBurgur';

export default function AtdEventPage() {
  const params = useParams();
  const id = params?.id as string;
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={id} />
      <div className='flex flex-1 flex-col items-center justify-between gap-24 px-24 py-16'>
        <div className='bg-orange-3 flex h-[420px] w-[300px] flex-col justify-center text-center'>
          <h1 className='text-semi-24'>Photo</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-24'>
          <AtdEventText />
        </div>
        <div className='flex flex-col items-center justify-center gap-24'>
          <AtdMessage />
          <div className='flex w-full items-center justify-center gap-16'>
            <Circle className='text-grey-light fill-grey-light'>
              <User className='text-black-pure !size-40' />
            </Circle>
            <h1 className='text-bold-20'>Organizer A</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
