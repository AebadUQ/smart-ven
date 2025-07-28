'use client';
import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { config } from '@/config';
import { paths } from '@/paths';
import { JobPostCreateForm } from '@/components/dashboard/jobs/jobpost-create-form';
import {getJobCategories, getCareerConfiguration, getJobById} from '@/services/jobs.api'
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


//export const metadata = { title: `Create | Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
const [categories, setCategories] = useState([]);
const [jodData, setjobData] = useState(null);
const [jobType, setJobType] = useState([]);
const [locations, setlocations] = useState([]);

const params = useParams();
  const id = params?.id;



  const fetchCategories = useCallback(async () => {
        try {
          const categories = await getJobCategories();
          const locations = await getCareerConfiguration("location");
          const jobType = await getCareerConfiguration("jobType");
  
            setCategories(categories?.data?.data?.data || []);
            setlocations(locations || []);
            setJobType(jobType || []);
            
  
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }, []);
  
    

    const fetchJobById = useCallback(async () => {
      try {
        const jobdata = await getJobById(id);

        setjobData(jobdata?.data?.data?.data || null);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }, []);

    useEffect(() => {
      fetchCategories();
      fetchJobById();
    }, [])
  
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack spacing={3}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.jobs.browse}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Back
            </Link>
          </div>
          <div>
            <Typography variant="h4">Update Job Post</Typography>
          </div>
        </Stack>
        
        {jodData && locations && jobType && categories && ( <JobPostCreateForm categories={categories} jobType={jobType} locations={locations} jobdata={jodData} isEdit={true} />) }
      </Stack>
    </Box>
  );
}
