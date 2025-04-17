'use client';
import { ChartConfig, ChartContainer } from '@sommhai/ui/components/ui/chart';
import React from 'react';
import { Bar, BarChart, CartesianGrid } from 'recharts';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

function Chart() {
  return (
    <div>
      <ChartContainer className='min-h-[200px] w-full bg-red-600' config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={true} />
          <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
          <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default Chart;
