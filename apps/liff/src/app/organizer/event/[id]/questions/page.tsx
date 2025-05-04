'use client';
import { Question } from '@sommhai/shared-type/src';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
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
  const [submiting, setSubmiting] = useState(false);
  const router = useRouter();
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
          setLoading(false);
        });
    if (loading) getQuestion();
  }, [id]);
  useEffect(() => {
    console.log(questions);
    if (questions.length > 0) {
      setLoading(false);
    }
  }, [questions]);

  const handleSubmit = () => {
    setSubmiting(true);
    console.log('questions', JSON.stringify({ questions: questions }));
    fetch(`${API_BASE_URL}/org/events/${id}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions: questions }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setSubmiting(false);
        router.push(`/organizer/event/${id}`);
      });
  };

  if (submiting) {
    return <Loading />;
  }
  return (
    <div className='flex h-full w-full flex-col'>
      <HeaderBurgur name={'Questionaire'} />
      <QuestionContainer questions={questions} setQuestion={setQuestions} />
      <div className='flex h-full w-full flex-col items-center justify-end pb-24'>
        <ConfirmButton onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default QueationPage;
