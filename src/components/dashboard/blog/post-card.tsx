import * as React from 'react';
import RouterLink from 'next/link';
import { OfferViewModal } from '@/app/(dashboard)/offers/ViewModal';
import { updateOfferStatus } from '@/services/merchantOffer';
import { Box, CardHeader, Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';



import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';



import type { Post } from './types';
// import { EditViewModal } from '@/app/(dashboard)/offers/view-edit-modal';
import { usePopover } from '@/hooks/use-popover';


interface PostCardProps {
  post: Post;
  setPostData: any;
  setOpen: any;
  viewdata: any,
  setViewdata: any;
  editData: any,
  setEditData:any

}

export function PostCard({ post, setPostData, setOpen,viewdata,setViewdata,editData,setEditData}: PostCardProps): React.JSX.Element {

  // const [openModal, setOpenModal] = React.useState(false);
  setPostData(post)
  const [isActive, setIsActive] = React.useState(post?.isActive || false);
  const popover = usePopover<HTMLButtonElement>();
  const handleToggle = async () => {
    try {
      const newStatus = !isActive;
      setIsActive(newStatus); // Optimistic UI update

      // Call API to update status
      await updateOfferStatus(post?.id, newStatus);
      

     
    } catch (error) {
      console.error('Failed to update status', error);
      setIsActive(!isActive); // Revert UI if API fails
    }
  };
  

  return (
    <Card
      sx={{
        paddingX: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
          <DotsThreeIcon weight="bold" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Card Image */}
        <CardMedia
  
          image={post?.Merchant?.image || '/assets/offer-default.png'}
          sx={{
            height: '215px',
            borderRadius: '16px',
            border: '1px solid #EAECEF',
            objectFit: 'cover',
          }}

        />

        <CardContent sx={{ padding: '0px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Toggle Switch */}
            <Stack
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px', marginBottom: '10px' }}
            >
              <Switch color="success" checked={isActive} onChange={handleToggle} />
              <Typography>{isActive ? 'Enable' : 'Disable'}</Typography>
            </Stack>

            {/* Post Details */}
            <Stack sx={{ width: '203px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography variant="body1">{post?.MerchantCategory?.nameEN}</Typography>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.cardTypes.toString()}</Typography>
              <Typography variant="body2">{post?.offerLocation?.toString()}</Typography>
              <Typography variant="body2">{dayjs(post?.validityEndDate).format('MMM D, YYYY')}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Box>

      {/* Offer Modal */}
      {/* <EditViewModal  anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} post={post} setOpen={setOpen} setViewdata={setViewdata} viewdata={viewdata} editData={editData} setEditData={setEditData} /> */}
    </Card>
  );
}
