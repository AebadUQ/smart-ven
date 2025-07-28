'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import { config } from '@/config';


const reports = [
  {
    id: '1',
    title: '5.6.1 Trip logs, delays, no-shows',
    startDate: '6/5/25',
    endDate: '6/5/25',
    generated: 0,
    completion: '0%',
  },
  {
    id: '2',
    title: '5.6.2 Per student/per van performance',
    startDate: '6/5/25',
    endDate: '6/5/25',
    generated: 0,
    completion: '0%',
  },
  {
    id: '3',
    title: '5.6.3 Downloadable CSV/PDF reports',
    startDate: '6/5/25',
    endDate: '6/5/25',
    generated: 0,
    completion: '0%',
  },
];

export default function ReportsPage(): React.JSX.Element {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight={600}>
          Reports
        </Typography>

        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item xs={12} md={6} key={report.id}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {report.title}
                  </Typography>

                  <Box mt={1} color="text.secondary">
                    <Typography variant="body2">
                      From: <strong>{report.startDate}</strong> &nbsp;&nbsp; To: <strong>{report.endDate}</strong>
                    </Typography>
                    <Typography variant="body2" mt={0.5}>
                      Generated: <strong>{report.generated}</strong> &nbsp;&nbsp; Completion: <strong>{report.completion}</strong>
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} mt={3}>
                    <Button variant="outlined" size="small">
                      Download CSV
                    </Button>
                    <Button variant="outlined" size="small">
                      Download PDF
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
