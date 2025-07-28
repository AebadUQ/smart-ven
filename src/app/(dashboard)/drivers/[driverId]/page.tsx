'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { ShieldWarning as ShieldWarningIcon } from '@phosphor-icons/react/dist/ssr/ShieldWarning';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { paths } from '@/paths';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import StudentTripHistoryTable from '@/components/dashboard/student/trip-history-table';

export default function Page(): React.JSX.Element {
  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.customers.list}
            sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
            variant="subtitle2"
          >
            <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
            Back to Drivers
          </Link>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Avatar src="/assets/avatar-1.png" sx={{ width: 64, height: 64 }}>
                AQ
              </Avatar>
              <div>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography variant="h4">Aebad ul Qadir</Typography>
                  <Chip
                    icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
                    label="Active"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography color="text.secondary" variant="body1">
                  aebad.driver@example.com
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {/* Left Panel */}
          <Grid item xs={12} md={4}>
            <Stack spacing={4}>
              <Card>
                <CardHeader
                  avatar={<Avatar><UserIcon /></Avatar>}
                  action={<IconButton><PencilSimpleIcon /></IconButton>}
                  title="Driver Details"
                />
                <CardContent>
                  <PropertyList divider={<Divider />} orientation="vertical">
                    {[
                      { key: 'Driver ID', value: <Chip label="DRV-0012" size="small" variant="soft" /> },
                      { key: 'Name', value: 'Aebad ul Qadir' },
                      { key: 'Email', value: 'aebad.driver@example.com' },
                      { key: 'Phone', value: '0334-0354382' },
                      { key: 'CNIC', value: '42101-1234567-1' },
                      { key: 'License No', value: 'LIC-98234' },
                      { key: 'Joining Date', value: 'June 1, 2023' },
                      { key: 'Status', value: <Chip label="Active" color="success" size="small" /> },
                    ].map((item) => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    ))}
                  </PropertyList>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              <Card>
                <CardHeader
                  avatar={<Avatar><HouseIcon /></Avatar>}
                  title="Vehicle & Route Info"
                  action={
                    <Button startIcon={<PencilSimpleIcon />} color="secondary">
                      Edit
                    </Button>
                  }
                />
                <CardContent>
                  <PropertyList divider={<Divider />} orientation="vertical">
                    {[
                      { key: 'Van Assigned', value: 'Van #12' },
                      { key: 'Route Assigned', value: 'North Nazimabad Sector J' },
                      { key: 'Start Time', value: '6:45 AM' },
                      { key: 'End Time', value: '2:00 PM' },
                      { key: 'Area Zone', value: 'Zone 2' },
                    ].map((item) => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    ))}
                  </PropertyList>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Grid container>
          <Grid xs={12}>
            <StudentTripHistoryTable
              rows={[
                {
                  id: '1',
                  vehicleId: 'VEH-101',
                  driverName: 'Aebad ul Qadir',
                  date: '2025-07-01',
                  startLocation: 'North Nazimabad',
                  endLocation: 'School Gate',
                  status: 'Present',
                },
                {
                  id: '2',
                  vehicleId: 'VEH-101',
                  driverName: 'Aebad ul Qadir',
                  date: '2025-07-02',
                  startLocation: 'North Nazimabad',
                  endLocation: 'School Gate',
                  status: 'Present',
                },
              ]}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader avatar={<Avatar><ShieldWarningIcon /></Avatar>} title="Security" />
            <CardContent>
              <Stack spacing={1}>
                <Button color="error" variant="contained">
                  Delete Driver
                </Button>
                <Typography color="text.secondary" variant="body2">
                  This action is irreversible. All records will be removed permanently.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
