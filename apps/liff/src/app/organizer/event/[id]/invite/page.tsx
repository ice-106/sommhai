import React from 'react';
import { Suspense } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import SelectAll from '@/components/common/SelectAll';

const SearchContainer = () => {
  const Search = React.lazy(() => import('@/components/organizer/Search'));

  return (
    <Suspense fallback={<Loading />}>
      <Search placeholder='Search...' />
    </Suspense>
  );
};

function InvitePage() {
  return (
    <div className='bg-g flex h-screen w-screen flex-col'>
      <HeaderBurgur name='Who to invite?' />
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SearchContainer />
      </div>
      <div className='my-5 flex w-full items-center gap-2 px-7'>
        <SelectAll />
      </div>
    </div>
  );
}
export default InvitePage;
