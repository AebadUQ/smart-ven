'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BagSimple as BagSimpleIcon } from '@phosphor-icons/react/dist/ssr/BagSimple';
import { paths } from '@/paths';

export interface Kid {
  kidId: string;
  time: string;
  lat: number;
  long: number;
  status: string;
}

export interface TripAPI {
  _id: string;
  driverName: string;
  carNumber: string;
  status: 'start' | 'ongoing' | 'end';
  kids: Kid[];
  tripStart: { startTime: string };
  createdAt: string;
  updatedAt: string;
}

export interface TripCardProps {
  trips: TripAPI[];
  loading?: boolean;
  trackingPath?: string; // optional path for "View All"
}

export function TripCard({ trips = [], loading = false, trackingPath = paths.dashboard.tracking }: TripCardProps): React.JSX.Element {
  const router = useRouter();
  const displayedTrips = trips.slice(0, 4);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#2D9CDB' }}>
            <BagSimpleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title={<Typography variant="h6" sx={{ fontWeight: 600 }}>Trips</Typography>}
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => router.push(trackingPath)}
          >
            View All
          </Button>
        }
      />
      <Divider />

      <Box sx={{ height: 440, overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: 0 } }}>
        {loading ? (
          <Typography sx={{ p: 2 }}>Loading...</Typography>
        ) : displayedTrips.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>No trips available</Typography>
        ) : (
          displayedTrips.map((trip) => (
            <Box key={trip._id} sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                {/* Avatar */}
                <Avatar sx={{ width: 48, height: 48 }}>{trip.driverName[0]}</Avatar>

                {/* Trip Info */}
                <Box flex={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={600}>{trip.driverName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(trip.createdAt).toLocaleString()}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5} mt={1}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="caption" color="text.secondary">Car:</Typography>
                      <Typography variant="caption" fontWeight={400} color="text.primary">{trip.carNumber}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography variant="caption" color="text.secondary">Kids Count:</Typography>
                      <Typography variant="caption" fontWeight={400} color="text.primary">{trip.kids.length}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography variant="caption" color="text.secondary">Status:</Typography>
                      <Typography variant="caption" fontWeight={400} color="text.primary">{trip.status}</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
}
