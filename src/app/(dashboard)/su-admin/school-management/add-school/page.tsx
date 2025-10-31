"use client";

import React, { useMemo, useState } from "react";
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
} from "@mui/material";
import Link from "next/link";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
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
import { registerSchool } from "@/store/reducers/suadmin-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

/* ===================== TABS ===================== */

type TabKey =
  | "profile"
  | "route_rules"
  | "limits"
  | "subscription"
  | "admins"
  | "access"
  | "onboarding"
  | "audit"
  | "notes"
  | "branches";

const tabsList: { key: TabKey; label: string; order: number }[] = [
  { key: "profile", label: "Profile", order: 0 },
  { key: "route_rules", label: "Route Rules", order: 1 },
  { key: "limits", label: "Limits", order: 2 },
  { key: "subscription", label: "Subscription & Billing", order: 3 },
];

/* ===================== ZOD SCHEMA (GLOBAL) ===================== */

const schema = z.object({
  // Profile
  adminName: z.string().min(1, "Admin name is required"),
  schoolName: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  adminEmail: z.string().email("Invalid admin email"),
  schoolEmail: z.string().email("Invalid school email"),
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
    .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), {
      message: "Use YYYY-MM-DD",
    }),
  paymentMethod: z.enum(["cash", "bank"]),
  pickDropExceptionsActive: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

/* ===================== PER-TAB FIELD MAP ===================== */

const fieldsByTab: Record<TabKey, (keyof FormValues)[]> = {
  profile: [
    "adminName",
    "schoolName",
    "address",
    "adminEmail",
    "schoolEmail",
    "contactNumber",
  ],
  route_rules: [
    "pickupStartTime",
    "dropoffStartTime",
    "maxTripDuration",
    "bufferTime",
    "routeLatitude",
    "routeLongitude",
  ],
  limits: ["allowedVans", "allowedRoutes", "allowedStudents"],
  subscription: [
    "plan",
    "billingCycle",
    "nextInvoice",
    "paymentMethod",
    "pickDropExceptionsActive",
  ],
  admins: [],
  access: [],
  onboarding: [],
  audit: [],
  notes: [],
  branches: [],
};

/* ===================== RHF HELPERS ===================== */

function RHFTextField({
  name,
  label,
  placeholder,
  type = "text",
  select = false,
  children,
}: {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<unknown>["type"];
  select?: boolean;
  children?: React.ReactNode;
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
}: {
  name: keyof FormValues;
  label: string;
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
}: {
  name: keyof FormValues;
  label: string;
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
            />
          }
          label={label}
        />
      )}
    />
  );
}

/* ===================== PAGE (STEPPER LOGIC) ===================== */

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const activeTabOrder = tabsList.find((t) => t.key === activeTab)?.order ?? 0;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {}, // all empty
    mode: "onTouched",
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  // For red error dot on tabs
  const tabHasErrors = useMemo(() => {
    const eKeys = Object.keys(errors) as (keyof FormValues)[];
    const map: Partial<Record<TabKey, boolean>> = {};
    (Object.keys(fieldsByTab) as TabKey[]).forEach((tab) => {
      map[tab] = eKeys.some((k) => fieldsByTab[tab]?.includes(k));
    });
    return map;
  }, [errors]);

  const orderedTabs = useMemo(
    () => [...tabsList].sort((a, b) => a.order - b.order),
    []
  );

  const goNext = async () => {
    const current = orderedTabs.find((t) => t.key === activeTab);
    if (!current) return;
    const next = orderedTabs.find((t) => t.order === current.order + 1);
    const valid = await trigger(fieldsByTab[activeTab]); // validate ONLY current tab
    if (!valid) return; // stay on current tab, show errors here
    if (next) setActiveTab(next.key);
  };

  const goPrev = () => {
    const current = orderedTabs.find((t) => t.key === activeTab);
    if (!current) return;
    const prev = orderedTabs.find((t) => t.order === current.order - 1);
    if (prev) setActiveTab(prev.key);
  };

 const onSubmit = async(data: FormValues) => {
  const formattedData = {
    adminInfo: {
      name: data.adminName,
      email: data.adminEmail,
      role: "admin",
    },
    schoolInfo: {
      schoolName: data.schoolName,
      schoolEmail: data.schoolEmail,
      contactPerson: data.adminName,
      address: data.address,
      branchName: "Main Campus",

      startTime: data.pickupStartTime
        ? dayjs(data.pickupStartTime).format("hh:mm A")
        : "08:00 AM",
      endTime: data.dropoffStartTime
        ? dayjs(data.dropoffStartTime).format("hh:mm A")
        : "02:00 PM",
      maxTripDuration: Number(data.maxTripDuration),
      bufferTime: Number(data.bufferTime),

      allowedVans: Number(data.allowedVans),
      allowedStudents: Number(data.allowedStudents),
      allowedRoutes: Number(data.allowedRoutes),

      currentPlan:
        data.plan === "premium" ? "Premium" : "Standard",
      billingCycle:
        data.billingCycle.charAt(0).toUpperCase() +
        data.billingCycle.slice(1),
      paymentMethod:
        data.paymentMethod === "bank"
          ? "Bank Transfer"
          : "Cash",

      lat: data.routeLatitude,
      long: data.routeLongitude,
      autoRenew: !!data.pickDropExceptionsActive,
      contactNumber: data.contactNumber,
      // status: "active",
    },
  };
  try {
    const res = await dispatch(registerSchool(formattedData)).unwrap();
    console.log("✅ Registered:", res);
    // e.g. navigate or show toast here
    router.push('/su-admin/school-management');
  } catch (err) {
    console.error("❌ Register failed:", err);
    // show error toast if needed
  }

  console.log("📦 Final Upload Data:", formattedData);
};


  const isLastStep = activeTab === "subscription";

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          bgcolor: "background.default",
        }}
      >
        {/* Top row */}
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
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
                Active
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                School Details
              </Typography>
            </Stack>

            {/* Chips */}
            <Stack direction="column" alignItems="start" spacing={1} sx={{ mt: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                FILL THE DETAILS
              </Typography>

              <Stack direction="row" flexWrap="wrap" sx={{ rowGap: 1 }} useFlexGap>
                {orderedTabs.map((tab) => {
                  const isActive = tab.key === activeTab;
                  const isCompleted = tab.order < activeTabOrder;
                  const isUpcoming = tab.order > activeTabOrder;

                  let bg = "#F6F7F9";
                  let textColor = "#000";
                  let dotColor = tabHasErrors[tab.key] ? "#E53935" : "#787878";
                  let borderColor = "#E0E2E7";

                  if (isActive) {
                    bg = "#1560BD";
                    textColor = "#fff";
                    dotColor = tabHasErrors[tab.key] ? "#FFCDD2" : "#FFB800";
                    borderColor = "transparent";
                  } else if (isCompleted) {
                    bg = "#000";
                    textColor = "#fff";
                    dotColor = tabHasErrors[tab.key] ? "#FF8A80" : "#FFB800";
                    borderColor = "transparent";
                  }

                  return (
                    <Box
                      key={tab.key}
                      onClick={async () => {
                        // guard: only allow jumping forward if current tab valid
                        const current = orderedTabs.find((t) => t.key === activeTab);
                        if (current && tab.order > current.order) {
                          const ok = await trigger(fieldsByTab[activeTab]);
                          if (!ok) return; // keep user here if invalid
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
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "999px",
                          backgroundColor: dotColor,
                          mr: 1,
                          flexShrink: 0,
                        }}
                      />
                      {tab.label}
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ ml: 2 }} />
        </Stack>

        {/* Card + FORM wrapper */}
        <Card
          variant="outlined"
          sx={{
            borderRadius: 1.5,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "route_rules" && <RouteRulesSection />}
              {activeTab === "limits" && <LimitsSection />}
              {activeTab === "subscription" && <SubscriptionBillingSection />}

              <button type="submit" style={{ display: "none" }} />
            </Box>
          </CardContent>

          <Divider />

          {/* Stepper footer: Prev / Next / Submit */}
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

            {isLastStep ? (
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
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  bgcolor: "#1560BD",
                  color: "#fff",
                  fontWeight: 500,
                  "&:hover": { bgcolor: "#0f4a94" },
                }}
                onClick={goNext}
              >
                Next
              </Button>
            )}
          </Stack>
        </Card>
      </Box>
    </FormProvider>
  );
}

/* ===================== TAB SECTIONS ===================== */

function ProfileSection() {
  return (
    <Stack spacing={2}>
      {/* Logo row (placeholder) */}
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: 1,
            bgcolor: "grey.100",
            border: "1px dashed",
            borderColor: "grey.400",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Logo
        </Box>

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={600}>
            School Logo
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Min 400×400px, PNG or JPG
          </Typography>
          <Button size="small" variant="outlined" sx={{ borderRadius: 1, textTransform: "none" }}>
            Select
          </Button>
        </Stack>
      </Stack>

      {/* Fields */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <RHFTextField name="adminName" label="Admin Name *" placeholder="Enter Admin name" />
        <RHFTextField name="schoolName" label="School Name *" placeholder="School name" />
        <RHFTextField name="address" label="Address *" placeholder="Address" />
        <RHFTextField name="adminEmail" label="Admin Email *" placeholder="Enter Admin Email" />
        <RHFTextField name="schoolEmail" label="School Email *" placeholder="Enter School Email" />
        <RHFTextField name="contactNumber" label="Contact Number *" placeholder="+92-300-1234567" />
      </Box>
    </Stack>
  );
}

function RouteRulesSection() {
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
        <RHFTimePicker name="pickupStartTime" label="Pickup Start Time" />
        <RHFTimePicker name="dropoffStartTime" label="Dropoff Start Time" />

        <RHFTextField name="maxTripDuration" label="Max Trip Duration *" placeholder="45 mins" />
        <RHFTextField name="bufferTime" label="Buffer Time *" placeholder="10 mins" />

        {/* Lat/Lng */}
        <RHFTextField
          name="routeLatitude"
          label="Latitude *"
          placeholder="e.g., 24.8607"
          type="number"
        />
        <RHFTextField
          name="routeLongitude"
          label="Longitude *"
          placeholder="e.g., 67.0011"
          type="number"
        />
      </Box>
    </Stack>
  );
}

function LimitsSection() {
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
        <RHFTextField name="allowedVans" label="Allowed Vans *" placeholder="50" type="number" />
        <RHFTextField name="allowedRoutes" label="Allowed Routes *" placeholder="20" type="number" />
        <RHFTextField
          name="allowedStudents"
          label="Allowed Students *"
          placeholder="1000"
          type="number"
        />
      </Box>
    </Stack>
  );
}

function SubscriptionBillingSection() {
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
        <RHFTextField name="plan" label="Current Plan *" select>
          <MenuItem value="premium">Premium</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
        </RHFTextField>

        <RHFTextField name="billingCycle" label="Billing Cycle *" select>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
        </RHFTextField>

        <RHFTextField name="nextInvoice" label="Next Invoice" type="date" />

        <RHFTextField name="paymentMethod" label="Payment Method *" select>
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="bank">Bank</MenuItem>
        </RHFTextField>

        <Box sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}>
          <RHFSwitch name="pickDropExceptionsActive" label="Auto Renew" />
        </Box>
      </Box>
    </Stack>
  );
}

/* ===================== NON-FORM SECTIONS (unchanged demo tables) ===================== */

function AdminsSection() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600}>
        School Admins
      </Typography>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Table
          size="small"
          sx={{
            "& th": {
              backgroundColor: "rgba(0,0,0,0.02)",
              fontWeight: 500,
              fontSize: "13px",
              color: "text.secondary",
            },
            "& td": { fontSize: "13px" },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 2 }}>Name</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Users</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <AdminsRow
              name="Ahmed Khan"
              role="Full Access"
              desc="Can manage all modules"
              users="2 Users"
            />
            <AdminsRow
              name="Sara Malik"
              role="Manager"
              desc="Manage routes & students"
              users="5 Users"
            />
            <AdminsRow
              name="Muhammad Aqib"
              role="Read-Only"
              desc="View-only access"
              users="3 Users"
            />
          </TableBody>
        </Table>
      </Box>
    </Stack>
  );
}

function AccessSection() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600}>
        Access
      </Typography>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          fontSize: "13px",
        }}
      >
        <Typography
          variant="body2"
          sx={{ mb: 1, fontWeight: 500, fontSize: "13px", color: "text.secondary" }}
        >
          Students (Uploads)
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <StatusPill
            text="Active"
            bg="rgba(76,175,80,0.08)"
            color="#2e7d32"
            borderColor="#4CAF50"
          />
          <StatusPill
            text="Suspended"
            bg="rgba(255,193,7,0.12)"
            color="#ff9800"
            borderColor="#ffb74d"
          />
          <StatusPill
            text="Restricted"
            bg="rgba(244,67,54,0.08)"
            color="#d32f2f"
            borderColor="#ef5350"
          />
        </Stack>
      </Box>
    </Stack>
  );
}

/* ===================== SMALL BUILDING BLOCKS ===================== */

function StatusPill({
  text,
  bg,
  color,
  borderColor,
}: {
  text: string;
  bg: string;
  color: string;
  borderColor: string;
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "12px",
        lineHeight: 1.4,
        borderRadius: "4px",
        border: `1px solid ${borderColor}`,
        bgcolor: bg,
        color: color,
        fontWeight: 500,
        px: 1,
        py: "2px",
      }}
    >
      {text}
    </Box>
  );
}

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
