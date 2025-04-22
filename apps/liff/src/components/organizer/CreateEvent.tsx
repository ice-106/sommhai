import { Button } from '@sommhai/ui/components/ui/button';
import Link from 'next/link';

function CreateEvent() {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Link className='inline-flex w-full' href={'/organizer/create'}>
        <Button className='bg-orange-3 hover:bg-orange-3-hover relative h-56 w-full items-center justify-between gap-40 rounded-3xl px-20 py-20 text-2xl font-semibold'>
          <div className='absolute left-0 top-0 h-56 w-full rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)]'></div>
          <div className='justify-start font-medium leading-loose'>Create Event</div>
          <div className='text-2xl font-semibold'>+</div>
        </Button>
      </Link>
    </div>
  );
}

export default CreateEvent;
