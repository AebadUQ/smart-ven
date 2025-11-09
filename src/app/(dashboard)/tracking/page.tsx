'use client';

import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrips } from '@/store/reducers/trip-slice';
import { RootState, AppDispatch } from '@/store';
import { TrackingView } from '@/components/tracking';

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { trips, loading } = useSelector((state: RootState) => state.trip);

  useEffect(() => {
    dispatch(getAllTrips({ page: 1, limit: 10 }));
  }, [dispatch]);

  const vehicles: any[] = useMemo(
    () =>
      (trips || []).map((trip: any) => {
        // latest van point: locations[last] -> tripEnd -> tripStart
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
          avatar: '/assets/avatar-placeholder.png',
          vehicleModel: trip.carNumber || '',
          plate: trip.carNumber || '',
          status: trip.status || 'unknown',
          latitude: lastLocation?.lat || 0,
          longitude: lastLocation?.long || 0,
          startedAt: trip.tripStart?.startTime
            ? new Date(trip.tripStart.startTime)
            : undefined,
        };
      }),
    [trips]
  );

  if (loading) {
    return <div>Loading trips...</div>;
  }

  return <TrackingView vehicles={vehicles} />;
}
