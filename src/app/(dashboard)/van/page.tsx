'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getAllSchoolVans } from '@/store/reducers/van-slice';
import { paths } from '@/paths';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { vans, loading, pagination } = useSelector((state: RootState) => state.van);

  const [selectedVans, setSelectedVans] = React.useState<any[]>([]);

  // Fetch vans on mount
  React.useEffect(() => {
    dispatch(getAllSchoolVans({ page: 1, limit: 10 }));
  }, [dispatch]);

  const columns: ColumnDef<any>[] = [
    {
      name: 'Van',
      width: '250px',
      formatter: (row) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <img
            src={row?.van?.venImage || '/assets/van-placeholder.png'}
            alt={row?.van?.vehicleType}
            style={{ width: 40, height: 40, borderRadius: '4px' }}
          />
          <Stack>
            <Typography color="text.primary" variant="body2">
              {row?.van?.vehicleType} - {row?.van?.carNumber}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Capacity: {row?.van?.venCapacity}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      name: 'Route',
      width: '250px',
      formatter: (row) => <Typography color="text.secondary">{row?.van?.assignRoute}</Typography>,
    },
    {
      name: 'Driver',
      width: '250px',
      formatter: (row) => <Typography color="text.secondary">{row?.driver?.fullname || '-'}</Typography>,
    },
    {
      name: 'Status',
      width: '100px',
      formatter: (row) => (
        <Chip
          label={row?.van?.status === 'active' ? 'Active' : 'Inactive'}
          color={row?.van?.status === 'active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      name: 'Actions',
      width: '100px',
      align: 'right',
      formatter: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            size="small"
            variant="outlined"
            onClick={() => router.push(`/van/${row.van?.id}`)}
          >
            View
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Van Management</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              endIcon={<PlusIcon />}
              onClick={() => router.push('/van/create')}
            >
              Add Van
            </Button>
          </Box>
        </Stack>

        {/* Table */}
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : vans?.length ? (
              <DataTable<any>
                columns={columns}
                rows={vans}
                selectable
                onSelectionChange={(_, rows) => setSelectedVans(rows)}
              />
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                  No Vans Found
                </Typography>
              </Box>
            )}
          </Box>

          <Divider />

          {/* Pagination */}
          <CustomersPagination
            count={pagination.total}
            page={Math.max(0, pagination.page - 1)}
            rowsPerPage={pagination.limit}
            onPaginationChange={(_, newPage) => {
              dispatch(getAllSchoolVans({ page: newPage + 1, limit: pagination.limit }));
              setSelectedVans([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              dispatch(getAllSchoolVans({ page: 1, limit: newLimit }));
              setSelectedVans([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
