'use client';
import { Button } from '@sommhai/ui/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function LandingPage() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setIsLargeScreen(window.innerWidth > 500);
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex h-dvh w-full flex-col'>
      <div className='bg-orange-3 h-full w-full pb-[20vh]'></div>
      {isLargeScreen ? (
        <div className='absolute flex h-[75vh] w-full items-end'></div>
      ) : (
        <div className='absolute flex h-3/5 w-full items-end'>
          <Image
            alt={'background'}
            className='absolute w-2/3 pb-[2vw]'
            height={24}
            src={'/Ellipse 22.svg'}
            width={72}
          />
          <Image
            alt={'background'}
            className='absolute h-full w-screen'
            height={24}
            src={'/Rectangle 50.svg'}
            width={70}
          />
        </div>
      )}
      <div className='absolute flex h-1/2 w-full flex-col items-center justify-start'>
        <h1 className='pb-44 pt-56 text-4xl font-bold text-white'>Sommhai!</h1>
        <Image alt={'sommhai-logo'} height='200' src={'/logo-sommhai.svg'} width='200' />
      </div>
      <div className='mt-auto flex h-screen flex-col items-center justify-end pb-[6vw]'>
        <div className='flex-col items-center justify-end'>
          <p className='text-center text-[5vh] font-bold leading-9 text-black'>Welcome</p>
          <p className='pt-4 text-center text-lg font-medium leading-relaxed text-black'>Select your role</p>
        </div>
        <div className='mt-24 flex w-full flex-col items-center gap-[5vh]'>
          <Link className='flex h-full w-[80vw] items-center justify-center' href='/attendee'>
            <div className='absolute h-20 w-full rounded-3xl'></div>
            <Button className='bg-orange-2 h-56 w-full rounded-3xl text-2xl font-bold'>Attendee</Button>
          </Link>
          <Link className='flex h-full w-[80vw] items-center justify-center' href='/organizer'>
            <div className='absolute h-20 w-full rounded-3xl'></div>
            <Button className='bg-white-pure text-orange-2 border-orange-2 h-56 w-full rounded-3xl border-2 text-2xl font-bold'>
              Organizer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
