'use client';
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { getFormsCategory } from '@/services/form.api';

export interface Filters {
  email?: string;
  categoryId?: string;
  formName?: string;
  createdAt?: string;
  sort?: string;
}

export function SearchModalFilters({ filters, setFilters }: any): React.JSX.Element {
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
    <div style={{ padding: '0px' }}>
      <Tabs
        onChange={(_, value) => {
          setSelectedTab(value);
          handleFilterChange('categoryId', value === '' ? null : value);
        }}
        sx={{ px: "0px" }}
        value={selectedTab}
        variant="scrollable"
      >

        <Tab
          key="all"
          label="All"
          value=""
          sx={{ minHeight: 'auto' }}
        />
        {categoryForms?.map((tab:any) => (
          <Tab
            iconPosition="start"
            key={tab.id}
            label={tab.name}
            sx={{ minHeight: 'auto' }}
            value={tab.id}
          />
        ))}
      </Tabs>
      <Divider />
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

// // 📅 Date Filter

