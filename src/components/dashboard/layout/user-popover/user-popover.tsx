'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { paths } from '@/paths';
import { useAuthContext } from '@/contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/store";
import { logout } from '@/store/reducers/auth-slice';

export interface UserPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={Boolean(open)}
      slotProps={{ paper: { sx: { width: '280px' } } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Box sx={{ p: 2 }}>
        <Typography>{ 'Name'}</Typography>
        <Typography color="text.secondary" variant="body2">
          { 'email@email.com'}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 1 }}>
        <MenuItem component={RouterLink} href={paths.dashboard.settings.account} onClick={onClose}>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          Account
        </MenuItem>

      </List>
      <Divider />
      <Box sx={{ p: 1 }}>
        <MenuItem component="div" onClick={() => dispatch(logout())} sx={{ justifyContent: 'center' }}>
          Sign out
        </MenuItem>

      </Box>
    </Popover>
  );
}
