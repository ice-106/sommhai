import React from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import QuestionContainer from '@/components/organizer/questionform/QuestionContainer';

function page() {
  return (
    <div className='flex min-h-dvh w-dvw flex-col'>
      <HeaderBurgur name='Question' />
      <QuestionContainer />
    </div>
  );
}

export default page;
