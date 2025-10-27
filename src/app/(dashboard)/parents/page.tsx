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
  Menu,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Eye as EyeIcon, Edit as EditIcon, Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAllComplaints, changeComplaintStatus } from "@/store/reducers/complaint-management";
     import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

  // ─── Modal state
  const [openModal, setOpenModal] = React.useState(false);
  const [currentComplaint, setCurrentComplaint] = React.useState<ComplaintType | null>(null);
  const [newStatus, setNewStatus] = React.useState<ComplaintType["status"]>("pending");
  const [feedback, setFeedback] = React.useState("");

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

  const handleStatusClick = (complaint: ComplaintType) => {
    setCurrentComplaint(complaint);
    setNewStatus(complaint.status);
    setFeedback("");
    setOpenModal(true);
  };

  const handleStatusUpdate = async () => {
    if (!currentComplaint) return;
    try {
      await dispatch(changeComplaintStatus({
        reportId: currentComplaint._id,
        status: newStatus,
        feedback
      })).unwrap();
      setOpenModal(false);
    } catch (err) {
      console.error(err);
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
          style={{ borderColor: getStatusColor(row.status), color: getStatusColor(row.status), cursor: "pointer" }}
          variant="outlined"
          onClick={() => handleStatusClick(row)}
        />
      ),
    },
   
  ];

  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Complaint Management</Typography>

        <Card>
          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : complaints.length ? (
              <DataTable<ComplaintType>
                columns={columns}
                rows={complaints}
                selectable={false}
                onSelectionChange={(_, rows) => setSelectedTickets(rows)}
              />
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary" sx={{ textAlign: "center" }} variant="body2">
                  No Data found
                </Typography>
              </Box>
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

        {/* Status Change Modal */}

<Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
  <DialogTitle>Update Complaint Status</DialogTitle>
  <DialogContent>
    <Stack spacing={2} sx={{ mt: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={newStatus}
          label="Status"
          onChange={(e) => setNewStatus(e.target.value as ComplaintType["status"])}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="acknowledge">Acknowledge</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Feedback"
        multiline
        minRows={3}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        fullWidth
      />
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleStatusUpdate}>Update</Button>
  </DialogActions>
</Dialog>

      </Stack>
    </Box>
  );
}
