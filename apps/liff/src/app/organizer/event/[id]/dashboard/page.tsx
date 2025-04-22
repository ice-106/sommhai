import HeaderBurgur from '@/components/common/HeaderBurgur';
import { PreferChart } from '@/components/organizer/dashboard/BarChart';
import {
  CollabsibleAccepted,
  CollabsibleDenied,
  CollabsibleUnanswered,
} from '@/components/organizer/dashboard/Collabsible';
import ParticipantCard from '@/components/organizer/dashboard/ParticipantCard';
import { SearchContainer } from '@/components/organizer/Search';

function DashboardPage() {
  return (
    <div className='bg-white-bg flex min-h-screen w-screen flex-col'>
      <HeaderBurgur name='Dashboard' />

      <ParticipantCard />
      {/* <PeferenceCard/> */}
      <PreferChart />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer placeholder='Search...' />
      </div>
      <CollabsibleAccepted />
      <CollabsibleDenied />
      <CollabsibleUnanswered />
      <div className='mt-[19px]'></div>
    </div>
  );
}

export default DashboardPage;
