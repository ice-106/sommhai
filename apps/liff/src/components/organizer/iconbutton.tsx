'use client';

import type { Events } from '@sommhai/shared-type/src';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiPieChart } from 'react-icons/fi';
import { GoPersonAdd } from 'react-icons/go';
import { LuCalendarClock, LuUserRoundCog } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { MdNavigateNext } from 'react-icons/md';
import { TbCalendarQuestion } from 'react-icons/tb';

import { inviteAttendee } from '@/utils/invite';

interface IconButtonProps {
  icon: React.ElementType;
  title: string;
  link: string;
  detail: string;
}

export function IconButton({ icon: Icon, title: name, link: href, detail: detail }: IconButtonProps) {
  const pathName = usePathname();

  return (
    <Link href={`${pathName}/${href}`}>
      <div className='bg-white-bg rounded-24 flex h-[4.75rem] w-[20.375rem] shadow-lg'>
        <div className='mx-12 self-center'>
          <Icon size={45} />
        </div>
        <div className='flex flex-col self-center'>
          <h1 className='text-[1.25rem] font-bold'>{name}</h1>
          <p className='text-[0.8rem]'>{detail}</p>
        </div>
        <div className='my-12 ml-auto px-12'>
          <MdNavigateNext size={25} />
        </div>
      </div>
    </Link>
  );
}

export function IconButtonGroup({ event }: { event: Events }) {
  const buttons = [
    //change element in icon button group here
    { icon: MdOutlineEventNote, title: 'Event Details', detail: 'Details of the event.', link: 'details' },
    { icon: FiPieChart, title: 'Dashboard', detail: 'Participant chart', link: 'dashboard' },
    { icon: GoPersonAdd, title: 'Invite Attendees', detail: 'Invite attendee', link: 'invite' },
    { icon: TbCalendarQuestion, title: 'Question Form', detail: 'Edit the question form.', link: 'questions' },
    { icon: LuCalendarClock, title: 'Reminder', detail: 'Add a reminder to Google Calendar', link: 'reminder' },
    { icon: LuUserRoundCog, title: 'Admin List', detail: 'Add admins to the event.', link: 'admin' },
  ];
  const [seeMore, setSeeMore] = useState(false);
  const initialDisplayed = 3;
  const displayedButtons = seeMore ? buttons : buttons.slice(0, initialDisplayed);

  const handleSeeMore = () => {
    setSeeMore((prev) => !prev);
  };

  return (
    <div className='flex h-full w-full flex-col items-center'>
      <div className='flex flex-col items-center gap-[16px]'>
        {displayedButtons.map(({ icon, title, link, detail }, index) =>
          link === 'invite' ? (
            <div
              className='bg-white-bg rounded-24 flex h-[4.75rem] w-[20.375rem] shadow-lg'
              key={index}
              onClick={() => inviteAttendee(event)}
            >
              <div className='mx-12 self-center'>
                <GoPersonAdd size={45} />
              </div>
              <div className='flex flex-col self-center'>
                <h1 className='text-[1.25rem] font-bold'>{title}</h1>
                <p className='text-[0.8rem]'>{detail}</p>
              </div>
              <div className='my-12 ml-auto px-12'>
                <MdNavigateNext size={25} />
              </div>
            </div>
          ) : (
            <IconButton detail={detail} icon={icon} key={index} link={link} title={title} />
          ),
        )}
      </div>
      {!seeMore ? (
        <button
          className='rounded-24 border-orange-2 text-orange-2 mt-[16px] h-[56px] w-full border-[3px] bg-white'
          onClick={handleSeeMore}
        >
          See more
        </button>
      ) : (
        <button
          className='rounded-24 border-orange-2 text-orange-2 mt-[16px] h-[56px] w-full border-[3px] bg-white'
          onClick={handleSeeMore}
        >
          Hide
        </button>
      )}
    </div>
  );
}
