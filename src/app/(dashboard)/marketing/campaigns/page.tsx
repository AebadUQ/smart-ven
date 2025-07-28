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
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import Link from 'next/link';
import useListApi from '@/hooks/useListApi';
import { CircularProgress, LinearProgress } from '@mui/material';

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
  } = useListApi<any>('api/dashboard/campaigns-listing', '');


  const columns = [

    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.campaign?.name || 'Untitled'}
          </Typography>
        </Stack>
      ),
      name: 'Name',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.campaign?.subject || 'No Subject'}
          </Typography>
        </Stack>
      ),
      name: 'Type',
      width: '200px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
          {row?.stats?.subscriber_count}
          </Typography>
        </Stack>
      ),
      name: 'Recipents',
      width: '200px',
    },
     {
    name: "Open Rate",
    width: "200px",
    formatter: (row): React.JSX.Element => {
      // take the decimal (e.g. 0.4 or 1) → percent (40 or 100)
      const ratio = row?.stats?.open_rate ?? 0;
      const percent = Math.round(ratio * 100);

      return (
        <Box sx={{ textAlign: "center", width: "120px" }}>
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              mt: 1,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#1E88E5",
              },
            }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {percent}%
          </Typography>
        </Box>
      );
    },
  },
  {
    name: "Click Rate",
    width: "200px",
    formatter: (row): React.JSX.Element => {
      const ratio = row?.stats?.click_rate ?? 0;
      const percent = Math.round(ratio * 100);

      return (
        <Box sx={{ textAlign: "center", width: "120px" }}>
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              mt: 1,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#1E88E5",
              },
            }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {percent}%
          </Typography>
        </Box>
      );
    },
  },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.campaign?.from_email || 'N/A'}
          </Typography>
        </Stack>
      ),
      name: 'From',
      width: '180px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{
              bgcolor: getStatusColor(row?.campaign?.status),
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              display: 'inline-block'
            }}
          >
            {row?.campaign?.status}
          </Typography>
        </Stack>
      ),
      name: 'Status',
      width: '120px',
    },
    {
      formatter(row) {
        return row?.campaign?.created_at
          ? <Typography color="text.secondary" variant="body2">
            {dayjs(row?.campaign?.created_at).format('MMM D, YYYY h:mm A')}
          </Typography>
          : 'N/A';
      },
      name: 'Date',
      width: '180px',
    },

  ] satisfies ColumnDef<any>[];

  function getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'done':
        return 'rgba(46, 204, 113, 0.12)';
      case 'new':
        return 'rgba(52, 152, 219, 0.12)';
      default:
        return 'rgba(149, 165, 166, 0.12)';
    }
  }

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Campaigns</Typography>
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
      </Stack>
    </Box>
  );
}
