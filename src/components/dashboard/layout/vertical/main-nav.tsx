'use client';

import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { SpeakerHigh as SpeakerHighIcon } from '@phosphor-icons/react/dist/ssr/SpeakerHigh';
import { SpeakerSlash as SpeakerSlashIcon } from '@phosphor-icons/react/dist/ssr/SpeakerSlash';

import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { useTranslation } from 'react-i18next';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CallContext } from '@/contexts/call-context';
import type { NavItemConfig } from '@/types/nav';
import type { User } from '@/types/user';
import { useDialog } from '@/hooks/use-dialog';
import { usePopover } from '@/hooks/use-popover';
// replace your Bell import with
import { PhoneCall as PhoneCallIcon } from '@phosphor-icons/react/dist/ssr/PhoneCall';

import { ContactsPopover } from '../contacts-popover';
import { languageFlags, LanguagePopover } from '../language-popover';
import type { Language } from '../language-popover';
import { MobileNav } from '../mobile-nav';
import { NotificationsPopover } from '../notifications-popover';
import { SearchDialog } from '../search-dialog';
import { UserPopover } from '../user-popover/user-popover';
import { useUser } from '@/hooks/use-user';


export interface MainNavProps {
  items: NavItemConfig[];
}

export function MainNav({ items }: MainNavProps): React.JSX.Element {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { callData } = useContext(CallContext); // live calls via sockets
  

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
            {/* <SearchButton /> */}
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', flex: '1 1 auto', justifyContent: 'flex-end' }}
          >
            {/* <NotificationsButton /> */}
            {/* <ContactsButton /> */}
            {/* <Divider
              flexItem
              orientation="vertical"
              sx={{ borderColor: 'var(--MainNav-divider)', display: { xs: 'none', lg: 'block' } }}
            /> */}
            {/* <LanguageSwitch /> */}

            {/* <Tooltip title="Missed Calls">
        <Badge
          badgeContent={callData?.length || 0}
          color="error"
          overlap="circular"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.65rem',
              height: '16px',
              minWidth: '16px',
              top: 6,
              right: 6,
            },
          }}
        >
          <IconButton >
            <PhoneCallIcon size={24} />
          </IconButton>
        </Badge>
      </Tooltip> */}

      {/* Sound toggle */}
      {/* <SoundButton /> */}


            <UserButton />
          </Stack>
        </Box>
      </Box>
      <MobileNav
        items={items}
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

function SearchButton(): React.JSX.Element {
  const dialog = useDialog();

  return (
    <React.Fragment>
      <Tooltip title="Search">
        <IconButton onClick={dialog.handleOpen} sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
          <MagnifyingGlassIcon />
        </IconButton>
      </Tooltip>
      <SearchDialog onClose={dialog.handleClose} open={dialog.open} />
    </React.Fragment>
  );
}

function ContactsButton(): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();

  return (
    <React.Fragment>
      <Tooltip title="Contacts">
        <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
          <UsersIcon />
        </IconButton>
      </Tooltip>
      <ContactsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

function NotificationsButton(): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <Badge
          color="error"
          sx={{ '& .MuiBadge-dot': { borderRadius: '50%', height: '10px', right: '6px', top: '6px', width: '10px' } }}
          variant="dot"
        >
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <BellIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      <NotificationsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

function LanguageSwitch(): React.JSX.Element {
  const { i18n } = useTranslation();
  const popover = usePopover<HTMLButtonElement>();
  const language = (i18n.language || 'en') as Language;
  const flag = languageFlags[language];

  return (
    <React.Fragment>
      <Tooltip title="Language">
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
        >
          <Box sx={{ height: '24px', width: '24px' }}>
            <Box alt={language} component="img" src={flag} sx={{ height: 'auto', width: '100%' }} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}


function UserButton(): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();
  const { user } = useUser();
  return (
    <React.Fragment>
      <Box
        display="flex"
        gap="16px"
        alignItems="center"
        component="button"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >

        {user?.firstName +" "+ user?.lastName}
        <CaretDownIcon  color="info" />
        {/* <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '& .MuiBadge-dot': {
              border: '2px solid var(--MainNav-background)',
              borderRadius: '50%',
              bottom: '6px',
              height: '12px',
              right: '6px',
              width: '12px',
            },
          }}
          variant="dot"
        >
          <Avatar src={user.avatar} />
        </Badge> */}
      </Box>
      <UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

function SoundButton(): React.JSX.Element {
  const { muted, setMuted, unlockAudio } = useContext(CallContext); // live calls via sockets
  
  const handleToggle = () => {
    // first click: unlock
    unlockAudio();
    // then flip the flag
    setMuted(!muted);
  };

  return (
    <Tooltip title={muted ? 'Unmute' : 'Mute'}>
      <IconButton onClick={handleToggle}>
        {muted
          ? <SpeakerSlashIcon size={24} weight="bold" />
          : <SpeakerHighIcon size={24} weight="bold" />
        }
      </IconButton>
    </Tooltip>
  )
}
