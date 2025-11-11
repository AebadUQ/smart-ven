// app/(dashboard)/complaints/page.tsx  (rename path as per your routing)

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
} from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getAllComplaints,
  changeComplaintStatus,
  type ComplaintStatus,
  type ComplaintFilters,
} from "@/store/reducers/complaint-management";
import { ComplaintFilter } from "./studentfilter";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ParentTicketPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { complaints, loading, pagination } = useSelector(
    (state: RootState) => state.complaint
  );

  const [selectedTickets, setSelectedTickets] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useState<ComplaintFilters>({});
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  // Modal state
  const [openModal, setOpenModal] = React.useState(false);
  const [currentComplaint, setCurrentComplaint] =
    React.useState<any | null>(null);
  const [newStatus, setNewStatus] =
    React.useState<ComplaintStatus>("pending");
  const [feedback, setFeedback] = React.useState("");

  // Fetch complaints when page/limit/filters change
  React.useEffect(() => {
    dispatch(
      getAllComplaints({
        page,
        limit,
        ...filters,
      })
    );
  }, [dispatch, page, limit, filters]);

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case "pending":
        return "orange";
      case "acknowledge":
        return "green";
      case "closed":
        return "gray";
      default:
        return "blue";
    }
  };

  const handleStatusClick = (complaint: any) => {
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
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      name: "Ticket ID",
      width: "120px",
      formatter: (row) => (
        <Typography variant="body2">{row._id}</Typography>
      ),
    },
    {
      name: "Type",
      width: "140px",
      formatter: (row) => (
        <Typography variant="body2">
          {row.type || row.issueType || "-"}
        </Typography>
      ),
    },
    {
      name: "Report Title",
      width: "180px",
      formatter: (row) => (
        <Typography variant="body2">
          {row.issueType || "-"}
        </Typography>
      ),
    },
    {
      name: "Report Message",
      width: "260px",
      formatter: (row) => (
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {row.description || "-"}
        </Typography>
      ),
    },
    {
      name: "Complaint Image",
      width: "120px",
      formatter: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="complaint"
            style={{ width: 50, height: 50, borderRadius: 4 }}
          />
        ) : (
          <Typography variant="body2">N/A</Typography>
        ),
    },
    {
      name: "Complaint Audio",
      width: "150px",
      formatter: (row) =>
        row.audio ? (
          <audio
            controls
            src={row.audio}
            style={{ width: "100%" }}
          />
        ) : (
          <Typography variant="body2">N/A</Typography>
        ),
    },
    {
      name: "Status",
      width: "130px",
      formatter: (row) => (
        <Chip
          label={
            row.status.charAt(0).toUpperCase() + row.status.slice(1)
          }
          size="small"
          style={{
            borderColor: getStatusColor(row.status),
            color: getStatusColor(row.status),
            cursor: "pointer",
          }}
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
          {/* Filters */}
          <ComplaintFilter
            filters={filters}
            setFilters={(updater) => {
              setPage(1); // reset page when filters change
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
            ) : complaints?.length ? (
              <DataTable<any>
                columns={columns}
                rows={complaints}
                selectable={false}
                onSelectionChange={(_, rows) =>
                  setSelectedTickets(rows)
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
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </Card>

        {/* Status Change Modal */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Update Complaint Status</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={newStatus}
                  label="Status"
                  onChange={(e) =>
                    setNewStatus(e.target.value as ComplaintStatus)
                  }
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
