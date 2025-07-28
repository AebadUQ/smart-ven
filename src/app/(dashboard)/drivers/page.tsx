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
import { DriverFilter } from './driverfilter';

interface PageProps {
  searchParams: { name?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
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
  } = useListApi<any>('api/driver', '');

  const columns: ColumnDef<any>[] = [
    {
      name: 'Driver',
      width: '200px',
      formatter: (row) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <img
            src={row?.photoUrl || '/assets/avatar-1.png'}
            alt={row?.name || 'Driver Avatar'}
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
          <Stack>
            <Typography color="text.primary" variant="body2">
              {row?.name || 'Aebad ul quadir'}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {row?.phone || '0334 0354382'}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      name: 'CNIC',
      width: '160px',
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row?.cnic || '42101-1234567-1'}
        </Typography>
      ),
    },
    {
      name: 'License No',
      width: '150px',
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row?.licenseNo || 'LIC-98234'}
        </Typography>
      ),
    },
    {
      name: 'Van Assigned',
      width: '180px',
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row?.vanName || 'Van-12'}
        </Typography>
      ),
    },
    {
      name: 'Joining Date',
      width: '160px',
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row?.joiningDate || '2023-06-01'}
        </Typography>
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
    {
      name: 'Actions',
      width: '100px',
      align: 'right',
      formatter: (row) => (
        <Stack direction="row" spacing={0} sx={{ justifyContent: 'flex-end' }}>
          <IconButton
            size="small"
            onClick={() => router.push(`${paths.dashboard.tracking.driver}/${row?.id || '1'}`)}
          >
            <EyeIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // Fallback row if no data is fetched
  const fallbackRow = [
    {
      id: '1',
      name: 'Aebad ul quadir',
      phone: '0334 0354382',
      cnic: '42101-1234567-1',
      licenseNo: 'LIC-98234',
      vanName: 'Van-12',
      joiningDate: '2023-06-01',
      status: 'Active',
      photoUrl: '',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Driver Management</Typography>
          </Box>
          <Box>
            <Link href="/driver/create" passHref>
              <Button variant="contained" color="primary" endIcon={<PlusIcon />}>
                Add Driver
              </Button>
            </Link>
          </Box>
        </Stack>

        <Card>
          <DriverFilter filters={filter} setFilters={setFilter} />

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
