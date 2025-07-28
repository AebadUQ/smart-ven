'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree, CheckCircle, XCircle, Warning } from '@phosphor-icons/react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface TripRateData {
  name: string;
  value: number;
  color: string;
}

export interface TripSuccessRateProps {
  data: TripRateData[];
}

export function TripSuccessRate({ data }: TripSuccessRateProps): React.JSX.Element {
  const chartSize = 200;
  const chartTickness = 30;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <CheckCircle size={20} />
          </Avatar>
        }
        action={
          <IconButton>
            <DotsThree weight="bold" />
          </IconButton>
        }
        title="Trip Success/Failure Rate"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NoSsr fallback={<Box sx={{ height: chartSize, width: chartSize }} />}>
              <PieChart width={chartSize} height={chartSize}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={chartSize / 2 - chartTickness}
                  outerRadius={chartSize / 2}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip animationDuration={50} content={<TooltipContent />} />
              </PieChart>
            </NoSsr>
          </Box>
          <Legend payload={data} />
        </Stack>
      </CardContent>
    </Card>
  );
}

interface LegendProps {
  payload?: TripRateData[];
}

function Legend({ payload }: LegendProps): React.JSX.Element {
  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}>
      {payload?.map((entry) => (
        <div key={entry.name}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box sx={{ bgcolor: entry.color, borderRadius: '2px', height: '4px', width: '16px' }} />
            <Typography variant="body2">{entry.name}</Typography>
          </Stack>
          <Typography variant="h5">
            {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(entry.value / 100)}
          </Typography>
        </div>
      ))}
    </Box>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; payload: { fill: string }; value: number }[];
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
              <Box sx={{ bgcolor: entry.payload.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(entry.value / 100)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
