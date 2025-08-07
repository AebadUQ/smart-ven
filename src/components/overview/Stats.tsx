'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';
import { Option } from '@/components/core/option';

import { StatsCard } from './StatsCard';

const lines = [
  { name: 'Trip Success', dataKey: 'v1', color: '#34C759' },
  { name: 'Trip Failure', dataKey: 'v2', color: 'Red' },
] satisfies { name: string; dataKey: string; color: string }[];
export interface StatsProps {
  data: { name: string; v1: number; v2: number }[];
}
export function Stats({ data }: StatsProps): React.JSX.Element {
  const chartHeight = 200;
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <StatsCard value={320} icon={ChartPieIcon} title="Total Vans" />
            </Grid>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <StatsCard value={52} icon={ChartPieIcon} title="Total Drivers" />
            </Grid>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <StatsCard value={8} icon={ChartPieIcon} title="Total Students" />
            </Grid>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <StatsCard value={900} icon={ChartPieIcon} title="Active Vans" variant="active" />
            </Grid>

            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <StatsCard value={25} icon={ChartPieIcon} title="Delayed Trips" variant="delayed" />
            </Grid>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <StatsCard value={12} icon={ChartPieIcon} title="Missed Trips" variant="missed" />
            </Grid>
          </Grid>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar
                    sx={{
                      '--Avatar-size': '48px',
                      bgcolor: 'var(--mui-palette-background-paper)',
                      boxShadow: 'var(--mui-shadows-8)',
                      color: 'var(--mui-palette-text-primary)',
                    }}
                  >
                    <ChartPieIcon fontSize="var(--icon-fontSize-lg)" />
                  </Avatar>
                  <Typography variant="body1">Trip Success/Failure Rate</Typography>
                </Stack>

                <Select name="sort" onChange={() => {}} sx={{ width: 120 }} value={'asc'}>
                  <Option value="desc">Weekly</Option>
                  <Option value="asc">Yearly</Option>
                </Select>
              </Stack>

              <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
                <ResponsiveContainer height={chartHeight} width="100%">
                  <LineChart data={data} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} />
                    <XAxis axisLine={false} dataKey="name" interval={0} tickLine={false} type="category" />
                    <YAxis axisLine={false} domain={[0, 120]} hide type="number" yAxisId={0} />
                    <YAxis axisLine={false} domain={[2000, 12000]} hide type="number" yAxisId={1} />
                    {lines.map(
                      (line, index): React.JSX.Element => (
                        <Line
                          animationDuration={300}
                          dataKey={line.dataKey}
                          dot={<Dot />}
                          key={line.name}
                          name={line.name}
                          stroke={line.color}
                          strokeDasharray={0}
                          strokeWidth={2}
                          type="bump"
                          yAxisId={index}
                        />
                      )
                    )}
                    <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
                  </LineChart>
                </ResponsiveContainer>
              </NoSsr>
            </CardContent>
          </Card>
          <Legend />
        </Stack>
      </CardContent>
    </Card>
  );
}

interface DotProps {
  hover?: boolean;
  active?: string;
  cx?: number;
  cy?: number;
  payload?: { name: string };
  stroke?: string;
}

function Dot({ active, cx, cy, payload, stroke }: DotProps): React.JSX.Element | null {
  if (active && payload?.name === active) {
    return <circle cx={cx} cy={cy} fill={stroke} r={6} />;
  }

  return null;
}

function Legend(): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2}>
      {lines.map((line) => (
        <Stack direction="row" key={line.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: line.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {line.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; dataKey: string; value: number; stroke: string }[];
  label?: string;
}

function TooltipContent({ active, payload }: TooltipContentProps): React.JSX.Element | null {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map(
          (entry, index): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {index === 0
                  ? entry.value
                  : new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(entry.value)}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
