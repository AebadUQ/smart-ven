'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';



import { dayjs } from '@/lib/dayjs';
import { Presence } from '@/components/core/presence';



import { OfferViewModal } from './ViewModal';


export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastActivity?: Date;
}



export interface ContactsPopoverProps {
  anchorEl: null | Element;
  contacts?: Contact[];
  onClose?: () => void;
  open?: boolean;
  post: any,
  setOpen: any,
  setViewdata: any,
  viewdata: any,
  editData: any,
  setEditData:any
}

export function EditViewModal({ anchorEl, onClose, open = false, post, setOpen, setViewdata,viewdata,setEditData}: ContactsPopoverProps): React.JSX.Element {



  const [openModal, setOpenModal] = React.useState(false);
  const handleView = () => {
    setViewdata(post);
    setOpenModal(true);
  }
  const handleEdit = () => {

    setEditData(post);
    setOpen(true);
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Box
        sx={{
          maxHeight: '200px',
          overflowY: 'auto',
          px: 1,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography ><Button onClick={()=>handleView()}>View Offer</Button></Typography>
        <Typography ><Button onClick={()=>handleEdit()}>Edit Offer</Button></Typography>
      </Box>
      { viewdata && <OfferViewModal open={openModal} close={() => setOpenModal(false)} data={viewdata} key={post?.id}  />}
    </Popover>
  );
}
