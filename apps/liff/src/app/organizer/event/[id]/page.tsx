'use client';
import { useParams } from 'next/navigation';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import { DeleteEventButton } from '@/components/organizer/buttons';
import CompleteButton from '@/components/organizer/completeButton';
import { IconButtonGroup } from '@/components/organizer/iconbutton';

export default function EventPage() {
  const param = useParams();
  // Extract event id from the params object
  const id = param.id as string;
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={'My Event'} />
      <div className='mt-[10px] flex flex-1 flex-col justify-between px-24 py-16'>
        <IconButtonGroup />

<<<<<<< HEAD
        <div className='my-16 flex w-full flex-col items-center justify-center gap-4'>
          <DeleteEventButton id={id} />
          <CompleteButton eid={id} />
=======
        <div className='my-16 w-full'>
          <DeleteEventButton id={id} />
>>>>>>> 0247e9b (feat: delete button integration)
        </div>
      </div>
    </div>
  );
}
