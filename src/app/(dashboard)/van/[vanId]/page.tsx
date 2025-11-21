"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useParams } from "next/navigation";

import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { House as HouseIcon } from "@phosphor-icons/react/dist/ssr/House";

import { getVanDetailById } from "@/store/reducers/van-slice";
import { getAllDrivers, assignDriverToVan } from "@/store/reducers/driver-slice";
import Link from "next/link";

// Reusable Detail Item
function DetailItem({ label, value }: { label: string; value: any }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="subtitle1" fontWeight={600}>
        {value || "—"}
      </Typography>
    </Box>
  );
}

export default function VanDetailsPage() {
  const params = useParams<{ vanId: string }>();
  const vanId = params?.vanId;

  const dispatch = useDispatch<AppDispatch>();
  const { selectedVan, selectedVanLoading } = useSelector(
    (state: RootState) => state.van
  );
  const { drivers, loading: driversLoading } = useSelector(
    (state: RootState) => state.driver
  );

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = React.useState("");

  React.useEffect(() => {
    if (vanId) dispatch(getVanDetailById(vanId));
  }, [vanId, dispatch]);

  React.useEffect(() => {
    dispatch(getAllDrivers({ page: 1, limit: 1000 }));
  }, [dispatch]);

  const handleAssignDriver = async () => {
    if (!selectedDriver || !vanId) return;

    try {
      await dispatch(assignDriverToVan({ driverId: selectedDriver, vanId })).unwrap();
      setModalOpen(false);
      dispatch(getVanDetailById(vanId)); // refresh
    } catch (error) {
      console.error("Assign Driver Error:", error);
    }
  };

  if (selectedVanLoading || driversLoading) {
    return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  }

  if (!selectedVan) {
    return <Typography sx={{ p: 4 }}>Van not found.</Typography>;
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {/* Back Button */}
        <Link
          href="/van"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <ArrowLeftIcon />
          <Typography variant="subtitle2" color="text.primary">
            Back to Vans
          </Typography>
        </Link>

        <Divider sx={{ my: 2 }} />

        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar sx={{ width: 60, height: 60 }}>
            <HouseIcon />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {selectedVan.vehicleType} — {selectedVan.numberPlate}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Assigned Route: {selectedVan.route || "—"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Van Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Van Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Van ID" value={selectedVan.id} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Vehicle Type" value={selectedVan.vehicleType} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Car Number" value={selectedVan.numberPlate} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Capacity" value={selectedVan.capacity} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Condition" value={selectedVan.condition || "N/A"} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Driver Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Driver Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Driver Name" value={selectedVan.driverName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Driver Email" value={selectedVan.driverEmail} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Driver Phone" value={selectedVan.driverPhone} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Driver CNIC" value={selectedVan.cnic} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="License Front"
              value={selectedVan.licenceImageFront ? "Uploaded" : "Not Uploaded"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setModalOpen(true)}
            >
              Assign / Change Driver
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Route Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Route Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Assigned Route" value={selectedVan.route} />
          </Grid>
        </Grid>
      </CardContent>

      {/* Assign Driver Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            width: 500,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={2}>
            Assign Driver
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Select Driver</InputLabel>
            <Select
              value={selectedDriver}
              label="Select Driver"
              onChange={(e) => setSelectedDriver(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: { maxHeight: 300, overflowY: "auto" },
                },
              }}
            >
              {drivers?.drivers?.map((driver: any) => (
                <MenuItem key={driver.id} value={driver.id}>
                  {driver.fullname} — {driver.phoneNo || "N/A"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" disabled={!selectedDriver} onClick={handleAssignDriver}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
}
