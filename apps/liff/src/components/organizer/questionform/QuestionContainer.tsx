'use client';
import { redirect, useParams } from 'next/navigation';

import { ConfirmButton } from '../buttons';
import AddQuestionbox from './AddQuestionbox';
import QuestionCard from './QuestionCard';

function QuestionContainer() {
  const { id } = useParams();
  function RedirectBack() {
    redirect(`/organizer/event/${id}`);
  }
  return (
    <div className='mb-[12px] flex w-full flex-col'>
      <div className='flex flex-col'>
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </div>
      <AddQuestionbox />
      <ConfirmButton onClick={RedirectBack} />
    </div>
  );
}

export default QuestionContainer;
