'use client';
import { Button } from '@sommhai/ui/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';

interface TimePickerProps {
  onChange: (time: { hour: number; minute: number }) => void;
  initialHour: number;
  initialMinute: number;
  is24Hour: boolean;
}

function TimePicker({ onChange, initialHour, initialMinute, is24Hour }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [ampm, setAmPm] = useState(initialHour >= 12 ? 'PM' : 'AM');
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const ampmRef = useRef<HTMLDivElement>(null);

  // Generate hours (based on 12h or 24h format)
  const hours: number[] = is24Hour
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));

  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // AM/PM options
  const ampmOptions = ['AM', 'PM'];

  // Update parent component when time changes
  useEffect(() => {
    if (onChange) {
      let hour = selectedHour;
      if (!is24Hour) {
        // Convert from 12h to 24h format for consistency
        if (ampm === 'PM' && selectedHour < 12) {
          hour = selectedHour + 12;
        } else if (ampm === 'AM' && selectedHour === 12) {
          hour = 0;
        }
      }
      onChange({ hour, minute: selectedMinute });
    }
  }, [selectedHour, selectedMinute, ampm, onChange, is24Hour]);

  // Function to add snap behavior
  const snapToItem = (container: HTMLDivElement, itemHeight: number, index: number): void => {
    if (container) {
      container.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });
    }
  };

  // Handle scrolling for hours with momentum and snap
  const handleHourScroll = () => {
    if (!hourRef.current) return;

    const container = hourRef.current;
    const itemHeight = 40; // Fixed height for each item
    const index = Math.round(container.scrollTop / itemHeight);

    if (index >= 0 && index < hours.length) {
      const newHour = hours[index] as number;
      if (newHour !== selectedHour) {
        setSelectedHour(newHour);

        // Add a slight delay before snapping to allow for continuous scrolling
        setTimeout(() => {
          if (Math.abs(container.scrollTop - index * itemHeight) < 10) {
            snapToItem(container, itemHeight, index);
          }
        }, 150);
      }
    }
  };

  const handleMinuteScroll = () => {
    if (!minuteRef.current) return;

    const container = minuteRef.current;
    const itemHeight = 40;
    const index = Math.round(container.scrollTop / itemHeight);

    if (index >= 0 && index < minutes.length) {
      const newMinute = minutes[index] as number;
      if (newMinute !== selectedMinute) {
        setSelectedMinute(newMinute);

        setTimeout(() => {
          if (Math.abs(container.scrollTop - index * itemHeight) < 10) {
            snapToItem(container, itemHeight, index);
          }
        }, 150);
      }
    }
  };

  // Handle AM/PM scrolling
  const handleAmPmScroll = () => {
    if (!ampmRef.current || is24Hour) return;

    const container = ampmRef.current;
    const itemHeight = 40; // Fixed height for each item
    const index = Math.round(container.scrollTop / itemHeight);

    if (index >= 0 && index < ampmOptions.length) {
      const newAmPm = ampmOptions[index] as string;
      if (newAmPm !== ampm) {
        setAmPm(newAmPm);

        // Add a slight delay before snapping
        setTimeout(() => {
          if (Math.abs(container.scrollTop - index * itemHeight) < 10) {
            snapToItem(container, itemHeight, index);
          }
        }, 150);
      }
    }
  };

  // Handle direct click selection
  const handleSelectHour = (hour: number, index: number): void => {
    setSelectedHour(hour);
    if (hourRef.current) {
      snapToItem(hourRef.current, 40, index);
    }
  };

  const handleSelectMinute = (minute: number, index: number) => {
    setSelectedMinute(minute);
    if (minuteRef.current) {
      snapToItem(minuteRef.current, 40, index);
    }
  };

  const handleSelectAmPm = (value: string, index: number) => {
    setAmPm(value);
    if (ampmRef.current) {
      snapToItem(ampmRef.current, 40, index);
    }
  };

  useEffect(() => {
    // Set initial scroll position
    if (hourRef.current) {
      const hourIndex = hours.findIndex((h) => h === selectedHour);
      if (hourIndex !== -1) {
        hourRef.current.scrollTop = hourIndex * 40;
      }
    }

    if (minuteRef.current) {
      minuteRef.current.scrollTop = selectedMinute * 40;
    }

    if (ampmRef.current && !is24Hour) {
      const ampmIndex = ampmOptions.findIndex((a) => a === ampm);
      if (ampmIndex !== -1) {
        ampmRef.current.scrollTop = ampmIndex * 40;
      }
    }
  }, []);

  return (
    <div className='flex w-full flex-col items-center justify-center px-20 py-10'>
      <div className='relative mx-8 flex w-full items-center justify-between rounded-2xl bg-white px-20 shadow-lg'>
        {/* Hours Column */}
        <div className='scrollbar-hide h-[200px] w-full overflow-auto' ref={hourRef} onScroll={handleHourScroll}>
          <div className='h-80' />
          {hours.map((hour, index) => (
            <div
              className={`flex h-40 cursor-pointer items-center justify-center text-xl ${
                selectedHour === hour ? 'font-bold text-black' : 'text-gray-400'
              }`}
              key={hour}
              onClick={() => handleSelectHour(hour, index)}
            >
              {hour.toString().padStart(2, '0')}
            </div>
          ))}
          <div className='h-80' /> {/* Bottom padding */}
        </div>

        <div className='mx-1 text-xl font-bold'>:</div>

        {/* Minutes Column */}
        <div className='scrollbar-hide h-[200px] w-full overflow-auto' ref={minuteRef} onScroll={handleMinuteScroll}>
          <div className='h-80' /> {/* Top padding */}
          {minutes.map((minute, index) => (
            <div
              className={`flex h-40 cursor-pointer items-center justify-center text-xl ${
                selectedMinute === minute ? 'font-bold text-black' : 'text-gray-400'
              }`}
              key={minute}
              onClick={() => handleSelectMinute(minute, index)}
            >
              {minute.toString().padStart(2, '0')}
            </div>
          ))}
          <div className='h-80' />
        </div>

        {!is24Hour && (
          <div className='scrollbar-hide ml-2 h-[200px] w-full overflow-auto' ref={ampmRef} onScroll={handleAmPmScroll}>
            <div className='h-80' /> {/* Top padding */}
            {ampmOptions.map((option, index) => (
              <div
                className={`flex h-40 cursor-pointer items-center justify-center text-xl ${
                  ampm === option ? 'font-bold text-black' : 'text-gray-400'
                }`}
                key={option}
                onClick={() => handleSelectAmPm(option, index)}
              >
                {option}
              </div>
            ))}
            <div className='h-80' /> {/* Bottom padding */}
          </div>
        )}

        <div className='bg-orange-3 border-orange-3 pointer-events-none absolute left-0 right-0 top-1/2 h-[40px] -translate-y-1/2 transform border-y bg-opacity-20' />
      </div>
    </div>
  );
}

// Custom CSS to hide scrollbars while keeping functionality
const ScrollbarHideStyles = () => (
  <style global jsx>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Smooth scrolling */
    .scrollbar-hide {
      scroll-behavior: smooth;
    }
  `}</style>
);

// Example usage component with both 12h and 24h options with outout of the selected time
function TimePickerSelect() {
  const [selectedTime, setSelectedTime] = useState({
    hour: new Date().getHours() as number,
    minute: new Date().getMinutes() as number,
  });
  const [is24Hour, setIs24Hour] = useState(true);

  const handleTimeChange = (time: any) => {
    setSelectedTime(time);
  };

  return (
    <div className='bg-white-bg flex min-h-screen flex-col items-center p-6'>
      <ScrollbarHideStyles />

      <h2 className='mb-6 text-center text-2xl font-semibold'>Time Selector</h2>

      <div className='mb-6 flex flex-row justify-between'>
        <label className='flex cursor-pointer items-center gap-4'>
          <input checked={is24Hour} className='sr-only' type='checkbox' onChange={() => setIs24Hour(!is24Hour)} />
          {is24Hour ? (
            <Button onClick={() => setIs24Hour(!is24Hour)}>AM-Pm format</Button>
          ) : (
            <Button onClick={() => setIs24Hour(!is24Hour)}>24-hour format</Button>
          )}
          <div
            className={`h-6 w-12 rounded-full transition-colors ${is24Hour ? 'bg-orange-3' : 'bg-gray-300'} relative`}
          >
            <div
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${is24Hour ? 'translate-x-7' : 'translate-x-1'}`}
            ></div>
          </div>
          <span className='ml-2 text-sm font-medium'>{is24Hour ? '24-hour format' : '12-hour format'}</span>
        </label>
      </div>

      <div className='w-full max-w-xs rounded-xl bg-white p-6 shadow-lg'>
        <TimePicker
          initialHour={selectedTime.hour}
          initialMinute={selectedTime.minute}
          is24Hour={is24Hour}
          onChange={handleTimeChange}
        />

        <div className='mt-6 border-t border-gray-100 pt-4'>
          <p className='text-center text-gray-600'>
            Selected time:{' '}
            <span className='font-bold text-black'>
              {selectedTime.hour.toString().padStart(2, '0')}:{selectedTime.minute.toString().padStart(2, '0')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TimePickerSelect;
