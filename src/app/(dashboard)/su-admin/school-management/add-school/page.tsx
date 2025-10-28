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
import RouterLink from "next/link";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import Link from "next/link";

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
  // { key: "admins", label: "Admins", order: 4 },
  // { key: "access", label: "Access", order: 5 },
  // { key: "audit", label: "Audit Trail", order: 7 },
  // { key: "notes", label: "Notes", order: 8 },
  // { key: "branches", label: "Branches", order: 9 },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  // which step index we're on for styling chips
  const activeTabOrder =
    tabsList.find((t) => t.key === activeTab)?.order ?? 0;

  // footer button config
  const isProfileFlow =
    activeTab === "profile" ||
    activeTab === "route_rules" ||
    activeTab === "limits";

  const isSubscriptionFlow = activeTab === "subscription";
  const isAdminsFlow = activeTab === "admins";
  const isAccessFlow = activeTab === "access";

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
      {/* Top row: Back + Title + Right Actions */}
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        {/* left block */}
        <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
          {/* back row */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Link
                             color="text.primary"
                             component={RouterLink}
                             href={'/su-admin/school-management'} // your alerts list path
                             sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
                             variant="subtitle2"
                           >
                             <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                           </Link>

            {/* status chip on far right like "Active" green */}
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
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Typography variant="h6" fontWeight={600}>
              School Details
            </Typography>

            {/* "Edit Profile" icon button on the right (for Admins/Access screens),
                but we only show this for tabs after profile (to match screenshots) */}
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

          {/* Student Detail row (logo + contact strip) - show on all tabs except
             the first 3 ("Profile", "Route Rules", "Limits") because in figma
             those first screens don't always show this header */}
          {activeTab !== "profile" &&
            activeTab !== "route_rules" &&
            activeTab !== "limits" && (
              <StudentDetailHeader />
            )}

          {/* FILL THE DETAILS + tab chips */}
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

                // base state (upcoming)
                let bg = "#F6F7F9";
                let textColor = "#000";
                let dotColor = "#787878";
                let borderColor = "#E0E2E7";

                if (isActive) {
                  // current tab
                  bg = "#1560BD";
                  textColor = "#fff";
                  dotColor = "#FFB800";
                  borderColor = "transparent";
                } else if (isCompleted) {
                  // previous / done
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
                    {/* 8x8 left dot */}
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

        {/* right-side page-level actions */}
        <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ ml: 2 }}>
          {/* in screenshots, top right has no Cancel/Save, so we hide here */}
        </Stack>
      </Stack>

      {/* Card content section */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 1.5,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          {activeTab === "profile" && <ProfileSection />}

          {activeTab === "route_rules" && <RouteRulesSection />}

          {activeTab === "limits" && <LimitsSection />}

          {activeTab === "subscription" && (
            <SubscriptionBillingSection />
          )}

          {activeTab === "admins" && <AdminsSection />}

          {activeTab === "access" && <AccessSection />}

          {/* placeholder for future tabs */}
          {activeTab !== "profile" &&
            activeTab !== "route_rules" &&
            activeTab !== "limits" &&
            activeTab !== "subscription" &&
            activeTab !== "admins" &&
            activeTab !== "access" && (
              <Box
                sx={{
                  py: 4,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <Typography variant="body2">
                  {tabsList.find((t) => t.key === activeTab)?.label} coming
                  soon...
                </Typography>
              </Box>
            )}
        </CardContent>

        <Divider />

        {/* footer buttons (change based on tab) */}
        {isSubscriptionFlow ? (
          <FooterSubscription />
        ) : isAdminsFlow ? (
          <FooterAdmins />
        ) : isAccessFlow ? (
          <FooterAccess />
        ) : (
          <FooterDefault isLastStep={activeTab !== "profile"} />
        )}
      </Card>
    </Box>
  );
}

/* ===================== SHARED HEADER BLOCK ===================== */

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
        {/* logo */}
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

        {/* Contact strip */}
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
      </Stack>
    </Box>
  );
}

/* ===================== TAB SECTIONS ===================== */

function ProfileSection() {
  return (
    <Stack spacing={2}>
      {/* Logo upload row */}
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
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 1,
              textTransform: "none",
              width: "fit-content",
            }}
          >
            Select
          </Button>
        </Stack>
      </Stack>

      {/* Form grid */}
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
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            School Name *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Beaconhouse"
            InputProps={{
              sx: { borderRadius: 1 },
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Address *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Street 12, DHA, Karachi"
            InputProps={{
              sx: { borderRadius: 1 },
              endAdornment: (
                <IconButton edge="end" size="small">
                  <RoomOutlinedIcon fontSize="small" />
                </IconButton>
              ),
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Contact Person *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Ali Raza"
            InputProps={{
              sx: { borderRadius: 1 },
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Contact Number *
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="+92-300-1234567"
            InputProps={{
              sx: { borderRadius: 1 },
            }}
          />
        </Box>
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
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <FieldWithIcon
          label="Start Time *"
          placeholder="07:30 AM"
          icon={<AccessTimeIcon fontSize="small" />}
        />
        <FieldWithIcon
          label="End Time *"
          placeholder="02:30 PM"
          icon={<AccessTimeIcon fontSize="small" />}
        />
        <FieldWithIcon
          label="Max Trip Duration *"
          placeholder="45 mins"
        />
        <FieldWithIcon
          label="Buffer Time *"
          placeholder="10 mins"
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
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <SimpleField label="Allowed Vans *" placeholder="50" />
        <SimpleField label="Allowed Routes *" placeholder="20" />
        <SimpleField label="Allowed Students *" placeholder="1000" />
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
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
          fontSize: "14px",
        }}
      >
        <RowKV
          label="Current Plan"
          value="Premium (Per Student)"
        />
        <RowKV label="Billing Cycle" value="Monthly" />
        <RowKV label="Next Invoice" value="01-Sep-2025" />
        <RowKV label="Payment Method" value="Bank Transfer" />
        <RowKV
          label="Pick/Drop Exceptions"
          value={
            <StatusPill
              text="Active"
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
            "& td": {
              fontSize: "13px",
            },
          }}
        >
          <TableHead >
            <TableRow>
              <TableCell sx={{py:2}}>Name</TableCell>
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
          sx={{
            mb: 1,
            fontWeight: 500,
            fontSize: "13px",
            color: "text.secondary",
          }}
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

function FieldWithIcon({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
}) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        InputProps={{
          sx: { borderRadius: 1 },
          endAdornment: icon ? (
            <IconButton edge="end" size="small">
              {icon}
            </IconButton>
          ) : undefined,
        }}
      />
    </Box>
  );
}

function SimpleField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        InputProps={{
          sx: { borderRadius: 1 },
        }}
      />
    </Box>
  );
}

// row for Subscription & Billing section (2-col row: left label, right value)
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

// pill for statuses: Active / Suspended / Restricted etc
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

// table row for Admins section
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
    <TableRow
      sx={{
        "& td": {
          verticalAlign: "top",
          fontSize: "13px",
        },
      }}
    >
      <TableCell
        sx={{
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </TableCell>
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

/* ===================== FOOTERS ===================== */

function FooterDefault({ isLastStep }: { isLastStep: boolean }) {
  // for profile / route_rules / limits
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
        {isLastStep ? "Save" : "Next"}
      </Button>
    </Stack>
  );
}

function FooterSubscription() {
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
        Next
      </Button>
    </Stack>
  );
}

function FooterAdmins() {
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
        Cancel
      </Button>

      <Button
        variant="contained"
        size="small"
        sx={{
          textTransform: "none",
          bgcolor: "#1560BD",
          color: "#fff",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          "&:hover": {
            bgcolor: "#0f4a94",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            fontSize: "16px",
            lineHeight: 1,
            fontWeight: 600,
          }}
        >
          +
        </Box>
        Add Role
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
        Next
      </Button>
    </Stack>
  );
}

function FooterAccess() {
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
        Next
      </Button>
    </Stack>
  );
}
