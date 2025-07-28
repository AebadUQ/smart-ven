'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';


export default function StatisticsChart({data}: any): React.JSX.Element {
  const [timeRange, setTimeRange] = React.useState('This Week');
  const chartHeight = 400;

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" spacing={2} alignItems="center">
           <Box
          component="img"
          src="/assets/dashboard/statistic-icon.svg"
          alt="statistic-icon"
          // sx={{ width: 24, height: 24 }}
        />
            <Box>
              <Typography variant="h6">Statistics</Typography>
              <Typography variant="body2" color="text.secondary">
                The key email marketing metrics
              </Typography>
            </Box>
          </Stack>
        }
        // action={
        //   <Select
        //   value={timeRange}
        //   onChange={(e) => setTimeRange(e.target.value)}
        //   size="small"
        //   sx={{
        //     minWidth: 120,
        //     "& .MuiSelect-select": {
        //       py: 1,
        //       px: 2,
        //     },
        //   }}
        // >
        //   <MenuItem value="This Week">This Week</MenuItem>
        //   <MenuItem value="Last Week">Last Week</MenuItem>
        //   <MenuItem value="Last Month">Last Month</MenuItem>
        // </Select>
        // }
      />
      <CardContent>
        <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
          <ResponsiveContainer height={chartHeight}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tickCount={6} fontSize={12}/>
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={80} />
              <Bar dataKey="value" fill="#6E2585" radius={[10, 10, 10, 10]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </NoSsr>
      </CardContent>
    </Card>
  );
}
