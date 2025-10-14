'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react';
import { CircularProgress, Chip, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getAllSchoolVans } from '@/store/reducers/van-slice';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { vans, loading } = useSelector((state: RootState) => state.van);

  // Fetch vans on mount
  React.useEffect(() => {
    dispatch(getAllSchoolVans());
  }, [dispatch]);

  const columns: ColumnDef<any>[] = [
    {
      name: 'Van',
      width: '250px',
      formatter: (row) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <img
            src={row.venImage || '/assets/van-placeholder.png'}
            alt={row.vehicleType}
            style={{ width: 40, height: 40, borderRadius: '4px' }}
          />
          <Stack>
            <Typography color="text.primary" variant="body2">
              {row.vehicleType} - {row.carNumber}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Capacity: {row.venCapacity}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      name: 'Route',
      width: '250px',
      formatter: (row) => <Typography color="text.secondary">{row.assignRoute}</Typography>,
    },
    {
      name: 'Status',
      width: '100px',
      formatter: (row) => (
        <Chip
          label={row.status === 'active' ? 'Active' : 'Inactive'}
          color={row.status === 'active' ? 'success' : 'default'}
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
        onClick={() => router.push(`/van/${row._id}`)} // updated route
      >
        View
      </Button>
    </Stack>
  ),
}

  ];

  // Optional fallback row if no vans are present
  const fallbackRow = [
    {
      _id: '1',
      vehicleType: 'Default Van',
      carNumber: 'ABC-123',
      venCapacity: 20,
      assignRoute: 'Route-1',
      status: 'inactive',
      venImage: '',
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
            ) : (
              <DataTable<any> columns={columns} rows={vans?.length ? vans : fallbackRow} />
            )}
          </Box>

          <Divider />
          {/* Pagination can be added here if needed */}
        </Card>
      </Stack>
    </Box>
  );
}
