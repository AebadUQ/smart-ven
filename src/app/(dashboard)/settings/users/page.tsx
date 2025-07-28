'use client';

import * as React from 'react';
import Link from 'next/link';
import { getBusinessUser } from '@/services/user.api';
// import useListApi from '@/hooks/useListApi';
import { deleteUser, getBranches, getUserRoll, inviteUser } from '@/services/userSettings';
import { aW } from '@fullcalendar/core/internal-common';
import { CircularProgress, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import { cond } from 'lodash';

import { dayjs } from '@/lib/dayjs';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

import { StatusModal } from './set-user-status-modal';
import UserModal from './user-add-modal';
import { DeleteUserModal } from './user-delete-modal';
import { UserFilters } from './user-filters';
import { UserViewModal } from './user-view-modal';

interface PageProps {
  searchParams: { email?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const url = getBusinessUser();
  const [allSelected, setAllSelected] = React.useState(false);
  const [selectCheckBox, setSelectCheckBox] = React.useState(false);
  // const [selectedValues, setSelectedValues] = React.useState<number[]>([]);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [viewData, setViewData] = React.useState({});
  const [status, setStatus] = React.useState({ id: 1, isActive: false });
  const [loading1, setLoading] = React.useState(true);
  // const [deleteModal, setDeleteModal] = React.useState(false);
  const [data1, setData1] = React.useState<any>([]);
  const [rolls, setRolls] = React.useState<any>([]);
  const [data2, setData2] = React.useState({});
  const [checkData, setCheckData] = React.useState(false);
  const [branches,setBranches]=React.useState([])

  const { data, loading, onPaginationChange, onPageSizeChange, onSort, total, pageSize, pageIndex, filter, setFilter } =
    useListApi<any>(url, '');
  const fetchData = async () => {
    const res = await getUserRoll();
    setRolls(res?.data?.data);

    setLoading(false);
  };
    const fetchBranch = async () => {
    const res = await getBranches();
    setBranches(res?.data?.data?.Branch);

    setLoading(false);
  };
  const handleClick = (row: any) => {
    setOpen(true);
    setData2(row);
  };
  const handleStatus = (row: any, id: any) => {
    setStatus({ id: id, isActive: row.isActive });
    setStatusOpen(true);
  };
  
  const handleEdit = (row: any) => {
    setOpen(true);
    setData2(row);
    
  };

  

  
  React.useEffect(() => {
    fetchData();
    fetchBranch()
  }, []);
  const columns = [
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.firstName + ' ' + row?.lastName}
          </Typography>
        </Stack>
      ),
      name: 'FULL NAME',
      
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.email}
          </Typography>
        </Stack>
      ),
      name: 'EMAIL',
      
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.mobile}
          </Typography>
        </Stack>
      ),
      name: 'MOBILE',
      
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">
            {row.title}
          </Typography>
        </Stack>
      ),
      name: 'TITLE',
      
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">
            {row.department}
          </Typography>
        </Stack>
      ),
      name: 'DEPARTMENT',
      
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.role?.name}
          </Typography>
        </Stack>
      ),
      name: 'ROLE',
      
    },
    {
      formatter: (row): React.JSX.Element => {
        const statusOne = row?.isActive
          ? { label: 'Active', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> }
          : { label: 'Inactive', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> };

        return (
          <Chip
            key={row?.id}
            onClick={() => handleStatus(row, row.id)}
            sx={{ cursor: 'pointer' }}
            icon={statusOne.icon}
            label={statusOne.label}
            size="small"
            variant="outlined"
          />
        );
      },
      name: 'STATUS',
      align: 'right',
    },
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            
            <IconButton onClick={() => handleEdit(row)}>
              <EyeIcon />
            
            </IconButton>
            
          </Stack>
        );
      },
      name: 'ACTION',
      align: 'center',
    },
  ] satisfies ColumnDef<any>[];

  const [open, setOpen] = React.useState(false);
console.log("branches",branches)
  return (
    <>
      <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'center' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h5">Users</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                startIcon={<PlusIcon />}
                variant="contained"
                onClick={() => {
                  setData2({}); // Reset data2 to empty object for new user
                  setOpen(true);
                }}
              >
                Invite New User
              </Button>
              {open && (
                <UserModal
                  rolls={rolls}
                  branches={branches}
                  filters={filter}
                  setFilter={setFilter}
                  open={open}
                  data={data2}
                  close={setOpen}
                ></UserModal>
              )}
            </Box>
          </Stack>
          <Card>
            {/* Fix here User Filter only email is return  */}
            <UserFilters
              filters={filter}
              setFilters={setFilter}
            />
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
                    No users found
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
        
        <UserViewModal
          open={viewOpen}
          close={() => {
            setViewOpen(false);
          }}
          setEditData={setData2}
          data={viewData}
          setEditOpen={setOpen}
        />
        <StatusModal
          open={statusOpen}
          onClose={() => setStatusOpen(false)}
          loading={loading}
          status={status}
          filter={filter}
          setFilter={setFilter}
          data={data}
        />
      </Box>
    </>
  );
}
