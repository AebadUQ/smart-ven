"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { paths } from "@/paths";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import {
  CheckCircleIcon,
  MinusIcon,
  ClockIcon,
  PlusIcon,
  EditIcon,
  Eye,
  Trash,
} from "@/components/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { deleteStudents, getAllStudents } from "@/store/reducers/student-slice";
import { StudentRecord } from "@/types/student";
import { StudentFilter } from "./studentfilter";

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedStudents, setSelectedStudents] = React.useState<StudentRecord[]>([]);

  const { loading, students, pagination } = useSelector(
    (state: RootState) => state.student
  );

  React.useEffect(() => {
    dispatch(getAllStudents({ page: 1, limit: 10 }));
  }, [dispatch]);
console.log("selectedStudents",selectedStudents)
  const columns: ColumnDef<StudentRecord>[] = [
    {
      name: "Student",
      width: "240px",
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={1} alignItems="center">
          <img
            src={"/assets/avatar-1.png"}
            alt={row?.student?.fullname}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <Typography color="text.primary" variant="body2">
            {row?.student?.fullname}
          </Typography>
        </Stack>
      ),
    },
    {
      name: "Parent/Guardian",
      width: "200px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.primary" variant="body2">
          {row.parent.fullname}
        </Typography>
      ),
    },
    {
      name: "Class/Grade",
      width: "150px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row.student.grade}
        </Typography>
      ),
    },
    {
      name: "Van Assigned",
      width: "150px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row.van?.carNumber || "N/A"}
        </Typography>
      ),
    },
    {
      name: "Driver",
      width: "180px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row.driver?.fullname || "N/A"}
        </Typography>
      ),
    },
    {
      name: "Status",
      width: "120px",
      formatter: (row): React.JSX.Element => {
        const mapping = {
          active: {
            label: "Active",
            icon: (
              <CheckCircleIcon
                color="var(--mui-palette-success-main)"
                weight="fill"
              />
            ),
          },
          inactive: {
            label: "Inactive",
            icon: <MinusIcon color="var(--mui-palette-error-main)" />,
          },
          pending: {
            label: "Pending",
            icon: (
              <ClockIcon
                color="var(--mui-palette-warning-main)"
                weight="fill"
              />
            ),
          },
        } as const;

        const status = (row.student?.status?.trim() ||
          "pending") as keyof typeof mapping;

        const { label, icon } = mapping[status];

        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      },
    },
    {
      name: "Actions",
      width: "80px",
      align: "right",
      formatter: (row): React.JSX.Element => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);

        const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleView = () => {
          router.push(`${paths.dashboard.student}/${row.student.id}`);
          handleMenuClose();
        };

        const handleEdit = () => {
          router.push(`${paths.dashboard.student}/${row.student.id}/edit`);
          handleMenuClose();
        };

        const handleDelete = () => {
          dispatch(deleteStudents([row.student.id]));
          handleMenuClose();
        };

        return (
          <>
            <IconButton onClick={handleMenuOpen} size="small">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleView}>
                <ListItemIcon>
                  <Eye fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="View" />
              </MenuItem>

              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <EditIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>

              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <Trash fontSize="medium" color="red" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </Menu>
          </>
        );
      },
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
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "flex-start" }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography variant="h5">Student Management</Typography>
          </Box>

          <Box>
            <Link href="/student/create" passHref>
              <Button
                variant="contained"
                color="primary"
                endIcon={<PlusIcon />}
              >
                Add Student
              </Button>
            </Link>
          </Box>
        </Stack>

        <Card>
          <StudentFilter filters={null} setFilters={null} selected={selectedStudents}/>

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
            ) : students?.length ? (
              <DataTable<any>
                columns={columns}
                rows={students}
                selectable
        onSelectionChange={(ids, rows) => setSelectedStudents(rows)}
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
            count={pagination.total}
            page={pagination.page - 1}
            rowsPerPage={pagination.limit}
            onPaginationChange={(event, newPage) => {
              dispatch(getAllStudents({ page: newPage + 1, limit: pagination.limit }));
            }}
            onRowsPerPageChange={(event) => {
              dispatch(getAllStudents({ page: 1, limit: parseInt(event.target.value, 10) }));
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
