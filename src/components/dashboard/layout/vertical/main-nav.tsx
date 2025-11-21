'use client';

import React, { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { useTranslation } from 'react-i18next';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import type { NavItemConfig } from '@/types/nav';
import { usePopover } from '@/hooks/use-popover';
import { languageFlags, LanguagePopover } from '../language-popover';
import type { Language } from '../language-popover';
import { MobileNav } from '../mobile-nav';
import { NotificationsPopover } from '../notifications-popover';
import { UserPopover } from '../user-popover/user-popover';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { getProfile } from '@/store/reducers/auth-slice';

export interface MainNavProps {
  items: NavItemConfig[];
}

export function MainNav({ items }: MainNavProps): React.JSX.Element {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const user = useSelector((state:RootState)=>state.auth.user)
  console.log("useruseruseruseruseruseruseruseruseruser",user)
  const dispatch = useDispatch<AppDispatch>();

  // 🚀 Fetch profile on navbar load
  useEffect(() => {
    if(user?.role !== 'superadmin'){

      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          '--MainNav-background': 'var(--mui-palette-background-default)',
          '--MainNav-divider': 'var(--mui-palette-divider)',
          bgcolor: 'var(--MainNav-background)',
          left: 0,
          position: 'sticky',
          pt: { lg: 'var(--Layout-gap)' },
          top: 0,
          width: '100%',
          zIndex: 'var(--MainNav-zIndex)',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid var(--MainNav-divider)',
            display: 'flex',
            flex: '1 1 auto',
            minHeight: 'var(--MainNav-height)',
            px: { xs: 2, lg: 3 },
            py: 1,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', flex: '1 1 auto', justifyContent: 'flex-end' }}
          >
            <UserButton />
          </Stack>
        </Box>
      </Box>

      <MobileNav
        items={items}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
    </React.Fragment>
  );
}

function UserButton(): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();
  const userDetail = useSelector((state: RootState) => state.auth.userProfile);
  const user = useSelector((state:RootState)=>state.auth.user)

  return (
    <>
      <Box
        display="flex"
        gap="16px"
        alignItems="center"
        component="button"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0, textTransform: 'capitalize' }}
      >
        {userDetail?.schoolName || user?.name}
        <CaretDownIcon color="info" />
      </Box>

      <UserPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        user={userDetail || user}
      />
    </>
  );
}
