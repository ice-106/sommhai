import Link from 'next/link';
import React from 'react';

import Navbar from '@/components/NavBar';

export default async function Home() {
  return (
    <div>
      <h1>Welcome to sommhai!</h1>
      <Link href='/home'>
        <h1 className='font-bold text-blue-600'>Home</h1>
      </Link>
      <Navbar />
    </div>
  );
}
