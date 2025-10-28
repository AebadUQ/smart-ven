"use client";

import React, { useState } from "react";
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
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  // we can expose more later if you want
];

export default function Page() {
  // which tab you're viewing in edit mode
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const activeTabOrder =
    tabsList.find((t) => t.key === activeTab)?.order ?? 0;

  // figure out which footer we render
  const isSubscriptionFlow = activeTab === "subscription";

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        p: 3,
        bgcolor: "background.default",
      }}
    >
      {/* ── HEADER: Back / Status / Title / Progress chips ───────── */}
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
          {/* back + Active chip */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              sx={{
                borderRadius: 1,
                px: 0,
                color: "text.secondary",
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ cursor: "pointer" }}
            >
              Back
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

          {/* title row */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              Beaconhouse International School
            </Typography>

            {/* edit CTA (only for later tabs if you want it conditional, keeping your logic) */}
            {activeTab !== "profile" &&
              activeTab !== "route_rules" &&
              activeTab !== "limits" && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{
                    ml: "auto",
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
              )}
          </Stack>

          {/* School summary header block:
             In "add school" we only showed this after first steps.
             For an edit screen, we actually DO want to show it always.
             I'll show it ALWAYS under the title now. */}
          <SchoolSummaryHeader />

          {/* Progress / tabs chips row */}
          <Stack
            direction="column"
            flexWrap="wrap"
            alignItems="start"
            spacing={1}
            sx={{ mt: 2 }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              SCHOOL SETUP
            </Typography>

            <Stack direction="row" flexWrap="wrap" sx={{ rowGap: 1 }} useFlexGap>
              {tabsList.map((tab) => {
                const isActive = tab.key === activeTab;
                const isCompleted = tab.order < activeTabOrder;
                const isUpcoming = tab.order > activeTabOrder;

                // base styles
                let bg = "#F6F7F9";
                let textColor = "#000";
                let dotColor = "#787878";
                let borderColor = "#E0E2E7";

                if (isActive) {
                  // current
                  bg = "#1560BD";
                  textColor = "#fff";
                  dotColor = "#FFB800";
                  borderColor = "transparent";
                } else if (isCompleted) {
                  // done
                  bg = "#000";
                  textColor = "#fff";
                  dotColor = "#FFB800";
                  borderColor = "transparent";
                }

                return (
                  <Box
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
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

        {/* right side actions (none for now) */}
        <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ ml: 2 }} />
      </Stack>

      {/* ── MAIN CARD (form with existing data pre-filled) ───────── */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 1.5,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          {activeTab === "profile" && <ProfileSectionFilled />}

          {activeTab === "route_rules" && <RouteRulesSectionFilled />}

          {activeTab === "limits" && <LimitsSectionFilled />}

          {activeTab === "subscription" && <SubscriptionBillingSectionFilled />}

          {/* If you later re-enable admins/access tabs, just reuse the old AdminsSection / AccessSection
             but maybe mark read-only or prefilled. */}
        </CardContent>

        <Divider />

        {/* footer */}
        {isSubscriptionFlow ? (
          <FooterSubscriptionEdit />
        ) : (
          <FooterEditDefault />
        )}
      </Card>
    </Box>
  );
}

/* ----------------------------------------
   HEADER UNDER TITLE (SCHOOL SUMMARY)
---------------------------------------- */
function SchoolSummaryHeader() {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        width: "100%",
        maxWidth: "100%",
        mt: 1,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ p: 2 }}
      >
        {/* logo */}
        <Avatar
          sx={{
            width: 48,
            height: 48,
            borderRadius: "6px",
            bgcolor: "#F6F7F9",
            border: "1px solid #E0E2E7",
            fontSize: 11,
            fontWeight: 500,
          }}
          src="/assets/school-placeholder.png"
        >
          BHI
        </Avatar>

        {/* info line(s) */}
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
              Campus Code
            </Typography>
            <Typography className="value" variant="body2">
              BHN-KHI-12
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography className="label" variant="body2">
              Contact
            </Typography>
            <Typography className="value" variant="body2">
              Ali Raza / +92-300-1234567
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography className="label" variant="body2">
              City
            </Typography>
            <Typography className="value" variant="body2">
              Karachi
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

/* ----------------------------------------
   TAB SECTIONS (NOW PREFILLED)
---------------------------------------- */

function ProfileSectionFilled() {
  // pre-filled values
  return (
    <Stack spacing={2}>
      {/* Logo row */}
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
            overflow: "hidden",
          }}
        >
          <Avatar
            src="/assets/school-placeholder.png"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 1,
              fontSize: 12,
            }}
          >
            BHI
          </Avatar>
        </Box>

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>
            School Logo
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
            Min 400×400px, PNG or JPG
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 1,
              textTransform: "none",
              width: "fit-content",
              fontSize: "0.75rem",
              lineHeight: 1.4,
              height: 28,
              px: 1.5,
            }}
          >
            Change Logo
          </Button>
        </Stack>
      </Stack>

      {/* Fields grid with defaultValue instead of placeholder */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <LabeledField
          label="School Name *"
          defaultValue="Beaconhouse International School"
        />

        <LabeledFieldWithIcon
          label="Address *"
          defaultValue="Street 12, DHA Phase 6, Karachi"
          icon={<RoomOutlinedIcon fontSize="small" />}
        />

        <LabeledField
          label="Contact Person *"
          defaultValue="Ali Raza"
        />

        <LabeledField
          label="Contact Number *"
          defaultValue="+92-300-1234567"
        />

        <LabeledField
          label="Principal / Head"
          defaultValue="Mrs. Sana Riaz"
        />

        <LabeledField
          label="Campus Code"
          defaultValue="BHN-KHI-12"
        />
      </Box>
    </Stack>
  );
}

function RouteRulesSectionFilled() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>
        Route Rules
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <LabeledFieldWithIcon
          label="Start Time *"
          defaultValue="07:30 AM"
          icon={<AccessTimeIcon fontSize="small" />}
        />
        <LabeledFieldWithIcon
          label="End Time *"
          defaultValue="02:30 PM"
          icon={<AccessTimeIcon fontSize="small" />}
        />
        <LabeledField
          label="Max Trip Duration *"
          defaultValue="45 mins"
        />
        <LabeledField
          label="Buffer Time *"
          defaultValue="10 mins"
        />
      </Box>
    </Stack>
  );
}

function LimitsSectionFilled() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>
        Limits
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <LabeledField
          label="Allowed Vans *"
          defaultValue="50"
        />
        <LabeledField
          label="Allowed Routes *"
          defaultValue="20"
        />
        <LabeledField
          label="Allowed Students *"
          defaultValue="1000"
        />
        <LabeledField
          label="Currently Active Students"
          defaultValue="742"
        />
        <LabeledField
          label="Assigned Drivers"
          defaultValue="38"
        />
      </Box>
    </Stack>
  );
}

function SubscriptionBillingSectionFilled() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>
        Subscription &amp; Billing
      </Typography>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
          fontSize: "14px",
        }}
      >
        <RowKV label="Current Plan" value="Premium (Per Student)" />
        <RowKV label="Billing Cycle" value="Monthly" />
        <RowKV label="Next Invoice" value="01-Sep-2025" />
        <RowKV label="Payment Method" value="Bank Transfer" />
        <RowKV
          label="Account Status"
          value={
            <StatusPill
              text="In Good Standing"
              bg="rgba(76,175,80,0.08)"
              color="#2e7d32"
              borderColor="#4CAF50"
            />
          }
        />
      </Box>
    </Stack>
  );
}

/* ----------------------------------------
   SMALL BUILDING BLOCKS
---------------------------------------- */

function LabeledField({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontSize: "0.8rem",
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        defaultValue={defaultValue}
        InputProps={{
          sx: { borderRadius: 1, fontSize: "0.8rem" },
        }}
        inputProps={{
          style: { fontSize: "0.8rem" },
        }}
      />
    </Box>
  );
}

function LabeledFieldWithIcon({
  label,
  defaultValue,
  icon,
}: {
  label: string;
  defaultValue: string;
  icon?: React.ReactNode;
}) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontSize: "0.8rem",
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          size="small"
          defaultValue={defaultValue}
          InputProps={{
            sx: {
              borderRadius: 1,
              fontSize: "0.8rem",
              pr: icon ? 4 : undefined,
            },
          }}
          inputProps={{
            style: { fontSize: "0.8rem" },
          }}
        />
        {icon && (
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              right: 4,
              top: "50%",
              transform: "translateY(-50%)",
              color: "text.secondary",
            }}
          >
            {icon}
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

// reused from your code
function RowKV({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        borderBottom: "1px solid",
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

      <Box
        sx={{
          flex: 1,
          fontSize: "13px",
          fontWeight: 500,
          color: "text.primary",
        }}
      >
        {value}
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
        display: "inline-flex",
        alignItems: "center",
        fontSize: "12px",
        lineHeight: 1.4,
        borderRadius: "4px",
        border: `1px solid ${borderColor}`,
        bgcolor: bg,
        color,
        fontWeight: 500,
        px: 1,
        py: "2px",
      }}
    >
      {text}
    </Box>
  );
}

/* ----------------------------------------
   FOOTERS (EDIT MODE)
---------------------------------------- */

function FooterEditDefault() {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={1}
      sx={{ p: 2 }}
    >
      <Button
        variant="text"
        size="small"
        sx={{
          color: "text.secondary",
          textTransform: "none",
        }}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        size="small"
        sx={{
          textTransform: "none",
          bgcolor: "#FFB800",
          color: "#000",
          fontWeight: 500,
          "&:hover": {
            bgcolor: "#e5a700",
          },
        }}
      >
        Save Changes
      </Button>
    </Stack>
  );
}

function FooterSubscriptionEdit() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={{ xs: "flex-start", sm: "flex-end" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={1.5}
      sx={{ p: 2 }}
    >
      <Button
        variant="text"
        size="small"
        sx={{
          color: "text.secondary",
          textTransform: "none",
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
      >
        Change Plan
      </Button>

      <Button
        variant="contained"
        size="small"
        sx={{
          textTransform: "none",
          bgcolor: "#FFB800",
          color: "#000",
          fontWeight: 500,
          "&:hover": {
            bgcolor: "#e5a700",
          },
        }}
      >
        Save Changes
      </Button>
    </Stack>
  );
}
