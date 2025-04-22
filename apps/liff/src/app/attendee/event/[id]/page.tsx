'use client';
import { Events } from '@sommhai/shared-type/src';
import { Circle, User } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import DetailForm from '@/components/attendee/Detail';
import Message from '@/components/attendee/Message';
import { AcceptButton } from '@/components/common/acceptdeny-button';
import AddtoCalendar from '@/components/common/AddtoCalendar-Button';
import HeaderBurgur from '@/components/common/HeaderBurgur';
import { API_BASE_URL } from '@/env';

export default function AtdEventPage() {
  const params = useParams();
  const id = params?.id as string;
  const [event, setEvent] = useState<Events | null>(null);
  useEffect(() => {
    console.log(event);
    fetch(`${API_BASE_URL}/org/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const eventData = {
          ...data,
          date: new Date(data.date).toISOString().split('T')[0], // Ensure date is formatted for input
        };
        setEvent(eventData as Events);
      });
  }, [id]);
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={'Events'} />
      <div className='flex flex-1 flex-col items-center justify-between gap-24 px-24 py-16'>
        <div className='flex flex-col items-center justify-center gap-24'>
          <DetailForm eid={id} />
        </div>
        <div className='flex flex-col items-center justify-center gap-24'>
          <Message message={event?.message ?? ''} />
          <div className='mt-[-15px] flex w-full items-center justify-center gap-16'>
            <Circle className='text-grey-light bg-grey-light border-grey-light !size-36 rounded-full border-[3px]'>
              <User className='text-black-pure' />
            </Circle>
            <h1 className='text-bold-20 py-2'>{event?.host}</h1>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
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
        <div className='flex flex-col items-center justify-center gap-24'>
          <AtdMessage />
          <div className='mt-[-15px] flex w-full items-center justify-center gap-16'>
            <Circle className='text-grey-light bg-grey-light border-grey-light !size-36 rounded-full border-[3px]'>
              <User className='text-black-pure' />
            </Circle>
            <h1 className='text-bold-20'>Organizer A</h1>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
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
