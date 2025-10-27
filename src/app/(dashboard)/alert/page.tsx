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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteAlert, getAlertById, getAllAlerts } from "@/store/reducers/alert-slice";
import dayjs from "dayjs";
import { formatLabel } from "@/utils/data";
import { paths } from "@/paths";

type AlertRecord = {
  _id: number;
  alertType: string;
  message: string;
  recipientType: string;
  date: string;
  status: string;
};

// ─── Actions Component ─────────────────────────────
const AlertActions = ({ row }: { row: AlertRecord }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleView = async () => {
    try {
      await dispatch(getAlertById(row._id)).unwrap();
      router.push(`${paths.dashboard.alert}/${row._id}`);
    } finally {
      handleMenuClose();
    }
  };

  const handleEdit = () => {
    router.push(`${paths.dashboard.alert}/edit/${row._id}`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAlert({ alertId: row._id })).unwrap();
    } catch (err: any) {
    } finally {
      handleMenuClose();
    }
  };

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
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Stack>
  );
};
// ─── Main Component ───────────────────────────────
export default function AlertPage(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, alerts, pagination } = useSelector(
    (state: RootState) => state.alert
  );

  const [selectedAlerts, setSelectedAlerts] = React.useState<AlertRecord[]>([]);

  React.useEffect(() => {
    dispatch(getAllAlerts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const columns: ColumnDef<AlertRecord>[] = [
    {
      name: "Alert ID",
      width: "100px",
      formatter: (row) => <Typography variant="body2">{row._id}</Typography>,
    },
    {
      name: "Alert Title",
      width: "200px",
      formatter: (row) => <Typography variant="body2">{row.alertType}</Typography>,
    },
    {
      name: "Message",
      width: "300px",
      formatter: (row) => <Typography variant="body2">{row.message}</Typography>,
    },
    {
      name: "Send To",
      width: "150px",
      formatter: (row) => (
        <Typography variant="body2">{formatLabel(row.recipientType)}</Typography>
      ),
    },
    {
      name: "Date/Time",
      width: "180px",
      formatter: (row) => (
        <Typography variant="body2">
          {dayjs(row.date).format("DD MMM YYYY, hh:mm A")}
        </Typography>
      ),
    },
    {
      name: "Status",
      width: "120px",
      formatter: (row) => {
        const color =
          row.status === "Active"
            ? "green"
            : row.status === "Sent"
            ? "blue"
            : "gray";
        return (
          <Chip
            label={row.status}
            size="small"
            style={{ borderColor: color, color }}
            variant="outlined"
          />
        );
      },
    },
    {
      name: "Actions",
      width: "100px",
      align: "right",
      formatter: (row) => <AlertActions row={row} />,
    },
  ];

  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", p: 3 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Alerts</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/alert/create")}
          >
            Add Alert
          </Button>
        </Box>

        <Card>
          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : alerts.length ? (
              <DataTable<any>
                columns={columns}
                rows={alerts}
                selectable={false}
                onSelectionChange={(_, rows) => setSelectedAlerts(rows)}
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

          <CustomersPagination
            count={pagination?.total}
            page={Math.max(0, pagination.page - 1)}
            rowsPerPage={pagination.limit}
            onPaginationChange={(_, newPage) => {
              dispatch(
                getAllAlerts({ page: newPage + 1, limit: pagination.limit })
              );
              setSelectedAlerts([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              dispatch(getAllAlerts({ page: 1, limit: newLimit }));
              setSelectedAlerts([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
