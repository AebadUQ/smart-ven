"use client";

import * as React from "react";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Eye as EyeIcon,
  PencilSimple as EditIcon,
  Trash as TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getAllRoutes,
  getRouteById,
  type TripRecord,
  type RouteFilters,
} from "@/store/reducers/route-slice";
import { RouteFilter } from "./RouteFilter";
import dayjs from "dayjs";
import { paths } from "@/paths";

// ─── Row Actions ─────────────────────────────────────────────

const RouteActions = ({ row }: { row: TripRecord }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleView = async () => {
    try {
      await dispatch(getRouteById(row._id)).unwrap();
      router.push(`/planner/${row._id}`);
    } catch (err) {
      console.error("Failed to load route details before view", err);
      // still navigate even if prefetch fails, optional:
      router.push(`/planner/${row._id}`);
    } finally {
      handleMenuClose();
    }
  };

  const handleEdit = () => {
    router.push(`${paths.dashboard.planner}/edit/${row._id}`);
    handleMenuClose();
  };

  // const handleDelete = async () => { ... }

  return (
    <Stack direction="row" spacing={0} sx={{ justifyContent: "flex-end" }}>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <EyeIcon size={18} />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon size={18} />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        {/* <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <TrashIcon size={18} color="red" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem> */}
      </Menu>
    </Stack>
  );
};

// ─── Main Page ─────────────────────────────────────────

export default function RoutePlannerPage(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { routes, loading, pagination } = useSelector(
    (state: RootState) => state.route
  );

  const [selectedTrips, setSelectedTrips] = React.useState<TripRecord[]>([]);
  const [filters, setFilters] = React.useState<RouteFilters>({});
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(10);

  // Fetch when page / limit / filters change
  React.useEffect(() => {
    dispatch(
      getAllRoutes({
        page,
        limit,
        ...filters, // currently driverName; easily extendable
      })
    );
  }, [dispatch, page, limit, filters]);

  const columns: ColumnDef<TripRecord>[] = [
    {
      name: "Van ID",
      width: "120px",
      formatter: (row) => (
        <Typography variant="body2">{row.vanId}</Typography>
      ),
    },
    {
      name: "Car Number",
      width: "130px",
      formatter: (row) => (
        <Typography variant="body2">
          {row.vanDetails?.carNumber || "—"}
        </Typography>
      ),
    },
    {
      name: "Driver",
      width: "160px",
      formatter: (row) => (
        <Typography variant="body2">
          {row.driverDetails?.fullname || "—"}
        </Typography>
      ),
    },
    {
      name: "Title",
      width: "200px",
      formatter: (row) => (
        <Typography variant="body2">{row.title}</Typography>
      ),
    },
    {
      name: "Start Time",
      width: "120px",
      formatter: (row) => (
        <Typography variant="body2">
          {/* {dayjs(row.startTime).format("hh:mm A")} */}
          {row.startTime}
        </Typography>
      ),
    },
    {
      name: "Trip Type",
      width: "120px",
      formatter: (row) => (
        <Chip
          label={row.tripType}
          size="small"
          variant="outlined"
          color="primary"
        />
      ),
    },
  {
  name: "Trip Days",
  width: "200px",
  formatter: (row) => {
    const days = Object.entries(row.tripDays || {})
      .filter(([_, enabled]) => enabled === true) // only true values
      .map(([key]) =>
        key.charAt(0).toUpperCase() + key.slice(1, 3) // Mon, Tue, Wed
      )
      .join(", ");

    return <Typography variant="body2">{days || "—"}</Typography>;
  },
}
,
    {
      name: "Start Point",
      width: "150px",
      formatter: (row) => (
        <Typography variant="body2">
          {row.startPoint.lat}, {row.startPoint.long}
        </Typography>
      ),
    },
    {
      name: "End Point",
      width: "150px",
      formatter: (row) => (
        <Typography variant="body2">
          {row.endPoint.lat}, {row.endPoint.long}
        </Typography>
      ),
    },
    {
      name: "Actions",
      width: "100px",
      align: "right",
      formatter: (row) => <RouteActions row={row} />,
    },
  ];

  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", p: 3 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Routes</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              router.push(`${paths.dashboard.planner}/create`)
            }
          >
            Add Route
          </Button>
        </Stack>

        {/* Content */}
        <Card>
          {/* Filters */}
          <RouteFilter
            filters={filters}
            setFilters={(updater) => {
              setPage(1); // reset page on filter change
              setFilters((prev) =>
                typeof updater === "function" ? updater(prev) : updater
              );
            }}
          />

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <CircularProgress />
              </Box>
            ) : routes && routes.length ? (
              <DataTable<any>
                columns={columns}
                rows={routes}
                selectable={false}
                onSelectionChange={(_, rows) =>
                  setSelectedTrips(rows as TripRecord[])
                }
              />
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                  variant="body2"
                >
                  No Data found
                </Typography>
              </Box>
            )}
          </Box>

          <Divider />

          {/* Pagination */}
          <CustomersPagination
            count={pagination.total}
            page={page - 1}
            rowsPerPage={limit}
            onPaginationChange={(_, newPage) => {
              setPage(newPage + 1);
              setSelectedTrips([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              setLimit(newLimit);
              setPage(1);
              setSelectedTrips([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
