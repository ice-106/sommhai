'use client';
import { Question } from '@sommhai/shared-type/src';
import { Input } from '@sommhai/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sommhai/ui/components/ui/select';
import { useEffect, useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';

import { CheckedboxQuestions, MultipleQuestions } from './MultipleQuestions';
type QuestionCardProps = {
  text: string;
  qid: string;
  option?: string[];
  type: string;
  isRequired: boolean;
  setQuestions?: (questions: any) => void;
  onDelete?: (qid: string) => void;
};

function QuestionCard({ text, qid, type, isRequired, setQuestions, onDelete, option }: QuestionCardProps) {
  const [question, setQuestion] = useState(text);
  const [questionType, setQuestionType] = useState(type);
  const [options, setOptions] = useState<string[]>(option || []);
  useEffect(() => {
    if (setQuestions) {
      setQuestions((prevQuestions: Question[]) => {
        // Check if this question already exists in the array
        const questionExists = prevQuestions.some((q) => q.qid === qid);

        if (questionExists) {
          // Update existing question
          return prevQuestions.map((q) => {
            if (q.qid === qid) {
              return {
                ...q,
                question: question,
                type: questionType,
                options: options,
              };
            }
            return q;
          });
        } else {
          // Add new question
          return [
            ...prevQuestions,
            {
              qid: qid,
              question: question,
              type: questionType,
              required: false,
              options: options,
            },
          ];
        }
      });
    }
  }, [question, questionType, qid, setQuestions, options]);
  return (
    <div className='bg-white-pure rounded-24 mx-auto mt-2 flex h-full w-full flex-col px-[24px] py-12'>
      <div className='mt-[7.5px]'>
        <Select value={questionType} onValueChange={setQuestionType}>
          <div className='flex w-full items-center justify-start gap-2'>
            <SelectTrigger className='bg-orange-4 text-regular-14 focus:border-orange-4 w-full pl-[15px] text-[5vw] font-semibold text-gray-800 focus:outline-none'>
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
        {questionType === 'SHORT_ANSWER' && ShortQuestion(question, setQuestion)}
        {questionType === 'MULTIPLE_CHOICE' && (
          <MultipleQuestions options={options} question={question} setOptions={setOptions} setQuestion={setQuestion} />
        )}
        {questionType === 'CHECKBOX' && (
          <CheckedboxQuestions
            options={options}
            question={question}
            setOptions={setOptions}
            setQuestion={setQuestion}
          />
        )}
      </div>
    </div>
  );
}

function ShortQuestion(question: string, setQuestion: (questions: any) => void) {
  return (
    <div className='flex w-full flex-row items-center justify-start gap-2'>
      <label className='text-lg font-medium'>Questions:</label>
      <Input
        className='border-orange-3 focus-visible:border-orange-1 shadow-orange-5 w-full border-2 !border-l-0 !border-r-0 !border-t-0 border-b-2 shadow-md focus-visible:outline-none focus-visible:ring-0'
        value={question}
        onChange={(e) => {
          const newQuestion = e.target.value;
          setQuestion(newQuestion);
        }}
      />
    </div>
  );
}

export default QuestionCard;
