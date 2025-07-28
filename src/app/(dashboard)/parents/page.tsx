'use client';

import * as React from 'react';
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Button,
  TextField,
  Avatar,
  Chip,
} from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';

// Sample parent data
const sampleParents = [
  {
    id: 'parent-001',
    name: 'Amina Rauf',
    email: 'amina.rauf@gmail.com',
    phone: '0345-1234567',
    cnic: '42101-1234567-8',
    profession: 'Doctor',
    students: ['Ahmed Rauf', 'Sara Rauf'],
    status: 'Active',
    photoUrl: '/assets/avatar-1.png',
  },
  {
    id: 'parent-002',
    name: 'Imran Sheikh',
    email: 'imran.sheikh@gmail.com',
    phone: '0300-9876543',
    cnic: '42201-8765432-1',
    profession: 'Engineer',
    students: ['Bilal Sheikh'],
    status: 'Inactive',
    photoUrl: '/assets/avatar-2.png',
  },
  {
    id: 'parent-003',
    name: 'Nazia Khan',
    email: 'nazia.khan@yahoo.com',
    phone: '0321-4567890',
    cnic: '42301-4567890-3',
    profession: 'Teacher',
    students: ['Hassan Khan'],
    status: 'Active',
    photoUrl: '/assets/avatar-3.png',
  },
];

export default function ParentListPage() {
  const [filter, setFilter] = useState({ parentName: '' });

  const filteredData = sampleParents.filter((parent) =>
    parent.name.toLowerCase().includes(filter.parentName.toLowerCase())
  );

  return (
    <Box px={3} py={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={{ xs: 'start', sm: 'center' }}
        spacing={2}
        flexWrap="wrap"
      >
        <Typography variant="h6">Parent Accounts</Typography>
        <Button
          variant="contained"
          startIcon={<PlusIcon size={20} />}
          sx={{ minWidth: 160 }}
        >
          Add Parent
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box
        display="flex"
        alignItems="center"
        borderBottom="1px solid #DCDFE4"
        mb={2}
        pb={1}
      >
        <TextField
          variant="standard"
          placeholder="Search by Parent Name"
          value={filter.parentName}
          onChange={(e) =>
            setFilter({ ...filter, parentName: e.target.value })
          }
          inputProps={{ maxLength: 40 }}
          fullWidth
        />
      </Box>

      <Stack spacing={2}>
        {filteredData.length === 0 ? (
          <Typography>No parent found.</Typography>
        ) : (
          filteredData.map((parent) => (
            <Card key={parent.id} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={parent.photoUrl} alt={parent.name} sx={{ width: 48, height: 48 }} />
                <Box flex={1}>
                  <Typography fontWeight={600}>{parent.name}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {parent.email} | {parent.phone}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    CNIC: {parent.cnic} | Profession: {parent.profession}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Students: {parent.students.join(', ')}
                  </Typography>
                </Box>
                <Chip
                  label={parent.status}
                  color={parent.status === 'Active' ? 'success' : 'default'}
                  variant="outlined"
                />
              </Stack>
            </Card>
          ))
        )}
      </Stack>
    </Box>
  );
}
