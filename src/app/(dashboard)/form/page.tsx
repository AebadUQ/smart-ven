'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, Chip, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  Eye as EyeIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  XCircle as XCircleIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Document, Image, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';

import { FormFilters } from './form-filters';
// import formlogo from '@/assets/form-logo.jpg';
import formlogo from '../../../../public/assets/form-logo.jpg';
import { paths } from '@/paths';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 12 },
  brand: { height: 70, width: 70 },
});

interface PageProps {
  searchParams: { email?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
}

export default function MainPage(): React.JSX.Element {
  const router = useRouter();
  const { data, loading, onPaginationChange, onPageSizeChange, onSort, total, pageSize, pageIndex, filter, setFilter } =
    useListApi<any>('api/user/get-all-forms-user?type=completed', '');

  

  const columns = [
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="column" spacing={0.5} sx={{ alignItems: 'flex-start' }}>
          <Typography color="text.secondary" variant="body2">
            {'BN-' + row.id}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {dayjs(row.updatedAt).format('DD/MM/YYYY | HH:mm')}
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
          pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
          completed: {
            label: 'Completed',
            icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
          },
          canceled: { label: 'Canceled', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
          rejected: { label: 'Rejected', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
        } as const;
        const { label, icon } = mapping['completed'] ?? { label: 'Unknown', icon: null };

        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      },
      name: 'Status',
      width: '50px',
    },
    {
      formatter: (row): React.JSX.Element => {
        const handleClick = () => {
          router.push(`${paths.dashboard.form}/${row.id}`);
        };

        return (
          <IconButton onClick={handleClick}>
            <EyeIcon />
          </IconButton>
        );
      },
      name: 'Actions',
      width: '100px',
      align: 'right',
    },
  ] satisfies ColumnDef<any>[];

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5" >Forms</Typography>
          </Box>
        </Stack>
        <CustomersSelectionProvider customers={data}>
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
                    No Forms found
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
    </Box>
  );
}
