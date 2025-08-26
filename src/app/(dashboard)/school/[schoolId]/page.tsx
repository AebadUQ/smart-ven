import * as React from 'react';
import type { Metadata } from 'next';
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
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { ShieldWarning as ShieldWarningIcon } from '@phosphor-icons/react/dist/ssr/ShieldWarning';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { Notifications } from '@/components/dashboard/customer/notifications';
import { Payments } from '@/components/dashboard/customer/payments';
import type { Address } from '@/components/dashboard/customer/shipping-address';
import { ShippingAddress } from '@/components/dashboard/customer/shipping-address';
import { DeviatedVehicles } from '@/components/dashboard/logistics/deviated-vehicles';
import { LateVehicles } from '@/components/dashboard/logistics/late-vehicles';
import { OnRouteVehicles } from '@/components/dashboard/logistics/on-route-vehicles';
import { VehiclesCondition } from '@/components/dashboard/logistics/vehicles-condition';
import { VehiclesOverview } from '@/components/dashboard/logistics/vehicles-overview';
import { VehiclesWithErrors } from '@/components/dashboard/logistics/vehicles-with-errors';
import StudentTripHistoryTable from '@/components/dashboard/student/trip-history-table';

export const metadata = { title: `Details | Student | Dashboard | ${config.site.name}` } satisfies Metadata;

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
            Students
          </Link>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Avatar src="/assets/avatar-1.png" sx={{ width: 64, height: 64 }}>
                AS
              </Avatar>
              <div>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography variant="h4">Aebad ul quadir</Typography>
                  <Chip
                    icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
                    label="Active"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Typography color="text.secondary" variant="body1">
                  aebadulquadir123@gmail.com
                </Typography>
              </div>
            </Stack>
            {/* <Button endIcon={<PlusIcon />} variant="contained">
              Action
            </Button> */}
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {/* Left Panel */}
          <Grid item xs={12} md={4}>
            <Stack spacing={4}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>
                      <UserIcon />
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <PencilSimpleIcon />
                    </IconButton>
                  }
                  title="Student Details"
                />
                <CardContent>
                  <PropertyList divider={<Divider />} orientation="vertical">
                    {[
                      { key: 'Student ID', value: <Chip label="STU-0092" size="small" variant="soft" /> },
                      { key: 'Name', value: 'Ahmed Shaikh' },
                      { key: 'Email', value: 'ahmed.shaikh@school.com' },
                      { key: 'Phone', value: '0333-1234567' },
                      { key: 'National ID', value: '42101-1234567-1' },
                      { key: 'DOB', value: 'Jan 5, 2012' },
                      { key: 'Status', value: <Chip label="Active" color="success" size="small" /> },
                    ].map((item) => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    ))}
                  </PropertyList>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>
                      <HouseIcon />
                    </Avatar>
                  }
                  title="School & Route Info"
                  action={
                    <Button startIcon={<PencilSimpleIcon />} color="secondary">
                      Edit
                    </Button>
                  }
                />
                <CardContent>
                  <PropertyList divider={<Divider />} orientation="vertical">
                    {[
                      { key: 'School Name', value: 'Zuomaa Daycare' },

                      { key: 'School ID', value: 'ABC-2023-01' },
                      { key: 'Class/Grade/Section', value: 'Grade 7 / A' },
                      { key: 'Van Assigned', value: 'Van #12' },
                      { key: 'Route Assigned', value: 'J Block North Nazimabad' },
                      { key: 'Pickup Time', value: '7:30 AM' },
                      { key: 'Drop Time', value: '1:15 PM' },
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
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Grid container>
          <Grid size={12}>
            <StudentTripHistoryTable
              rows={[
                {
                  id: '1',
                  vehicleId: 'VEH-101',
                  driverName: 'Ali Raza',
                  date: '2025-07-01',
                  startLocation: 'Main Gate',
                  endLocation: 'Stop A',
                  status: 'Present',
                },
                {
                  id: '2',
                  vehicleId: 'VEH-102',
                  driverName: 'Kamran Shah',
                  date: '2025-07-02',
                  startLocation: 'Block B',
                  endLocation: 'Stop B',
                  status: 'Absent',
                },
                {
                  id: '3',
                  vehicleId: 'VEH-103',
                  driverName: 'Imran Khan',
                  date: '2025-07-03',
                  startLocation: 'Block A',
                  endLocation: 'Stop C',
                  status: 'Present',
                },
                {
                  id: '4',
                  vehicleId: 'VEH-104',
                  driverName: 'Usman Akhtar',
                  date: '2025-07-04',
                  startLocation: 'Main Gate',
                  endLocation: 'Stop D',
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
            <CardHeader
              avatar={
                <Avatar>
                  <ShieldWarningIcon />
                </Avatar>
              }
              title="Security"
            />
            <CardContent>
              <Stack spacing={1}>
                <Button color="error" variant="contained">
                  Delete Student
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
