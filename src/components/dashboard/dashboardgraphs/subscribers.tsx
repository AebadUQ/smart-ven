'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface DevicesProps {
  data: { name: string; value: number; color: string }[];
}

export default function Devices({ data }: DevicesProps): React.JSX.Element {
  const [timeRange, setTimeRange] = React.useState("This Year")

  const chartSize = 200;
  const chartTickness = 50;

  return (
    <Card>
      <CardHeader
          sx={{py: "22px", px: "24px"}}
        // action={
        //   <Select
        //     value={timeRange}
        //     onChange={(e) => setTimeRange(e.target.value)}
        //     size="small"
        //     sx={{
        //       minWidth: 120,
        //       "& .MuiSelect-select": {
        //         py: 1,
        //         px: 2,
        //       },
        //     }}
        //   >
        //     <MenuItem value="This Year">This Year</MenuItem>
        //     <MenuItem value="Last Year">Last Year</MenuItem>
        //   </Select>
        // }
        avatar={
          <Box
            component="img"
            src="/assets/dashboard/subscriber-icon.svg"
            alt="recent-calls-icon"
          />
        }
        title="Subscribers"
      />
      <CardContent sx={{ p: 0, mt: 0,}}>
        <Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3}}>
            <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
              <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
                <Pie
                  animationDuration={300}
                  cx={chartSize / 2}
                  cy={chartSize / 2}
                  data={data}
                  dataKey="value"
                  innerRadius={chartSize / 2 - chartTickness}
                  nameKey="name"
                  outerRadius={chartSize / 2}
                  strokeWidth={0}
                >
                  {data.map(
                    (entry): React.JSX.Element => (
                      <Cell fill={entry.color} key={entry.name} />
                    )
                  )}
                </Pie>
                <Tooltip animationDuration={50} content={<TooltipContent />} />
              </PieChart>
            </NoSsr>
          </Box>
          {/* <Legend payload={data}/> */}
        </Stack>
      </CardContent>
      <Divider />
      <Box sx={{p: 2}}>
        <Legend payload={data}/>
      </Box>
    </Card>
  );
}

interface LegendProps {
  payload?: { name: string; value: number; color: string }[];
}

function Legend({ payload }: LegendProps): React.JSX.Element {
  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', px: 4 }}>
      {payload?.map(
        (entry): React.JSX.Element => (
          <div key={entry.name} style={{ display: 'flex', gap: '8px' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box sx={{ bgcolor: entry.color, borderRadius: '50%', height: '8px', width: '8px' }} />
              <Typography variant="body2" fontWeight={600}>{entry.name}</Typography>
            </Stack>
            <Typography variant="body2">
              {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(entry.value / 100)}
            </Typography>
          </div>
        )
      )}
    </Box>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; payload: { fill: string }; value: number }[];
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
          (entry): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.payload.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                  entry.value / 100
                )}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
