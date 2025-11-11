// app/(dashboard)/complaints/ComplaintFilter.tsx

"use client";

import React, { useCallback } from "react";
import {
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import type { ComplaintFilters } from "@/store/reducers/complaint-management";

interface ComplaintFilterProps {
  filters: ComplaintFilters;
  setFilters: (
    updater: ComplaintFilters | ((prev: ComplaintFilters) => ComplaintFilters)
  ) => void;
}

export function ComplaintFilter({
  filters,
  setFilters,
}: ComplaintFilterProps): React.JSX.Element {
  const handleChange = useCallback(
    (key: keyof ComplaintFilters, value: string) => {
      setFilters((prev) => {
        const next: ComplaintFilters = { ...prev };
        if (!value) {
          delete next[key];
        } else {
          // cast correctly
          (next as any)[key] = value;
        }
        return next;
      });
    },
    [setFilters]
  );

  const handleClear = () => {
    setFilters({});
  };

  return (
    <>
      <Divider />
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", flexWrap: "wrap", px: 3, py: 2 }}
      >
        {/* Status Filter */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            label="Status"
            value={filters.status || ""}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="acknowledge">Acknowledge</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>

        {/* Type Filter */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="type-filter-label">Report Type</InputLabel>
          <Select
            labelId="type-filter-label"
            label="Report Type"
            value={filters.typeFilter || ""}
            onChange={(e) => handleChange("typeFilter", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="parentReport">Parent Report</MenuItem>
            <MenuItem value="driverReport">Driver Report</MenuItem>
          </Select>
        </FormControl>

        {(filters.status || filters.typeFilter) && (
          <Button onClick={handleClear}>Clear filters</Button>
        )}
      </Stack>
    </>
  );
}
