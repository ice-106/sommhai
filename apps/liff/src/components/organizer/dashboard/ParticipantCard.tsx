'use client';

import { useState } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

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
    <div className='gap-19 bg-white-pure mx-auto mt-[19px] flex h-[163px] w-[342px] flex-col gap-[19px] p-24'>
      <div className='flex gap-24'>
        <div className='h-[64px] w-[64px]'>
          <DonutChart />
        </div>
        <div className='flex w-[206] flex-col'>
          <h1 className='text-orange-3 text-bold-20'>Attendee</h1>
          <p className='text-regular-14'>10 of 40 attendee will be attending</p>
        </div>
      </div>
      <div className='flex justify-between gap-16'>
        <button
          className={`flex h-[32px] w-[139px] items-center justify-center gap-2 rounded ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'text-black'}`}
          disabled={currentPage === 1}
          onClick={goToPrev}
        >
          <IoArrowBackOutline className='mt-[2px]' />
          <span className='text-sm'>Previous</span>
        </button>
        <button
          className={`flex h-[32px] w-[139px] items-center justify-center gap-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed text-gray-500' : 'text-orange-2'}`}
          disabled={currentPage === totalPages}
          onClick={goToNext}
        >
          <IoArrowForwardOutline className='mt-[2px]' />
          <span className='text-sm'>Next</span>
        </button>
      </div>
    </div>
  );
}

export default ParticipantCard;
