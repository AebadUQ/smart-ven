'use client';

import * as React from 'react';
import { assignJob } from '@/services/jobs.api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { toast } from '@/components/core/toaster';;

interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  status: any[];
  setData: any;
  data: any;
  candidateType?: string;
}

export const AssignVacancyModal: React.FC<DeleteConfirmationProps> = ({
  open,
  onClose,
  status,
  setData,
  data,
  candidateType,

}) => {

  const [selectedStatus, setSelectedStatus] = React.useState("");

  const [loading, setLoading] = React.useState(false);
    

  const handleStatusChange = async (jobPostId: number) => {
    if (!data?.id) return;

    setLoading(true);


    try {
       await assignJob(
        {
          "generalCandidateId":data?.id,
          "jobPostId":jobPostId,
          "type": candidateType
        }
        );
        
        // remove the element with matching id
      setData((prev: any[]) =>
      prev.filter((user: any) => user.id !== data.id)
    );
    toast.success("Applicant successfully assigned to the vacancy");
    setLoading(false);
    onClose();
    } catch (error) {
      setLoading(false);
      console.error('Status update failed', error);
      toast.error(error?.response?.data?.message || "some thing went wrong");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 480,
          borderRadius: 3,
          // p: 2,
        },
      }}
    >
      <DialogTitle
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
    pb: 1,
  }}
>
Application Status

  <IconButton
    aria-label="close"
    onClick={onClose}
    sx={{ color: (theme) => theme.palette.grey[500] }}
  >
    <CloseIcon />
  </IconButton>
</DialogTitle>


      <DialogContent sx={{ textAlign: 'center', px: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ flexDirection: 'column', gap: 2, px: 3, pb: 3 }}>
  <FormControl fullWidth>
    <InputLabel>Select vacancy</InputLabel>
    <Select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      disabled={loading}
    >
      {status.map((elem) => (
        <MenuItem key={elem.id} value={elem.id}>
          {`${elem?.jobCategory?.name} < ${elem?.positionName}`}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <Button
    variant="contained"
    onClick={() => handleStatusChange(Number(selectedStatus))}
    disabled={loading || !selectedStatus}
    fullWidth
  >
    Assign Vacancy
  </Button>
</DialogActions>
    </Dialog>
  );
};
