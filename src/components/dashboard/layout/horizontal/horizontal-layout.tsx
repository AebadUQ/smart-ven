'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { useSettings } from '@/hooks/use-settings';

import { layoutConfig } from '../config';
import { MainNav } from './main-nav';
import { useUser } from '@/hooks/use-user';

export interface HorizontalLayoutProps {
  children?: React.ReactNode;
}

export function HorizontalLayout({ children }: HorizontalLayoutProps): React.JSX.Element {
  const { settings } = useSettings();
  const { user } = useUser();
  
  // Function to filter menu items based on user permissions
  const getFilteredNavItems = () => {
    if (!user || !user.Modules) return [];

    // Collect allowed modules and permissions
    const allowedModules = new Set(user.Modules.map((module: any) => module.slug));
    const allowedPermissions = new Set(
      user.Modules.flatMap((module: any) => module.permissions.map((perm: any) => perm.slug))
    );
    // Filter navigation items based on user permissions
    return layoutConfig.navItems.map((section) => ({
      ...section,
      items: section.items
        .filter((item) => allowedModules.has(item.key)) // Check if the module exists
        .map((item) => ({
          ...item,
          items: item.items
            ? item.items.filter((subItem) => allowedPermissions.has(subItem.key.split(':')[1])) // Check sub-items
            : undefined,
        }))
        .filter((item) => item.items === undefined || item.items.length > 0), // Remove empty sections
    })).filter((section) => section.items.length > 0); // Remove empty sections
  };

  const filteredNavItems = layoutConfig.navItems;
  // const filteredNavItems = getFilteredNavItems();


  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ body: { '--MainNav-zIndex': 1000, '--MobileNav-width': '320px', '--MobileNav-zIndex': 1100 } }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <MainNav color={settings.navColor} items={filteredNavItems} />
        <Box
          component="main"
          sx={{
            '--Content-margin': '0 auto',
            '--Content-maxWidth': 'var(--maxWidth-xl)',
            '--Content-paddingX': '24px',
            '--Content-paddingY': { xs: '24px', lg: '64px' },
            '--Content-padding': 'var(--Content-paddingY) var(--Content-paddingX)',
            '--Content-width': '100%',
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </Box>
    </React.Fragment>
  );
}
