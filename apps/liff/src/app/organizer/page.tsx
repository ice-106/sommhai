'use client';
import { Events } from '@sommhai/shared-type/src';
import { Button } from '@sommhai/ui/components/ui/button';
import { Input } from '@sommhai/ui/components/ui/input';
import { SlidersHorizontal, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import CreateEvent from '@/components/organizer/CreateEventbutton';
import EventCard from '@/components/organizer/EventCard';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

const EventContainer = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(LiffContext);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    function fetchEvents() {
      setLoading(true);
      try {
        const res = fetch(`${API_BASE_URL}/org/events?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setEvents(data);
            console.log(data);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    }

    fetchEvents();
  }, [userId]);
  useEffect(() => {
    console.log(events);
  }, [events]);

  useEffect(() => {
    let filtered = events;
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (activeFilter === '7days') {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      filtered = filtered.filter((event) => {
        const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date || new Date();

        return eventDate <= nextWeek;
      });
    } else if (activeFilter === '1month') {
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);

      filtered = filtered.filter((event) => {
        const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date || new Date();

        return eventDate <= nextMonth;
      });
    }
    setFilteredEvents(filtered);
    console.log('Filtered events:', filtered, showFilters);
  }, [searchTerm, events, activeFilter]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilter('');
    setSearchTerm('');
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='flex h-full w-full flex-col items-center gap-5 overflow-y-auto'>
      <div className='flex w-full flex-row items-center justify-center gap-4 px-4'>
        <Input
          className='mt-8 max-w-[85vw] px-5'
          placeholder='⌕ Search events'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <Button
          className={`rounded-full ${activeFilter ? 'text-orange-2 bg-orange-6' : ''} mt-8`}
          size='icon'
          variant='ghost'
          onClick={toggleFilters}
        >
          <SlidersHorizontal className='w-[5vw]' />
        </Button>
      </div>
      {showFilters && (
        <div className='w-full rounded-3xl border border-gray-200 bg-white p-3 shadow-lg'>
          <div className='flex flex-row justify-between gap-2'>
            <Button
              className={`w-full justify-center ${
                activeFilter === '7days' ? 'bg-orange-1' : 'bg-orange-4 text-black hover:bg-amber-400'
              }`}
              size='sm'
              variant={activeFilter === '7days' ? 'default' : 'outline'}
              onClick={() => applyFilter('7days')}
            >
              7 days
            </Button>
            <Button
              className={`w-full justify-center ${
                activeFilter === '1month' ? 'bg-orange-1' : 'bg-orange-4 text-black hover:bg-amber-400'
              }`}
              size='sm'
              variant={activeFilter === '1month' ? 'default' : 'outline'}
              onClick={() => applyFilter('1month')}
            >
              1 month
            </Button>
            <div className='flex w-8 items-center justify-between'>
              {activeFilter !== '' && (
                <Button className='h-6' size='sm' variant='ghost' onClick={clearFilters}>
                  <X className='h-4 w-4' />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard
            date={typeof event.date === 'string' ? new Date(event.date) : (event.date ?? new Date())}
            detail={event.description ?? ''}
            key={event.eid}
            link={event.eid}
            name={event.name}
          />
        ))
      ) : searchTerm === '' ? (
        <div className='flex w-full items-center justify-center py-8 text-gray-500'>No events found</div>
      ) : (
        <div className='flex w-full items-center justify-center py-8 text-gray-500'>
          No events found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

function OrganizerPage() {
  // const session = useSession();
  // const router = useRouter();
  // const [loaded, setLoad] = React.useState(false);
  // useEffect(() => {
  //   if (session.status === 'unauthenticated') {
  //     router.push('/auth');
  //     setLoad(true);
  //   }
  // }, []);
  return (
    <div className='flex h-full w-full flex-col'>
      <HeaderBurgur name='Organizer' />
      <div className='mt-5 flex w-full items-center gap-2 px-7'></div>
      <div className='mt-5 flex w-full items-center justify-center px-7'>
        <CreateEvent />
      </div>
      <div className='flex h-[69%] w-full flex-col gap-16 overflow-y-auto px-12 pt-12'>
        <EventContainer />
      </div>
    </div>
  );
}

export default OrganizerPage;
