'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Grid, textAlign } from '@mui/system';
import dayjs from 'dayjs';

export interface ProductEditFormProps {
  data: any;
}

export default function AtmDisputeForm({ data }: ProductEditFormProps): React.JSX.Element {
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
      <Stack spacing={3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  {data?.form_name}
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputLabel>Card Number</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdCardNumber || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6">Card Holder Name</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3,xs:12,sm:6 }}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.atdFirstName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3,xs:12,sm:6 }}>
                    <InputLabel>Second Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdSecondName || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs:12,md: 6,sm:6 }}>
                    <InputLabel>Surname /Tribe</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdSurname || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs:12,md: 6,sm:6 }}>
                    <InputLabel>Account NO</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdAccountNumber || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md:3,sm:6 }}>
                    <InputLabel>Type Of Card</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdCardType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md:3,sm:6}}>
                    <InputLabel>Transaction Date & Time</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.atdTransactionDatendTime).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md:3,sm:6 }}>
                    <InputLabel>ATM Card</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdAtmCard || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md:3,sm:6}}>
                    <InputLabel>ATM Location</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdAtmLocation || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md:3,sm:6 }}>
                    <InputLabel>Amount Requested</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdAmountRequested || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md:3,sm:6 }}>
                    <InputLabel>Amount Disbursed</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdAmountDisbursed || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs:12,md: 4,sm:6 }}>
                    <InputLabel>Cash Withdrawal Issues</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.atdWithdrawlIssue?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  {formdetails?.atdWithdrawlIssue?.value === "Others (Specify)" &&

                  <Grid size={{ xs:12,md: 4,sm:6 }}>
                  <InputLabel>Others Specify</InputLabel>
                  <OutlinedInput
                    sx={{
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderRadius: 'none',
                      width: '100%',
                    }}
                    value={formdetails?.atdWithdrawlIssueOtherSpecify || 'N/A'}
                    disabled
                  />
                </Grid>
                  }

                </Grid>
              </Stack>

              {/* Declaration */}
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Declaration
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.atdTermsAndCondition || false} disabled />}
                      label="I hereby affirm that the information furnished above along with enclosures are true and accurate Read More."
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
