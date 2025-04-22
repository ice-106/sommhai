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
      className={`bg-white-pure flex min-h-[236px] w-[333px] flex-col items-center gap-24 overflow-y-auto rounded-[25px] p-[16px]`}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className='text-3xl'>{name}</h1>
      <p>{address}</p>
      <p>{date}</p>
      <p>{description}</p>
    </div>
  );
}

export default EventTextForm;
