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

export default function CorporateInternetBankingServicesMaintenanceRequest({
  data,
}: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log(formDetails, "here is our Details")

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
          <Typography variant="h6" sx={{ color: '#6E2585', margin: '15px' }}>
            {data?.form_name}
          </Typography>
          <CardContent>
            <Stack spacing={5}>
              <Grid container spacing={5}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Branch</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmBranch?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                {/* <Grid item md={3} xs={12}>
                  <InputLabel>CIF Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmCifNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Corporate Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmOfficePhone}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                {/* <Grid item md={3} xs={12}>
                  <InputLabel>CIF Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmAdditionalCifNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}
                <Grid item md={3} xs={12}>
                  <InputLabel>Office Telephone/GSM No.(s)</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmOfficeTelephone}
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
                    value={formDetails?.cibmCorporateName}
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
                    value={formDetails?.cibmCRNumber}
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
                    value={formDetails?.cibmCorporateEmailId}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Master User Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmMasterUsername}
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
                    value={formDetails?.cibmAddress}
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
                    value={formDetails?.cibmJobTitle}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Service Request
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={4} xs={12}>
                  <InputLabel>User Title</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmUserTitle}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                {/* <Grid item md={3} xs={12}>
                  <InputLabel>Corporate Title</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmCorporateTitle}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}
                <Grid item md={4} xs={12}>
                  <InputLabel>Company ID</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmCompanyId}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                {/* <Grid item md={3} xs={12}>
                  <InputLabel>Total Daily Limit</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmDailyLimit}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}
                {/* <Grid item md={3} xs={12}>
                  <InputLabel>Limit per transaction</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmLimitPerTransaction}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}
                  {/* <Grid item md={3} xs={12}>
                    <InputLabel>Number of approval per Transaction</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.cibmApprovalPerTransaction}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid> */}
                {/* <Grid item md={3} xs={12}>
                  <InputLabel>Select Request</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmSelectRequest?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}
                {/* <Grid item md={3} xs={12}>
                  <InputLabel>Change in Role</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmChangeInRole?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}

              </Grid>
              <Typography variant='h6'>Change in Role</Typography>
              <Grid container>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibmChangeInRole?.cibmUserManagement)} disabled />}
                    label="User Management"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibmChangeInRole?.cibmViewAccounts)} disabled />}
                    label="View accounts"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibmChangeInRole?.cibmFundTransferMaker)} disabled />}
                    label="Fund Transfer Maker"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.cibmChangeInRole?.cibmFundTransferChecker)} disabled />}
                    label="Fund Transfer Checker"
                  />
                </Grid></Grid>
               <Stack direction='column' spacing={5}>
                <Grid container>
                  <Grid xs={3} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.cibmMobileNumberchange)} disabled />}
                      label="Mobile Number Chnage"
                    />
                  </Grid>
                  {formDetails?.cibmServiceMobileNumberchange && <Grid xs={9} md={9}>
                    <InputLabel>Mobile Number Change</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmServiceMobileNumberchange}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />

                  </Grid>}
                  </Grid><Grid container>
                   <Grid xs={3} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.cibmChangeinEmail)} disabled />}
                      label="Change in Email"
                    />
                  </Grid>
                  {formDetails?.cibmServiceChangeinEmail && <Grid xs={9} md={9}>
                    <InputLabel>Change in Email</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmServiceChangeinEmail}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />

                  </Grid>}

                  </Grid><Grid container>

                   <Grid xs={3} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.cibmChangeinJobTitle)} disabled />}
                      label="Chnage in Email"
                    />
                  </Grid>
                  {formDetails?.cibmServiceChangeinJobTitle && <Grid xs={9} md={9}>
                    <InputLabel>Change in Job Title</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.cibmServiceChangeinJobTitle}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />

                  </Grid>}

                </Grid>
                </Stack>


              <Grid>
                <Typography variant="h6" sx={{ mt: '30px', mb: '15px' }}>
                  Note
                </Typography>
                <Typography sx={{ mb: '0px' }}>
                  1. All transaction limits will be set as per the approved board resolution in Bank Nizwa format.
                </Typography>
                <Typography sx={{ mb: '0px' }}>
                  2. New board resolution is required for adding new master user/s or enhancing limits.
                </Typography>
                <Typography sx={{ mb: '0px' }}>
                  3. Two master users jointly can approve creation/modification of other corporate users.
                </Typography>
                <Typography sx={{ mb: '0px' }}>
                  4. Master users are responsible to map Funds transfer checker/approval users to the correct user group
                  as per the board resolution.
                </Typography>
              </Grid>

              <Grid>

                <Stack spacing={3}>
                  <Typography variant="h6" sx={{ color: '#6E2585'}}>
                    Declaration
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox checked={formDetails?.cibmTermsAndCondition
                      || false} disabled />}
                    label="I/We agree to the Promise to Purchase/Lease and acknowledge the terms as outlined in the Goods Murabaha Agreement/Service Ijara Agreement "
                  />
                </Stack>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
