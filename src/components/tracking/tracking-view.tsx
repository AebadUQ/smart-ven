'use client';

import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  Divider,
  Chip,
  AvatarGroup,
} from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HomeIcon from '@mui/icons-material/Home';
import { Map } from './map';
import { Sidebar } from './Sidebar';

interface TrackingViewProps {
  vehicles: any[];
}

const getStatusLabel = (status?: string) => {
  switch (status) {
    case 'start':
      return 'Trip Started';
    case 'ongoing':
      return 'On Way to School';
    case 'end':
      return 'Trip Completed';
    default:
      return 'Unknown';
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'start':
      return '#2D9CDB'; // blue
    case 'ongoing':
      return '#34C759'; // green
    case 'end':
      return '#9B9B9B'; // grey
    default:
      return '#9B9B9B';
  }
};

export function TrackingView({ vehicles }: TrackingViewProps) {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [currentVehicleId, setCurrentVehicleId] =
    React.useState<string | undefined>(
      vehicles[0] ? String(vehicles[0].id || vehicles[0]._id) : undefined
    );

  React.useEffect(() => {
    if (!currentVehicleId && vehicles[0]) {
      setCurrentVehicleId(String(vehicles[0].id || vehicles[0]._id));
    }
  }, [vehicles, currentVehicleId]);

  const currentVehicle =
    vehicles.find((v) => String(v.id || v._id) === currentVehicleId) ||
    vehicles[0];

  // 👇 yahan se status pick ho raha hai (API me status ya tripStatus dono handle)
  const rawStatus: string | undefined =
    currentVehicle?.status ?? currentVehicle?.tripStatus;

  const statusLabel = getStatusLabel(rawStatus);
  const statusColor = getStatusColor(rawStatus);

  // ─── Route points (visual markers) ─────────────
  const routePoints = [
    { id: 1, type: 'start', distance: 0 },
    { id: 2, type: 'route', distance: 10 },
    { id: 3, type: 'route', distance: 15 },
    { id: 4, type: 'route', distance: 40 },
    { id: 5, type: 'van', distance: 50 },
    { id: 6, type: 'route', distance: 70 },
    { id: 7, type: 'route', distance: 90 },
    { id: 8, type: 'end', distance: 100 },
  ];
  const totalDistance = routePoints[routePoints.length - 1].distance;

  // 🔥 progress status se drive hoga
  const progressRatio = React.useMemo(() => {
    switch (rawStatus) {
      case 'start':
        return 0.25; // 25% tak gaya
      case 'ongoing':
        return 0.6; // 60% tak
      case 'end':
        return 1; // full complete
      default:
        return 0; // unknown / not started
    }
  }, [rawStatus]);

  const completedWidth = `${progressRatio * 100}%`;
  const remainingWidth = `${(1 - progressRatio) * 100}%`;
  const vanLeftPercent = progressRatio * 100;

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Sidebar
        currentVehicleId={currentVehicleId}
        onClose={() => setOpenSidebar(false)}
        onVehicleDeselect={() => setCurrentVehicleId(undefined)}
        onVehicleSelect={(id) => setCurrentVehicleId(id)}
        open={openSidebar}
        vehicles={vehicles}
      />

      <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {currentVehicle && (
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h6">Driver Details</Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={currentVehicle.avatar} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography fontWeight="bold">
                    {currentVehicle.name || currentVehicle.driverName || 'Driver'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentVehicle.vehicleModel || currentVehicle.model}{' '}
                    ({currentVehicle.plate || currentVehicle.carNumber})
                  </Typography>
                </Box>
              </Stack>

              <Box textAlign="right">
                <Typography variant="body2">Status</Typography>
                <Chip
                  label={statusLabel}
                  size="small"
                  sx={{
                    backgroundColor: '#F6F7F9',
                    color: statusColor,
                    fontWeight: 'bold',
                    fontSize: 12,
                    '& .MuiChip-label': {
                      fontWeight: 'bold',
                      fontSize: 12,
                    },
                  }}
                />
              </Box>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box>
                <Typography variant="body2" fontWeight="bold" color="#191970">
                  Trip started on:
                </Typography>
                <Typography variant="body2">
                  {currentVehicle.startedAt
                    ? new Date(currentVehicle.startedAt).toLocaleString()
                    : currentVehicle.tripStart?.startTime
                    ? new Date(currentVehicle.tripStart.startTime).toLocaleString()
                    : 'N/A'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="#191970">
                  School Route:
                </Typography>
                <Typography variant="body2">
                  {currentVehicle.routeName || '105'}
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<PhoneIcon sx={{ color: 'white' }} />}
                sx={{
                  backgroundColor: '#1FA959',
                  color: 'white',
                  '&:hover': { backgroundColor: '#178a48' },
                  whiteSpace: 'nowrap',
                }}
              >
                Call Driver
              </Button>
            </Stack>
          </Box>
        )}

        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6">Trip Details</Typography>

          <Box sx={{ position: 'relative', width: '100%', height: 50 }}>
            {/* solid (completed part) */}
            {progressRatio > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: completedWidth,
                  height: 2,
                  bgcolor: 'green',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                }}
              />
            )}

            {/* dotted (remaining part) */}
            {progressRatio < 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: completedWidth,
                  width: `calc(${remainingWidth} - 15px)`,
                  borderTop: '2px dotted #8CC63E',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                }}
              />
            )}

            {/* points */}
            {routePoints.map((point) => {
              const leftPercent =
                point.type === 'van'
                  ? vanLeftPercent // van icon status se move karega
                  : (point.distance / totalDistance) * 100;

              if (point.type === 'start') {
                return (
                  <Box
                    key={point.id}
                    sx={{
                      position: 'absolute',
                      left: `${leftPercent}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 20,
                      height: 20,
                      bgcolor: 'green',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: 'white',
                        borderRadius: '50%',
                      }}
                    />
                  </Box>
                );
              }

              if (point.type === 'end') {
                return (
                  <Box
                    key={point.id}
                    sx={{
                      position: 'absolute',
                      left: `${leftPercent}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 20,
                      height: 20,
                      bgcolor: 'green',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <HomeIcon sx={{ color: 'white', fontSize: 14 }} />
                  </Box>
                );
              }

              if (point.type === 'route') {
                return (
                  <Box
                    key={point.id}
                    sx={{
                      position: 'absolute',
                      left: `${leftPercent}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 12,
                      height: 12,
                      bgcolor: 'green',
                      borderRadius: '50%',
                      zIndex: 2,
                    }}
                  />
                );
              }

              if (point.type === 'van') {
                return (
                  <Box
                    key={point.id}
                    sx={{
                      position: 'absolute',
                      left: `${leftPercent}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <AirportShuttleIcon
                      sx={{ color: '#343330', fontSize: 30 }}
                    />
                  </Box>
                );
              }

              return null;
            })}
          </Box>

          {/* optional – status text niche bhi show karna ho */}
          <Typography variant="body2" color="text.secondary">
            {statusLabel}
          </Typography>

          <Typography variant="h6">Student Details</Typography>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="body2" color="#008000">
                Students Picked
              </Typography>
              <AvatarGroup max={3}>
                {[1, 2].map((i) => (
                  <Avatar
                    key={i}
                    src={`/assets/avatar-${i}.png`}
                    sx={{ '--Avatar-size': '32px' } as any}
                  />
                ))}
              </AvatarGroup>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="body2" color="#008000">
                Students to be Picked
              </Typography>
              <AvatarGroup max={3}>
                {[3, 4, 5].map((i) => (
                  <Avatar
                    key={i}
                    src={`/assets/avatar-${i}.png`}
                    sx={{ '--Avatar-size': '32px' } as any}
                  />
                ))}
              </AvatarGroup>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, borderRadius: 2, overflow: 'hidden' }}>
          <Map
            currentVehicleId={currentVehicleId}
            onVehicleSelect={(id) => setCurrentVehicleId(id)}
            vehicles={vehicles}
          />
        </Box>
      </Box>
    </Box>
  );
}
