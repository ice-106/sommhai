'use client';
import { useGoogleLogin } from '@react-oauth/google';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { DateTimeSelect } from '@/components/organizer/event/reminder/DateTimePicker';

function ReminderPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [finished, setFinished] = useState<boolean>(false);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
      setIsAuthenticated(true);
      setMessage('Successfully authenticated with Google!');
    },
    onError: () => {
      setMessage('Google authentication failed. Please try again.');
    },
    scope: 'https://www.googleapis.com/auth/calendar',
  });
  const addToGoogleCalendar = async () => {
    if (!accessToken) {
      setMessage('Please authenticate with Google first.');
      return null;
    }

    const startDateTime = new Date(data.date);
    startDateTime.setHours(data.time.hour, data.time.minute, 0, 0);

    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 60);

    const startTimeRFC3339 = startDateTime.toISOString();
    const endTimeRFC3339 = endDateTime.toISOString();

    // Prepare event data according to Google Calendar API
    const event = {
      summary: title,
      description: description,
      start: {
        //required
        dateTime: startTimeRFC3339,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Use local timezone
      },
      end: {
        //required
        dateTime: endTimeRFC3339,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: true,
      },
    };

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to create event');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (!isAuthenticated) {
        login();
        setIsSubmitting(false);
        return;
      }

      const result = await addToGoogleCalendar();
      if (result) {
        setMessage('Event added to Google Calendar successfully!');
        // Reset form
        setTitle('');
        setDescription('');
        setFinished(true);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Failed to add event'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-full w-full py-20'>
      <h1 className='mb-6 px-8 text-2xl font-bold'>Create Event Reminder</h1>

      {message && (
        <div
          className={`mb-4 rounded p-4 ${message.includes('Error') ? 'bg-orange-4 text-red-700' : 'bg-green-100 text-green-700'}`}
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
            className='focus:ring-orange-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2'
            id='title'
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
            className='focus:ring-orange-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2'
            id='description'
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className='bg-orange-2 hover:bg-orange-2-hover focus:bg-orange-1 w-full rounded-md px-4 py-2 font-bold text-white focus:outline-none focus:ring-2'
          type='submit'
        >
          {isSubmitting
            ? 'Processing...'
            : isAuthenticated
              ? 'Add to Google Calendar'
              : 'Sign in with Google & Add Event'}
        </button>
      </form>
      {finished ? (
        <div className='flex w-full items-center justify-center px-4 pt-4'>
          <button
            className='bg-orange-1 hover:bg-orange-3-hover w-full items-center rounded-md px-4 py-2 font-bold text-white'
            type='submit'
            onClick={() => router.push(`/organizer/event/${id}`)}
          >
            Back
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default ReminderPage;
