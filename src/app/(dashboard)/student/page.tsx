"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { PencilSimple as EditIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

import { dayjs } from '@/lib/dayjs';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import Link from 'next/link';
import useListApi from '@/hooks/useListApi';
import { Chip, CircularProgress, IconButton, LinearProgress } from '@mui/material';
import { ClockIcon } from '@mui/x-date-pickers';
import { StudentFilter } from './studentfilter';

interface PageProps {
  searchParams: { email?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const { email, phone, sortDir, status } = searchParams;
    const router = useRouter();
  
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
  } = useListApi<any>('api/confirmation', '');

console.log("total",total)
const columns = [
  // 🧑‍🎓 Student Info Column
  {
    name: 'Student',
    width: '240px',
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} alignItems="center">
        <img
          src={row?.photoUrl || '/assets/avatar-1.png'}
          alt={row?.fullName}
          style={{ width: 40, height: 40, borderRadius: '50%' }}
        />
        <Stack>
          <Typography color="text.primary" variant="body2">
            {row?.name || 'Aebad ul quadir'}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {row?.email || 'aebadulquadir123@gmail.com'}
          </Typography>
        </Stack>
      </Stack>
    ),
  },

  // 🏫 School ID
  {
    name: 'School ID',
    width: '100px',
    formatter: (row): React.JSX.Element => (
      <Typography color="text.secondary" variant="body2">
        {row?.schoolId || 'STU-1001'}
      </Typography>
    ),
  },

  // 🏷️ Class or Grade
  {
    name: 'Class / Grade',
    width: '150px',
    formatter: (row): React.JSX.Element => (
      <Typography color="text.secondary" variant="body2">
        {row?.classGrade || 'Grade 5 - A'}
      </Typography>
    ),
  },

  // 🚐 Van and Route Info
  {
    name: 'Van / Route',
    width: '200px',
    formatter: (row): React.JSX.Element => (
      <Typography color="text.secondary" variant="body2">
        {row?.vanName
          ? `${row.vanName} / ${row.routeName}`
          : 'Van 12 - Route Alpha'}
      </Typography>
    ),
  },

  // ✅ Status Column
  {
    name: 'Status',
    width: '50px',
    formatter: (): React.JSX.Element => (
      <Chip label="Active" size="small" variant="filled" />
    ),
  },

  // 👨‍👩‍👧 Parent Linked Status
 {
  name: 'Parent Linked',
  width: '150px',
  align: 'center', // Optional, depends on table implementation
  formatter: (): React.JSX.Element => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Chip label="No" size="small" variant="outlined" />
    </Box>
  ),
}
,

  // ⚙️ Actions (Edit / View)
  {
    name: 'Actions',
    width: '100px',
    align: 'right',
    formatter: (): React.JSX.Element =>{
const handleClick = () => {
          router.push(`${paths.dashboard.student}/STU-0092`);
        };
      return (
      <Stack
        direction="row"
        spacing={0}
        sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <IconButton onClick={handleClick} size="small">
          <EyeIcon />
        </IconButton>
      </Stack>
    )
    },
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
    <Typography variant="h5">Student Management</Typography>
  </Box>

  {/* Add Student Button */}
  <Box>
    <Link href="/student/create" passHref>
      <Button variant="contained" color="primary" endIcon={<PlusIcon />}  >
        Add Student
      </Button>
    </Link>
  </Box>
</Stack>

        <Card>
                        <StudentFilter filters={filter} setFilters={setFilter} />
            
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
