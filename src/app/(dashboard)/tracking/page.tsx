import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { FleetView } from '@/components/dashboard/logistics/fleet-view';
import type { Vehicle } from '@/components/dashboard/logistics/types';
import { TrackingView } from '@/components/tracking';

export const metadata = { title: `Fleet | Logistics | Dashboard | ${config.site.name}` } satisfies Metadata;
const vehicles = [
  {
    id: 'VEH-004',
    name: 'Aebad ul Qadir',
    avatar: '/assets/avatar-1.png',
    vehicleModel: 'Suzuki Bolan',
    plate: 'BXL-637',
    location: 'Brooklyn, New York, United States',
    latitude: 40.683717,
    longitude: -73.938242,
    temperature: 6,
    startedAt: dayjs().subtract(2, 'hour').subtract(21, 'minute').toDate(),
    departedAt: dayjs().subtract(34, 'minute').toDate(),
    arrivedAt: dayjs().subtract(9, 'minute').toDate(),
  },
  {
    id: 'VEH-003',
    name: 'Sarah Malik',
    avatar: '/assets/avatar-2.png',
    vehicleModel: 'Toyota Corolla',
    plate: 'XYZ-123',
    location: 'Brooklyn, New York, United States',
    latitude: 40.698211,
    longitude: -73.92369,
    temperature: 8,
    startedAt: dayjs().subtract(3, 'hour').subtract(10, 'minute').toDate(),
    departedAt: dayjs().subtract(2, 'hour').subtract(56, 'minute').toDate(),
    arrivedAt: dayjs().subtract(1, 'hour').subtract(10, 'minute').toDate(),
  },
  {
    id: 'VEH-002',
    name: 'Bilal Ahmed',
    avatar: '/assets/avatar-3.png',
    vehicleModel: 'Honda City',
    plate: 'ABC-456',
    location: 'Brooklyn, New York, United States',
    latitude: 40.657431,
    longitude: -73.960399,
    temperature: 6,
    startedAt: dayjs().subtract(4, 'hour').subtract(34, 'minute').toDate(),
    departedAt: undefined,
    arrivedAt: undefined,
  },
  {
    id: 'VEH-001',
    name: 'Amina Khan',
    avatar: '/assets/avatar-4.png',
    vehicleModel: 'Toyota Hiace',
    plate: 'DEF-789',
    location: 'Brooklyn, New York, United States',
    latitude: 40.675966,
    longitude: -73.876617,
    temperature: 8,
    startedAt: dayjs().subtract(5, 'hour').subtract(9, 'minute').toDate(),
    departedAt: dayjs().subtract(2, 'hour').subtract(12, 'minute').toDate(),
    arrivedAt: dayjs().subtract(1, 'hour').subtract(21, 'minute').toDate(),
  }
] satisfies Vehicle[];

export default function Page(): React.JSX.Element {
  return <TrackingView vehicles={vehicles} />;
}
