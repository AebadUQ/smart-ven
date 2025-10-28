"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Stack,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Switch,
  Avatar,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

/* ------------------------------------------------------------------
   SCHEMA / FORM STATE
------------------------------------------------------------------- */

const schema = zod.object({
  currentPlan: zod.string().min(1, "Plan is required"),
  billingCycle: zod.string().min(1, "Billing cycle is required"),
  nextInvoice: zod.string().min(1, "Next invoice date is required"),
  paymentMethod: zod.string().min(1, "Payment method is required"),
  pickDropExceptions: zod.boolean().default(true),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  currentPlan: "premium_per_student",
  billingCycle: "monthly",
  nextInvoice: "2025-09-01", // yyyy-mm-dd
  paymentMethod: "Bank Transfer",
  pickDropExceptions: true,
};

/* ------------------------------------------------------------------
   PROGRESS TABS ("FILL THE DETAILS" pills row)
   matches: Profile | Route Rules | Limits | Subscription & Billing ...
------------------------------------------------------------------- */

type TabKey =
  | "profile"
  | "route_rules"
  | "limits"
  | "subscription"
  | "admins"
  | "onboarding"
  | "access"
  | "audit"
  | "notes"
  | "branches";

const tabsList: { key: TabKey; label: string; order: number }[] = [
  { key: "profile", label: "Profile", order: 0 },
  { key: "route_rules", label: "Route Rules", order: 1 },
  { key: "limits", label: "Limits", order: 2 },
  { key: "subscription", label: "Subscription & Billing", order: 3 },
  { key: "admins", label: "Admins", order: 4 },
  { key: "onboarding", label: "Onboarding", order: 5 },
  { key: "access", label: "Access", order: 6 },
  { key: "audit", label: "Audit Trail", order: 7 },
  { key: "notes", label: "Notes", order: 8 },
  { key: "branches", label: "Branches", order: 9 },
];

/* ------------------------------------------------------------------
   SMALL UI BUILDING BLOCKS
------------------------------------------------------------------- */

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

/**
 * RowItem
 * left side = static label (like "Current Plan")
 * right side = form control
 * has border bottom by default
 */
function RowItem({
  label,
  children,
  error,
  helperText,
  noBorder = false,
}: {
  label: string;
  children: React.ReactNode;
  error?: boolean;
  helperText?: string;
  noBorder?: boolean;
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        borderBottom: noBorder ? "none" : "1px solid",
        borderColor: "divider",
        p: 2,
        "&:last-of-type": {
          borderBottom: "none",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "220px" },
          flexShrink: 0,
          color: "text.secondary",
          fontSize: "13px",
          fontWeight: 500,
          mb: { xs: 1, sm: 0 },
        }}
      >
        {label}
      </Box>

      <Box sx={{ flex: 1, fontSize: "13px", fontWeight: 500 }}>
        {children}

        {helperText ? (
          <FormHelperText
            error={error}
            sx={{ fontSize: "12px", lineHeight: 1.4, mt: 0.5 }}
          >
            {helperText}
          </FormHelperText>
        ) : null}
      </Box>
    </Stack>
  );
}

/* top card header detail block:
   - "Student Detail" row in screenshots
   - shows logo + contact + edit profile link
*/
function StudentDetailHeader() {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ p: 2 }}
      >
        {/* school logo avatar */}
        <Avatar
          sx={{
            width: 48,
            height: 48,
            borderRadius: "6px",
            bgcolor: "#F6F7F9",
            border: "1px solid #E0E2E7",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          LOGO
        </Avatar>

        {/* detail text row */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          flexWrap="wrap"
          useFlexGap
          sx={{
            width: "100%",
            fontSize: "13px",
            "& .label": {
              color: "text.secondary",
              fontSize: "13px",
              fontWeight: 400,
            },
            "& .value": {
              color: "text.primary",
              fontSize: "13px",
              fontWeight: 500,
            },
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography className="label" variant="body2">
              Contact
            </Typography>
            <Typography className="value" variant="body2">
              Ali Raza
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography className="label" variant="body2">
              /
            </Typography>
            <Typography className="value" variant="body2">
              +92-300-1234567
            </Typography>
          </Stack>
        </Stack>

        {/* edit profile link (right aligned on desktop) */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            ml: { xs: 0, sm: "auto" },
            cursor: "pointer",
            color: "primary.main",
            fontSize: "13px",
          }}
        >
          <EditOutlinedIcon
            sx={{ fontSize: 16, color: "primary.main" }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "primary.main",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Edit Profile
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------
   MAIN PAGE COMPONENT
------------------------------------------------------------------- */

export default function SchoolSubscriptionPage(): React.JSX.Element {
  // which tab is "active"? this page is for Subscription & Billing
  const activeTab: TabKey = "subscription";
  const activeTabOrder = tabsList.find((t) => t.key === activeTab)?.order ?? 0;

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const pickDropActive = watch("pickDropExceptions");

  const onSubmit = async (values: Values) => {
    console.log("SUBMIT subscription & billing form ==>", values);
  };

  return (
    <Box
      sx={{
        maxWidth: "var(--Content-maxWidth, 100%)",
        m: "var(--Content-margin, 0 auto)",
        p: "var(--Content-padding, 24px)",
        width: "var(--Content-width, 100%)",
        bgcolor: "background.default",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            borderRadius: 1.5,
            boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Stack spacing={2}>
              {/* ---------- TOP BAR: Back + Active pill ---------- */}
              <Stack
                direction="row"
                alignItems="flex-start"
                flexWrap="wrap"
                useFlexGap
                spacing={1}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ cursor: "pointer" }}
                >
                  ← Back
                </Typography>

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

              {/* ---------- PAGE TITLE ---------- */}
              <Typography variant="h6" fontWeight={600}>
                School Details
              </Typography>

              {/* ---------- STUDENT DETAIL HEADER (logo + contact + edit) ---------- */}
              <StudentDetailHeader />

              {/* ---------- FILL THE DETAILS / PILLS ROW ---------- */}
              <Stack spacing={1} sx={{ mt: 2 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  FILL THE DETAILS
                </Typography>

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  sx={{ rowGap: 1 }}
                  useFlexGap
                >
                  {tabsList.map((tab) => {
                    const isActive = tab.key === activeTab;
                    const isCompleted = tab.order < activeTabOrder;
                    const isUpcoming = tab.order > activeTabOrder;

                    // default (upcoming)
                    let bg = "#F6F7F9";
                    let textColor = "#000";
                    let dotColor = "#787878";
                    let borderColor = "#E0E2E7";

                    if (isActive) {
                      // current tab -> blue
                      bg = "#1560BD";
                      textColor = "#fff";
                      dotColor = "#FFB800";
                      borderColor = "transparent";
                    } else if (isCompleted) {
                      // previous tab -> black
                      bg = "#000";
                      textColor = "#fff";
                      dotColor = "#FFB800";
                      borderColor = "transparent";
                    }

                    return (
                      <Box
                        key={tab.key}
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
                          backgroundColor: bg,
                          color: textColor,
                          border: "1px solid",
                          borderColor: isUpcoming
                            ? borderColor
                            : "transparent",
                          minHeight: "26px",
                          userSelect: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {/* 8x8 status dot */}
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

              {/* ---------- SECTION TITLE ---------- */}
              <Typography variant="subtitle2" fontWeight={600}>
                Subscription &amp; Billing
              </Typography>

              {/* ---------- FORM BLOCK (bordered box like screenshot) ---------- */}
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  overflow: "hidden",
                  fontSize: "14px",
                }}
              >
                {/* Current Plan */}
                <RowItem
                  label="Current Plan"
                  error={!!errors.currentPlan}
                  helperText={errors.currentPlan?.message}
                >
                  <Controller
                    control={control}
                    name="currentPlan"
                    render={({ field }) => (
                      <FormControl
                        size="small"
                        fullWidth
                        error={!!errors.currentPlan}
                        sx={{ maxWidth: 320 }}
                      >
                        <InputLabel required>Current Plan</InputLabel>
                        <Select
                          {...field}
                          label="Current Plan"
                          value={field.value || ""}
                        >
                          <MenuItem value="premium_per_student">
                            Premium (Per Student)
                          </MenuItem>
                          <MenuItem value="standard_flat">
                            Standard (Flat Fee)
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </RowItem>

                {/* Billing Cycle */}
                <RowItem
                  label="Billing Cycle"
                  error={!!errors.billingCycle}
                  helperText={errors.billingCycle?.message}
                >
                  <Controller
                    control={control}
                    name="billingCycle"
                    render={({ field }) => (
                      <FormControl
                        size="small"
                        fullWidth
                        error={!!errors.billingCycle}
                        sx={{ maxWidth: 320 }}
                      >
                        <InputLabel required>Billing Cycle</InputLabel>
                        <Select
                          {...field}
                          label="Billing Cycle"
                          value={field.value || ""}
                        >
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="quarterly">Quarterly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </RowItem>

                {/* Next Invoice */}
                <RowItem
                  label="Next Invoice"
                  error={!!errors.nextInvoice}
                  helperText={errors.nextInvoice?.message}
                >
                  <Controller
                    control={control}
                    name="nextInvoice"
                    render={({ field }) => (
                      <FormControl
                        size="small"
                        fullWidth
                        error={!!errors.nextInvoice}
                        sx={{ maxWidth: 320 }}
                      >
                        <InputLabel shrink required>
                          Next Invoice
                        </InputLabel>
                        <OutlinedInput
                          {...field}
                          type="date"
                          // outlined date -> we force label shrink above
                          label="Next Invoice"
                        />
                      </FormControl>
                    )}
                  />
                </RowItem>

                {/* Payment Method */}
                <RowItem
                  label="Payment Method"
                  error={!!errors.paymentMethod}
                  helperText={errors.paymentMethod?.message}
                >
                  <Controller
                    control={control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormControl
                        size="small"
                        fullWidth
                        error={!!errors.paymentMethod}
                        sx={{ maxWidth: 320 }}
                      >
                        <InputLabel required>Payment Method</InputLabel>
                        <OutlinedInput
                          {...field}
                          label="Payment Method"
                          placeholder="Bank Transfer"
                        />
                      </FormControl>
                    )}
                  />
                </RowItem>

                {/* Pick/Drop Exceptions */}
                <RowItem
                  label="Pick/Drop Exceptions"
                  noBorder
                  helperText={undefined}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {/* pill exactly like screenshot */}
                    <StatusPill
                      text={pickDropActive ? "Active" : "Inactive"}
                      bg={
                        pickDropActive
                          ? "rgba(76,175,80,0.08)"
                          : "rgba(158,158,158,0.08)"
                      }
                      color={pickDropActive ? "#2e7d32" : "#616161"}
                      borderColor={
                        pickDropActive ? "#4CAF50" : "#9e9e9e"
                      }
                    />

                    {/* toggle allows changing that state */}
                    <Controller
                      control={control}
                      name="pickDropExceptions"
                      render={({ field }) => (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ fontSize: 13 }}
                        >
                          <Switch
                            size="small"
                            checked={field.value}
                            onChange={(e) =>
                              field.onChange(e.target.checked)
                            }
                          />
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "13px" }}
                          >
                            Allow Exceptions
                          </Typography>
                        </Stack>
                      )}
                    />
                  </Stack>
                </RowItem>
              </Box>
            </Stack>
          </CardContent>

          {/* ---------- FOOTER ACTIONS (View Invoices | Change Plan | Next) ---------- */}
          <CardActions
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "flex-start", sm: "flex-end" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 1.5,
              p: 2,
            }}
          >
            <Button
              variant="text"
              size="small"
              sx={{
                color: "text.secondary",
                textTransform: "none",
              }}
              onClick={() => {
                console.log("View invoices click");
              }}
            >
              View Invoices
            </Button>

            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                bgcolor: "#1560BD",
                color: "#fff",
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#0f4a94",
                },
              }}
              onClick={() => {
                console.log("Change plan click");
              }}
            >
              Change Plan
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isSubmitting}
              sx={{
                textTransform: "none",
                bgcolor: "#FFB800",
                color: "#000",
                fontWeight: 500,
                minWidth: 80,
                "&:hover": {
                  bgcolor: "#e5a700",
                },
              }}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
