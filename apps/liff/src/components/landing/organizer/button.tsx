import { Button } from '@sommhai/ui/components/ui/button';
import Link from 'next/link';

export default function CreateEventButton() {
  return (
    <div className='flex w-full flex-1'>
      <Link className='w-full' href='organizer/create'>
        <Button size={'full'} variant={'orange'}>
          Create Event
        </Button>
      </Link>
    </div>
  );
}
