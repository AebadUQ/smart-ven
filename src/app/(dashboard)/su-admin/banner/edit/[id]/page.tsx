"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "@mui/material/Link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  Divider,
  Chip,
  Alert,
  Grid,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { z as zod } from "zod";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import { Link as LinkIcon } from "@phosphor-icons/react/dist/ssr/Link";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getBannerById, updateBanner } from "@/store/reducers/suadmin-slice";
import { uploadImage } from "@/utils/uploadImage";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// ─────────────────────────────────────────────
// Validation schema
// ─────────────────────────────────────────────
const schema = zod.object({
  title: zod.string().min(1, "Title is required"),
  imageUrl: zod.string().min(1, "Image is required"),
  redirectUrl: zod.string().optional(),
  deepLink: zod.string().optional(),
  priority: zod.coerce.number().min(1).default(1),
  isActive: zod.boolean().default(true),
  startDate: zod.string().optional(),
  endDate: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

// ─────────────────────────────────────────────
// Banner Form Component
// ─────────────────────────────────────────────
function BannerForm() {
  const { register, watch, setValue, control, formState: { errors } } = useFormContext<Values>();
  const imageUrl = watch("imageUrl");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    if (!file.type.startsWith('image/')) {
      setUploadError("Please select a valid image file");
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadError(`File size (${fileSizeMB}MB) exceeds 5MB limit`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true });
      setUploadError(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (error: any) {
      let errorMessage = "Failed to upload image";
      if (error.message?.includes("413") || error.message?.includes("Request Entity Too Large")) {
        errorMessage = "Image file is too large. Please compress or resize to less than 5MB.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      setUploadError(errorMessage);
      if (inputRef.current) inputRef.current.value = '';
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack spacing={3}>
      {/* Title Field */}
      <TextField
        fullWidth
        label="Banner Title"
        placeholder="Enter a descriptive title for this banner"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message as string}
        InputProps={{
          sx: { borderRadius: 1.5 },
        }}
      />

      {/* Image Upload Section */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
          Banner Image <Typography component="span" color="error.main">*</Typography>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => !isUploading && inputRef.current?.click()}
              sx={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: 2,
                overflow: "hidden",
                border: "2px dashed",
                borderColor: imageUrl
                  ? "success.main"
                  : errors.imageUrl
                  ? "error.main"
                  : "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: imageUrl ? "transparent" : "background.default",
                cursor: isUploading ? "not-allowed" : "pointer",
                position: "relative",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: imageUrl ? "success.dark" : "primary.main",
                  bgcolor: imageUrl ? "transparent" : "action.hover",
                },
              }}
            >
              {isUploading ? (
                <Stack spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      border: "3px solid",
                      borderColor: "primary.main",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Uploading...
                  </Typography>
                </Stack>
              ) : imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="Banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", imageUrl);
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      pointerEvents: "none",
                    }}
                  >
                    <Typography variant="caption" color="white">
                      Click to change
                    </Typography>
                  </Box>
                </>
              ) : (
                <Stack spacing={1} alignItems="center">
                  <ImageIcon size={32} color="currentColor" style={{ opacity: 0.5 }} />
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Click to upload
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    PNG or JPG
                  </Typography>
                </Stack>
              )}
            </Box>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={1.5} justifyContent="center" sx={{ height: "100%" }}>
              <Button
                variant="outlined"
                startIcon={<ImageIcon />}
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
                sx={{
                  alignSelf: "flex-start",
                  borderRadius: 1.5,
                  textTransform: "none",
                }}
              >
                {imageUrl ? "Change Image" : "Select Image"}
              </Button>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label="Max size: 5MB"
                  size="small"
                  variant="outlined"
                />
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Upload a high-quality banner image. Maximum file size is 5MB.
              </Typography>
              {uploadError && (
                <Alert severity="error" sx={{ mt: 1, borderRadius: 1.5 }}>
                  {uploadError}
                </Alert>
              )}
              {errors.imageUrl && !uploadError && (
                <Alert severity="error" sx={{ mt: 1, borderRadius: 1.5 }}>
                  {errors.imageUrl.message as string}
                </Alert>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Redirect URL Field */}
      <TextField
        fullWidth
        label="Redirect URL"
        placeholder="https://example.com (optional)"
        {...register("redirectUrl")}
        error={!!errors.redirectUrl}
        helperText={
          errors.redirectUrl?.message ||
          "Optional: Web URL to redirect users when they click on this banner"
        }
        InputProps={{
          startAdornment: <LinkIcon style={{ marginRight: 8, opacity: 0.5 }} />,
          sx: { borderRadius: 1.5 },
        }}
      />

      {/* Deep Link Field */}
      <TextField
        fullWidth
        label="Deep Link"
        placeholder="smartvan://routes (optional)"
        {...register("deepLink")}
        error={!!errors.deepLink}
        helperText={
          errors.deepLink?.message ||
          "Optional: Mobile app deep link (e.g., smartvan://routes)"
        }
        InputProps={{
          sx: { borderRadius: 1.5 },
        }}
      />

      <Divider />

      {/* Priority and Active Status */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Priority"
            type="number"
            placeholder="1"
            {...register("priority")}
            error={!!errors.priority}
            helperText={errors.priority?.message || "Banner display order (1 = highest priority)"}
            InputProps={{
              sx: { borderRadius: 1.5 },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value ?? true}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Active"
              />
            )}
          />
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Show/hide this banner
          </Typography>
        </Grid>
      </Grid>

      {/* Date Range */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date (optional)"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date: Dayjs | null) => {
                    field.onChange(date ? date.format("YYYY-MM-DD") : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      error: !!errors.startDate,
                      helperText: errors.startDate?.message || "When to start showing this banner",
                      InputProps: { sx: { borderRadius: 1.5 } },
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date (optional)"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date: Dayjs | null) => {
                    field.onChange(date ? date.format("YYYY-MM-DD") : "");
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      error: !!errors.endDate,
                      helperText: errors.endDate?.message || "When to stop showing this banner",
                      InputProps: { sx: { borderRadius: 1.5 } },
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function BannerEditPage(): React.JSX.Element {
  const router = useRouter();
  const params = useParams();
  const bannerId = String(params?.id ?? "");
  const dispatch = useDispatch<AppDispatch>();
  const { banner, bannerLoading, bannerUpdateLoading, bannerUpdateError } = useSelector(
    (state: RootState) => state.suadmin
  );

  const methods = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      imageUrl: "",
      redirectUrl: "",
      deepLink: "",
      priority: 1,
      isActive: true,
      startDate: "",
      endDate: "",
    },
  });

  const { handleSubmit, reset } = methods;

  // Fetch banner data
  React.useEffect(() => {
    if (bannerId) {
      dispatch(getBannerById(bannerId));
    }
  }, [dispatch, bannerId]);

  // Prefill form when banner data arrives
  React.useEffect(() => {
    if (banner) {
      reset({
        title: banner.title ?? "",
        imageUrl: banner.imageUrl ?? "",
        redirectUrl: banner.redirectUrl ?? "",
        deepLink: banner.deepLink ?? "",
        priority: banner.priority ?? 1,
        isActive: banner.isActive ?? true,
        startDate: banner.startDate ?? "",
        endDate: banner.endDate ?? "",
      });
    }
  }, [banner, reset]);

  const onSubmit = async (values: Values) => {
    const payload: any = {
      title: values.title,
      imageUrl: values.imageUrl,
      priority: values.priority || 1,
      isActive: values.isActive ?? true,
    };

    if (values.redirectUrl?.trim()) {
      payload.redirectUrl = values.redirectUrl.trim();
    }
    if (values.deepLink?.trim()) {
      payload.deepLink = values.deepLink.trim();
    }
    if (values.startDate?.trim()) {
      payload.startDate = values.startDate.trim();
    }
    if (values.endDate?.trim()) {
      payload.endDate = values.endDate.trim();
    }

    try {
      await dispatch(updateBanner({ id: bannerId, banner: payload })).unwrap();
      router.push("/su-admin/banner/list");
    } catch (err: any) {
      console.error("Banner update error:", err);
    }
  };

  if (bannerLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          maxWidth: "var(--Content-maxWidth)",
          m: "var(--Content-margin)",
          p: "var(--Content-padding)",
          width: "var(--Content-width)",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={4}>
                {/* Header Section */}
                <Stack spacing={2}>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href="/su-admin/banner/list"
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                      gap: 1,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    variant="subtitle2"
                  >
                    <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                    Back to Banner List
                  </Link>

                  <Stack spacing={1}>
                    <Typography variant="h4" fontWeight={700}>
                      Edit Banner
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Update banner details and settings.
                    </Typography>
                  </Stack>
                </Stack>

                <Divider />

                {/* Form */}
                <BannerForm />

                {/* Error Display */}
                {bannerUpdateError && (
                  <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {bannerUpdateError}
                  </Alert>
                )}

                <Divider />

                {/* Action Buttons */}
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  sx={{ pt: 2 }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => router.push("/su-admin/banner/list")}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      px: 3,
                      py: 1,
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={bannerUpdateLoading}
                    disabled={bannerUpdateLoading}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      px: 4,
                      py: 1,
                      fontWeight: 600,
                    }}
                  >
                    {bannerUpdateLoading ? "Updating..." : "Update Banner"}
                  </LoadingButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </FormProvider>
  );
}

