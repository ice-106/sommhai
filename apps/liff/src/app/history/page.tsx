'use client';

import { Input } from '@sommhai/ui/components/ui/input';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import { API_BASE_URL } from '@/env';

// Type definition for history events
interface HistoryEvent {
  eid: string;
  name: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

const dummyHistoryEvents: HistoryEvent[] = [
  {
    eid: '1',
    name: 'Event 1',
    date: '2023-10-01',
    time: '10:00 AM',
    location: 'Location 1',
    status: 'Attended',
  },
  {
    eid: '2',
    name: 'Event 2',
    date: '2023-10-02',
    time: '11:00 AM',
    location: 'Location 2',
    status: 'Missed',
  },
];

function HistoryPage() {
  const [historyEvents, setHistoryEvents] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const userID = 'user123'; // Replace with actual user ID

  useEffect(() => {
    const fetchHistoryEvents = () => {
      try {
        // Use the attendee endpoint to fetch events
        const response = fetch(`${API_BASE_URL}/users/${userID}/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            res.json();
          })
          .then((data) => {
            console.log(data);
            setHistoryEvents(data as unknown as HistoryEvent[]);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error fetching history events:', error);
        setLoading(false);
      }
    };

    fetchHistoryEvents();
  }, []);

  // Filter events based on search query
  //const filteredEvents = historyEvents.filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredEvents = dummyHistoryEvents.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  // Function to get brief event details
  const getEventDetails = (event: HistoryEvent) => {
    return `${event.location}, ${new Date(event.date).toLocaleDateString()}`;
  };

  // if (loading) {
  //   return (
  //     <div className='flex h-screen w-screen flex-col bg-gray-50'>
  //       <HeaderBurgur name='Event History' />
  //       <div className='flex flex-1 items-center justify-center'>
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className='flex h-full w-screen flex-col bg-gray-50'>
      <HeaderBurgur name='Event History' />

      {/* Search bar */}
      <div className='px-6 py-4'>
        <div className='relative px-3'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            {/* <Search placeholder='Search...' /> */}
          </div>
          <Input
            className='w-full rounded-lg border-gray-200 py-2 pl-10 text-sm'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Event list */}
      <div className='flex-1'>
        {filteredEvents.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <p className='text-gray-600'>No events found</p>
          </div>
        ) : (
          <div className='mx-4 flex flex-col justify-between gap-3 rounded bg-white px-3'>
            {filteredEvents.map((event, index) => (
              <Link
                className='flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3'
                href={`/attendee/event/${event.eid}`}
                key={event.eid}
              >
                <div className='flex-1'>
                  <h3 className='text-lg font-medium text-black'>{event.name}</h3>
                  <p className='text-sm text-gray-500'>{getEventDetails(event)}</p>
                </div>
                <ChevronRight className='h-5 w-5 text-gray-400' />
                {/* {index < filteredEvents.length - 1 && (

                )} */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
