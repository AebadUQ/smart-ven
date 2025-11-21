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
  LinearProgress,
  Chip,
  Link,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useParams } from "next/navigation";

import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";

import { paths } from "@/paths";
import { getAlertById } from "@/store/reducers/alert-slice";
import { formatLabel } from "@/utils/data";

// 🔹 Reusable Detail Item
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

export default function AlertDetailPage(): React.JSX.Element {
  const params = useParams<{ alertId: string }>();
  const alertId = params?.alertId;

  const dispatch = useDispatch<AppDispatch>();
  const { alertDetail, detailLoading } = useSelector((s: RootState) => s.alert);

  React.useEffect(() => {
    if (alertId) dispatch(getAlertById(alertId));
  }, [alertId, dispatch]);

  const statusLabel = (alertDetail?.status || "").trim().toLowerCase();
  const isSent = statusLabel === "sent";

  const statusChip = (
    <Chip
      label={
        statusLabel
          ? statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)
          : "Pending"
      }
      size="small"
      variant="outlined"
      color={isSent ? "success" : "default"}
    />
  );

  if (detailLoading)
    return <LinearProgress sx={{ p: 4 }} />;

  if (!alertDetail)
    return (
      <Typography sx={{ p: 4 }}>
        No alert details found for ID: {alertId}
      </Typography>
    );

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {/* Back Button */}
        <Link
          href={paths.dashboard.alert}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <ArrowLeftIcon />
          <Typography variant="subtitle2" color="text.primary">
            Back to Alerts
          </Typography>
        </Link>

        <Divider sx={{ my: 2 }} />

        {/* HEADER */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar sx={{ width: 60, height: 60 }}>
            <UserIcon />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {alertDetail.alertType}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
              Alert ID: {alertDetail._id}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* ==========================
            ALERT INFORMATION
        =========================== */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Alert Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Alert ID" value={alertDetail._id} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Alert Type" value={alertDetail.alertType} />
          </Grid>

          <Grid item xs={12}>
            <DetailItem label="Message" value={alertDetail.message} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Recipient Type"
              value={formatLabel(alertDetail.recipientType)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="School ID" value={alertDetail.schoolId} />
          </Grid>

          {/* 🔥 Added School Name Here */}
          <Grid item xs={12} sm={6}>
            <DetailItem label="School Name" value={alertDetail.schoolName} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem label="Status" value={statusChip} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Date"
              value={
                alertDetail.date
                  ? new Date(alertDetail.date).toLocaleString()
                  : "—"
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
