"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterLink from "next/link";
import { useParams } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";

import { paths } from "@/paths";
import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";
import { RootState, AppDispatch } from "@/store";
import { getRouteById } from "@/store/reducers/route-slice";
import { formatLabel } from "@/utils/data";

export default function PlannerDetailPage(): React.JSX.Element {
  const params = useParams<{ plannerId: string }>();
  const plannerId = params?.plannerId;
  const dispatch = useDispatch<AppDispatch>();
  const { routeDetails, loading } = useSelector((s: RootState) => s.route);

  React.useEffect(() => {
    if (plannerId) {
      dispatch(getRouteById(plannerId));
    }
  }, [dispatch, plannerId]);

  const tripDays =
    routeDetails?.tripDays &&
    Object.entries(routeDetails.tripDays)
      .filter(([key, value]) => value && key !== "_id")
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
      .join(", ");

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <Stack spacing={4}>
        {/* 🔙 Back Link */}
        <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.planner}
          sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
          variant="subtitle2"
        >
          <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
          Route Planner
        </Link>

        {/* ✅ Route Details Card */}
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardHeader title="Route Details" />
              <CardContent sx={{ width: "100%", overflowX: "auto" }}>
                <PropertyList divider={<Divider />} orientation="vertical">
                  <PropertyItem name="Route ID" value={routeDetails?._id || "—"} />
                  <PropertyItem name="Title" value={routeDetails?.title || "—"} />
                  <PropertyItem
                    name="Trip Type"
                    value={formatLabel(routeDetails?.tripType) || "—"}
                  />
                  <PropertyItem
                    name="Start Time"
                    value={routeDetails?.startTime || "—"}
                  />
                  <PropertyItem
                    name="Trip Days"
                    value={tripDays || "—"}
                  />
                  <PropertyItem
                    name="Van ID"
                    value={routeDetails?.vanId || "—"}
                  />
                  <PropertyItem
                    name="Car Number"
                    value={routeDetails?.carNumber || "—"}
                  />
                  <PropertyItem
                    name="Driver Name"
                    value={routeDetails?.driverName || "—"}
                  />
                  <PropertyItem
                    name="Start Point"
                    value={
                      routeDetails?.startPoint
                        ? `${routeDetails.startPoint.lat}, ${routeDetails.startPoint.long}`
                        : "—"
                    }
                  />
                  <PropertyItem
                    name="End Point"
                    value={
                      routeDetails?.endPoint
                        ? `${routeDetails.endPoint.lat}, ${routeDetails.endPoint.long}`
                        : "—"
                    }
                  />
                  <PropertyItem
                    name="Created At"
                    value={
                      routeDetails?.createdAt
                        ? new Date(routeDetails.createdAt).toLocaleString()
                        : "—"
                    }
                  />
                  <PropertyItem
                    name="Updated At"
                    value={
                      routeDetails?.updatedAt
                        ? new Date(routeDetails.updatedAt).toLocaleString()
                        : "—"
                    }
                  />
                </PropertyList>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {!routeDetails && (
          <Typography color="text.secondary" variant="body2">
            Route details not available for ID: {plannerId}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
