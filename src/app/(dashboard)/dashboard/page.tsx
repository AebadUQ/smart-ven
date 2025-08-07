import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { Conversions } from '@/components/dashboard/e-commerce/conversions';
import { CostBreakdown } from '@/components/dashboard/e-commerce/cost-breakdown';
import { SalesByCountry } from '@/components/dashboard/e-commerce/sales-by-country';
import { TopProducts } from '@/components/dashboard/e-commerce/top-products';
import { Stats, TicketsComplain } from '@/components/overview';

export const metadata = { title: `E-commerce | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        // m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
        // paddingTop:'0px'
      }}
    >
      <Stack>
        <Grid container spacing={2}>
          <Grid
            size={{
              lg: 8,
              xs: 12,
            }}
          >
            <Stats
              data={[
                { name: 'Mon', v1: 35, v2: 3350 },
                { name: 'Tue', v1: 41, v2: 3440 },
                { name: 'Wed', v1: 32, v2: 3054 },
                { name: 'Thu', v1: 34, v2: 3780 },
                { name: 'Fri', v1: 53, v2: 3849 },
                { name: 'Sat', v1: 29, v2: 2900 },
                { name: 'Sun', v1: 40, v2: 3600 },
              ]}
            />
          </Grid>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
             <TicketsComplain
              
            />
          </Grid>
      
          <Grid
            size={{
              lg: 8,
              xs: 12,
            }}
          >
            <SalesByCountry
              sales={[
                { countryCode: 'us', countryName: 'United States', value: 60 },
                { countryCode: 'es', countryName: 'Spain', value: 20 },
                { countryCode: 'uk', countryName: 'United Kingdom', value: 10 },
                { countryCode: 'de', countryName: 'Germany', value: 5 },
                { countryCode: 'ca', countryName: 'Canada', value: 5 },
              ]}
            />
          </Grid>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
            <TopProducts
              products={[
                {
                  id: 'PRD-001',
                  name: 'Erbology Aloe Vera',
                  image: '/assets/product-1.png',
                  category: 'Healthcare',
                  sales: 13153,
                },
                {
                  id: 'PRD-002',
                  name: 'Lancome Rouge',
                  image: '/assets/product-2.png',
                  category: 'Makeup',
                  sales: 10300,
                },
                {
                  id: 'PRD-003',
                  name: 'Ritual of Sakura',
                  image: '/assets/product-3.png',
                  category: 'Skincare',
                  sales: 5300,
                },
                {
                  id: 'PRD-004',
                  name: 'Necessaire Body Lotion',
                  image: '/assets/product-4.png',
                  category: 'Skincare',
                  sales: 1203,
                },
                {
                  id: 'PRD-005',
                  name: 'Soja & Co. Eucalyptus',
                  image: '/assets/product-5.png',
                  category: 'Skincare',
                  sales: 254,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
