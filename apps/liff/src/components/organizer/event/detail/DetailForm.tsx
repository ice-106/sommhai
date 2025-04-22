'use client';
import type { Events } from '@sommhai/shared-type/src';
import { useEffect, useState } from 'react';

import EventTextForm from '@/components/organizer/event/detail/EventTextForm';
import MessageForm from '@/components/organizer/event/detail/MessageForm';
import { SlidePopUpX } from '@/components/organizer/event/detail/SlidePopup';
import { API_BASE_URL } from '@/env';

interface DetailFormProp {
  page: number;
  onClose: () => void;
  eid: string;
}

function DetailForm({ page, onClose, eid }: DetailFormProp) {
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
          res.json().then((data) => {
            setEvent(data as Events);
          });
        } else {
          console.error('Failed to fetch event details');
        }
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, []);
  return (
    <div className='h-full w-full'>
      {page === 2 && (
        <div className='bg-white-bg'>
          <SlidePopUpX onClose={onClose}>
            {event ? (
              <EventTextForm
                address={event?.location}
                date={event?.date.toDateString()}
                description={event?.description ?? ''}
                name={event?.name}
              />
            ) : (
              <div className='bg-white-pure flex h-[50vh] w-[80vw] items-center justify-center rounded-2xl'>
                {' '}
                Fetching...
              </div>
            )}
          </SlidePopUpX>
        </div>
      )}
      {page === 3 && (
        <div>
          <SlidePopUpX onClose={onClose}>
            <MessageForm />
          </SlidePopUpX>
        </div>
      )}
    </div>
  );
}

export default DetailForm;
