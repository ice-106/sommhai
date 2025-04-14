import { IconButtonGroup } from '@/components/ui/organizer/event/iconbutton';
import HeaderBurgur from '@/components/HeaderBurgur';

export default function page() {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Event Title' />
      <div className='mt-[10px] flex flex-1 flex-col justify-between px-24 py-16'>
        <IconButtonGroup />
      </div>
    </div>
  );
}
