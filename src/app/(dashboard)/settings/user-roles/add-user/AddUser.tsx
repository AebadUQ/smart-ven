'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { createUserRoll, getRolePermissions } from '@/services/userRole';
import { Checkbox, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as BackIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useFormik } from 'formik';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { AddUserRole } from '@/components/userSettings/addUserRole';

import { SearchModal } from './SearchModal';
import { paths } from '@/paths';

export default function Page({ searchParams }: any): React.JSX.Element {
  const url = getRolePermissions();
  const { data, loading } = useListApi<any>(url, '');
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const [selected, setSelected] = React.useState<{ id: number; form_name: string }[]>([]);
  const maped = selected?.map((item) => item.id);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      modules: [],
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data = { formId: maped, ...values };
        await createUserRoll(data);
        router.push(paths.dashboard.settings.userrolls);
      } catch (error) {
        console.error('Error creating role:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    if (data) {
      formik.setFieldValue(
        'modules',
        data.map((mod: any) => ({
          module: mod.id,
          permissions: [],
        }))
      );
    }
  }, [data]);

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
              <Checkbox onChange={handleCheckboxChange(row.id, action.id, row?.slug)} />

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

  const handleCheckboxChange =
    (moduleId: string, actionId: string, slug: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      
      if (event.target.checked && actionId == '2' && slug === 'forms') {
        setOpen(true);
      }

      formik.setValues((prevValues: any) => {
        const updatedModules = prevValues.modules.map((mod: any) => {
          if (mod.module === moduleId) {
            const permissions = event.target.checked
              ? [...mod.permissions, actionId]
              : mod.permissions.filter((perm: string) => perm !== actionId);
            return { ...mod, permissions };
          }
          return mod;
        });

        return { ...prevValues, modules: updatedModules };
      });
    };

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Button startIcon={<BackIcon />} variant="outlined" onClick={() => router.back()}>
                Back
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Add New User Role</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button startIcon={<PlusIcon />} variant="contained" type="submit" disabled={formik.isSubmitting}>
                Save User Role
              </Button>
            </Box>
          </Stack>
          <CustomersSelectionProvider customers={data}>
            <Card>
              <AddUserRole
                change={formik.handleChange}
                formikRole={formik.values.name}
                formikDescription={formik.values.description}
              />
              <Divider />
              <Box sx={{ overflowX: 'auto' }}>
                <DataTable<any> columns={columns} rows={data} />
              </Box>
              <Divider />
            </Card>
          </CustomersSelectionProvider>
        </Stack>
      </form>
      {open && <SearchModal onClose={setOpen} open={open} selected={selected} setSelected={setSelected} />}
    </Box>
  );
}
