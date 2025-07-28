"use client"

import { paths } from "@/paths"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Megaphone, Briefcase, UserList, FileSearch } from "@phosphor-icons/react"

const quickLinks = [
  {
    icon: '/assets/dashboard/create-campaign-icon.svg',
    title: "Campaign",
    href: paths.dashboard.marketing.campaign,
  },
  {
    icon: '/assets/dashboard/post-job-icon.svg',
    title: "Post a Job",
    href: paths.dashboard.jobs.create,
  },
  {
    icon: '/assets/dashboard/import-contacts.svg',
    title: "Contacts",
    href: paths.dashboard.marketing.contact,
  },
  {
    icon: '/assets/dashboard/audit-logs-icon.svg',
    title: "Audit Logs",
    href: paths.dashboard.settings.auditlogs,
  },
]

export default function QuickLinks() {
  return (
    <Card sx={{ backgroundColor: "#F1F2F6" , p: 2}}>
      <Stack>
        <Stack direction="row" alignItems="center" spacing={2} sx={{py: 2}}>
          <Box
            component="img"
            src="/assets/dashboard/quick-link-icon.svg"
            alt="quick-link-icon"
            sx={{ width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
          />
          <Typography variant="body1">Quick Links</Typography>
        </Stack>

        <Grid container spacing={2} >
          {quickLinks.map((link) => (
            <Grid item xs={12} sm={6} key={link.title}>
              <Card
                component="a"
                href={link.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "0px 2px 10px rgba(76, 78, 100, 0.22)",
                  transition: "all 0.2s ease",
                  borderRadius:'5px !important',
                  px: "12px",
                  py: "20px",
                  "&:hover": {
                    boxShadow: "0px 4px 20px rgba(76, 78, 100, 0.3)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    color: "primary.main",
                  }}
                >
                  <img src={`${link.icon}`} width={'24px'} height={'24px'}/>
                </Box>
                <Typography variant="body2" fontWeight={500}>
                  {link.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Stack>
    </Card>
  )
}

