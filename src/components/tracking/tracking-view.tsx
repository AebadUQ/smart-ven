'use client';

import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
  LinearProgress,
  Chip,
  AvatarGroup
} from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';
import {Map} from '@/components/tracking'
import { Sidebar } from './Sidebar';
// import { FleetMap } from './fleet-map';
// import { Sidebar } from './sidebar';
// import type { Vehicle } from './types';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HomeIcon from '@mui/icons-material/Home';
export interface FleetViewProps {
  vehicles: any[];
}

export function TrackingView({ vehicles }: FleetViewProps) {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [currentVehicleId, setCurrentVehicleId] = React.useState<string | undefined>(
    vehicles[0]?.id
  );

  const currentVehicle = vehicles.find((v) => v.id === currentVehicleId);
  // Mock data
  const tripStartDate = '26 May, 2025 - 08:35 AM';
  const schoolRoute = '105';
  const studentsPicked = [
    '/avatars/student1.png',
    '/avatars/student2.png',
    '/avatars/student3.png',
    '/avatars/student4.png'
  ];
  const studentsToPick = [
    '/avatars/student5.png',
    '/avatars/student6.png',
    '/avatars/student7.png',
    '/avatars/student8.png'
  ];
  const routePoints = [
    { id: 1, type: "start", distance: 0 },
    { id: 2, type: "route", distance: 10 },
    { id: 3, type: "route", distance: 15 },
    { id: 4, type: "route", distance: 40 },
    { id: 5, type: "van", distance: 50 },
    { id: 6, type: "route", distance: 70 },
    { id: 7, type: "route", distance: 90 },
    { id: 8, type: "end", distance: 100 },
  ];
  const vanIndex = routePoints.findIndex((p) => p.type === "van");

  const totalDistance = routePoints[routePoints.length - 1].distance;
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <Sidebar
        currentVehicleId={currentVehicleId}
        onClose={() => setOpenSidebar(false)}
        onVehicleDeselect={() => setCurrentVehicleId(undefined)}
        onVehicleSelect={(id) => setCurrentVehicleId(id)}
        open={openSidebar}
        vehicles={vehicles}
        
      />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Driver Details Card */}
        {currentVehicle && (
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
                    <Typography  variant='h6'>Driver Details</Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="center">

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={currentVehicle?.avatar} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography fontWeight="bold">{currentVehicle.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentVehicle.vehicleModel} ({currentVehicle.plate})
                  </Typography>
                </Box>
              </Stack>
              <Box textAlign="right">
                                  <Typography variant='body2'>Status</Typography>

              <Chip
  label="On Way to School"
  size="small"
  sx={{
    backgroundColor: '#F6F7F9',
    color: '#34C759',
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

         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
  {/* 1st column */}
  <Box>
    <Typography variant="body2" fontWeight="bold" color="#191970">
      Trip started on:
    </Typography>
    <Typography variant="body2">26 May, 2025 - 08:35 AM</Typography>
  </Box>

  {/* 2nd column */}
  <Box>
    <Typography variant="body2"  color="#191970">
      School Route:
    </Typography>
    <Typography variant="body2">105</Typography>
  </Box>

  {/* 3rd column */}
  <Button
    variant="contained"
    startIcon={<PhoneIcon sx={{ color: 'white' }} />}
    sx={{
      backgroundColor: '#1FA959',
      color: 'white',
      '&:hover': {
        backgroundColor: '#178a48',
      },
      whiteSpace: 'nowrap', // prevent button text wrapping
    }}
  >
    Call Driver
  </Button>
</Stack>
          </Box>
        )}

        {/* Trip Details */}
        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
            <Typography  variant="h6">Trip Details</Typography>
<Box sx={{ position: "relative", width: "100%", height: 50 }}>
  {/* Solid line from start to van */}
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: 0,
      width: `${(vanIndex / (routePoints.length - 1)) * 100}%`,
      height: 2,
      bgcolor: "green",
      transform: "translateY(-50%)",
      zIndex: 1,
    }}
  />

  {/* Dotted line from van to end */}
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: `${(vanIndex / (routePoints.length - 1)) * 100}% `,
         width: `calc(${((routePoints.length - 1 - vanIndex) / (routePoints.length - 1)) * 100}% - 15px)`,
            
      borderTop: "2px dotted #8CC63E",
      transform: "translateY(-50%)",
      zIndex: 1,
    }}
  />

  {/* Points */}
  {routePoints.map((point) => {
    const leftPercent = (point.distance / totalDistance) * 100;

    if (point.type === "start") {
      return (
        <Box
          key={point.id}
          sx={{
            position: "absolute",
            left: `${leftPercent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 20,
            height: 20,
            bgcolor: "green",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: "white",
              borderRadius: "50%",
            }}
          />
        </Box>
      );
    }

    if (point.type === "end") {
      return (
        <Box
          key={point.id}
          sx={{
            position: "absolute",
            left: `${leftPercent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 20,
            height: 20,
            bgcolor: "green",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <HomeIcon sx={{ color: "white", fontSize: 14 }} />
        </Box>
      );
    }

    if (point.type === "route") {
      return (
        <Box
          key={point.id}
          sx={{
            position: "absolute",
            left: `${leftPercent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 12,
            height: 12,
            bgcolor: "green",
            borderRadius: "50%",
            zIndex: 2,
          }}
        />
      );
    }

    if (point.type === "van") {
      return (
        <Box
          key={point.id}
          sx={{
            position: "absolute",
            left: `${leftPercent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            color: "orange",
          }}
        >
          <AirportShuttleIcon sx={{ color: "#343330", fontSize: "30px" }} />
        </Box>
      );
    }

    return null;
  })}
</Box>


          <Typography  variant="h6">Student Details</Typography>
         

          {/* Student Details */}
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems={'center'} gap={1}>
              <Typography variant="body2"  color="#008000">
                Students Picked
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                {/* {item.isPublic ? (
                                  <Tooltip title="Public">
                                    <Avatar sx={{ '--Avatar-size': '32px' }}>
                                      <GlobeIcon fontSize="var(--Icon-fontSize)" />
                                    </Avatar>
                                  </Tooltip>
                                ) : null} */}
                              
                                  <AvatarGroup max={3}>
                                    {[{name:'a',avatar:'/assets/avatar-1.png'},
                                        {name:'a',avatar:'/assets/avatar-2.png'}
                                    ].map((person) => (
                                      <Avatar key={person.name} src={person.avatar} sx={{ '--Avatar-size': '32px' }} />
                                    ))}
                                  </AvatarGroup>
                               
                              </Stack>
            </Stack>
           <Stack direction="row" alignItems={'center'} gap={1}>
              <Typography variant="body2"  color="#008000">
                Student to be Pick


              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                {/* {item.isPublic ? (
                                  <Tooltip title="Public">
                                    <Avatar sx={{ '--Avatar-size': '32px' }}>
                                      <GlobeIcon fontSize="var(--Icon-fontSize)" />
                                    </Avatar>
                                  </Tooltip>
                                ) : null} */}
                              
                                  <AvatarGroup max={3}>
                                    {[{name:'a',avatar:'/assets/avatar-3.png'},
                                        {name:'a',avatar:'/assets/avatar-4.png'},
                                        {name:'a',avatar:'/assets/avatar-5.png'}
                                    ].map((person) => (
                                      <Avatar key={person.name} src={person.avatar} sx={{ '--Avatar-size': '32px' }} />
                                    ))}
                                  </AvatarGroup>
                               
                              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Map */}
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
