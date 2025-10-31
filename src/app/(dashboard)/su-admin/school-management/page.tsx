"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Chip,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getAllSchools, getSchoolById } from "@/store/reducers/suadmin-slice";
import { PlusIcon } from "@/components/icons";

type UiSchoolRow = {
  _id: string;            // backend id (for routes)
  name: string;           // schoolName
  contact: string;        // contactPerson or admin.name
  vansLimit: number;      // allowedVans
  routesLimit: number;    // allowedRoutes
  students: number;       // allowedStudents
  status: "active" | "inactive";
};

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // from suadmin slice (as designed earlier)
  const { schools, total, page, limit, listLoading, listError } = useSelector(
    (s: RootState) => s.suadmin
  );

  const [selectedRows, setSelectedRows] = React.useState<UiSchoolRow[]>([]);

  React.useEffect(() => {
    dispatch(getAllSchools({ page: 1, limit: 10 }));
  }, [dispatch]);

  // map API -> UI
  const rows: UiSchoolRow[] = React.useMemo(() => {
    return (schools ?? []).map((s: any) => ({
      _id: s?._id,
      name: s?.schoolName ?? s?.name ?? "—",
      contact: s?.contactPerson ?? s?.admin?.name ?? "—",
      vansLimit: Number(s?.allowedVans ?? 0),
      routesLimit: Number(s?.allowedRoutes ?? 0),
      students: Number(s?.allowedStudents ?? 0),
      status:
        String(s?.status ?? "active").toLowerCase() === "active"
          ? "active"
          : "inactive",
    }));
  }, [schools]);

  const columns: ColumnDef<UiSchoolRow>[] = [
    {
      name: "School",
      width: "260px",
      formatter: (row) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#F6F7F9",
              border: "1px solid #E0E2E7",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            {row.name?.[0] ?? "?"}
          </Box>
          <Typography color="text.primary" variant="body2">
            {row.name}
          </Typography>
        </Stack>
      ),
    },
    {
      name: "Contact",
      width: "180px",
      formatter: (row) => (
        <Typography color="text.primary" variant="body2">
          {row.contact}
        </Typography>
      ),
    },
    {
      name: "Vans",
      width: "90px",
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.vansLimit}
        </Typography>
      ),
    },
    {
      name: "Routes",
      width: "100px",
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.routesLimit}
        </Typography>
      ),
    },
    {
      name: "Students",
      width: "110px",
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.students}
        </Typography>
      ),
    },
    {
      name: "Status",
      width: "120px",
      formatter: (row) => (
        <Chip
          size="small"
          variant="outlined"
          label={row.status === "active" ? "Active" : "Inactive"}
          color={row.status === "active" ? "success" : "default"}
        />
      ),
    },
    {
      name: "Actions",
      width: "90px",
      align: "right",
      formatter: (row) => {
        const handleView = async () => {
          if (!row._id) return;
          try {
            await dispatch(getSchoolById(row._id)).unwrap();
          } finally {
            router.push(`/su-admin/school-management/${row._id}`);
          }
        };
        return (
          <Stack direction="row" spacing={0} sx={{ justifyContent: "flex-end" }}>
            <IconButton size="small" onClick={handleView}>
              <EyeIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", p: 3 }}>
      <Stack spacing={3}>
 <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            School Management
          </Typography>

           <Button
              variant="contained"
              color="primary"
              endIcon={<PlusIcon />}
              onClick={() => router.push('/su-admin/school-management/add-school')}
            >
              Add School
            </Button>
        </Stack>

        <Card>
          {/* TABLE */}
          <Box sx={{ overflowX: "auto" }}>
            {listLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : listError ? (
              <Box sx={{ p: 3 }}>
                <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
                  {listError}
                </Typography>
              </Box>
            ) : rows.length ? (
              <DataTable<UiSchoolRow>
                columns={columns}
                rows={rows}
                selectable
                onSelectionChange={(_, r) => setSelectedRows(r as UiSchoolRow[])}
              />
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary" variant="body2" sx={{ textAlign: "center" }}>
                  No Data found
                </Typography>
              </Box>
            )}
          </Box>

          <Divider />

          {/* PAGINATION */}
          <CustomersPagination
            count={total ?? 0}
            page={Math.max(0, (page ?? 1) - 1)}     // component expects 0-based
            rowsPerPage={limit ?? 10}
            onPaginationChange={(_, newPage0) => {
              const next = newPage0 + 1;
              dispatch(getAllSchools({ page: next, limit: limit ?? 10 }));
              setSelectedRows([]);
            }}
            onRowsPerPageChange={(e) => {
              const newLimit = parseInt(e.target.value, 10);
              dispatch(getAllSchools({ page: 1, limit: newLimit }));
              setSelectedRows([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
