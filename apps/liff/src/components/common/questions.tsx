'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/common/loading';

// Define question types
type QuestionType = 'text' | 'radio' | 'checkbox';

// Question interface
interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

interface EventData {
  eventId: string;
  eventName: string;
  questions: Question[];
}

export default function EventQuestionnairePage() {
  const params = useParams();
  const eventId = params?.eventId as string;
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const router = useRouter();

  // Fetch event data and questions
  useEffect(() => {
    function fetchEventData() {
      try {
        // In a real app, fetch from your API
        // const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
        // const data = await response.json();

        // For demo purposes, use sample data
        setTimeout(() => {
          setEventData({
            eventId: eventId || 'event123',
            eventName: 'Birthday Party',
            questions: [
              {
                id: 'name',
                text: "What's your full name?",
                type: 'text',
                required: true,
              },
              {
                id: 'attending',
                text: 'Will you be attending?',
                type: 'radio',
                options: ["Yes, I'll be there!", "No, I can't make it", "Maybe, I'll let you know later"],
                required: true,
              },
              {
                id: 'food',
                text: 'What food options would you prefer?',
                type: 'checkbox',
                options: ['Pizza', 'Burgers', 'Salad', 'Desserts'],
                required: true,
              },
            ],
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setLoading(false);
      }
    }

    fetchEventData();
  }, [eventId]);

  // Handle text input changes
  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Handle radio button selection
  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (questionId: string, value: string) => {
    const currentSelections = Array.isArray(answers[questionId]) ? [...answers[questionId]] : [];

    const newSelections = currentSelections.includes(value)
      ? currentSelections.filter((item) => item !== value)
      : [...currentSelections, value];

    setAnswers((prev) => ({ ...prev, [questionId]: newSelections }));
  };

  // Handle next button click
  const handleNext = () => {
    // If this is the last question, submit the form
    if (eventData && currentStep === eventData.questions.length - 1) {
      handleSubmit();
      return;
    }

    // Validate current question
    const question = eventData?.questions[currentStep];
    if (question?.required) {
      const answer = answers[question.id];
      const isEmpty = answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0);

      if (isEmpty) {
        alert('This question is required');
        return;
      }
    }

    // Move to next question
    setCurrentStep((prev) => prev + 1);
  };

  // Handle form submission
  const handleSubmit = () => {
    try {
      // Submit answers to API
      // const response = await fetch(`${API_BASE_URL}/events/${eventId}/responses`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ answers }),
      // });

      console.log('Form submitted:', answers);

      // Show completion screen
      setCompleted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle return button
  const handleReturn = () => {
    window.location.href = '/attendee'; // Using direct navigation for simplicity
  };

  if (loading) {
    return <Loading />;
  }

  if (!eventData) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-orange-300'>
        <div className='rounded-2xl bg-white p-8'>
          <h2 className='text-xl font-bold'>Event not found</h2>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   // Scroll to the top of the page when the question changes
  //   setCurrentQuestion(eventData.questions[currentStep] || null);
  //   if (eventData.questions[currentStep] == null) {
  //     router.push('/attendee');
  //   }
  // }, [currentStep, eventData, router]);

  // Render completion screen
  if (completed) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-orange-300 p-4'>
        <div className='mx-auto flex w-full max-w-md flex-col items-center rounded-3xl bg-white p-8'>
          <h2 className='mb-4 text-center text-xl font-bold'>
            Thank you for accepting the invitation to "{eventData.eventName}"
          </h2>
          <p className='mb-6 text-center'>See you at the Event!!</p>

          <div className='mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-red-500 text-white'>
            {/* Replace with your mascot image or component */}
            <span className='text-4xl'>🐔</span>
          </div>

          <button className='mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-400 px-4 py-3 font-semibold text-white'>
            Add to Google Calendar
            <div className='h-6 w-6'>
              <svg fill='#4285F4' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <rect fill='white' height='18' rx='2' width='18' x='3' y='4' />
                <path d='M12 10h5v5h-5v-5z' fill='#4285F4' />
              </svg>
            </div>
          </button>

          <button
            className='w-full rounded-xl border border-orange-400 px-4 py-3 font-semibold text-orange-400'
            onClick={handleReturn}
          >
            Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-orange-300'>
      {/* Progress indicator */}
      <div className='w-full px-4 py-6'>
        <div className='flex w-full gap-2'>
          {eventData.questions.map((_, idx) => (
            <div
              className={`h-2 flex-1 rounded-full ${idx <= currentStep ? 'bg-white' : 'bg-gray-300'}`}
              key={idx}
            ></div>
          ))}
        </div>
      </div>

      {/* Question content */}
      <div className='flex flex-1 flex-col justify-center px-4 py-6'>
        <div className='mx-auto w-full max-w-md rounded-3xl bg-white p-8'>
          <h2 className='mb-6 text-2xl font-bold'>{currentQuestion?.text}</h2>

          {currentQuestion?.type === 'text' && (
            <input
              className='w-full border-b-2 border-gray-300 py-2 focus:border-orange-400 focus:outline-none'
              placeholder='Your answer'
              type='text'
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)}
            />
          )}

          {currentQuestion?.type === 'radio' && currentQuestion.options && (
            <div className='space-y-4'>
              {currentQuestion.options.map((option, idx) => (
                <label className='flex cursor-pointer items-center gap-3' key={idx}>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-orange-400 ${answers[currentQuestion.id] === option ? 'bg-orange-400' : 'bg-white'}`}
                  >
                    {answers[currentQuestion.id] === option && <div className='h-3 w-3 rounded-full bg-white'></div>}
                  </div>
                  <input
                    checked={answers[currentQuestion.id] === option}
                    className='hidden'
                    type='radio'
                    onChange={() => handleRadioChange(currentQuestion.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion?.type === 'checkbox' && currentQuestion.options && (
            <div className='space-y-4'>
              {currentQuestion.options.map((option, idx) => {
                const currentValues = answers[currentQuestion.id] || [];
                const isChecked = Array.isArray(currentValues) && currentValues.includes(option);

                return (
                  <label className='flex cursor-pointer items-center gap-3' key={idx}>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 border-orange-400 ${isChecked ? 'bg-orange-400' : 'bg-white'}`}
                    >
                      {isChecked && (
                        <svg
                          className='h-4 w-4 text-white'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            clipRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            fillRule='evenodd'
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      checked={isChecked}
                      className='hidden'
                      type='checkbox'
                      onChange={() => handleCheckboxChange(currentQuestion.id, option)}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Next button */}
      <div className='p-4'>
        <button
          className='w-full rounded-full bg-white px-8 py-4 text-xl font-bold text-orange-400'
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
