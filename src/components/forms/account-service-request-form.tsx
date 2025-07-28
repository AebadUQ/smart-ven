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
import { format } from 'date-fns';

export interface AccountOpeningFormProps {
  data: any;
}

export default function AccountServiceRequestForm({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log("data," , data)

  console.log('account service req->', formDetails);

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
      <Stack spacing={4} sx={{ display: 'flex', flexDirection: 'column', }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={4}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Account Service Request Form
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Branch"
                    value={formDetails?.asrBranchName?.value}
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
                    label="CIF Type"
                    value={formDetails?.asrCIFType?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Customer Details
              </Typography>
              {formDetails?.asrCustomerDetail?.map((data: any, index: any) => {
                return (
                  <Stack spacing={4}>
                    <Typography variant="h6">First Applicant {index + 1}</Typography>

                    <Grid container spacing={3}>
                      <Grid item md={3} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Name"
                          value={data?.asrCustomerName || ''}
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
                          label="Mobile No."
                          value={data?.asrCustomerMobileNo || ''}
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
                          label="Email ID"
                          value={data?.asrCustomerEmailId || ''}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                );
              })}

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Account Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Account Number"
                    value={formDetails?.asrAccountNumber}
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
                    value={formDetails?.asrAccountName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Cheque Book Request Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Cheque Book"
                    value={formDetails?.asrChequeBook?.value}
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
                    label="Receiving Method"
                    value={formDetails?.asrReceivingMethod?.value}
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

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Certificates & Letters Request Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrLiabilityLetter)} disabled />}
                    label="Liability Letter"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrNoLiabilityLetter)} disabled />}
                    label="No Liability Letter"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrAccountBalanceCertificate)} disabled />}
                    label="Account/Balance Certificate "
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrAuditConfirmReport)} disabled />}
                    label="Audit Confirmation Report"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrAccountClosureCertificate)} disabled />}
                    label="Account Closure Certificate"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrReferenceLetter)} disabled />}
                    label="Reference Letter"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrReleaseLetter)} disabled />}
                    label="Release Letter"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrStatementOfAccount)} disabled />}
                    label="Statement of Account"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.asrOtherRequest)} disabled />}
                    label="Other Request"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Receiving Method"
                    value={formDetails?.asrReceivingMethod?.value || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Change Request in Applicant Details
              </Typography>

              <Typography variant="h6">Employment</Typography>

              <Grid container spacing={6}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Source of Income"
                    value={formDetails?.asrEmpSourceOfIncome?.value}
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
                    label="Sector (if salary)"
                    value={formDetails?.asrEmpSector?.value}
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
                    label="Name of the Employer"
                    value={formDetails?.asrEmpName}
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
                    label="Nature of Business"
                    value={formDetails?.asrEmpNatureOfBusiness}
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
                    label="Designation"
                    value={formDetails?.asrEmpDesignation}
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
                    label="Employee No."
                    value={formDetails?.asrEmpNo}
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
                    label="Date of Joining"
                    value={
                      formDetails?.asrEmpDateOfJoining
                        ? format(new Date(formDetails.asrEmpDateOfJoining), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
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
                    label="Telephone"
                    value={formDetails?.asrEmpTelephone}
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
                    label="Fax"
                    value={formDetails?.asrEmpFax}
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
                    label="Income p.m."
                    value={formDetails?.asrEmpIncomePm}
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
                    label="Source of Other Income"
                    value={formDetails?.asrSourceOfOtherIncome}
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
                    label="Passport No."
                    value={formDetails?.asrPassportNo}
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
                    label="Passport Expiry Date"
                    value={
                      formDetails?.asrPassportExpiryDate
                        ? format(new Date(formDetails.asrPassportExpiryDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
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
                    label="Visa No."
                    value={formDetails?.asrVisaNo}
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
                    label="Visa Expiry Date"
                    value={
                      formDetails?.asrVisaExpiryDate
                        ? format(new Date(formDetails.asrVisaExpiryDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Contact
              </Typography>

              <Grid container spacing={6}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="P.O Box"
                    value={formDetails?.asrContactPOBox}
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
                    label="Postal Code"
                    value={formDetails?.asrContactPostalCode}
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
                    label="House No./Flat No."
                    value={formDetails?.asrContactHouseNo}
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
                    label="Building No."
                    value={formDetails?.asrContactBuildingNo}
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
                    label="Way No."
                    value={formDetails?.asrContactWayNo}
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
                    label="Area"
                    value={formDetails?.asrContactArea?.value}
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
                    label="Wilayat"
                    value={formDetails?.asrContactWilayat}
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
                    label="Res. Tel. No"
                    value={formDetails?.asrContactResTelNo}
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
                    label="Mobile (1)"
                    value={formDetails?.asrContactMobile1}
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
                    label="Mobile (2)"
                    value={formDetails?.asrContactMobile2}
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
                    label="Email"
                    value={formDetails?.asrContactEmail}
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
                    label="Permanent Address (Home Country)"
                    value={formDetails?.asrContactPermanentAddressHomeCountry}
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
                    label="Telephone"
                    value={formDetails?.asrContactTelephone}
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

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Statement Type & Frequency
              </Typography>

              <Grid container spacing={5}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Changes in Email Frequency"
                    value={formDetails?.asfChangesInEmailFrequency?.value}
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
                    value={formDetails?.asfChangesInChangesFrequency?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Email Address(es) for Electronic Statement Delivery</Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Email 01"
                    value={formDetails?.asfElectronicStatementDeliveryEmail1}
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
                    label="Email 02"
                    value={formDetails?.asfElectronicStatementDeliveryEmail2}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Information Services Request Details
              </Typography>

              <Grid item md={3} xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(formDetails?.asfInfoServiceReqDetailCheck)} disabled />}
                  label="I/We hereby authorise the Bank to send me/us information relating to its products, services and special offers by"
                />
              </Grid>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Email and SMS/MMS"
                    value={formDetails?.asfEmailAndSmsMms?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Consent & Declaration
              </Typography>
              <Grid item md={3} xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(formDetails?.asfConsentAndDeclarationCheck)} disabled />}
                  label="/We hereby declare that the information given in this form is true and complete. "
                />
              </Grid>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Account Number"
                    value={formDetails?.asfConsentAndDeclarationAccNumber}
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
                    value={formDetails?.asfConsentAndDeclarationAccName}
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
                    label="First Applicant"
                    value={formDetails?.asfConsentAndDeclarationFirstApplicantName}
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
                    value={formDetails?.asfConsentAndDeclarationSecondApplicantName}
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
                    label="Third Applicant (if joint account)"
                    value={formDetails?.asfConsentAndDeclarationThirdApplicantName}
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
                    label="Fourth Applicant (if joint account)"
                    value={formDetails?.asfConsentAndDeclarationFourthApplicantName}
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
