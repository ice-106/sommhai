import React from 'react';

function EventTextForm({
  name,
  address,
  date,
  description,
}: {
  name: string;
  address: string;
  date: string;
  description: string;
}) {
  return (
    <div
      className={`flex min-h-[236px] w-[333px] flex-col items-center gap-24 overflow-y-auto rounded-[25px] p-[16px] pt-32`}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className='text-3xl font-bold'>{name}</h1>
      <p className='text-xl font-semibold'>{address}</p>
      <p className='text-2xl font-semibold'>{date}</p>
      <p className='text-md font-semibold text-gray-600'>{description}</p>
    </div>
  );
}

export default EventTextForm;
