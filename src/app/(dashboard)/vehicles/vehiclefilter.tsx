'use client';
import React, { useState, useEffect, useCallback } from "react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';
import { Option } from '@/components/core/option';

export interface Filters {
  name?: string;
  sort?: string;
}

export function DriverFilter({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState('');

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
  }, [setFilters]);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  const hasFilters = Object.values(filters || {}).some((val) => !!val);

  return (
    <div>
      <Tabs
        onChange={(_, value) => {
          setSelectedTab(value);
        }}
        sx={{ px: 3 }}
        value={selectedTab}
        variant="scrollable"
      >
        <Tab key="all" label="All" value="" sx={{ minHeight: 'auto' }} />
      </Tabs>

      <Divider />

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
          {/* 👤 Name Filter */}
          <FilterButton
            displayValue={filters?.name || ""}
            label="Name"
            onFilterApply={(value) => handleFilterChange('name', value as string)}
            onFilterDelete={() => handleFilterChange('name', '')}
            popover={<GenericFilterPopover field="Name" />}
            value={filters?.name || ""}
          />

          {/* ❌ Clear Button */}
          {hasFilters && (
            <Button onClick={handleClearFilters} color="secondary">
              Clear filters
            </Button>
          )}
        </Stack>

        {/* 🔃 Sort Select */}
        <Select
          name="sort"
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          sx={{ maxWidth: '100%', width: '120px' }}
          value={filters?.sort || "desc"}
        >
          <Option value="desc">Newest</Option>
          <Option value="asc">Oldest</Option>
        </Select>
      </Stack>
    </div>
  );
}

// 🔤 Generic Text Input Popover
function GenericFilterPopover({ field }: { field: string }) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl>
        <OutlinedInput
          placeholder={`Enter ${field}`}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
          value={value}
        />
      </FormControl>
      <Button onClick={() => onApply(value)} variant="contained" sx={{ mt: 1 }}>
        Apply
      </Button>
    </FilterPopover>
  );
}
