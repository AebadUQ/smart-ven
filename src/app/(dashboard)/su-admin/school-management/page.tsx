"use client";

import * as React from "react";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import { PlusIcon } from "@/components/icons";
import { useRouter } from 'next/navigation';
import { Schoolfilter } from "../../school/schoolFilter";
/* ---------------------------------
   types
--------------------------------- */
type SchoolRecord = {
  id: string;
  logo: string; // url
  name: string;
  contact: string;
  vansLimit: number;
  routesLimit: number;
  students: number;
  status: "active" | "inactive";
};

/* ---------------------------------
   static demo rows
--------------------------------- */
const STATIC_SCHOOLS: SchoolRecord[] = [
  {
    id: "SCH-001",
    logo: "/logo1.png",
    name: "Zuomaa Daycare",
    contact: "Ali Khan",
    vansLimit: 60,
    routesLimit: 20,
    students: 1000,
    status: "active",
  },
  {
    id: "SCH-002",
    logo: "/logo2.png",
    name: "City School",
    contact: "Ayesha Noor",
    vansLimit: 25,
    routesLimit: 10,
    students: 400,
    status: "active",
  },
  {
    id: "SCH-003",
    logo: "/logo3.png",
    name: "Roots Intl",
    contact: "Bilal Khan",
    vansLimit: 30,
    routesLimit: 9,
    students: 600,
    status: "inactive",
  },
  {
    id: "SCH-004",
    logo: "/logo3.png",
    name: "Roots Intl",
    contact: "Bilal Khan",
    vansLimit: 39,
    routesLimit: 5,
    students: 900,
    status: "active",
  },
  {
    id: "SCH-005",
    logo: "/logo3.png",
    name: "Roots Intl",
    contact: "Bilal Khan",
    vansLimit: 28,
    routesLimit: 13,
    students: 480,
    status: "active",
  },
];

/* ---------------------------------
   Status chip like design
   (green "Active" pill w/ dot)
--------------------------------- */
function StatusChip({ value }: { value: "active" | "inactive" }) {
  const isActive = value === "active";
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "4px",
        border: `1px solid ${isActive ? "#4CAF50" : "#9e9e9e"}`,
        bgcolor: isActive
          ? "rgba(76,175,80,0.08)"
          : "rgba(158,158,158,0.08)",
        color: isActive ? "#2e7d32" : "#616161",
        fontSize: "12px",
        lineHeight: 1.4,
        fontWeight: 500,
        px: 1,
        py: "2px",
        whiteSpace: "nowrap",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "999px",
          backgroundColor: isActive ? "#4CAF50" : "#9e9e9e",
          mr: 0.5,
          flexShrink: 0,
        }}
      />
      {isActive ? "Active" : "Inactive"}
    </Box>
  );
}

/* ---------------------------------
   Row actions menu (3 dots)
--------------------------------- */
export const Actions = ({ row }: { row: any }) => {
  const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleView = async () => {
    router.push(`${'/su-admin/school-management'}/2`);
    // try {
    //   await dispatch(getAlertById(row._id)).unwrap();
    //   router.push(`${paths.dashboard.alert}/${row._id}`);
    // } finally {
    //   handleMenuClose();
    // }
        handleMenuClose();

  };

  const handleEdit = () => {
        router.push(`${'/su-admin/school-management/edit'}`);

    // router.push(`${paths.dashboard.alert}/edit/${row._id}`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    // try {
    //   await dispatch(deleteAlert({ alertId: row._id })).unwrap();
    // } catch (err: any) {
    // } finally {
    //   handleMenuClose();
    // }
        handleMenuClose();

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
/* ---------------------------------
   Main component
--------------------------------- */
export default function Page(): React.JSX.Element {
  const router =useRouter()
  const [selectedSchools, setSelectedSchools] = React.useState<
    SchoolRecord[]
  >([]);

  const pagination = {
    total: STATIC_SCHOOLS.length,
    page: 1,
    limit: 10,
  };

  // DataTable columns
  const columns: ColumnDef<SchoolRecord>[] = [
    {
      name: "ID",
      width: "100px",
      formatter: (row): React.JSX.Element => (
        <Typography
          color="text.primary"
          variant="body2"
          sx={{ fontWeight: 500, whiteSpace: "nowrap" }}
        >
          {row.id}
        </Typography>
      ),
    },
  {
  name: "Logo & Name",
  width: "220px",
  formatter: (row): React.JSX.Element => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1px solid #E0E2E7",
            bgcolor: "#F6F7F9",
            fontSize: "10px",
            fontWeight: 500,
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {row.name?.[0] ?? "?"}
        </Box>

      <Typography
        color="text.primary"
        variant="body2"
        sx={{ fontWeight: 500, lineHeight: 1.3 }}
      >
        {row.name}
      </Typography>
    </Stack>
  ),
},

    {
      name: "Contact",
      width: "160px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.primary" variant="body2">
          {row.contact}
        </Typography>
      ),
    },
    {
      name: "Vans Limit",
      width: "100px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row.vansLimit}
        </Typography>
      ),
    },
    {
      name: "Routes Limit",
      width: "110px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row.routesLimit}
        </Typography>
      ),
    },
    {
      name: "Students",
      width: "100px",
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row.students}
        </Typography>
      ),
    },
    {
      name: "Status",
      width: "120px",
      formatter: (row): React.JSX.Element => (
        <StatusChip value={row.status} />
      ),
    },
    {
      name: "Actions",
      width: "80px",
      align: "right",
      formatter: (): React.JSX.Element => (
        <Stack
          direction="row"
          spacing={0}
          sx={{ justifyContent: "flex-end" }}
        >
          <Actions row={null} />
        </Stack>
      ),
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
        {/* HEADER BAR:
            - "School Management" left
            - "Add School" button right
        */}
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
             <Schoolfilter
                        filters={null}
                        setFilters={null}
                        selected={setSelectedSchools}
                      />
            <DataTable<SchoolRecord>
              columns={columns}
              rows={STATIC_SCHOOLS}
              selectable
              onSelectionChange={(_, rows) =>
                setSelectedSchools(rows as SchoolRecord[])
              }
            />

          <Divider />

          {/* PAGINATION */}
          <CustomersPagination
            count={pagination.total}
            page={Math.max(0, pagination.page - 1)}
            rowsPerPage={pagination.limit}
            onPaginationChange={(_, newPage) => {
              console.log("change page to", newPage + 1);
              setSelectedSchools([]);
            }}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              console.log("change rowsPerPage to", newLimit);
              setSelectedSchools([]);
            }}
          />
        </Card>
      </Stack>
    </Box>
  );
}
