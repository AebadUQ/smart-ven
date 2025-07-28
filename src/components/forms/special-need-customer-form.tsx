'use client';

import * as React from 'react';
import { Box, Card, CardContent, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';

export interface AccountOpeningFormProps {
  data: any;
}

export default function SpecialNeedCustomerForm({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log(formDetails,"Here is our details")

  const branchOptions = [
    { value: 'Al-Ghubrah', label: 'Al Ghubrah' },
    { value: 'Muscat', label: 'Muscat' },
    { value: 'Seeb', label: 'Seeb' },
  ];

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
                Customer Declaration
              </Typography>
            </Stack>

            <Stack sx={{ my: '40px' }}>
              <Typography sx={{ fontSize: '16px', color: '#212636', mb: '20px' }}>
                to provide me with an ATM card for my account no
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <InputLabel>Account Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.sncAccountNumber}
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
                    value={formDetails?.sncBranch?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack sx={{ mb: '40px' }}>
              <Typography sx={{ mb: '20px' }}>
                with the Bank, and as I am aware of the consequences of issuing such a card, I hereby acknowledge and
                accept assume full responsibility for all my transactions carried out on my account through any ATM/ POS
                Machine, inside or outside the Sultanate and I shall be liable for the safe custody of the ATM card and
                its PIN number, which were issued to me by Bank Nizwa upon my own request.{' '}
              </Typography>
              <Typography sx={{ mb: '20px' }}>
                I admit that the employee of the Bank, in the presence of two witnesses mentioned below, has read and
                explained to me all the terms and conditions related to the use of the card through ATM/POS Machine and
                clarified to me the risk and consequences ensuing from such use.{' '}
              </Typography>
              <Typography sx={{ mb: '20px' }}>
                I also admit that I have personally received from the Bank my ATM card, as well as a copy of the Bank’s
                terms and conditions, which I understood and accepted its content.{' '}
              </Typography>
              <Typography sx={{ mb: '20px' }}>
                I also hereby declare that neither the Bank nor any of its employees are responsible for my transaction
                related to ATM/PIN/POS and indemnify the Bank against any request or claim for any losses or damages
                from the use of the ATM/PIN/POS.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
