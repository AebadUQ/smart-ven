'use client';

import * as React from 'react';
import { getContactUsData } from '@/services/userSettings';
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




export default function Page(): React.JSX.Element {
  
  const url = getContactUsData();
  const { data, loading, onPaginationChange, total, pageSize, pageIndex, onPageSizeChange, onSort, filter, setFilter } =
    useListApi<any>(url, '');
  const [open, setOpen] = React.useState(false);
  
  
  const columns = [
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.name}
          </Typography>
        </Stack>
      ),
      name: 'Name',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.email}
          </Typography>
        </Stack>
      ),
      name: 'Email',
      width: '165.5px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.phoneNumber || 'Admin'}
          </Typography>
        </Stack>
      ),
      name: 'Phone Number',
      width: '165.5px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.subject}
          </Typography>
        </Stack>
      ),
      name: 'Subject',
      width: '165.5px',
    },
    {
        formatter: (row): React.JSX.Element => (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.subject}
            </Typography>
          </Stack>
        ),
        name: 'Subject',
        width: '165.5px',
      },

      {
        formatter: (row): React.JSX.Element => (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.message}
            </Typography>
          </Stack>
        ),
        name: 'Message',
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
    
  ] satisfies ColumnDef<any>[];

  
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Support</Typography>
          </Box>
        </Stack>
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
                    No Contacts found
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
        
      </Stack>
      
    </Box>
  );
}



