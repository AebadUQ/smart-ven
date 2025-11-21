"use client";

import * as React from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";


import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import { createRoute, clearRouteStatus } from "@/store/reducers/route-slice";
import { getAllSchoolVans } from "@/store/reducers/van-slice";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import GoogleMapPicker from "./GoogleMapPicker";

type FormValues = {
  vanId: string;
  driverId?: string;
  title: string;
  startTime: string;
  tripType: "morning" | "evening";
  tripDays: Record<string, boolean>;
  startLat: string;
  startLong: string;
  endLat: string;
  endLong: string;
};

export default function AddRouteForm(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, success, error } = useSelector((state: RootState) => state.route);
  const { vans, loading: vansLoading } = useSelector((state: RootState) => state.van);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      vanId: "",
      driverId: "",
      title: "",
      startTime: "",
      tripType: "morning",
      tripDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      startLat: "",
      startLong: "",
      endLat: "",
      endLong: "",
    },
  });

  const tripDays = watch("tripDays");

  const [openPicker, setOpenPicker] = React.useState<null | "start" | "end">(null);

  React.useEffect(() => {
    dispatch(getAllSchoolVans({ page: 1, limit: 50 })).unwrap().catch(console.error);
  }, [dispatch]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      startPoint: { lat: parseFloat(data.startLat), long: parseFloat(data.startLong) },
      endPoint: { lat: parseFloat(data.endLat), long: parseFloat(data.endLong) },
    };
    await dispatch(createRoute(payload));
  };

  React.useEffect(() => {
    if (success) {
      reset();
      dispatch(clearRouteStatus());
      router.push("/planner");
    }
  }, [success]);

  React.useEffect(() => {
    if (error) dispatch(clearRouteStatus());
  }, [error]);

  const handleDayChange = (day: string) => {
    setValue(`tripDays.${day}`, !tripDays[day]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Add Route</Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Van selection */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="vanId"
                  control={control}
                  rules={{ required: "Van is required" }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.vanId}>
                      <InputLabel id="van-select-label">Select Van</InputLabel>
                      <Select
                        labelId="van-select-label"
                        {...field}
                        label="Select Van"
                        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                      >
                        {vans?.map((v) => (
                          <MenuItem key={v.van?.id} value={v.van?.id}>
                            {v.van.vehicleType} - {v.van.carNumber} ({v.driver.fullname || "No driver"})
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.vanId && <FormHelperText>{errors.vanId.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Title */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Title"
                      fullWidth
                      {...field}
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Grid>

              {/* Start Time */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="startTime"
                  control={control}
                  rules={{ required: "Start Time is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Start Time"
                      type="time"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={!!errors.startTime}
                      helperText={errors.startTime?.message}
                    />
                  )}
                />
              </Grid>

              {/* Trip Type */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tripType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Trip Type</InputLabel>
                      <Select {...field} label="Trip Type">
                        <MenuItem value="morning">Morning</MenuItem>
                        <MenuItem value="evening">Evening</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Trip Days */}
              <Grid item xs={12}>
                <FormGroup row>
                  {Object.keys(tripDays).map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={tripDays[day as keyof typeof tripDays]}
                          onChange={() => handleDayChange(day)}
                        />
                      }
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                    />
                  ))}
                </FormGroup>
              </Grid>

              {/* Start Location */}
              <Grid item xs={12}>
                <Button variant="outlined" onClick={() => setOpenPicker("start")}>
                  Pick Start Location on Map
                </Button>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Controller
                  name="startLat"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Start Latitude" fullWidth {...field} />
                  )}
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <Controller
                  name="startLong"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Start Longitude" fullWidth {...field} />
                  )}
                />
              </Grid>

              {/* End Location */}
              <Grid item xs={12}>
                <Button variant="outlined" onClick={() => setOpenPicker("end")}>
                  Pick End Location on Map
                </Button>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Controller
                  name="endLat"
                  control={control}
                  render={({ field }) => (
                    <TextField label="End Latitude" fullWidth {...field} />
                  )}
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <Controller
                  name="endLong"
                  control={control}
                  render={({ field }) => (
                    <TextField label="End Longitude" fullWidth {...field} />
                  )}
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 150 }}
                  disabled={loading || vansLoading}
                >
                  {loading ? <CircularProgress size={22} color="inherit" /> : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Card>

      {/* Map Picker Dialog */}
      <Dialog fullWidth maxWidth="md" open={!!openPicker} onClose={() => setOpenPicker(null)}>
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent>
          <GoogleMapPicker
            onSelect={(lat, lng) => {
              if (openPicker === "start") {
                setValue("startLat", lat.toString());
                setValue("startLong", lng.toString());
              } else {
                setValue("endLat", lat.toString());
                setValue("endLong", lng.toString());
              }
              setOpenPicker(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
