import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

export interface SummaryProps {
  amount: number;
  diff: number;
  icon: Icon;
  title: string;
  trend: 'up' | 'down';
}

export function Summary({ amount, diff, icon: Icon, title, trend }: SummaryProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Avatar
            sx={{
              '--Avatar-size': '48px',
              bgcolor: 'var(--mui-palette-background-paper)',
              boxShadow: 'var(--mui-shadows-8)',
              color: 'var(--mui-palette-text-primary)',
            }}
          >
            <Icon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
          <div>
            <Typography color="text.secondary" variant="body1">
              {title}
            </Typography>
            <Typography variant="h3">{new Intl.NumberFormat('en-US').format(amount)}</Typography>
          </div>
        </Stack>
      </CardContent>
     
    </Card>
  );
}
