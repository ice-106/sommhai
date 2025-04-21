'use client';
import { Button } from '@sommhai/ui/components/ui/button';
import { CheckCircle2Icon, Circle } from 'lucide-react';
import { useState } from 'react';

function SelectAll() {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelectAll = () => {
    setIsSelected((prev) => !prev);
  };
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      {!isSelected ? (
        <Button
          className='border-orange-3 hover:bg-orange-3-hover text-black-pure bg-white-bg mt-[16px] h-[56px] w-full rounded-3xl border-[3px] text-2xl font-medium'
          onClick={handleSelectAll}
        >
          <Circle className='text-orange-3 !size-40' />
          <div className='w-full truncate'>Select All</div>
        </Button>
      ) : (
        <Button
          className='bg-orange-3 border-orange-3 hover:bg-orange-3-hover text-black-pure mt-[16px] h-[56px] w-full rounded-3xl border-[3px] text-2xl font-medium'
          onClick={handleSelectAll}
        >
          <CheckCircle2Icon className='text-orange-3 fill-white-bg !size-40 rounded-full' />
          <div className='w-full truncate'>Select All</div>
        </Button>
      )}
    </div>
  );
}

export default SelectAll;
