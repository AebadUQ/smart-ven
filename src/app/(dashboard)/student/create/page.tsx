'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '@mui/material/Link';

import {
  Avatar, Box, Button, Card, CardActions, CardContent, FormControl,
  FormHelperText, Grid, InputLabel, OutlinedInput, Stack,
  Typography, Select, MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '@/paths';
import { toast } from '@/components/core/toaster';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { grades, vans, genders, exceptions, parents, routes } from '@/utils/data';
import { addStudent } from '@/store/reducers/student-slice';
import { AppDispatch, RootState } from '@/store';

function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error converting file to base64'));
  });
}

const schema = zod.object({
  kidImage: zod.string().optional(),
  fullname: zod.string().min(1, 'Full name is required').max(255),
  schoolId: zod.string().max(100).optional(),
  grade: zod.string().min(1, 'Grade is required'),
  van: zod.string().optional(),
  route: zod.string().optional(),
  exception: zod.array(zod.string()).optional(),
  gender: zod.enum(['Male', 'Female', 'Other'], { required_error: 'Gender is required' }),
  dob: zod.string()
    .refine((date) => new Date(date) <= new Date(), 'Date of Birth cannot be in the future'),
  parentEmail: zod.string().email('Enter a valid parent email').optional(),

});

type Values = zod.infer<typeof schema>;
const defaultValues: Values = {
  kidImage: 'https://media.licdn.com/dms/image/v2/D4D03AQED_3sDqYNYxw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710534304007?e=1759968000&v=beta&t=9TykYLbJrnUisT720afJpJxuErgBAgku6HqAm8Q89e0',
  fullname: '',
  schoolId: '',
  grade: '',
  van: '',
  route: '',
  exception: [],
  gender: 'Male',
  dob: '',
  parentEmail: ''
};

export default function StudentCreateForm(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.student.loading)
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
  const kidImage = watch('kidImage');

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setValue('kidImage', base64);
    }
  };

  const onSubmit = async (values: Values) => {
    try {
      const resultAction = await dispatch(addStudent(values));

      if (addStudent.fulfilled.match(resultAction)) {

      } else {
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
    // toast.success('Student saved successfully');
    // router.push(paths.dashboard.students.details('1'));
  };

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  return (
    <Box sx={{ maxWidth: 'var(--Content-maxWidth)', m: 'var(--Content-margin)', p: 'var(--Content-padding)', width: 'var(--Content-width)' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {JSON.stringify(errors)}
        <Card>
          <CardContent>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.jobs.browse}
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Back
                </Link>
              </div>

              <Typography variant="h6">Add New Student</Typography>

              <Grid container spacing={3}>
                {/* Avatar */}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box sx={{ border: '1px dashed grey', borderRadius: '50%', p: '4px' }}>
                      <Avatar
                        src={kidImage}
                        sx={{ width: 100, height: 100, bgcolor: 'background.default', color: 'text.primary' }}
                      >
                        <CameraIcon width={22} height={22} />
                      </Avatar>
                    </Box>
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Student Photo</Typography>
                      <Typography variant="caption">Upload PNG or JPG (min 400x400)</Typography>
                      <Button variant="outlined" onClick={() => avatarInputRef.current?.click()}>Select</Button>
                      <input ref={avatarInputRef} type="file" hidden onChange={handleAvatarChange} />
                    </Stack>
                  </Stack>
                  <Typography variant="h6" sx={{ mt: 2 }}>Student Detail</Typography>
                </Grid>

                {/* Full Name */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="fullname"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.fullname}>
                        <InputLabel required>Full Name</InputLabel>
                        <OutlinedInput {...field} />
                        <FormHelperText>{errors.fullname?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* School ID */}
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

                {/* Gender */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel required>Gender</InputLabel>
                        <Select {...field} label="Gender">
                          {genders.map((g) => (
                            <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.gender?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* DOB */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.dob}>
                        <InputLabel required shrink>Date of Birth</InputLabel>
                        <OutlinedInput type="date" {...field} inputProps={{ max: today }} />
                        <FormHelperText>{errors.dob?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Grade */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="grade"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.grade}>
                        <InputLabel required>Assign Student to</InputLabel>
                        <Select {...field} label="Grade / Class">
                          {grades.map((g) => (
                            <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.grade?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>


                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="parentEmail"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.parentEmail}>
                        <InputLabel required>Link to Parent(s) Account</InputLabel>
                        <Select {...field} label="Link to Parent(s) Account">
                          {parents.map((g) => (
                            <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.parentEmail?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              <Stack spacing={3} sx={{ mt: 4 }}>
                <Typography variant="h6">Assign Student to Van & Route</Typography>
                <Grid container spacing={3}>
                  {/* Van */}
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="van"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Select Van</InputLabel>
                          <Select {...field} label="Select Van">
                            {vans.map((v) => (
                              <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Route */}
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="route"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Select Route</InputLabel>
                          <Select {...field} label="Select Route">
                            {routes.map((v) => (
                              <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Pick/Drop Exceptions Multi-Select */}
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="exception"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Pick/Drop Exceptions</InputLabel>
                          <Select
                            {...field}
                            label="Pick/Drop Exceptions"
                            multiple
                            value={field.value || []}
                            onChange={(event) => {
                              const value = event.target.value;
                              field.onChange(typeof value === 'string' ? value.split(',') : value);
                            }}
                          >
                            {exceptions.map((v) => (
                              <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>


                </Grid>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text" color="inherit" sx={{ minWidth: 100 }} onClick={()=>router.back()}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" loading={loading}>Add New Student</Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
