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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAlertById, updateAlert, clearAlertStatus } from "@/store/reducers/alert-slice";
import { useParams, useRouter } from "next/navigation";
import { getAllSchoolVans } from "@/store/reducers/van-slice";

export default function EditAlertPage(): React.JSX.Element {
  const params = useParams<{ alertId: string }>();
  const alertId = params?.alertId;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { alertDetail, loading, success, error } = useSelector(
    (state: RootState) => state.alert
  );
  console.log("alertDetail",alertDetail)
  const { vans, loading: vansLoading } = useSelector((state: RootState) => state.van);

  const [alertType, setAlertType] = React.useState("");
  const [recipientType, setRecipientType] = React.useState("");
  const [vanId, setVanId] = React.useState<string>("");
  const [message, setMessage] = React.useState("");

  // Fetch alert detail
  React.useEffect(() => {
    if (alertId) {
      dispatch(getAlertById(alertId));
    }
  }, [dispatch, alertId]);

  // Populate form when detail loads
  React.useEffect(() => {
    if (alertDetail) {
      setAlertType(alertDetail.alertType || "");
      setRecipientType(alertDetail.recipientType || "");
      setVanId(alertDetail.vanId || "");
      setMessage(alertDetail.message || "");
    }
  }, [alertDetail]);

  // Fetch vans when SPECIFIC_VAN selected
  React.useEffect(() => {
    if (recipientType === "SPECIFIC_VAN") {
      dispatch(getAllSchoolVans({ page: 1, limit: 50 }))
        .unwrap()
        .catch(console.error);
    }
  }, [recipientType, dispatch]);

  const handleSubmit = async () => {
  if (!alertType || !recipientType || !message) {
    alert("Please fill in all required fields!");
    return;
  }

  const data: any = {
    alertId,
    alertType,
    recipientType,
    vanId: vanId || undefined, // optional if not selected
    message,
  };

  try {
    await dispatch(updateAlert(data)).unwrap(); // unwrap to catch errors
    router.push("/alert"); // navigate back to alert list
  } catch (err: any) {
    console.error("Failed to update alert:", err);
  }
};


  // Handle success or error
  React.useEffect(() => {
    if (success) {
      dispatch(clearAlertStatus());
      router.push("/alert"); // navigate back to alerts list
    }
    if (error) {
      dispatch(clearAlertStatus());
    }
  }, [success, error, dispatch, router]);

  const mappedVans = vans.map((v) => ({
    _id: v.van.id,
    vehicleType: v.van.vehicleType,
    carNumber: v.van.carNumber,
    driverName: v.driver?.fullname || "No driver",
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Edit Alert</Typography>

          {loading ? (
            <CircularProgress />
          ) : (
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
                  <FormControl fullWidth>
                    <InputLabel id="van-select-label">Select Van</InputLabel>
                 <Select
  labelId="van-select-label"
  value={vanId}
  onChange={(e) => setVanId(e.target.value)}
  label="Select Van"
  MenuProps={{
    PaperProps: {
      style: {
        maxHeight: 300, // max height in px
        width: 250,     // optional, to control width of dropdown
      },
    },
  }}
>
  {mappedVans.map((v) => (
    <MenuItem key={v._id} value={v._id}>
      {v.vehicleType} - {v.carNumber} ({v.driverName})
    </MenuItem>
  ))}
</Select>

                  </FormControl>
                </Grid>
              )}

              {/* Message */}
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
                  {loading ? <CircularProgress size={22} color="inherit" /> : "Update"}
                </Button>
              </Grid>
            </Grid>
          )}
        </Stack>
      </Card>
    </Box>
  );
}
