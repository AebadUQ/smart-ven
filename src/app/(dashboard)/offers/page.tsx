'use client';

import * as React from 'react';
import { useState } from 'react';
import { getMerchantCategories, getOfferURL } from '@/services/merchantOffer';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import useListApi from '@/hooks/useListApi';
import { PostCard } from '@/components/dashboard/blog/post-card';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';

import { OfferFilters } from './offer-filters';
import OfferModal from './OfferModal';
import { EditViewModal } from './view-edit-modal';

export default function Page(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  // const [isDone, setIsDone] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = React.useState([]);
  const [viewdata, setViewdata] = React.useState<null>(null);
  const [editData, setEditData] = React.useState<null>(null);
  const url = getOfferURL();
  const { data, loading, onPaginationChange, onPageSizeChange, total, pageSize, pageIndex, onSort, filter, setFilter } =
    useListApi<any>(url, '');
  const [postData, setPostData] = React.useState<any>({});

  const fetchCategories = React.useCallback(async () => {
    try {
      const categoryData = await getMerchantCategories();
      setCategories(categoryData.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const locationArray = [
    { id: '1', label: 'Muscat', value: 'Muscat' },
    { id: '2', label: 'Nizwa', value: 'Nizwa' },
    { id: '3', label: 'Salalah', value: 'Salalah' },
    { id: '4', label: 'Seeb', value: 'Seeb' },
    { id: '5', label: 'Muttrah', value: 'Muttrah' },
    { id: '6', label: 'Karachi', value: 'Karachi' },
    { id: '7', label: 'Skardu', value: 'Skardu' },
    { id: '8', label: 'NYC', value: 'NYC' },
    { id: '8', label: 'Naran', value: 'Naran' },
  ];
  const card = [
    {
      id: '1',
      value: 'Debit Cards',
      label: 'Debit Cards',
    },
    {
      id: '2',
      value: 'Credit Cards',
      label: 'Credit Cards',
    },
  ];

  return (
    <Box
      sx={{
        paddingX: '24px',
        paddingTop: '24px',
        paddingBottom: '64px',
      }}
    >
      <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Offers</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
              startIcon={<PlusIcon />}
              variant="contained"
            >
              Add Offer
            </Button>
          </Box>
        </Stack>
        <Card
          sx={{
            borderRadius: '10px',
            boxShadow: 'var(--mui-shadows-16)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack>
            <Divider />
            <OfferFilters
              filters={filter}
              setFilters={setFilter}
              categories={categories}
              merchant={locationArray}
              card={card}
            />
            <Divider />
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid
                container
                spacing={2.5}
                sx={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '16px' }}
                size={3}
              >
                {data?.map((post) => (
                  <>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={post?.id}>
                      <PostCard
                        post={post}
                        edit={edit}
                        setEdit={setEdit}
                        setPostData={setPostData}
                        setOpen={setOpen}
                        viewdata={viewdata}
                        setViewdata={setViewdata}
                        editData={editData}
                        setEditData={setEditData}
                      />
                    </Grid>
                  </>
                ))}
              </Grid>
            )}

            <Divider />
            <CustomersPagination
              count={total}
              page={pageIndex}
              rowsPerPage={pageSize}
              onPaginationChange={(event, newPage) => onPaginationChange(newPage + 1)} // MUI 0-based index handle karega
              onRowsPerPageChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
            />
          </Stack>
        </Card>
      </Stack>
      <OfferModal filter={filter} setFilter={setFilter} open={open} close={setOpen} data={editData} />
    </Box>
  );
}
