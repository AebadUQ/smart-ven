'use client';

import * as React from 'react';
import { updateUserStatus } from '@/services/userSettings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';





interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  status: any;
  loading:any
  filter: any,
  setFilter: any,
  data:any
}

export const StatusModal: React.FC<DeleteConfirmationProps> = ({
  open,
  onClose,
  status,
  loading,
  filter,
  setFilter,
  data
}) => {
  
  const handleClick = async () => {
  


      try {
        await updateUserStatus(status?.id, !status.isActive);
        setFilter({...filter})
      } catch (error) {
        console.error('Error updating status:', error);
      }




    onClose();
  };

  return (
    <>
      {status.isActive === true ? (
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '450px',
              borderRadius: 2,
            },
          }}
        >
          <DialogContent sx={{ textAlign: 'center', pt: 4, px: 4 }}>
            
            <Typography variant="h5" component="h2" gutterBottom>
              Do You Want to Change Status
            </Typography>
            <Typography color="text.secondary">Are you sure you want to change your status?</Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" onClick={onClose} color="inherit" sx={{ minWidth: 100 }}>
              Cancel
            </Button>

            <Button
              // data-value={status?.isActive ? false : true}
              variant="contained"
              onClick={() => handleClick()}
              color={status?.isActive ? 'error' : 'success'}
              sx={{ minWidth: 100 }}
            >
              {status?.isActive ? 'inactive' : 'active'}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '450px',
              borderRadius: 2,
            },
          }}
        >
          <DialogContent sx={{ textAlign: 'center', py: 5, px: 4,display:'flex', flexDirection:'column', gap:"18px"}}>
            
            <Typography variant="h5" component="h2" gutterBottom>
              Do You want To Activate ?
            </Typography>
            <Typography color="text.secondary">An email has been sent to the user to complete the activation process</Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" onClick={onClose} color="inherit" sx={{ minWidth: 100 }}>
              Cancel
            </Button>

            <Button
              // data-value={status?.isActive ? false : true}
              variant="contained"
              onClick={() => handleClick()}
              color={status?.isActive ? 'error' : 'success'}
              sx={{ minWidth: 100 }}
            >
              {status?.isActive ? 'inactive' : 'active'}
            </Button>
          </DialogActions>
          
        </Dialog>
      )}
    </>
    
  );
};
