"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import RouterLink from "next/link";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getSchoolById } from "@/store/reducers/suadmin-slice";

/** Small reusable row like the screenshot */
function DetailRow(props: { label: string; value: React.ReactNode; noBorder?: boolean }) {
  const { label, value, noBorder } = props;
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        width: "100%",
        borderBottom: noBorder ? "none" : "1px solid",
        borderColor: "divider",
        p: 1.5,
      }}
      spacing={1}
    >
      <Box
        sx={{
          minWidth: { sm: 200 },
          maxWidth: { sm: 200 },
          flexShrink: 0,
          color: "text.secondary",
          fontSize: "0.75rem",
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        {label}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          fontSize: "0.8rem",
          lineHeight: 1.5,
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {value ?? "—"}
      </Box>
    </Stack>
  );
}

export default function Page(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const schoolId = String(params?.schoolId ?? "");

  const dispatch = useDispatch<AppDispatch>();
  const { school, loading, error } = useSelector((s: RootState) => s.suadmin);

  React.useEffect(() => {
    if (schoolId) dispatch(getSchoolById(schoolId));
  }, [dispatch, schoolId]);

  // Helpers
  const fmt = (v: any, fallback: string = "—") =>
    v === null || v === undefined || v === "" ? fallback : v;

  // Map backend -> UI (using your sample shape)
  const schoolName = fmt(school?.schoolName);
  const status = (String(school?.status ?? "active")[0]?.toUpperCase() ?? "") + String(school?.status ?? "active").slice(1); // "Active"/"Inactive"
  const fullName = fmt(school?.admin?.name);
  const schoolCode = fmt(school?._id);
  const gender = "—"; // not in school schema
  const dob = "—"; // not in school schema
  const grade = "—"; // not in school schema
  const parentName = fmt(school?.admin?.email); // closest "link to parent" analogy

  const selectedVan = fmt(school?.contactPerson) + ", Van"; // you can bind to actual van when available
  const selectedRoute = `${fmt(school?.lat, "")} ${fmt(school?.long, "")}`.trim() || "—";
  const exceptions: string[] = [
    school?.autoRenew ? "Auto Renew ✓" : "Auto Renew ✕",
    school?.bufferTime ? `Buffer ${school.bufferTime}m` : "Buffer ✕",
  ].filter(Boolean);

  // Loading / error states
  if (loading && !school) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !school) {
    return (
      <Box sx={{ p: 3 }}>
        <Link
          color="text.primary"
          component={RouterLink}
          href={"/su-admin/school-management"}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
        </Link>
        <Typography color="error" sx={{ mt: 2 }}>
          {String(error)}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, width: "100%", position: "relative" }}>
      {/* Back link */}
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Link
          color="text.primary"
          component={RouterLink}
          href={"/su-admin/school-management"}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
        </Link>

        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: "divider",
            pb: 4,
          }}
        >
          {/* Header row */}
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              flexWrap: "wrap",
              p: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              gap: 2,
            }}
          >
            {/* left: logo + school name */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src="/assets/school-placeholder.png"
                sx={{ width: 48, height: 48 }}
                variant="circular"
              />
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {schoolName}
              </Typography>
            </Stack>

            {/* right: status chip */}
            <Chip
              icon={
                <CheckCircleIcon
                  color="var(--mui-palette-success-main)"
                  weight="fill"
                />
              }
              label={status}
              size="small"
              variant="outlined"
              color={String(school?.status ?? "active").toLowerCase() === "active" ? "success" : "default"}
              sx={{
                height: 28,
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            />
          </Box>

          {/* ================= School Detail section ================= */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6">School Detail</Typography>

            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
                mt: 4,
              }}
            >
              <DetailRow label="School Name" value={schoolName} />
              <DetailRow label="School ID" value={schoolCode} />
              <DetailRow label="Contact Person" value={fmt(school?.contactPerson)} />
              <DetailRow label="Contact Number" value={fmt(school?.contactNumber)} />
              <DetailRow label="Email" value={fmt(school?.schoolEmail)} />
              <DetailRow label="Address" value={fmt(school?.address)} />
              <DetailRow
                label="Admin (Name / Email)"
                noBorder
                value={
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Chip
                      label={fmt(fullName)}
                      size="small"
                      sx={{ borderRadius: "4px", fontSize: "0.7rem", height: 24 }}
                    />
                    <Chip
                      label={fmt(school?.admin?.email)}
                      size="small"
                      sx={{ borderRadius: "4px", fontSize: "0.7rem", height: 24 }}
                    />
                  </Stack>
                }
              />
            </Box>
          </Box>

          {/* ================= Route / Timing & Limits ================= */}
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Route & Timing / Limits</Typography>

            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
                mt: 4,
              }}
            >
              <DetailRow label="Start Time" value={fmt(school?.startTime)} />
              <DetailRow label="End Time" value={fmt(school?.endTime)} />
              <DetailRow label="Max Trip Duration" value={fmt(school?.maxTripDuration ? `${school.maxTripDuration} mins` : "—")} />
              <DetailRow label="Buffer Time" value={fmt(school?.bufferTime ? `${school.bufferTime} mins` : "—")} />
              <DetailRow label="Plan" value={fmt(school?.currentPlan)} />
              <DetailRow label="Billing Cycle" value={fmt(school?.billingCycle)} />
              <DetailRow label="Payment Method" value={fmt(school?.paymentMethod)} />
              <DetailRow label="Allowed Vans" value={fmt(school?.allowedVans)} />
              <DetailRow label="Allowed Routes" value={fmt(school?.allowedRoutes)} />
              <DetailRow label="Allowed Students" value={fmt(school?.allowedStudents)} />
              <DetailRow
                label="Geo Location"
                value={`${fmt(school?.lat, "")} ${fmt(school?.long, "")}`.trim() || "—"}
              />
              <DetailRow
                label="Flags"
                noBorder
                value={
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      label={school?.autoRenew ? "Auto Renew ✓" : "Auto Renew ✕"}
                      size="small"
                      sx={{ fontSize: "0.7rem", height: 24, borderRadius: "4px" }}
                    />
                  </Stack>
                }
              />
            </Box>
          </Box>

          <Divider />

          {/* footer actions */}
          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end" sx={{ paddingInline: 2 }}>
            <Button variant="outlined" onClick={() => router.back()}>Back</Button>
            <Button
              variant="contained"
              onClick={() => router.push(`/su-admin/school-management/edit/${schoolId}`)}
            >
              Edit
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
