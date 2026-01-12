"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
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
  IconButton,
  Divider,
  Chip,
  Alert,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, useFieldArray, FormProvider, useFormContext, Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { z as zod } from "zod";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { X as XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import { Link as LinkIcon } from "@phosphor-icons/react/dist/ssr/Link";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { createBanner } from "@/store/reducers/suadmin-slice";
import { uploadImage } from "@/utils/uploadImage";

// ─────────────────────────────────────────────
// Validation schema
// ─────────────────────────────────────────────
const bannerSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
  imageUrl: zod.string().min(1, "Image is required"),
  redirectUrl: zod.string().optional(),
  deepLink: zod.string().optional(),
  priority: zod.coerce.number().min(1).default(1),
  isActive: zod.boolean().default(true),
  startDate: zod.string().optional(),
  endDate: zod.string().optional(),
});

const schema = zod.object({
  banners: zod
    .array(bannerSchema)
    .min(1, "At least one banner is required")
    .max(5, "Maximum 5 banners allowed"),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  banners: [
    {
      title: "",
      imageUrl: "",
      redirectUrl: "",
      deepLink: "",
      priority: 1,
      isActive: true,
      startDate: "",
      endDate: "",
    },
  ],
};

// ─────────────────────────────────────────────
// Banner Item Component
// ─────────────────────────────────────────────
function BannerItem({
  index,
  onRemove,
  canRemove,
}: {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const { register, watch, setValue, control, formState: { errors } } = useFormContext<Values>();
  const imageUrl = watch(`banners.${index}.imageUrl`);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const bannerErrors = errors.banners?.[index];
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // Debug: Log imageUrl changes
  React.useEffect(() => {
    console.log(`Banner ${index + 1} imageUrl:`, imageUrl);
  }, [imageUrl, index]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear previous errors
    setUploadError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError("Please select a valid image file (PNG, JPG, etc.)");
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadError(`File size (${fileSizeMB}MB) exceeds the maximum limit of 5MB. Please compress or resize the image.`);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    
    try {
      const url = await uploadImage(file);
      console.log("Uploaded image URL:", url);
      setValue(`banners.${index}.imageUrl`, url, { shouldValidate: true, shouldDirty: true });
      setUploadError(null);
      
      // Reset input to allow re-uploading the same file
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error: any) {
      console.error("Failed to upload image:", error);
      
      // Handle specific error messages
      let errorMessage = "Failed to upload image. Please try again.";
      if (error.message?.includes("413") || error.message?.includes("Request Entity Too Large")) {
        errorMessage = "Image file is too large. Please compress or resize the image to less than 5MB.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setUploadError(errorMessage);
      
      // Reset input on error
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pb: 1 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                {index + 1}
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Banner {index + 1}
              </Typography>
            </Stack>
            {canRemove && (
              <IconButton
                size="small"
                onClick={onRemove}
                sx={{
                  color: "error.main",
                  "&:hover": {
                    bgcolor: "error.lighter",
                  },
                }}
              >
                <XIcon />
              </IconButton>
            )}
          </Stack>

          <Divider />

          {/* Title Field */}
          <TextField
            fullWidth
            label="Banner Title"
            placeholder="Enter a descriptive title for this banner"
            {...register(`banners.${index}.title`)}
            error={!!bannerErrors?.title}
            helperText={bannerErrors?.title?.message as string}
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
                      : bannerErrors?.imageUrl
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
                        alt={`Banner ${index + 1}`}
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
                        onLoad={() => {
                          console.log("Image loaded successfully:", imageUrl);
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
                    Upload a high-quality banner image. The recommended aspect ratio is 3:1 (width:height).
                    Maximum file size is 5MB.
                  </Typography>
                  {uploadError && (
                    <Alert severity="error" sx={{ mt: 1, borderRadius: 1.5 }}>
                      {uploadError}
                    </Alert>
                  )}
                  {bannerErrors?.imageUrl && !uploadError && (
                    <Alert severity="error" sx={{ mt: 1, borderRadius: 1.5 }}>
                      {bannerErrors.imageUrl.message as string}
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
            {...register(`banners.${index}.redirectUrl`)}
            error={!!bannerErrors?.redirectUrl}
            helperText={
              bannerErrors?.redirectUrl?.message ||
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
            {...register(`banners.${index}.deepLink`)}
            error={!!bannerErrors?.deepLink}
            helperText={
              bannerErrors?.deepLink?.message ||
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
                {...register(`banners.${index}.priority`)}
                error={!!bannerErrors?.priority}
                helperText={bannerErrors?.priority?.message || "Banner display order (1 = highest priority)"}
                InputProps={{
                  sx: { borderRadius: 1.5 },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name={`banners.${index}.isActive`}
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
                name={`banners.${index}.startDate`}
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
                          error: !!bannerErrors?.startDate,
                          helperText: bannerErrors?.startDate?.message || "When to start showing this banner",
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
                name={`banners.${index}.endDate`}
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
                          error: !!bannerErrors?.endDate,
                          helperText: bannerErrors?.endDate?.message || "When to stop showing this banner",
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
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function BannerPage(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { bannerCreateLoading, bannerCreateError } = useSelector(
    (state: RootState) => state.suadmin
  );

  const methods = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "banners",
  });

  const onSubmit = async (values: Values) => {
    // Format banners according to API payload structure
    const banners = values.banners.map((banner) => {
      const payload: any = {
        title: banner.title,
        imageUrl: banner.imageUrl,
        priority: banner.priority || 1,
        isActive: banner.isActive ?? true,
      };

      // Only include optional fields if they have values
      if (banner.redirectUrl?.trim()) {
        payload.redirectUrl = banner.redirectUrl.trim();
      }
      if (banner.deepLink?.trim()) {
        payload.deepLink = banner.deepLink.trim();
      }
      if (banner.startDate?.trim()) {
        payload.startDate = banner.startDate.trim();
      }
      if (banner.endDate?.trim()) {
        payload.endDate = banner.endDate.trim();
      }

      return payload;
    });

    try {
      await dispatch(createBanner({ banners })).unwrap();
      router.push("/su-admin/banner/list");
    } catch (err: any) {
      console.error("Banner creation error:", err);
    }
  };

  const canAddMore = fields.length < 5;

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
                    href="/su-admin/school-management"
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
                    Back to School Management
                  </Link>

                  <Stack spacing={1}>
                    <Typography variant="h4" fontWeight={700}>
                      Banner Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Create and manage promotion banners for your platform. You can add up to 5 banners,
                      each with a title, image, and optional redirect URL.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={`${fields.length} / 5 Banners`}
                      color={fields.length >= 5 ? "error" : "primary"}
                      variant="soft"
                      size="small"
                    />
                    {fields.length >= 5 && (
                      <Typography variant="caption" color="error.main">
                        Maximum limit reached
                      </Typography>
                    )}
                  </Stack>
                </Stack>

                <Divider />

                {/* Banner Items */}
                <Stack spacing={0}>
                  {fields.map((field, index) => (
                    <BannerItem
                      key={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                      canRemove={fields.length > 1}
                    />
                  ))}
                </Stack>

                {/* Add Banner Button */}
                {canAddMore && (
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<PlusIcon />}
                    onClick={() =>
                      append({
                        title: "",
                        imageUrl: "",
                        redirectUrl: "",
                        deepLink: "",
                        priority: fields.length + 1,
                        isActive: true,
                        startDate: "",
                        endDate: "",
                      })
                    }
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        py: 1.5,
                        px: 3,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        "&:hover": {
                          borderStyle: "dashed",
                          borderWidth: 2,
                          bgcolor: "action.hover",
                        },
                      }}
                      fullWidth
                    >
                      Add Another Banner
                    </Button>
                  </Box>
                )}

                {!canAddMore && (
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    You have reached the maximum limit of 5 banners. Remove an existing banner to add a new one.
                  </Alert>
                )}

                {/* Error Display */}
                {bannerCreateError && (
                  <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {bannerCreateError}
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
                    onClick={() => router.push("/su-admin/school-management")}
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
                    loading={bannerCreateLoading}
                    disabled={bannerCreateLoading}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      px: 4,
                      py: 1,
                      fontWeight: 600,
                    }}
                  >
                    {bannerCreateLoading ? "Saving..." : "Save All Banners"}
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

