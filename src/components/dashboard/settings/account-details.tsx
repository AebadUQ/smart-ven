'use client';

import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { CircularProgress, IconButton } from '@mui/material';
import { useUser } from '@/hooks/use-user';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Eye as Visible } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as NotVisible } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Option } from '@/components/core/option';

import { updateUser } from "@/services/userSettings";
import { updatePassword } from "@/services/userSettings";


export function AccountDetails(): React.JSX.Element {
  const { user,updateUserName} = useUser();
  // visibility state per field
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // Loading states for profile and password updates
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);


  const [formData, setFormData] = useState<any>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  
  const handleUpdate = async () => {
    try {
      setIsUpdatingProfile(true)
      const payload = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
      };
      updateUserName(payload);
      await updateUser(payload);
      alert("User profile updated successfully!");
      setIsUpdatingProfile(false)
    } catch (error) {
      setIsUpdatingProfile(false)
      console.error("Update failed:", error.response?.data || error.message);
      alert(`Failed to update user: ${error.response?.data?.message || "Unknown error"}`);
    }
  };


  const handleTogglePassword = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
    try {
      const { currentPassword, newPassword, confirmPassword } = formData;

      await updatePassword({ currentPassword, newPassword, confirmPassword });
      alert('Password updated successfully!');
      // clear fields and reset visibility
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPassword({ currentPassword: false, newPassword: false, confirmPassword: false });
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to update password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };
  return (

    <>
     
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  border: '1px dashed var(--mui-palette-divider)',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  p: '4px',
                }}
              >

                <Box sx={{ borderRadius: 'inherit', position: 'relative' }}>
                  <Box
                    sx={{
                      alignItems: 'center',
                      bottom: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      left: 0,
                      opacity: 0,
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <CameraIcon fontSize="var(--icon-fontSize-md)" />
                      <Typography color="inherit" variant="subtitle2">
                        Select
                      </Typography>
                    </Stack>
                  </Box>
                  <Avatar src="/assets/Avatar.svg" sx={{ '--Avatar-size': '50px' }} />

                </Box>
              </Box>
              <Typography variant="h6">Basic Details</Typography>

            </Stack>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                value={formData.firstName}
                name="firstName"
                onChange={handleChange}
                type="text"
              />
                    {/* <OutlinedInput defaultValue={user?.firstName} name="firstName" type="text" /> */}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
                type="text"
              />
                    {/* <OutlinedInput defaultValue={user?.lastName} name="lastName" type="text" /> */}
                  </FormControl>
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput defaultValue={user?.email} name="email" type="email" disabled />
                  </FormControl>
                </Grid>


                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput defaultValue={user?.mobile} name="phone" type="tel" disabled />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <OutlinedInput defaultValue={user?.role?.name} name="role" type="text" disabled />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <OutlinedInput defaultValue={user?.department} name="department" type="text" disabled />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end',alignItems:'center' }}>
          <Button variant="contained" disabled={isUpdatingProfile} onClick={handleUpdate}>Save changes</Button>
          {isUpdatingProfile && <CircularProgress size={22}/> }
        </CardActions>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  border: '1px dashed',
                  borderRadius: '50%',
                  p: 1,
                }}
              >
                <Avatar src="/assets/update-password.svg" sx={{ width: 50, height: 50 }} />
              </Box>
              <Typography variant="h6">Update Password</Typography>
            </Stack>

            <Box component="form" onSubmit={handlePasswordSubmit} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {/* Current Password */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="current-password">Current Password</InputLabel>
                    <OutlinedInput
                      id="current-password"
                      name="currentPassword"
                      type={showPassword.currentPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePassword('currentPassword')}
                            edge="end"
                          >
                            {showPassword.currentPassword ? <Visible /> : <NotVisible />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                {/* New Password */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="new-password">New Password</InputLabel>
                    <OutlinedInput
                      id="new-password"
                      name="newPassword"
                      type={showPassword.newPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePassword('newPassword')}
                            edge="end"
                          >
                            {showPassword.newPassword ? <Visible /> : <NotVisible />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="confirm-password"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePassword('confirmPassword')}
                            edge="end"
                          >
                            {showPassword.confirmPassword ? <Visible /> : <NotVisible />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end',alignItems:'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isUpdatingPassword}
                >
                  Update Password
                </Button>
                {isUpdatingPassword && (
                  <CircularProgress size={22} sx={{ ml: 2 }} />
                )}
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>



  );
}
