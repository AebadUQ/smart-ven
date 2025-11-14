'use client';

import * as React from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Button, Card, Grid, Stack, Typography, Chip } from '@mui/material';
import type { TripAPI } from '@/components/overview/TripCard'; // 🔹 same type

interface MapTrackingProps {
  selectedTrip: TripAPI | null;
}

export default function MapTracking({ selectedTrip }: MapTrackingProps) {
  console.log("selectedTrip",selectedTrip)
  // agar koi trip select nahi to simple placeholder text
  if (!selectedTrip) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 600,
          borderRadius: 3,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Typography color="text.secondary">Select a trip from the right side to view tracking.</Typography>
      </Box>
    );
  }

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
      {/* Map Placeholder (same as before) */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: '#e0e0e0',
          filter: 'grayscale(60%)',
          position: 'relative',
        }}
      >
        <DirectionsBusIcon
          color="success"
          sx={{ position: 'absolute', top: '50%', left: '38%', fontSize: 40, transform: 'translate(-50%, -50%)' }}
        />
        <HomeIcon
          color="warning"
          sx={{ position: 'absolute', top: '45%', left: '70%', fontSize: 40, transform: 'translate(-50%, -50%)' }}
        />
      </Box>

      {/* Info Card – ab data selectedTrip se aa raha */}
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
          <Avatar sx={{ width: 56, height: 56 }}>
            {selectedTrip.driverName}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {selectedTrip.driverName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedTrip.carNumber}
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
            <Typography variant="body2">
              {selectedTrip.tripStart?.startTime
                ? new Date(selectedTrip.tripStart.startTime).toLocaleString()
                : new Date(selectedTrip.createdAt).toLocaleString()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="caption" color="text.secondary">
              Kids Count:
            </Typography>
            <Typography variant="body2">
              {selectedTrip.kids.length}
            </Typography>
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
              label={selectedTrip.status.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: '#F6F7F9',
                color:
                  selectedTrip.status === 'start'
                    ? '#2D9CDB'
                    : selectedTrip.status === 'ongoing'
                    ? '#34C759'
                    : '#9B9B9B',
                fontWeight: 'bold',
                fontSize: 12,
                '& .MuiChip-label': {
                  fontWeight: 'bold',
                  fontSize: 12,
                },
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
              backgroundColor: '#178a48',
            },
          }}
        >
          Call Driver
        </Button>
      </Card>
    </Box>
  );
}
