'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import {TrashSimple } from '@phosphor-icons/react/dist/ssr/TrashSimple';
import { Eye } from '@phosphor-icons/react/dist/ssr';


import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

import { useCustomersSelection } from './customers-selection-context';

export interface Customer {
  id: string;
  role?: string;
  action?: string;
  username?: string;
  createdAt: Date;
  name?:string;
  avatar?:string;
  email?:string;
  phone?:string;
  status?: string;
  quota?:number;
}



const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography color="text.secondary" variant="body2">
          {row.id}
        </Typography>
      </Stack>
    ),
    name: 'Id',
    width: '50px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {' '}
        <div>
          <Link
            color="inherit"
            component={RouterLink}
            href={paths.dashboard.customers.details('1')}
            sx={{ whiteSpace: 'nowrap' }}
            variant="subtitle2"
          >
            {row.role}
          </Link>
        </div>
      </Stack>
    ),
    name: 'Role',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography color="text.secondary" variant="body2">
          {row.action}
        </Typography>
      </Stack>
    ),
    name: 'Action Perform',
    width: '150px',
  },
  { 
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography color="text.secondary" variant="body2">
          {row.username}
        </Typography>
      </Stack>
    ), 
    name: 'User Name', 
    width: '250px' },
  {
    formatter(row) {
      return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
    },
    name: 'Date',
    width: '200px',
  },
  {
    formatter: (): React.JSX.Element => (
      <>
      <IconButton component={RouterLink} href={paths.dashboard.customers.details('1')}>
        <Eye />
      </IconButton>
      <IconButton component={RouterLink} href={paths.dashboard.customers.details('1')}>
        <PencilSimpleIcon />
      </IconButton>
      <IconButton component={RouterLink} href={paths.dashboard.customers.details('1')}>
        <TrashSimple color='red' />
      </IconButton>
      </>
    ),
    name: 'Actions',
    width: '200px',
    align: 'right',
  },
  
] satisfies ColumnDef<Customer>[];

export interface CustomersTableProps {
  rows: Customer[];
}

export function CustomersTable({ rows }: CustomersTableProps): React.JSX.Element {
  const { deselectAll, deselectOne, selectAll, selectOne, selected } = useCustomersSelection();

  return (
    <React.Fragment>
      <DataTable<Customer>
        columns={columns}
        onDeselectAll={deselectAll}
        onDeselectOne={(_, row) => {
          deselectOne(row.id);
        }}
        onSelectAll={selectAll}
        onSelectOne={(_, row) => {
          selectOne(row.id);
        }}
        rows={rows}
        // selectable
        selected={selected}
      />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No customers found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
