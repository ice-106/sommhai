import { useEffect, useState } from 'react';

interface ProgressBarProps {
  totalSteps: number; // Total number of steps
  currentStep: number; // Current active step (1-based index)
}

function ProgressBar({ totalSteps, currentStep }: ProgressBarProps) {
  // Calculate the overall progress percentage (0-100)
  const [progress, setProgress] = useState(0);
  // Create an array representing each step/question
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  useEffect(() => {
    // Calculate overall progress percentage
    // For example, if we're on step 2 of 4, we're 50% done
    const newProgress = Math.min(100, (currentStep / totalSteps) * 100);

    // Animate to the new progress value without resetting
    setTimeout(() => setProgress(newProgress), 300);
  }, [currentStep, totalSteps]);

  return (
    <div className='flex w-screen flex-col items-center gap-2'>
      <div className='flex h-8 w-full max-w-lg gap-3 overflow-hidden bg-transparent'>
        {steps.map((step) => {
          // Calculate fill percentage for this specific segment
          const segmentProgress = calculateSegmentProgress(step, currentStep, progress, totalSteps);

          return (
            <div className='h-full flex-1 overflow-hidden rounded-[24px]' key={step}>
              {/* The container for each section */}
              <div className='relative h-full w-full rounded-[24px] bg-[#AEAEAE]'>
                {/* Dynamic fill based on progress */}
                <div
                  className='absolute inset-0 origin-left rounded-[24px] bg-white transition-all duration-1000 ease-in-out'
                  style={{ transform: `scaleX(${segmentProgress / 100})` }}
                />

                {/* Step number */}
                {/* <div className='absolute inset-0 flex items-center justify-center text-xs font-medium'>{step}</div> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className='text-sm text-white'>
        Question {currentStep} of {totalSteps}
      </div>
    </div>
  );
}

/**
 * Calculates how much a specific segment should be filled based on overall progress.
 *
 * @param segmentStep - The step number of this segment (1-based)
 * @param currentStep - The current active step (1-based)
 * @param overallProgress - The overall progress percentage (0-100)
 * @param totalSteps - The total number of steps
 * @returns A percentage (0-100) that this segment should be filled
 */
function calculateSegmentProgress(
  segmentStep: number,
  currentStep: number,
  overallProgress: number,
  totalSteps: number,
): number {
  // Each segment represents (100 / totalSteps)% of the overall progress
  const segmentWidth = 100 / totalSteps;

  // Previous segments should be completely filled (100%)
  if (segmentStep < currentStep) {
    return 100;
  }

  // Future segments should be empty (0%)
  if (segmentStep > currentStep) {
    return 0;
  }

  // For the current segment, calculate how far through this segment we are
  // If we're at step 2.5 of 4 steps, and each step is 25%, then the current segment (2)
  // should be 50% filled (because we're halfway through the step)
  const currentStepStartPercent = (currentStep - 1) * segmentWidth;
  const progressInCurrentSegment = overallProgress - currentStepStartPercent;

  // Convert to a percentage of this segment (0-100)
  return (progressInCurrentSegment / segmentWidth) * 100;
}

export default ProgressBar;
