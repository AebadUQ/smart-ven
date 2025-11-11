// app/(dashboard)/vans/VanFilter.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Trash } from "@phosphor-icons/react";
import {
  FilterButton,
  FilterPopover,
  useFilterContext,
} from "@/components/core/filter-button";

export interface VanFilters {
  carNumber?: string;
  driverName?: string;
}

interface VanFilterProps {
  filters: VanFilters;
  setFilters: (
    updater: VanFilters | ((prev: VanFilters) => VanFilters)
  ) => void;
  selected?: any[]; // kept for future bulk actions if needed
}

export function VanFilter({
  filters,
  setFilters,
}: VanFilterProps): React.JSX.Element {
  const handleFilterChange = useCallback(
    (key: keyof VanFilters, value?: string) => {
      setFilters((prev: VanFilters) => {
        const next = { ...prev };
        if (!value) {
          delete next[key];
        } else {
          next[key] = value;
        }
        return next;
      });
    },
    [setFilters]
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  const hasFilters = Object.values(filters || {}).some((val) => !!val);

  return (
    <div>
      <Divider />

      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", flexWrap: "wrap", px: 3, py: 2 }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", flex: "1 1 auto", flexWrap: "wrap" }}
        >
          {/* 🚐 Car Number */}
          <FilterButton
            displayValue={filters?.carNumber || ""}
            label="Car Number"
            onFilterApply={(value) =>
              handleFilterChange("carNumber", value as string)
            }
            onFilterDelete={() => handleFilterChange("carNumber", "")}
            popover={<GenericFilterPopover field="Car Number" />}
            value={filters?.carNumber || ""}
          />

          {/* 🧑‍✈️ Driver Name */}
          <FilterButton
            displayValue={filters?.driverName || ""}
            label="Driver Name"
            onFilterApply={(value) =>
              handleFilterChange("driverName", value as string)
            }
            onFilterDelete={() => handleFilterChange("driverName", "")}
            popover={<GenericFilterPopover field="Driver Name" />}
            value={filters?.driverName || ""}
          />

          {hasFilters ? (
            <Button onClick={handleClearFilters}>Clear filters</Button>
          ) : null}
        </Stack>
      </Stack>
    </div>
  );
}

// 🔤 Generic Text Input Popover
function GenericFilterPopover({ field }: { field: string }) {
  const { anchorEl, onApply, onClose, open, value: initialValue } =
    useFilterContext();
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  return (
    <FilterPopover
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      title={`Filter by ${field}`}
    >
      <FormControl>
        <OutlinedInput
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && onApply(value)}
          value={value}
        />
      </FormControl>
      <Button onClick={() => onApply(value)} variant="contained">
        Apply
      </Button>
    </FilterPopover>
  );
}
