'use client';
import { Checkbox } from '@sommhai/ui/components/ui/checkbox';
import { Input } from '@sommhai/ui/components/ui/input';
import { Trash } from 'lucide-react';

export function MultipleQuestions({
  question,
  setQuestion,
  setOptions,
  options,
}: {
  question: string;
  options: string[];
  setQuestion: (question: string) => void;
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleClick = () => {
    setOptions((prev) => [...prev, '']);
  };
  const handleDeleteOption = (index: number) => {
    setOptions((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className='flex w-full flex-1 flex-col gap-[12px]'>
      <div className='flex w-full flex-row items-center justify-start gap-2'>
        <label className='text-lg font-medium'>Questions:</label>
        <Input
          className='border-orange-3 focus-visible:border-orange-1 shadow-orange-5 w-full border-2 !border-l-0 !border-r-0 !border-t-0 border-b-2 shadow-md focus-visible:outline-none focus-visible:ring-0'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <label className='text-lg font-medium'>Choices:</label>
      {options.map((option, idx) => (
        <label className='text-medium-18 flex cursor-pointer items-center gap-3' key={idx}>
          <div className={`border-orange-4 flex h-[6vw] w-[7vw] items-center justify-center rounded-full border-2`}>
            {<div className='h-6 w-6 rounded-full bg-white'></div>}
          </div>
          <Input
            className='focus-visible:border-orange-1 shadow-orange-5 w-full !border-l-0 !border-r-0 !border-t-0 border-b-2 border-b-gray-300 shadow-md focus-visible:outline-none focus-visible:ring-0'
            value={options[idx]}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }}
          />
          <Trash className='w-[64px]' onClick={() => handleDeleteOption(idx)} />
        </label>
      ))}
      <div className='flex w-full flex-row gap-4' onClick={handleClick}>
        <div className={`border-orange-4 flex h-[6vw] w-[6vw] items-center justify-center rounded-full border-2`}>
          {<div className='h-6 w-6 rounded-full bg-white'></div>}
        </div>
        <a className='text-medium text-gray-400'>Add option</a>
      </div>
    </div>
  );
}

export function CheckedboxQuestions({
  question,
  options,
  setQuestion,
  setOptions,
}: {
  question: string;
  options: string[];
  setQuestion: (question: string) => void;
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleClick = () => {
    setOptions((prev) => [...prev, '']);
  };
  const handleDeleteOption = (index: number) => {
    setOptions((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className='flex w-full flex-1 flex-col gap-[12px]'>
      <div className='flex w-full flex-row items-center justify-start gap-2'>
        <label className='text-lg font-medium'>Questions:</label>
        <Input
          className='border-orange-3 focus-visible:border-orange-1 shadow-orange-5 w-full border-2 !border-l-0 !border-r-0 !border-t-0 border-b-2 shadow-md focus-visible:outline-none focus-visible:ring-0'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <label className='text-lg font-medium'>Choices:</label>
      {options.map((option, idx) => (
        <label className='text-medium-18 flex gap-3' key={idx}>
          <Checkbox className='border-orange-3 data-[state=checked]:bg-orange-3 mt-[6px]' />
          <Input
            className='focus-visible:border-orange-1 shadow-orange-5 ml-4 w-full !border-l-0 !border-r-0 !border-t-0 border-b-2 border-b-gray-300 shadow-md focus-visible:outline-none focus-visible:ring-0'
            value={options[idx]}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }}
          />
          <Trash className='w-[64px]' onClick={() => handleDeleteOption(idx)} />
        </label>
      ))}
      <div className='flex w-full flex-row gap-4' onClick={handleClick}>
        <Checkbox className='border-orange-3 data-[state=checked]:bg-orange-3 mt-[6px]' />
        <a className='text-medium text-gray-400'>Add option</a>
      </div>
    </div>
  );
}
