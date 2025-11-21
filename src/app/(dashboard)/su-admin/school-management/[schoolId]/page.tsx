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
  Chip,
  CircularProgress,
} from "@mui/material";

import Link from "next/link";
import { ArrowLeftIcon } from "@mui/x-date-pickers/icons";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getSchoolById } from "@/store/reducers/suadmin-slice";

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

export default function SchoolDetailsPage() {
  const params = useParams();
  const schoolId = String(params?.schoolId);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { school, loading, error } = useSelector((s: RootState) => s.suadmin);

  React.useEffect(() => {
    if (schoolId) dispatch(getSchoolById(schoolId));
  }, [dispatch, schoolId]);

  if (loading && !school)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box p={3}>
        <Typography color="error">{String(error)}</Typography>
      </Box>
    );

  if (!school) return <Typography>Loading...</Typography>;

  const initials =
    school?.schoolName
      ?.split(" ")
      .map((x) => x[0]?.toUpperCase())
      .join("") || "SC";

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {/* HEADER */}
        <Link
          href="/su-admin/school-management"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <ArrowLeftIcon />
          <Typography variant="subtitle2" color="text.primary">
            Back to Schools
          </Typography>
        </Link>

        <Divider sx={{ my: 2 }} />

        {/* Top Profile */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar
            src={school.logo || undefined}
            sx={{
              width: 60,
              height: 60,
              bgcolor: !school.logo ? "#1976d2" : "transparent",
              color: "#fff",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {!school.logo ? initials : null}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {school.schoolName}
            </Typography>
            <Chip
              label={school.status?.toUpperCase()}
              size="small"
              color={school.status === "active" ? "success" : "default"}
            />
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* =========================
             SCHOOL INFORMATION
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          School Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="School Name" value={school.schoolName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="School ID" value={school._id} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Email" value={school.schoolEmail} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Contact Number" value={school.contactNumber} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <DetailItem label="Address" value={school.address} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
             ADMIN INFORMATION
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Admin Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Admin Name" value={school.admin?.name} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Admin Email" value={school.admin?.email} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
             ROUTE & GEO LOCATION
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Route & Geo Location
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Latitude" value={school.lat} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Longitude" value={school.long} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
             TIMINGS & LIMITS
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          School Timing & Limits
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Start Time" value={school.startTime} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="End Time" value={school.endTime} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Max Trip Duration"
              value={school.maxTripDuration + " mins"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Buffer Time"
              value={school.bufferTime + " mins"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Allowed Vans" value={school.allowedVans} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Allowed Students" value={school.allowedStudents} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
             BILLING & PLAN
        ========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Plan & Billing
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Current Plan" value={school.currentPlan} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Billing Cycle" value={school.billingCycle} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Payment Method" value={school.paymentMethod} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Auto Renew"
              value={school.autoRenew ? "Enabled" : "Disabled"}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* =========================
             FOOTER ACTIONS
        ========================== */}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              router.push(`/su-admin/school-management/edit/${schoolId}`)
            }
          >
            Edit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
