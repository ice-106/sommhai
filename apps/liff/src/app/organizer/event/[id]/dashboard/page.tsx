import HeaderBurgur from '@/components/HeaderBurgur';
import ParticipantCard from '@/components/ui/organizer/event/dashboard/ParticipantCard';

export default function page() {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Dashboard' />
      <ParticipantCard />
    </div>
  );
}
