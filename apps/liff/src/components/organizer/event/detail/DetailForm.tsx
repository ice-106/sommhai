'use client';
import type { Events } from '@sommhai/shared-type/src';
import { useEffect, useState } from 'react';

import { SlidePopUpX } from '@/components/common/SlidePopup';
import EventTextForm from '@/components/organizer/event/detail/EventTextForm';
import MessageForm from '@/components/organizer/event/detail/MessageForm';
import { API_BASE_URL } from '@/env';

interface DetailFormProp {
  page: number;
  onClose: () => void;
  eid: string;
}

function DetailForm({ page, onClose, eid }: DetailFormProp) {
  const [event, setEvent] = useState<Events | null>(null);
  useEffect(() => {
    console.log('real event', event);
    console.log('hour', parseInt(event?.time?.hour ?? '0', 10));
  }, [event]);
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
          date: new Date(data.date),
          time: {
            hour: data.date.toString().split('T')[1].split(':')[0],
            minute: data.date.toString().split('T')[1].split(':')[1],
          },
        };
        console.log('event', eventData);
        setEvent(eventData);
      });
  }, [eid]);
  const handleSaveEventDetails = (updatedData: {
    name: string;
    address: string;
    date: { date: Date; time: { hour: number; minute: number } };
    description: string;
  }) => {
    // Convert Date to string format to match Events type
    // Create formatted data with the date converted to string
    const formattedData = {
      ...updatedData,
      date: updatedData.date.date.toISOString(),
    };
    setEvent((prev) =>
      prev
        ? {
            ...prev,
            ...formattedData,
          }
        : null,
    );
    console.log(
      'updatedData',
      new Date(updatedData.date.date).toISOString().split('T')[0] +
        'T' +
        `${updatedData.date.time.hour.toString().length == 1 ? '0' + updatedData.date.time.hour.toString() : updatedData.date.time.hour}:${updatedData.date.time.minute.toString().length == 1 ? '0' + updatedData.date.time.minute.toString() : updatedData.date.time.minute}` +
        ':00.00Z',
    );
    fetch(`${API_BASE_URL}/org/events/${eid}/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedData.name,
        location: updatedData.address,
        description: updatedData.description,
        date:
          new Date(updatedData.date.date).toISOString().split('T')[0] +
          'T' +
          `${updatedData.date.time.hour.toString().length == 1 ? '0' + updatedData.date.time.hour.toString() : updatedData.date.time.hour}:${updatedData.date.time.minute.toString().length == 1 ? '0' + updatedData.date.time.minute.toString() : updatedData.date.time.minute}` +
          ':00.00Z',
      }),
    }).then(() => {
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
        <div className='bg-orange-6 h-full'>
          <SlidePopUpX onClose={onClose}>
            {event ? (
              <EventTextForm
                address={event?.location ?? ''}
                date={{
                  date:
                    event.date && typeof event.date === 'object' && 'getTime' in event.date
                      ? event.date
                      : new Date(event?.date || ''),
                  time: { hour: parseInt(event?.time?.hour ?? '0', 10), minute: parseInt(event?.time?.minute ?? '0') },
                }}
                description={event?.description ?? ''}
                name={event?.name ?? ''}
                onSave={handleSaveEventDetails}
              />
            ) : (
              <div className='bg-white-pure flex h-[80vh] w-[80vw] items-center justify-center rounded-2xl'>
                {' '}
                Fetching...
              </div>
            )}
          </SlidePopUpX>
        </div>
      )}
      {page === 3 && (
        <div className='bg-orange-6 h-full'>
          <SlidePopUpX onClose={onClose}>
            <MessageForm message={event?.message ?? ''} onSave={handleSaveMessage} />
          </SlidePopUpX>
        </div>
      )}
    </div>
  );
}

export default DetailForm;
