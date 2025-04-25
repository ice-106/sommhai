'use client';
import { Checkbox } from '@sommhai/ui/components/ui/checkbox';
import { Input } from '@sommhai/ui/components/ui/input';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

export function MultipleQuestions() {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = () => {
    setOptions((prev) => [...prev, '']);
  };

  return (
    <div className='flex w-full flex-1 flex-col gap-[12px]'>
      {options.map((option, idx) => (
        <label className='text-medium-18 flex cursor-pointer items-center gap-3' key={idx}>
          <div className={`border-orange-4 flex h-[6vw] w-[7vw] items-center justify-center rounded-full border-2`}>
            {<div className='h-6 w-6 rounded-full bg-white'></div>}
          </div>
          <Input className='focus-visible:border-orange-1 shadow-orange-5 w-full !border-l-0 !border-r-0 !border-t-0 border-b-2 border-b-gray-300 shadow-md focus-visible:outline-none focus-visible:ring-0' />
        </label>
      ))}
      <div
        className='border-orange-5 text-orange-3 rounded-24 mx-auto mt-8 flex h-full w-full items-center justify-center border-2'
        onClick={handleClick}
      >
        <IoAdd size='24px' />
      </div>
    </div>
  );
}

export function CheckedboxQuestions() {
  const [options, setOptions] = useState<string[]>([]);
  const handleClick = () => {
    setOptions((prev) => [...prev, '']);
  };

  return (
    <div className='flex w-full flex-1 flex-col gap-[12px]'>
      {options.map((option) => (
        <label className='text-medium-18 flex gap-3'>
          <Checkbox className='border-orange-3 data-[state=checked]:bg-orange-3 mt-[6px]' />
          <Input className='focus-visible:border-orange-1 shadow-orange-5 ml-4 w-full !border-l-0 !border-r-0 !border-t-0 border-b-2 border-b-gray-300 shadow-md focus-visible:outline-none focus-visible:ring-0' />
        </label>
      ))}
      <div
        className='border-orange-5 text-orange-3 rounded-24 mx-auto mt-8 flex h-full w-full items-center justify-center border-2'
        onClick={handleClick}
      >
        <IoAdd size='24px' />
      </div>
    </div>
  );
}
