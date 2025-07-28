'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar, Box, Button, Card, CardActions, CardContent, Divider, FormControl,
  FormControlLabel, FormHelperText, Grid, InputLabel, OutlinedInput, Stack,
  Typography, Select, MenuItem, Switch,
} from '@mui/material';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error converting file to base64'));
  });
}

const schema = zod.object({
  avatar: zod.string().optional(),
  fullName: zod.string().min(1, 'Full name is required').max(255),
  email: zod.string().email().min(1).max(255),
  mobileNumber: zod.string().min(1, 'Mobile is required').max(20),
  schoolId: zod.string().max(100).optional(),
  grade: zod.string().min(1, 'Grade is required'),
  van: zod.string().optional(),
  parentLinked: zod.boolean(),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  avatar: '',
  fullName: '',
  email: '',
  mobileNumber: '',
  schoolId: '',
  grade: '',
  van: '',
  parentLinked: false,
};

export default function StudentCreateForm(): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const avatar = watch('avatar');

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setValue('avatar', base64);
    }
  };

  const onSubmit = async (values: Values) => {
    try {
      // API logic here
      toast.success('Student saved successfully');
      router.push(paths.dashboard.students.details('1'));
    } catch (err) {
      logger.error(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack spacing={4}>
            <Typography variant="h6">Student Details</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box sx={{ border: '1px dashed grey', borderRadius: '50%', p: '4px' }}>
                    <Avatar
                      src={avatar}
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: 'background.default',
                        color: 'text.primary',
                      }}
                    >
                      <CameraIcon width={22} height={22}/>
                    </Avatar>
                  </Box>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">Student Photo</Typography>
                    <Typography variant="caption">Upload PNG or JPG (min 400x400)</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      Choose
                    </Button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      hidden
                      onChange={handleAvatarChange}
                    />
                  </Stack>
                </Stack>
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.fullName}>
                      <InputLabel required>Full Name</InputLabel>
                      <OutlinedInput {...field} />
                      <FormHelperText>{errors.fullName?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.email}>
                      <InputLabel required>Email</InputLabel>
                      <OutlinedInput {...field} />
                      <FormHelperText>{errors.email?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.mobileNumber}>
                      <InputLabel required>Mobile Number</InputLabel>
                      <OutlinedInput {...field} />
                      <FormHelperText>{errors.mobileNumber?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="schoolId"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>School ID</InputLabel>
                      <OutlinedInput {...field} />
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="grade"
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.grade}>
                      <InputLabel required>Grade / Class</InputLabel>
                      <Select {...field} label="Grade / Class">
                        <MenuItem value="1">Grade 1</MenuItem>
                        <MenuItem value="2">Grade 2</MenuItem>
                        <MenuItem value="3">Grade 3</MenuItem>
                      </Select>
                      <FormHelperText>{errors.grade?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="van"
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Van / Route</InputLabel>
                      <Select {...field} label="Van / Route">
                        <MenuItem value="van1">Van 1 - Route A</MenuItem>
                        <MenuItem value="van2">Van 2 - Route B</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="parentLinked"
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Switch {...field} checked={field.value} />}
                      label="Parent Linked"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {/* <Button component={RouterLink} href={paths.dashboard.students.} color="secondary">
            Cancel
          </Button> */}
          <Button type="submit" variant="contained">
            Save Student
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
