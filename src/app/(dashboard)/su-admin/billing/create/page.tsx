"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "@mui/material/Link";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getAllSchools, createBilling } from "@/store/reducers/suadmin-slice";

// ─────────────────────────────────────────────
// Dropdown data (static, except schools which comes from API)
// ─────────────────────────────────────────────
const planTypes = [
  { value: "per_student", label: "Per Student" },
  { value: "flat_monthly", label: "Flat Monthly" },
  { value: "annual_contract", label: "Annual Contract" },
];

const billingCycles = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const paymentMethods = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  // { value: "cheque", label: "Cheque" },
];

const invoiceStatuses = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
  { value: "unpaid", label: "Unpaid" },
];

// ─────────────────────────────────────────────
// Validation schema
// ─────────────────────────────────────────────
const schema = zod.object({
  school: zod.string().min(1, "School is required"), // holds _id
  planType: zod.string().min(1, "Plan Type is required"),
  billingCycle: zod.string().min(1, "Billing Cycle is required"),
  startDate: zod.string().min(1, "Start Date is required"), // yyyy-mm-dd
  amount: zod
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Enter valid amount (e.g. 450.00)"),
  paymentMethod: zod.string().min(1, "Payment Method is required"),
  invoiceStatus: zod.string().min(1, "Invoice Status is required"),
  notes: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

// ─────────────────────────────────────────────
// Helpers to map UI → API payload format
// ─────────────────────────────────────────────
function toTitle(s: string) {
  // "per_student" -> "Per Student"
  return s
    .replace(/[_-]+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function formatStartDate(yyyyMmDd: string) {
  // "2025-11-01" -> "01-Nov-2025"
  const d = new Date(yyyyMmDd + "T00:00:00");
  if (Number.isNaN(d.getTime())) return yyyyMmDd;
  const day = String(d.getDate()).padStart(2, "0");
  const monthShort = d.toLocaleString("en-US", { month: "short" }); // Nov
  const year = d.getFullYear();
  return `${day}-${monthShort}-${year}`;
}

function ensureCurrency(amount: string) {
  // if user typed "1250" -> "1,250.00 USD"
  const num = Number(amount);
  if (Number.isNaN(num)) return amount;
  const intl = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
  return `${intl} USD`;
}

function mapPaymentMethod(v: string) {
  // to pretty labels like "Bank Transfer"
  switch (v) {
    case "bank_transfer":
      return "Bank Transfer";
    case "cheque":
      return "Cheque";
    case "cash":
      return "Cash";
    case "stripe":
      return "Stripe";
    default:
      return toTitle(v);
  }
}

function mapInvoiceStatus(v: string) {
  // ensure common statuses are Title Case (your sample used "Unpaid")
  const t = v.toLowerCase();
  if (t === "unpaid") return "Unpaid";
  if (t === "paid") return "Paid";
  if (t === "pending") return "Pending";
  if (t === "overdue") return "Overdue";
  return toTitle(v);
}

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────
const defaultValues: Values = {
  school: "", // will be _id
  planType: "per_student",
  billingCycle: "monthly",
  startDate: "",
  amount: "",
  paymentMethod: "stripe",
  invoiceStatus: "unpaid",
  notes: "",
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function BillingCreateForm(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // schools list + loading flags from suadmin slice
  const { schools: schoolList, listLoading, billingCreateLoading } = useSelector(
    (s: RootState) => s.suadmin as any
  );

  React.useEffect(() => {
    // pull enough to fill the dropdown comfortably
    dispatch(getAllSchools({ page: 1, limit: 100 }));
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    const payload = {
      schoolId: values.school, // _id from dropdown
      billingCycle: values.billingCycle.toLowerCase(), // "yearly"
      planType: toTitle(values.planType), // "Fixed Plan" style
      startDate: formatStartDate(values.startDate), // "01-Nov-2025"
      paymentMethod: mapPaymentMethod(values.paymentMethod), // "Bank Transfer"
      amount: ensureCurrency(values.amount), // "1,250.00 USD"
      invoiceStatus: mapInvoiceStatus(values.invoiceStatus), // "Unpaid"
      notes: values.notes?.trim() || undefined,
    };

    try {
      await dispatch(createBilling(payload)).unwrap();
      // optionally: toast.success('Billing record created');
      router.push("/su-admin/billing");
    } catch (err) {
      console.error(err);
      // optionally: toast.error('Failed to save billing');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "var(--Content-maxWidth)",
        m: "var(--Content-margin)",
        p: "var(--Content-padding)",
        width: "var(--Content-width)",
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
                  href={"/su-admin/billing"}
                  sx={{ alignItems: "center", display: "inline-flex", gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Back
                </Link>
              </div>

              {/* Title */}
              <Typography variant="h6">Add Billing</Typography>

              {/* Section */}
              <Typography variant="subtitle2">Billing Information</Typography>

              {/* Form Grid */}
              <Grid container spacing={3}>
                {/* LEFT COLUMN */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    {/* School (from API) */}
                    <Controller
                      control={control}
                      name="school"
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.school}>
                          <InputLabel required>School</InputLabel>
                          <Select
                            {...field}
                            label="School"
                            disabled={listLoading}
                          >
                            {listLoading ? (
                              <MenuItem disabled>Loading…</MenuItem>
                            ) : (schoolList ?? []).length ? (
                              (schoolList ?? []).map((s: any) => (
                                <MenuItem key={s?._id} value={s?._id}>
                                  {s?.schoolName ?? s?.name ?? "Untitled"}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>No schools found</MenuItem>
                            )}
                          </Select>
                          <FormHelperText>
                            {errors.school?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Billing Cycle */}
                    <Controller
                      control={control}
                      name="billingCycle"
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.billingCycle}
                        >
                          <InputLabel required>Billing Cycle</InputLabel>
                          <Select {...field} label="Billing Cycle">
                            {billingCycles.map((c) => (
                              <MenuItem key={c.value} value={c.value}>
                                {c.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {errors.billingCycle?.message}
                          </FormHelperText>
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
                            placeholder="1250.00"
                            inputMode="decimal"
                          />
                          <FormHelperText>
                            {errors.amount?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Invoice Status */}
                    <Controller
                      control={control}
                      name="invoiceStatus"
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.invoiceStatus}
                        >
                          <InputLabel required>Invoice Status</InputLabel>
                          <Select {...field} label="Invoice Status">
                            {invoiceStatuses.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {errors.invoiceStatus?.message}
                          </FormHelperText>
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
                          <FormHelperText>
                            {errors.planType?.message}
                          </FormHelperText>
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
                          <FormHelperText>
                            {errors.startDate?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />

                    {/* Payment Method */}
                    <Controller
                      control={control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.paymentMethod}
                        >
                          <InputLabel required>Payment Method</InputLabel>
                          <Select {...field} label="Payment Method">
                            {paymentMethods.map((pm) => (
                              <MenuItem key={pm.value} value={pm.value}>
                                {pm.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {errors.paymentMethod?.message}
                          </FormHelperText>
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
                            placeholder="Invoice generated for Q4 2025, awaiting payment."
                          />
                        </FormControl>
                      )}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
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
              loading={billingCreateLoading || isSubmitting}
            >
              Save Billing
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
}
