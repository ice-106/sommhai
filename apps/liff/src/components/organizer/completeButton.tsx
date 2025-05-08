'use client';
import { Button } from '@sommhai/ui/components/ui/button';
import { redirect } from 'next/navigation';
import { useContext, useState } from 'react';

import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

import { SlidePopUpX } from '../common/SlidePopup';
import DeleteModal from './DeleteModal';

function CompleteButton({ eid }: { eid: string }) {
  const { userId } = useContext(LiffContext);
  const [page, setPage] = useState(0);
  const handleClick = () => {
    fetch(`${API_BASE_URL}/users/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eid: eid,
        uid: userId,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log('Event added to history successfully', res);
        redirect('/history');
      } else {
        console.error('Failed to add event to history');
      }
    });
  };
  return (
    <div className='flex w-full flex-col items-center justify-center pt-2'>
      <Button
        className='hover:bg-orange-3-hover relative h-56 w-full items-center justify-between gap-40 rounded-3xl bg-red-500 px-20 py-20 text-2xl font-semibold'
        onClick={() => {
          setPage(1);
        }}
      >
        <div className='absolute left-0 top-0 h-56 w-full rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)]'></div>
        <div className='w-full justify-start text-center font-medium'>End Event</div>
      </Button>
      {page === 1 && (
        <SlidePopUpX
          onClose={() => {
            setPage(0);
          }}
        >
          <DeleteModal handleDelete={handleClick} setPage={setPage} />
        </SlidePopUpX>
      )}
    </div>
  );
}
export default CompleteButton;
