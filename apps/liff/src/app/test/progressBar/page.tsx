'use client';

import { useState } from 'react';

import ProgressBar from '@/components/common/progress-bar';

function App() {
  const totalSteps = 7; // Set total number of steps
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className='flex flex-col items-center gap-4 bg-[#F9D342] p-4'>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className='flex gap-2'>
        <button
          className='rounded bg-gray-500 px-4 py-2 text-white'
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
        >
          Previous
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
