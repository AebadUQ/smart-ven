'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { useSettings } from '@/hooks/use-settings';

import { layoutConfig } from '../config';
import { MainNav } from './main-nav';
import { SideNav } from './side-nav';
import { useUser } from '@/hooks/use-user';

export interface VerticalLayoutProps {
  children?: React.ReactNode;
}

export function VerticalLayout({ children }: VerticalLayoutProps): React.JSX.Element {
  const { settings } = useSettings();

  const { user } = useUser();
    
    // Function to filter menu items based on user permissions
    const getFilteredNavItems = () => {
      if (!user || !user.Modules) {
        return [];
      }
    
      // Collect allowed modules and permissions
      const allowedModules = new Set(user.Modules.map((module: any) => module.slug));
      
    
      
    
      // Filter navigation items based on user permissions
      const filteredNavItems = layoutConfig.navItems
  .filter((section) => {
    // Check if the whole section is allowed
    const isSectionAllowed = allowedModules.has(section.key);
    
    return isSectionAllowed;
  })
  .map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      items: item.items ? [...item.items] : undefined, // Keep all child items if they exist
    })),
  }));
    
    
      return filteredNavItems;
    };
    
    const filteredNavItems = layoutConfig.navItems;
    // const filteredNavItems = getFilteredNavItems();
    
    
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
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
        <SideNav color={settings.navColor} items={filteredNavItems} />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <MainNav items={layoutConfig.navItems} />
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
      </Box>
    </React.Fragment>
  );
}
