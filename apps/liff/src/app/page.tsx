import Link from 'next/link';
import React from 'react';

function Landing() {
  return (
    <div>
      <h1>Welcome to sommhai!</h1>
      <Link href='/home'>
        <h1 className='font-bold text-blue-600'>Home</h1>
      </Link>
    </div>
  );
}

export default Landing;
