'use client';

import { useParams } from 'next/navigation';
import React from 'react';

function LetterPage() {
  const { lid } = useParams();
  return (
    <div>
      <div>
        <p className='text-2xl text-gray-600'>LetterPage - {lid}</p>
      </div>
    </div>
  );
}

export default LetterPage;
