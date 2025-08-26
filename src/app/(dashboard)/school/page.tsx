"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Button, Card, Divider, Stack, Typography, Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Chip, CircularProgress } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { paths } from "@/paths";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { CustomersPagination } from "@/components/dashboard/customer/customers-pagination";
import useListApi from "@/hooks/useListApi";
import { Schoolfilter } from "./schoolFilter";
import { CheckCircleIcon, MinusIcon, ClockIcon, PlusIcon, EditIcon, Eye, Trash } from "@/components/icons";
import { SCHOOL } from "@/api/endpoint";
interface PageProps {
  searchParams: { email?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const router = useRouter();

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
  } = useListApi<any>(SCHOOL.GET_ALL_SCHOOL);
  const columns = [
    // 🧑‍🎓 Student Info Column
    {
      name: 'School',
      width: '240px',
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={1} alignItems="center">
         
          <Stack>
            <Typography color="text.primary" variant="body2">
              {row?.schoolName }
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {row?.schoolEmail }
            </Typography>
          </Stack>
        </Stack>
      ),
    },

    // 👨‍👩 Parent/Guardian
    {
      name: 'Address',
      width: '200px',
      formatter: (row): React.JSX.Element => (
        <Stack>
          <Typography color="text.primary" variant="body2">
            {row?.address }
          </Typography>
          {/* <Typography color="text.secondary" variant="caption">
          {row?.parentPhone || 'N/A'}
        </Typography> */}
        </Stack>
      ),
    },

    // 🏷️ Class/Grade
    {
      name: 'Branch Name',
      width: '150px',
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row?.branchName }
        </Typography>
      ),
    },

    // 🚐 Van Assigned
    {
      name: 'Contact',
      width: '150px',
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row?.contactNumber }
        </Typography>
      ),
    },

    // 🛣️ Route #
    {
      name: 'Geo Location',
      width: '160px',
      formatter: (row): React.JSX.Element => (
        <Typography color="text.secondary" variant="body2">
          {row?.lat + "  " + row?.long}
        </Typography>
      ),
    },

    // ✅ Status
    {
      formatter: (row): React.JSX.Element => {
        const mapping = {
          active: { label: 'active', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
          blocked: { label: 'Blocked', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
          pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        } as const;
        const { label, icon } = mapping[row?.status] ?? { label: 'active', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> };

        return <Chip icon={icon} label={label} size="small" variant="outlined" />;
      },
      name: 'Status',
      width: '100px',
    },
   
    {
      name: 'Actions',
      width: '40px',
      align: 'right',
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
          router.push(`${paths.dashboard.student}/${row?.schoolId || ''}`);
          handleMenuClose();
        };

        const handleEdit = () => {
          router.push(`${paths.dashboard.student}/${row?.schoolId || ''}/edit`);
          handleMenuClose();
        };

        const handleDelete = () => {
          console.log('Delete:', row);
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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                  <Trash fontSize="medium" color='red' />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
            </Menu>
          </>
        );
      },
    }
  ] satisfies ColumnDef<any>[];

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">School Management</Typography>
          </Box>

          <Box>
            <Link href="/school/create" passHref>
              <Button variant="contained" color="primary" endIcon={<PlusIcon />}  >
                Add School
              </Button>
            </Link>
          </Box>
        </Stack>

        <Card>
          <Schoolfilter filters={filter} setFilters={setFilter} />

          <Box sx={{ overflowX: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : data?.length ? (
              <DataTable<any> columns={columns} rows={data} selectable={true} />
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
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
            onPaginationChange={(event, newPage) => onPaginationChange(newPage + 1)} // MUI 0-based index handle karega
            onRowsPerPageChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
          />;
        </Card>
      </Stack>
    </Box>
  );
}
