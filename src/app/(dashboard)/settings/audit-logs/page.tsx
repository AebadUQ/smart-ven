'use client';

import * as React from 'react';
import { getBusinessUser } from '@/services/audit.api';
import { filterHash } from '@fullcalendar/core/internal';
import { CircularProgress, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { dayjs } from '@/lib/dayjs';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';

import { AuditModal } from './audit-detail-modal';
import { AuditFilters } from './audit-filter';
import { DeleteConfirmationModal } from './delete-modal';

const customers = [
  {
    id: 'USR-001',
    name: 'Fran Perez',
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
  const Action = [
    { id: 1, actionName: 'Get', value: 'Get' },
    { id: 2, actionName: 'Post', value: 'Post' },
  ];
  const url = getBusinessUser();
  const { email, phone, sortDir, status } = searchParams;
  const { data, loading, onPaginationChange, total, pageSize, pageIndex, onPageSizeChange, onSort, filter, setFilter } =
    useListApi<any>(url, '');
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});
  
  
  const columns = [
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {"Log-" + row?.id}
          </Typography>
        </Stack>
      ),
      name: 'ID',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.userName}
          </Typography>
        </Stack>
      ),
      name: 'USER NAME',
      width: '165.5px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.roleName || 'Admin'}
          </Typography>
        </Stack>
      ),
      name: 'ROLE',
      width: '165.5px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.description}
          </Typography>
        </Stack>
      ),
      name: 'ACTION PERFORM',
      width: '165.5px',
    },
    
    {
      formatter(row) {
        return (
          <Typography variant="body2" sx={{ width: '100%' }}>
            {dayjs(row.createdAt).format('MMM D, YYYY h:mm A')}
          </Typography>
        );
      },
      name: 'Date',
      width: '210px',
    },
    {
      formatter: (row): React.JSX.Element => {
        
        return (
          <>
            <IconButton
              onClick={() => {
                setSelectedRow(row);
                setOpen(true);
              }}
            >
              <EyeIcon />
            </IconButton>

            {/* <IconButton onClick={() => {
                setSelectedRow(row);
                setDeleteModalOpen(true);
              }}>
                <TrashIcon />
              </IconButton> */}
          </>
        );
      },

      name: 'ACTION',
      width: '200px',
      align: 'right',
    },
  ] satisfies ColumnDef<any>[];

  const sortedCustomers = applySort(customers, sortDir);
  const filteredCustomers = applyFilters(sortedCustomers, { email, phone, status });

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Audit Logs</Typography>
          </Box>
        </Stack>
        <CustomersSelectionProvider customers={filteredCustomers}>
          <Card>
            <AuditFilters filters={filter} setFilters={setFilter} sortDir={sortDir} actionArray={Action} />
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
                    No Logs found
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
            />
          </Card>
        </CustomersSelectionProvider>
      </Stack>
      {selectedRow && <AuditModal open={open} close={() => setOpen(false)} data={selectedRow} />}
      
    </Box>
  );
}

function applySort(rows: any[], sortDir: 'asc' | 'desc' | undefined): any[] {
  return rows.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortDir === 'asc' ? dateA - dateB : dateB - dateA;
  });
}

function applyFilters(rows: any[], { email, phone, status }: any): any[] {
  return rows.filter((item) => {
    if (email && !item.email?.toLowerCase().includes(email.toLowerCase())) return false;
    if (phone && !item.phone?.toLowerCase().includes(phone.toLowerCase())) return false;
    if (status && item.status !== status) return false;
    return true;
  });
}
