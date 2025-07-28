'use client';

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { createOffer, getMerchant, updateOffer } from '@/services/merchantOffer';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';



import { dayjs } from '@/lib/dayjs';





export interface ProductModalProps {
  open: boolean;
  close: any;
  productId?: string;
  filter?: any;
  setFilter?: any;
  data?: any; // Added missing data prop
}

const schema = z.object({
  merchantId: z.string().min(1, 'Merchant is required'),
  categoryId: z.string().min(1, 'Category is required'),
  cardTypes: z.array(z.string()).min(1, 'Select at least one card type'),
  offerLocation: z.array(z.string()).min(1, 'Select at least one location type'),
  title: z.string().min(1, 'Offer title is required'),
  validityStartDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, 'Start date is required'),
  validityEndDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, 'End date is required'),
  offerDescription: z.string().min(1, 'Offer details are required'),
  termsAndCondition: z.string().min(1, 'Terms & Conditions are required'),
});

export default function OfferModal({ open, close, filter, setFilter, data }: ProductModalProps) {
  const isEditMode = !!data?.id;
  const [merchant, setMerchants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const limit = 10;
const isFetchingRef = React.useRef(false);
const [searchText, setSearchText] = useState('');

// const loadMoreMerchants = async () => {
//   try {
//     isFetchingRef.current = true;
//     const res = await getMerchant(page, limit);
//     const newMerchants = res?.data?.data || [];

//     if (newMerchants.length < limit) {
//       setHasMore(false);
//     }

//     setMerchants((prev) => [...prev, ...newMerchants]);
//     setPage((prev) => prev + 1);
//     isFetchingRef.current = false;
//   } catch (error) {
//     console.error('Error loading merchants:', error);
//     isFetchingRef.current = false;
//   }
// };
const loadMoreMerchants = async (reset = false, newSearch = searchText) => {
  try {
    isFetchingRef.current = true;
    const res = await getMerchant(reset ? 1 : page, limit, newSearch);
    const newMerchants = res?.data?.data || [];

    if (newMerchants.length < limit) setHasMore(false);
    if (reset) {
      setMerchants(newMerchants);
      setPage(2);
    } else {
      setMerchants((prev) => [...prev, ...newMerchants]);
      setPage((prev) => prev + 1);
    }

    isFetchingRef.current = false;
  } catch (error) {
    console.error('Error loading merchants:', error);
    isFetchingRef.current = false;
  }
};
const handleSearchChange = (event, value) => {
  setSearchText(value);
  setHasMore(true);
  loadMoreMerchants(true, value); // reset pagination
};

const handleScroll = (e) => {
  const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 20;
  if (bottom && hasMore && !isFetchingRef.current) {
    loadMoreMerchants();
  }
};

  const handleMerchantSelection = (merchantId: string) => {
    const selectedMerchant = merchant.find((elem: any) => elem.id.toString() === merchantId);
    setCategories(selectedMerchant?.merchantcategories || []);
    setLocation(selectedMerchant?.merchantLocation || []);
  };
console.log("merchants",merchant)
  const fetchCategories = useCallback(async () => {
    try {
      const getMerchants = await getMerchant();
      setMerchants(getMerchants.data.data);

      // If in edit mode and merchant data exists, set categories and locations
      if (isEditMode && data?.Merchant?.id) {
        const selectedMerchant = getMerchants.data.data.find(
          (elem: any) => elem.id.toString() === data.Merchant.id.toString()
        );
        setCategories(selectedMerchant?.merchantcategories || []);
        setLocation(selectedMerchant?.merchantLocation || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [isEditMode, data?.Merchant?.id]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      merchantId: '',
      categoryId: '',
      cardTypes: [],
      offerLocation: [],
      title: '',
      validityStartDate: null,
      validityEndDate: null,
      offerDescription: '',
      termsAndCondition: '',
    },
  });

  const preparedUpdatedValues = (values: any) => {
    return {
      merchantId: values?.merchantId,
      categoryId: values?.categoryId,
      cardTypes: values?.cardTypes,
      offerLocation: values?.offerLocation,
      title: values?.title,
      validityStartDate: values?.validityStartDate,
      validityEndDate: values?.validityEndDate,
      offerDescription: values?.offerDescription,
      termsAndCondition: values?.termsAndCondition,
    };
  };

  useEffect(() => {
    if (open) {
      if (isEditMode) {
        reset({
          merchantId: data?.Merchant?.id.toString() || '',
          categoryId: data?.categoryId.toString() || '',
          cardTypes: data?.cardTypes || [],
          offerLocation: data?.offerLocation || [],
          title: data?.title || '',
          validityStartDate: data?.validityStartDate ? dayjs(data.validityStartDate).toDate() : null,
          validityEndDate: data?.validityEndDate ? dayjs(data.validityEndDate).toDate() : null,
          offerDescription: data?.offerDescription || '',
          termsAndCondition: data?.termsAndCondition || '',
        });

      } else {
        reset({
          merchantId: '',
          categoryId: '',
          cardTypes: [],
          offerLocation: [],
          title: '',
          validityStartDate: null,
          validityEndDate: null,
          offerDescription: '',
          termsAndCondition: '',

        });
        setCategories([]), setLocation([]);
      }
    }
  }, [open, isEditMode, reset,  data?.Merchant?.id]);

  const onSubmit = async (values: any) => {
    const formattedData = {
      ...values,
      merchantId: parseInt(values.merchantId, 10),
      categoryId: parseInt(values.categoryId, 10),
    };

    try {
      if (isEditMode) {
        if (!data.id) {
          console.error('Error: Offer is missing or invalid!');
          return;
        }
        // Update api will be called here
        const updatedData = { ...preparedUpdatedValues(values) };
        await updateOffer(data.id, updatedData)
        setFilter({ ...filter, name: data?.title });
        setTimeout(() => close(false), 1500);
      } else {
        const response = await createOffer(formattedData);
        setFilter({ ...filter, name: data?.title });
        close(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('something went wrong');
    }
  };

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={() => close(false)}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { width: 750, padding: 2 },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{isEditMode ? 'Edit Offer' : 'Create Offer'}</Typography>
          <IconButton onClick={() => close(false)}>
            <XIcon />
          </IconButton>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
         <FormControl fullWidth error={!!errors.merchantId}>
  <Controller
    name="merchantId"
    control={control}
    render={({ field }) => (
      <Autocomplete
        options={merchant}
        getOptionLabel={(option) => option?.merchantName || ''}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        value={merchant.find((m) => m.id.toString() === field.value) || null}
        onInputChange={handleSearchChange}
        onChange={(_, newValue) => {
          const selectedId = newValue?.id?.toString() || '';
          field.onChange(selectedId);
          handleMerchantSelection(selectedId);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Merchant"
            error={!!errors.merchantId}
            helperText={errors.merchantId?.message}
          />
        )}
        ListboxProps={{
          onScroll: handleScroll,
          style: { maxHeight: 300, overflowY: 'auto' },
        }}
      />
    )}
  />
  {errors.merchantId && <FormHelperText>{errors.merchantId.message}</FormHelperText>}
</FormControl>


            <FormControl fullWidth error={!!errors.categoryId}>
              <InputLabel>Select Category</InputLabel>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Select Category">
                    {categories?.map((elem: any, key) => (
                      <MenuItem key={key} value={elem.id.toString()}>
                        {elem.nameEN}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.categoryId && <FormHelperText>{errors.categoryId.message}</FormHelperText>}
            </FormControl>

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Offer Title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <FormControl fullWidth error={!!errors.cardTypes}>
              <InputLabel>Select Card Types</InputLabel>
              <Controller
                name="cardTypes"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    input={<OutlinedInput label="Select Card Types" />}
                    renderValue={(selected) => (
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Stack>
                    )}
                  >
                    <MenuItem value="Credit Cards">Credit Cards</MenuItem>
                    <MenuItem value="Debit Cards">Debit Cards</MenuItem>
                  </Select>
                )}
              />
              {errors.cardTypes && <FormHelperText>{errors.cardTypes.message}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={!!errors.offerLocation}>
              <InputLabel>Select Location</InputLabel>
              <Controller
                name="offerLocation"
                control={control}
                render={({ field }) => (
                  <Select {...field} multiple label="Select Location" >
                    {location?.map((elem, key) => (
                      <MenuItem key={key} value={elem}>
                        {elem}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.offerLocation && <FormHelperText>{errors.offerLocation.message}</FormHelperText>}
            </FormControl>

            <Stack direction="row" spacing={2}>
              <Controller
                name="validityStartDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    minDate={dayjs().add(1, 'day').startOf('day')}
                    {...field}
                    format="DD/MM/YYYY"
                    label="Validity Start Date"
                    onChange={(date) => {
                      field.onChange(date?.toDate());
                    }}
                    slotProps={{
                      textField: {
                        error: Boolean(errors.validityStartDate),
                        fullWidth: true,
                        helperText: errors.validityStartDate?.message,
                      },
                    }}
                    value={dayjs(field.value)}
                  />
                )}
              />

              <Controller
                name="validityEndDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    minDate={dayjs().add(1, 'day').startOf('day')}
                    {...field}
                    format="DD/MM/YYYY"
                    label="Validity End Date"
                    onChange={(date) => {
                      field.onChange(date?.toDate());
                    }}
                    slotProps={{
                      textField: {
                        error: Boolean(errors.validityEndDate),
                        fullWidth: true,
                        helperText: errors.validityEndDate?.message,
                      },
                    }}
                    value={dayjs(field.value)}
                  />
                )}
              />
            </Stack>
            <Controller
              name="offerDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={2}
                  label="Offer Details"
                  error={!!errors.offerDescription}
                  helperText={errors.offerDescription?.message}
                />
              )}
            />

            <Controller
              name="termsAndCondition"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={2}
                  label="Terms & Conditions"
                  error={!!errors.termsAndCondition}
                  helperText={errors.termsAndCondition?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? 'Update Offer' : 'Create Offer'}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
