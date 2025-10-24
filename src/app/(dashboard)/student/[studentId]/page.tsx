"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterLink from "next/link";
import { useParams } from "next/navigation";
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
import { getStudentDetail } from "@/store/reducers/student-slice";
import { assignVanToStudent, getAllSchoolVans } from "@/store/reducers/van-slice";

export default function Page(): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const id = params?.studentId;
  const dispatch = useDispatch<AppDispatch>();
  const { studentDetail, detailLoading } = useSelector((s: RootState) => s.student);
  const { vans, loading, error } = useSelector((state: RootState) => state.van);

  // Modal state
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedVan, setSelectedVan] = React.useState<string>("");

  // Fetch student detail
  React.useEffect(() => {
    const fetchStudent = async () => {
      if (id && (!studentDetail || studentDetail.id !== id)) {
        try {
          await dispatch(getStudentDetail(id)).unwrap();
        } catch (err) {
          console.error("Failed to fetch student detail:", err);
        }
      }
    };
    fetchStudent();
  }, [dispatch, id, studentDetail]);

  // Fetch school vans
  React.useEffect(() => {
    const fetchVans = async () => {
      try {
        await dispatch(getAllSchoolVans()).unwrap();
      } catch (err) {
        console.error("Failed to fetch school vans:", err);
      }
    };
    fetchVans();
  }, [dispatch]);

  // Optional retry logic
  const retriedRef = React.useRef(false);
  React.useEffect(() => {
    const retryFetch = async () => {
      if (
        id &&
        !detailLoading &&
        (!studentDetail || studentDetail.id !== id) &&
        !retriedRef.current
      ) {
        retriedRef.current = true;
        try {
          await dispatch(getStudentDetail(id)).unwrap();
        } catch (err) {
          console.error("Retry fetch student failed:", err);
        }
      }
    };
    retryFetch();
  }, [dispatch, id, detailLoading, studentDetail]);

  const statusLabel = (studentDetail?.status || "").trim().toLowerCase();
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
    <Chip label="Pending" size="small" variant="outlined" />
  );

const handleAssign = async () => {
  if (!selectedVan || !id) return;

  try {
    await dispatch(assignVanToStudent({ kidId: id, vanId: selectedVan })).unwrap();
    setModalOpen(false);
    // Optionally refetch student detail to reflect the new van assignment
    await dispatch(getStudentDetail(id)).unwrap();
  } catch (err) {
    console.error("Failed to assign van:", err);
  }
};
console.log("studentDetail",studentDetail)
  return (
    <Box sx={{ p: 4, width: "100%", position: "relative" }}>
      {detailLoading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Top-right Assign Van Button */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Assign Van
        </Button>
      </Box>

      <Stack spacing={4}>
        <Stack spacing={2}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.student}
            sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
            variant="subtitle2"
          >
            <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
            Students
          </Link>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
              <Avatar src={studentDetail?.image || "/assets/avatar-1.png"} sx={{ width: 64, height: 64 }}>
                {studentDetail?.fullname?.slice(0, 2)?.toUpperCase() || "ST"}
              </Avatar>

              <div>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                  <Typography variant="h4">{studentDetail?.fullname || "—"}</Typography>
                  {statusChip}
                </Stack>

                <Typography color="text.secondary" variant="body1">
                  {studentDetail?.parentEmail || "No parent email"}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Stack>

        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardHeader
                avatar={<Avatar><UserIcon /></Avatar>}
                title="Student Details"
              />
              <CardContent sx={{ width: "100%", overflowX: "auto" }}>
                <PropertyList divider={<Divider />} orientation="vertical">
                  <PropertyItem
                    name="Student ID"
                    value={<Chip label={studentDetail?.id || "—"} size="small" variant="soft" />}
                  />
                  <PropertyItem name="Name" value={studentDetail?.fullname || "—"} />
                  <PropertyItem name="Email (Parent)" value={studentDetail?.parentEmail || "—"} />
                  <PropertyItem name="Age" value={studentDetail?.age ?? "—"} />
                  <PropertyItem name="Grade" value={studentDetail?.grade || "—"} />
                  <PropertyItem name="Status" value={statusChip} />
                </PropertyList>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardHeader
                avatar={<Avatar><HouseIcon /></Avatar>}
                title="School & Route Info"
              />
              <CardContent sx={{ width: "100%", overflowX: "auto" }}>
                <PropertyList divider={<Divider />} orientation="vertical">
                  <PropertyItem name="School Name" value={studentDetail?.schoolName || "—"} />
                  <PropertyItem name="Parent Name" value={studentDetail?.parentName || "—"} />
                                    <PropertyItem name="Parent Email" value={studentDetail?.parentEmail || "—"} />

                  <PropertyItem name="Van Type" value={studentDetail?.vehicleType || "—"} />
                                    <PropertyItem name="Route " value={studentDetail?.route || "—"} />

                  <PropertyItem name="Class/Grade" value={studentDetail?.grade || "—"} />
                </PropertyList>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {!detailLoading && !studentDetail && (
          <Typography color="text.secondary" variant="body2">
            Student detail not available for ID: {id}
          </Typography>
        )}
      </Stack>

      {/* Modal */}
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
            width: 600,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={2}>Assign Van</Typography>
          <FormControl fullWidth>
            <InputLabel id="van-select-label">Select Van</InputLabel>
          <Select
  labelId="van-select-label"
  value={selectedVan}
  label="Select Van"
  onChange={(e) => setSelectedVan(e.target.value)}
  MenuProps={{
    PaperProps: {
      style: { maxHeight: 300, width: 300 },
    },
  }}
>
  {vans.map((item) => (
    <MenuItem key={item.van.id} value={item.van.id}>
      {item.van.vehicleType} - {item.van.carNumber} {item.driver?.fullname ? `(Driver: ${item.driver.fullname})` : ""}
    </MenuItem>
  ))}
</Select>

          </FormControl>

          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAssign} disabled={!selectedVan}>Save</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
