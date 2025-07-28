'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUserRoll, getUserRoleByID, updateUserRole } from '@/services/userRole';
import { Checkbox, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useFormik } from 'formik';
import { ArrowLeft as BackIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { AddUserRole } from '@/components/userSettings/addUserRole';
import { UserRoleView } from '@/components/userSettings/viewUserRole';
import { paths } from '@/paths';

export default function Page({ roleId }: any): React.JSX.Element {
  const { data: modulesData, loading: modulesLoading } = useListApi<any>(
    'api/permissions/get-module-with-permissions',
    ''
  );
  const [roleData, setRoleData] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    const fetchRoleData = async () => {
      if (!roleId) return;

      try {
        const response = await getUserRoleByID(roleId);

        setRoleData(response.data);
      } catch (err) {
        console.error('Error fetching role data:', err);
      } finally {
      }
    };
    fetchRoleData();
  }, [roleId]);

  
  const permissionActions = [
    { id: 1, name: 'create' },
    { id: 2, name: 'read' },
    { id: 3, name: 'update' },
    { id: 4, name: 'delete' },
  ];

  const columns: any = [
    {
      formatter: (row: any): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row.name}
        </Typography>
      ),
      name: 'MODULES',
      width: '150px',
    },
    ...permissionActions.map((action: any) => ({
      formatter: (row: any): React.JSX.Element => {
        const isChecked = row.permissions.some((perm: any) => perm.id === action.id);
        return <Checkbox checked={isChecked} />;
      },
      name: action.name.toUpperCase(),
      width: '82px',
    })),
  ];

  const isLoading = modulesLoading;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      {!roleData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={4}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{display:"flex", alignItems: 'center' }}>
              <Button
                      sx={{ width: '100px', marginLeft: '30px' }}
                      startIcon={<BackIcon />}
                      variant="outlined"
                      onClick={() => router.back()}
                    >
                      Back
                    </Button>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">{'View User Role'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  router.push(`${paths.dashboard.settings.editUserRole}/${roleId}`);
                }}
                startIcon={<PlusIcon />}
                variant="contained"
                type="submit"
              >
                Update User Role

              </Button>
            </Box>
          </Stack>

          <CustomersSelectionProvider customers={roleData?.Modules || []}>
            <Card>
              <Stack spacing={1} justifyContent='center' >

              <UserRoleView role={roleData?.name} description={roleData?.description} />

              {/* <Divider /> */}
              <Box sx={{ overflowX: 'auto' }}>
                <DataTable<any> columns={columns} rows={roleData?.Modules || []} />
              </Box>
              </Stack>
              <Divider />

            </Card>
          </CustomersSelectionProvider>
        </Stack>
      )}
    </Box>
  );
}
