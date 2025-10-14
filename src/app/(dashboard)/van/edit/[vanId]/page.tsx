'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '@mui/material/Link';
import { toast } from '@/components/core/toaster';
import {
  Avatar, Box, Button, Card, CardActions, CardContent,
  FormControl, FormHelperText, Grid, InputLabel, OutlinedInput,
  Stack, Typography, Select, MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { paths } from '@/paths';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { routes } from '@/utils/data';
import { AppDispatch, RootState } from '@/store';
import { uploadImage } from '@/utils/uploadImage';
import { getVanDetailById, updateVan } from '@/store/reducers/van-slice';

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
            sx={{ width: size, height: size, bgcolor: 'background.default', color: 'text.primary' }}
          >
            <CameraIcon width={22} height={22} />
          </Avatar>
        </Box>

        <Stack spacing={0.5}>
          <Typography variant="caption" color="text.secondary">{caption}</Typography>
          <Button variant="outlined" onClick={() => ref.current?.click()}>Select</Button>
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
  assignRoute: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

/* --------------------------------- Page --------------------------------- */
export default function VanEditForm(): React.JSX.Element {
  const router = useRouter();
  const params = useParams<{ vanId: string }>();
  const vanId = params?.vanId;

  const dispatch = useDispatch<AppDispatch>();
  const { selectedVan, selectedVanLoading } = useSelector(
    (state: RootState) => state.van
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const venImage = watch('venImage');

  /* --------------------------- Fetch existing data --------------------------- */
  React.useEffect(() => {
    if (vanId) dispatch(getVanDetailById(vanId));
  }, [dispatch, vanId]);

  React.useEffect(() => {
    if (selectedVan) {
      reset({
        venImage: selectedVan.driverPicture || '',
        vehicleType: selectedVan.vehicleType || '',
        carNumber: selectedVan.numberPlate || '',
        condition: selectedVan.condition || '',
        venCapacity: selectedVan.capacity || 1,
        deviceId: selectedVan.deviceId || '',
        assignRoute: selectedVan.route || '',
      });
    }
  }, [selectedVan, reset]);

  /* ----------------------------- Image Upload ----------------------------- */
  const handlePickPhoto = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      setValue('venImage', imageUrl, { shouldValidate: true });
    } catch (error: any) {
      toast.error(error?.message || 'Failed to upload image');
    }
  };

  /* ----------------------------- On Submit ----------------------------- */
const onSubmit = async (values: Values) => {
  if (!vanId) return;

  const payload = {
    vanId,      // include vanId
    ...values,  // merge all form values
  };

  console.log("Van update payload:", payload);

  // Dispatch your thunk or API call here
  try {
    const updatedVan = await dispatch(updateVan(payload)).unwrap();
    toast.success("Van updated successfully");
    router.push(paths.dashboard.van);
  } catch (error: any) {
    toast.error(error || "Failed to update van");
  }
};

  /* ------------------------------- Render ------------------------------- */
  return (
    <Box sx={{ maxWidth: 'var(--Content-maxWidth)', m: 'var(--Content-margin)', p: 'var(--Content-padding)', width: 'var(--Content-width)' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.van}
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Back
                </Link>
              </div>

              <Typography variant="h6">Edit Van</Typography>

              <ImageUpload value={venImage} onPick={handlePickPhoto} />

              <Typography variant="subtitle2">Vehicle Details</Typography>
              <Grid container spacing={3}>
                {/* Vehicle Type */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.vehicleType}>
                        <InputLabel id="vehicle-type-label" required>Vehicle Type</InputLabel>
                        <Select
                          {...field}
                          labelId="vehicle-type-label"
                          value={field.value || ''}
                          label="Vehicle Type"
                        >
                          {vehicleTypes.map((v) => (
                            <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.vehicleType?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Vehicle Number */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="carNumber"
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.carNumber}>
                        <InputLabel required>Vehicle Registration Number (Plate)</InputLabel>
                        <OutlinedInput {...field} label="Vehicle Registration Number (Plate)" />
                        <FormHelperText>{errors.carNumber?.message}</FormHelperText>
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
                        <InputLabel id="condition-label" required>Condition</InputLabel>
                        <Select
                          {...field}
                          labelId="condition-label"
                          value={field.value || ''}
                          label="Condition"
                        >
                          {vehicleConditions.map((c) => (
                            <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.condition?.message}</FormHelperText>
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
                        <OutlinedInput type="number" {...field} label="Capacity" />
                        <FormHelperText>{errors.venCapacity?.message}</FormHelperText>
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

                {/* Route */}
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="assignRoute"
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="route-label">Route</InputLabel>
                        <Select
                          {...field}
                          labelId="route-label"
                          value={field.value || ''}
                          label="Route"
                        >
                          {routes.map((r) => (
                            <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text" color="inherit" sx={{ minWidth: 100 }} onClick={() => router.back()}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={selectedVanLoading}>
              Update Van
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
