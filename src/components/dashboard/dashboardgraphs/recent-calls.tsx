'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

import { getRecentCallsByDashboard } from '@/services/form.api';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { paths } from '@/paths';


export interface Event {
  id: string;
  email: string;
  form_name: string;
  createdAt: Date;
}

export interface EventsProps {
  events: Event[];
}

export default function Events(): React.JSX.Element {
  const router = useRouter(); // Initialize useRouter
  const [eventData, setEventData] = useState([]);

  const fetchData = async () => {
    const res = await getRecentCallsByDashboard();
    setEventData(res?.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card sx={{ height: "100%", overflow: "hidden" }}>
      <CardHeader

        avatar={
          <Box
            alt="Not found"
            component="img"
            src="/assets/dashboard/form-response-icon.svg"

          />
        }
        title="Recent Calls"
        sx={{ p: 2 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: "0px", justifyContent: "space-between" }}>
        <CardContent sx={{ p: 0 }}>
          <List sx={{ py: "8px", px: "16px" }} >
            {eventData?.slice(0, 8)?.map((event) => <EventItem event={event} key={event.id} />)}
          </List>
        </CardContent>

        <Box>
          <Divider />
          <CardActions sx={{ p: "16px" }}>
            <Button
              onClick={() => router.push(paths.dashboard.callCenter)}
              color="secondary"
              endIcon={<ArrowRightIcon />}
              size="small"
              sx={{ mt: 0.5 }}
            >
              See all Calls
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}

export interface EventItemProps {
  event: Event;
}

function EventItem({ event }: EventItemProps): React.JSX.Element {
  return (
    <ListItem disableGutters key={event.id} sx={{
      "&:hover": {
        cursor: 'pointer'
      },
    }}>

      <ListItemText
        disableTypography
        primary={
          <Typography noWrap variant="subtitle2" fontWeight={600}>
            {event?.User?.firstName + " " + event?.User?.lastName}
          </Typography>
        }
        secondary={
          <Typography color="text.secondary" noWrap variant="body2">
            {event?.User.email}
          </Typography>
        }
      />
    </ListItem>
  );
}
