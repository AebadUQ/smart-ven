'use client';

import React, { useMemo, useState } from 'react';
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from '@react-google-maps/api';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

interface MapProps {
  vehicles: any[];                // trips array
  currentVehicleId?: string;      // optional: selected trip/van id
  onVehicleSelect?: (id: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// helper: given a trip/vehicle, get its last van point (current position)
const getLastPoint = (v: any) => {
  const path: { lat: number; lng: number }[] = [];

  if (v.tripStart?.lat && v.tripStart?.long) {
    path.push({ lat: v.tripStart.lat, lng: v.tripStart.long });
  }

  if (Array.isArray(v.locations) && v.locations.length) {
    const sorted = [...v.locations].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    sorted.forEach((loc) => {
      if (loc.lat && loc.long) path.push({ lat: loc.lat, lng: loc.long });
    });
  }

  if (v.tripEnd?.lat && v.tripEnd?.long) {
    path.push({ lat: v.tripEnd.lat, lng: v.tripEnd.long });
  }

  if (path.length) return path[path.length - 1];

  if (v.latitude && v.longitude) {
    return { lat: v.latitude, lng: v.longitude };
  }

  if (v.tripStart?.lat && v.tripStart?.long) {
    return { lat: v.tripStart.lat, lng: v.tripStart.long };
  }

  return null;
};

export function Map({ vehicles, currentVehicleId, onVehicleSelect }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const current =
    vehicles.find((v) => String(v.id || v._id) === currentVehicleId) ||
    vehicles[0];

  // center = current van ka last point
  const center = useMemo(() => {
    if (!current) return { lat: 24.8607, lng: 67.0011 };
    const last = getLastPoint(current);
    return last || { lat: 24.8607, lng: 67.0011 };
  }, [current]);

  // simple van icon (optional)
  const vanIcon = useMemo(() => {
    if (typeof window === 'undefined' || !(window as any).google) return undefined;
    return {
      url: '/assets/van-marker.svg', // make sure file exists
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16),
    };
  }, [isLoaded]);

  if (!isLoaded) return <div style={{ height: '100%' }}>Loading map...</div>;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Actual Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        mapTypeId="roadmap"
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {vehicles.map((v: any) => {
          const id = String(v.id || v._id);
          const lastPoint = getLastPoint(v);
          if (!lastPoint) return null;

          return (
            <React.Fragment key={id}>
              {/* sirf marker (tracking/Polyline hat chuki hai) */}
              <MarkerF
                position={lastPoint}
                icon={vanIcon}
                onClick={() => {
                  onVehicleSelect?.(id);
                  setActiveId(id);
                }}
              />

              {activeId === id && (
                <InfoWindowF
                  position={lastPoint}
                  onCloseClick={() => setActiveId(null)}
                >
                  <div style={{ fontSize: 12 }}>
                    <div><strong>Driver:</strong> {v.driverName || 'Unknown'}</div>
                    <div><strong>Van:</strong> {v.carNumber || '-'}</div>
                    <div><strong>Status:</strong> {v.status || '-'}</div>
                  </div>
                </InfoWindowF>
              )}
            </React.Fragment>
          );
        })}
      </GoogleMap>

      {/* 👇 Bottom-left Info Card (MapTracking card) */}
      {current && (
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
              {current.driverName?.[0] || 'D'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {current.driverName || 'Unknown Driver'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {current.carNumber || '-'}
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
                {current.tripStart?.startTime
                  ? new Date(current.tripStart.startTime).toLocaleString()
                  : current.createdAt
                  ? new Date(current.createdAt).toLocaleString()
                  : '-'}
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
                {Array.isArray(current.kids) ? current.kids.length : 0}
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
                label={(current.status || '').toString().toUpperCase()}
                size="small"
                sx={{
                  backgroundColor: '#F6F7F9',
                  color:
                    current.status === 'start'
                      ? '#2D9CDB'
                      : current.status === 'ongoing'
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
      )}
    </Box>
  );
}
