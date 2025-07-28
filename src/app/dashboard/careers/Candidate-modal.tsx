'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import PreviewIcon from '@mui/icons-material/Preview';
import { Icon, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/system';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import Tooltip from '@mui/material/Tooltip';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

interface Image {
  id: string;
  url: string;
  fileName: string;
  primary?: boolean;
}

const imageColumns = [
  {
    formatter: (row): React.JSX.Element => {
      return (
        <Box
          sx={{
            backgroundImage: `url(${row.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            bgcolor: 'var(--mui-palette-background-level2)',
            borderRadius: 1,
            flex: '0 0 auto',
            height: '40px',
            width: '40px',
          }}
        />
      );
    },
    
    name: 'Image',
    width: '100px',
  },
  { field: 'fileName', name: 'File name', width: '300px' },
  {
    formatter: (row): React.JSX.Element => {
      return row.primary ? <Chip color="secondary" label="Primary" size="small" variant="soft" /> : <span />;
    },
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Image>[];

const images = [
  { id: 'IMG-001', url: '/assets/product-1.png', fileName: 'product-1.png', primary: true },
] satisfies Image[];

export interface ProductModalProps {
  open: boolean;

  close: any;
  data: any;
}

export function CandidateModal({ open, close, data }: ProductModalProps): React.JSX.Element | null {
  const router = useRouter();
  const handleClose = React.useCallback(() => {
  }, [router]);
  

  return (
    <Dialog
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
          <Typography variant="h6">Candidate Details</Typography>
          <IconButton onClick={() => close(false)}>
            <XIcon />
          </IconButton>
        </Stack>
        <Stack spacing={3} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                alignItems: 'center',

                display: 'grid',
                // gridGap: 'var(--PropertyItem-gap, 2px)',
                gridTemplateColumns: 'var(--PropertyItem-columns)',
                // p: 'var(--PropertyItem-padding, 8px)',
              }}
            ></Stack>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <PropertyList
                divider={<Divider />}
                sx={{
                  '--PropertyItem-padding': '12px 24px',
                }}
              >
                <PropertyItem name="Nationality" value={data?.nationality} />


                <Box
                  sx={{
                    alignItems: 'center',

                    display: 'grid',
                    gridGap: 'var(--PropertyItem-gap, 2px)',
                    gridTemplateColumns: '216px minmax(0, 1fr)',
                    p: 'var(--PropertyItem-padding, 8px)',
                  }}
                >
                  <Typography color="text.primary" variant="body2">
                    CV
                  </Typography>

                  <Stack direction="row" sx={{ gap: 3 }}>
                    <Tooltip title={data?.cv}>
                      <a
                      href={data?.user?.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <PreviewIcon />
                    </a>
                    </Tooltip>

                    {/* <Icon>
                      <DownloadForOfflineIcon />
                    </Icon> */}
                  </Stack>
                </Box>

                <Box
                  sx={{
                    alignItems: 'center',

                    display: 'grid',
                    gridGap: 'var(--PropertyItem-gap, 2px)',
                    gridTemplateColumns: '216px minmax(0, 1fr)',
                    p: 'var(--PropertyItem-padding, 8px)',
                  }}
                >
                  <Typography color="text.primary" variant="body2">
                  ID / Resident Card or Passport
                  </Typography>

                  <Stack direction="row" gap={3}>
                    <Tooltip title={ data?.coverLetter}>
                    <a
                      href={data?.user?.idOrPassportImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <PreviewIcon />
                      </a>
                      </Tooltip>
                    {/* <Icon>
                      <DownloadForOfflineIcon />
                    </Icon> */}
                  </Stack>
                </Box>
                
                {data?.user?.educations?.map((items: any, index: any) => (
                  <>
                  <PropertyItem key={index} name="Education" value={items?.educational_level} />

                  <PropertyItem key={index} name="Major" value={items?.major || "N/A"} />
                  </>
                ))}


                
                <PropertyItem name="Current Position" value={data?.currentPosition || 'N/A'} />

                <PropertyItem name="Current Employer" value={data?.currentEmployer || 'N/A'} />

                <PropertyItem name="Current Salary" value={data?.currentSalary? data?.salaryCurrency + " " + data?.currentSalary : 'N/A'} />

                <PropertyItem name="Expected Salary" value={data?.expectedSalary ? "OMR " + data?.expectedSalary : 'N/A' } />
                
                


                <PropertyItem name="Date" value={dayjs(data?.createdAt).format('MMM D, YYYY h:mm')} />
                {data?.Questions?.map((item: any, index: any) => (
                  <>
                    <PropertyItem key={index} name="Question" value={item?.question} />
                    <PropertyItem key={index} name="Answer" value={item?.answer} />
                  </>
                ))}
              </PropertyList>
            </Card>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
