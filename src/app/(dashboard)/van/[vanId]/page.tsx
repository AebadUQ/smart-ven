"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { House as HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";

import { paths } from "@/paths";
import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";
import { RootState, AppDispatch } from "@/store";
import { getVanDetailById } from "@/store/reducers/van-slice";
import { getAllDrivers ,assignDriverToVan} from "@/store/reducers/driver-slice";

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const params = useParams<{ vanId: string }>();
  const vanId = params?.vanId;
  const dispatch = useDispatch<AppDispatch>();

  const { selectedVan, selectedVanLoading, selectedVanError } = useSelector(
    (state: RootState) => state.van
  );
  const { drivers, loading: driversLoading } = useSelector(
    (state: RootState) => state.driver
  );

  // Modal state
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = React.useState<string>("");

  // Fetch van detail
  React.useEffect(() => {
    if (vanId) dispatch(getVanDetailById(vanId));
  }, [dispatch, vanId]);

  // Fetch drivers list
  React.useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const handleAssignDriver = async () => {
  if (!selectedDriver || !vanId) return;

  try {
    // Dispatch the thunk
    await dispatch(assignDriverToVan({ driverId: selectedDriver, vanId })).unwrap();

    // Close modal after success
    setModalOpen(false);

    // Optionally refresh van detail
    dispatch(getVanDetailById(vanId));
  } catch (error) {
    console.error("Failed to assign driver:", error);
  }
};

  const statusLabel = (selectedVan?.status || "").trim().toLowerCase();
  const isActive = statusLabel === "active";
  const statusChip = statusLabel ? (
    <Chip
      icon={isActive ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> : undefined}
      label={statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)}
      size="small"
      variant="outlined"
      color={isActive ? "success" : "default"}
    />
  ) : (
    <Chip label="Unknown" size="small" variant="outlined" />
  );

  return (
    <Box sx={{ p: 4, width: "100%", position: "relative" }}>
      {(selectedVanLoading || driversLoading) && <LinearProgress sx={{ mb: 2 }} />}
      {/* {driversLoading && <LinearProgress sx={{ mb: 2 }} />} */}

      <Stack spacing={4}>
        <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.van}
          sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
          variant="subtitle2"
        >
          <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
          Back to Vans
        </Link>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{ alignSelf: "flex-end" }}
        >
          Assign Driver
        </Button>

        {selectedVanError && <Typography color="error">{selectedVanError}</Typography>}

        {selectedVan && (
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card>
                <CardHeader avatar={<Avatar><UserIcon /></Avatar>} title="Driver Details" />
                <CardContent>
                  <PropertyList divider={<Divider />} orientation="vertical">
                    <PropertyItem name="Driver ID" value={selectedVan.driverId || "—"} />
                    <PropertyItem name="Driver Name" value={selectedVan.driverName || "—"} />
                    <PropertyItem name="Email" value={selectedVan.driverEmail || "—"} />
                    <PropertyItem name="Phone" value={selectedVan.driverPhone || "—"} />
                    <PropertyItem name="CNIC" value={selectedVan.cnic || "—"} />
                    <PropertyItem name="License No" value={selectedVan.licenceImageFront ? "Uploaded" : "—"} />
                    <PropertyItem name="Status" value={statusChip} />
                  </PropertyList>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} md={8}>
              <Card>
                <CardHeader avatar={<Avatar><HouseIcon /></Avatar>} title="Vehicle & Route Info" />
                <CardContent>
                  <PropertyList divider={<Divider />} orientation="vertical">
                    <PropertyItem name="Van ID" value={selectedVan._id} />
                    <PropertyItem name="Vehicle Type" value={selectedVan.vehicleType} />
                    <PropertyItem name="Car Number" value={selectedVan.carNumber} />
                    <PropertyItem name="Capacity" value={selectedVan.venCapacity} />
                    <PropertyItem name="Route Assigned" value={selectedVan.assignRoute} />
                    <PropertyItem name="Condition" value={selectedVan.condition || "—"} />
                  </PropertyList>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Stack>

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
          <Typography variant="h6" mb={2}>Assign Driver</Typography>
          <FormControl fullWidth>
            <InputLabel id="driver-select-label">Select Driver</InputLabel>
            <Select
              labelId="driver-select-label"
              value={selectedDriver}
              label="Select Driver"
              onChange={(e) => setSelectedDriver(e.target.value)}
              MenuProps={{ PaperProps: { style: { maxHeight: 300, width: 250 } } }}
            >
              {drivers.map((driver) => (
                <MenuItem key={driver._id} value={driver._id}>
                  {driver.fullname} ({driver.phoneNo || "N/A"})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAssignDriver} disabled={!selectedDriver}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
