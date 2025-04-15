import React from 'react';

import { Component, DonutChart } from '@/components/ui/organizer/event/dashboard/DonutChart';

function ParticipantCard() {
  return (
    <div>
      <div className='flex flex-col'>
        <DonutChart />
        <Component />
      </div>
    </div>
  );
}

export default ParticipantCard;
