import React from 'react';

function EventTextForm({
  name,
  address,
  date,
  description,
  time,
}: {
  name: string;
  address: string;
  date: string;
  description: string;
  time: string;
}) {
  return (
    <div className='bg-orange-6 flex h-full w-full flex-col items-center justify-center gap-10 rounded-3xl py-[5vh]'>
      <h1 className='text-3xl font-semibold'>Details</h1>
      <div className={`flex h-full w-full flex-col items-center gap-8 overflow-y-auto px-8 py-12`}>
        <p className='text-xl font-medium'>{address}</p>
        <p className='text-2xl font-medium'>{date}</p>
        <p className='text-xl font-medium'>{time}</p>
        <p className='text-md font-medium text-gray-600'>{description}</p>
      </div>
    </div>
  );
}

export default EventTextForm;
