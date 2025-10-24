"use client";

import * as React from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Button,
  Grid,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addAlert, clearAlertStatus } from "@/store/reducers/alert-slice";
import { getAllSchoolVans } from "@/store/reducers/van-slice";
import { useRouter } from "next/navigation";

export default function AddAlertForm(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, success, error } = useSelector(
    (state: RootState) => state.alert
  );
  const { vans, loading: vansLoading } = useSelector(
    (state: RootState) => state.van
  );

  const [alertType, setAlertType] = React.useState("");
  const [recipientType, setRecipientType] = React.useState("");
  const [vanId, setVanId] = React.useState<string>(""); // SINGLE VALUE
  const [message, setMessage] = React.useState("");

  // Fetch vans when SPECIFIC_VAN is selected
  React.useEffect(() => {
    if (recipientType === "SPECIFIC_VAN") {
      dispatch(getAllSchoolVans({ page: 1, limit: 50 }))
        .unwrap()
        .catch(console.error);
    }
  }, [recipientType, dispatch]);

  // Handle submit
  const handleSubmit = async () => {
    if (!alertType || !recipientType || !message) {
      alert("Please fill in all required fields!");
      return;
    }

    const data = {
      alertType,
      recipientType,
      vanId, 
      message,
    };

    await dispatch(addAlert(data));
  };

  // Reset form on success
  React.useEffect(() => {
    if (success) {
      setAlertType("");
      setRecipientType("");
      setVanId("");
      setMessage("");
      dispatch(clearAlertStatus());
      router.push("/alert");
    }
  }, [success, dispatch, router]);

  React.useEffect(() => {
    if (error) {
      dispatch(clearAlertStatus());
    }
  }, [error, dispatch]);

  // Map vans for Autocomplete
  const mappedVans = vans.map((v) => ({
    _id: v.van.id,
    vehicleType: v.van.vehicleType,
    carNumber: v.van.carNumber,
    driverName: v.driver.fullname || "No driver",
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Add / Edit Alert</Typography>

          <Grid container spacing={2}>
            {/* Alert Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Alert Type"
                fullWidth
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
              />
            </Grid>

            {/* Recipient Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="recipient-type-label">Recipient Type</InputLabel>
                <Select
                  labelId="recipient-type-label"
                  value={recipientType}
                  label="Recipient Type"
                  onChange={(e: SelectChangeEvent) => {
                    setRecipientType(e.target.value);
                    setVanId("");
                  }}
                >
                  <MenuItem value="ALL_DRIVERS">All Drivers</MenuItem>
                  <MenuItem value="SPECIFIC_VAN">Specific Van</MenuItem>
                  <MenuItem value="ALL_PARENTS">All Parents</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Van selection */}
            {recipientType === "SPECIFIC_VAN" && (
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={mappedVans}
                  getOptionLabel={(option) =>
                    `${option.vehicleType} - ${option.carNumber} (${option.driverName})`
                  }
                  loading={vansLoading}
                  value={mappedVans.find((v) => v._id === vanId) || null}
                  onChange={(event, newValue) => {
                    setVanId(newValue?._id || "");
                  }}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Van"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {vansLoading ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            )}

            {/* Message Field */}
            <Grid item xs={12}>
              <TextField
                label="Message"
                fullWidth
                multiline
                minRows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>

            {/* Submit */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ minWidth: 150 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </Box>
  );
}
