'use client';
import { FormEvent, useState } from 'react';

import { DateTimeSelect } from '@/components/organizer/event/reminder/DateTimePicker';

function ReminderPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<{ hour: number; minute: number }>({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });
  const [data, setData] = useState<{
    date: Date;
    time: { hour: number; minute: number };
  }>({
    date: date,
    time: time,
  });
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
  };
  return (
    <div className='h-full w-full'>
      <h1 className='mb-6 text-2xl font-bold'>Create Event Reminder</h1>

      {message && (
        <div
          className={`mb-4 rounded p-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          {message}
        </div>
      )}

      <form className='space-y-6 p-16' onSubmit={handleSubmit}>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700' htmlFor='title'>
            Event Title
          </label>
          <input
            className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='title'
            required
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label className='mb-1 block text-sm font-medium text-gray-700'>Event Date & Time</label>
        <div className='w-full p-8'>
          <DateTimeSelect onChange={(dateTime) => console.log(dateTime)} onSave={setData} />
        </div>
        {/* <h1>{data.date.toDateString()}</h1>
      <h1>{`${data.time.hour}:${data.time.minute}`}</h1> */}

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700' htmlFor='description'>
            Description
          </label>
          <textarea
            className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='description'
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className='bg-orange-2 hover:bg-orange-2-hover w-full rounded-md px-4 py-2 font-bold text-white focus:outline-none focus:ring-2'
          type='submit'
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
export default ReminderPage;
