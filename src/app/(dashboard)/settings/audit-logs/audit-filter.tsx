'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';
import { Option } from '@/components/core/option';

export interface Filters {
  email?: string;
  sort?: string;
}

export function AuditFilters({ filters, setFilters, actionArray }: any): React.JSX.Element {
  
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
            displayValue={filters?.email || ''}
            label="Email"
            onFilterApply={(value) => handleFilterChange('email', value as string)}
            onFilterDelete={() => handleFilterChange('email', '')}
            popover={<GenericFilterPopover field="Email" />}
            value={filters?.email || ''}
          />
          {/* --------Not Sure About Values------- */}
          <FilterButton
            displayValue={filters?.action || ''}
            label="Action"
            onFilterApply={(value) => handleFilterChange('actionFilter', value)}
            onFilterDelete={() => handleFilterChange('actionFilter', '')}
            popover={<GenericFilterPopoverTwo field="Action" actionArray={actionArray} />}
            value={filters?.actionFilter || ''}
          />
          {hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
        </Stack>
        <FilterButton
          displayValue={filters?.createdAt || ''}
          label="Date"
          // onFilterApply={(value) => handleFilterChange('createdAt', value)}

          onFilterDelete={() => handleFilterChange('createdAt', '')}
          popover={<DateFilterPopover />}
          value={filters?.createdAt || ''}
        />
        <Select
          name="sort"
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          sx={{ maxWidth: '100%', width: '120px' }}
          value={filters?.sort || 'desc'}
        >
          <Option value="desc">Newest</Option>
          <Option value="asc">Oldest</Option>
        </Select>
      </Stack>
    </div>
  );
}

function GenericFilterPopover({ field }: { field: string }) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);
  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <TextField
        fullWidth
        placeholder="Filter by email..."
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button variant="contained" fullWidth onClick={() => onApply(value)}>
        Apply Filter
      </Button>
    </FilterPopover>
  );
}

function GenericFilterPopoverTwo({ field, actionArray }: { field: string; actionArray: any }) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  console?.log(value, 'value');

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <InputLabel>Select by Action</InputLabel>

        <Select
          value={value}
          onChange={(e) => setValue(e.target.value as number)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        >
          {actionArray?.map((action: any) => (
            <MenuItem key={action?.id} value={action?.name}>
              {action?.value}
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

function DateFilterPopover() {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue ? dayjs(initialValue) : null);

  useEffect(() => {
    setValue(initialValue ? dayjs(initialValue) : null);
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by Date">
      <DatePicker value={value} onChange={(newDate) => setValue(newDate)} format="DD/MM/YYYY" />
      <Button onClick={() => onApply(value ? value.format('DD/MM/YYYY') : '')} variant="contained">
        Apply
      </Button>
    </FilterPopover>
  );
}
