'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from '@mui/material/Link';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { paths } from '@/paths';

// ─────────────────────────────────────────────
// Static dropdown data (you can replace with API later)
// ─────────────────────────────────────────────
const schools = [
  { value: 'beacon_house', label: 'Beacon House' },
  { value: 'city_school', label: 'The City School' },
  { value: 'roots', label: 'Roots International' },
];

const planTypes = [
  { value: 'per_student', label: 'Per Student' },
  { value: 'flat_monthly', label: 'Flat Monthly' },
  { value: 'annual_contract', label: 'Annual Contract' },
];

const billingCycles = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

const paymentMethods = [
  { value: 'stripe', label: 'Stripe' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash', label: 'Cash' },
  { value: 'cheque', label: 'Cheque' },
];

const invoiceStatuses = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
];

// ─────────────────────────────────────────────
// Validation schema
// ─────────────────────────────────────────────
const schema = zod.object({
  school: zod.string().min(1, 'School is required'),
  planType: zod.string().min(1, 'Plan Type is required'),
  billingCycle: zod.string().min(1, 'Billing Cycle is required'),
  startDate: zod.string().min(1, 'Start Date is required'),
  amount: zod
    .string()
    .min(1, 'Amount is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter valid amount (e.g. 450.00)'),
  paymentMethod: zod.string().min(1, 'Payment Method is required'),
  invoiceStatus: zod.string().min(1, 'Invoice Status is required'),
  notes: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

// ─────────────────────────────────────────────
// Default values
// ─────────────────────────────────────────────
const defaultValues: Values = {
  school: 'beacon_house',
  planType: 'per_student',
  billingCycle: 'monthly',
  startDate: '', // yyyy-mm-dd
  amount: '',
  paymentMethod: 'stripe',
  invoiceStatus: 'paid',
  notes: '',
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function BillingCreateForm(): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  // submit handler (wire this to your thunk later)
  const onSubmit = async (values: Values) => {
    try {
      console.log('SUBMIT billing payload ==>', values);

      // TODO: dispatch(createBilling(values)) etc.
      // const res = await dispatch(createBilling(values));

      // success toast, redirect to listing
      // toast.success('Billing record created');
      router.push('/billing'); // adjust route
    } catch (err) {
      console.error(err);
      // toast.error('Failed to save billing');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Stack spacing={4}>
              {/* Back link */}
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.billing ?? '/billing'} // fallback
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Back
                </Link>
              </div>

              {/* Title */}
              <Typography variant="h6">Add Billing</Typography>

              {/* Section heading */}
              <Typography variant="subtitle2">Billing Information</Typography>

              {/* Form Grid: two-column like design */}
              <Grid container spacing={3}>
                {/* LEFT COLUMN  */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    {/* School */}
                    <Controller
                      control={control}
                      name="school"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.school}>
                          <InputLabel required>School</InputLabel>
                          <Select {...field} label="School">
                            {schools.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.school?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Billing Cycle */}
                    <Controller
                      control={control}
                      name="billingCycle"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.billingCycle}>
                          <InputLabel required>Billing Cycle</InputLabel>
                          <Select {...field} label="Billing Cycle">
                            {billingCycles.map((c) => (
                              <MenuItem key={c.value} value={c.value}>
                                {c.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.billingCycle?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Amount */}
                    <Controller
                      control={control}
                      name="amount"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.amount}>
                          <InputLabel required>Amount</InputLabel>
                          <OutlinedInput
                            {...field}
                            label="Amount"
                            placeholder="450.00 USD"
                          />
                          <FormHelperText>{errors.amount?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Invoice Status */}
                    <Controller
                      control={control}
                      name="invoiceStatus"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.invoiceStatus}>
                          <InputLabel required>Invoice Status</InputLabel>
                          <Select {...field} label="Invoice Status">
                            {invoiceStatuses.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.invoiceStatus?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />
                  </Stack>
                </Grid>

                {/* RIGHT COLUMN */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    {/* Plan Type */}
                    <Controller
                      control={control}
                      name="planType"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.planType}>
                          <InputLabel required>Plan Type</InputLabel>
                          <Select {...field} label="Plan Type">
                            {planTypes.map((p) => (
                              <MenuItem key={p.value} value={p.value}>
                                {p.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.planType?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Start Date */}
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.startDate}>
                          <InputLabel shrink required>
                            Start Date
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            type="date"
                            label="Start Date"
                            notched
                          />
                          <FormHelperText>{errors.startDate?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Payment Method */}
                    <Controller
                      control={control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.paymentMethod}>
                          <InputLabel required>Payment Method</InputLabel>
                          <Select {...field} label="Payment Method">
                            {paymentMethods.map((pm) => (
                              <MenuItem key={pm.value} value={pm.value}>
                                {pm.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Notes */}
                    <Controller
                      control={control}
                      name="notes"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Notes</InputLabel>
                          <OutlinedInput
                            {...field}
                            label="Notes"
                            placeholder="Lorem Ipsum Dolar Sit"
                          />
                          {/* no error, notes optional */}
                        </FormControl>
                      )}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="text"
              color="inherit"
              sx={{ minWidth: 100 }}
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save Billing
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
