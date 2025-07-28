import * as React from 'react';
import { useRouter } from 'next/navigation';
import { inviteUser, updateUser } from '@/services/userRole';
import { deleteUser } from '@/services/userSettings';
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CircularProgress, IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as EditIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useFormik } from 'formik';
import * as Yup from 'yup';



import { DeleteUserModal } from './user-delete-modal';


export default function UserModal({ rolls, open, data, close, filters, setFilter,branches }: any): React.JSX.Element | null {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const [apiResponse, setApiResponse] = React.useState<any>(null);
  // ......................................................................
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<number | null>(null);
  // .......................................................................
  // Work for shifting delete button to the edit modal...
  const handleDeleteApi = async (value: any) => {
    try {
      await deleteUser(value);
      setApiResponse({ success: true, message: 'User Deleted successfully' });
      setTimeout(() => close(false), 500);
      setFilter({id:value })
      
    } catch (err) {
      console.log('error happend');
    }
  };
  // ....................................................................................
  const onConfirmation = () => {
    setDeleteModal(false);
    handleDeleteApi(selectedValues);
    setDeleteModal(false);
  };
  // .........................................................

  const handleDelete = (row: any) => {
    // setSelectedValues((prev) => (prev.includes(row?.id) ? prev.filter((id) => id !== row?.id) : [...prev, row?.id]));
    setSelectedValues(row?.id);
    setDeleteModal(true);
  };

  //

  // Determine if we're in edit mode (if we have an ID)
  const isEditMode = Boolean(data && data.id);

  

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    title: Yup.string().required('Title is required'),
    roleId: Yup.string().required('User Role is required'),
        // branch: Yup.any().required('Branch is required'),

    department: Yup.string().required('Department is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
  });

  // Prepare data for update
  const prepareUpdateData = (values) => {
    return {
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      department: values.department,
      mobile: values.mobile,
      roleId: values.roleId,
      branchId: values.branchId,

    };
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      title: data?.title || '',
      roleId: data?.role?.id || 0,
      department: data?.department || '',
      email: data?.email || '',
      mobile: data?.mobile || '',
            branchId: data?.branchId || null,

    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      setApiResponse(null);

      try {
        
        if (isEditMode) {
          
          if (!data.id) {
            console.error('Error: User ID is missing or invalid!');
            setError('User ID is missing or invalid!');
            return;
          }

          const updateData = { ...prepareUpdateData(values) };
          const response = await updateUser(data.id, updateData);

          setApiResponse({ success: true, message: 'User updated successfully' });
          setTimeout(() => close(false), 1500);
        } else {
          const inviteData = { ...values };
          await inviteUser(inviteData);

          setApiResponse({ success: true, message: 'User invited successfully' });
          setFilter({ ...filters, name: data.merchantName });
          setTimeout(() => close(false), 1500);
        }
      } catch (err) {
        console.error('Form submission error:', err);
        setError(`Error: ${err?.response?.data?.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
  });

  React.useEffect(() => {
    if (open) {
      formik.resetForm({
        values: {
          firstName: data?.firstName || '',
          lastName: data?.lastName || '',
          title: data?.title || '',
          roleId: data?.role?.id || 0,
          department: data?.department || '',
          email: data?.email || '',
          mobile: data?.mobile || '',
                    branchId: data?.branchId || '',

        },
      });
      setError(null);
      setApiResponse(null);
    }
  }, [open, data]);

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={() => !isLoading && close(false)}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
          <Typography variant="h6">{isEditMode ? 'Edit User' : 'Invite New User'}</Typography>
          <IconButton onClick={() => !isLoading && close(false)}>
            <XIcon />
          </IconButton>
        </Stack>

  

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            <FormControl sx={{ maxWidth: '100%' }} error={formik.touched.firstName && Boolean(formik.errors.firstName)}>
              <InputLabel>First Name</InputLabel>
              <OutlinedInput
                value={formik.values.firstName}
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <FormHelperText>{formik.errors.firstName}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ maxWidth: '100%' }} error={formik.touched.lastName && Boolean(formik.errors.lastName)}>
              <InputLabel>Last Name</InputLabel>
              <OutlinedInput
                value={formik.values.lastName}
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <FormHelperText>{formik.errors.lastName}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ maxWidth: '100%' }} error={formik.touched.title && Boolean(formik.errors.title)}>
              <InputLabel>Title</InputLabel>
              <OutlinedInput
                value={formik.values.title}
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && <FormHelperText>{formik.errors.title}</FormHelperText>}
            </FormControl>

            <FormControl sx={{ maxWidth: '100%' }} error={formik.touched.roleId && Boolean(formik.errors.roleId)}>
              <InputLabel>User Role</InputLabel>
              <Select
                fullWidth
                name="roleId"
                value={formik.values.roleId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {rolls.map((role: any) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.roleId && formik.errors.roleId && <FormHelperText>{formik.errors.roleId}</FormHelperText>}
            </FormControl>
{/* branch */}
  <FormControl sx={{ maxWidth: '100%' }} error={formik.touched.roleId && Boolean(formik.errors.roleId)}>
              <InputLabel>Branch</InputLabel>
              <Select
                fullWidth
                name="branchId"
                value={formik.values.branchId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {branches?.map((role: any) => (
                  <MenuItem key={role.id} value={role?.id}>
                    {role?.value}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.branchId && formik.errors.branchId && <FormHelperText>{formik.errors.branchId}</FormHelperText>}
            </FormControl>


            <FormControl
              sx={{ maxWidth: '100%' }}
              error={formik.touched.department && Boolean(formik.errors.department)}
            >
              <InputLabel>Department</InputLabel>
              <OutlinedInput
                value={formik.values.department}
                name="department"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.department && formik.errors.department && (
                <FormHelperText>{formik.errors.department}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ maxWidth: '100%' }} error={formik.touched.email && Boolean(formik.errors.email)}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <FormHelperText>{formik.errors.email}</FormHelperText>}
            </FormControl>

            <FormControl sx={{ maxWidth: '100%' }} error={formik.touched.mobile && Boolean(formik.errors.mobile)}>
              <InputLabel>Mobile</InputLabel>
              <OutlinedInput
                value={formik.values.mobile}
                name="mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobile && formik.errors.mobile && <FormHelperText>{formik.errors.mobile}</FormHelperText>}
            </FormControl>
             {apiResponse && (
          <Typography color={apiResponse.success ? 'success.main' : 'error'} variant="body2" sx={{ mb: 2 }}>
            {apiResponse.message}
          </Typography>
        )}

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              {isEditMode && (
                <Button color="error" startIcon={<TrashIcon />} variant="contained" onClick={() => handleDelete(data)}>
                  Deleten User
                </Button>
              )}
              <Button
                sx={{
                  backgroundColor: 'rgba(111, 43, 139, 1)',
                  color: 'white',
                  borderRadius: '6px',
                  display: 'flex',
                  paddingInline: '16px',
                }}
                disableElevation={true}
                type="submit"
                startIcon={isEditMode ? <EditIcon /> : <PlusIcon />}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : isEditMode ? 'Update User' : 'Create New User'}
              </Button>
            </Stack>

          </Stack>
        </form>
      </DialogContent>
      <DeleteUserModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => onConfirmation()}
        setSelected={setSelectedValues}
      />
    </Dialog>
  );
}
