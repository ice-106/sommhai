import React from 'react';

async function LetterPage({ params }: { params: Promise<{ lid: string }> }): Promise<React.ReactElement> {
  const { lid } = await params;
  console.log('lid:', lid);

  return (
    <div>
      <div>
        <p className='text-2xl text-gray-600'>LetterPage - {lid}</p>
      </div>
    </div>
  );
}

export default LetterPage;
