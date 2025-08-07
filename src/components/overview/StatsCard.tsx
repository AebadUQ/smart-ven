import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';

export interface StatsCardProps {
  value: number;
  icon: Icon;
  title: string;
  variant?: 'default' | 'active' | 'delayed' | 'missed';
}

export function StatsCard({
  value,
  icon: Icon,
  title,
  variant = 'default',
}: StatsCardProps): React.JSX.Element {
  const variantStyles: Record<
    NonNullable<StatsCardProps['variant']>,
    { cardBg: string; titleColor: string }
  > = {
    default: {
      cardBg: 'var(--mui-palette-background-paper)',
      titleColor: 'text.secondary',
    },
    active: {
      cardBg: '#CCFBEF',
      titleColor: '#15B79F',
    },
    delayed: {
      cardBg: '#FFF6EE',
      titleColor: '#DE7101',
    },
    missed: {
      cardBg: '#FEE4E2',
      titleColor: '#E40521',
    },
  };

  return (
    <Card sx={{ backgroundColor: variantStyles[variant].cardBg }}>
      <CardContent style={{ paddingBottom: '16px' }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
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
            <Typography
              color={variant === 'default' ? 'text.secondary' : variantStyles[variant].titleColor}
              variant="body1"
              sx={{
                ...(variant !== 'default' && { color: variantStyles[variant].titleColor }),
              }}
            >
              {title}
            </Typography>
            <Typography variant="h3">
              {new Intl.NumberFormat('en-US').format(value)}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
