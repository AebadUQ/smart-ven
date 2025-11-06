"use client";

import * as React from "react";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Stats, TicketsComplain, Alert, MapTracking, TripCard } from "@/components/overview";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/store/reducers/dashboard-slice";
import { getAllTrips } from "@/store/reducers/trip-slice"; // ✅ import trip thunk
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  // dashboard state
  const { stats, loading: statsLoading } = useSelector((state: RootState) => state.dashboard);

  // trip state
  const { trips, loading: tripLoading } = useSelector((state: RootState) => state.trip);

  const [filterType, setFilterType] = useState<"yearly" | "monthly">("yearly");
  const [status, setStatus] = useState<"start" | "ongoing" | "end">("");

  // ─── Load Dashboard Stats ───────────────
  useEffect(() => {
    dispatch(getDashboardStats({ filterType }));
  }, [dispatch, filterType]);

  // ─── Load Trips ───────────────
  useEffect(() => {
    dispatch(getAllTrips({ page: 1, limit: 10, status })); // ✅ passing status
  }, [dispatch, status]);

  const handleFilterChange = (type: "yearly" | "monthly") => {
    setFilterType(type);
  };

  const handleStatusChange = (newStatus: "start" | "ongoing" | "end") => {
    setStatus(newStatus);
  };

  return (
    <Box sx={{ p: "var(--Content-padding)", width: "var(--Content-width)" }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={{ lg: 8, xs: 12 }}>
            <Stats
              data={stats}
              filterType={filterType}
              onFilterChange={handleFilterChange}
              loading={statsLoading}
            />
          </Grid>

          <Grid size={{ lg: 4, xs: 12 }}>
            {/* ✅ pass trip data + status control */}
            <TripCard
              trips={trips}
              status={status}
              onStatusChange={handleStatusChange}
              loading={tripLoading}
            />
          </Grid>

          <Grid size={{ lg: 8, xs: 12 }}>
            <MapTracking />
          </Grid>

          <Grid size={{ lg: 4, xs: 12 }}>
            <Alert />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
