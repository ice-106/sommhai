import Link from 'next/link';
import React from 'react';

function Invite() {
  return (
    <div>
      <div>Select who to Invite</div>
      <Link href='/event/success'>
        <h1 className='font-bold text-blue-500'>Submit</h1>
      </Link>
    </div>
  );
}

export default Invite;
