'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

import { getFormsByDashboard } from '@/services/form.api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

import { dayjs } from '@/lib/dayjs';
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
    const res = await getFormsByDashboard();
    setEventData(res?.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card sx={{ height: '100%' }}>

      <CardHeader
        avatar={
          <Box
            alt="Not found"
            component="img"
            src="/assets/dashboard/form-response-icon.svg"
          />
        }
        title="Form Responses"
        sx={{ py: 2, px: '16px' }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: "30px", p: 0}}>
        
        <CardContent sx={{p: 0}}>
          <List disablePadding>
            {eventData?.slice(0, 8)?.map((event) => <EventItem event={event} key={event.id} />)}
          </List>
        </CardContent>

        <Box >

          <Divider />

          <CardActions>
            <Button
              onClick={() => router.push(paths.dashboard.form)}
              color="secondary"
              endIcon={<ArrowRightIcon />}
              size="small"
              sx={{ mt: 0.5 }}
            >
              See all responses
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
    <ListItem disableGutters key={event.id} sx={{"&:hover": {cursor: 'pointer'}, py: "13px", px: "16px",}}>

      <ListItemAvatar sx={{}}>
        <Box
          sx={{flex: '0 0 auto', textAlign: 'center',}}
        >
          <Typography variant="caption">{dayjs(event?.createdAt).format('MMM').toUpperCase()}</Typography>
          <Typography variant="h6">{dayjs(event?.createdAt).format('D')}</Typography>
        </Box>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={
          <Typography noWrap variant="subtitle2" fontWeight={600}>
            {event?.email}
          </Typography>
        }
        secondary={
          <Typography color="text.secondary" noWrap variant="body2">
            {event?.form_name}
          </Typography>
        }
      />

    </ListItem>
  );
}
