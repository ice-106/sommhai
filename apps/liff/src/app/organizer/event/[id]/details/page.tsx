'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import DetailForm from '@/components/organizer/event/detail/DetailForm';

function DetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (currentPage !== 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={id} />
      <div className='flex flex-1 flex-col items-center justify-between gap-24 px-24 py-16'>
        <div
          className='bg-orange-3 active:bg-orange-4 flex h-[420px] w-[300px] flex-col justify-center text-center'
          onClick={() => handleChangePage(1)}
        >
          <h1 className='text-semi-24'>E-Letter</h1>
          <p className='text-medium-20'>Click to edit</p>
        </div>
        <div
          className='bg-white-pure flex h-[206px] w-[345px] flex-col justify-center text-center active:bg-gray-200'
          onClick={() => handleChangePage(2)}
        >
          <h1 className='text-semi-24'>Event Details</h1>
          <p className='text-medium-20'>Click to edit</p>
        </div>
        <div
          className='bg-orange-3 rounded-24 active:bg-orange-4 flex h-[196px] w-[345px] flex-col justify-center text-center'
          onClick={() => handleChangePage(3)}
        >
          <h1 className='text-semi-24'>Message</h1>
          <p className='text-medium-20'>Click to edit</p>
        </div>
      </div>
      {currentPage !== 0 && (
        <div
          className={`fixed left-0 top-0 z-50 h-screen w-screen overflow-y-auto transition-all duration-500 ease-in-out ${
            currentPage !== 0 ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <DetailForm page={currentPage} onClose={() => setCurrentPage(0)} />
        </div>
      )}
    </div>
  );
}
export default DetailPage;
