"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import Chip from '@mui/material/Chip';

import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { dayjs } from '@/lib/dayjs';
import { FormFilters } from '../form/form-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import useListApi from '@/hooks/useListApi';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';


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
    filter,
    total,
    pageSize,
    pageIndex,
    setFilter,
  } = useListApi<any>('api/user/get-all-forms-user?type=leads', '');

  

  const columns = [
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="column" spacing={0.5} sx={{ alignItems: 'flex-start' }}>
          <Typography color="text.secondary" variant="body2">
            {"BN-" + row.id}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {dayjs(row.createdAt).format('DD MMM YYYY | HH:mm')}
          </Typography>
        </Stack>
      ),
      name: 'Id',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row.email}
          </Typography>
        </Stack>
      ),
      name: 'Name/Email',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.phoneNumber || "N/A"}
          </Typography>
        </Stack>
      ),
      name: 'Phone Number',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row.form_name}
          </Typography>
        </Stack>
      ),
      name: 'Form',
      width: '150px',
    },
    { 
      formatter: (row): React.JSX.Element => {
        const mapping = {
          draft: { label: 'Draft', icon: <ClockIcon color="var(--mui-palette-secondary-main)" /> },
          published: {
            label: 'Published',
            icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
          },
        } as const;
        const { label, icon } = mapping["draft"] ?? { label: 'Unknown', icon: null };
  
        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      }, 
      name: 'Status', 
      width: '50px' }
    
    
    
  ] satisfies ColumnDef<any>[];
  

  const sortedCustomers = applySort(customers, sortDir);
  const filteredCustomers = applyFilters(sortedCustomers, { email, phone, status });

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Leads</Typography>
          </Box>
          
        </Stack>
        <CustomersSelectionProvider customers={filteredCustomers}>
          <Card>
            <FormFilters filters={filter} setFilters={setFilter} />
                        
            <Divider />
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
                    No Leads found
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
