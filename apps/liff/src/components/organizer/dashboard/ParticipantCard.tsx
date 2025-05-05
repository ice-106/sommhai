'use client';

import { Invite } from '@sommhai/shared-type/src';
import { useState } from 'react';

import { DonutChart } from './DonutChart';

const Pages = [1, 2, 3, 4];

function ParticipantCard({ invites }: { invites: Invite[] }) {
  const [attendee, setAttendee] = useState<Invite[]>([]);
  const [attendeePercen, setAttendeePercen] = useState(0);
  if (invites.length > 0) {
    setAttendee(invites.filter((invite) => invite.accept === true));
    setAttendeePercen((attendee.length / invites.length) * 100);
  }

  return (
    <div className='bg-white-pure mx-auto mt-12 flex min-h-[40vh] w-[342px] flex-col pt-24'>
      <div className='flex h-[40vh] flex-col items-center justify-between'>
        <div className='flex h-full items-center'>
          <DonutChart attendeePercen={attendeePercen} />
        </div>
        <div className='flex h-full w-[206] flex-col items-center'>
          <h1 className='text-orange-3 text-bold-20'>Attendee</h1>
          <p className='text-regular-14 text-wrap text-center'>
            {attendee.length} of {invites.length} attendee will be attending
          </p>
        </div>
      </div>
    </div>
  );
}

export default ParticipantCard;
