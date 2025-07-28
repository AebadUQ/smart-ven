'use client';
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
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
import { paths } from '@/paths';
import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';
import { Option } from '@/components/core/option';
import { getFormsCategory } from '@/services/form.api';

export interface Filters {
  email?: string;
  categoryId?: string;
  formName?: string;
  phoneNumber?: string;
  createdAt?: string;
  sort?: string;
}

export function UserRoleFilters({ filters, setFilters }: any): React.JSX.Element {
  const [categoryForms, setCategoryForms] = useState([]);
  const [selectedTab, setSelectedTab] = useState(filters?.categoryId || '');
  const router = useRouter();

  const getForms = useCallback(async () => {
    try {
      const res = await getFormsCategory();
      setCategoryForms(res.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  }, []);

  useEffect(() => {
    getForms();
  }, []);

  const handleFilterChange = useCallback((key: keyof Filters, value?: string) => {
    setFilters((prev: Filters) => {
      const newFilters = { ...prev };
      if (!value) {
        delete newFilters[key]; // Remove key when value is empty or undefined
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
      <Tabs
        onChange={(_, value) => {
          setSelectedTab(value);
          handleFilterChange('categoryId', value === '' ? null : value);
        }}
        sx={{ px: 3 }}
        value={selectedTab}
        variant="scrollable"
      >
        {/* Default "All" Tab */}
        <Tab
          key="all"
          label="All"
          value=""
          sx={{ minHeight: 'auto' }}
        />

        {/* Dynamic Category Tabs */}
        {/* {categoryForms?.map((tab) => (
          <Tab
            iconPosition="end"
            key={tab.id}
            label={tab.name}
            sx={{ minHeight: 'auto' }}
            value={tab.id}
          />
        ))} */}
      </Tabs>

      <Divider />

      {/* <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>

          <FilterButton
            displayValue={filters?.email || ""}
            label="Email"
            onFilterApply={(value) => handleFilterChange('email', value as string)}
            onFilterDelete={() => handleFilterChange('email', '')}
            popover={<GenericFilterPopover field="Email" />}
            value={filters?.email || ""}
          />


          <FilterButton
            displayValue={filters?.formName || ""}
            label="Form Name"
            onFilterApply={(value) => handleFilterChange('formName', value as string)}
            onFilterDelete={() => handleFilterChange('formName', '')}
            popover={<GenericFilterPopover field="Form Name" />}
            value={filters?.formName || ""}
          />

          <FilterButton
            displayValue={filters?.phoneNumber || ""}
            label="Phone Number"
            onFilterApply={(value) => handleFilterChange('phoneNumber', value as string)}
            onFilterDelete={() => handleFilterChange('phoneNumber', '')}
            popover={<GenericFilterPopover field="Phone Number" />}
            value={filters?.phoneNumber || ""}
          />

          {hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}
        </Stack>


        <FilterButton
          displayValue={filters?.createdAt || ""}
          label="Date"
          onFilterApply={(value) => handleFilterChange('createdAt', value)}
          onFilterDelete={() => handleFilterChange('createdAt', '')}
          popover={<DateFilterPopover />}
          value={filters?.createdAt || ""}
        />

        <Select name="sort" onChange={(e) => handleFilterChange('sort', e.target.value)} sx={{ maxWidth: '100%', width: '120px' }} value={filters?.sort || "desc"}>
          <Option value="desc">Newest</Option>
          <Option value="asc">Oldest</Option>
        </Select>
      </Stack> */}
    </div>
  );
}

// 📌 Generic Input Filter for Email & Form Name
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
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
          value={value}
        />
      </FormControl>
      <Button onClick={() => onApply(value)} variant="contained">Apply</Button>
    </FilterPopover>
  );
}

// 📅 Date Filter
function DateFilterPopover() {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue ? dayjs(initialValue) : null);

  useEffect(() => {
    setValue(initialValue ? dayjs(initialValue) : null);
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by Date">
      <DatePicker
        value={value}
        onChange={(newDate) => setValue(newDate)}
        format="DD/MM/YYYY"
      />
      <Button
        onClick={() => onApply(value ? value.format('DD/MM/YYYY') : '')}
        variant="contained"
      >
        Apply
      </Button>
    </FilterPopover>
  );
}
