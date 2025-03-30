import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Button from '@/components/landing/organizer/button';

const Landing = () => {
  return (
    <div className='flex h-dvh w-full flex-col'>
      <div className='flex h-1/2 flex-col items-center justify-center bg-[#F6BB0A]'>
        <h1 className='text-[15vw] font-bold text-white'>sommhai!</h1>
        <Image alt={'sommhai-logo'} height='200' src={'/logo-sommhai.svg'} width='200' />
      </div>
      <div className='mt-[5vw] flex h-1/3 flex-col items-center justify-between'>
        <div className=''>
          <p className='text-center text-[7vw] font-bold text-black'>Welcome</p>
          <p className='mt-[5vw] text-center text-black'>Select your role</p>
        </div>
        <Link href='/organizer'>
          <Button />
        </Link>
        <Link href='/attendee'>
          <Button />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
