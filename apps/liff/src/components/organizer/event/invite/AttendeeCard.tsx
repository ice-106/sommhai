'use client';

import { Checkbox } from '@sommhai/ui/components/ui/checkbox';
import React from 'react';

interface AttendeeCardProp {
  name: string;
}

function AttendeeCard({ name: name }: AttendeeCardProp) {
  return (
    <div className='bg-white-bg flex w-full flex-col justify-center rounded-[25px] p-16 shadow-lg'>
      <div className='flex items-center justify-center'>
        <Checkbox className='border-orange-3 data-[state=checked]:bg-orange-3 data-[state:checked]:text-white-pure size-40 rounded-full border-[2px]' />
        <div className='text-bold-20 w-full truncate text-center'>{name}</div>
      </div>
    </div>
  );
}

export default AttendeeCard;
