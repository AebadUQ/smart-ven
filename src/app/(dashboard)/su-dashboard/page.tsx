'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import {
  ArrowRight as ArrowRightIcon,
  Briefcase as BriefcaseIcon,
  FileCode as FileCodeIcon,
  Info as InfoIcon,
  ListChecks as ListChecksIcon,
  Users as UsersIcon,
  Warning as WarningIcon,
} from '@phosphor-icons/react/dist/ssr';

import { dayjs } from '@/lib/dayjs';
import { AppChat } from '@/components/dashboard/overview/app-chat';
import { AppLimits } from '@/components/dashboard/overview/app-limits';
import { AppUsage } from '@/components/dashboard/overview/app-usage';
import { Events } from '@/components/dashboard/overview/events';
import { HelperWidget } from '@/components/dashboard/overview/helper-widget';
import { Summary } from '@/components/dashboard/overview/summary';
import OnboardingGrowthChart from '@/components/dashboard/OnboardingGrowthChart';

export default function Page(): React.JSX.Element {
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Overview</Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Summary amount={31} diff={15} icon={ListChecksIcon} title="Total Schools" trend="up" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary amount={240} diff={5} icon={UsersIcon} title="Trips In Progress" trend="down" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary amount={21} diff={12} icon={WarningIcon} title="Open issues" trend="up" />
          </Grid>

          {/* Charts Row: Bar + Pie */}
          <Grid item xs={12}>
            <Grid container >
              <Grid item xs={12} md={8} >
                <AppUsage
                  title="Trips Overview"
                  bars={[
                    { name: 'Successful Trips', dataKey: 'v1', color: '#4caf50' },
                    { name: 'Failed Trips', dataKey: 'v2', color: '#f44336' },
                  ]}
                  data={[
                    { name: 'Jan', v1: 230, v2: 12 },
                    { name: 'Feb', v1: 198, v2: 8 },
                    { name: 'Mar', v1: 210, v2: 15 },
                    { name: 'Apr', v1: 250, v2: 10 },
                    { name: 'May', v1: 275, v2: 7 },
                    { name: 'Jun', v1: 290, v2: 6 },
                    { name: 'Jul', v1: 300, v2: 9 },
                    { name: 'Aug', v1: 310, v2: 11 },
                    { name: 'Sep', v1: 280, v2: 13 },
                    { name: 'Oct', v1: 260, v2: 10 },
                    { name: 'Nov', v1: 240, v2: 5 },
                    { name: 'Dec', v1: 255, v2: 8 },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box >
                  <OnboardingGrowthChart />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Side Widgets */}
          <Grid item xs={12} md={12}>
            <AppChat
              messages={[
                {
                  id: 'MSG-001',
                  content: 'Status: Active',
                  author: {
                    name: 'Zuomaa Daycare',
                    avatar: '/assets/avatar-1.png',
                    status: 'online',
                  },
                  createdAt: dayjs().subtract(2, 'minute').toDate(),
                },
                {
                  id: 'MSG-002',
                  content: 'Status: Inactive',
                  author: {
                    name: 'Al-Noor Grammar School',
                    avatar: '/assets/avatar-2.png',
                    status: 'offline',
                  },
                  createdAt: dayjs().subtract(10, 'minute').toDate(),
                },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Events
              events={[
                {
                  id: 'EV-001',
                  title: 'Weekly meeting',
                  description: '09:00 to 09:30',
                  createdAt: dayjs().add(7, 'day').toDate(),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppLimits usage={80} />
          </Grid>

          <Grid item xs={12} md={4}>
            <HelperWidget
              action={
                <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                  Search jobs
                </Button>
              }
              description="Search for jobs that match your skills and apply to them directly."
              icon={BriefcaseIcon}
              label="Jobs"
              title="Find your dream job"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <HelperWidget
              action={
                <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                  Help center
                </Button>
              }
              description="Find answers to your questions and get in touch with our team."
              icon={InfoIcon}
              label="Help center"
              title="Need help figuring things out?"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <HelperWidget
              action={
                <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                  Documentation
                </Button>
              }
              description="Learn how to get started with our product and make the most of it."
              icon={FileCodeIcon}
              label="Documentation"
              title="Explore documentation"
            />
          </Grid> */}
        </Grid>
      </Stack>
    </Box>
  );
}
