'use client';

import { Invite } from '@sommhai/shared-type/src';
import { Card, CardContent, CardHeader, CardTitle } from '@sommhai/ui/components/ui/card';
import { ChartConfig, ChartContainer } from '@sommhai/ui/components/ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PreferChart({ invites }: { invites: Invite[] }) {
  return (
    <Card className='bg-white-pure rounded-24 mx-auto mt-[19px] min-h-[196px] max-w-full px-24 py-12'>
      <CardHeader>
        <CardTitle className='text-medium-16 mx-auto'>Bar Chart - Label</CardTitle>
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
            <XAxis
              axisLine={false}
              dataKey='month'
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={10}
            />
            <Bar dataKey='desktop' fill='var(--color-desktop)' radius={8}>
              <LabelList className='fill-foreground' fontSize={12} offset={12} position='top' />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
