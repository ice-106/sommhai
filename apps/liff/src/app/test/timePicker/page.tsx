'use client';
import React from 'react';

import SwiperTimePicker from '@/components/SwiperTimePicker';
import TimePicker from '@/components/TimePicker';

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
