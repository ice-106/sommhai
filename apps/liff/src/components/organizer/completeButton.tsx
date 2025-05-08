'use client';
import { Button } from '@sommhai/ui/components/ui/button';
import Link from 'next/link';
import { useContext } from 'react';

import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

function CompleteButton({ eid }: { eid: string }) {
  const { userId } = useContext(LiffContext); // Replace with actual user ID
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
      } else {
        console.error('Failed to add event to history');
      }
    });
  };
  return (
    <div className='flex w-full flex-col items-center justify-center pt-2'>
      <Link className='inline-flex w-full' href={'/history'}>
        <Button
          className='hover:bg-orange-3-hover relative h-56 w-full items-center justify-between gap-40 rounded-3xl bg-red-500 px-20 py-20 text-2xl font-semibold'
          onClick={handleClick}
        >
          <div className='absolute left-0 top-0 h-56 w-full rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)]'></div>
          <div className='w-full justify-start text-center font-medium'>End Event.</div>
        </Button>
      </Link>
    </div>
  );
}
export default CompleteButton;
