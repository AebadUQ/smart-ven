'use client';

import * as React from 'react';
import { Box, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';

export interface AccountOpeningFormProps {
  data: any;
}

export default function StandingOrderForm({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log('standing order:', formDetails);

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        width: 'var(--Content-width)',
        paddingX: '24px',
        paddingY: '20px',
      }}
    >
      <Stack spacing={3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                {data?.form_name}
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Branch"
                    value={formDetails?.sofBranch?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Account to be Debited"
                    value={formDetails?.sofAccountToBeDebit}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4}></Grid>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Account Name"
                    value={formDetails?.sofAccountName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Amount in figures"
                    value={formDetails?.sofAmountFigures}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Amount in words"
                    value={formDetails?.sofAmountWords}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Currency"
                    value={formDetails?.sofCurrency?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Frequency of Transfer"
                    value={formDetails?.sofFrequencyOfTransfer?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Standing Order Date"
                    value={
                      formDetails?.sofStandingOrderStartDate
                        ? format(new Date(formDetails.sofStandingOrderStartDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="End Date"
                    value={
                      formDetails?.sofStandingOrderEndDate
                        ? format(new Date(formDetails.sofStandingOrderEndDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Mode of Standing Order Execution"
                    value={formDetails?.sofModeOfStandingOrderExecution?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Beneficiary Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Name"
                    value={formDetails?.sofBeneficiarylName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Account No/IBAN"
                    value={formDetails?.sofBeneficiaryAccNumOrIBAN}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Bank Name"
                    value={formDetails?.sofBeneficiaryBankName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Branch"
                    value={formDetails?.sofBeneficiaryBranch?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="SWIFT/SORT/BIC Code No."
                    value={formDetails?.sofBeneficiarySwiftCode}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Details of payment"
                    value={formDetails?.sofBeneficiaryPaymentDetail}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Address"
                    value={formDetails?.sofBeneficiaryAddress}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Correspondent Bank Charges"
                    value={formDetails?.sofBeneficiaryCorrespondentBankCharges?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Schedule of Charges
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Select Payment Type"
                    value={formDetails?.sofScheduleOfChargesPaymentType?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Pay Order"
                    value={formDetails?.sofScheduleOfChargesPayOrder?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="First Applicant"
                    value={formDetails?.sofScheduleOfChargesFirstApplicant}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Second Applicant (if joint account)"
                    value={formDetails?.sofScheduleOfChargesSecondApplicant}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
