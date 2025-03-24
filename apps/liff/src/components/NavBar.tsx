import { House } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <div className='bottom-0 flex h-[30vh] w-full flex-col justify-evenly bg-black'>
      <div className='flex justify-evenly'>
        <div className='flex w-1/3 flex-col items-center justify-center border border-gray-500'>
          <Link href={'/home'}>
            <div className='ml-3'>
              <House color='white' />
            </div>
            <h1 className='font-bold text-blue-600'>Home</h1>
          </Link>
        </div>
        <div className='flex w-1/3 flex-col items-center justify-center border border-gray-500'>
          <Link href={'/home'}>
            <div className='mb-2 h-10 w-10 bg-gray-300' />
            <h1 className='font-bold text-blue-600'>Home</h1>
          </Link>
        </div>
        <div className='flex w-1/3 flex-col items-center justify-center border border-gray-500'>
          <Link href={'/home'}>
            <div className='mb-2 h-10 w-10 bg-gray-300' />
            <h1 className='font-bold text-blue-600'>Home</h1>
          </Link>
        </div>
      </div>
      <div className='flex justify-evenly'>
        <div className='flex w-1/3 flex-col items-center justify-center border border-gray-500'>
          <Link href={'/home'}>
            <div className='mb-2 h-10 w-10 bg-gray-300' />
            <h1 className='font-bold text-blue-600'>Home</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
