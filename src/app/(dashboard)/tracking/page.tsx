'use client';

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrips } from '@/store/reducers/trip-slice';
import { RootState, AppDispatch } from '@/store';
import { TrackingView } from '@/components/tracking';

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const [status, setStatus] = useState("");

  const tripState = useSelector((state: RootState) => state.trip);
  const trips = tripState?.trips ?? [];
  const loading = tripState?.loading ?? false;
console.log("trips",trips)
  useEffect(() => {
    dispatch(getAllTrips({ page: 1, limit: 10, status }));
  }, [dispatch, status]);

  const vehicles = useMemo(() => {
    return (trips || []).map((trip: any) => {
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
        avatar: trip?.driverImage ||'/assets/avatar-placeholder.png',
        vehicleModel: trip.carNumber || '',
        plate: trip.carNumber || '',
        status: trip.status || 'unknown',
        latitude: lastLocation?.lat || 0,
        longitude: lastLocation?.long || 0,
        tripStart: trip?.tripStart?.startTime ? new Date(trip?.tripStart?.startTime) : undefined,
        driverId: trip?.driverId,
        tripId: trip?._id,
        driverName: trip?.driverName,
        locations:trip?.locations || [],
        carName:trip?.carName || '',
        routeTitle:trip?.routeTitle || '',
        routeTripType:trip?.routeTripType || ''
      };
    });
  }, [trips]);

  return (
    <TrackingView
      vehicles={vehicles}
      status={status}
      onStatusChange={setStatus}
      loading={loading}
    />
  );
}
