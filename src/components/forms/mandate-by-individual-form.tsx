'use client';

import * as React from 'react';
import { Box, Card, CardContent, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';

export interface AccountOpeningFormProps {
  data: any;
}

export default function MandateByIndividualForm({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;

  console.log('mandate by individual -----------------', formDetails);

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
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Mandate By Individual
              </Typography>
            </Stack>

            <Stack sx={{ my: '40px' }}>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <InputLabel>Account Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.mbiAccountNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Branch</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.mbiBranch?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ mb: '40px' }}>
              <Grid container>
                <Grid item md={3} xs={12}>
                  <InputLabel>Account Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.mbiAccountName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography sx={{ mt: '20px' }}>
                    I request until you receive written instructions from me to the contrary, or in the event of my
                    death, or until you shall receive written notice thereof, and not withstanding that I maybe in the
                    meantime personally exercising any of the powers in question, you will treat.
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ mb: '40px' }}>
              <Grid container>
                <Grid item md={3} xs={12}>
                  <InputLabel>Mr./Mrs</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.mbiAuthoriserName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography sx={{ my: '20px' }}>
                    as fully authorised for me and my accounts to execute the following
                  </Typography>
                  <Typography sx={{ mb: '20px' }}>
                    1. To operate on any account of mine with you and to draw, sign, accept and endorse cheques, bills
                    and promissory notes.{' '}
                  </Typography>
                  <Typography sx={{ mb: '20px' }}>
                    2. To give, vary and revoke instructions to you regarding remittances, including telegraphic
                    transfers, and as to the manner in which any money payable by or to me (whether periodically or
                    otherwise) are to be paid or dealt with.{' '}
                  </Typography>
                  <Typography>
                    3. To deposit with you and withdraw, and to give, vary and revoke instructions to you as the custody
                    or disposal of property of all kinds, including (without prejudice to the general of the foregoing)
                    certificates relating to stocks, shares and other securities, documents of title of all kinds and
                    boxes (including sealed boxes).
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ mb: '40px' }}>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <InputLabel>
                    Taking delivery of documents, invoices and/or bills of lading covering goods consigned to
                  </InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.mbiDeliveryOfDocument}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography sx={{ my: '20px' }}>
                    for all which this request shall be full and sufficient authority to you, and I confirm that you are
                    to be under no obligation to ascertain or enquire into the purpose for which any of the said powers
                    exercised, and I hereby indemnify the Bank and hold it harmless against any losses, claims, costs,
                    liabilities which might rise out of this authorisation
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ mb: '40px' }}>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Mr./Ms</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.mbiauthorizationConfirmationName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>ID No.</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.mbiauthorizationConfirmationIDNo}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Date</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={dayjs(formDetails?.mbiauthorizationConfirmationDate).format('MMM D, YYYY h:mm A')}
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
