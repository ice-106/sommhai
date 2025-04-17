import HeaderBurgur from '@/components/common/HeaderBurgur';
import ParticipantCard from '@/components/organizer/dashboard/ParticipantCard';

function DashboardPage() {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Dashboard' />
      <ParticipantCard />
    </div>
  );
}

export default DashboardPage;
