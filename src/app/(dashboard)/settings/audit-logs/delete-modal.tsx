'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '450px',
          borderRadius: 2
        }
      }}
    >
      <DialogContent sx={{ textAlign: 'center', pt: 4, px: 4 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: 'error.lighter',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            mb: 2
          }}
        >
          <TrashIcon size={28} color="var(--mui-palette-error-main)" />
        </Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Delete Alert
        </Typography>
        <Typography color="text.secondary">
          Are you sure you want to delete your Log?
        </Typography>
        <Typography color="text.secondary">
          All of your data will be permanently removed.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          color="inherit"
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color="error"
          sx={{ minWidth: 100 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};