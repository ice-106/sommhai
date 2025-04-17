import HeaderBurgur from '@/components/common/HeaderBurgur';
import { DeleteEventButton } from '@/components/organizer/buttons';
import { IconButtonGroup } from '@/components/organizer/iconbutton';

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
