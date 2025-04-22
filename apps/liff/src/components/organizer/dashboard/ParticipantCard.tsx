'use client';

import { useState } from 'react';

import { DonutChart } from './DonutChart';

const Pages = [1, 2, 3, 4];

function ParticipantCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const totalPages = Pages.length;
  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  return (
    <div className='bg-white-pure mx-auto mt-12 flex min-h-[40vh] w-[342px] flex-col pt-24'>
      <div className='flex h-[40vh] flex-col items-center justify-between'>
        <div className='flex h-full items-center'>
          <DonutChart />
        </div>
        <div className='flex h-full w-[206] flex-col items-center'>
          <h1 className='text-orange-3 text-bold-20'>Attendee</h1>
          <p className='text-regular-14 text-wrap text-center'>10 of 40 attendee will be attending</p>
        </div>
      </div>
    </div>
  );
}

export default ParticipantCard;
