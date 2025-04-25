'use client';
import React from 'react';
import { useEffect, useState } from 'react';

import { DateTimeSelect } from '../reminder/DateTimePicker';

function EventTextForm({
  name,
  address,
  date,
  description,
  onSave,
}: {
  name: string;
  address: string;
  date: { date: Date; time: { hour: number; minute: number } };
  description: string;
  onSave: (data: {
    name: string;
    address: string;
    date: { date: Date; time: { hour: number; minute: number } };
    description: string;
  }) => void;
}) {
  const [editedName, setEditedName] = useState(name);
  const [editedAddress, setEditedAddress] = useState(address);
  const [editedDateString, setEditedDateString] = useState({
    date: new Date(date.date),
    time: {
      hour: date.time.hour,
      minute: date.time.minute,
    },
  });
  const [editedDescription, setEditedDescription] = useState(description);

  useEffect(() => {
    setEditedName(name);
    setEditedAddress(address);
    setEditedDateString(date);
    setEditedDescription(description);
    console.log('date time', editedDateString);
  }, [name, address, date, description]);

  const handleSave = () => {
    // Ensure date is in the correct format

    onSave({
      name: editedName,
      address: editedAddress,
      date: editedDateString,
      description: editedDescription,
    });
  };
  return (
    <div
      className={`bg-white-pure flex h-[85vh] w-[90vw] flex-col items-center gap-24 overflow-y-auto rounded-[25px] p-[16px]`}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className='text-3xl font-bold'>Event Details</h1>
      <input
        className='w-full rounded border p-2 px-4'
        placeholder='Event Name'
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <input
        className='w-full rounded border p-2 px-4'
        placeholder='Location'
        value={editedAddress}
        onChange={(e) => setEditedAddress(e.target.value)}
      />
      <textarea
        className='min-h-[64px] w-full rounded border px-4'
        placeholder='Description'
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <div>
        <DateTimeSelect
          initialDate={date.date ?? new Date()}
          initialTime={{ hour: date.time.hour, minute: date.time.minute }}
          onChange={(dateTime) => setEditedDateString(dateTime)}
        />
      </div>
      <button
        className='bg-orange-2 hover:bg-orange-2-hover mt-4 h-full rounded px-4 py-2 text-white'
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
}

export default EventTextForm;
