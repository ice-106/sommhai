'use client';

import type { Answer } from '@sommhai/shared-type/src';
import { Button } from '@sommhai/ui/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@sommhai/ui/components/ui/card';
import { ChartConfig, ChartContainer } from '@sommhai/ui/components/ui/chart';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

const chartConfig = {
  desktop: {
    label: 'Answer',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PreferChart({ data }: { data: Answer[] }) {
  const validQuestions = data.filter(
    (question) => question.responses && question.options && question.options.length > 0,
  );
  const [currentQuestion, setCurrentQuestion] = useState<Answer>(
    validQuestions[0] ??
      ({
        qid: '',
        question: '',
        type: 'SHORT_ANSWER',
        required: false,
        options: [],
        responses: [{ answer: '', uid: '' }],
      } as Answer),
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chartData, setChartData] = useState<Array<{ answer: string; count: number }>>([]);

  useEffect(() => {
    if (!currentQuestion || !currentQuestion.options) {
      setChartData([]);
      return;
    }

    // Initialize counts for all options
    const optionCounts: Record<string, number> = {};
    currentQuestion.options.forEach((option) => {
      optionCounts[option] = 0;
    });

    // Count responses for each option
    currentQuestion.responses.forEach((response) => {
      // Handle case where the answer might contain multiple comma-separated options
      if (response.answer.includes(',')) {
        // Split by comma and trim whitespace
        const selectedOptions = response.answer.split(',').map((opt) => opt.trim());

        // Increment count for each selected option
        selectedOptions.forEach((option) => {
          console.log('option', option, optionCounts);
          if (optionCounts[option] !== undefined) {
            optionCounts[option] += 1;
          }
        });
      } else {
        // Single option selected
        const answer = response.answer.trim();
        if (optionCounts[answer] !== undefined) {
          optionCounts[answer] += 1;
        }
      }
    });

    const newChartData = Object.entries(optionCounts).map(([option, count]) => ({
      answer: option,
      count: count,
    }));
    console.log('chartData', newChartData);
    setChartData(newChartData);
  }, [currentQuestion]);

  // Handle navigation
  const goToPrevious = () => {
    const prevIndex = currentQuestionIndex > 0 ? currentQuestionIndex - 1 : validQuestions.length - 1;
    const prevQuestion = validQuestions[prevIndex];
    if (prevQuestion) {
      setCurrentQuestion(prevQuestion);
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const goToNext = () => {
    const nextIndex = currentQuestionIndex < validQuestions.length - 1 ? currentQuestionIndex + 1 : 0;
    const nextQuestion = validQuestions[nextIndex];
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setCurrentQuestionIndex(nextIndex);
    }
  };

  // If no valid questions, show a message
  if (validQuestions.length === 0) {
    return (
      <div className='flex w-full flex-col items-center justify-center px-8'>
        <Card className='bg-white-pure rounded-24 mx-auto mt-2 h-full w-full px-24 py-12'>
          <CardContent>
            <p className='text-center'>No response data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // const chartData = data
  //   .filter(
  //     (question) =>
  //       question.responses && question.responses.length > 0 && question.options && question.options.length > 0,
  //   )
  //   .flatMap((question) => {
  //     // Count occurrences of each answer
  //     const answerCounts = question.responses.reduce(
  //       (acc, response) => {
  //         acc[response.answer] = (acc[response.answer] || 0) + 1;
  //         return acc;
  //       },
  //       {} as Record<string, number>,
  //     );

  //     // Create entries for all options, including those with zero counts
  //     if (question.options == undefined) return [];
  //     return question.options.map((option) => ({
  //       answer: option,
  //       count: answerCounts[option] || 0,
  //     }));
  //   });
  return (
    <div className='flex w-full flex-col items-center justify-center px-8'>
      <Card className='bg-white-pure rounded-24 mx-auto mt-2 h-full w-full px-24 py-12'>
        <CardHeader>
          <CardTitle className='text-medium-16 mx-auto'>
            {currentQuestion.question || `Question ${currentQuestionIndex + 1 || 1}`}
          </CardTitle>
          <div className='mx-auto mt-8 h-1 w-[100%] border-[1px]'></div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis axisLine={false} dataKey='answer' tickLine={false} tickMargin={10} />
              <Bar dataKey='count' fill='var(--color-desktop)' radius={8}>
                <LabelList className='fill-foreground' fontSize={12} offset={12} position='top' />
              </Bar>
            </BarChart>
          </ChartContainer>
          <div className='mt-6 flex items-center justify-between'>
            <Button className='flex items-center gap-2' variant='outline' onClick={goToPrevious}>
              <ChevronLeft size={16} />
              Previous
            </Button>
            <div className='text-sm'>
              {currentQuestionIndex + 1} of {validQuestions.length}
            </div>
            <Button className='flex items-center gap-2' variant='outline' onClick={goToNext}>
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
