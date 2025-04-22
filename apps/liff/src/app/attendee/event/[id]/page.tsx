'use client';
import { Circle, User } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import AtdEventText from '@/components/attendee/event/AtdEventText';
import AtdMessage from '@/components/attendee/event/AtdMessageText';
import { AcceptButton } from '@/components/common/acceptdeny-button';
import AddtoCalendar from '@/components/common/AddtoCalendar-Button';
import HeaderBurgur from '@/components/common/HeaderBurgur';

export default function AtdEventPage() {
  const params = useParams();
  const id = params?.id as string;
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={id} />
      <div className='flex flex-1 flex-col items-center justify-between gap-24 px-24 py-16'>
        <div className='bg-orange-3 flex h-[420px] w-[300px] flex-col justify-center justify-items-center text-center'>
          <Image alt={'Event Picture'} height='420' src={'/file.svg'} width='300' />
        </div>
        <div className='flex flex-col items-center justify-center gap-24'>
          <AtdEventText />
        </div>
        <div className='flex flex-col items-center justify-center gap-24'>
          <AtdMessage />
          <div className='mt-[-15px] flex w-full items-center justify-center gap-16'>
            <Circle className='text-grey-light bg-grey-light border-grey-light !size-36 rounded-full border-[3px]'>
              <User className='text-black-pure' />
            </Circle>
            <h1 className='text-bold-20'>Organizer A</h1>
          </div>
        </div>
        <div className='flex h-[122px] w-[292px] flex-col items-center justify-center'>
          <AddtoCalendar />
        </div>
        <div className='mt-[-15px] flex h-[100px] w-full items-center justify-center gap-[29px]'>
          <AcceptButton className='h-[64px] w-[155px]' variant={'Accept'}>
            Accept
          </AcceptButton>
          <AcceptButton className='h-[64px] w-[155px]' variant={'Deny'}>
            Deny
          </AcceptButton>
        </div>
      </div>
    </div>
  );
}
