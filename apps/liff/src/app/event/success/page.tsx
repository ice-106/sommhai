import Link from 'next/link';
import React from 'react';

function Success() {
  return (
    <div>
      Success
      <Link href='/home'>
        <h1 className='font-bold text-blue-500'>Next</h1>
      </Link>
    </div>
  );
}

export default Success;
