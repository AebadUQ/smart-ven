"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterLink from "next/link";
import { useParams } from "next/navigation";
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
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { paths } from "@/paths";
import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";
import { RootState, AppDispatch } from "@/store";
import { getAlertById } from "@/store/reducers/alert-slice";
import { formatLabel } from "@/utils/data";

export default function AlertDetailPage(): React.JSX.Element {
  const params = useParams<{ alertId: string }>(); // <- updated
  const alertId = params?.alertId; // <- updated
  const dispatch = useDispatch<AppDispatch>();
  const { alertDetail, detailLoading } = useSelector((s: RootState) => s.alert);

  // Fetch alert detail
  React.useEffect(() => {
    if (alertId) {
      dispatch(getAlertById(alertId));
    }
  }, [dispatch, alertId]);

  const statusLabel = (alertDetail?.status || "").trim().toLowerCase();
  const isSent = statusLabel === "sent";
  const statusChip = statusLabel ? (
    <Chip
      icon={isSent ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> : undefined}
      label={statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)}
      size="small"
      variant="outlined"
      color={isSent ? "success" : "default"}
    />
  ) : (
    <Chip label="Pending" size="small" variant="outlined" />
  );

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      {detailLoading && <LinearProgress sx={{ mb: 2 }} />}

      <Stack spacing={4}>
        {/* Back Link */}
        <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.alert} // your alerts list path
          sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
          variant="subtitle2"
        >
          <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
          Alerts
        </Link>

        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardHeader title="Alert Details" />
              <CardContent sx={{ width: "100%", overflowX: "auto" }}>
                <PropertyList divider={<Divider />} orientation="vertical">
                  <PropertyItem
                    name="Alert ID"
                    value={<Chip label={alertDetail?._id || "—"} size="small" variant="soft" />}
                  />
                  <PropertyItem name="Alert Type" value={alertDetail?.alertType || "—"} />
                  <PropertyItem name="Message" value={alertDetail?.message || "—"} />
                  <PropertyItem name="Recipient Type" value={formatLabel(alertDetail?.recipientType) || "—"} />
                  <PropertyItem name="School ID" value={alertDetail?.schoolId || "—"} />
                  <PropertyItem name="Status" value={statusChip} />
                  <PropertyItem
                    name="Date"
                    value={alertDetail?.date ? new Date(alertDetail.date).toLocaleString() : "—"}
                  />
                </PropertyList>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {!detailLoading && !alertDetail && (
          <Typography color="text.secondary" variant="body2">
            Alert detail not available for ID: {alertId}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
