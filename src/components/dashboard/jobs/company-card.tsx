import * as React from 'react';
import RouterLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SealCheck as SealCheckIcon } from '@phosphor-icons/react/dist/ssr/SealCheck';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { paths } from '@/paths';

// Assuming 'Job' and 'Company' interfaces are defined and properly typed
export interface Job {
  title: string;
  jobType: string;
  startDate: string;
  salaryRange: string;
  postedAgo: string;
  description: string;
  id: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  employees: string;
  rating: number;
  isVerified: boolean;
  jobs: Job[];
}

export interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* Company header */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Avatar
              component={RouterLink}
              href={paths.dashboard.jobs.companies.overview(company.id)}  // Dynamic link to the company's overview
              src={company.logo || '/path/to/default/logo.png'}  // Fallback for logo
              variant="rounded"
            />
            <Stack spacing={1}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.jobs.companies.overview(company.id)}
                  variant="h6"
                >
                  {company.name}
                </Link>
                <Typography variant="body2">{company.description}</Typography>
              </div>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <UsersIcon fontSize="var(--icon-fontSize-md)" />
                  <Typography color="text.secondary" noWrap variant="overline">
                    {company.employees}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <StarIcon color="var(--mui-palette-warning-main)" fontSize="var(--icon-fontSize-md)" weight="fill" />
                  <Typography color="text.secondary" noWrap variant="overline">
                    {company.rating}/5
                  </Typography>
                </Stack>
                {company.isVerified && (
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                    <SealCheckIcon
                      color="var(--mui-palette-success-main)"
                      fontSize="var(--icon-fontSize-md)"
                      weight="fill"
                    />
                    <Typography color="success" noWrap variant="overline">
                      Verified
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>

          {/* Job Listing */}
          <Stack spacing={2}>
            {company.jobs.map((job) => (
              <Card key={job.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2">{job.jobType} | Start Date: {job.startDate}</Typography>
                  <Typography variant="body2">Salary: {job.salaryRange}</Typography>
                  <Typography variant="body2" noWrap>{job.description}</Typography>
                  <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Job Posted: {job.postedAgo}
                    </Typography>
                    <RouterLink href={`/jobs/${job.id}`}>
                      <Typography variant="caption" color="primary">
                        View
                      </Typography>
                    </RouterLink>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
