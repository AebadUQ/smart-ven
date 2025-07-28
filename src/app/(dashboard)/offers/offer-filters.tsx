'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';

export interface Filters {
  merchantName?: string;
  merchantCategory?: string;
  card?: string;
  merchantLocation?: string;
  sort?: string;
}

export function OfferFilters({ filters, setFilters, categories, merchant, card }: any): React.JSX.Element {
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
          <FilterButton
            displayValue={
              filters?.merchantCategory
                ? categories.find((c: { id: number; nameEN: string }) => c.id === filters.merchantCategory)?.nameEN ||
                  ''
                : ''
            }
            label="Category"
            onFilterApply={(value) => handleFilterChange('merchantCategory', value as string)}
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

          <FilterButton
            displayValue={filters?.card || ''}
            label="Cards"
            onFilterApply={(value) => handleFilterChange('card', value as string)}
            onFilterDelete={() => handleFilterChange('card', '')}
            popover={<GenericFilterThirdPopover field="card" card={card} />}
            value={filters?.merchantLocation || ''}
          />

          {hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
        </Stack>
      </Stack>
    </div>
  );
}



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

function GenericFilterThirdPopover({
  field,
  card,
}: {
  field: string;
  card: { id: string; label: string; value: string }[];
}) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <InputLabel>Select Card</InputLabel>

        <Select
          value={value}
          onChange={(e) => setValue(e.target.value as number)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        >
          {card?.map((cate: any) => (
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
