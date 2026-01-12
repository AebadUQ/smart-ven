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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataTable, type ColumnDef } from "@/components/core/data-table";
import { Pencil as PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import { Trash as TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getAllBanners, deleteBanner } from "@/store/reducers/suadmin-slice";

type BannerRow = {
  _id: string;
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  deepLink?: string;
  priority: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
};

export default function BannerListPage(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { banners, bannersLoading, bannersError, bannerDeleteLoading } = useSelector(
    (s: RootState) => s.suadmin
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [bannerToDelete, setBannerToDelete] = React.useState<BannerRow | null>(null);

  React.useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);

  const handleDeleteClick = (row: BannerRow) => {
    setBannerToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bannerToDelete) return;
    
    try {
      await dispatch(deleteBanner(bannerToDelete._id)).unwrap();
      setDeleteDialogOpen(false);
      setBannerToDelete(null);
      // Refresh the list
      dispatch(getAllBanners());
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBannerToDelete(null);
  };

  // Map API -> UI
  const rows: BannerRow[] = React.useMemo(() => {
    return (banners ?? []).map((b: any) => ({
      _id: b?._id ?? b?.id,
      title: b?.title ?? "—",
      imageUrl: b?.imageUrl ?? "",
      redirectUrl: b?.redirectUrl,
      deepLink: b?.deepLink,
      priority: Number(b?.priority ?? 1),
      isActive: b?.isActive ?? true,
      startDate: b?.startDate,
      endDate: b?.endDate,
    }));
  }, [banners]);

  const columns: ColumnDef<BannerRow>[] = [
    {
      name: "Banner",
      width: "300px",
      formatter: (row) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={row.imageUrl}
            variant="rounded"
            sx={{
              width: 80,
              height: 45,
              borderRadius: 1,
            }}
          >
            No Image
          </Avatar>
          <Stack>
            <Typography variant="body2" fontWeight={500}>
              {row.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Priority: {row.priority}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      name: "Redirect URL",
      width: "200px",
      formatter: (row) => (
        <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
          {row.redirectUrl || "—"}
        </Typography>
      ),
    },
    {
      name: "Deep Link",
      width: "180px",
      formatter: (row) => (
        <Typography variant="body2" color="text.secondary">
          {row.deepLink || "—"}
        </Typography>
      ),
    },
    {
      name: "Date Range",
      width: "200px",
      formatter: (row) => (
        <Stack>
          {row.startDate && (
            <Typography variant="caption" color="text.secondary">
              Start: {new Date(row.startDate).toLocaleDateString()}
            </Typography>
          )}
          {row.endDate && (
            <Typography variant="caption" color="text.secondary">
              End: {new Date(row.endDate).toLocaleDateString()}
            </Typography>
          )}
          {!row.startDate && !row.endDate && (
            <Typography variant="caption" color="text.secondary">
              No date range
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      name: "Status",
      width: "120px",
      formatter: (row) => (
        <Chip
          size="small"
          variant="outlined"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
        />
      ),
    },
    {
      name: "Actions",
      width: "120px",
      align: "right",
      formatter: (row) => {
        const handleEdit = () => {
          router.push(`/su-admin/banner/edit/${row._id}`);
        };
        return (
          <Stack direction="row" spacing={0} sx={{ justifyContent: "flex-end" }}>
            <IconButton 
              size="small" 
              onClick={handleEdit}
              sx={{ color: "primary.main" }}
            >
              <PencilIcon />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => handleDeleteClick(row)}
              sx={{ color: "error.main" }}
            >
              <TrashIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "var(--mui-palette-background-level1)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            Banner Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => router.push("/su-admin/banner")}
            sx={{ textTransform: "none" }}
          >
            Add Banner
          </Button>
        </Stack>

        {/* Table Card */}
        <Card variant="outlined">
          {bannersLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : bannersError ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="error">{bannersError}</Typography>
            </Box>
          ) : rows.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">No banners found</Typography>
              <Button
                variant="outlined"
                startIcon={<PlusIcon />}
                onClick={() => router.push("/su-admin/banner")}
                sx={{ mt: 2, textTransform: "none" }}
              >
                Create First Banner
              </Button>
            </Box>
          ) : (
            <>
              <DataTable columns={columns} rows={rows} />
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total: {rows.length} banner{rows.length !== 1 ? "s" : ""}
                </Typography>
              </Box>
            </>
          )}
        </Card>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Banner?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the banner "{bannerToDelete?.title}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDeleteCancel}
            disabled={bannerDeleteLoading}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={bannerDeleteLoading}
            sx={{ textTransform: "none" }}
          >
            {bannerDeleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

