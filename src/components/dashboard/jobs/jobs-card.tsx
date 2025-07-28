'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

import { dayjs } from '@/lib/dayjs';
import { paths } from '@/paths';




export function JobsCard({job}: any): React.JSX.Element {
  // Static job data
  const router = useRouter(); // Initialize useNavigate
  const handleViewClick = () => {
    router.push(`${paths.dashboard.jobs.candidates}/${job.id}`); // Navigate to the job details page using the job id
  };

  const handleEditClick = () => {
    router.push(`${paths.dashboard.jobs.editJob}/${job.id}`); // Navigate to the job details page using the job id
  };

  
    const salary = `${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'OMR',
      notation: 'compact',
    }).format(job.minSalary)} - ${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'OMR',
      notation: 'compact',
    }).format(job.maxSalary)}`;
    

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 1, padding: 2 }}>
      <Stack divider={<Divider />}>
        {/* Job Title and Information */}
        <Stack
          direction="row"
          key={job.id}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
          }}
        >
          <div>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {job?.jobCategory?.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              /
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {job?.positionName}
            </Typography>
          </Stack>
            <Typography color="text.secondary" variant="body2">
              {job.jobType} | Start Date: {dayjs(job?.dateOfPosting).format('MMM D, YYYY h:mm A')}
            </Typography>
          </div>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              Budget: {salary}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {dayjs(job?.createdAt).fromNow()}
            </Typography>
            <Button size="small" variant="outlined" color="primary" onClick={handleViewClick} >
              View
            </Button>
            <Button size="small" variant="outlined" color="primary" onClick={handleEditClick} >
              Edit
            </Button>
          </Stack>
        </Stack>

        {/* Job Description */}
        <Stack direction="row" spacing={2} sx={{ px: 2, py: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flex: 1,
            /* Ensures the text does not overflow its box */
            overflow: 'hidden',
            /* Display as a multi-line block that can be truncated */
            display: '-webkit-box',
            /* Limit to 2 or 3 lines, as desired */
            WebkitLineClamp: 3, 
            /* Required for -webkit-line-clamp to work */
            WebkitBoxOrient: 'vertical',
            /* Ensures an ellipsis is shown if text is longer than the set clamp */
            textOverflow: 'ellipsis',
          }}
          /* Displays HTML coming from the editor */
          dangerouslySetInnerHTML={{ __html: job?.jobDescription }}
        />
        </Stack>
      </Stack>
    </Card>
  );
}
