'use client';
import { useState } from 'react';

function SelectAll() {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelectAll = () => {
    setIsSelected((prev) => !prev);
  };
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      {!isSelected ? (
        <button
          className='rounded-24 border-orange-3 hover:bg-orange-3-hover text-black-pure poppins mt-[16px] h-[56px] w-full border-[3px] bg-white text-2xl font-medium'
          onClick={handleSelectAll}
        >
          Select All
        </button>
      ) : (
        <button
          className='rounded-24 bg-orange-3 border-orange-3 hover:bg-orange-3-hover text-black-pure poppins mt-[16px] h-[56px] w-full border-[3px] text-2xl font-medium'
          onClick={handleSelectAll}
        >
          Select All
        </button>
      )}
    </div>
  );
}

export default SelectAll;
