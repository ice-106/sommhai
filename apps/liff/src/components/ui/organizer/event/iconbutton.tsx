'use client';
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
      <div className='bg-white-bg rounded-24 flex h-[4.75rem] w-[20.375rem] shadow-lg'>
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
  const [seeMore, setSeeMore] = useState(false);
  const initialDisplayed = 4;
  const displayedButtons = seeMore ? buttons : buttons.slice(0, initialDisplayed);

  const handleSeeMore = () => {
    setSeeMore(true);
  };

  return (
    <div className='flex h-full w-full flex-col items-center'>
      {/* Button List with Animation */}
      <div className='flex flex-col items-center gap-[16px]'>
        {displayedButtons.map(({ icon, title, link }, index) => (
          <IconButton icon={icon} key={index} link={link} title={title} />
        ))}
      </div>
      {!seeMore && (
        <button
          className='rounded-24 border-orange-2 text-orange-2 mt-[16px] h-[56px] w-[345px] border-[3px] bg-white'
          onClick={handleSeeMore}
        >
          See more
        </button>
      )}
    </div>
  );
}
