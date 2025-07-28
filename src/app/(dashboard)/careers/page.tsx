'use client';


import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import RouterLink from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { ReadCvLogo as ReadCvLogoIcon } from '@phosphor-icons/react/dist/ssr/ReadCvLogo';


import { FileCode as FileCodeIcon } from '@phosphor-icons/react/dist/ssr/FileCode';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { AddressBook as AddressBookIcon } from '@phosphor-icons/react/dist/ssr/AddressBook';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';
import { getCareerDashboard } from '@/services/jobs.api';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { AppChat } from '@/components/dashboard/overview/app-chat';
import { AppLimits } from '@/components/dashboard/overview/app-limits';
import { AppUsage } from '@/components/dashboard/overview/app-usage';
import { Events } from '@/components/dashboard/overview/events';
import { HelperWidget } from '@/components/dashboard/overview/helper-widget';
import { Subscriptions } from '@/components/dashboard/overview/subscriptions';
import { Summary } from '@/components/dashboard/jobs/career-dashboard-tabs';
import { paths } from '@/paths';


export default function Page(): React.JSX.Element {

  const [data, setData] = useState({});

  /** Fetch Dashboard Data */
  const fetchData = useCallback(async () => {
    try {
      const chartData = await getCareerDashboard();
      setData(chartData);




    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <Box
      sx={{
        p: 3,
        pb: 0
      }}
    >
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Careers</Typography>
          </Box>
          <div>
            {/* startIcon={<PlusIcon />} */}
            <Button component={RouterLink} href={paths.dashboard.jobs.create} variant="contained">
              Post a job
            </Button>
          </div>
        </Stack>

        <Grid container spacing={3}>


          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
            
          >
            <Summary amount={data?.allJobs || 0} icon={BriefcaseIcon} title="All Jobs" subtitle="Available openings" link={paths.dashboard.jobs.browse} />
          </Grid>



          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
          >
            <Summary amount={data?.allCandidates || 0} icon={UsersIcon} title="All Applicants" subtitle="Total number of candidates " link={paths.dashboard.jobs.candidates} />
          </Grid>
          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
          >
            <Summary amount={data?.allGeneralCandidates || 0} icon={ReadCvLogoIcon} title="General Applicants" subtitle="Unassigned applicants" link={paths.dashboard.jobs.generalCandidates} />
          </Grid>

          
          <Grid
            size={{
              md: 12,
              xs: 12,
            }}
          >
            <AppUsage
              data={data?.chartData || []}
            />
          </Grid>

        </Grid>
      </Stack>
    </Box>
  );
}
