import { useEffect, useState } from 'react';

interface ProgressBarProps {
  totalSteps: number; // Total number of steps
  currentStep: number; // Current active step (1-based index)
}

function ProgressBar({ totalSteps, currentStep }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress as a percentage of total steps
    const stepWidth = 100 / totalSteps;
    setTimeout(() => setProgress(currentStep * stepWidth), 300);
  }, [currentStep, totalSteps]);

  return (
    <div className='flex w-screen flex-col items-center gap-2'>
      <div className='relative flex h-8 w-full max-w-lg gap-2 overflow-hidden rounded-[24px] bg-transparent'>
        {/* Filled section */}
        <div
          className='h-full rounded-[24px] bg-white transition-all duration-1000 ease-in-out'
          style={{ width: `${progress}%` }}
        />
        <div className='h-full flex-1 rounded-[24px] bg-[#AEAEAE]' />
      </div>
    </div>
  );
}

export default ProgressBar;
