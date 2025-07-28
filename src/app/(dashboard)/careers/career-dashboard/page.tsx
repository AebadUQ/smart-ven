'use client';


import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { FileCode as FileCodeIcon } from '@phosphor-icons/react/dist/ssr/FileCode';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { ListChecks as ListChecksIcon } from '@phosphor-icons/react/dist/ssr/ListChecks';
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
import { Summary } from '@/components/dashboard/overview/summary';


export default function Page(): React.JSX.Element {

  const [data, setData] = useState({});
    const [listGrowth, setListGrowth] = useState([]);
    
    /** Fetch Dashboard Data */
    const fetchData = useCallback(async () => {
      try {
        const chartData = await getCareerDashboard();
        // setData(chartData);
  
        // setListGrowth(
        //   chartData?.listGrowth?.columns?.map((name:any, index:number) => ({
        //     name,
        //     value: chartData?.listGrowth?.data?.[index] || 0,
        //   })) || []
        // );
  
        
        
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
          <div>
            <Button startIcon={<PlusIcon />} variant="contained">
              Dashboard
            </Button>
          </div>
        </Stack>
        <Grid container spacing={4}>
          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
          >
            <Summary amount={31} diff={15} icon={ListChecksIcon} title="Tickets" trend="up" />
          </Grid>
          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
          >
            <Summary amount={240} diff={5} icon={UsersIcon} title="Sign ups" trend="down" />
          </Grid>
          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
          >
            <Summary amount={21} diff={12} icon={WarningIcon} title="Open issues" trend="up" />
          </Grid>
          <Grid
            size={{
              md: 12,
              xs: 12,
            }}
          >
            <AppUsage
              data={[
                { name: 'Jan', v1: 36, v2: 19 },
                { name: 'Feb', v1: 45, v2: 23 },
                { name: 'Mar', v1: 26, v2: 12 },
                { name: 'Apr', v1: 39, v2: 20 },
                { name: 'May', v1: 26, v2: 12 },
                { name: 'Jun', v1: 42, v2: 31 },
                { name: 'Jul', v1: 38, v2: 19 },
                { name: 'Aug', v1: 39, v2: 20 },
                { name: 'Sep', v1: 37, v2: 18 },
                { name: 'Oct', v1: 41, v2: 22 },
                { name: 'Nov', v1: 45, v2: 24 },
                { name: 'Dec', v1: 23, v2: 17 },
              ]}
            />
          </Grid>
          
        </Grid>
      </Stack>
    </Box>
  );
}
