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
import { TripAPI } from "@/components/overview/TripCard"; // Same type reuse
import { Map } from "@/components/tracking"; // Directly use Map here

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  // Dashboard state
  const { stats, loading: statsLoading } = useSelector(
    (state: RootState) => state.dashboard
  );

  // Trips state
  const { trips, loading: tripLoading } = useSelector(
    (state: RootState) => state.trip
  );

  const [filterType, setFilterType] = useState<"yearly" | "monthly">("yearly");
  const [status, setStatus] = useState<"" | "start" | "ongoing" | "end">("");

  // Selected Trip state
  const [selectedTrip, setSelectedTrip] = useState<TripAPI | null>(null);

  // Load Dashboard Stats
  useEffect(() => {
    dispatch(getDashboardStats({ filterType }));
  }, [dispatch, filterType]);

  // Load Trips
  useEffect(() => {
    dispatch(getAllTrips({ page: 1, limit: 10, status }));
  }, [dispatch, status]);

  // Set the first trip if no trip is selected
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
    setSelectedTrip(null); // Reset selected trip on status change
  };

  // TripCard selection
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

  // Prepare the vehicle data and locations
  const vehicles = trips.map((trip: any) => {
    const lastLocation = trip.locations?.length
      ? trip.locations[trip.locations.length - 1]
      : trip.tripEnd
      ? { lat: trip.tripEnd.lat, long: trip.tripEnd.long }
      : trip.tripStart
      ? { lat: trip.tripStart.lat, long: trip.tripStart.long }
      : null;

    return {
      id: String(trip._id),
      name: trip.driverName || 'Unknown Driver',
      avatar: trip?.driverImage || '/assets/avatar-placeholder.png',
      vehicleModel: trip.carNumber || '',
      plate: trip.carNumber || '',
      status: trip.status || 'unknown',
      latitude: lastLocation?.lat || 0,
      longitude: lastLocation?.long || 0,
      tripStart: trip?.tripStart?.startTime ? new Date(trip?.tripStart?.startTime) : undefined,
      driverId: trip?.driverId,
      tripId: trip?._id,
      driverName: trip?.driverName,
      locations: trip?.locations || [],
      carName: trip?.carName || '',
      routeTitle: trip?.routeTitle || '',
      routeTripType: trip?.routeTripType || ''
    };
  });

  return (
    <Box sx={{ p: "var(--Content-padding)", width: "var(--Content-width)" }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          {/* Stats Section */}
          <Grid size={{ lg: 8, xs: 12 }}>
            <Stats
              data={stats}
              filterType={filterType}
              onFilterChange={handleFilterChange}
              loading={statsLoading}
            />
          </Grid>

          {/* Alert Section */}
          <Grid size={{ lg: 4, xs: 12 }}>
            <Alert />
          </Grid>

          {/* ─── Map Section ─────────────── */}
          <Grid size={{ lg: 8, xs: 12 }}>
            <Box sx={{ height: 600 }}>
              {/* Pass the vehicles and selected trip data directly to the Map */}
              {selectedTrip && (
                <Map
                  vehicles={vehicles}
                  currentVehicleId={selectedTrip?._id}
                  onVehicleSelect={handleVehicleSelectFromMap}
                  selectedLocations={selectedTrip.locations || []} // Pass selected trip's locations
                />
              )}
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
