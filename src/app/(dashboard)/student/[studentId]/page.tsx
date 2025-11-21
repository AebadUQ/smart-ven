"use client";

import React from "react";
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
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useParams } from "next/navigation";
import { getStudentDetail } from "@/store/reducers/student-slice";
import { assignVanToStudent, getAllSchoolVans } from "@/store/reducers/van-slice";

import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { ArrowLeftIcon } from "@mui/x-date-pickers/icons";
import Link from "next/link";

// -------------------------
// Reusable Detail Item
// -------------------------
function DetailItem({ label, value }: { label: any; value: any }) {
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

export default function StudentDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.studentId;

  const dispatch = useDispatch<AppDispatch>();
  const { studentDetail, detailLoading } = useSelector((s: RootState) => s.student);
  const { vans } = useSelector((s: RootState) => s.van);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedVan, setSelectedVan] = React.useState("");

  React.useEffect(() => {
    if (id) dispatch(getStudentDetail(id));
  }, [id, dispatch]);

  React.useEffect(() => {
    dispatch(getAllSchoolVans({ page: 1, limit: 1000 }));
  }, [dispatch]);

  const handleAssign = async () => {
    if (!selectedVan || !id) return;

    try {
      await dispatch(assignVanToStudent({ kidId: id, vanId: selectedVan })).unwrap();
      setModalOpen(false);
      dispatch(getStudentDetail(id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!studentDetail) {
    return <Typography>Loading...</Typography>;
  }

  // Inline initials
  const initials = studentDetail.fullname
    ?.split(" ")
    ?.map((w) => w[0]?.toUpperCase())
    ?.join("");

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {/* =========================
            HEADER
        ========================== */}
        <Link
  href="/students"
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  }}
>
  <ArrowLeftIcon />
  <Typography variant="subtitle2" color="text.primary">
    Back to Students
  </Typography>
</Link>

<Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar
            src={studentDetail.image || undefined}
            sx={{
              width: 60,
              height: 60,
              bgcolor: !studentDetail.image ? "#1976d2" : "transparent",
              color: "#fff",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {!studentDetail.image ? initials : null}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {studentDetail.fullname}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {studentDetail.parentName}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* =========================
            STUDENT INFO
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Student Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Student ID" value={studentDetail.id} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Full Name" value={studentDetail.fullname} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Age" value={studentDetail.age} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Grade" value={studentDetail.grade} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Gender" value={studentDetail.gender} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Date of Birth" value={studentDetail.dob?.slice(0, 10)} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Status" value={studentDetail.status} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
            PARENT INFO
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Parent Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Parent Name" value={studentDetail.parentName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Parent Email" value={studentDetail.parentEmail} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
            SCHOOL & ROUTE
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          School & Route Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="School Name" value={studentDetail.schoolName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Route" value={studentDetail.route} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Van Type" value={studentDetail.vehicleType} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Car Number" value={studentDetail.carNumber} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
            ASSIGNED VAN
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Assigned Van
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Van ID" value={studentDetail.VanId} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => setModalOpen(true)}
            >
              Assign / Change Van
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
            LOCATION
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Location
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Latitude" value={studentDetail.lat} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Longitude" value={studentDetail.long} />
          </Grid>
        </Grid>
      </CardContent>

      {/* ============================
          ASSIGN VAN MODAL
      ============================ */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            width: 500,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Assign Van
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Select Van</InputLabel>

            <Select
              value={selectedVan}
              label="Select Van"
              onChange={(e) => setSelectedVan(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 250,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {vans.map((item) => (
                <MenuItem key={item.van.id} value={item.van.id}>
                  {item.van.vehicleType} — {item.van.carNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>

            <Button variant="contained" disabled={!selectedVan} onClick={handleAssign}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
}
