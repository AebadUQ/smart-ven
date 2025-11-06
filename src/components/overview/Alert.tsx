'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { BagSimple as BagSimpleIcon } from '@phosphor-icons/react/dist/ssr/BagSimple';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import { RootState, AppDispatch } from '@/store';
import { getAllComplaints } from '@/store/reducers/complaint-management';
import { useRouter } from 'next/navigation';

// Notification Card
interface Notification {
  _id: string;
  issueType: string;
  description: string;
  driverName: string;
  vanCarNumber: string;
  createdAt: string;
}

const NotificationCard: React.FC<Notification> = ({
  issueType,
  description,
  driverName,
  vanCarNumber,
  createdAt,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderColor: '#2D9CDB',
        backgroundColor: '#E5F1FF',
        p: 2,
        display: 'flex',
        gap: 2,
        borderRadius: 2,
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ bgcolor: '#2D9CDB' }}>{driverName[0]}</Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {issueType}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          {description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {driverName} - {vanCarNumber} | {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>

      {/* <IconButton size="small" sx={{ color: 'text.secondary' }}>
        <ArrowForwardIosIcon />
      </IconButton> */}
    </Paper>
  );
};

// Alert Component
export const Alert: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { complaints, loading } = useSelector((state: RootState) => state.complaint);

  useEffect(() => {
    dispatch(getAllComplaints({ page: 1, limit: 4 }));
  }, [dispatch]);

  const displayedComplaints = complaints?.slice(0, 4) || [];

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <BagSimpleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        action={
          <Button
            color="secondary"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => router.push('/dashboard/path/tracking')}
          >
            View All
          </Button>
        }
        title="Tickets & Complaints"
        sx={{ pt: 2 }}
      />
      <Divider />

      <Box display="flex" flexDirection="column" gap={2} p={2}>
        {loading ? (
          <Typography sx={{ p: 2 }}>Loading...</Typography>
        ) : displayedComplaints.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            No complaints available
          </Typography>
        ) : (
          displayedComplaints.map((note) => <NotificationCard key={note._id} {...note} />)
        )}
      </Box>
    </Card>
  );
};
