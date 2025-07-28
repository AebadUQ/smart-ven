"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { NoSsr } from "@/components/core/no-ssr"



export default function ListGrowth({data}: any): React.JSX.Element {
  const [timeRange, setTimeRange] = React.useState("This Week")
  const chartHeight = 400

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        sx={{ pb: 1 }}
        title={
          <Stack direction="row" alignItems="center" spacing={2}>
             <Box
          component="img"
          src="/assets/dashboard/list-growth-icon.svg"
          alt="list-growth-icon"
          // sx={{ width: 24, height: 24 }}
        />
            <Typography variant="h6">List Growth</Typography>
          </Stack>
        }
        // action={
        //   <Select
        //     value={timeRange}
        //     onChange={(e) => setTimeRange(e.target.value)}
        //     size="small"
        //     sx={{
        //       minWidth: 120,
        //       "& .MuiSelect-select": {
        //         py: 1,
        //         px: 2,
        //       },
        //     }}
        //   >
        //     <MenuItem value="This Week">This Week</MenuItem>
        //     <MenuItem value="Last Week">Last Week</MenuItem>
        //     <MenuItem value="Last Month">Last Month</MenuItem>
        //   </Select>
        // }
      />
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", pt: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 3,
            color: "text.secondary",
            fontWeight: 500,
          }}
        >
          Subscribers
        </Typography>
        <Box sx={{ flex: 1, minHeight: 350 }}>
          <NoSsr fallback={<Box sx={{ height: "100%" }} />}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -15 }} barCategoryGap={8}>
                <CartesianGrid strokeDasharray="8" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  axisLine={false}
                  dataKey="name"
                  tickLine={false}
                  tick={{
                    fill: "#6B7280",
                    fontSize: 12,
                  }}
                  dy={10}
                />
                <YAxis
                 axisLine={false}
                 tickLine={false}
                 tickCount={6} // Ensure 6 labels
                 domain={[0, 10]} // Keep within 0-10 range
                 tickFormatter={(value) => value.toString().padStart(2, "0")} // Format as "00, 02, 04, 06, 08, 10"
                 tick={{
                   fill: "#1976D2",
                   fontSize: 12,
                 }}
                 dx={-5}
                />
                <Bar dataKey="value" fill="#2196F3" radius={[5,5,5,5]} barSize={45} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    fill: "rgba(0, 0, 0, 0.04)",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
        </Box>
      </CardContent>
    </Card>
  )
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps): React.JSX.Element | null {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <Paper
      sx={{
        border: "1px solid var(--mui-palette-divider)",
        boxShadow: "var(--mui-shadows-16)",
        p: 1.5,
        minWidth: 100,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="subtitle2">{payload[0].value} subscribers</Typography>
    </Paper>
  )
}

