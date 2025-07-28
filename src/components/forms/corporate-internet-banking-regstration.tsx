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
import dayjs from 'dayjs';

export interface AccountOpeningFormProps {
  data: any;
}

export default function CorporateInternetBankingRegistration({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log('letter', formDetails);
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
                {data?.form_name}
              </Typography>

              <Grid container spacing={5}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Branch</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrBranch?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Corporate Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>CIF Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrCifNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Email ID</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrCorporateEmailId}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Name of Corporate</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrCorporateName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Office Telephone/GSM No.(s)</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrOfficeNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>CR No</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrCRNumber}
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
                    value={dayjs(formDetails?.cibrDate).format('MMM D, YYYY')}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Corporate User Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>First Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrFirstName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Middle Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrMiddleName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrLastName}
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
                    value={formDetails?.cibrMobileNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Office No</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrOfficeNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Email ID</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrUserEmailId}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Job Title</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrJobTitle}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Resident ID / Civil ID</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrResidentId}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Address</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrUserAddress?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Grid>
                <Typography variant="h6" sx={{ mt: '30px', mb: '15px' }}>
                  Master user name will be allotted to you subject to its availability
                </Typography>
              </Grid>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>1st Choice</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrFirstChoice}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>2nd Choice</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrSecondChoice}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>3rd Choice</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibrThirdChoice}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Grid>
                <Typography variant="h6" sx={{ color: '#6E2585', mt: '30px', mb: '15px' }}>
                  Access Rights Menu Options tick on the Appropriate Options
                </Typography>
              </Grid>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibrAccessRightOptions?.cibrAccessViewAccountInfo)} disabled />}
                    label="View all account information"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibrAccessRightOptions?.cibrAccessFundTransferApproval)} disabled />}
                    label="Fund Transfer Maker approval"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibrAccessRightOptions?.cibrAccessUserManagementLimit)} disabled />}
                    label="User management and limit set-up"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibrAccessRightOptions?.cibrAccessFundTransferCheckerApproval)} disabled />}
                    label="Fund Transfer Checker approval"
                  />
                </Grid>
              </Grid>

              <Grid>
                <Typography variant="h6" sx={{ color: '#6E2585', mt: '30px', mb: '15px' }}>
                  Declaration
                </Typography>
                <FormControlLabel
                  control={<Checkbox checked={formDetails?.cibrTermsAndCondition || false} disabled />}
                  label="I/We agree to the Promise to Purchase/Lease and acknowledge the terms as outlined in the Goods Murabaha Agreement/Service Ijara Agreement "
                />
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
