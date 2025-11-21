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
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


// 🔹 Safe standalone DetailItem
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

// 🔹 MAIN COMPONENT
export default function SchoolDetails() {
  const school = useSelector((state: RootState) => state.auth.userProfile);

  if (!school) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar src={school?.schoolImage} sx={{ width: 60, height: 60 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {school.schoolName}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {school.branchName}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* School Info */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          School Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="School Name" value={school.schoolName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Email" value={school.schoolEmail} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Branch" value={school.branchName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Contact Number" value={school.contactNumber} />
          </Grid>

          <Grid item xs={12}>
            <DetailItem label="Address" value={school.address} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Subscription */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Subscription Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Current Plan" value={school.currentPlan} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Billing Cycle" value={school.billingCycle} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Auto Renew"
              value={school.autoRenew ? "Enabled" : "Disabled"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Payment Method" value={school.paymentMethod} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Limits */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Usage Limits
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <DetailItem label="Allowed Routes" value={school.allowedRoutes} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <DetailItem label="Allowed Students" value={school.allowedStudents} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <DetailItem label="Allowed Vans" value={school.allowedVans} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Location */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Location
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Latitude" value={school.lat} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Longitude" value={school.long} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
