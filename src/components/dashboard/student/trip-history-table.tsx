'use client';

import * as React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { Van } from '@phosphor-icons/react';

// ✅ Extended interface
export interface StudentTrip {
  id: string;
  vehicleId: string;
  driverName: string;
  date: string;
  startLocation: string;
  endLocation: string;
  status: 'Present' | 'Absent';
}

// ✅ Clean columns with plain text (no icons or avatars)
const columns: ColumnDef<StudentTrip>[] = [
{
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'var(--mui-palette-background-level2)', color: 'var(--mui-palette-text-primary)' }}>
          <Van fontSize="var(--icon-fontSize-lg)" />
        </Avatar>
        <Typography variant="subtitle2">{'VHL-123'}</Typography>
      </Stack>
    ),
    name: 'Vehicle',
    width: '200px',
  },
  {
    name: 'Driver',
    field: 'driverName',
    width: '160px',
  },
  {
    name: 'Date',
    field: 'date',
    width: '140px',
  },
  {
    name: 'Start Location',
    field: 'startLocation',
    width: '180px',
  },
  {
    name: 'End Location',
    field: 'endLocation',
    width: '180px',
  },
  {
    name: 'Status',
    formatter: (row): React.JSX.Element => (
      <Chip
        label={row.status}
        color={row.status === 'Present' ? 'success' : 'error'}
        variant="soft"
        size="small"
      />
    ),
    width: '120px',
  },
];

export interface StudentTripHistoryTableProps {
  rows: StudentTrip[];
}

export default function StudentTripHistoryTable({
  rows,
}: StudentTripHistoryTableProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader title="Trips History" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <DataTable<StudentTrip> columns={columns} rows={rows} />
      </Box>
    </Card>
  );
}
