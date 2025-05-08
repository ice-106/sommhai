'use client';

import { Events } from '@sommhai/shared-type/src';
import { Button } from '@sommhai/ui/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import CompleteButton from '@/components/organizer/completeButton';
import { IconButtonGroup } from '@/components/organizer/iconbutton';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

export default function EventPage() {
  const param = useParams();
  const [event, setEvent] = useState<Events | null>(null);
  const id = param.id as string;
  const { userId } = useContext(LiffContext);

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
    return <Loading />;
  }
  if (userId !== event.host_uid) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-2 text-wrap px-8 text-center text-2xl font-bold'>
        You are not authorized to edit this event
        <Link href={'/organizer'}>
          <Button>
            <Home className='mr-2 h-4 w-4' />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className='flex h-full w-full flex-col'>
      <HeaderBurgur name={'Organizing Event'} />
      <div className='mt-[10px] flex flex-1 flex-col justify-between px-24 py-16'>
        <IconButtonGroup event={event} />

        <div className='my-16 flex w-full flex-col items-center justify-center gap-4'>
          {/* <DeleteEventButton id={id} /> */}
          <CompleteButton eid={id} />
        </div>
      </div>
    </div>
  );
}
