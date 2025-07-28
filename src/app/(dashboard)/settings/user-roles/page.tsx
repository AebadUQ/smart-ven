'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteUserRole } from '@/services/userRole';
import { getUserRoleURL } from '@/services/userSettings';
import { Checkbox, CircularProgress, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as ViewIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { Pencil as EditIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Trash as DeleteIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { toast } from '@/components/core/toaster';

import { dayjs } from '@/lib/dayjs';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';



import { DeleteUserRoleModal } from './delete-role-modal';
import { UserRoleFilters } from './user-role-filter';
import { logger } from '@/lib/default-logger';
import { useCallback, useEffect, useState } from 'react';
import { paths } from '@/paths'





export default function Page(): React.JSX.Element {
  const router = useRouter()
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  
  const [selectedValues, setSelectedValues]= useState<number[]>([]);
  



 const fetchRoles = useCallback(async () => {
      try {
        const roles = await getUserRoleURL();

        setData(roles?.data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if(loading){
      fetchRoles();
      }
    }, [loading]);



  const handleDeleteApi = async (value: any) => {
    try {
      await deleteUserRole(value);
      toast.success('delete happened Sucessfully');
      setLoading(true);
      

    } catch (err) {
            logger.error(err);
            toast.error(err?.response?.data?.message || "some thing went wrong");
          }

  }

  

  const handleEdit = (row: any) => {

    router.push(`${paths.dashboard.settings.editUserRole}/${row.id}`);
  };
  const handleView = (row: any) => {

    router.push(`${paths.dashboard.settings.viewUserRole}/${row.id}`);
  };
  const handleDelete = (row: any) => {
    setDeleteModal(true);

    setSelectedValues([row?.id])
    

  }
  const onConfirm = () => {

    handleDeleteApi(selectedValues)
    setDeleteModal(false);
  }

  const columns = [
    

    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start',width:"130px" }}>
          <Typography color="text.secondary" variant="body2">
            {row.name}
          </Typography>
        </Stack>
      ),
      name: 'USER ROLE',
      width: '50px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center',width:"490px" }}>
          <Typography color="text.secondary" variant="body2">
            {row.description}
          </Typography>
        </Stack>
      ),
      name: 'DESCRIPTION',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width:"152px" }}>
          <Typography color="text.secondary" variant="body2">
            {row?.registeredUser}
          </Typography>
        </Stack>
      ),
      name: 'USERS',
      width: '50px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>

    
          <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
      name: 'Actions',
      width: '100px',
      align: 'right',
    },
  ] satisfies ColumnDef<any>[];

  
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">User Roles</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button startIcon={<PlusIcon />} variant="contained" onClick={() => router.push(paths.dashboard.settings.addUserRole)}>
              Add New User Role
            </Button>
          </Box>
        </Stack>
          <Card>
            

            
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
                    No Roles found
                  </Typography>
                </Box>
              )}
            </Box>

          </Card>
        
      </Stack>
      <DeleteUserRoleModal open={deleteModal} onClose={()=>{setDeleteModal(false)}} onConfirm={onConfirm}/>
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
