"use client";

import * as React from "react";
import { Box, Card, Divider, Stack, Typography, Chip, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, CircularProgress, Button } from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Eye as EyeIcon, Edit as EditIcon, Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { useRouter } from "next/navigation";
type AlertRecord = {
  id: number;
  alertTitle: string;
  message: string;
  sendTo: "Parent" | "All Parent" | "All Driver" | "Driver" | "Van";
  dateTime: string;
  status: "Active" | "Inactive" | "Sent";
};

export default function AlertPage(): React.JSX.Element {
  const router = useRouter()
  const [selectedAlerts, setSelectedAlerts] = React.useState<AlertRecord[]>([]);
  const [loading, setLoading] = React.useState(false);
 const [alerts, setAlerts] = React.useState<AlertRecord[]>([
  {
    id: 201,
    alertTitle: "Bus Delay",
    message: "The van will be delayed by 15 minutes",
    sendTo: "All Parent",
    dateTime: "2025-10-20 08:15",
    status: "Active",
  },
  {
    id: 202,
    alertTitle: "Pickup Reminder",
    message: "Please be ready for pickup at 7:30 AM",
    sendTo: "Parent",
    dateTime: "2025-10-20 07:00",
    status: "Sent",
  },
  {
    id: 203,
    alertTitle: "Van Maintenance",
    message: "The van will be under maintenance tomorrow",
    sendTo: "Driver",
    dateTime: "2025-10-21 09:00",
    status: "Inactive",
  },
  {
    id: 204,
    alertTitle: "Route Change",
    message: "Route for Van #12 has been updated",
    sendTo: "All Driver",
    dateTime: "2025-10-21 10:30",
    status: "Active",
  },
  {
    id: 205,
    alertTitle: "Emergency Contact",
    message: "Please update your emergency contact information",
    sendTo: "Parent",
    dateTime: "2025-10-22 11:00",
    status: "Active",
  },
  {
    id: 206,
    alertTitle: "New Policy",
    message: "All drivers must check attendance daily",
    sendTo: "Driver",
    dateTime: "2025-10-22 12:15",
    status: "Sent",
  },
  {
    id: 207,
    alertTitle: "Late Pickup",
    message: "Student pickup will be delayed today",
    sendTo: "All Parent",
    dateTime: "2025-10-23 07:45",
    status: "Active",
  },
  {
    id: 208,
    alertTitle: "Van Cleaning",
    message: "Vans will be cleaned after 5 PM",
    sendTo: "Van",
    dateTime: "2025-10-23 16:00",
    status: "Inactive",
  },
  {
    id: 209,
    alertTitle: "Meeting Reminder",
    message: "Drivers meeting at 4 PM",
    sendTo: "All Driver",
    dateTime: "2025-10-24 15:00",
    status: "Sent",
  },
  {
    id: 210,
    alertTitle: "Holiday Notification",
    message: "No pickups on upcoming public holiday",
    sendTo: "All Parent",
    dateTime: "2025-10-25 08:00",
    status: "Active",
  },
]);

  const [pagination, setPagination] = React.useState({ page: 1, limit: 10, total: 2 });

  const columns: ColumnDef<AlertRecord>[] = [
    { name: "Alert ID", width: "100px", formatter: (row) => <Typography variant="body2">{row.id}</Typography> },
    { name: "Alert Title", width: "200px", formatter: (row) => <Typography variant="body2">{row.alertTitle}</Typography> },
    { name: "Message", width: "300px", formatter: (row) => <Typography variant="body2">{row.message}</Typography> },
    { name: "Send To", width: "150px", formatter: (row) => <Typography variant="body2">{row.sendTo}</Typography> },
    { name: "Date/Time", width: "180px", formatter: (row) => <Typography variant="body2">{row.dateTime}</Typography> },
    {
      name: "Status",
      width: "120px",
      formatter: (row) => {
        const color = row.status === "Active" ? "green" : row.status === "Sent" ? "blue" : "gray";
        return <Chip label={row.status} size="small" style={{ borderColor: color, color }} variant="outlined" />;
      },
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

        const handleView = () => { console.log("View alert:", row.id); handleMenuClose(); };
        const handleEdit = () => { console.log("Edit alert:", row.id); handleMenuClose(); };
        const handleDelete = () => { console.log("Delete alert:", row.id); handleMenuClose(); };

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
<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">Alerts</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/alert/create")}
          >
            Add Alert
          </Button>
        </Box>        <Card>
          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}><CircularProgress /></Box>
            ) : alerts.length ? (
              <DataTable<any>
                columns={columns}
                rows={alerts}
                selectable
                onSelectionChange={(_, rows) => setSelectedAlerts(rows)}
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
              setSelectedAlerts([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              console.log("Change rows per page:", newLimit);
              setPagination(prev => ({ ...prev, page: 1, limit: newLimit }));
              setSelectedAlerts([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
