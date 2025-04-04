'use client';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiPieChart } from 'react-icons/fi';
import { GoPersonAdd } from 'react-icons/go';
import { LuCalendarClock, LuCalendarPlus, LuUserRoundCog } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { MdNavigateNext } from 'react-icons/md';
import { TbCalendarQuestion } from 'react-icons/tb';

interface IconButtonProps {
  icon: React.ElementType;
  title: string;
  link: string;
}

export function IconButton({ icon: Icon, title: name, link: href }: IconButtonProps) {
  const pathName = usePathname();

  return (
    <Link href={`${pathName}/${href}`}>
      <div className='bg-white-bg rounded-24 flex h-[4.75rem] w-[20.375rem] shadow-md'>
        <div className='mx-12 self-center'>
          <Icon size={45} />
        </div>
        <div className='flex flex-col self-center'>
          <h1 className='text-[1.25rem] font-bold'>{name}</h1>
          <p className='text-[0.8rem]'>Details</p>
        </div>
        <div className='my-12 ml-auto px-12'>
          <MdNavigateNext size={25} />
        </div>
      </div>
    </Link>
  );
}

export function IconButtonGroup() {
  const buttons = [
    //change element in icon button group here
    { icon: MdOutlineEventNote, title: 'Event Details', link: 'details' },
    { icon: FiPieChart, title: 'Dashboard', link: 'dashboard' },
    { icon: LuUserRoundCog, title: 'Admin List', link: '' },
    { icon: TbCalendarQuestion, title: 'Question Form', link: 'questions' },
    { icon: LuCalendarClock, title: 'Reminder', link: 'reminder' },
    { icon: LuCalendarPlus, title: 'Google Calendar', link: 'google-calendar' },
    { icon: GoPersonAdd, title: 'Invite Attendees', link: 'invite' },
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 4; //change max button per page here
  const totalPages = Math.ceil(buttons.length / itemsPerPage);

  const startIdx = (page - 1) * itemsPerPage;
  const displayedButtons = buttons.slice(startIdx, startIdx + itemsPerPage);

  const [direction, setDirection] = useState(1);

  const handlePageChange = (newPage: number) => {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  return (
    <div className='flex h-full w-full flex-col items-center overflow-hidden'>
      {/* Button List with Animation */}
      <div className=''>
        <AnimatePresence custom={direction} mode='wait'>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className='grid w-full grid-cols-1 gap-8'
            exit={{ x: direction * 100, opacity: 0 }}
            initial={{ x: direction * 100, opacity: 0 }}
            key={page}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {displayedButtons.map(({ icon, title, link }, index) => (
              <IconButton icon={icon} key={index} link={link} title={title} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      <div className='mt-16 flex gap-4'>
        <button
          className='rounded-md bg-gray-300 px-4 py-2 disabled:opacity-50'
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          className='rounded-md bg-gray-300 px-4 py-2 disabled:opacity-50'
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
