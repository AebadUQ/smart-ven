'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { BagSimple as BagSimpleIcon } from '@phosphor-icons/react/dist/ssr/BagSimple';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

export interface Product {
  id: string;
  name: string;
  image?: string;
  category: string;
  sales: number;
}

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {row.image ? (
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'var(--mui-palette-background-level2)',
              backgroundImage: `url(${row.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              display: 'flex',
              height: '60px',
              justifyContent: 'center',
              overflow: 'hidden',
              width: '60px',
            }}
          />
        ) : (
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'var(--mui-palette-background-level2)',
              borderRadius: 1,
              display: 'flex',
              height: '60px',
              justifyContent: 'center',
              width: '60px',
            }}
          >
            <ImageIcon fontSize="var(--icon-fontSize-lg)" />
          </Box>
        )}
        <Box sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="subtitle2">{row.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            in {row.category}
          </Typography>
        </Box>
      </Stack>
    ),
    name: 'Name',
  },
  {
    formatter: (row): React.ReactNode => (
      <div>
        <Typography variant="subtitle2">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
            row.sales
          )}
        </Typography>
      </div>
    ),
    name: 'Sales',
  },
  {
    formatter: (_, index): React.ReactNode => (
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-level2)',
          borderRadius: 1.5,
          px: 1,
          py: 0.5,
          display: 'inline-block',
        }}
      >
        <Typography variant="subtitle2">#{index + 1}</Typography>
      </Box>
    ),
    name: 'Rank',
    width: '60px',
    align: 'right',
  },
] satisfies ColumnDef<Product>[];

export interface ProductsProps {
  list?: Product[];
}

export function TicketsComplain({ list }: ProductsProps): React.JSX.Element {
  return (
    <Card >
      <CardHeader
        action={
          // endIcon={<ArrowRightIcon />}
          <Button color="secondary" size="small" sx={{ mt: 1 }}>
            View all
          </Button>
        }
        avatar={
          <Avatar>
            <BagSimpleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Tickets & Complaints"
        sx={{pt:2}}
      />
      <Divider />
      <Grid container spacing={2} sx={{ p: 2 }}>
        {[
          { label: 'Total Tickets', value: 125, bg: '#F0F7FF' },
          { label: 'Open', value: 75, bg: '#FFF6E0' },
          { label: 'Resolved', value: 50, bg: '#E5FFE5' },
        ].map((item, idx) => (
          <Grid
            key={idx}
            size={{
              md: 4,
              xs: 12,
            }}
          >
            <Box
              sx={{
                backgroundColor: item.bg,
                px: 2,
                py: 2,
                textAlign: 'center',
                borderRadius: '10px',
                whiteSpace: 'nowrap', // Prevent label from breaking
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.label}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Box sx={{
    height: 440, // 👈 adjust as needed (can also use % if parent has defined height)
    overflowY: 'auto',
    pr: 1, // optional: space for scrollbar
     "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
  }}>
        {[
          {
            name: 'Yasir Hanif',
            child: 'Fatima',
            subject: 'Late Arrival',
            message:
              'The van has been arriving late recently. Kindly look into this and ensure timely pickups going forward. Thank you!',
            date: '26 May, 2025 – 08:59 AM',
            avatar: '/assets/avatar-1.png',
          },
          {
            name: 'Saria Khan',
            child: 'Shayan',
            subject: 'Late Arrival',
            message:
              'The van has been arriving late recently. Kindly look into this and ensure timely pickups going forward. Thank you!',
            date: '26 May, 2025 – 08:59 AM',
            avatar: '/assets/avatar-2.png',
          },
          {
            name: 'Ahmed Babri',
            child: 'Fatima',
            subject: 'Late Arrival',
            message:
              'The van has been arriving late recently. Kindly look into this and ensure timely pickups going forward. Thank you!',
            date: '26 May, 2025 – 08:59 AM',
            avatar: '/assets/avatar-3.png',
          },
        ].map((item, idx) => (
          <Box key={idx} sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              {/* Avatar */}
              <Avatar src={item.avatar} sx={{ width: 48, height: 48 }} />

              {/* Content */}
              <Box flex={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography variant="caption" color="black">
                    {item.date}
                  </Typography>
                </Stack>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Child:{' '}
                    <Typography variant="caption" fontWeight={400} color='black'>
                      {item.child}
                    </Typography>
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Subject:{' '}
                    <Typography variant="caption" fontWeight={400} color='black'>
                      {item.subject}
                    </Typography>
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" mt={1}>
                  {item.message}
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Box>
      {/* <Box sx={{ overflowX: 'auto', '--mui-palette-TableCell-border': 'transparent' }}>
        <DataTable<Product> columns={columns} hideHead rows={list} />
      </Box> */}
    </Card>
  );
}
