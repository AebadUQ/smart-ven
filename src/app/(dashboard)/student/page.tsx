"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
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
  Eye,
  EditIcon,
  Trash,
} from "@/components/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getAllStudents,
  deleteStudentsAndRefetch,
  getStudentDetail,               // <-- import
} from "@/store/reducers/student-slice";
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';

import type { StudentRecord } from "@/types/student";
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

        const statusKey = (row.student?.status?.trim()?.toLowerCase() ||
          "pending") as keyof typeof mapping;

        const { label, icon } = mapping[statusKey] ?? mapping.pending;

        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      },
    },
    {
  name: 'Actions',
  width: '100px',
  align: 'right',
  formatter: (row) => {
    const handleView = async () => {
      try {
        await dispatch(getStudentDetail(row.student.id)).unwrap(); // dispatch detail
        router.push(`${paths.dashboard.student}/${row.student.id}`); // then navigate
      } finally {
        // handleMenuClose();
      }
    };

    return (
      <Stack direction="row" spacing={0} sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          size="small"
          onClick={handleView}
        >
          <EyeIcon />
        </IconButton>
      </Stack>
    );
  },
}
,

  ];

  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", p: 3 }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "flex-start" }}
        >
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography variant="h5">Student Management</Typography>
          </Box>
        </Stack>

        <Card>
          <StudentFilter
            filters={null}
            setFilters={null}
            selected={selectedStudents}
          />

          <Box sx={{ overflowX: "auto" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : students?.length ? (
              <DataTable<any>
                columns={columns}
                rows={students}
                selectable
                onSelectionChange={(_, rows) => setSelectedStudents(rows)}
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
            page={Math.max(0, pagination.page - 1)}
            rowsPerPage={pagination.limit}
            onPaginationChange={(_, newPage) => {
              dispatch(
                getAllStudents({ page: newPage + 1, limit: pagination.limit })
              );
              setSelectedStudents([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              dispatch(getAllStudents({ page: 1, limit: newLimit }));
              setSelectedStudents([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
