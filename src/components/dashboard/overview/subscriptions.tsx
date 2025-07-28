'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight, ContactlessPayment, DotsThree } from '@phosphor-icons/react';

// Define alert type
export interface Alert {
  id: string;
  title: string;
  icon: string;
  status: 'new' | 'in_progress' | 'resolved';
}

export interface AlertSummaryProps {
  alerts: Alert[];
}

// Main AlertSummary component
export function AlertSummary({ alerts }: any): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <ContactlessPayment size={20} weight="regular" />
          </Avatar>
        }
        title="Alert Summary"
      />
      <CardContent sx={{ pb: '8px' }}>
        <List disablePadding>
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="secondary" endIcon={<ArrowRight size={16} />} size="small">
          See all alerts
        </Button>
      </CardActions>
    </Card>
  );
}

// Individual alert item
function AlertItem({ alert }: { alert: Alert }): React.JSX.Element {
  const { label, color } = (
    {
      new: { label: 'New', color: 'error' },
      in_progress: { label: 'In Progress', color: 'warning' },
      resolved: { label: 'Resolved', color: 'success' },
    } as const
  )[alert.status];

  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Avatar
          src={alert.icon}
          sx={{
            bgcolor: 'var(--mui-palette-background-paper)',
            boxShadow: 'var(--mui-shadows-8)',
            color: 'var(--mui-palette-text-primary)',
          }}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography noWrap variant="subtitle2">
            {alert.title}
          </Typography>
        }
      />
      <Chip color={color} label={label} size="small" variant="soft" />
      <IconButton>
        <DotsThree weight="bold" />
      </IconButton>
    </ListItem>
  );
}
