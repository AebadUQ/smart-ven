'use client';

import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Divider,
  Chip,
  AvatarGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Button
} from '@mui/material';

import { Phone as PhoneIcon } from '@mui/icons-material';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HomeIcon from '@mui/icons-material/Home';

import { Map } from './map';
import { Sidebar } from './Sidebar';
import { useDispatch, useSelector } from '@/store';
import { getTripKidsByDriver } from '@/store/reducers/trip-slice';

export function TrackingView({ vehicles, status, onStatusChange, loading }: any) {
  const dispatch = useDispatch();

  const [kidsModalOpen, setKidsModalOpen] = React.useState(false);

  const { tripKids, tripKidsLoading } = useSelector((state) => state.trip);
  const kidsArray = tripKids?.kids ?? [];

  const [openSidebar, setOpenSidebar] = React.useState(false);

  const [currentVehicleId, setCurrentVehicleId] = React.useState<string | undefined>(
    vehicles[0] ? String(vehicles[0].id) : undefined
  );

  // ⭐ Always auto-select first vehicle when list updates
  React.useEffect(() => {
    if (vehicles.length === 0) {
      setCurrentVehicleId(undefined);
      return;
    }

    const exists = vehicles.some((v: any) => String(v.id) === currentVehicleId);
    if (!exists) {
      setCurrentVehicleId(String(vehicles[0].id));
    }
  }, [vehicles]);

  const currentVehicle =
    vehicles.length === 0
      ? null
      : vehicles.find((v: any) => String(v.id) === currentVehicleId) ||
        vehicles[0];

  const rawStatus =
    currentVehicle?.status ?? currentVehicle?.tripStatus ?? 'unknown';

  const statusLabelMap: any = {
    start: 'Trip Started',
    ongoing: 'On Way to School',
    end: 'Trip Completed',
    unknown: 'Unknown'
  };

  const statusColorMap: any = {
    start: '#2D9CDB',
    ongoing: '#34C759',
    end: '#9B9B9B',
    unknown: '#9B9B9B'
  };

  const statusLabel = statusLabelMap[rawStatus];
  const statusColor = statusColorMap[rawStatus];

  const progressRatio =
    rawStatus === 'start' ? 0.25 : rawStatus === 'ongoing' ? 0.6 : rawStatus === 'end' ? 1 : 0;

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

  const totalDistance = 100;
  const completedWidth = `${progressRatio * 100}%`;
  const remainingWidth = `${(1 - progressRatio) * 100}%`;
  const vanLeftPercent = progressRatio * 100;

  const handleGetTripKids = () => {
    if (!currentVehicle) return;

    setKidsModalOpen(true);

    dispatch(
      getTripKidsByDriver({
        tripId: String(currentVehicle.id),
        driverId: currentVehicle.driverId,
      })
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', height: '100%' }}>

        {/* SIDEBAR ALWAYS VISIBLE */}
        <Sidebar
          currentVehicleId={currentVehicleId}
          onClose={() => setOpenSidebar(false)}
          onVehicleDeselect={() => setCurrentVehicleId(undefined)}
          onVehicleSelect={(id) => setCurrentVehicleId(id)}
          open={openSidebar}
          vehicles={vehicles}
        />

        <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* =================== DRIVER CARD =================== */}
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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Driver Details</Typography>

              {/* FILTER DROPDOWN ALWAYS VISIBLE */}
              <Select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                size="small"
                sx={{ minWidth: 150, background: 'white', borderRadius: 1 }}
              >
                <MenuItem value="">All Trips</MenuItem>
                <MenuItem value="start">Started</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="end">Completed</MenuItem>
              </Select>
            </Stack>

            {/* No Vehicle State */}
            {!currentVehicle && (
              <Typography sx={{ opacity: 0.6 }}>No trips found</Typography>
            )}

            {/* When vehicle exists */}
            {currentVehicle && (
              <>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={currentVehicle.avatar} sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                        {currentVehicle.driverName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentVehicle.vehicleModel} ({currentVehicle.plate})
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip
                    label={statusLabel}
                    size="small"
                    sx={{
                      backgroundColor: '#F6F7F9',
                      color: statusColor,
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}
                  />
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" fontWeight="bold" color="#191970">
                      Trip started on:
                    </Typography>
                    <Typography variant="body2">
                      {currentVehicle.tripStart
                        ? new Date(currentVehicle.tripStart).toLocaleString()
                        : 'N/A'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="#191970">School Route:</Typography>
                    <Typography variant="body2">{currentVehicle.routeName || '105'}</Typography>
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon sx={{ color: 'white' }} />}
                    sx={{
                      backgroundColor: '#1FA959',
                      color: 'white',
                      '&:hover': { backgroundColor: '#178a48' },
                    }}
                  >
                    Call Driver
                  </Button>
                </Stack>
              </>
            )}
          </Box>

          {/* =================== TRIP DETAILS =================== */}
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

            {!currentVehicle && (
              <Typography sx={{ opacity: 0.6 }}>No trip data available</Typography>
            )}

            {currentVehicle && (
              <>
                {/* Progress bar */}
                <Box sx={{ position: 'relative', width: '100%', height: 50 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      width: completedWidth,
                      height: 2,
                      bgcolor: 'green',
                      transform: 'translateY(-50%)',
                    }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: completedWidth,
                      width: `calc(${remainingWidth} - 15px)`,
                      borderTop: '2px dotted #8CC63E',
                      transform: 'translateY(-50%)',
                    }}
                  />

                  {/* Points */}
                  {routePoints.map((p) => {
                    const left =
                      p.type === 'van'
                        ? `${vanLeftPercent}%`
                        : `${(p.distance / totalDistance) * 100}%`;

                    return (
                      <Box
                        key={p.id}
                        sx={{
                          position: 'absolute',
                          left,
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: p.type === 'start' || p.type === 'end' ? 20 : 12,
                          height: p.type === 'start' || p.type === 'end' ? 20 : 12,
                          bgcolor: 'green',
                          borderRadius: '50%',
                          zIndex: p.type === 'van' ? 5 : 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {p.type === 'end' && <HomeIcon sx={{ color: 'white', fontSize: 14 }} />}
                        {p.type === 'van' && <AirportShuttleIcon sx={{ fontSize: 30 }} />}
                      </Box>
                    );
                  })}
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {statusLabel}
                </Typography>

                {/* Student Details */}
                <Typography variant="h6">Student Details</Typography>

                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="body2" color="#008000">Students Picked</Typography>
                    <AvatarGroup max={3}>
                      {[1, 2].map((i) => (
                        <Avatar key={i} src={`/assets/avatar-${i}.png`} />
                      ))}
                    </AvatarGroup>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{ cursor: 'pointer' }}
                    onClick={handleGetTripKids}
                  >
                    <Typography variant="body2" color="#008000">Students to be Picked</Typography>
                    <AvatarGroup max={3}>
                      {[3, 4, 5].map((i) => (
                        <Avatar key={i} src={`/assets/avatar-${i}.png`} />
                      ))}
                    </AvatarGroup>
                  </Stack>
                </Stack>
              </>
            )}
          </Box>

          {/* MAP ALWAYS SHOW */}
          <Box sx={{ flex: 1, borderRadius: 2, overflow: 'hidden' }}>
            <Map
              currentVehicleId={currentVehicleId}
              vehicles={vehicles}
              onVehicleSelect={(id) => setCurrentVehicleId(id)}
            />
          </Box>
        </Box>
      </Box>

      {/* STUDENTS MODAL */}
      <Dialog open={kidsModalOpen} onClose={() => setKidsModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Students to be Picked</DialogTitle>
        <DialogContent dividers>
          {tripKidsLoading ? (
            <Typography>Loading kids...</Typography>
          ) : kidsArray.length === 0 ? (
            <Typography>No kids found.</Typography>
          ) : (
            <List>
              {kidsArray.map((kid: any) => (
                <ListItem key={kid._id}>
                  <ListItemAvatar>
                    <Avatar>{kid.name?.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={kid.name}
                    secondary={kid.parent?.address || 'N/A'}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
