'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FilterButton, FilterPopover, useFilterContext } from '@/components/core/filter-button';
import { Option } from '@/components/core/option';
import { InputLabel, MenuItem } from '@mui/material';

export interface Filters {
  email?: string;
  name?: string;
  phoneNumber?: string;
  createdAt?: string;
  sort?: string;
  filterType?: string;
  statusId?: string;  // 🛑 ADD this line
  jobId?: string;
  userType?: string;
}

export function CandidatesFilters({ filterType,filters, setFilters, jobStatus, jobType }: any): React.JSX.Element {
 

  
  
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
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' }}>
          {/* Email Filter */}
          <FilterButton
            displayValue={filters?.email || ''}
            label="Email"
            onFilterApply={(value) => handleFilterChange('email', value as string)}
            onFilterDelete={() => handleFilterChange('email', '')}
            popover={<GenericFilterPopover field="Email" />}
            value={filters?.email || ''}
          />

          {/* Form Name Filter */}
          <FilterButton
            displayValue={filters?.name || ''}
            label="Name"
            onFilterApply={(value) => handleFilterChange('name', value as string)}
            onFilterDelete={() => handleFilterChange('name', '')}
            popover={<GenericFilterPopover field="Form Name" />}
            value={filters?.name || ''}
          />

          <FilterButton
            displayValue={filters?.phoneNumber || ''}
            label="Phone Number"
            onFilterApply={(value) => handleFilterChange('phoneNumber', value as string)}
            onFilterDelete={() => handleFilterChange('phoneNumber', '')}
            popover={<GenericFilterPopover field="Phone Number" />}
            value={filters?.phoneNumber || ''}
          />

            <FilterButton
              displayValue={
                filters?.statusId
                  ? jobStatus.find((s: any) => s.id === Number(filters.statusId))?.statusName || ''
                  : ''
              }
              label="Status"
              onFilterApply={(value) => handleFilterChange('statusId', value as string)}
              onFilterDelete={() => handleFilterChange('statusId', '')}
              popover={
                <GenericFilterPopoverStatus
                  field="status"
                  type="Status"
                  statusOptions={jobStatus}
                />
              }
              value={filters?.statusId || ''}
            />

           {filterType === "All" && filters?.userType !== "1" &&  (<FilterButton
              displayValue={
                filters?.jobId
                  ? jobType.find((s: any) => s.id === Number(filters.jobId))?.jobCategory?.name || ''
                  : ''
              }
              label="Jobs"
              onFilterApply={(v) => handleFilterChange('jobId', v as string)}
              onFilterDelete={() => handleFilterChange('jobId', '')}
              popover={
                <GenericFilterPopoverStatus
                  field="job post"
                  type="Job Post"
                  statusOptions={jobType}
                />
              }
              value={filters?.jobId || ''}
            />)}


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
          <Option value="totalYearsOfExperience_desc">Exp (High to Low)</Option>
          <Option value="totalYearsOfExperience_asc">Exp (Low to High)</Option>
          <Option value="id_asc">Ref # (Asc)</Option>
          <Option value="name_asc">Name (A-Z)</Option>
          <Option value="currentSalary_asc">Current Salary (Asc)</Option>
          <Option value="expectedSalary_asc">Expected salary (Asc)</Option>
          <Option value="nationality_asc">Nationality</Option>
          <Option value="title_asc">Gender</Option>
          <Option value="email_asc">Email</Option>

          
        </Select>

        {filterType === "All" &&
        (<Select
          name="userType"
          onChange={(e) => handleFilterChange('userType', e.target.value)}
          sx={{ maxWidth: '100%', width: '120px' }}
          value={filters?.userType || '0'}
        >
          <Option value="0">Applicants</Option>
          <Option value="1">General Applicants</Option>
        </Select>)
        }
      </Stack>
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
      <Button onClick={() => onApply(value)} variant="contained">
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

//status

function GenericFilterPopoverStatus({
  field,
  statusOptions,
  type,
}: {
  field: string;
  type: string;
  statusOptions: { id: number; name: string }[];
}) {
  const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
  const [value, setValue] = useState<number | string>(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  return (
    <FilterPopover  anchorEl={anchorEl} onClose={onClose} open={open} title={`Filter by ${field}`}>
      <FormControl fullWidth>
        <InputLabel>Select {type}</InputLabel>
        <Select
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onKeyUp={(e) => e.key === 'Enter' && onApply(value)}
        >
          {statusOptions.map((status: any) => (
            <MenuItem key={status.id} value={status.id}>
              {status?.statusName || (`${status?.jobCategory?.name} < ${status?.positionName}`)}
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