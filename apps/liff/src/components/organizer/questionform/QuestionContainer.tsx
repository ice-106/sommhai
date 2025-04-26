'use client';
import { Question } from '@sommhai/shared-type/src';
import { SlidersHorizontal } from 'lucide-react';
import { redirect, useParams } from 'next/navigation';

import AddQuestionbox from './AddQuestionbox';
import QuestionCard from './QuestionCard';

function QuestionContainer({
  questions,
  setQuestion,
}: {
  questions: Question[];
  setQuestion: (questions: Question[]) => void;
}) {
  const { id } = useParams();
  function RedirectBack() {
    redirect(`/organizer/event/${id}`);
  }
  if (!questions) {
    questions = [];
  }
  console.log(questions);
  return (
    <div className='bg-white-bg flex h-full w-full flex-col'>
      <div className='flex flex-col'>
        <SlidersHorizontal />
        {questions.map((question) => (
          <QuestionCard
            isRequired={question.required}
            key={question.qid}
            options={question.options}
            qid={question.qid}
            text={question.question}
            type={question.type}
            onDelete={() => {
              setQuestion(questions.filter((q) => q.qid !== question.qid));
            }}
          />
        ))}
      </div>
      <div
        className='mx-24 flex items-center justify-center pt-8'
        onClick={() => {
          const uniqueId = `q_${Date.now()}_${Math.random().toString(36)}`;
          setQuestion([...questions, { qid: uniqueId, question: '', type: 'SHORT_ANSWER', required: false }]);
        }}
      >
        <AddQuestionbox />
      </div>
      {/* <div className='flex min-h-full w-full flex-col items-center justify-end'>
        <ConfirmButton onClick={RedirectBack} />
      </div> */}
    </div>
  );
}

export default QuestionContainer;
