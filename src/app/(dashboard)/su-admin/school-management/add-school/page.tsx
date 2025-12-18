"use client";

import React, { useMemo, useRef, useState } from "react";
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
import { uploadImage } from "@/utils/uploadImage"; // ⬅️ ADDED
import MapComponent from "@/components/MapSelection";

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

/* ===================== ZOD SCHEMA (UPDATED) ===================== */

const schema = z.object({
  schoolImage: z.string().optional(), // ⬅️ ADDED

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
    "schoolImage", // ⬅️ ADDED
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
        inputProps={
          type === "number"
            ? { inputMode: "decimal", step: "any" }
            : undefined
        }
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

/* ===================== PAGE ===================== */

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const activeTabOrder =
    tabsList.find((t) => t.key === activeTab)?.order ?? 0;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      schoolImage: "", // ⬅️ ADDED
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  /* Tab Error Logic */
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

  /* Step navigation */
  const goNext = async () => {
    const current = orderedTabs.find((t) => t.key === activeTab);
    if (!current) return;

    const next = orderedTabs.find((t) => t.order === current.order + 1);

    const valid = await trigger(fieldsByTab[activeTab]);
    if (!valid) return;

    if (next) setActiveTab(next.key);
  };

  const goPrev = () => {
    const current = orderedTabs.find((t) => t.key === activeTab);
    if (!current) return;

    const prev = orderedTabs.find((t) => t.order === current.order - 1);
    if (prev) setActiveTab(prev.key);
  };

  /* Submit handler */
  const onSubmit = async (data: FormValues) => {
    const formattedData = {
      adminInfo: {
        name: data.adminName,
        email: data.adminEmail,
        role: "admin",
      },
      schoolInfo: {
        schoolImage: data.schoolImage, // ⬅️ SEND LOGO
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
      },
    };

    try {
      await dispatch(registerSchool(formattedData)).unwrap();
      router.push("/su-admin/school-management");
    } catch (err) {
      console.error("❌ Register failed:", err);
    }
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
        }}
      >
        {/* TOP AREA */}
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Link
              color="text.primary"
              component={RouterLink}
              href={"/su-admin/school-management"}
              sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
            </Link>

            <Typography variant="h6" sx={{ mt: 1 }}>
              School Details
            </Typography>

            {/* TABS */}
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {orderedTabs.map((tab) => {
                const isActive = tab.key === activeTab;
                const isCompleted = tab.order < activeTabOrder;

                return (
                  <Box
                    key={tab.key}
                    onClick={async () => {
                      const current = orderedTabs.find(
                        (t) => t.key === activeTab
                      );
                      if (
                        current &&
                        tab.order > current.order &&
                        !(await trigger(fieldsByTab[activeTab]))
                      ) {
                        return;
                      }
                      setActiveTab(tab.key);
                    }}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      cursor: "pointer",
                      background: isActive
                        ? "#1560BD"
                        : isCompleted
                        ? "#000"
                        : "#F6F7F9",
                      color: isActive || isCompleted ? "#fff" : "#000",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "999px",
                        background: tabHasErrors[tab.key]
                          ? "#E53935"
                          : "#FFB800",
                      }}
                    />
                    {tab.label}
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>

        {/* CARD */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "route_rules" && <RouteRulesSection />}
            {activeTab === "limits" && <LimitsSection />}
            {activeTab === "subscription" && (
              <SubscriptionBillingSection />
            )}
          </CardContent>

          <Divider />

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Button
              variant="outlined"
              onClick={goPrev}
              disabled={activeTab === "profile"}
            >
              Previous
            </Button>

            {isLastStep ? (
              <Button
                variant="contained"
                onClick={async () => {
                  if (!(await trigger(fieldsByTab[activeTab]))) return;
                  handleSubmit(onSubmit)();
                }}
              >
                Submit
              </Button>
            ) : (
              <Button variant="contained" onClick={goNext}>
                Next
              </Button>
            )}
          </Stack>
        </Card>
      </Box>
    </FormProvider>
  );
}

/* ===================== PROFILE SECTION (UPDATED WITH UPLOAD) ===================== */

function ProfileSection() {
  const { watch, setValue } = useFormContext<FormValues>();
  const schoolImage = watch("schoolImage");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = () => inputRef.current?.click();

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage(file); // ⬅️ EXACT SAME AS STUDENT FORM
      setValue("schoolImage", url, { shouldValidate: true });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    }
  };

  return (
    <Stack spacing={2}>
      {/* LOGO UPLOAD */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: 1,
            overflow: "hidden",
            border: "1px dashed #aaa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f8f8f8",
          }}
        >
          {schoolImage ? (
            <img
              src={schoolImage}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "Logo"
          )}
        </Box>

        <Stack spacing={0.5}>
          <Typography variant="subtitle2">School Logo</Typography>
          <Typography variant="caption">
            Min 400×400px, PNG or JPG
          </Typography>

          <Button variant="outlined" onClick={handleSelectImage}>
            Select
          </Button>
          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Stack>
      </Stack>

      {/* INPUT FIELDS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
          gap: 2,
        }}
      >
        <RHFTextField
          name="adminName"
          label="Admin Name *"
          placeholder="Enter admin name"
        />
        <RHFTextField
          name="schoolName"
          label="School Name *"
          placeholder="Enter school name"
        />
        <RHFTextField
          name="address"
          label="Address *"
          placeholder="Enter address"
        />
        <RHFTextField
          name="adminEmail"
          label="Admin Email *"
          placeholder="Enter admin email"
        />
        <RHFTextField
          name="schoolEmail"
          label="School Email *"
          placeholder="Enter school email"
        />
        <RHFTextField
          name="contactNumber"
          label="Contact Number *"
          placeholder="+92-300-0000000"
        />
      </Box>
    </Stack>
  );
}

/* ===================== OTHER SECTIONS (UNCHANGED) ===================== */

function RouteRulesSection() {
  const { setValue, trigger, watch } = useFormContext<FormValues>();

  const lat = watch("routeLatitude");
  const lng = watch("routeLongitude");

  const googleMapsLink =
    Number.isFinite(Number(lat)) && Number.isFinite(Number(lng))
      ? `https://www.google.com/maps?q=${Number(lat)},${Number(lng)}`
      : "";

  const handlePositionChange = async (newLat: number, newLng: number) => {
    setValue("routeLatitude", newLat as any, { shouldDirty: true, shouldValidate: true });
    setValue("routeLongitude", newLng as any, { shouldDirty: true, shouldValidate: true });
    await trigger(["routeLatitude", "routeLongitude"]);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Route Rules</Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
          gap: 2,
        }}
      >
        <RHFTimePicker name="pickupStartTime" label="Pickup Start Time" />
        <RHFTimePicker name="dropoffStartTime" label="Dropoff Start Time" />

        <RHFTextField name="maxTripDuration" label="Max Trip Duration" placeholder="45 mins" />
        <RHFTextField name="bufferTime" label="Buffer Time" placeholder="10 mins" />

        <RHFTextField name="routeLatitude" label="Latitude" type="number" placeholder="24.8607" />
        <RHFTextField name="routeLongitude" label="Longitude" type="number" placeholder="67.0011" />
      </Box>

      {/* ✅ Open in Google Maps link */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography variant="caption" color="text.secondary">
          Open this location in Google Maps:
        </Typography>

        <Button
          variant="outlined"
          size="small"
          disabled={!googleMapsLink}
          onClick={() => window.open(googleMapsLink, "_blank")}
        >
          Open in Google Maps
        </Button>

        {/* optional: show link text */}
        {googleMapsLink ? (
          <Typography variant="caption" sx={{ wordBreak: "break-all" }}>
            {googleMapsLink}
          </Typography>
        ) : null}
      </Box>

      {/* ✅ MapSelection component (unchanged) */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Pick location on map
        </Typography>
        <MapComponent onPositionChange={handlePositionChange} />
      </Box>
    </Stack>
  );
}


function LimitsSection() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Limits</Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
          gap: 2,
        }}
      >
        <RHFTextField
          name="allowedVans"
          label="Allowed Vans"
          type="number"
          placeholder="50"
        />
        <RHFTextField
          name="allowedRoutes"
          label="Allowed Routes"
          type="number"
          placeholder="20"
        />
        <RHFTextField
          name="allowedStudents"
          label="Allowed Students"
          type="number"
          placeholder="1000"
        />
      </Box>
    </Stack>
  );
}

function SubscriptionBillingSection() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Subscription & Billing</Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
          gap: 2,
        }}
      >
        <RHFTextField name="plan" label="Current Plan" select>
          <MenuItem value="premium">Premium</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
        </RHFTextField>

        <RHFTextField name="billingCycle" label="Billing Cycle" select>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="quarterly">Quarterly</MenuItem>
        </RHFTextField>

        <RHFTextField name="nextInvoice" type="date" label="Next Invoice" />

        <RHFTextField name="paymentMethod" label="Payment Method" select>
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="bank">Bank</MenuItem>
        </RHFTextField>

        <Box sx={{ gridColumn: "1 / -1" }}>
          <RHFSwitch
            name="pickDropExceptionsActive"
            label="Auto Renew"
          />
        </Box>
      </Box>
    </Stack>
  );
}

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
        px: 1,
        py: "2px",
        borderRadius: "4px",
        fontSize: "12px",
        border: `1px solid ${borderColor}`,
        bgcolor: bg,
        color,
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
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{desc}</TableCell>
      <TableCell>{users}</TableCell>
      <TableCell align="right">
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
