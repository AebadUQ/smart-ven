'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { useMediaQuery } from '@/hooks/use-media-query';

export interface SidebarProps {
  currentVehicleId?: string;
  onClose?: () => void;
  onVehicleDeselect?: () => void;
  onVehicleSelect?: (vehicleId: string) => void;
  open?: boolean;
  vehicles: any[];
}

export function Sidebar({
  currentVehicleId,
  onClose,
  onVehicleDeselect,
  onVehicleSelect,
  open,
  vehicles,
  setSelectedLocations
}: any) {
  const mdUp = useMediaQuery('up', 'md');

  const content = (
    <SidebarContent
      currentVehicleId={currentVehicleId}
      onClose={onClose}
      onVehicleDeselect={onVehicleDeselect}
      onVehicleSelect={onVehicleSelect}
      vehicles={vehicles}
      setSelectedLocations={setSelectedLocations}
    />
  );

  if (mdUp) {
    return (
      <Box
        sx={{
          borderRight: '1px solid var(--mui-palette-divider)',
          display: { xs: 'none', md: 'block' },
          flex: '0 0 auto',
          width: 320,
          height: '100vh',  // <-- fix: full viewport height
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Drawer
      PaperProps={{ sx: { maxWidth: '100%', width: 320, height: '100vh' } }} // <-- fix: full viewport height
      onClose={onClose}
      open={open}
    >
      {content}
    </Drawer>
  );
}

// ---------------- Driver Card ----------------
interface DriverCardProps {
  name: string;
  vehicle: string;
  avatar: string;
  selected?: boolean;
  onClick?: () => void;
}

function DriverCard({ name, vehicle, avatar, selected, onClick }: DriverCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: selected ? '1px solid #4caf50' : '1px solid transparent',
        backgroundColor: selected ? '#E8F5E9' : 'transparent',
        borderRadius: 2,
        p: 1,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: selected ? '#E8F5E9' : '#f5f5f5'
        }
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatar} />
        <Box>
          <Typography fontWeight="bold">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {vehicle}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

// ---------------- Sidebar Content ----------------
interface SidebarContentProps {
  currentVehicleId?: string;
  onClose?: () => void;
  onVehicleDeselect?: () => void;
  onVehicleSelect?: (vehicleId: string) => void;
  vehicles: any[];
}

function SidebarContent({
    vehicles,
  currentVehicleId,
  onVehicleDeselect,
  onVehicleSelect,
  setSelectedLocations
}: any) {
  const [selectedId, setSelectedId] = useState<string | null>(vehicles[0]?.id);



  return (
   <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Stack spacing={1} sx={{ flex: '0 0 auto', p: 2 }}>
        <Typography variant="h6">Live Tracking</Typography>
      </Stack>

      <OutlinedInput name="query" placeholder="Search By Name" sx={{ m: 2 }} />

      {/* Scrollable driver list */}
      <Box
        sx={{
          flex: '1 1 auto',
          overflowY: 'auto',
          p: 2,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '3px',
          },
        }}
      >
        <Stack spacing={1}>
          {vehicles.map((vehicle) => (
            <DriverCard
              key={vehicle.id}
              name={vehicle.name ?? 'Unknown Driver'}
              vehicle={vehicle.vehicleModel ? `${vehicle.vehicleModel} (${vehicle.plate ?? ''})` : vehicle.id}
              avatar={vehicle.avatar ?? '/assets/default-avatar.png'}
              selected={selectedId === vehicle.id}
              onClick={() => {
                setSelectedId(vehicle.id);
                onVehicleSelect?.(vehicle.id);
                setSelectedLocations(vehicle?.locations)
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
