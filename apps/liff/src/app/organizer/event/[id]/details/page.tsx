'use client';

import type { Events } from '@sommhai/shared-type/src';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EventText from '@/components/attendee/EventText';
import HeaderBurgur from '@/components/common/HeaderBurgur';
import DetailForm from '@/components/organizer/event/detail/DetailForm';
import { API_BASE_URL } from '@/env';

function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [currentPage, setCurrentPage] = useState(0);
  const [event, setEvent] = useState<Events | null>(null);
  useEffect(() => {
    console.log('event' + event);
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
        };
        setEvent(eventData as Events);
      });
  }, [id]);
  useEffect(() => {
    console.log('current id', id);
    if (currentPage !== 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    if (currentPage === 0) {
      router.refresh();
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={event?.name ?? 'My Event'} />
      <div className='flex flex-1 flex-col items-center justify-between gap-[10vh] px-24 py-32'>
        <div
          className='bg-orange-6 flex h-full w-full flex-col justify-center rounded-3xl text-center active:bg-gray-200'
          onClick={() => handleChangePage(2)}
        >
          <EventText
            address={event?.location ?? ''}
            date={new Date(event?.date ?? new Date()).toISOString().split('T')[0] ?? ''}
            description={event?.description ?? ''}
            name={event?.name ?? ''}
            time={new Date(event?.date ?? new Date()).toISOString().split('T')[1]?.split('.')[0] ?? ''}
          />
        </div>
        <div
          className='bg-orange-3 rounded-24 active:bg-orange-4 flex h-full w-full flex-col justify-center text-center'
          onClick={() => handleChangePage(3)}
        >
          <h1 className='text-semi-24 font-semibold text-white'>{event?.message ?? 'Message'}</h1>
          <p className='text-medium-20'>Click to edit</p>
        </div>
      </div>
      {currentPage !== 0 && (
        <div
          className={`fixed left-0 top-0 z-50 h-screen w-screen overflow-y-auto transition-all duration-500 ease-in-out ${
            currentPage !== 0 ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <DetailForm eid={id} page={currentPage} onClose={() => setCurrentPage(0)} />
        </div>
      )}
    </div>
  );
}
export default DetailPage;
