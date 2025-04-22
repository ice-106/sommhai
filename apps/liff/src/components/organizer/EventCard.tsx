'use client';

import { differenceInCalendarDays } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { IoIosTimer } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';

// export function EventCardTestStatic() {
//   const pathName = usePathname();
//   return (
//     <Link href={`${pathName}/event/123`}>
//       <div className='bg-white-bg flex w-[345px] max-w-[100%] flex-col justify-between gap-4 rounded-[25px] p-16 shadow-lg'>
//         <div className='flex justify-between'>
//           <h1 className='text-bold-20 font-inter truncate'>Badminton Competition.........................</h1>
//           <MdNavigateNext className='self-center' size={25} />
//         </div>
//         <div className='flex'>
//           <IoIosTimer className='mt-[4px]' color='orange' />
//           <p className='text-regular-16 text-orange-2'>Timer</p>
//         </div>
//         <p className='font-inter text-regular-16-low'>Event Details</p>
//       </div>
//     </Link>
//   );
// }

interface EventCardProp {
  name: string;
  link: string;
  date: Date;
}

function EventCard({ name: name, link: link, date: date }: EventCardProp) {
  const dayscal = differenceInCalendarDays(new Date(date), new Date());
  console.log(dayscal);
  return (
    <Link href={`organizer/event/${link}`}>
      <div className='bg-white-bg flex w-[345px] flex-col justify-between gap-4 rounded-[25px] p-16 shadow-lg'>
        <div className='flex justify-between'>
          <h1 className='text-bold-20 font-inter'>{name}</h1>
          <MdNavigateNext className='self-center' size={25} />
        </div>
        <div className='flex'>
          <IoIosTimer className='text-orange-2 mt-[4px]' />
          <p className='text-regular-16 text-orange-2'>{dayscal.toString()} Days Left</p>
        </div>
        <p className='font-inter text-regular-16-low'>Event Details</p>
      </div>
    </Link>
  );
}

export default EventCard;
