'use client';
import { questionBaseInfo } from '@sommhai/shared-type/src'; // adjust import path!
import { Input } from '@sommhai/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sommhai/ui/components/ui/select';
import { useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { z } from 'zod';

import { CheckedboxQuestions, MultipleQuestions } from './MultipleQuestions';

type QuestionCardProps = {
  data?: z.infer<typeof questionBaseInfo>; // Optional data
  onUpdate: (updatedQuestion: any) => void; // onUpdate function passed as a prop
};

function QuestionCard({ data, onUpdate }: QuestionCardProps) {
  const [question, setQuestion] = useState(data?.question || 'Question Name');
  const [questionType, setQuestionType] = useState(
    data?.type === 'SHORT_ANSWER'
      ? 'short'
      : data?.type === 'MULTIPLE_CHOICE'
        ? 'multi'
        : data?.type === 'CHECKBOX'
          ? 'check'
          : '',
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    onUpdate({ ...data, question: newQuestion }); // Call onUpdate with the new question data
  };

  const handleTypeChange = (value: string) => {
    setQuestionType(value);
    onUpdate({ ...data, type: value }); // Call onUpdate with the new question type
  };

  return (
    <div className='bg-white-pure rounded-24 mx-auto mt-[12px] flex min-h-[136px] w-[345px] flex-col px-[24px] py-[16px]'>
      {/* Header section */}
      <div className='flex w-full justify-between'>
        <input
          className='text-semi-18 shadow-none focus-visible:border-b-2 focus-visible:border-b-gray-300 focus-visible:outline-none'
          type='text'
          value={question}
          onChange={handleQuestionChange} // Handle question change
        />
        <IoCloseCircleSharp className='mt-[3px] text-[#E74C3C]' size='24px' />
      </div>

      {/* Question Type Selector */}
      <div className='mt-[7.5px]'>
        <Select value={questionType} onValueChange={handleTypeChange}>
          {' '}
          {/* Handle question type change */}
          <SelectTrigger className='bg-orange-3 text-regular-14 w-[180px] pl-[15px]'>
            <SelectValue className='placeholder-black-pure' placeholder='Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='short'>Short answer</SelectItem>
            <SelectItem value='multi'>Multiple choices</SelectItem>
            <SelectItem value='check'>Checkbox</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Render different question types based on selected type */}
      <div className='mt-12 flex w-full flex-col'>
        {questionType === 'short' && <ShortQuestion />}
        {questionType === 'multi' && <MultipleQuestions />}
        {questionType === 'check' && <CheckedboxQuestions />}
      </div>
    </div>
  );
}

function ShortQuestion() {
  return (
    <Input className='focus-visible:border-b-black-pure !border-l-0 !border-r-0 !border-t-0 border-b-2 border-b-gray-300 shadow-none focus-visible:outline-none focus-visible:ring-0' />
  );
}

export default QuestionCard;
