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

export function TrackingView({ vehicles }: TrackingViewProps) {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [currentVehicleId, setCurrentVehicleId] =
    React.useState<string | undefined>(vehicles[0]?.id);

  React.useEffect(() => {
    if (!currentVehicleId && vehicles[0]) {
      setCurrentVehicleId(vehicles[0].id);
    }
  }, [vehicles, currentVehicleId]);

  const currentVehicle =
    vehicles.find((v) => v.id === currentVehicleId) || vehicles[0];

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
  const vanIndex = routePoints.findIndex((p) => p.type === 'van');
  const totalDistance = routePoints[routePoints.length - 1].distance;

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
                  <Typography fontWeight="bold">{currentVehicle.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentVehicle.vehicleModel} ({currentVehicle.plate})
                  </Typography>
                </Box>
              </Stack>

              <Box textAlign="right">
                <Typography variant="body2">Status</Typography>
                <Chip
                  label={
                    currentVehicle.status === 'end'
                      ? 'Trip Completed'
                      : 'On Way to School'
                  }
                  size="small"
                  sx={{
                    backgroundColor: '#F6F7F9',
                    color:
                      currentVehicle.status === 'end' ? '#999' : '#34C759',
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
                    ? currentVehicle.startedAt.toLocaleString()
                    : 'N/A'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="#191970">
                  School Route:
                </Typography>
                <Typography variant="body2">105</Typography>
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
            {/* solid */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: `${(vanIndex / (routePoints.length - 1)) * 100}%`,
                height: 2,
                bgcolor: 'green',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            />
            {/* dotted */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: `${
                  (vanIndex / (routePoints.length - 1)) * 100
                }%`,
                width: `calc(${
                  ((routePoints.length - 1 - vanIndex) /
                    (routePoints.length - 1)) *
                  100
                }% - 15px)`,
                borderTop: '2px dotted #8CC63E',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            />
            {/* points */}
            {routePoints.map((point) => {
              const leftPercent = (point.distance / totalDistance) * 100;

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
