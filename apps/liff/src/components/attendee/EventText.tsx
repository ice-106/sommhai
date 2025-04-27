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
    <div
      className={`flex min-h-[236px] w-full flex-col items-center gap-10 overflow-y-auto rounded-[25px] p-16 pt-32`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* <h1 className='text-3xl font-bold'>{name}</h1> */}
      <p className='text-xl font-semibold'>{address}</p>
      <p className='text-2xl font-semibold'>{date}</p>
      <p className='text-xl font-semibold'>{time}</p>
      <p className='text-md font-semibold text-gray-600'>{description}</p>
    </div>
  );
}

export default EventTextForm;
