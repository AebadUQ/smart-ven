// app/(dashboard)/vans/page.tsx

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import { Plus as PlusIcon } from "@phosphor-icons/react";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAllSchoolVans } from "@/store/reducers/van-slice";
import { VanFilter, type VanFilters } from "./driverfilter";

export default function Page(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { vans, loading, pagination } = useSelector(
    (state: RootState) => state.van
  );

  const [selectedVans, setSelectedVans] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useState<VanFilters>({});
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  // 🔁 Fetch vans whenever pagination or filters change
  React.useEffect(() => {
    dispatch(
      getAllSchoolVans({
        page,
        limit,
        ...filters, // carNumber, driverName if set
      })
    );
  }, [dispatch, page, limit, filters]);

  const columns: ColumnDef<any>[] = [
    {
      name: "Van",
      width: "250px",
      formatter: (row) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <img
            src={row?.van?.venImage || "/assets/van-placeholder.png"}
            alt={row?.van?.vehicleType || "Van"}
            style={{ width: 40, height: 40, borderRadius: "4px" }}
          />
          <Stack>
            <Typography color="text.primary" variant="body2">
              {row?.van?.vehicleType} - {row?.van?.carNumber}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              Capacity: {row?.van?.venCapacity}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      name: "Route",
      width: "220px",
      formatter: (row) => (
        <Typography color="text.secondary">
          {row?.van?.assignRoute || "-"}
        </Typography>
      ),
    },
    {
      name: "Driver",
      width: "220px",
      formatter: (row) => (
        <Typography color="text.secondary">
          {row?.driver?.fullname || "-"}
        </Typography>
      ),
    },
    {
      name: "Status",
      width: "120px",
      formatter: (row) => (
        <Chip
          label={row?.van?.status === "active" ? "Active" : "Inactive"}
          color={row?.van?.status === "active" ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      name: "Actions",
      width: "120px",
      align: "right",
      formatter: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            size="small"
            variant="outlined"
            onClick={() => router.push(`/van/${row?.van?.id}`)}
          >
            View
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "var(--mui-palette-background-level1)",
        p: 3,
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "flex-start" }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography variant="h5">Van Management</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              endIcon={<PlusIcon />}
              onClick={() => router.push("/van/create")}
            >
              Add Van
            </Button>
          </Box>
        </Stack>

        {/* Filters */}
        <Card>
          <VanFilter
            filters={filters}
            setFilters={(updater) => {
              setPage(1); // reset page on filter change
              setFilters((prev) =>
                typeof updater === "function" ? updater(prev) : updater
              );
            }}
            selected={selectedVans}
          />

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : vans?.length ? (
              <DataTable<any>
                columns={columns}
                rows={vans}
                selectable
                onSelectionChange={(_, rows) =>
                  setSelectedVans(rows as any[])
                }
              />
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                  variant="body2"
                >
                  No Vans Found
                </Typography>
              </Box>
            )}
          </Box>

          <Divider />

          {/* Pagination */}
          <CustomersPagination
            count={pagination?.total || 0}
            page={(page || 1) - 1}
            rowsPerPage={limit}
            onPaginationChange={(_, newPage) => {
              setPage(newPage + 1);
              setSelectedVans([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              setLimit(newLimit);
              setPage(1);
              setSelectedVans([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
