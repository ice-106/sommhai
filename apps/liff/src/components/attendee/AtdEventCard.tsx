'use client';

import { differenceInCalendarDays, isToday, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { IoIosTimer } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';

interface EventCardProp {
  name: string;
  link: string;
  date: Date;
}

const getDateDifferenceLabel = (isoDateString: string): string => {
  const givenDate = parseISO(isoDateString);

  if (isToday(givenDate)) {
    return 'today';
  }

  const diff = differenceInCalendarDays(givenDate, new Date());

  if (diff > 0) {
    return `In ${diff} day${diff !== 1 ? 's' : ''}`;
  } else {
    return `${Math.abs(diff)} day${Math.abs(diff) !== 1 ? 's' : ''} ago`;
  }
};

function AtdEventCard({ name: name, link: link, date: date }: EventCardProp) {
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
        <p className='font-inter text-regular-16-low'>Event Details</p>
      </div>
    </Link>
  );
}

export default AtdEventCard;
