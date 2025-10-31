"use client";

import * as React from "react";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  getAllComplaints,
  changeComplaintStatus,
} from "@/store/reducers/complaint-management";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type ComplaintType = {
  _id: string;
  type?: string;
  issueType?: string;
  description?: string;
  image?: string;
  audio?: string;
  status: "pending" | "acknowledge" | "closed";
};

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const statusColor = (s: ComplaintType["status"]) =>
  s === "pending"
    ? "warning"
    : s === "acknowledge"
    ? "success"
    : "default"; // closed

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function ParentTicketPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const {
    complaints,
    loading,
    error,
    pagination: { total, page, limit },
  } = useSelector((state: RootState) => state.complaint);

  const [selectedTickets, setSelectedTickets] = React.useState<ComplaintType[]>([]);

  // Modal state
  const [openModal, setOpenModal] = React.useState(false);
  const [currentComplaint, setCurrentComplaint] = React.useState<ComplaintType | null>(null);
  const [newStatus, setNewStatus] = React.useState<ComplaintType["status"]>("pending");
  const [feedback, setFeedback] = React.useState("");

  // initial load
  React.useEffect(() => {
    dispatch(getAllComplaints({ page: 1, limit: 10 }));
  }, [dispatch]);

  // pagination handlers
  const handlePageChange = (_: unknown, newPage0: number) => {
    dispatch(getAllComplaints({ page: newPage0 + 1, limit }));
    setSelectedTickets([]);
  };
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10) || 10;
    dispatch(getAllComplaints({ page: 1, limit: newLimit }));
    setSelectedTickets([]);
  };

  // status modal
  const handleOpenStatus = (complaint: ComplaintType) => {
    setCurrentComplaint(complaint);
    setNewStatus(complaint.status);
    setFeedback("");
    setOpenModal(true);
  };
  const handleStatusUpdate = async () => {
    if (!currentComplaint) return;
    try {
      await dispatch(
        changeComplaintStatus({
          reportId: currentComplaint._id,
          status: newStatus,
          feedback,
        })
      ).unwrap();

      // refresh current page
      await dispatch(getAllComplaints({ page, limit })).unwrap();

      setOpenModal(false);
    } catch (e) {
      // you can toast error here
      console.error(e);
    }
  };

  /* ───────────────────────────────────────
     Columns
  ─────────────────────────────────────── */
  const columns: ColumnDef<ComplaintType>[] = [
    {
      name: "Ticket ID",
      width: "140px",
      formatter: (row) => <Typography variant="body2">{row._id}</Typography>,
    },
    {
      name: "Type",
      width: "160px",
      formatter: (row) => (
        <Typography variant="body2">{row.type || row.issueType || "—"}</Typography>
      ),
    },
    {
      name: "Report Message",
      width: "320px",
      formatter: (row) => (
        <Typography variant="body2" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {row.description || "—"}
        </Typography>
      ),
    },
    {
      name: "Report Title",
      width: "220px",
      formatter: (row) => <Typography variant="body2">{row.issueType || "—"}</Typography>,
    },
    {
      name: "Image",
      width: "120px",
      formatter: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="complaint"
            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          <Typography variant="body2">N/A</Typography>
        ),
    },
    {
      name: "Audio",
      width: "170px",
      formatter: (row) =>
        row.audio ? (
          <audio controls src={row.audio} style={{ width: 150 }} />
        ) : (
          <Typography variant="body2">N/A</Typography>
        ),
    },
    {
      name: "Status",
      width: "140px",
      formatter: (row) => (
        <Chip
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          size="small"
          variant="outlined"
          color={statusColor(row.status)}
          onClick={() => handleOpenStatus(row)}
          sx={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  /* ───────────────────────────────────────
     Render
  ─────────────────────────────────────── */
  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", p: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Complaint Management</Typography>

        <Card>
          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box sx={{ p: 3 }}>
                <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
                  {String(error)}
                </Typography>
              </Box>
            ) : complaints?.length ? (
              <DataTable<ComplaintType>
                columns={columns}
                rows={complaints}
                selectable={false}
                onSelectionChange={(_, rows) => setSelectedTickets(rows as ComplaintType[])}
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

          {/* Pagination (server-side) */}
          <CustomersPagination
            count={total}
            page={Math.max(0, page - 1)}       // component expects 0-based
            rowsPerPage={limit}
            onPaginationChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
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
            <Button variant="contained" onClick={handleStatusUpdate}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
}
