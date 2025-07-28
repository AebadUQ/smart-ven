'use client';

import * as React from 'react';
import {  useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAllCandidatesById, getGeneralCandidates, getJobStatus, getActiveJobs, getAllCandidates, getAllActiveJobs } from '@/services/jobs.api';
import Box from '@mui/material/Box';
import RouterLink from 'next/link';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as ViewIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import { dayjs } from '@/lib/dayjs';
import useListApi from '@/hooks/useListApi';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { Pencil as PencilIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { CandidatesFilters } from '../candidate-filters';
import { CandidateModal } from '../Candidate-modal';
import { StatusModal } from '../candidateStatus-modal';
import { AssignVacancyModal } from '../candidateAssign-modal';


import { Chip, Link, Menu, MenuItem } from '@mui/material';
import { paths } from '@/paths';

interface PageProps {
  searchParams: { email?: string; phone?: string; sortDir?: 'asc' | 'desc'; status?: string };
}

export default function Page({ searchParams }: PageProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [assignVacancyOpen, setAssignVacancyOpen] = React.useState(false);
  const [jobStatus, setJobStatus] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);



  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuRecord, setMenuRecord] = useState<any | null>(null);
  
  
  const [selectedRow, setSelectedRow] = React.useState({});
  const url = getAllCandidates();
    
      
  const { data, setData,loading, onPaginationChange, onPageSizeChange, total, pageSize, pageIndex, onSort, filter, setFilter } =
    useListApi<any>(url, '','jobporatl');


    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, record: any) => {
        setAnchorEl(e.currentTarget);
        setMenuRecord(record);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuRecord(null);
      };
  

  const handleEdit = (row: any, type:any) => {
    setSelectedRow(row);
    if(type === "view"){
      setOpen(true);
    }
    else if(type === "editStatus"){
      setStatusOpen(true)
      handleMenuClose();
    }
    else if(type === "editVacancy"){
      setAssignVacancyOpen(true)
      handleMenuClose();
    }
    
  };
  const fetchStatus = useCallback(async () => {
      try {
        const categoryData = await getJobStatus("candidate");
        setJobStatus(categoryData.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }, []);

    const fetchJobs = useCallback(async () => {
      try {
        const getJobs = await getAllActiveJobs();
        setJobs(getJobs?.data?.data?.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }, []);

  React.useEffect(() => {
    fetchStatus();
      fetchJobs();
   
  },[])

  const columns = [
    
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {"HR-" + row?.id}
          </Typography>
        </Stack>
      ),
      name: 'Ref No',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.user?.title + ' ' + row?.user?.name}
          </Typography>
        </Stack>
      ),
      name: 'Full Name',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {row?.user?.idOrPassportNumber}
          </Typography>
        </Stack>
      ),
      name: 'Id / Passport No',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.user?.email || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'email',
      width: '150px',
    },
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.user?.phoneNumber || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Phone Number',
      width: '100px',
    },

    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.totalYearsOfExperience || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Experience',
      width: '100px',
    },

    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.user?.nationality || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Nationality',
      width: '100px',
    },

    {
      formatter: (row): React.JSX.Element => {
        // map titles to genders
        const genderMap: Record<string, string> = {
          'MR.': 'Male',
          'MS.': 'Female',
          'MRS.': 'Female',
        };
        // look up the title (default to 'N/A' if missing or unrecognized)
        const title = row?.user?.title ?? '';
        const genderLabel = genderMap[title] ?? 'N/A';
    
        return (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary" variant="body2">
              {genderLabel}
            </Typography>
          </Stack>
        );
      },
      name: 'Gender',
      width: '100px',
    },
    

    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.currentPosition || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Current Position',
      width: '100px',
    },

    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.currentEmployer || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Current Employer',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.currentSalary? row?.salaryCurrency + " " + row?.currentSalary : 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Current Salary',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.expectedSalary ? "OMR " + row?.expectedSalary : 'N/A' }
            </Typography>
          </Stack>
        );
      },
      name: 'Expected Salary',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.user?.educations?.[0]?.educational_level || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Education',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center',textAlign:'center', justifyContent:'center' }}>
            <Typography color="text.secondary" variant="body2">
              {row?.user?.educations?.[0]?.major || 'N/A'}
            </Typography>
          </Stack>
        );
      },
      name: 'Majors',
      width: '100px',
    },

    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            {dayjs(row.createdAt).format('MMM D, YYYY h:mm A')}
          </Typography>
        </Stack>
      ),
      name: 'Date',
      width: '250px',
    },
    {
              formatter: (row): React.JSX.Element => {
                const status = { label: "active", icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> }
                  
                return (
                  <Chip
                    key={row?.id}
                    // onClick={() => handleStatus(row, row.id)}
                    sx={{ cursor: 'pointer' }}
                    label={row?.status?.statusName}
                    size="small"
                    variant="outlined"
                  />
                );
              },
              name: 'STATUS',
              align: 'center',
              
    },
    {
      formatter: (row): React.JSX.Element => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => handleEdit(row, "view")} size="small" sx={{ color: 'primary.main' }}>
            <ViewIcon />
          </IconButton>

          {/* <IconButton onClick={() => handleEdit(row, "edit")} size="small" sx={{ color: 'primary.main' }}>
            <PencilIcon />
          </IconButton> */}

          <IconButton edge="end" onClick={e => handleMenuOpen(e, row) } size="small" sx={{ color: 'primary.main' }} >
          <DotsThreeIcon style={{ transform: 'rotate(90deg)' }}  />
          </IconButton>

        </Stack>
      ),
      name: 'Actions',
      width: '100px',
      align: 'right',
    },
  ] satisfies ColumnDef<any>[];

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={3}>
        <Box>
            <Typography variant="h5">All Candidates</Typography>
          </Box>
        
        </Stack>
        <CustomersSelectionProvider customers={[]}>
          <Card>
            <CandidatesFilters filterType="All" jobStatus={jobStatus} jobType={jobs} filters={filter} setFilters={setFilter}  />
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
                    No Canditates found
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider />
            <CustomersPagination
              count={total}
              page={+pageIndex}
              rowsPerPage={pageSize}
              onPaginationChange={(event, newPage) => onPaginationChange(newPage + 1)} // MUI 0-based index handle karega
              onRowsPerPageChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
            />
            
          </Card>
        </CustomersSelectionProvider>
      </Stack>
      <CandidateModal key={`modal-${selectedRow?.id}`} open={open} close={() => setOpen(false)} data={selectedRow} />
      <StatusModal key={`status-${selectedRow?.id}`} type={"id"} open={statusOpen} onClose={() => setStatusOpen(false)}  status={jobStatus} setData={setData} data={selectedRow} />
     {(<AssignVacancyModal key={`assign-${selectedRow?.id}`} open={assignVacancyOpen} onClose={() => setAssignVacancyOpen(false)}  status={jobs} setData={setData} data={selectedRow} candidateType={"candidate"} /> )}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            
              <MenuItem onClick={() => handleEdit(menuRecord, "editStatus")}>Update Status</MenuItem>
             {(<MenuItem onClick={() => handleEdit(menuRecord, "editVacancy")}>Assign Vacancy</MenuItem>) } 
            
          </Menu>  
    </Box>
  );
}
