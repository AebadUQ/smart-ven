'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/system';

export interface ProductEditFormProps {
  data: any;
}

export default function AccountClosingForm({ data }: ProductEditFormProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
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
      <Stack spacing={5} sx={{ display: 'flex', flexDirection: 'column', }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Grid container spacing={3}>
                <Typography variant="h6" sx={{ color: '#6E2585', width: '100%' }}>
                  Please Close the Below Mentioned Accounts
                </Typography>
                {formdetails?.acfMentionedAccount.map((items: any) => {
                  return (
                <Grid size={{ xs: 12, md: 12 }}>



                      <Grid container spacing={5}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Account Number</InputLabel>
                          <OutlinedInput
                            sx={{
                              width: '100%',
                            }}
                            value={items?.accountNum  || "N/A"}
                            disabled
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                          <InputLabel>Branch</InputLabel>
                          <OutlinedInput
                            sx={{
                              width: '100%',
                            }}
                            value={items?.branch?.value  || "N/A"}
                            disabled
                          />
                        </Grid>
                        <Grid size={{ sm: 12, md: 3 }} sx={{ textAlign: 'start' }}>
                          <FormControlLabel
                            control={<Checkbox checked={items?.serviceCancelledCheck || false} disabled />}
                            label="All services to be cancelled related to this account "
                          />
                        </Grid>
                        </Grid>



                  </Grid> );
                })}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <InputLabel>Account Name</InputLabel>
                  <OutlinedInput
                    sx={{
                      width: '100%',
                    }}
                    value={formdetails?.acfAccountName || "N/A"}
                    disabled
                  ></OutlinedInput>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <InputLabel>Tel. No.</InputLabel>
                  <OutlinedInput
                    sx={{
                      width: '100%',
                    }}
                    value={formdetails?.acfTelNo  || "N/A"}
                    disabled
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InputLabel>Reasons for Closing Account</InputLabel>
                  <OutlinedInput
                    sx={{
                      width: '100%',
                    }}
                    value={formdetails?.acfClosingReason?.value  || "N/A"}
                    disabled
                  />
                </Grid>
                {formdetails?.acfOtherClosingReason && (
                  <Grid size={{ xs: 12, md: 4 }}>
                    <InputLabel>Other (Please Specify)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.acfOtherClosingReason  || "N/A"}
                      disabled
                    />
                  </Grid>
                )}
                <Grid size={{ xs: 12, md: 4 }}>
                  <InputLabel>Return Proceed As</InputLabel>
                  <OutlinedInput
                    sx={{
                      width: '100%',
                    }}
                    value={formdetails?.acfReturnProceedAs?.value  || "N/A"}
                    disabled
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InputLabel>Transfer to A/C No</InputLabel>
                  <OutlinedInput
                    sx={{
                      width: '100%',
                    }}
                    value={formdetails?.acfTransferToAccountNum || "N/A"}
                    disabled
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
