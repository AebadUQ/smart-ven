"use client";  

import * as React from "react";
import { Box, Card, Divider, Stack, Typography, Chip, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, CircularProgress } from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Eye as EyeIcon, Edit as EditIcon, Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAllComplaints } from "@/store/reducers/complaint-management";

type ComplaintType = {
  _id: string;
  type?: string;
  issueType?: string;
  description?: string;
  image?: string;
  audio?: string;
  status: "pending" | "acknowledge" | "closed";
};

export default function ParentTicketPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { complaints, loading } = useSelector((state: RootState) => state.complaint);

  const [selectedTickets, setSelectedTickets] = React.useState<ComplaintType[]>([]);
  const [pagination, setPagination] = React.useState({ page: 1, limit: 10, total: 0 });

  // Fetch complaints whenever page/limit changes
  React.useEffect(() => {
    dispatch(getAllComplaints({ page: pagination.page, limit: pagination.limit }))
      .unwrap()
      .then((res: any) => {
        setPagination(prev => ({
          ...prev,
          total: res.pagination?.total || res.data?.length || 0
        }));
      })
      .catch((err) => console.error(err));
  }, [dispatch, pagination.page, pagination.limit]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "orange";
      case "acknowledge": return "green";
      case "closed": return "gray";
      default: return "blue";
    }
  };

  const columns: ColumnDef<ComplaintType>[] = [
    { name: "Ticket ID", width: "120px", formatter: (row) => <Typography variant="body2">{row._id}</Typography> },
    { name: "Type", width: "120px", formatter: (row) => <Typography variant="body2">{row.type || row.issueType}</Typography> },
    { name: "Report Message", width: "250px", formatter: (row) => <Typography variant="body2">{row.description}</Typography> },
    { name: "Report Title", width: "200px", formatter: (row) => <Typography variant="body2">{row.issueType}</Typography> },
    {
      name: "Complaint Image",
      width: "120px",
      formatter: (row) => row.image ? <img src={row.image} alt="complaint" style={{ width: 50, height: 50, borderRadius: 4 }} /> : <Typography variant="body2">N/A</Typography>,
    },
    {
      name: "Complaint Audio",
      width: "150px",
      formatter: (row) => row.audio ? <audio controls src={row.audio} style={{ width: "100%" }} /> : <Typography variant="body2">N/A</Typography>,
    },
    {
      name: "Status",
      width: "120px",
      formatter: (row) => (
        <Chip
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          size="small"
          style={{ borderColor: getStatusColor(row.status), color: getStatusColor(row.status) }}
          variant="outlined"
        />
      ),
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

        const handleView = () => { console.log("View ticket:", row._id); handleMenuClose(); };
        const handleEdit = () => { console.log("Edit ticket:", row._id); handleMenuClose(); };
        const handleDelete = () => { console.log("Delete ticket:", row._id); handleMenuClose(); };

        return (
          <>
            <IconButton onClick={handleMenuOpen} size="small"><MoreVertIcon /></IconButton>
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
        <Typography variant="h5">Complaint Management</Typography>
        <Card>
          <Box sx={{ overflowX: "auto" }}>
            {/* {JSON.stringify(complaints)} */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}><CircularProgress /></Box>
            ) : complaints.length ? (
              <DataTable<ComplaintType>
                columns={columns}
                rows={complaints}
                selectable
                onSelectionChange={(_, rows) => setSelectedTickets(rows)}
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
            onPaginationChange={(_, newPage) => setPagination(prev => ({ ...prev, page: newPage + 1 }))}
            onRowsPerPageChange={(event) => setPagination(prev => ({ ...prev, page: 1, limit: parseInt(event.target.value, 10) }))}
          />
        </Card>
      </Stack>
    </Box>
  );
}
