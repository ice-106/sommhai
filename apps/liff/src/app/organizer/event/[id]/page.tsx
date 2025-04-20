import HeaderBurgur from '@/components/common/HeaderBurgur';
import { DeleteEventButton } from '@/components/organizer/buttons';
import { IconButtonGroup } from '@/components/organizer/iconbutton';

export default function EventPage() {
  const name = 'Event Name'; // Replace with server data
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={name} />
      <div className='mt-[10px] flex flex-1 flex-col justify-between px-24 py-16'>
        <IconButtonGroup />

        <div className='my-16 w-full'>
          <DeleteEventButton />
        </div>
      </div>
    </div>
  );
}
