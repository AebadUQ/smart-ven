'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';



const lines = [
  { name: 'Subscribed', dataKey: 'subscribed', color: 'rgba(110, 37, 133, 1)' },
  { name: 'Unsubscribed', dataKey: 'unsubscribed', color: 'rgba(189, 171, 204, 1)' },
];

export default function AudienceGrowth({data}:any): React.JSX.Element {
  const [timeRange, setTimeRange] = React.useState('This Week');
  const chartHeight = 300;

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" spacing={2} alignItems="center">
             <Box
          component="img"
          src="/assets/dashboard/audience-growth-icon.svg"
          alt="audience-growth-icon"
          // sx={{ width: 24, height: 24 }}
        />
            <Typography variant="h6">Audience Growth</Typography>
          </Stack>
        }
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
        //     <MenuItem value="This Week">This Week</MenuItem>
        //     <MenuItem value="Last Week">Last Week</MenuItem>
        //     <MenuItem value="Last Month">Last Month</MenuItem>
        //   </Select>
        // }
      />

      <CardContent>
      <Stack direction="row" spacing={3} justifyContent="right" sx={{mb:2}} >
        {lines.map((line) => (
          <Stack key={line.name} direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: line.color,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {line.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
        <Stack spacing={3}>
          <Box sx={{ height: chartHeight }}>
            <NoSsr fallback={<Box sx={{ height: chartHeight }} />}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]}
                  />
                  {lines.map((line) => (
                    <Line
                      key={line.name}
                      type="monotone"
                      dataKey={line.dataKey}
                      stroke={line.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: line.color }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </NoSsr>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
