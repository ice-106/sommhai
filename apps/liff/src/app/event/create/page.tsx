import Link from 'next/link';
import React from 'react';

function Create() {
  return (
    <div>
      <h1>create the event</h1>
      <Link href='/event/invite'>
        <h1 className='font-bold text-blue-500'>Submit</h1>
      </Link>
    </div>
  );
}

export default Create;
