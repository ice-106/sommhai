'use client';
import { Button } from '@sommhai/ui/components/ui/button';

import { API_BASE_URL } from '@/env';

export function DeleteEventButton({ id }: { id: string }) {
  function handleDelete() {
    console.log('Deleting event with ID:', id);
    const res = fetch(`${API_BASE_URL}/org/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  }

  return (
    <Button
      className='h-[56px] w-full'
      variant='delete'
      onClick={() => {
        handleDelete();
      }}
    >
      Remove Event
    </Button>
  );
}
