'use client';

import { ChartConfig, ChartContainer } from '@sommhai/ui/components/ui/chart';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

const chartConfig = {
  attendee: {
    label: 'attendee',
  },
  missing: {
    label: 'missing',
  },
} satisfies ChartConfig;

export function DonutChart({ attendeePercen }: { attendeePercen: number }) {
  const chartData = [
    { data: 'attendee', value: attendeePercen, fill: '#F6BB0A' },
    { data: 'missing', value: 100 - attendeePercen, fill: '#FDE88D' },
  ];
  return (
    <ChartContainer className='min-h-full' config={chartConfig}>
      <PieChart className='h-full w-full'>
        <Pie data={chartData} dataKey='value' innerRadius={54} nameKey='data' outerRadius={96} strokeWidth={5}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text dominantBaseline='middle' textAnchor='middle' x={viewBox.cx} y={viewBox.cy}>
                    <tspan className='fill-foreground text-[18px] font-bold' x={viewBox.cx} y={viewBox.cy}>
                      {attendeePercen}%
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
