'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getJobCategories } from '@/services/jobs.api';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Option } from '@/components/core/option';
import dayjs from 'dayjs';
import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';





export interface Filters {
  merchantName?: string;
  jobCategoryId?: string;
  keyword?: string;
  Location?: string;
  sort?: string;
  requiredExperience?: string;
  statusId?: string;  // 🛑 ADD this line
}

export function JobPostFilters({ filters, setFilters, categories }: any): React.JSX.Element {
  const experience = [
    { id: 1, name: '1 Year' },
    { id: 2, name: '2 Years' },
    { id: 3, name: '3 Years' },
    { id: 4, name: '4 Years' },
  ];

  const statusOptions = [
    { id: 7, name: 'Active' },
    { id: 8, name: 'Inactive' },
  ];

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
              filters?.jobCategoryId
                ? categories.find((c: { id: number; nameEN: string }) => c.id === filters.jobCategoryId)?.name || ''
                : ''
            }
            label="Job Category"
            onFilterApply={(value) => handleFilterChange('jobCategoryId', value as number)}
            onFilterDelete={() => handleFilterChange('jobCategoryId', '')}
            popover={<GenericFilterPopoverCategory field="jobCategoryId" categories={categories} />}
            value={filters?.jobCategory || ''}
          />

          <FilterButton
  displayValue={
    filters?.requiredExperience
      ? `${filters.requiredExperience} year${filters.requiredExperience > 1 ? 's' : ''}`
      : ''
  }
  label="Required Experience"
  onFilterApply={(value) => handleFilterChange('requiredExperience', value as string)}
  onFilterDelete={() => handleFilterChange('requiredExperience', '')}
  popover={<GenericFilterPopoverNumber field="requiredExperience" />}
  value={filters?.requiredExperience || ''}
/>

         
          <FilterButton
            displayValue={filters?.keyword || ''}
            label="Job Position"
            onFilterApply={(value) => handleFilterChange('keyword', value as string)}
            onFilterDelete={() => handleFilterChange('keyword', '')}
            popover={<GenericFilterPopover field="keyword" />}
            value={filters?.keyword || ''}
          />

            <FilterButton
              displayValue={
                filters?.statusId
                  ? statusOptions.find((s) => s.id === Number(filters.statusId))?.name || ''
                  : ''
              }
              label="Status"
              onFilterApply={(value) => handleFilterChange('statusId', value)}
              onFilterDelete={() => handleFilterChange('statusId', '')}
              popover={
                <GenericFilterPopoverStatus
                  field="statusId"
                  statusOptions={statusOptions}
                />
              }
              value={filters?.statusId || ''}
            />


          {hasFilters ? <Button onClick={handleClearFilters}>Clear filters</Button> : null}

              </Stack>
              {/* Date Filter */}
                      <FilterButton
                        displayValue={filters?.createdAt || ''}
                        label="Date"
                        onFilterApply={(value) => handleFilterChange('createdAt', value)}
                        onFilterDelete={() => handleFilterChange('createdAt', '')}
                        popover={<DateFilterPopover />}
                        value={filters?.createdAt || ''}
                      />
              
                      <Select
                        name="sort"
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        sx={{ maxWidth: '100%', width: '120px' }}
                       value={filters?.sort || 'createdAt_desc'}
                      >
                        <Option value="createdAt_desc">Newest</Option>
                        <Option value="createdAt_asc">Oldest</Option>
                        <Option value="dateOfPosting_desc">Newest Annoucements</Option>
                        <Option value="dateOfPosting_asc">Oldest Annoucements</Option>
                        <Option value="expirationDate_asc">Closing Soon</Option>
                        <Option value="expirationDate_desc">Closing Latest</Option>
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
      <FormControl>
        <OutlinedInput
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
          value={value}
        />
      </FormControl>
      <Button onClick={() => onApply(value)} variant="contained">
        Apply
      </Button>
    </FilterPopover>
  );
}

// ........................................................................

function GenericFilterPopoverCategory({
  field,
  categories,
}: {
  field: string;
  categories: { id: number; name: string }[];
}) {
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
              {cate.name}
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

// .........................................................................
function GenericFilterPopoverExperience({
  field,
  experience,
}: {
  field: string;
  experience: { id: number; name: string }[];
}) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState<number | string>(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <InputLabel>Select Experience</InputLabel>
        <Select
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        >
          {experience.map((exp) => (
            <MenuItem key={exp.id} value={exp.id}>
              {exp.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={() => {
          onApply(value);
          onClose();
        }}
        variant="contained"
      >
        Apply
      </Button>
    </FilterPopover>
  );
}

// .........................................................................

function GenericFilterPopoverStatus({
  field,
  statusOptions,
}: {
  field: string;
  statusOptions: { id: number; name: string }[];
}) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState<number | string>(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <InputLabel>Select Status</InputLabel>
        <Select
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={() => {
          onApply(value);
          onClose();
        }}
        variant="contained"
      >
        Apply
      </Button>
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
      <DatePicker value={value} onChange={(newDate) => setValue(newDate)} format="DD/MM/YYYY" />
      <Button onClick={() => onApply(value ? value.format('DD/MM/YYYY') : '')} variant="contained">
        Apply
      </Button>
    </FilterPopover>
  );
}

function GenericFilterPopoverNumber({ field }: { field: string }) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <OutlinedInput
          type="number"
          placeholder="Years"
          inputProps={{ min: 0 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        />
      </FormControl>
      <Button
        onClick={() => {
          onApply(value);
          onClose();
        }}
        variant="contained"
        sx={{ mt: 1 }}
      >
        Apply
      </Button>
    </FilterPopover>
  );
}

