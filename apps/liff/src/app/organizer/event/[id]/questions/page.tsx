'use client';
import { Question } from '@sommhai/shared-type/src';
import { Button } from '@sommhai/ui/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import Loading from '@/components/common/loading';
import { ConfirmButton } from '@/components/organizer/buttons';
import QuestionContainer from '@/components/organizer/questionform/QuestionContainer';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

function QueationPage() {
  const { id } = useParams();
  const { userId } = useContext(LiffContext);
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
  const [hostId, setHostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostId = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/org/events/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('event data', data);
        setHostId(data.host_uid);
      } catch (error) {
        console.error('Error fetching host ID:', error);
      }
    };

    fetchHostId();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (hostId && userId !== hostId) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-2 text-wrap px-8 text-center text-2xl font-bold'>
        You are not authorized to edit this event
        <Link href={'/organizer'}>
          <Button>
            <Home className='mr-2 h-4 w-4' />
            Back to Home
          </Button>
        </Link>
      </div>
    );
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
