// app/student/[id]/page.tsx
"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import RouterLink from "next/link";
import { useParams } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { House as HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";

import { paths } from "@/paths";
import { PropertyItem } from "@/components/core/property-item";
import { PropertyList } from "@/components/core/property-list";
import { RootState, AppDispatch } from "@/store";
import { getStudentDetail } from "@/store/reducers/student-slice";

export default function Page(): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const id = params?.studentId;
  const dispatch = useDispatch<AppDispatch>();
  const { studentDetail, detailLoading } = useSelector((s: RootState) => s.student);

  // Fetch on mount if missing or mismatched
  React.useEffect(() => {
    if (id && (!studentDetail || studentDetail.id !== id)) {
      dispatch(getStudentDetail(id));
    }
  }, [dispatch, id, studentDetail]);

  // Optional one-time retry if still empty after first attempt
  const retriedRef = React.useRef(false);
  React.useEffect(() => {
    if (
      id &&
      !detailLoading &&
      (!studentDetail || studentDetail.id !== id) &&
      !retriedRef.current
    ) {
      retriedRef.current = true;
      dispatch(getStudentDetail(id));
    }
  }, [dispatch, id, detailLoading, studentDetail]);

  const statusLabel = (studentDetail?.status || "").trim().toLowerCase();
  const isActive = statusLabel === "active";
  const statusChip = statusLabel ? (
    <Chip
      icon={isActive ? <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> : undefined}
      label={statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)}
      size="small"
      variant="outlined"
      color={isActive ? "success" : "default"}
    />
  ) : (
    <Chip label="Pending" size="small" variant="outlined" />
  );

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      {detailLoading && <LinearProgress sx={{ mb: 2 }} />}

      <Stack spacing={4}>
        <Stack spacing={2}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.student}
            sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
            variant="subtitle2"
          >
            <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
            Students
          </Link>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
              <Avatar src={studentDetail?.image || "/assets/avatar-1.png"} sx={{ width: 64, height: 64 }}>
                {studentDetail?.fullname?.slice(0, 2)?.toUpperCase() || "ST"}
              </Avatar>

              <div>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                  <Typography variant="h4">{studentDetail?.fullname || "—"}</Typography>
                  {statusChip}
                </Stack>

                <Typography color="text.secondary" variant="body1">
                  {studentDetail?.parentEmail || "No parent email"}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </Stack>

        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <UserIcon />
                  </Avatar>
                }
                title="Student Details"
              />
              <CardContent sx={{ width: "100%", overflowX: "auto" }}>
                <PropertyList divider={<Divider />} orientation="vertical">
                  <PropertyItem
                    name="Student ID"
                    value={<Chip label={studentDetail?.id || "—"} size="small" variant="soft" />}
                  />
                  <PropertyItem name="Name" value={studentDetail?.fullname || "—"} />
                  <PropertyItem name="Email (Parent)" value={studentDetail?.parentEmail || "—"} />
                  <PropertyItem name="Age" value={studentDetail?.age ?? "—"} />
                  <PropertyItem name="Grade" value={studentDetail?.grade || "—"} />
                  <PropertyItem name="Status" value={statusChip} />
                </PropertyList>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12}>
            <Card sx={{ width: "100%" }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <HouseIcon />
                  </Avatar>
                }
                title="School & Route Info"
              />
              <CardContent sx={{ width: "100%", overflowX: "auto" }}>
                <PropertyList divider={<Divider />} orientation="vertical">
                  <PropertyItem name="School ID" value={studentDetail?.schoolId || "—"} />
                  <PropertyItem name="Parent ID" value={studentDetail?.parentId || "—"} />
                  <PropertyItem name="Van Assigned" value={studentDetail?.VanId || "—"} />
                  <PropertyItem name="Class/Grade" value={studentDetail?.grade || "—"} />
                </PropertyList>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {!detailLoading && !studentDetail && (
          <Typography color="text.secondary" variant="body2">
            Student detail not available for ID: {id}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
