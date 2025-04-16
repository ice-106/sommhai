import { Button } from '@sommhai/ui/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function LandingPage() {
  return (
    <div className='flex h-dvh w-full flex-col'>
      <div className='bg-orange-3 h-56 w-full'></div>
      <div className='absolute flex h-3/5 w-full items-end'>
        <Image alt={'background'} className='w-2/3' height={24} src={'/Ellipse 22.svg'} width={72} />
        <Image
          alt={'background'}
          className='absolute h-full w-screen'
          height={24}
          src={'/Rectangle 50.svg'}
          width={70}
        />
      </div>
      <div className='absolute flex h-1/2 w-full flex-col items-center justify-start'>
        <h1 className='pb-44 pt-56 text-4xl font-bold text-white'>Sommhai!</h1>
        <Image alt={'sommhai-logo'} height='200' src={'/logo-sommhai.svg'} width='200' />
      </div>
      <div className='mt-28 flex h-screen flex-col items-center justify-end pb-56'>
        <div className='flex-col items-center justify-end'>
          <p className='text-center text-[7vw] font-bold leading-9 text-black'>Welcome</p>
          <p className='mt-16 text-center text-lg font-medium leading-relaxed text-black'>Select your role</p>
        </div>
        <div className='mt-24 flex w-full flex-col items-center gap-48'>
          <Link className='flex h-full w-72 items-center justify-center' href='/attendee'>
            <div className='absolute h-20 w-72 rounded-3xl'></div>
            <Button className='bg-orange-2 h-56 w-full rounded-3xl text-2xl font-bold'>Attendee</Button>
          </Link>
          <Link className='flex h-full w-72 items-center justify-center' href='/organizer'>
            <div className='absolute h-20 w-72 rounded-3xl'></div>
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
