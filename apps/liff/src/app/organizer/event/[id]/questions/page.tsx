'use client';
import { Question } from '@sommhai/shared-type/src';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import { ConfirmButton } from '@/components/organizer/buttons';
import QuestionContainer from '@/components/organizer/questionform/QuestionContainer';
import { API_BASE_URL } from '@/env';

function QueationPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getQuestion = () =>
      fetch(`${API_BASE_URL}/org/events/${id}/questions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data);
          setQuestions(data);
          //setLoading(false);
        });
    getQuestion();
  }, [id]);
  useEffect(() => {
    console.log(questions);
    if (questions.length > 0) {
      setLoading(false);
    }
  }, [questions]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='flex h-full w-full flex-col'>
      <HeaderBurgur name={'Questionaire'} />
      <QuestionContainer questions={questions} setQuestion={setQuestions} />
      <div className='flex h-full w-full flex-col items-center justify-end pb-24'>
        <ConfirmButton onClick={() => {}} />
      </div>
    </div>
  );
}

export default QueationPage;
