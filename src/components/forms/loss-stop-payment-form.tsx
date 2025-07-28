'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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

export default function LossStopPaymentForm({ data }: ProductEditFormProps): React.JSX.Element {
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
                    <InputLabel>Customer Account Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.lsprCustomerName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <InputLabel>Branch</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.lsprBranch?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputLabel>Contact Number</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.lsprCustomerContactNum || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <InputLabel>Account Number</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.lsprCustomerAccountNumber || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>
              {/* For Bank use only */}
              <Stack spacing={5}>
                <Typography variant="h6">
                  This is to inform you that I/We have lost the following instrument(s) and not in my/our possession
                  anymore
                </Typography>

                {formdetails?.lsprInstrumentData?.map((item: any, index: any) => {
                  return (
                    <>
                      <Grid key={index} container spacing={5}>
                        <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                          <InputLabel>Currency</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={item?.lsprInstrumentCurrency
                              ?.value || 'N/A'}
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
                            value={item?.lsprInstrumentCurrencyAmount || 'N/A'}
                            disabled
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                          <InputLabel>Pay Order/Demand Draft/Cheques No.</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              width: '100%',
                            }}
                            value={item?.lsprInstrumentChequeNumber || 'N/A'}
                            disabled
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                          <InputLabel>Date of Instrument</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              width: '100%',
                            }}
                            value={dayjs(item?.lsprInstrumentDateOfInstrument).format('MMM D, YYYY h:mm A') || 'N/A'}
                            disabled
                          />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                          <InputLabel>Beneficiary</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              width: '100%',
                            }}
                            value={item?.lsprInstrumentBeneficiary || 'N/A'}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Declaration
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.lsprDeclarationTermsandCond || false} disabled />}
                      label="I/We agree to the terms and conditions of this Declarations and Authorizations"
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
