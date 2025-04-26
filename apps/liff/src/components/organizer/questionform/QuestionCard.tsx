'use client';
import { Input } from '@sommhai/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sommhai/ui/components/ui/select';
import { useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';

import { CheckedboxQuestions, MultipleQuestions } from './MultipleQuestions';
type QuestionCardProps = {
  text: string;
  qid: string;
  options?: string[];
  type: string;
  isRequired: boolean;
  onDelete?: (qid: string) => void;
};

function QuestionCard({ text, qid, type, isRequired, onDelete, options }: QuestionCardProps) {
  const [question, setQuestion] = useState(text);
  const [questionType, setQuestionType] = useState(type);
  console.log(options);
  return (
    <div className='bg-white-pure rounded-24 mx-auto mt-2 flex h-full w-full flex-col px-[24px] py-12'>
      <div className='mt-[7.5px]'>
        <Select value={questionType} onValueChange={setQuestionType}>
          <div className='flex w-full items-center justify-start gap-2'>
            <SelectTrigger className='bg-orange-4 text-regular-14 focus:border-orange-4 w-full pl-[15px] text-[5vw] font-semibold text-gray-600 focus:outline-none'>
              <SelectValue className='placeholder-white-pure text-white-pure' placeholder='Type' />
            </SelectTrigger>
            <IoCloseCircleSharp
              className='h-[8vw] w-[8vw] cursor-pointer text-[#E74C3C]'
              onClick={() => onDelete?.(qid)}
            />
          </div>

          <SelectContent>
            <SelectItem value='SHORT_ANSWER'>Short answer</SelectItem>
            <SelectItem value='MULTIPLE_CHOICE'>Multiple choices</SelectItem>
            <SelectItem value='CHECKBOX'>Checkbox</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='mt-12 flex w-full flex-col'>
        {questionType === 'SHORT_ANSWER' && ShortQuestion(text)}
        {questionType === 'MULTIPLE_CHOICE' && <MultipleQuestions options={options} question={text} />}
        {questionType === 'CHECKBOX' && <CheckedboxQuestions options={options} question={text} />}
      </div>
    </div>
  );
}

function ShortQuestion(question: string) {
  return (
    <Input
      className='focus-visible:border-orange-1 shadow-orange-5 !border-l-0 !border-r-0 !border-t-0 border-b-2 border-b-gray-300 shadow-md focus-visible:outline-none focus-visible:ring-0'
      value={question}
    />
  );
}

export default QuestionCard;
