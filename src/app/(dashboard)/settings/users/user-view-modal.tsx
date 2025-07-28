'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as EditIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

export interface ProductModalProps {
  open: boolean;
  setEditOpen: any;
  close: any;
  data: any;
  setEditData: any;
}

export function UserViewModal({
  open,
  close,
  setEditData,
  data,
  setEditOpen,
}: ProductModalProps): React.JSX.Element | null {
  const router = useRouter();
  console?.log(data, 'data');

  const handleClick = () => {
    setEditOpen(true);
    close(false);
    setEditData(data);
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={() => close(false)}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
          <Typography variant="h6">View User Details</Typography>
          <IconButton onClick={() => close(false)}>
            <XIcon />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            display: 'flex',
            marginRight: '10px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '2px',
          }}
        >
          <IconButton
            onClick={() => handleClick()}
            sx={{ display: 'flex', width: 'full', flexDirection: 'row', alignItems: 'center', gap: '2px' }}
          >
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <EditIcon color="#6F2B8B" width="14px" height="14px" />
              <Typography variant="body2">Edit</Typography>
            </Stack>
          </IconButton>
        </Stack>

        <Stack spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <FormControl>
            <InputLabel>First Name</InputLabel>
            <OutlinedInput value={data?.firstName} disabled />
          </FormControl>

          <FormControl>
            <InputLabel>Last Name</InputLabel>
            <OutlinedInput value={data?.lastName} disabled />
          </FormControl>

          <FormControl>
            <InputLabel>Title</InputLabel>
            <OutlinedInput value={data?.title} disabled />
          </FormControl>

          <FormControl>
            <InputLabel>User Role</InputLabel>
            <OutlinedInput value={data?.role?.name} disabled />
          </FormControl>

          <FormControl>
            <InputLabel>Department</InputLabel>
            <OutlinedInput value={data?.department} disabled />
          </FormControl>

          <FormControl>
            <InputLabel>Email</InputLabel>
            <OutlinedInput value={data?.email} disabled />
          </FormControl>

          <FormControl>
            <InputLabel>Mobile</InputLabel>
            <OutlinedInput value={data?.mobile} disabled />
          </FormControl>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
