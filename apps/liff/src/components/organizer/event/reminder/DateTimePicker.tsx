'use client';
import { Calendar } from '@sommhai/ui/components/ui/calendar';
import { cn } from '@sommhai/ui/lib/utils';
import React, { useState } from 'react';

import TimePicker from '@/components/organizer/event/reminder/TimePicker';

// Interface for the DateTimePicker props
interface DateTimePickerProps {
  onChange?: (dateTime: { date: Date; time: { hour: number; minute: number } }) => void;
  initialDate?: Date;
  onSave?: (data: { title: string; date: Date; time: { hour: number; minute: number }; message?: string }) => void;
}
interface SelectedTime {
  hour: number;
  minute: number;
}

function DateTimeSelect({ onChange, initialDate = new Date(), onSave }: DateTimePickerProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Date>(initialDate);
  const [activeView, setActiveView] = useState<'date' | 'time'>('date');
  const [is24Hour, setIs24Hour] = useState(true);
  const [time, setTime] = useState<SelectedTime>({
    hour: initialDate.getHours(),
    minute: initialDate.getMinutes(),
  });

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);

      if (onChange) {
        onChange({
          date: newDate,
          time,
        });
      }
    }
  };

  const handleTimeChange = (newTime: SelectedTime) => {
    setTime(newTime);
    if (onChange) {
      onChange({ date, time: newTime });
    }
  };

  const disablePastDates = (date: Date) => {
    const today = new Date(initialDate);
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className='mx-auto w-full rounded-lg bg-white shadow-md'>
      <div className='flex items-center border-b border-t px-4 py-2'>
        <div className='flex items-center'>
          <span
            className={cn(
              'rounded-24 mx-4 cursor-pointer border-2 px-4',
              activeView === 'date' ? 'border-orange-3 bg-orange-6 text-black' : 'text-gray-400',
            )}
            onClick={() => setActiveView('date')}
          >
            {date.toLocaleDateString(undefined, {
              month: 'short',
              day: '2-digit',
            })}
          </span>
          <span className='mx-1 text-gray-400'>|</span>
          <span
            className={cn(
              'rounded-24 mx-4 cursor-pointer border-2 px-4',
              activeView === 'time' ? 'border-orange-3 bg-orange-6 text-black' : 'text-gray-400',
            )}
            onClick={() => setActiveView('time')}
          >
            {time.hour.toString().padStart(2, '0')}:{time.minute.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className='shadow-orange-5 flex min-h-full w-full flex-col items-center justify-center py-8 shadow-sm'>
        {activeView === 'date' ? (
          <div className='shadow-orange-6 p-2 shadow-md'>
            <Calendar
              disabled={disablePastDates}
              initialFocus
              mode='single'
              selected={date}
              onSelect={handleDateChange}
            />
          </div>
        ) : (
          <div className='w-full px-20'>
            <div className='w-full origin-top scale-90'>
              <TimePicker onChange={handleTimeChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DateTimePicker() {
  const handleDateTimeChange = (dateTime: { date: Date; time: { hour: number; minute: number } }) => {
    console.log('Selected date and time:', dateTime);
  };

  const handleSave = (data: {
    title: string;
    date: Date;
    time: { hour: number; minute: number };
    message?: string;
  }) => {
    console.log('Form data saved:', data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className='p-4'>
      <DateTimeSelect initialDate={new Date()} onChange={handleDateTimeChange} onSave={handleSave} />
    </div>
  );
}

export { DateTimePicker, DateTimeSelect };
export default DateTimePicker;
