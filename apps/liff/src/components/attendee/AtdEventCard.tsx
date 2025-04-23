'use client';

import Link from 'next/link';
import React from 'react';
import { IoIosTimer } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';

import { getDateDifferenceLabel } from '@/utils/date';

interface EventCardProp {
  name: string;
  link: string;
  date: Date;
  detail: string;
}

function AtdEventCard({ name: name, link: link, date: date, detail: detail }: EventCardProp) {
  return (
    <Link href={`attendee/event/${link}`}>
      <div className='bg-white-bg flex w-[345px] flex-col justify-between gap-4 rounded-[25px] p-16 shadow-lg'>
        <div className='flex justify-between'>
          <h1 className='text-bold-20 font-inter'>{name}</h1>
          <MdNavigateNext className='self-center' size={25} />
        </div>
        <div className='flex'>
          <IoIosTimer className='text-orange-2 mt-[4px]' />
          <p className='text-regular-16 text-orange-2'>{getDateDifferenceLabel(date.toString())}</p>
        </div>
        <p className='font-inter text-regular-16-low'>{detail}</p>
      </div>
    </Link>
  );
}

export default AtdEventCard;
