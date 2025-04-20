'use client';
import React from 'react';

import SwiperTimePicker from '@/components/organizer/event/reminder/SwiperTimePicker';
import TimePicker from '@/components/organizer/event/reminder/TimePicker';

function PageTest() {
  return (
    <div className='max-w-screen flex flex-col'>
      {/* <TimePicker /> */}
      <SwiperTimePicker onTimeChange={() => {}} />
      <TimePicker onChange={() => {}} />
    </div>
  );
}

export default PageTest;
