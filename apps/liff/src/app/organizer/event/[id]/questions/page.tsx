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
  const [initQuestion, setInitQuestion] = useState<Question[]>([]);
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
          setInitQuestion(data);
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
  const deleteQuestion = async () => {
    fetch(`${API_BASE_URL}/org/events/${id}/questions`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionIds: initQuestion.map((question) => question.qid) }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setSubmiting(false);
      });
  };
  const postQuestion = async () => {
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
  const handleSubmit = async () => {
    setSubmiting(true);
    console.log('questions', JSON.stringify({ questions: questions }));
    if (initQuestion.length == 0) {
      await postQuestion();
    } else {
      await deleteQuestion();
      await postQuestion();
    }
  };

  if (submiting) {
    return <Loading />;
  }

  const handleSubmit = () => {
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
        //setLoading(false);
      });
  };

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
