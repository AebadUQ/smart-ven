'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
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
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
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

export function AuditModal({ open, close, data }: ProductModalProps): React.JSX.Element | null {
  const router = useRouter();

  const handleClose = React.useCallback(() => {
    router.push(paths.dashboard.products.list);
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
          <Typography variant="h6">Audit Log Details</Typography>
          <IconButton onClick={() => close(false)}>
            <XIcon />
          </IconButton>
        </Stack>
        <Stack spacing={3} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}></Stack>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <PropertyList
                divider={<Divider />}
                sx={{
                  '--PropertyItem-padding': '12px 24px',
                }}
              >
                <PropertyItem name="Username" value={data?.userName} />

                <PropertyItem name="User Role" value={data?.roleName} />

                <PropertyItem name="Action Perform" value={data?.userName} />

                <PropertyItem name="Date" value={dayjs(data?.createdAt).format('MMM D, YYYY')} />

                <PropertyItem name="Time" value={dayjs(data?.createdAt).format('h:mm A')} />
              </PropertyList>
            </Card>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
