'use client';

import { ChartConfig, ChartContainer } from '@sommhai/ui/components/ui/chart';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

const attendeePercen = 25;

const chartData = [
  { data: 'attendee', value: attendeePercen, fill: '#F6BB0A' },
  { data: 'missing', value: 100 - attendeePercen, fill: '#FDE88D' },
];

const chartConfig = {
  attendee: {
    label: 'attendee',
  },
  missing: {
    label: 'missing',
  },
} satisfies ChartConfig;

export function DonutChart() {
  return (
    <ChartContainer className='min-h-[64px] w-full' config={chartConfig}>
      <PieChart>
        <Pie data={chartData} dataKey='value' innerRadius={24} nameKey='data' outerRadius={31} strokeWidth={5}>
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
