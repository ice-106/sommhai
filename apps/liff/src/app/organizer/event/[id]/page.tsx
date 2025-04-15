import HeaderBurgur from '@/components/HeaderBurgur';
import { DeleteEventButton } from '@/components/ui/organizer/button';
import { IconButtonGroup } from '@/components/ui/organizer/event/iconbutton';

export default function page() {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Event Title' />
      <div className='mt-[10px] flex flex-1 flex-col justify-between px-24 py-16'>
        <IconButtonGroup />

        <div className='mb-10 w-full'>
          <DeleteEventButton />
        </div>
      </div>
    </div>
  );
}
