"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Divider,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import RouterLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getSchoolById, editSchool } from "@/store/reducers/suadmin-slice";

/* ===================== TABS ===================== */

type TabKey = "profile" | "route_rules" | "limits" | "subscription";
const tabsList: { key: TabKey; label: string; order: number }[] = [
  { key: "profile", label: "Profile", order: 0 },
  { key: "route_rules", label: "Route Rules", order: 1 },
  { key: "limits", label: "Limits", order: 2 },
  { key: "subscription", label: "Subscription & Billing", order: 3 },
];

/* ===================== ZOD SCHEMA ===================== */

const schema = z.object({
  // Profile
  adminName: z.string().min(1, "Admin name is required"),
  adminEmail: z.string().email("Invalid admin email"),
  schoolName: z.string().min(1, "School name is required"),
  schoolEmail: z.string().email("Invalid school email"),
  address: z.string().min(1, "Address is required"),
  contactNumber: z.string().min(6, "Contact number is required"),

  // Route Rules
  pickupStartTime: z.date().optional().nullable(),
  dropoffStartTime: z.date().optional().nullable(),
  maxTripDuration: z.string().min(1, "Required"),
  bufferTime: z.string().min(1, "Required"),
  routeLatitude: z
    .coerce.number({ invalid_type_error: "Latitude must be a number" })
    .min(-90, "Min -90")
    .max(90, "Max 90"),
  routeLongitude: z
    .coerce.number({ invalid_type_error: "Longitude must be a number" })
    .min(-180, "Min -180")
    .max(180, "Max 180"),

  // Limits
  allowedVans: z.coerce.number().min(1, "Min 1"),
  allowedRoutes: z.coerce.number().min(1, "Min 1"),
  allowedStudents: z.coerce.number().min(1, "Min 1"),

  // Subscription & Billing
  plan: z.enum(["premium", "standard"]),
  billingCycle: z.enum(["weekly", "monthly", "quarterly"]),
  nextInvoice: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), { message: "Use YYYY-MM-DD" }),
  paymentMethod: z.enum(["cash", "bank"]),
  pickDropExceptionsActive: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

/* ===================== PER-TAB FIELD MAP ===================== */

const fieldsByTab: Record<TabKey, (keyof FormValues)[]> = {
  profile: ["adminName", "adminEmail", "schoolName", "schoolEmail", "address", "contactNumber"],
  route_rules: [
    "pickupStartTime",
    "dropoffStartTime",
    "maxTripDuration",
    "bufferTime",
    "routeLatitude",
    "routeLongitude",
  ],
  limits: ["allowedVans", "allowedRoutes", "allowedStudents"],
  subscription: ["plan", "billingCycle", "nextInvoice", "paymentMethod", "pickDropExceptionsActive"],
};

/* ===================== RHF HELPERS ===================== */

function RHFTextField({
  name,
  label,
  placeholder,
  type = "text",
  select = false,
  children,
  disabled,
}: {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  select?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const err = (errors as any)[name]?.message as string | undefined;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        type={type}
        select={select}
        error={!!err}
        helperText={err}
        InputProps={{ sx: { borderRadius: 1, py: 1 } }}
        inputProps={type === "number" ? { inputMode: "decimal", step: "any" } : undefined}
        disabled={disabled}
        {...register(name)}
      >
        {children}
      </TextField>
    </Box>
  );
}

function RHFTimePicker({
  name,
  label,
  disabled,
}: {
  name: keyof FormValues;
  label: string;
  disabled?: boolean;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  const err = (errors as any)[name]?.message as string | undefined;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={field.value ? dayjs(field.value as Date) : null}
              onChange={(v) => field.onChange(v ? v.toDate() : null)}
              disabled={disabled}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: !!err,
                  helperText: err,
                  InputProps: { sx: { borderRadius: 1 } },
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
}

function RHFSwitch({
  name,
  label,
  disabled,
}: {
  name: keyof FormValues;
  label: string;
  disabled?: boolean;
}) {
  const { control } = useFormContext<FormValues>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              disabled={disabled}
            />
          }
          label={label}
        />
      )}
    />
  );
}

/* ===================== PAGE (DETAIL + EDIT) ===================== */

export default function SchoolDetailEditPage() {
  const router = useRouter();
  const params = useParams();
  // supports /[id] or /[schoolId]
  const schoolId = String((params as any)?.id ?? (params as any)?.schoolId ?? "");
  const dispatch = useDispatch<AppDispatch>();
  const { school, loading } = useSelector((s: RootState) => s.suadmin);

  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {}, // prefill after fetch via reset()
    mode: "onTouched",
  });

  const { handleSubmit, trigger, reset } = methods;

  // fetch details once
  useEffect(() => {
    if (schoolId) dispatch(getSchoolById(schoolId));
  }, [dispatch, schoolId]);

  // when details arrive, prefill form from FLAT shape
  useEffect(() => {
    const s: any = (school as any)?.data ?? school;
    if (!s) return;

    const toDateOrNull = (t?: string) => {
      if (!t) return null;
      const parsed = dayjs(t, ["hh:mm A", "h:mm A"]);
      return parsed.isValid() ? parsed.toDate() : null;
    };

    const plan: "premium" | "standard" =
      String(s.currentPlan || "").toLowerCase() === "premium" ? "premium" : "standard";

    const billingCycle: "weekly" | "monthly" | "quarterly" = (
      String(s.billingCycle || "monthly").toLowerCase()
    ) as any;

    // Map DB payment methods to our two options
    // e.g. "Credit Card" or "Bank Transfer" -> "bank"
    const paymentMethod: "cash" | "bank" = (() => {
      const pm = String(s.paymentMethod || "").toLowerCase();
      if (pm.includes("cash")) return "cash";
      return "bank";
    })();

    reset({
      // Profile
      adminName: s.admin?.name ?? "",
      adminEmail: s.admin?.email ?? "",
      schoolName: s.schoolName ?? "",
      schoolEmail: s.schoolEmail ?? "",
      address: s.address ?? "",
      contactNumber: s.contactNumber ?? "",

      // Route rules
      pickupStartTime: toDateOrNull(s.startTime), // "07:30 AM"
      dropoffStartTime: toDateOrNull(s.endTime),  // "01:30 PM"
      maxTripDuration: s.maxTripDuration != null ? String(s.maxTripDuration) : "",
      bufferTime: s.bufferTime != null ? String(s.bufferTime) : "",
      routeLatitude: s.lat ?? ("" as any),
      routeLongitude: s.long ?? ("" as any),

      // Limits
      allowedVans: s.allowedVans ?? ("" as any),
      allowedRoutes: s.allowedRoutes ?? ("" as any),
      allowedStudents: s.allowedStudents ?? ("" as any),

      // Subscription & Billing
      plan,
      billingCycle,
      nextInvoice: "", // not in payload you shared
      paymentMethod,
      pickDropExceptionsActive: !!s.autoRenew,
    });

    setIsEditing(false); // start in view mode
  }, [school, reset]);

  const activeTabOrder = tabsList.find((t) => t.key === activeTab)?.order ?? 0;

  const orderedTabs = useMemo(() => [...tabsList].sort((a, b) => a.order - b.order), []);
  const goNext = async () => {
    const current = orderedTabs.find((t) => t.key === activeTab);
    if (!current) return;
    const next = orderedTabs.find((t) => t.order === current.order + 1);
    if (isEditing) {
      const ok = await trigger(fieldsByTab[activeTab]);
      if (!ok) return;
    }
    if (next) setActiveTab(next.key);
  };
  const goPrev = () => {
    const current = orderedTabs.find((t) => t.key === activeTab);
    if (!current) return;
    const prev = orderedTabs.find((t) => t.order === current.order - 1);
    if (prev) setActiveTab(prev.key);
  };

  const onSubmit = async (data: FormValues) => {
    if (!schoolId) return;
    const payload = {
      schoolId,
      schoolInfo: {
        contactPerson: data.adminName,
        startTime: data.pickupStartTime ? dayjs(data.pickupStartTime).format("hh:mm A") : "",
        endTime: data.dropoffStartTime ? dayjs(data.dropoffStartTime).format("hh:mm A") : "",
        maxTripDuration: Number(data.maxTripDuration),
        bufferTime: Number(data.bufferTime),
        currentPlan: data.plan === "premium" ? "Premium" : "Standard",
        billingCycle:
          data.billingCycle.charAt(0).toUpperCase() + data.billingCycle.slice(1), // Monthly/Weekly/Quarterly
        paymentMethod: data.paymentMethod === "bank" ? "Bank Transfer" : "Cash",
        allowedVans: Number(data.allowedVans),
        allowedStudents: Number(data.allowedStudents),
        allowedRoutes: Number(data.allowedRoutes),
        autoRenew: !!data.pickDropExceptionsActive,
        lat: Number(data.routeLatitude),
        long: Number(data.routeLongitude),
      },
    };

    try {
      await dispatch(editSchool(payload)).unwrap();
      await dispatch(getSchoolById(schoolId));
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Edit failed:", err);
    }
  };

  const isLastStep = activeTab === "subscription";

  return (
    <FormProvider {...methods}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3, bgcolor: "background.default" }}>
        {/* Top bar */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Link
                color="text.primary"
                component={RouterLink}
                href={"/su-admin/school-management"}
                sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              </Link>

              <Box
                sx={{
                  ml: "auto",
                  border: "1px solid #4CAF50",
                  borderRadius: "4px",
                  px: 1,
                  py: 0.5,
                  fontSize: "12px",
                  lineHeight: 1.2,
                  color: "#2e7d32",
                  bgcolor: "rgba(76,175,80,0.08)",
                  fontWeight: 500,
                }}
              >
                {isEditing ? "Editing" : "Viewing"}
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                School Details
              </Typography>
              {loading && <CircularProgress size={16} sx={{ ml: 1 }} />}
            </Stack>

            {/* Step pills */}
            <Stack direction="column" alignItems="start" spacing={1} sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                {isEditing ? "EDIT FIELDS" : "VIEW DETAILS"}
              </Typography>

              <Stack direction="row" flexWrap="wrap" sx={{ rowGap: 1 }} useFlexGap>
                {tabsList.map((tab) => {
                  const isActive = tab.key === activeTab;
                  const isCompleted = tab.order < activeTabOrder;
                  const isUpcoming = tab.order > activeTabOrder;

                  let bg = "#F6F7F9";
                  let textColor = "#000";
                  let borderColor = "#E0E2E7";

                  if (isActive) {
                    bg = "#1560BD";
                    textColor = "#fff";
                    borderColor = "transparent";
                  } else if (isCompleted) {
                    bg = "#000";
                    textColor = "#fff";
                    borderColor = "transparent";
                  }

                  return (
                    <Box
                      key={tab.key}
                      onClick={async () => {
                        if (isEditing) {
                          const current = tabsList.find((t) => t.key === activeTab);
                          if (current && tab.order > current.order) {
                            const ok = await trigger(fieldsByTab[activeTab]);
                            if (!ok) return;
                          }
                        }
                        setActiveTab(tab.key);
                      }}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        mr: 1,
                        mb: 1,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "4px",
                        fontSize: "12px",
                        lineHeight: 1.4,
                        fontWeight: 500,
                        cursor: "pointer",
                        backgroundColor: bg,
                        color: textColor,
                        border: "1px solid",
                        borderColor: isUpcoming ? borderColor : "transparent",
                        userSelect: "none",
                        minHeight: "26px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tab.label}
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1}>
            {!isEditing ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => setIsEditing(true)}
                sx={{ textTransform: "none" }}
                disabled={loading || !school}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  // revert: simply turn off edit; form already reflects latest reset values
                  setIsEditing(false);
                }}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>

        {/* Card + FORM wrapper */}
        <Card variant="outlined" sx={{ borderRadius: 1.5, boxShadow: "0px 1px 3px rgba(0,0,0,0.06)" }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {activeTab === "profile" && <ProfileSection disabled={!isEditing} />}
              {activeTab === "route_rules" && <RouteRulesSection disabled={!isEditing} />}
              {activeTab === "limits" && <LimitsSection disabled={!isEditing} />}
              {activeTab === "subscription" && <SubscriptionBillingSection disabled={!isEditing} />}

              <button type="submit" style={{ display: "none" }} />
            </Box>
          </CardContent>

          <Divider />

          {/* Footer: Prev/Next or Save */}
          <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={goPrev}
              disabled={activeTab === "profile"}
              sx={{ textTransform: "none" }}
            >
              Previous
            </Button>

            {isEditing ? (
              activeTab === "subscription" ? (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    bgcolor: "#FFB800",
                    color: "#000",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "#e5a700" },
                  }}
                  onClick={async () => {
                    const ok = await trigger(fieldsByTab[activeTab]);
                    if (!ok) return;
                    handleSubmit(onSubmit)();
                  }}
                  disabled={loading}
                >
                  Save changes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none", bgcolor: "#1560BD", "&:hover": { bgcolor: "#0f4a94" } }}
                  onClick={goNext}
                >
                  Next
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => router.push("/su-admin/school-management")}
                sx={{ textTransform: "none" }}
              >
                Back to list
              </Button>
            )}
          </Stack>
        </Card>
      </Box>
    </FormProvider>
  );
}

/* ===================== TAB SECTIONS ===================== */

function ProfileSection({ disabled }: { disabled?: boolean }) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600}>
        Profile
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <RHFTextField name="adminName" label="Admin Name *" placeholder="Enter Admin name" disabled={disabled} />
        <RHFTextField name="adminEmail" label="Admin Email *" placeholder="Enter Admin Email" disabled={disabled} />
        <RHFTextField name="schoolName" label="School Name *" placeholder="School name" disabled={disabled} />
        <RHFTextField name="schoolEmail" label="School Email *" placeholder="Enter School Email" disabled={disabled} />
        <RHFTextField name="address" label="Address *" placeholder="Address" disabled={disabled} />
        <RHFTextField name="contactNumber" label="Contact Number *" placeholder="+92-300-1234567" disabled={disabled} />
      </Box>
    </Stack>
  );
}

function RouteRulesSection({ disabled }: { disabled?: boolean }) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600}>
        Route Rules
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <RHFTimePicker name="pickupStartTime" label="Pickup Start Time" disabled={disabled} />
        <RHFTimePicker name="dropoffStartTime" label="Dropoff Start Time" disabled={disabled} />

        <RHFTextField name="maxTripDuration" label="Max Trip Duration *" select disabled={disabled}>
          {["15", "30", "45", "60", "90", "120"].map((m) => (
            <MenuItem key={m} value={m}>
              {m} mins
            </MenuItem>
          ))}
        </RHFTextField>

        <RHFTextField name="bufferTime" label="Buffer Time *" select disabled={disabled}>
          {["5", "10", "15", "20", "30"].map((m) => (
            <MenuItem key={m} value={m}>
              {m} mins
            </MenuItem>
          ))}
        </RHFTextField>

        <RHFTextField name="routeLatitude" label="Latitude *" placeholder="e.g., 24.8607" type="number" disabled={disabled} />
        <RHFTextField name="routeLongitude" label="Longitude *" placeholder="e.g., 67.0011" type="number" disabled={disabled} />
      </Box>
    </Stack>
  );
}

function LimitsSection({ disabled }: { disabled?: boolean }) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600}>
        Limits
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <RHFTextField name="allowedVans" label="Allowed Vans *" placeholder="10" type="number" disabled={disabled} />
        <RHFTextField name="allowedRoutes" label="Allowed Routes *" placeholder="25" type="number" disabled={disabled} />
        <RHFTextField name="allowedStudents" label="Allowed Students *" placeholder="500" type="number" disabled={disabled} />
      </Box>
    </Stack>
  );
}

function SubscriptionBillingSection({ disabled }: { disabled?: boolean }) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600}>
        Subscription &amp; Billing
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <RHFTextField name="plan" label="Current Plan *" select disabled={disabled}>
          <MenuItem value="premium">Premium</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
        </RHFTextField>

        <RHFTextField name="billingCycle" label="Billing Cycle *" select disabled={disabled}>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
        </RHFTextField>

        <RHFTextField name="nextInvoice" label="Next Invoice" type="date" disabled={disabled} />

        <RHFTextField name="paymentMethod" label="Payment Method *" select disabled={disabled}>
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="bank">Bank</MenuItem>
        </RHFTextField>

        <Box sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}>
          <RHFSwitch name="pickDropExceptionsActive" label="Auto Renew" disabled={disabled} />
        </Box>
      </Box>
    </Stack>
  );
}

/* ===================== (Optional) Demo Table kept for parity ===================== */

function AdminsRow({
  name,
  role,
  desc,
  users,
}: {
  name: string;
  role: string;
  desc: string;
  users: string;
}) {
  return (
    <TableRow sx={{ "& td": { verticalAlign: "top", fontSize: "13px" } }}>
      <TableCell sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>{name}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{role}</TableCell>
      <TableCell sx={{ minWidth: 180 }}>{desc}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{users}</TableCell>
      <TableCell align="right" sx={{ width: 40 }}>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
