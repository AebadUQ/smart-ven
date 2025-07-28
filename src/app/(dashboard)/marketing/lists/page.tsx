"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { dayjs } from '@/lib/dayjs';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import useListApi from '@/hooks/useListApi';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import Link from 'next/link';
import { CircularProgress, LinearProgress } from '@mui/material';


const customers = [
  {
    id: `Fran Perez dsdfff dfsgdffffffffffffffffffffsfd
     dshfssssssssssssssssssssssssssssssssssssssssj
     dhsssssssssssssssssssj`,
    name: 'Fran Perez dsdfff dfsgdffffffffffffffffffffsfd dshfssssssssssssssssssssssssssssssssssssssssj dhsssssssssssssssssssj',
    avatar: '/assets/avatar-5.png',
    email: 'fran.perez@domain.com',
    phone: '(815) 704-0045',
    quota: 50,
    status: 'active',
    createdAt: dayjs().subtract(1, 'hour').toDate(),
  },
  {
    id: 'USR-004',
    name: 'Penjani Inyene',
    avatar: '/assets/avatar-4.png',
    email: 'penjani.inyene@domain.com',
    phone: '(803) 937-8925',
    quota: 100,
    status: 'active',
    createdAt: dayjs().subtract(3, 'hour').toDate(),
  },
];

interface PageProps {
  searchParams: { email?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const { email, phone, sortDir, status } = searchParams;
  const {
    data,
    loading,
    onPaginationChange,
    onPageSizeChange,
    onSort,
    total,
    pageSize,
    pageIndex,
    filter,
    setFilter,
  } = useListApi<any>('api/dashboard/getListing', '');

  

  const columns = [
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.list?.from_name}
          </Typography>
        </Stack>
      ),
      name: 'NAME',
      width: '50px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.stats?.subscriber_count}
          </Typography>
        </Stack>
      ),
      name: 'SUBSCRIBERS',
      width: '150px',
    },
    {
    name: 'Open Rate',
    width: '200px',
    formatter: (row): React.JSX.Element => {
      // safe-guard against null/undefined
      const ratio = row?.stats?.open_uniq_rate ?? 0  
      const percent = Math.round(ratio * 100)       // e.g. 0.4 → 40

      return (
        <Box sx={{ textAlign: 'center', width: '120px' }}>
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              mt: 1,
              height: 6,
              borderRadius: 3,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#1E88E5'
              }
            }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {percent}%
          </Typography>
        </Box>
      )
    },
  },
  {
    name: 'Click Rate',
    width: '200px',
    formatter: (row): React.JSX.Element => {
      const ratio = row?.stats?.click_rate ?? 0
      const percent = Math.round(ratio * 100)

      return (
        <Box sx={{ textAlign: 'center', width: '120px' }}>
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              mt: 1,
              height: 6,
              borderRadius: 3,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#1E88E5'
              }
            }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {percent}%
          </Typography>
        </Box>
      )
    },
  },
    {
      formatter(row) {
        return dayjs(row?.list?.createdAt).format('MMM D, YYYY h:mm A');
      },
      name: 'Date',
      width: '200px',
    }

  ] satisfies ColumnDef<any>[];


  const sortedCustomers = applySort(customers, sortDir);
  const filteredCustomers = applyFilters(sortedCustomers, { email, phone, status });

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Lists</Typography>
          </Box>

        </Stack>
        <CustomersSelectionProvider customers={filteredCustomers}>
          <Card>
            <Box sx={{ overflowX: 'auto' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : data?.length ? (
                <DataTable<any> columns={columns} rows={data} />
              ) : (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                    No Data found
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider />
            <CustomersPagination
                count={total}
                page={pageIndex}
                rowsPerPage={pageSize}
                onPaginationChange={(event, newPage) => onPaginationChange(newPage + 1)} // MUI 0-based index handle karega
                onRowsPerPageChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
              />;
          </Card>
        </CustomersSelectionProvider>
      </Stack>
    </Box>
  );
}

function applySort(row: any[], sortDir: 'asc' | 'desc' | undefined): any[] {
  return row.sort((a, b) => (sortDir === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
}

function applyFilters(row: any[], { email, phone, status }: any): any[] {
  return row.filter((item) => {
    if (email && !item.email?.toLowerCase().includes(email.toLowerCase())) return false;
    if (phone && !item.phone?.toLowerCase().includes(phone.toLowerCase())) return false;
    if (status && item.status !== status) return false;
    return true;
  });
}
