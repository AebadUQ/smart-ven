'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createUserRoll, getRolePermissions, getUserRoleByID, updateUserRole } from '@/services/userRole';
import { Box, Button, Card, Checkbox, CircularProgress, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useFormik } from 'formik';

import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { AddUserRole } from '@/components/userSettings/addUserRole';

import { SearchModal } from '../../add-user/SearchModal';
import { paths } from '@/paths';

const useRoleData = (id: any) => {
  const [roleData, setRoleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getUserRoleByID(id)
      .then((response) => setRoleData(response.data))
      .catch((err) => setError(err.message || 'Unknown error'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { roleData, isLoading, error };
};

export default function UserRolePage() {
  const url = getRolePermissions();
  const { data: modulesData, loading: modulesLoading } = useListApi(url, '');
  const router = useRouter();
  const { userId } = useParams();
  const isEditMode = Boolean(userId);
  const { roleData, isLoading: roleLoading } = useRoleData(userId);
  const [roleModules, setRoleModules] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<{ id: number; form_name: string }[]>([]);
  const maped = selected?.map((item) => item.id);

  const formik = useFormik({
    initialValues: { id: '', name: '', description: '', modules: [] },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const filteredValues = {
          ...values,
          formId: maped,
          modules: values.modules.filter((mod: any) => mod.permissions.length > 0),
        };

        await updateUserRole(filteredValues);
        router.push( `${paths.dashboard.settings.viewUserRole}/${filteredValues.id}`);
      } catch (error) {
        console.error(`Error ${isEditMode ? 'updating' : 'creating'} role:`, error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (modulesData) {
      const updatedModules = modulesData.map((mod: any) => ({
        module: mod.id,
        permissions: roleData?.Modules?.find((m) => m.id === mod.id)?.permissions.map((p) => p.id) || [],
      }));
      setRoleModules(updatedModules);
      formik.setFieldValue('modules', updatedModules);
    }
  }, [modulesData, roleData]);

  useEffect(() => {
    if (roleData && !roleLoading) {
      formik.setValues({
        id: roleData.id,
        name: roleData.name || '',
        description: roleData.description || '',
        modules: roleModules,
      });
    }
  }, [roleData, roleLoading, roleModules]);

  const handleCheckboxChange =
    (moduleId: string, actionId: string, slug: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setRoleModules((prevModules: any) => {
        const updatedModules = prevModules.map((mod: any) =>
          mod.module === moduleId
            ? {
                ...mod,
                permissions: event.target.checked
                  ? [...mod.permissions, actionId]
                  : mod.permissions.filter((per: any) => per !== actionId),
              }
            : mod
        );
        formik.setFieldValue('modules', updatedModules);
        return updatedModules;
      });

      if (event.target.checked && actionId == '2' && slug === 'forms') {
        setOpen(true);
      }
    };

  const permissionActions = [
    { id: 1, name: 'create' },
    { id: 2, name: 'read' },
    { id: 3, name: 'update' },
    { id: 4, name: 'delete' },
  ];

  const columns = [
    {
      formatter: (row: any) => (
        <Typography color="text.secondary" variant="body2">
          {row.name}
        </Typography>
      ),
      name: 'MODULES',
      width: '150px',
    },
    ...permissionActions.map((action) => ({
      formatter: (row: any) => {
        const module = roleModules.find((m: any) => m.module === row.id);
        return (
          <>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
                justifyContent: 'start',
              }}
            >
              <Checkbox checked={module?.permissions.includes(action.id) || false} onChange={handleCheckboxChange(row.id, action.id, row?.slug)} />

              {/* {action.id === 2 && row?.slug === 'forms' && (
                <Tooltip title="Select forms this user role can view">
                  <InfoIcon
                    onClick={() => setOpen(true)}
                    color="var(--mui-palette-text-secondary)"
                    fontSize="var(--icon-fontSize-md)"
                    weight="fill"
                  />
                </Tooltip>
              )} */}
              {/* {action.id === 2 && row?.slug === 'forms' && (
                     <Button sx={{ marginX: 1 }} variant="contained" onClick={() => setOpen(true)}>
                       View Forms
                     </Button>
                   )} */}
            </Stack>
          </>
        );
      },
      name: action.name.toUpperCase(),
      width: '82px',
    })),
  ];

  const isLoading = modulesLoading || roleLoading;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flex: '1 1 auto' }}>
                <Typography variant="h4">{isEditMode ? 'Edit User Role' : 'Add New User Role'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button startIcon={<PlusIcon />} variant="contained" type="submit" disabled={formik.isSubmitting}>
                  {isEditMode ? 'Update User Role' : 'Create User Role'}
                </Button>
              </Box>
            </Stack>

            <CustomersSelectionProvider customers={modulesData}>
              <Card>
                <AddUserRole
                  change={formik.handleChange}
                  formikRole={formik.values.name}
                  formikDescription={formik.values.description}
                />
                <Divider />
                <Box sx={{ overflowX: 'auto' }}>
                  <DataTable columns={columns} rows={modulesData} />
                </Box>
                <Divider />
              </Card>
            </CustomersSelectionProvider>
          </Stack>
        </form>
      )}
      {open && (
        <SearchModal
          onClose={setOpen}
          open={open}
          selected={selected}
          setSelected={setSelected}
          editRoleData={roleData}
        />
      )}
    </Box>
  );
}
