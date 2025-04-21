'use client';

import React from 'react';

interface AttendeeCardProp {
  name: string;
}

function AttendeeCard({ name: name }: AttendeeCardProp) {
  return (
    <div className='bg-white-bg flex w-[345px] flex-col justify-between gap-4 rounded-[25px] p-16 shadow-lg'>
      <div className='flex justify-between'>
        <h1 className='text-bold-20 font-inter'>{name}</h1>
      </div>
    </div>
  );
}

export default AttendeeCard;
