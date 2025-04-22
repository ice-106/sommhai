import { Checkbox } from '@sommhai/ui/components/ui/checkbox';
import { useState } from 'react';
export function MultipleQuestions() {
  const options = ['red', 'blue', 'green'];
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelected = (value: string) => {
    setSelected(value === selected ? null : value);
  };

  return (
    <div className='flex w-full flex-1 flex-col gap-[12px]'>
      {options.map((option) => (
        <label className='text-medium-18 flex' key={option}>
          <Checkbox
            checked={selected === option}
            className='border-orange-3 data-[state=checked]:bg-orange-3 mt-[6px]'
            onCheckedChange={() => handleSelected(option)}
          />
          <span className='ml-[12px]'>{option}</span>
        </label>
      ))}
    </div>
  );
}

export function CheckedboxQuestions() {
  const options = ['red', 'blue', 'green'];
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  return (
    <div className='flex w-full flex-1 flex-col gap-[12px]'>
      {options.map((option) => (
        <label className='text-medium-18 flex' key={option}>
          <Checkbox
            checked={selected.includes(option)}
            className='border-orange-3 data-[state=checked]:bg-orange-3 mt-[6px]'
            onCheckedChange={() => toggleOption(option)}
          />
          <span className='ml-[12px]'>{option}</span>
        </label>
      ))}
    </div>
  );
}
