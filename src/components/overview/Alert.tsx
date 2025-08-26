'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { BagSimple as BagSimpleIcon } from '@phosphor-icons/react/dist/ssr/BagSimple';
import { IconButton } from '@mui/material';

export interface Product {
  id: string;
  name: string;
  image?: string;
  category: string;
  sales: number;
}

export interface ProductsProps {
  list?: Product[];
}

type Variant = 'error' | 'info' | 'success' | 'warning';

interface Notification {
  id: number;
  variant: Variant;
  title: string;
  description: string;
  date: string;
}

const variantStyles: Record<
  Variant,
  { borderColor: string; backgroundColor: string; icon: JSX.Element }
> = {
  error: {
    borderColor: '#de3e3e',
    backgroundColor: '#feeae9',
    icon: <ErrorIcon sx={{ color: '#de3e3e' }} />,
  },
  info: {
    borderColor: '#1a73e8',
    backgroundColor: '#d7e7ff',
    icon: <InfoIcon sx={{ color: '#1a73e8' }} />,
  },
  success: {
    borderColor: '#4caf50',
    backgroundColor: '#d7f2dc',
    icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />,
  },
  warning: {
    borderColor: '#f7b900',
    backgroundColor: '#fef6d3',
    icon: <WarningIcon sx={{ color: '#f7b900' }} />,
  },
};

const notifications: Notification[] = [
  {
    id: 1,
    variant: 'error',
    title: 'Notification Title',
    description: 'notification description',
    date: '26 May, 2025 - 08:59 AM',
  },
  {
    id: 2,
    variant: 'info',
    title: 'Notification Title',
    description: 'notification description',
    date: '26 May, 2025 - 08:59 AM',
  },
  {
    id: 3,
    variant: 'success',
    title: 'Notification Title',
    description: 'notification description',
    date: '26 May, 2025 - 08:59 AM',
  },
  {
    id: 4,
    variant: 'warning',
    title: 'Notification Title',
    description: 'notification description',
    date: '26 May, 2025 - 08:59 AM',
  },
];

const stats = [
  { label: 'Total Tickets', value: 125, bg: '#F0F7FF' },
  { label: 'Open', value: 75, bg: '#FFF6E0' },
  { label: 'Resolved', value: 50, bg: '#E5FFE5' },
];

const NotificationCard: React.FC<Omit<Notification, 'id'>> = ({
  variant,
  title,
  description,
  date,
}) => {
  const styles = variantStyles[variant] || variantStyles.info;

  return (
    <Paper
      variant="outlined"
      sx={{
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        p: 2,
        display: 'flex',
        gap: 2,
        borderRadius: 2,
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>{styles.icon}</Box>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          {description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
      </Box>

<IconButton size="small" sx={{ color: 'text.secondary' }}>
  <ArrowForwardIosIcon />
</IconButton>    </Paper>
  );
};

export const Alert: React.FC<ProductsProps> = ({ list }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <BagSimpleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        action={
          <Button color="secondary" size="small" sx={{ mt: 1 }}>
            View all
          </Button>
        }
        title="Tickets & Complaints"
        sx={{ pt: 2 }}
      />
      <Divider />
     
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        {notifications.map(({ id, ...note }) => (
          <NotificationCard key={id} {...note} />
        ))}
      </Box>
      {/* Uncomment if you want to use the DataTable component */}
      {/* <Box sx={{ overflowX: 'auto', '--mui-palette-TableCell-border': 'transparent' }}>
        <DataTable<Product> columns={columns} hideHead rows={list} />
      </Box> */}
    </Card>
  );
};
