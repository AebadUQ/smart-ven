"use client";

import * as React from "react";
import { Box, Card, Divider, Stack, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, CircularProgress } from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Eye as EyeIcon, Edit as EditIcon, Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Eye';

type TripRecord = {
  vanId: string;
  title: string;
  startTime: string;
  tripType: "morning" | "evening";
  tripDays: Record<string, boolean>;
  startPoint: { lat: number; long: number };
  endPoint: { lat: number; long: number };
};

export default function RoutePlannerPage(): React.JSX.Element {
  const [selectedTrips, setSelectedTrips] = React.useState<TripRecord[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [trips, setTrips] = React.useState<TripRecord[]>([
    {
      vanId: "68ca57b2b1f408f198b1768a",
      title: "Morning School Pickup",
      startTime: "07:30 AM",
      tripType: "morning",
      tripDays: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true },
      startPoint: { lat: 24.9200, long: 67.0600 },
      endPoint: { lat: 24.9500, long: 67.1000 },
    },
    {
      vanId: "68ca57b2b1f408f198b1768b",
      title: "Evening School Drop",
      startTime: "03:30 PM",
      tripType: "evening",
      tripDays: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true },
      startPoint: { lat: 24.9500, long: 67.1000 },
      endPoint: { lat: 24.9200, long: 67.0600 },
    },
  ]);

  const [pagination, setPagination] = React.useState({ page: 1, limit: 10, total: trips.length });

  const columns: ColumnDef<TripRecord>[] = [
    { name: "Van ID", width: "180px", formatter: (row) => <Typography variant="body2">{row.vanId}</Typography> },
    { name: "Title", width: "200px", formatter: (row) => <Typography variant="body2">{row.title}</Typography> },
    { name: "Start Time", width: "120px", formatter: (row) => <Typography variant="body2">{row.startTime}</Typography> },
    { name: "Trip Type", width: "120px", formatter: (row) => <Typography variant="body2">{row.tripType}</Typography> },
    {
      name: "Trip Days",
      width: "200px",
      formatter: (row) => {
        const days = Object.entries(row.tripDays)
          .filter(([_, v]) => v)
          .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1, 3)) // Mon, Tue, ...
          .join(", ");
        return <Typography variant="body2">{days}</Typography>;
      },
    },
    {
      name: "Start Point",
      width: "150px",
      formatter: (row) => <Typography variant="body2">{row.startPoint.lat}, {row.startPoint.long}</Typography>,
    },
    {
      name: "End Point",
      width: "150px",
      formatter: (row) => <Typography variant="body2">{row.endPoint.lat}, {row.endPoint.long}</Typography>,
    },
    {
      name: "Actions",
      width: "100px",
      align: "right",
      formatter: (row) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
        const handleMenuClose = () => setAnchorEl(null);

        const handleView = () => { console.log("View trip:", row.vanId); handleMenuClose(); };
        const handleEdit = () => { console.log("Edit trip:", row.vanId); handleMenuClose(); };
        const handleDelete = () => { console.log("Delete trip:", row.vanId); handleMenuClose(); };

        return (
          <>
            <IconButton onClick={handleMenuOpen} size="small">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleView}><ListItemIcon><EyeIcon size={20} /></ListItemIcon><ListItemText primary="View" /></MenuItem>
              <MenuItem onClick={handleEdit}><ListItemIcon><EditIcon size={20} /></ListItemIcon><ListItemText primary="Edit" /></MenuItem>
              <MenuItem onClick={handleDelete}><ListItemIcon><TrashIcon size={20} color="red" /></ListItemIcon><ListItemText primary="Delete" /></MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Route Planner</Typography>
        <Card>
          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}><CircularProgress /></Box>
            ) : trips.length ? (
              <DataTable<any>
                columns={columns}
                rows={trips}
                selectable
                onSelectionChange={(_, rows) => setSelectedTrips(rows)}
              />
            ) : (
              <Box sx={{ p: 3 }}><Typography color="text.secondary" sx={{ textAlign: "center" }} variant="body2">No Data found</Typography></Box>
            )}
          </Box>
          <Divider />
          <CustomersPagination
            count={pagination.total}
            page={Math.max(0, pagination.page - 1)}
            rowsPerPage={pagination.limit}
            onPaginationChange={(_, newPage) => {
              console.log("Change page:", newPage + 1);
              setPagination(prev => ({ ...prev, page: newPage + 1 }));
              setSelectedTrips([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              console.log("Change rows per page:", newLimit);
              setPagination(prev => ({ ...prev, page: 1, limit: newLimit }));
              setSelectedTrips([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
