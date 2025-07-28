import * as React from 'react'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

export function Summary(): React.JSX.Element {
  return (
    <Card>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          p: 3,
        }}
      >
        {/* Active/Inactive Vans */}
        <Stack spacing={1} sx={{ borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' }, borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' }, pb: { xs: 2, md: 0 } }}>
          <Typography color="text.secondary">Active Vans</Typography>
          <Typography variant="h3">42</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="success.main" component="span" variant="subtitle2">+12%</Typography> vs last week
            </Typography>
          </Stack>
        </Stack>

        {/* Driver Availability */}
        <Stack spacing={1} sx={{ borderRight: { xs: 'none', lg: '1px solid var(--mui-palette-divider)' }, borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' }, pb: { xs: 2, md: 0 } }}>
          <Typography color="text.secondary">Drivers Available</Typography>
          <Typography variant="h3">18</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="success.main" component="span" variant="subtitle2">+6%</Typography> improvement
            </Typography>
          </Stack>
        </Stack>

        {/* Student & Parent Onboarding */}
        <Stack spacing={1} sx={{ borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' }, borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' }, pb: { xs: 2, md: 0 } }}>
          <Typography color="text.secondary">Onboarded Students & Parents</Typography>
          <Typography variant="h3">728</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="success.main" component="span" variant="subtitle2">+9%</Typography> this month
            </Typography>
          </Stack>
        </Stack>

        {/* Trip Success Rate */}
        <Stack spacing={1}>
          <Typography color="text.secondary">Trip Success Rate (Weekly)</Typography>
          <Typography variant="h3">96.5%</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="error.main" component="span" variant="subtitle2">-1.2%</Typography> vs last week
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}