import * as React from 'react';
import type { Metadata } from 'next';
import {Box,Stack} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { config } from '@/config';
import { Stats, TicketsComplain, Alert, MapTracking } from '@/components/overview';
export const metadata = { title: `Dashboard | ${config.site.name}` } satisfies Metadata;
export default function Page(): React.JSX.Element {
  return (
    <Box
      sx={{
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack>
        <Grid container spacing={2}>
          <Grid
            size={{
              lg: 8,
              xs: 12,
            }}
          >
            <Stats
              data={[
                { name: 'Mon', v1: 35, v2: 3350 },
                { name: 'Tue', v1: 41, v2: 3440 },
                { name: 'Wed', v1: 32, v2: 3054 },
                { name: 'Thu', v1: 34, v2: 3780 },
                { name: 'Fri', v1: 53, v2: 3849 },
                { name: 'Sat', v1: 29, v2: 2900 },
                { name: 'Sun', v1: 40, v2: 3600 },
              ]}
            />
          </Grid>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
            <TicketsComplain

            />
          </Grid>

          <Grid
            size={{
              lg: 8,
              xs: 12,
            }}
          >
            <MapTracking />

          </Grid>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
            <Alert

            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
