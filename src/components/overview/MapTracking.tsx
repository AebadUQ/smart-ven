'use client';

import * as React from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';

export default function VehicleRouteMap() {
  // Sample data for vehicles
  const vehicles = [
    { id: 'AGS-183', label: 'Van (AGS-183)', active: true },
    { id: 'ABC-125', label: 'Van (ABC-125)' },
    { id: 'XYZ-205', label: 'Van (XYZ-205)' },
    { id: 'XYZ-205-2', label: 'Van (XYZ-205)' },
    { id: 'XYZ-205-3', label: 'Van (XYZ-205)' },
    { id: 'XYZ-205-4', label: 'Van (XYZ-205)' },
    { id: 'XYZ-205-5', label: 'Van (XYZ-205)' },
    { id: 'XYZ-205-6', label: 'Van (XYZ-205)' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: 600,
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.paper',
      }}
    >
      {/* Vehicle Buttons */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 10,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {vehicles.map(({ id, label, active }) => (
          <Button
            key={id}
            variant="outlined" // base variant outlined for border
            size="small"
            sx={{
              whiteSpace: 'nowrap',
              textTransform: 'none',
              backgroundColor: 'white',
              borderColor: active ? '#1560BD' : 'transparent',
              color: active ? '#1560BD' : '#404042',
              '&:hover': {
                backgroundColor: 'white', // keep bg white on hover as well
                borderColor: active ? '#1560BD' : '#1560BD', // show border on hover if not active
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>

      {/* Map Placeholder */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: '#e0e0e0',
          filter: 'grayscale(60%)',
          position: 'relative',
        }}
      >
        {/* Route icons simulated */}
        <DirectionsBusIcon
          color="success"
          sx={{ position: 'absolute', top: '50%', left: '38%', fontSize: 40, transform: 'translate(-50%, -50%)' }}
        />
        <HomeIcon
          color="warning"
          sx={{ position: 'absolute', top: '45%', left: '70%', fontSize: 40, transform: 'translate(-50%, -50%)' }}
        />
        {/* Simulated route path */}
        <Box
          component="svg"
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <path d="M38% 50 L50% 40 L70% 45" stroke="#666" strokeWidth="3" fill="none" strokeDasharray="8" />
        </Box>
      </Box>

      {/* Info Card */}
      <Card
        sx={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          width: 320,
          borderRadius: 3,
          boxShadow: 6,
          p: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Avatar
            alt="Yasir Hanif"
            src="https://randomuser.me/api/portraits/men/75.jpg"
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Yasir Hanif
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Suzuki Bolan (BXL-637)
            </Typography>
          </Box>
        </Stack>

      <Grid container spacing={1} sx={{ mb: 1 }}>
  <Grid
    item
    xs={12}
    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <Typography variant="caption" color="text.secondary">
      Trip started on:
    </Typography>
    <Typography variant="body2">26 May, 2025 - 08:35 AM</Typography>
  </Grid>
  <Grid
    item
    xs={12}
    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <Typography variant="caption" color="text.secondary">
      School Route:
    </Typography>
    <Typography variant="body2">105</Typography>
  </Grid>
  <Grid
    item
    xs={12}
    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <Typography variant="caption" color="text.secondary">
      Status:
    </Typography>
<Chip
  label="On Way to School"
  size="small"
  sx={{
    backgroundColor: '#F6F7F9',
    color: '#34C759',
    fontWeight: 'bold',
    fontSize: 12,
    // Remove default success color styles:
    '& .MuiChip-label': {
      fontWeight: 'bold',
      fontSize: 12,
    },
    // To avoid default color from `color="success"`, just omit it
  }}
/>
  </Grid>
</Grid>



       
    <Button
  variant="contained"
  startIcon={<PhoneIcon sx={{ color: 'white' }} />}
  sx={{
    backgroundColor: '#1FA959',
    color: 'white',
    '&:hover': {
      backgroundColor: '#178a48', // slightly darker green on hover
    },
  }}
>
  Call Driver
</Button>

      </Card>
    </Box>
  );
}
