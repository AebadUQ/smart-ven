'use client';

import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import RouterLink from 'next/link';
import { getAllJobs, getJobCategories } from '@/services/jobs.api';
import { Avatar, Badge, Chip, CircularProgress, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { paths } from '@/paths';
import useListApi from '@/hooks/useListApi';
import { PostCard } from '@/components/dashboard/blog/post-card';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CompanyCard } from '@/components/dashboard/jobs/company-card';
import type { Company } from '@/components/dashboard/jobs/company-card';
import { JobsCard } from '@/components/dashboard/jobs/jobs-card';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { dayjs } from '@/lib/dayjs';
import { JobPostFilters } from '../jobPostFilter';

export default function Page(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  // const [isDone, setIsDone] = useState(false);
  const [edit, setEdit] = useState(false);
  const router = useRouter(); // Initialize useNavigate
    
  const [viewdata, setViewdata] = React.useState<null>(null);
  const [editData, setEditData] = React.useState<null>(null);
  //const url = getAllJobs();
  const url = useMemo(() => getAllJobs(), []);

  const { data, loading, onPaginationChange, onPageSizeChange, total, pageSize, pageIndex, onSort, filter, setFilter } =
    useListApi<any>(url, '', 'jobporatl');
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
      try {
        const categories = await getJobCategories();

        setCategories(categories?.data?.data?.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }, []);

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

    const handleViewClick = (id: string) => {
      router.push(`${paths.dashboard.jobs.candidates}/${id}`); // Navigate to the job details page using the job id
    };
  
    const handleEditClick = (id: string) => {
      router.push(`${paths.dashboard.jobs.editJob}/${id}`); // Navigate to the job details page using the job id
    };


    const columns = [
        
        {
          formatter: (row): React.JSX.Element => (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="body2">
                {row?.jobCategory?.name}
              </Typography>
            </Stack>
          ),
          name: 'JOB CATEGORY',
          
        },
        {
          formatter: (row): React.JSX.Element => (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="body2">
                {row?.positionName}
              </Typography>
            </Stack>
          ),
          name: 'POSITION NAME',
          
        },
        {
          formatter: (row): React.JSX.Element => {
            
        
            return (
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography color="text.primary" variant="body2">
                  {row.noOfVacancies}
                </Typography>
              </Stack>
            );
          },
          name: 'No OF Vacancies',
          
        },
        {
          formatter: (row): React.JSX.Element => (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="body2">
                {dayjs(row?.dateOfPosting).format('MMM D, YYYY h:mm A')}
              </Typography>
            </Stack>
          ),
          name: 'Announcement Date',
        },
        {
          formatter: (row): React.JSX.Element => (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="body2">
                {dayjs(row?.expirationDate).format('MMM D, YYYY h:mm A')}
              </Typography>
            </Stack>
          ),
          name: 'Application Deadline',
        },
        {
          formatter: (row): React.JSX.Element => {
            const statusOne = row?.statusId === 7
              ? { label: 'Active', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> }
              : { label: 'Inactive', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> };
    
            return (
              <Chip
                key={row?.id}
                // onClick={() => handleStatus(row, row.id)}
                sx={{ cursor: 'pointer' }}
                icon={statusOne.icon}
                label={statusOne.label}
                size="small"
                variant="outlined"
              />
            );
          },
          name: 'STATUS',
          align: 'center',
          
        },
        {
          formatter: (row): React.JSX.Element => {
            return (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => handleViewClick(row.id)}>
          <Badge
            badgeContent={row?.numberOfCandidates}
            color="primary"            // pick whatever color you like
            overlap="circular"        // adapts badge positioning for a circular child
          >
            <UsersIcon fontSize="var(--icon-fontSize-md)" />
          </Badge>
        </IconButton>



                <IconButton onClick={() => handleEditClick(row?.id)}>
                
                  <PencilIcon />
                </IconButton>
                {/* <IconButton onClick={() => ""}>
                  <TrashIcon />
                </IconButton> */}
              </Stack>
            );
          },
          name: 'ACTION',
          align: 'center',
        },
        
        
      ] satisfies ColumnDef<any>[];
    


  return (

    <>
          <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'center' }}>
                <Box sx={{ flex: '1 1 auto' }}>
                  <Typography variant="h5">Jobs</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end',gap:2,alignItems:'center' }}>
                {/* <Button startIcon={<UsersIcon />} onClick={() => handleViewClick("general")} variant="contained">
                    View General Aplications
                  </Button> */}

                  
                  <Button startIcon={<PlusIcon />} component={RouterLink} href={paths.dashboard.jobs.create} variant="contained">
                    Post a job
                  </Button>
                </Box>
              </Stack>
              <Card>
                {/* Fix here User Filter only email is return  */}
                <JobPostFilters categories={categories} filters={filter} setFilters={setFilter} />
                <Divider />
                <Box sx={{ overflowX: 'auto' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : data?.length ? (
                <DataTable<any> columns={columns} rows={data} />
              ) : (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                    No jobs found
                  </Typography>
                </Box>
              )}
            </Box>
                <Divider />
                <CustomersPagination
                  count={total}
                  page={pageIndex}
                  rowsPerPage={pageSize}
                  onPaginationChange={(event, newPage) => onPaginationChange(newPage + 1)} // MUI 0-based index handle karega
                  onRowsPerPageChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
                />
              </Card>
            </Stack>
            </Box>
        </>

    );
}
