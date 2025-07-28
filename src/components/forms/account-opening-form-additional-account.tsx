'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export interface AccountOpeningFormProps {
  data: any;
}

export default function AccountOpeningFormAdditionalAccount({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  
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
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Relationship Details
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Existing Account No"
                    value={formDetails?.adExistingAccountNo}
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
                    value={formDetails?.adBranch?.value}
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
                    label="Account Name"
                    value={formDetails?.adAccountName}
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
                    label="No of Applicants"
                    value={formDetails?.adNumberOfApplicant}
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
                    label="Account Type"
                    value={formDetails?.adAccountType?.value || 'Account Type'}
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
                    value={formDetails?.adCurrency?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Statement Type & Frequency
              </Typography>

              <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Changes in Email Frequency"
                    value={formDetails?.adChangesEmailFrequency?.value}
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
                    label="Changes in Printed Frequency"
                    value={formDetails?.adChangesPrintedFrequency?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}></Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Banking Service
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="ATM/Debit Card"
                    value={formDetails?.adBankServiceATMDebitCard?.value}
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
                    label="Cheque Book"
                    value={formDetails?.adChequeBook?.value}
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
                    label="Account Statements"
                    value={formDetails?.adAccountStatement?.value}
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
                    label="SMS Alerts for Account Transactions"
                    value={formDetails?.adSmsAlertsAccountTransactions?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.adEmailAlertsAccountTransactions)} disabled />}
                    label="Email Alerts for Account Transactions"
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.adInternationalAndPromotionalAlerts)} disabled />}
                    label="Informational and Promotional Alerts"
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Terms & Conditions
              </Typography>
              <Typography variant="body2">
                <FormControlLabel
                  control={<Checkbox checked={Boolean(formDetails?.adTermsAndConditions)} disabled />}
                  label="I/We confirm that the information given above is true and complete, and that I/We have received the Bank’s General Terms and Conditions for the operation... "
                />{' '}
              </Typography>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Applicant Name
              </Typography>

              <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="First Applicant"
                    value={formDetails?.adFirstApplicantName}
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
                    value={formDetails?.adSecondApplicantName}
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
