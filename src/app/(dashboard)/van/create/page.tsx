'use client';

import * as React from 'react';
import { useEffect } from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '@mui/material/Link';
import { toast } from '@/components/core/toaster';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '@/paths';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { AppDispatch, RootState } from '@/store';
import { uploadImage } from '@/utils/uploadImage';
import { addVan } from '@/store/reducers/van-slice';
import { getAllRoutes } from '@/store/reducers/route-slice';

/* ----------------------------- Local options ----------------------------- */
const vehicleTypes = [
  { value: 'Suzuki Bolan', label: 'Suzuki Bolan' },
  { value: 'Toyota Hiace', label: 'Toyota Hiace' },
  { value: 'Coaster', label: 'Coaster' },
];

const vehicleConditions = [
  { value: 'Good', label: 'Good' },
  { value: 'Average', label: 'Average' },
  { value: 'Poor', label: 'Poor' },
];

/* ------------------------------ Reusable UI ------------------------------ */
function ImageUpload({
  label = 'Van Photo',
  caption = 'Upload PNG or JPG (min 400×400)',
  value,
  onPick,
  size = 100,
}: {
  label?: string;
  caption?: string;
  value?: string;
  onPick: (file: File) => void;
  size?: number;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{label}</Typography>
      <Stack direction="row" spacing={3} alignItems="center">
        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: '50%',
            p: '4px',
            display: 'inline-flex',
          }}
        >
          <Avatar
            src={value}
            sx={{
              width: size,
              height: size,
              bgcolor: 'background.default',
              color: 'text.primary',
            }}
          >
            <CameraIcon width={22} height={22} />
          </Avatar>
        </Box>

        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            {caption}
          </Typography>
          <Button variant="outlined" onClick={() => ref.current?.click()}>
            Select
          </Button>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onPick(file);
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

/* ------------------------------ Validation ------------------------------ */
const schema = zod.object({
  venImage: zod.string().optional(),

  vehicleType: zod.string().min(1, 'Vehicle type is required'),
  carNumber: zod.string().min(1, 'Vehicle registration number is required'),
  condition: zod.string().min(1, 'Condition is required'),
  venCapacity: zod.coerce.number().int().min(1, 'Capacity must be at least 1'),
  deviceId: zod.string().optional(),

  // we'll store the selected route _id here
  assignRoute: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  vehicleType: 'suzuki_bolan',
  carNumber: '',
  condition: 'Good',
  venCapacity: 1,
  deviceId: '',
  assignRoute: '',
};

/* --------------------------------- Page --------------------------------- */
export default function VanCreateForm(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // from van slice
  const loading = useSelector((state: RootState) => state.van.assignLoading);

  // from route slice
  const {
    routes: routeList,
    loading: routeLoading,
    error: routeError,
  } = useSelector((state: RootState) => state.route);

  // fetch routes once (page=1,limit=1000)
  useEffect(() => {
    dispatch(getAllRoutes({ page: 1, limit: 1000 }));
  }, [dispatch]);

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

  const venImage = watch('venImage');

  const handlePickPhoto = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      setValue('venImage', imageUrl, { shouldValidate: true });
    } catch (error: any) {
      toast.error(error?.message || 'Failed to upload image');
    }
  };

  const onSubmit = async (values: Values) => {
    // if backend expects routeId instead of assignRoute, map it here
    const payloadToSend = {
      ...values,
      routeId: values.assignRoute, // send the selected route _id
    };

    try {
      const resultAction = await dispatch(addVan(payloadToSend));

      if (addVan.fulfilled.match(resultAction)) {
        console.log('Van added successfully:', resultAction.payload);
        router.push('/van');
      } else {
        console.error('Failed to add van:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error while adding van:', error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack spacing={4}>
              {/* Back link */}
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.van}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                    gap: 1,
                  }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Back
                </Link>
              </div>

              <Typography variant="h6">Add New Van</Typography>

              {/* Upload Van Photo */}
              <ImageUpload value={venImage} onPick={handlePickPhoto} />

              {/* Vehicle Details */}
              <Typography variant="subtitle2">Vehicle Details</Typography>
              <Grid container spacing={3}>
                {/* Vehicle Type */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.vehicleType}>
                        <InputLabel required>Vehicle Type</InputLabel>
                        <Select {...field} label="Vehicle Type">
                          {vehicleTypes.map((v) => (
                            <MenuItem key={v.value} value={v.value}>
                              {v.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.vehicleType?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Vehicle Registration Number (Plate) */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="carNumber"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.carNumber}>
                        <InputLabel required>
                          Vehicle Registration Number (Plate)
                        </InputLabel>
                        <OutlinedInput
                          {...field}
                          label="Vehicle Registration Number (Plate)"
                        />
                        <FormHelperText>
                          {errors.carNumber?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Condition */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="condition"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.condition}>
                        <InputLabel required>Condition</InputLabel>
                        <Select {...field} label="Condition">
                          {vehicleConditions.map((c) => (
                            <MenuItem key={c.value} value={c.value}>
                              {c.label}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.condition?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Capacity */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="venCapacity"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.venCapacity}>
                        <InputLabel required>Capacity</InputLabel>
                        <OutlinedInput
                          type="number"
                          {...field}
                          label="Capacity"
                        />
                        <FormHelperText>
                          {errors.venCapacity?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Device ID */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="deviceId"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Device ID</InputLabel>
                        <OutlinedInput {...field} label="Device ID" />
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Route (API data) */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="assignRoute"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Route</InputLabel>

                        <Select
                          label="Route"
                          disabled={routeLoading}
                          value={field.value || ''} // keep controlled
                          onChange={(e) => {
                            // store selected route _id
                            field.onChange(e.target.value);
                          }}
                        >
                          {routeList?.map((r: any) => (
                            <MenuItem key={r._id} value={r._id}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  lineHeight: 1.3,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 500, lineHeight: 1.3 }}
                                >
                                  {r.title || 'Untitled Route'}
                                </Typography>

                                <Typography
                                  variant="caption"
                                  sx={{ lineHeight: 1.3 }}
                                  color="text.secondary"
                                >
                                  {r?.driverDetails?.fullname
                                    ? `Driver: ${r.driverDetails.fullname}`
                                    : r?.vanDetails?.carNumber
                                    ? `Van: ${r.vanDetails.carNumber}`
                                    : r.tripType && r.startTime
                                    ? `${r.tripType} @ ${r.startTime}`
                                    : `ID: ${r._id}`}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}

                          {/* fallback states when no data */}
                          {(!routeList || routeList.length === 0) &&
                            !routeLoading && (
                              <MenuItem disabled value="">
                                {routeError
                                  ? 'Failed to load routes'
                                  : 'No routes found'}
                              </MenuItem>
                            )}
                        </Select>

                        {routeError && (
                          <FormHelperText error>
                            {routeError}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="text"
              color="inherit"
              sx={{ minWidth: 100 }}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={loading}>
              Add new Van
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}