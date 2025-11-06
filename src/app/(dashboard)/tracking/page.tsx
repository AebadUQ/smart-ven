'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { TrackingView } from '@/components/tracking';
import type { Vehicle } from '@/components/dashboard/logistics/types';
import { getAllTrips } from '@/store/reducers/trip-slice';
import { RootState, AppDispatch } from '@/store';



export default function Page(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { trips, loading } = useSelector((state: RootState) => state.trip);

  useEffect(() => {
    dispatch(getAllTrips({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Transform trips to match Vehicle type for TrackingView
  const vehicles: Vehicle[] = trips.map((trip) => ({
    id: trip._id,
    name: trip.driverName,
    avatar: '/assets/avatar-placeholder.png', // Replace with real avatar if available
    vehicleModel: trip.carNumber,
    plate: trip.carNumber,
    location: 'Unknown', // Could integrate geolocation if available
    latitude: trip.kids[0]?.lat || 0,
    longitude: trip.kids[0]?.long || 0,
    temperature: 0, // Default, replace if you have temperature data
    startedAt: trip.tripStart?.startTime ? new Date(trip.tripStart.startTime) : undefined,
    departedAt: undefined, // Could be extended if departure time exists
    arrivedAt: undefined, // Could be extended if arrival time exists
  }));

  return <TrackingView vehicles={vehicles} />;
}

// import * as React from 'react';
// import type { Metadata } from 'next';

// import { config } from '@/config';
// import { dayjs } from '@/lib/dayjs';
// import { FleetView } from '@/components/dashboard/logistics/fleet-view';
// import type { Vehicle } from '@/components/dashboard/logistics/types';
// import { TrackingView } from '@/components/tracking';

// export const metadata = { title: `Fleet | Logistics | Dashboard | ${config.site.name}` } satisfies Metadata;
// const vehicles = [
//   {
//     id: 'VEH-004',
//     name: 'Aebad ul Qadir',
//     avatar: '/assets/avatar-1.png',
//     vehicleModel: 'Suzuki Bolan',
//     plate: 'BXL-637',
//     location: 'Brooklyn, New York, United States',
//     latitude: 40.683717,
//     longitude: -73.938242,
//     temperature: 6,
//     startedAt: dayjs().subtract(2, 'hour').subtract(21, 'minute').toDate(),
//     departedAt: dayjs().subtract(34, 'minute').toDate(),
//     arrivedAt: dayjs().subtract(9, 'minute').toDate(),
//   },
//   {
//     id: 'VEH-003',
//     name: 'Sarah Malik',
//     avatar: '/assets/avatar-2.png',
//     vehicleModel: 'Toyota Corolla',
//     plate: 'XYZ-123',
//     location: 'Brooklyn, New York, United States',
//     latitude: 40.698211,
//     longitude: -73.92369,
//     temperature: 8,
//     startedAt: dayjs().subtract(3, 'hour').subtract(10, 'minute').toDate(),
//     departedAt: dayjs().subtract(2, 'hour').subtract(56, 'minute').toDate(),
//     arrivedAt: dayjs().subtract(1, 'hour').subtract(10, 'minute').toDate(),
//   },
//   {
//     id: 'VEH-002',
//     name: 'Bilal Ahmed',
//     avatar: '/assets/avatar-3.png',
//     vehicleModel: 'Honda City',
//     plate: 'ABC-456',
//     location: 'Brooklyn, New York, United States',
//     latitude: 40.657431,
//     longitude: -73.960399,
//     temperature: 6,
//     startedAt: dayjs().subtract(4, 'hour').subtract(34, 'minute').toDate(),
//     departedAt: undefined,
//     arrivedAt: undefined,
//   },
//   {
//     id: 'VEH-001',
//     name: 'Amina Khan',
//     avatar: '/assets/avatar-4.png',
//     vehicleModel: 'Toyota Hiace',
//     plate: 'DEF-789',
//     location: 'Brooklyn, New York, United States',
//     latitude: 40.675966,
//     longitude: -73.876617,
//     temperature: 8,
//     startedAt: dayjs().subtract(5, 'hour').subtract(9, 'minute').toDate(),
//     departedAt: dayjs().subtract(2, 'hour').subtract(12, 'minute').toDate(),
//     arrivedAt: dayjs().subtract(1, 'hour').subtract(21, 'minute').toDate(),
//   }
// ] satisfies Vehicle[];

// export default function Page(): React.JSX.Element {
//   return <TrackingView vehicles={vehicles} />;
// }
