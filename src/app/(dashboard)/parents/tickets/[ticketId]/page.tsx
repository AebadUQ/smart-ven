"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { paths } from '@/paths';

export default function TicketDetailPage(): React.JSX.Element {
  const router = useRouter();
  const [status, setStatus] = React.useState('In Progress');
  const [internalNote, setInternalNote] = React.useState('');
  const [history, setHistory] = React.useState([
    { time: '2025-07-01 09:00', status: 'New', note: 'Ticket created by parent' },
    { time: '2025-07-01 10:30', status: 'In Progress', note: 'Assigned to transport dept.' },
  ]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setHistory((prev) => [
      ...prev,
      {
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: newStatus,
        note: `Status changed to ${newStatus}`,
      },
    ]);
  };

  const handleAddNote = () => {
    if (!internalNote.trim()) return;
    setHistory((prev) => [
      ...prev,
      {
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status,
        note: internalNote,
      },
    ]);
    setInternalNote('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button startIcon={<ArrowLeftIcon />} onClick={() => router.back()}>
        Back to Tickets
      </Button>

      <Stack spacing={3} mt={3}>
        <Card>
          <CardHeader
            avatar={<Avatar src="/assets/avatar-3.png" />}
            title="Parent: Ahmed Shaikh"
            subheader="Linked Student: Aebad ul Quadir"
          />
          <CardContent>
            <Typography variant="h6">Subject: Van delay issue</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              The van arrived 30 minutes late today. This has been happening often.
            </Typography>
            <Box mt={2}>
              <Chip label={status} color={status === 'Resolved' ? 'success' : status === 'Rejected' ? 'error' : 'warning'} />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Manage Ticket" />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                select
                label="Update Status"
                SelectProps={{ native: true }}
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </TextField>

              <TextField
                label="Internal Note"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                multiline
                rows={3}
                placeholder="e.g. Parent called again. Escalated to admin."
              />
              <Button variant="contained" onClick={handleAddNote}>
                Add Note
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Ticket History" />
          <CardContent>
            <Stack spacing={2} divider={<Divider />}>
              {history.map((entry, idx) => (
                <Box key={idx}>
                  <Typography variant="subtitle2">{entry.time}</Typography>
                  <Typography variant="body2" color="text.primary">
                    {entry.note}
                  </Typography>
                  <Chip
                    label={entry.status}
                    size="small"
                    sx={{ mt: 0.5 }}
                    color={entry.status === 'Resolved' ? 'success' : entry.status === 'Rejected' ? 'error' : 'default'}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
