'use client';
import type { Events } from '@sommhai/shared-type/src';
import { useEffect, useState } from 'react';

import EventText from '@/components/attendee/EventText';
import { API_BASE_URL } from '@/env';

interface DetailFormProp {
  eid: string;
}

function DetailForm({ eid }: DetailFormProp) {
  const [event, setEvent] = useState<Events | null>(null);
  useEffect(() => {
    const data = fetch(`${API_BASE_URL}/org/events/${eid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('Event details fetched successfully');
          return res.json();
        } else {
          console.error('Failed to fetch event details');
        }
      })
      .then((data) => {
        setEvent(data as Events);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, []);
  return (
    <div className='h-full w-full px-8'>
      <div className='bg-orange-6 flex w-full items-center justify-center rounded-3xl'>
        {event ? (
          <EventText
            address={event?.location ?? ''}
            date={event?.date.toString().split('T')[0] ?? ''}
            description={event?.description ?? ''}
            name={event?.name}
          />
        ) : (
          <div className='bg-white-pure flex h-[50vh] w-[80vw] items-center justify-center rounded-2xl'>
            {' '}
            Fetching...
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailForm;
