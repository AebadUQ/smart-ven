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
  Link,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useParams } from "next/navigation";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { House as HouseIcon } from "@phosphor-icons/react/dist/ssr/House";

import { getRouteById } from "@/store/reducers/route-slice";
import { paths } from "@/paths";

// 🔹 Reusable DetailItem
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

export default function PlannerDetailPage(): React.JSX.Element {
  const params = useParams<{ plannerId: string }>();
  const plannerId = params?.plannerId;

  const dispatch = useDispatch<AppDispatch>();
  const { routeDetails, loading } = useSelector((s: RootState) => s.route);

  React.useEffect(() => {
    if (plannerId) dispatch(getRouteById(plannerId));
  }, [plannerId, dispatch]);

  const tripDays =
    routeDetails?.tripDays &&
    Object.entries(routeDetails.tripDays)
      .filter(([key, value]) => value && key !== "_id")
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
      .join(", ");

  if (loading) return <LinearProgress sx={{ mb: 2 }} />;

  if (!routeDetails)
    return (
      <Typography sx={{ p: 4 }}>
        No route details found for ID: {plannerId}
      </Typography>
    );

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {/* Back Button */}
        <Link
          href={paths.dashboard.planner}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <ArrowLeftIcon />
          <Typography variant="subtitle2" color="text.primary">
            Back to Route Planner
          </Typography>
        </Link>

        <Divider sx={{ my: 2 }} />

        {/* HEADER */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar sx={{ width: 60, height: 60 }}>
            <HouseIcon />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {routeDetails.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Trip Type: {routeDetails.tripType}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* SECTION 1: Trip Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Trip Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Route ID" value={routeDetails._id} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Title" value={routeDetails.title} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Trip Type" value={routeDetails.tripType} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Start Time" value={routeDetails.startTime} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <DetailItem label="Trip Days" value={tripDays || "—"} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 2: Vehicle Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Vehicle Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Van ID" value={routeDetails.vanId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Car Number" value={routeDetails.carNumber} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 3: Driver Information */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Driver Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem label="Driver Name" value={routeDetails.driverName} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 4: Route Points */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Route Points
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Start Point"
              value={
                routeDetails.startPoint
                  ? `${routeDetails.startPoint.lat}, ${routeDetails.startPoint.long}`
                  : "—"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="End Point"
              value={
                routeDetails.endPoint
                  ? `${routeDetails.endPoint.lat}, ${routeDetails.endPoint.long}`
                  : "—"
              }
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 5: Timestamps */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          System Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Created At"
              value={
                routeDetails.createdAt
                  ? new Date(routeDetails.createdAt).toLocaleString()
                  : "—"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DetailItem
              label="Updated At"
              value={
                routeDetails.updatedAt
                  ? new Date(routeDetails.updatedAt).toLocaleString()
                  : "—"
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
