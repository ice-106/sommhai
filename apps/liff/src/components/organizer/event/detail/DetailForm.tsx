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
    fetch(`${API_BASE_URL}/org/events/${eid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const eventData = {
          ...data,
          date: new Date(data.date).toISOString().split('T')[0],
        };
        setEvent(eventData as Events);
      });
  }, [eid]);
  const handleSaveEventDetails = (updatedData: {
    name: string;
    address: string;
    date: string;
    description: string;
  }) => {
    setEvent((prev) =>
      prev
        ? {
            ...prev,
            ...updatedData,
            date: new Date(updatedData.date),
          }
        : null,
    );
    console.log('updatedData', new Date(updatedData.date).toLocaleDateString());
    fetch(`${API_BASE_URL}/org/events/${eid}/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedData.name,
        location: updatedData.address,
        description: updatedData.description,
        date: new Date(updatedData.date).toLocaleDateString(),
      }),
    }).then(() => {
      setEvent((prev) =>
        prev
          ? {
              ...prev,
              ...updatedData,
              date: new Date(updatedData.date),
            }
          : null,
      );
      onClose();
    });
  };

  const handleSaveMessage = (message: string) => {
    setEvent((prev) => (prev ? { ...prev, message } : null));
    fetch(`${API_BASE_URL}/org/events/${eid}/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    }).then(() => {
      setEvent((prev) => (prev ? { ...prev, message } : null));
      onClose();
    });
  };

  return (
    <div className='h-full w-full'>
      {page === 2 && (
        <div className='bg-white-bg'>
          <SlidePopUpX onClose={onClose}>
            {event ? (
              <EventTextForm
                address={event?.location ?? ''}
                date={event?.date instanceof Date ? (event.date.toISOString().split('T')[0] ?? '') : ''}
                description={event?.description ?? ''}
                name={event?.name ?? ''}
                onSave={handleSaveEventDetails}
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
            <MessageForm message={event?.message ?? ''} onSave={handleSaveMessage} />
          </SlidePopUpX>
        </div>
      )}
    </div>
  );
}

export default DetailForm;
