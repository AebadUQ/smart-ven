'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { AddLocationCard } from '@/components/dashboard/jobs/career-configuration';
import { getCareerConfiguration } from '@/services/jobs.api';
import { paths } from '@/paths';

// define your tabs with a `key` that matches the API or view you want
const navItems = [
  { key: 'location', title: 'Location' },
  { key: 'jobType', title: 'Job Type' },
  { key: 'jobCategory', title: 'Job Category' },
  { key: 'status', title: 'Application Status' },
];

export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState<string>('location');
  const [selectedTabType, setSelectedTabType] = useState<string>('Location');
  const [data, setData] = useState<any>(null);

  // fetch data for whichever tab is selected
  const fetchData = useCallback(async (type: string) => {
    try {
      const result = await getCareerConfiguration(type);
      setData(result);
    } catch (error) {
      console.error('Error fetching data for', type, error);
    }
  }, []);

  // re-run whenever selectedTab changes
  useEffect(() => {
    fetchData(selectedTab);
  }, [fetchData, selectedTab]);

  return (
    <Box
      sx={{
        p: 3
      }}
    >

      <Stack sx={{pb: 3}}>
          <Typography variant="h5">Configuration</Typography>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Sidebar */}
        <Stack
          spacing={2}
          sx={{
            flex: '0 0 auto',
            position: { md: 'sticky' },
            top: '64px',
            width: { xs: '100%', md: '240px' },
          }}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.key}
              title={item.title}
              isActive={item.key === selectedTab}
              onClick={() => {
                setSelectedTab(item.key);
                setSelectedTabType(item.title);   // ✅ update title here
              }}
            />
          ))}
        </Stack>

        {/* Main content */}
        <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
          <Stack spacing={4}>
            {/* <Typography variant="h4">Configuration: {selectedTab}</Typography> */}
            {/* Pass the data into your card, or swap cards per tab */}
           <AddLocationCard data={data} type={selectedTab} selectedTabType={selectedTabType}/>
            
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

// A very simple NavItem that acts like a button
function NavItem({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        width: '100%',
        textAlign: 'left',
        px: "15px",
        py: "10px",
        border: 'none',
        borderRadius: "10px",
        background: isActive ? '#f4f2ff' : 'transparent',
        color: isActive ? '#736efe' : 'var(--mui-palette-text-secondary)',
        cursor: 'pointer',
        '&:hover': {
          background: !isActive && 'var(--mui-palette-action-hover)',
        },
      }}
    >
      <Typography sx={{ fontWeight: isActive ? 600 : 500 }}>{title}</Typography>
    </Box>
  );
}
