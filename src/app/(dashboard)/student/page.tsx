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
import useListApi from "@/hooks/useListApi";
import { StudentFilter } from "./studentfilter";
import {
  CheckCircleIcon,
  MinusIcon,
  ClockIcon,
  PlusIcon,
  EditIcon,
  Eye,
  Trash,
} from "@/components/icons";
import { STUDENT } from "@/api/endpoint"; // ✅ Import API endpoints

interface PageProps {
  searchParams: {
    email?: string;
    phone?: string;
    sortDir?: "asc" | "desc";
    status?: string;
  };
}

export default function Page({
  searchParams,
}: PageProps): React.JSX.Element {
  const router = useRouter();

  // ✅ getAllStudents API call via useListApi
  const {
    data,
    loading,
    onPaginationChange,
    onPageSizeChange,
    onSort,
    filter,
    total,
    pageSize,
    pageIndex,
    setFilter,
  } = useListApi<any>(STUDENT.GET_ALL_STUDENTS);

  console.log("Student data", data);

  const columns = [
    {
      name: "Student",
      width: "240px",
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={1} alignItems="center">
          <img
            src={row?.photoUrl || "/assets/avatar-1.png"}
            alt={row?.name}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <Stack>
            <Typography color="text.primary" variant="body2">
              {row?.student.fullname}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      name: "Parent/Guardian",
      width: "200px",
      formatter: (row): React.JSX.Element => (
        <Stack>
          <Typography color="text.primary" variant="body2">
            {row?.parent.fullname}
          </Typography>
        </Stack>
      ),
    },
    {
      name: "Class/Grade",
      width: "150px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row?.student.grade}
        </Typography>
      ),
    },
    {
      name: "Van Assigned",
      width: "150px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row?.student.carNumber || 'N/A'}
        </Typography>
      ),
    },
    {
      name: "Route #",
      width: "120px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row?.route?.name || 'N/A'}
        </Typography>
      ),
    },
  {
  name: "Status",
  width: "100px",
  formatter: (row): React.JSX.Element => {
    const mapping = {
      active: {
        label: "active",
        icon: (
          <CheckCircleIcon
            color="var(--mui-palette-success-main)"
            weight="fill"
          />
        ),
      },
      inactive: {
        label: "inactive",
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

    // 👇 yahan casting karna zaroori hai
    const status = (row?.student?.status ?? "active") as keyof typeof mapping;

    const { label, icon } = mapping[status];

    return (
      <Chip icon={icon} label={label} size="small" variant="outlined" />
    );
  },
}
,
    {
      name: "Actions",
      width: "80px",
      align: "right",
      formatter: (row): React.JSX.Element => {
        const [anchorEl, setAnchorEl] =
          React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);

        const handleMenuOpen = (
          event: React.MouseEvent<HTMLElement>
        ) => {
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleView = () => {
          router.push(
            `${paths.dashboard.student}/${row?.student.id || ""}`
          );
          handleMenuClose();
        };

        const handleEdit = () => {
          router.push(
            `${paths.dashboard.student}/${row?.schoolId || ""}/edit`
          );
          handleMenuClose();
        };

        const handleDelete = () => {
          console.log("Delete:", row);
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
  ] satisfies ColumnDef<any>[];

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
            <Typography variant="h5">
              Student Management
            </Typography>
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
          <StudentFilter filters={filter} setFilters={setFilter} />

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
            ) : data?.length ? (
              <DataTable<any>
                columns={columns}
                rows={data}
                selectable={true}
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
            count={total}
            page={pageIndex}
            rowsPerPage={pageSize}
            onPaginationChange={(event, newPage) =>
              onPaginationChange(newPage + 1)
            }
            onRowsPerPageChange={(event) =>
              onPageSizeChange(parseInt(event.target.value, 10))
            }
          />
        </Card>
      </Stack>
    </Box>
  );
}
