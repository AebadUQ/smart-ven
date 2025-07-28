'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import useListApi from '@/hooks/useListApi';
import { Chip, CircularProgress, IconButton } from '@mui/material';
import Link from 'next/link';
// You may create a new `VehicleFilter` or reuse an existing one
import { DriverFilter as VehicleFilter } from './vehiclefilter';

interface PageProps {
  searchParams: { model?: string; plate?: string; sortDir?: 'asc' | 'desc'; status?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const router = useRouter();

  const {
    data,
    loading,
    onPaginationChange,
    onPageSizeChange,
    filter,
    total,
    pageSize,
    pageIndex,
    setFilter,
  } = useListApi<any>('api/vehicle', '');

  const columns: ColumnDef<any>[] = [
  {
    name: 'Plate Number',
    width: '140px',
    formatter: (row) => (
      <Typography color="text.primary" variant="body2">
        {row?.plateNumber || 'ABC-123'}
      </Typography>
    ),
  },
  {
    name: 'Model',
    width: '140px',
    formatter: (row) => (
      <Typography color="text.secondary" variant="body2">
        {row?.model || 'Toyota Hiace'}
      </Typography>
    ),
  },
  {
    name: 'Color',
    width: '100px',
    formatter: (row) => (
      <Typography color="text.secondary" variant="body2">
        {row?.color || 'White'}
      </Typography>
    ),
  },
  {
    name: 'Condition',
    width: '120px',
    formatter: (row) => (
      <Chip
        label={row?.condition || 'Good'}
        color={
          row?.condition === 'Excellent'
            ? 'success'
            : row?.condition === 'Fair'
            ? 'warning'
            : row?.condition === 'Poor'
            ? 'error'
            : 'default'
        }
        size="small"
      />
    ),
  },
  {
    name: 'School',
    width: '180px',
    formatter: (row) => (
      <Typography color="text.secondary" variant="body2">
        {row?.school || 'N/A'}
      </Typography>
    ),
  },
  {
    name: 'Capacity',
    width: '80px',
    formatter: (row) => (
      <Typography color="text.secondary" variant="body2">
        {row?.capacity || '15'}
      </Typography>
    ),
  },
  {
    name: 'Assigned Driver',
    width: '200px',
    formatter: (row) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <img
          src={row?.driver?.photoUrl || '/assets/avatar-1.png'}
          alt={row?.driver?.name || 'Driver Avatar'}
          style={{ width: 32, height: 32, borderRadius: '50%' }}
        />
        <Stack>
          <Typography color="text.primary" variant="body2">
            {row?.driver?.name || 'Not Assigned'}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {row?.driver?.phone || '-'}
          </Typography>
        </Stack>
      </Stack>
    ),
  },
  {
    name: 'Status',
    width: '100px',
    formatter: (row) => (
      <Chip
        label={row?.status || 'Inactive'}
        color={row?.status === 'Active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];

 const fallbackRow = [
  {
    id: '1',
    plateNumber: 'ABC-123',
    model: 'Toyota Hiace',
    color: 'White',
    condition: 'Good',
    capacity: '15',
    status: 'Active',
    school: 'Zuomaa Daycare',
    driver: {
      name: 'Aebad ul Qadir',
      phone: '0334 0354382',
      photoUrl: '',
    },
  },
];


  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Vehicle Management</Typography>
          </Box>
          <Box>
            <Link href="/vehicle/create" passHref>
              <Button variant="contained" color="primary" endIcon={<PlusIcon />}>
                Add Vehicle
              </Button>
            </Link>
          </Box>
        </Stack>

        <Card>
          <VehicleFilter filters={filter} setFilters={setFilter} />

          <Box sx={{ overflowX: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <DataTable<any> columns={columns} rows={data?.length ? data : fallbackRow} />
            )}
          </Box>

          <Divider />
          <CustomersPagination
            count={total}
            page={pageIndex}
            rowsPerPage={pageSize}
            onPaginationChange={(event, newPage) => onPaginationChange(newPage + 1)}
            onRowsPerPageChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
          />
        </Card>
      </Stack>
    </Box>
  );
}
