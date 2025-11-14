"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";

import { Stats, Alert, TripCard } from "@/components/overview";

import { getDashboardStats } from "@/store/reducers/dashboard-slice";
import { getAllTrips } from "@/store/reducers/trip-slice";
import { RootState, AppDispatch } from "@/store";
import type { TripAPI } from "@/components/overview/TripCard"; // ⬅️ same type reuse
import { Map } from "@/components/tracking";
export default function Page(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  // dashboard state
  const { stats, loading: statsLoading } = useSelector(
    (state: RootState) => state.dashboard
  );

  // trips state
  const { trips, loading: tripLoading } = useSelector(
    (state: RootState) => state.trip
  );

  const [filterType, setFilterType] = useState<"yearly" | "monthly">("yearly");
  const [status, setStatus] = useState<"" | "start" | "ongoing" | "end">("");

  // 🔹 selectedTrip state
  const [selectedTrip, setSelectedTrip] = useState<TripAPI | null>(null);

  // ─── Load Dashboard Stats ───────────────
  useEffect(() => {
    dispatch(getDashboardStats({ filterType }));
  }, [dispatch, filterType]);

  // ─── Load Trips ───────────────
  useEffect(() => {
    dispatch(getAllTrips({ page: 1, limit: 10, status }));
  }, [dispatch, status]);

  // 🔹 jab trips load ho jayein, aur selectedTrip null ho, to first trip select
  useEffect(() => {
    if (!tripLoading && trips && trips.length > 0 && !selectedTrip) {
      setSelectedTrip(trips[0] as TripAPI);
    }
  }, [trips, tripLoading, selectedTrip]);

  const handleFilterChange = (type: "yearly" | "monthly") => {
    setFilterType(type);
  };

  const handleStatusChange = (newStatus: "" | "start" | "ongoing" | "end") => {
    setStatus(newStatus);
    setSelectedTrip(null); // optional: status change pe reset
  };

  // TripCard se trip select hua
  const handleSelectTrip = (trip: TripAPI) => {
    setSelectedTrip(trip);
  };

  // Map se marker click pe id aayegi
  const handleVehicleSelectFromMap = (id: string) => {
    const found = (trips || []).find(
      (t: any) => String(t._id ?? t.id) === String(id)
    );
    if (found) {
      setSelectedTrip(found as TripAPI);
    }
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
            <Alert />
          </Grid>

          {/* ─── Map Section ─────────────── */}
          <Grid size={{ lg: 8, xs: 12 }}>
            <Box sx={{ height: 600 }}>
              <Map
                vehicles={trips || []}
                currentVehicleId={selectedTrip?._id}
                onVehicleSelect={handleVehicleSelectFromMap}
              />
            </Box>
          </Grid>

          {/* ─── TripCard Section ─────────────── */}
          <Grid size={{ lg: 4, xs: 12 }}>
            <TripCard
              trips={trips || []}
              status={status}
              onStatusChange={handleStatusChange}
              loading={tripLoading}
              selectedTrip={selectedTrip}
              onSelectTrip={handleSelectTrip}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
