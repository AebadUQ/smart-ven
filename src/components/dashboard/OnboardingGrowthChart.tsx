'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Box,
  Container,
} from '@mui/material';
import { NoSsr } from '@mui/base';

// Sample data
const data = [
  { name: 'Students', value: 45, color: '#4caf50' },
  { name: 'Drivers', value: 30, color: '#2196f3' },
  { name: 'Routes', value: 25, color: '#ff9800' },
];

// Custom tooltip content
const TooltipContent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '8px 12px',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="caption">{value}%</Typography>
      </Box>
    );
  }

  return null;
};

const OnboardingGrowthChart: React.FC = () => {
  return (
    <Container maxWidth="sm" >
      <Card>
        <CardHeader
          title="Daily/Weekly Onboarding Growth"
          subheader="Students, Drivers, and Routes"
        />
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <NoSsr fallback={<Box sx={{ height: 240, width: 240 }} />}>
              <Box sx={{ width: 240, height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      stroke="none"
                    >
                      {data.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<TooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </NoSsr>

            {/* Legend in a single row */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {data.map((entry) => (
                <Stack
                  key={entry.name}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: entry.color,
                    }}
                  />
                  <Typography variant="body2">{entry.name}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OnboardingGrowthChart;
