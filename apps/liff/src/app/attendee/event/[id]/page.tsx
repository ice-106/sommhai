'use client';
import { useParams } from 'next/navigation';

import AtdEventText from '@/components/attendee/event/AtdEventText';
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
        <div>
          <AtdEventText />
        </div>
      </div>
    </div>
  );
}
