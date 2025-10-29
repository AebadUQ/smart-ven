'use client';

import * as React from 'react';
import RouterLink from 'next/link';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { DownloadSimple as DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr/DownloadSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Repeat as RepeatIcon } from '@phosphor-icons/react/dist/ssr/Repeat';

// if you have paths.dashboard.billing etc. use those here
import { paths } from '@/paths';

// ─────────────────────────────────────────
// mock data (replace with API later)
// ─────────────────────────────────────────
const subscription = {
  planLabel: 'Premium (Per Student)',
  billingCycle: 'Monthly',
  nextInvoiceDate: '01-Sep-2025',
  paymentMethod: 'Bank Transfer',
  status: 'Active',
};

const plans = [
  { value: 'per_student', label: 'Per Student', selected: true },
  { value: 'per_van', label: 'Per Van', selected: false },
  { value: 'flat_plan', label: 'Flat Plan', selected: false },
];

const recentTransactions = [
  { date: '05-Aug-25', amount: '$450', status: 'Payment' },
  { date: '15-Jul-25', amount: '$200', status: 'refund' },
  { date: '15-Jun-25', amount: '$450', status: 'Paid' },
];

const invoices = [
  { id: 'INV-2025-08', date: '01-Aug-25', amount: '$450', status: 'Paid' },
  { id: 'INV-2025-07', date: '01-Jul-25', amount: '$450', status: 'Paid' },
  { id: 'INV-2025-06', date: '01-Jun-25', amount: '$450', status: 'Paid' },
];

// ─────────────────────────────────────────
// helpers
// ─────────────────────────────────────────

function StatusChip({ label }: { label: string }) {
  // we map string to color style
  const lower = label.toLowerCase();
  let bg = 'background.paper';
  let border = 'divider';
  let text = 'text.primary';

  if (lower === 'active' || lower === 'paid' || lower === 'payment') {
    bg = 'background.paper';
    text = 'text.primary';
  }
  if (lower === 'refund') {
    bg = 'background.paper';
    text = 'text.primary';
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '6px',
        border: '1px solid',
        borderColor: border,
        backgroundColor: bg,
        px: 1,
        py: 0.5,
        boxShadow: '0px 8px 16px rgba(0,0,0,0.03)',
        fontSize: 13,
        lineHeight: 1.4,
        fontWeight: 500,
        color: text,
        whiteSpace: 'nowrap',
      }}
    >
      {/* Only show the green check icon for success-ish states */}
      {(lower === 'active' || lower === 'paid' || lower === 'payment') && (
        <CheckCircleIcon
          weight="fill"
          style={{
            fontSize: 16,
            color: 'var(--mui-palette-success-main, #22c55e)',
            marginRight: 6,
          }}
        />
      )}

      {lower === 'refund' && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'warning.main',
            mr: 1,
          }}
        />
      )}

      {label}
    </Box>
  );
}

// ─────────────────────────────────────────
// CurrentSubscriptionCard
// Matches your screenshot exactly
// ─────────────────────────────────────────

function CurrentSubscriptionCard({
  planLabel,
  billingCycle,
  nextInvoiceDate,
  paymentMethod,
  status,
  onInvoicesClick,
  onChangePlanClick,
}: {
  planLabel: string;
  billingCycle: string;
  nextInvoiceDate: string;
  paymentMethod: string;
  status: string;
  onInvoicesClick?: () => void;
  onChangePlanClick?: () => void;
}) {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.03)',
        p: 3,
      }}
    >
      {/* header row */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', mb: 2 }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 12px 24px rgba(0,0,0,0.05)',
            color: 'text.primary',
            fontSize: '0.8rem',
          }}
        >
          <CreditCardIcon fontSize="var(--Icon-fontSize)" />
        </Avatar>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          Current Subscription
        </Typography>
      </Stack>

      {/* inner grey panel */}
      <Box
        sx={{
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'divider',
          p: 3,
          // light gray bg like screenshot
          backgroundColor: (theme) =>
            theme.vars
              ? theme.vars.palette.action.hover
              : 'rgba(145,158,171,0.04)',
        }}
      >
        {/* Plan */}
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            Plan:
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              color: 'text.primary',
            }}
          >
            {planLabel}
          </Typography>
        </Stack>

        {/* Billing */}
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            Billing:{' '}
            <Box
              component="span"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {billingCycle}
            </Box>
          </Typography>
        </Stack>

        {/* Next Invoice */}
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            Next Invoice:{' '}
            <Box
              component="span"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {nextInvoiceDate}
            </Box>
          </Typography>
        </Stack>

        {/* Payment */}
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            Payment:{' '}
            <Box
              component="span"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {paymentMethod}
            </Box>
          </Typography>
        </Stack>

        {/* Status */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 3,
            flexWrap: 'wrap',
            rowGap: 1,
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            Status:
          </Typography>

          <StatusChip label={status} />
        </Stack>

        {/* Bottom Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            mt: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Invoices button */}
          <Button
            fullWidth
            variant="contained"
            onClick={onInvoicesClick}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              borderRadius: '8px',
              boxShadow: 'none',
              color: 'text.primary',
              bgcolor: 'rgba(102, 102, 255, 0.08)', // light purple style
              '&:hover': {
                bgcolor: 'rgba(102, 102, 255, 0.12)',
                boxShadow: 'none',
              },
            }}
          >
            Invoices
          </Button>

          {/* Change Plan button */}
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={onChangePlanClick}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 14,
              borderRadius: '8px',
              boxShadow: 'none',
              bgcolor: '#FFBF0F',
              color: '#000',
              '&:hover': {
                bgcolor: '#E5AD0E',
                boxShadow: 'none',
                color: '#000',
              },
            }}
          >
            Change Plan
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────
// AvailablePlansCard
// (left middle in screenshot)
// ─────────────────────────────────────────

export function AvailablePlansCard({
  plans,
  value,
  onChange,
}: any) {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.03)',
        p: 3,
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 12px 24px rgba(0,0,0,0.05)',
            color: 'text.primary',
            fontSize: '0.8rem',
          }}
        >
          <CreditCardIcon fontSize="var(--Icon-fontSize)" />
        </Avatar>

        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Available Plans
        </Typography>
      </Stack>

      {/* Inner gray panel */}
      <Box
        sx={{
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          backgroundColor: (theme) =>
            theme.vars
              ? theme.vars.palette.action.hover
              : 'rgba(145,158,171,0.04)',
        }}
      >
        <RadioGroup
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {plans.map((plan) => (
            <FormControlLabel
              key={plan.value}
              value={plan.value}
              control={
                <Radio
                  sx={{
                    // make radio look closer to your screenshot
                    width: 24,
                    height: 24,
                    '& .MuiSvgIcon-root': {
                      fontSize: 24,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: plan.value === value ? 600 : 400,
                    color: 'text.primary',
                  }}
                >
                  {plan.label}
                </Typography>
              }
              sx={{
                margin: 0,
                alignItems: 'center',
                '.MuiFormControlLabel-label': {
                  ml: 1,
                },
              }}
            />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  );
}
// ─────────────────────────────────────────
// AutoRenewCard
// (small card showing "Auto-Renew")
// ─────────────────────────────────────────

function AutoRenewCard() {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.03)',
        p: 3,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 12px 24px rgba(0,0,0,0.05)',
            color: 'text.primary',
            fontSize: '0.8rem',
          }}
        >
          <RepeatIcon fontSize="var(--Icon-fontSize)" />
        </Avatar>

        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Auto-Renew
        </Typography>
      </Stack>

      <Box
        sx={{
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'divider',
          p: 2,
          backgroundColor: (theme) =>
            theme.vars
              ? theme.vars.palette.action.hover
              : 'rgba(145,158,171,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Checkbox size="small" checked readOnly />
        <Typography variant="body2" fontWeight={500}>
          Auto-Renew
        </Typography>
      </Box>
      
    </Box>
  );
}

// ─────────────────────────────────────────
// RecentTransactionsCard
// ─────────────────────────────────────────

function RecentTransactionsCard({ rows }: { rows: { date: string; amount: string; status: string }[] }) {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.03)',
        p: 3,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 12px 24px rgba(0,0,0,0.05)',
            color: 'text.primary',
            fontSize: '0.8rem',
          }}
        >
          <CurrencyDollarIcon fontSize="var(--Icon-fontSize)" />
        </Avatar>

        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Recent Transactions
        </Typography>
      </Stack>

      <TableContainer component={Box} sx={{ boxShadow: 'none' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ borderBottom: 0 }}>
                  <Typography variant="body2">{row.date}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: 0 }}>
                    <Typography variant="body2">{row.amount}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: 0 }}>
                    <StatusChip label={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// ─────────────────────────────────────────
// InvoicesTableSection
// ─────────────────────────────────────────

function InvoicesTableSection({ rows }: { rows: { id: string; date: string; amount: string; status: string }[] }) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight={600}>
        Invoices
      </Typography>

      <Box
        sx={{
          borderRadius: '12px',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.03)',
        }}
      >
        <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none', borderRadius: '12px' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600,py:2 }}>Invoice ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell sx={{ borderBottom: 0,py:2 }}>
                    <Typography variant="body2">{inv.id}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 0 }}>
                    <Typography variant="body2">{inv.date}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 0 }}>
                    <Typography variant="body2">{inv.amount}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 0 }}>
                    <StatusChip label={inv.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}

// ─────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────

export default function BillingPage(): React.JSX.Element {
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
        {/* Header row with title + actions */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
          spacing={2}
        >
          <Typography variant="h6">Billing</Typography>

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadSimpleIcon fontSize="var(--icon-fontSize-md)" />}
            >
              Export
            </Button>

            <Button
              size="small"
              variant="contained"
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              component={RouterLink}
              href={paths.dashboard.billing?.create ?? '/billing/new'}
            >
              Add Billing
            </Button>
          </Stack>
        </Stack>

        {/* MAIN TOP GRID */}
        <Grid container spacing={3}>
          {/* col 1: current subscription */}
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <CurrentSubscriptionCard
              planLabel={subscription.planLabel}
              billingCycle={subscription.billingCycle}
              nextInvoiceDate={subscription.nextInvoiceDate}
              paymentMethod={subscription.paymentMethod}
              status={subscription.status}
              onInvoicesClick={() => {
                console.log('Invoices clicked');
              }}
              onChangePlanClick={() => {
                console.log('Change Plan clicked');
              }}
            />
          </Grid>

          {/* col 2: available plans + auto-renew (stacked) */}
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Stack spacing={3}>
              <AvailablePlansCard plans={plans} />
              <AutoRenewCard />
            </Stack>
          </Grid>

          {/* col 3: auto-renew top + recent transactions bottom in screenshot,
             but we already placed AutoRenewCard in col2 stack, so here just recent transactions.
             If you want duplicate auto-renew card above transactions like screenshot right column,
             wrap Stack with <AutoRenewCard /> first.
          */}
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Stack spacing={3}>
              {/* if you want the extra top AutoRenew card on the right column uncomment below */}
              <AutoRenewCard />

              <RecentTransactionsCard rows={recentTransactions} />
            </Stack>
          </Grid>
        </Grid>

        {/* INVOICES TABLE */}
        <InvoicesTableSection rows={invoices} />
      </Stack>
    </Box>
  );
}
