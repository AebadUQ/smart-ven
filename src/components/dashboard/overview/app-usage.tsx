'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface BarConfig {
  name: string;
  dataKey: string;
  color: string;
}

export interface AppUsageProps {
  title: string;
  data: { name: string; [key: string]: number | string }[];
  bars: BarConfig[];
  icon?: Icon;
}

export function AppUsage({ title, data, bars, icon: Icon = TrendUpIcon }: AppUsageProps): React.JSX.Element {
  const chartHeight = 300;

  return (
    <Card sx={{ boxShadow: '0 0 15px 1px #00000015' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ width: 'fit-content', p: 3, gap: '15px' }}>
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0 15px 1px #00000015',
          }}
        >
          <Icon size={24} />
        </Box>
        <CardHeader title={title} sx={{ p: '0px' }} />
      </Stack>

      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack divider={<Divider />} spacing={2} sx={{ flex: '1 1 auto' }}>
            <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
              <ResponsiveContainer height={chartHeight}>
                <BarChart barGap={-32} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="name"
                    tickLine={false}
                    type="category"
                    xAxisId={0}
                  />
                  <XAxis axisLine={false} dataKey="name" hide type="category" xAxisId={1} />
                  <YAxis axisLine={false} domain={[0, 'auto']} hide tickCount={6} type="number" />
                  {bars.map((bar, index) => (
                    <Bar
                      key={bar.name}
                      dataKey={bar.dataKey}
                      name={bar.name}
                      fill={bar.color}
                      radius={[5, 5, 5, 5]}
                      barSize={32}
                      animationDuration={300}
                      xAxisId={index}
                    />
                  ))}
                  <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
                </BarChart>
              </ResponsiveContainer>
            </NoSsr>
            <Legend bars={bars} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function Legend({ bars }: { bars: BarConfig[] }): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2}>
      {bars.map((bar) => (
        <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {bar.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { fill: string; name: string; dataKey: string; value: number }[];
  label?: string;
}

function TooltipContent({ active, payload }: TooltipContentProps): React.JSX.Element | null {
  if (!active) return null;

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map((entry) => (
          <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat('en-US').format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
