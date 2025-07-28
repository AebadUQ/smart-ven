'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export interface AccountOpeningFormProps {
  data: any;
}

export default function SignatureChangeRequestForm({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;

  console.log('SignatureChangeRequestForm ===================', formDetails);

  

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
      <Stack spacing={5} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ color: '#6E2585', mb: '20px' }}>
                Signature Change Request
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Branch</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.scrBranch?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography sx={{ color: '#212636', fontSize: '16px', my: '20px' }}>
                I/We wish to change my/our signature in your record for the following account No
              </Typography>

              {formDetails?.scrAccountNoandAccountName.map((accountDetail: any) => {
                return (
                  <Grid container sx={{ gap: '20px' }}>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Account No</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={accountDetail?.scrAccountNo}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Account Name</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={accountDetail?.scrAccountName}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Nature of Account</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.scrNatureofAccount?.value}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Stack>

            <Stack spacing={5} sx={{ my: '60px', gap: '0px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585', mb: '20px' }}>
                Consent & Declaration
              </Typography>
              <Grid item md={3} xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(formDetails?.scrNatureofAccount)} disabled />}
                  label=" I/We agree to the terms and conditions of this Declaration"
                />
              </Grid>
            </Stack>

            <Stack sx={{ mb: '40px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585', mb: '20px' }}>
                Customer Details
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Customer Name (01)</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.scrCustomerOne}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Customer Name (02)</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.scrCustomerTwo}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Mobile No</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.scrCustomerMobileNo}
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
