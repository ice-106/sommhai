'use client';

import { Events } from '@sommhai/shared-type/src';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import { DeleteEventButton } from '@/components/organizer/buttons';
import CompleteButton from '@/components/organizer/completeButton';
import { IconButtonGroup } from '@/components/organizer/iconbutton';
import { API_BASE_URL } from '@/env';

export default function EventPage() {
  const param = useParams();
  const [event, setEvent] = useState<Events | null>(null);
  const id = param.id as string;

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
  if (!event) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={'My Event'} />
      <div className='mt-[10px] flex flex-1 flex-col justify-between px-24 py-16'>
        <IconButtonGroup event={event} />

        <div className='my-16 flex w-full flex-col items-center justify-center gap-4'>
          <DeleteEventButton id={id} />
          <CompleteButton eid={id} />
        </div>
      </div>
    </div>
  );
}
