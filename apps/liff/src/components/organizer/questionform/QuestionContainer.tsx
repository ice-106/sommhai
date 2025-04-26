'use client';

import { questionBaseInfo } from '@sommhai/shared-type/src';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import Loading from '@/components/common/loading';
import { API_BASE_URL } from '@/env';

import { ConfirmButton } from '../buttons';
import AddQuestionBox from './AddQuestionbox';
import QuestionCard from './QuestionCard';

// Utility function for fetching with API contract
async function fetchWithContract(url: string, options: RequestInit = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Error fetching ${url}`);
  }
  return res.json();
}

function QuestionContainer() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<z.infer<typeof questionBaseInfo>[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect back to event detail page
  function redirectBack() {
    redirect(`/organizer/event/${id}`);
  }

  // Fetch the questions from the server
  async function fetchQuestions() {
    try {
      const res = await fetchWithContract(`${API_BASE_URL}/org/events/${id}/questions`);
      setQuestions(res);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
    setLoading(false);
  }

  // Add a new question to the event
  async function addQuestion() {
    try {
      const res = await fetchWithContract(`${API_BASE_URL}/org/events/${id}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: [
            {
              question: 'New Question',
              type: 'SHORT_ANSWER',
              required: false,
            },
          ],
        }),
      });
      setQuestions((prev) => [...prev, ...res]);
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  }

  // Update an existing question
  async function updateQuestion(questionId: string, newData: Partial<z.infer<typeof questionBaseInfo>>) {
    try {
      const res = await fetchWithContract(`${API_BASE_URL}/org/events/${id}/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newData.question,
          type: newData.type,
          required: newData.required,
          options: newData.options,
        }),
      });
      console.log('Updated question:', res);
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  }

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className='mb-[12px] flex w-full flex-col'>
      <div className='flex flex-col'>
        {questions.length > 0 ? (
          questions.map((q) => (
            <QuestionCard data={q} key={q.qid} onUpdate={(newData) => updateQuestion(q.qid, newData)} />
          ))
        ) : (
          <p>No question yet</p>
        )}
      </div>
      <div onClick={addQuestion}>
        <AddQuestionBox />
      </div>
      <ConfirmButton onClick={redirectBack} />
    </div>
  );
}

export default QuestionContainer;
