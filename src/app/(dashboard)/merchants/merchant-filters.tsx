'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFormsCategory } from '@/services/form.api';
import { Box, InputLabel, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

import { paths } from '@/paths';
import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';
import { Option } from '@/components/core/option';

export interface Filters {
  merchantName?: string;
  merchantCategory?: string;
  merchantLocation?: string;
  sort?: string;
}

export function MerchantFilters({ filters, setFilters, categories, merchant }: any): React.JSX.Element {
 
  const handleFilterChange = useCallback((key: keyof Filters, value?: string) => {
    setFilters((prev: Filters) => {
      const newFilters = { ...prev };
      if (!value) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasFilters = Object.values(filters || {}).some((val) => !!val);

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
          {/* Email Filter */}
          {/* <FilterButton
            displayValue={filters?.merchantName || ''}
            label="Merchant Name"
            onFilterApply={(value) => handleFilterChange('merchantName', value as string)}
            onFilterDelete={() => handleFilterChange('merchantName', '')}
            popover={<GenericFilterPopover field="merchantName" merchant={merchant} />}
            value={filters?.merchantName || ''}
          /> */}

          <FilterButton
            displayValue={
              filters?.merchantCategory
                ? categories.find((c: { id: number; nameEN: string }) => c.id === filters.merchantCategory)?.nameEN ||
                  ''
                : ''
            }
            label="Category"
            onFilterApply={(value) => handleFilterChange('merchantCategory', value as number)}
            onFilterDelete={() => handleFilterChange('merchantCategory', '')}
            popover={<GenericFilterPopover field="merchantCategory" categories={categories} />}
            value={filters?.merchantCategory || ''}
          />

          <FilterButton
            displayValue={filters?.merchantLocation || ''}
            label="Location"
            onFilterApply={(value) => handleFilterChange('merchantLocation', value as string)}
            onFilterDelete={() => handleFilterChange('merchantLocation', '')}
            popover={<GenericFilterSecondPopover field="merchantLocation" merchant={merchant} />}
            value={filters?.merchantLocation || ''}
          />

          {hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
        </Stack>
      </Stack>
    </div>
  );
}

// 📌 Generic Input Filter for Email & Form Name
// function GenericFilterPopover({ field }: { field: string }) {
//   const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
//   const [value, setValue] = useState(initialValue || '');

//   useEffect(() => {
//     setValue(initialValue || '');
//   }, [initialValue]);

//   return (
//     <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
//       <FormControl>
//         <OutlinedInput
//           onChange={(e) => setValue(e.target.value)}
//           onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
//           value={value}
//         />
//       </FormControl>
//       <Button onClick={() => onApply(value)} variant="contained">Apply</Button>
//     </FilterPopover>
//   );
// }

function GenericFilterPopover({ field, categories }: { field: string; categories: { id: number; nameEN: string }[] }) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState<number | string>(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <InputLabel>Select Category</InputLabel>
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value as number)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        >
          {categories?.map((cate) => (
            <MenuItem key={cate.id} value={cate.id}>
              {cate.nameEN}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={() => onApply(value)} variant="contained">
        Apply
      </Button>
    </FilterPopover>
  );
}

function GenericFilterSecondPopover({
  field,
  merchant,
}: {
  field: string;
  merchant: { id: number; label: string; value: string }[];
}) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);
  
  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <InputLabel>Select Category</InputLabel>

        <Select
          value={value}
          onChange={(e) => setValue(e.target.value as number)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        >
          {merchant?.map((cate: any) => (
            <MenuItem key={cate?.id} value={cate?.value}>
              {cate?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={() => onApply(value)} variant="contained">
        Apply
      </Button>
    </FilterPopover>
  );
}
