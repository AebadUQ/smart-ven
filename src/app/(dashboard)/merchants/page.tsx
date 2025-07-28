'use client';

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  getdropdownByCategory,
  getMerchantCategories,
  getMerchantURL,
  
} from '@/services/merchantOffer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as EditIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { MerchantFilters } from './merchant-filters';
import MerchantModal from './MerchantModal';
import dayjs from 'dayjs';
interface PageProps {
  searchParams: { email?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
}
const Array = [
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

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const [location, setLocations] = React.useState([]);
    const [cardType, setCardType] = React.useState([]);
    
  const { email, phone, sortDir, status } = searchParams;
  const url = getMerchantURL();
  const { data, loading, onPaginationChange, onPageSizeChange, total, pageSize, pageIndex, onSort, filter, setFilter } =
    useListApi<any>(url, '');

  const fetchCategories = useCallback(async () => {
    try {
      const categoryData = await getMerchantCategories();
       const getdropdownData = await getdropdownByCategory("Wilayat,Card_Category");
            setLocations(getdropdownData?.data?.data?.Wilayat);
            setCardType(getdropdownData?.data?.data?.Card_Category);
      setCategories(categoryData.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  
  const handleEdit = (merchant: any) => {
    setSelectedMerchant(merchant);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMerchant(null);
  };

  const columns = [
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row.merchantName}
          </Typography>
        </Stack>
      ),
      name: 'NAME',
      width: '50px',
    },
    {
      formatter: (row): React.JSX.Element => {
        const categoryNames = row.merchantcategories?.map((category) => category.nameEN).join(', ');

        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              {categoryNames || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'CATEGORY',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row.merchantLocation?.toString()}
          </Typography>
        </Stack>
      ),
      name: 'LOCATION',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {/* {row.createdAt} */}
             {dayjs(row.createdAt).format('MMM D, YYYY')}
          </Typography>
        </Stack>
      ),
      name: 'ADDED DATE',
      width: '250px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => handleEdit(row)} size="small" sx={{ color: 'primary.main' }}>
            <EditIcon />
          </IconButton>
        </Stack>
      ),
      name: 'Actions',
      width: '100px',
      align: 'right',
    },
  ] satisfies ColumnDef<any>[];

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Merchants</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpen(true)} startIcon={<PlusIcon />} variant="contained">
              Add Merchant
            </Button>
          </Box>
        </Stack>
        <CustomersSelectionProvider customers={[]}>
          <Card>
            <MerchantFilters filters={filter} setFilters={setFilter} categories={categories} merchant={Array} />
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : data?.length ? (
                <DataTable<any> columns={columns} rows={data} />
              ) : (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                    No merchants found
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider />
            <CustomersPagination
              count={total}
              page={pageIndex}
              rowsPerPage={pageSize}
              onPaginationChange={(event, newPage) => onPaginationChange(newPage + 1)} // MUI 0-based index handle karega
              onRowsPerPageChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
            />
            ;
          </Card>
        </CustomersSelectionProvider>
      </Stack>
      <MerchantModal
        open={open}
        location={location}
        cardType={cardType}
        filters={filter}
        setFilter={setFilter}
        close={handleClose}
        merchantData={selectedMerchant}
        categories={categories}
        setCategories={setCategories}
      />
    </Box>
  );
}


