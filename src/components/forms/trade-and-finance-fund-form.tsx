'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Grid, textAlign } from '@mui/system';
import dayjs from 'dayjs';

export interface ProductEditFormProps {
  data: any;
}

export default function TradeAndFinanceFundForm({ data }: ProductEditFormProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  console.log('letter', formdetails);

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
      <Stack spacing={2.5} sx={{ display: 'flex', flexDirection: 'column' }}>
         <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Fund Transfers Application
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputLabel>Type of Remittance</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfFundTranferTypeOfRemittance?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Payment & Benificiary Details
                </Typography>
                <Grid container spacing={5}>
                  {/* <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Account Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tfPaymentBenificiaryCurrency?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid> */}
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Currency</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tfPaymentBenificiaryCurrency?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Amount in Figure</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiaryAmountFigures || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Amount in Words</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiaryAmountWords || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6, sm: 6 }}>
                    <InputLabel>Account No /IBAN</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiaryAccNoOrIBAN || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Benificiary Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiaryName || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Benificiary Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiaryBank || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Swift Code/Sort Code/ABA #</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiarySwiftCode || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Address of Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiarAddressBank || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Correspondent Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiarCorrespondentBank || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Swift Code/Sort Code/ABA #</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfPaymentBenificiaryCorrespondentSwiftCode || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Choose</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tfPaymentBenificiaryOptions?.tfCreditCardPaymentCheck || false} disabled />}
                      label="Credit Card Payments"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tfPaymentBenificiaryOptions?.tfCharitableContributionsCheck || false} disabled />}
                      label="Charitable Contributions"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tfPaymentBenificiaryOptions?.tfRemittanceCheck || false} disabled />}
                      label="Remittance"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tfPaymentBenificiaryOptions?.tfCrossBorderCheck || false} disabled />}
                      label="Cross Border Payments"
                    />

                  </Grid>

                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.tfPaymentBenificiaryOptions?.tfMiscellaneousPaymenWithInvoieCheck || false} disabled />
                      }
                      label="Miscellaneous Payment with Invoice Details"
                    />

                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.tfPaymentBenificiaryOptions?.tfMiscellaneousPaymenWithBeneCustRefCheck || false} disabled />
                      }
                      label="Miscellaneous Payment with Beneficiary Customer Reference"
                    />

                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }} display="flex" alignItems="center">
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.tfPaymentBenificiaryOptions?.tfMiscellaneousPaymenWithOrderCustRefCheck || false} disabled />
                      }
                      label="Miscellaneous Payment with Ordering Customer Reference"
                    />

                  </Grid>
                </Grid>
              </Stack>
              {formdetails?.tfPaymentBenificiaryPaymentDetail && (
                <Stack spacing={5}>
                  <Grid container spacing={5}>
                    <Grid size={{ xs: 12 }}>
                      <InputLabel>Details of Payment</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={formdetails?.tfPaymentBenificiaryPaymentDetail || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Grid>
                  </Grid>
                </Stack>
              )}

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Remittance Charges Borne by
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Remittance Charges Borne by</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfRemittanceChargesBorneBy?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Correspondent Bank Charges</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfRemittanceChargesCorrespondentBankCharges?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Mode of Payment
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Debit My Account Number</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfModeOfPaymentDebitMyAccNum || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Applicant Contact No 1</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfModeOfPaymentApplicantContactNo1 || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Applicant Contact No 2</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tfModeOfPaymentApplicantContactNo2 || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>

              {/* Declaration */}
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Terms & Conditions
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tfTermsAndCondition || false} disabled />}
                      label="I/We confirm that the information given above is true and complete, and that I/We have received the Bank’s General Terms and Conditions..."
                    />

                    {/* /> */}
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
