'use client';
import React from 'react';
import { useEffect, useState } from 'react';

function EventTextForm({
  name,
  address,
  date,
  description,
  onSave,
}: {
  name: string;
  address: string;
  date: string;
  description: string;
  onSave: (data: { name: string; address: string; date: string; description: string }) => void;
}) {
  const [editedName, setEditedName] = useState(name);
  const [editedAddress, setEditedAddress] = useState(address);
  const [editedDate, setEditedDate] = useState(date);
  const [editedDescription, setEditedDescription] = useState(description);

  useEffect(() => {
    setEditedName(name);
    setEditedAddress(address);
    setEditedDate(date);
    setEditedDescription(description);
  }, [name, address, date, description]);

  const handleSave = () => {
    onSave({
      name: editedName,
      address: editedAddress,
      date: editedDate,
      description: editedDescription,
    });
  };
  return (
    <div
      className={`bg-white-pure flex min-h-[236px] w-[333px] flex-col items-center gap-24 overflow-y-auto rounded-[25px] p-[16px]`}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className='text-3xl font-bold'>Event Details</h1>
      <input
        className='w-full rounded border p-2'
        placeholder='Event Name'
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <input
        className='w-full rounded border p-2'
        placeholder='Location'
        value={editedAddress}
        onChange={(e) => setEditedAddress(e.target.value)}
      />
      <input
        className='w-full rounded border p-2'
        type='date'
        value={editedDate}
        onChange={(e) => setEditedDate(e.target.value)}
      />
      <textarea
        className='h-32 w-full rounded border p-2'
        placeholder='Description'
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <button className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}

export default EventTextForm;
