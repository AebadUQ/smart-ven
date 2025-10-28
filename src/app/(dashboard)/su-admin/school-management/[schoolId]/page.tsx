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
} from "@mui/material";
import Link from "next/link";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import RouterLink from "next/link";

/**
 * Small reusable row like the screenshot
 */
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
        {value || "—"}
      </Box>
    </Stack>
  );
}

export default function Page(): React.JSX.Element {
  // static mock data from screenshot
  const schoolName = "Beaconhouse International School";
  const status = "Active";
  const fullName = "Omar Yasir";
  const schoolId = "0900";
  const gender = "Male";
  const dob = "02/02/2012";
  const grade = "Grade";
  const parentName = "Ayesha";

  const selectedVan = "Ali Khan, Van";
  const selectedRoute = "City Center";
  const exceptions = ["Special Needs ✕", "Timing Change ✕"];

  return (
    <Box sx={{ p: 3, width: "100%", position: "relative" }}>
      {/* Back link */}
      <Stack spacing={2} sx={{ mb: 2 }}>
         <Link
                  color="text.primary"
                  component={RouterLink}
                  href={'/su-admin/school-management'} // your alerts list path
                  sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                </Link>
       

        <Card
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: "divider",
            pb:4
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

            {/* right: status chip (green Active like screenshot) */}
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
              color="success"
              sx={{
                height: 28,
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            />
          </Box>

          {/* ================= Student Detail section ================= */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
            variant="h6"
              
            >
              Student Detail
            </Typography>

            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
                mt:4

              }}
            >
              <DetailRow label="Full Name" value={fullName} />
              <DetailRow label="School ID" value={schoolId} />
              <DetailRow label="Gender" value={gender} />
              <DetailRow label="Date of Birth" value={dob} />
              <DetailRow label="Assign Student to" value={grade} />
              <DetailRow
                label="Link to Parent(s) Account"
                noBorder
                value={
                  <Chip
                    label={parentName}
                    size="small"
                    sx={{
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      height: 24,
                    }}
                  />
                }
              />
            </Box>
          </Box>

          {/* ================= Assign Van & Route section ================= */}
          <Box sx={{ p: 2 }}>
            <Typography
                         variant="h6"

            >
              Assign Student to Van & Route
            </Typography>

            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
                mt:4
              }}
            >
              <DetailRow label="Selected Van" value={selectedVan} />
              <DetailRow label="Select Route" value={selectedRoute} />
              <DetailRow
                label="Pick/Drop Exceptions"
                noBorder
                value={
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    sx={{ gap: 1 }}
                    alignItems="center"
                  >
                    {exceptions.map((ex, idx) => (
                      <Chip
                        key={idx}
                        label={ex}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: 24,
                          borderRadius: "4px",
                        }}
                      />
                    ))}
                  </Stack>
                }
              />
            </Box>
          </Box>

          <Divider />

          {/* footer actions */}
         <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end" sx={{paddingInline:2}}>
                     <Button variant="outlined" onClick={()=>{}}>Cancel</Button>
                     <Button variant="contained" onClick={()=>{}} >Save</Button>
                   </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
