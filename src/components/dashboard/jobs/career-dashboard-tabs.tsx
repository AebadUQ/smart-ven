// components/SummaryCard.tsx
import * as React from 'react';
import RouterLink from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

export interface SummaryCardProps {
  amount: number;
  title: string;
  subtitle?: string;
  icon: Icon;
  link: string;          // e.g. "/jobs"
}

export function Summary({
  amount,
  title,
  subtitle = 'Lorem ipsum dolor sit amet',
  icon: IconComponent,
  link = "",
}: SummaryCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: "0 0 15px 1px #00000015"
                
      }}
    >
      <CardContent sx={{ flexGrow: 1, py: "30px" }}>

        <Stack spacing={2}>

          <Stack direction="row" spacing={1} alignItems="center" 
            sx={{boxShadow: "0 0 15px 1px #00000015", width: "fit-content", py: "5px", px: "10px", borderRadius: "10px"}}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                bgcolor: 'background.paper',
                color: 'text.primary',
              }}
            >
              <IconComponent size={20} />
            </Avatar>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>

          </Stack>

          <Typography variant="h3">
            {new Intl.NumberFormat('en-US').format(amount)}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>

        </Stack>

      </CardContent>

      <Divider />

      <CardActions sx={{ py: 2, px: 3 }}>
        
        <Button  component={RouterLink} href={link} sx={{color: "#000000", display: "flex", gap: "10px", p:0}}>
          View
          <ArrowRightIcon size={16} />
        </Button>
      </CardActions>
    </Card>
  );
}
