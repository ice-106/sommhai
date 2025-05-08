'use client';

import { Invite } from '@sommhai/shared-type/src';
import { useEffect, useState } from 'react';

import { DonutChart } from './DonutChart';

function ParticipantCard({ invites }: { invites: Invite[] }) {
  const [attendee, setAttendee] = useState<Invite[]>([]);
  const [attendeePercen, setAttendeePercen] = useState(0);

  useEffect(() => {
    console.log('invites', invites);
    if (invites.length > 0) {
      setAttendee(invites.filter((invite) => invite.accept === true));
      setAttendeePercen((attendee.length / invites.length) * 100);
    }
  }, [invites, attendee.length]);

  return (
    <div className='flex w-full items-center justify-center px-24 pt-4'>
      <div className='bg-white-pure mb-8 mt-12 flex h-[40vh] w-full flex-col justify-center rounded-md pb-16 pt-24 shadow-sm'>
        <div className='flex h-[40vh] flex-col items-center justify-between'>
          <div className='flex h-full w-full items-center justify-center'>
            <DonutChart attendeePercen={attendeePercen} />
          </div>
          <div className='flex w-full flex-col items-center'>
            <h1 className='text-orange-3 text-bold-20'>Attendee</h1>
            <p className='text-regular-14 text-wrap text-center'>
              {attendee.length} of {invites.length} attendee will be attending
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantCard;
