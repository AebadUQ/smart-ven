'use client';

import * as React from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { Grid, textAlign } from '@mui/system';
import dayjs from 'dayjs';





export interface ProductEditFormProps {
  data: any;
}

export default function AccountOpeningWithApplicantForm({ data }: ProductEditFormProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  console.log(formdetails, 'app data');

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
                  Relationship Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 6, xs: 12, sm: 6 }}>
                    <InputLabel>Existing Account No.</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsExistingAccountNo || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Branch</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsBranch?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>CIF Type</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsCIFType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Nature of Account</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsAccountType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Currency</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsCurrency?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Relationship Criteria</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsRelationshipCriteria?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Account Name (if joint account)</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsAccountName || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Type of Relationship (if joint account)</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsTypeofRelationship?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Instruction for Account Operation</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsInstructionforAccountOperation?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Attorney/Guardian</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Name of Attorney/Guardian</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsNameofAttorneyGuardian || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>ID / Passport No.</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsIDPassportNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Power of Attorney Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.addAppRelationshipDetailsPowerofAttorneyExpiryDate).format(
                          'MMM D, YYYY h:mm A'
                        ) || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Additional Applicant 1
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsFirstName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Second Name</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsSecondName || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Surname/Tribe</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsSurnameTribe || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Date of Birth</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.addAppRelationshipDetailsDateofBirth).format('MMM D, YYYY h:mm A') || 'N/A'
                      }
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Nationality</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsNationality?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>ID/Resident Card</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsIDResidentCard || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{

                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.addAppRelationshipDetailsExpiryDate).format('MMM D, YYYY h:mm A') || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Employment</Typography>

                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Source of Income</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsSourceofIncome?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Sector (if salary)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsSectorifsalary?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Name of the Employer</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsNameoftheEmployer}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Nature of Business</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsNatureofBusiness || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Designation</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsDesignation || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Employee No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsEmployeeNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Date of Joining</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.addAppRelationshipDetailsDateofJoining).format('MMM D, YYYY h:mm A') || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Telephone</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsTelephone || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Fax</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsFax || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Income p.m.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsIncomepm || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Source of Other Income</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsSourceofOtherIncome || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Passport No</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsPassportNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Passport Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.addAppRelationshipDetailsPassportExpiryDate).format('MMM D, YYYY h:mm A') ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Visa NO</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsVisaNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Visa Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.addAppRelationshipDetailsVisaExpiryDate).format('MMM D, YYYY h:mm A') ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Contact</Typography>


                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>P.O Box</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsPOBox || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Postal Code</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsPostalCode || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>House No./Flat No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsHouseNoFlatNo}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Building No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsBuildingNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Way No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails.addAppRelationshipDetailsWayNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Area</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsArea?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Wilayat</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsWilayat || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Res. Tel. No</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsResTelNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Mobile (1)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsMobile1 || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Mobile (2)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsMobile2 || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsEmail || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Permanent Address (Home Country)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsPermanentAddressHomeCountry || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Telephone</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppRelationshipDetailsContactTelephone || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  {formdetails?.addAppSecAppDetTitle?.value}
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppSecAppDetFirstName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Second Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppSecAppDetSecondName || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Surname/Tribe</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetSurnameTribe || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Date of Birth</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.addAppAppDetDateofBirth).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Nationality</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetNationality?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>ID/Resident Card</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetIDResidentCard || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.addAppAppDetPerExpiryDate).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Employment</Typography>

                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Source of Income</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetSourceofIncome?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Sector (if salary)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetSectorifsalary?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Name of the Employer</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetNameofEmployer}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Nature of Business</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetNatureofBusiness || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Designation</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetDesignation || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Employee No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetEmployeeNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Date of Joining</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.addAppAppDetDateofJoining).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Telephone</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetEmploymentTelephone || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Fax</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetFax || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Income pm</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetIncomepm || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Source of income</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetSourceofOtherIncome || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Passport No</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetPassportNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Passport Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.addAppAppDetPassportExpiryDate).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Visa NO</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetVisaNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Visa Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.addAppAppDetVisaExpiryDate).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Contact</Typography>

                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>P.O Box</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetPOBox || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Postal Code</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetPostalCode || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>House No./Flat No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetHouseNoFlatNo}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Building No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetBuildingNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Way No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetWayNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Area</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetArea?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Wilayat</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetWilayat || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Res. Tel. No</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetResTelNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Mobile (1)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetMobile1 || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Mobile (2)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetMobile2 || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetEmail || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Permanent Address (Home Country)</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetPermanentAddressHomeCountry || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Telephone</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppAppDetTelephone || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  ATM/Debit Cards
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>ATM/Debit Card Issuance</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardIssuance?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Additional Applicant 1 Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitAdditionalApplicant1Name || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>ID/PP No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitIDPPNo1 || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Additional Applicant 2 Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitAdditionalApplicant2Name || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>ID/PP No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitIDPPNo2 || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Banking Service Required
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Cheque Book</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardChequeBook?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>SMS Alerts for Account Transactions</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardSMSAlert?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(formdetails?.addAppATMDebitCardEmailAlertsAccountTransactions)}
                          disabled
                        />
                      }
                      label="Email Alerts for Account Transactions"
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Statement Type & Frequency
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Changes in Email Frequency</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardChangesEmailFrequency?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Changes in Printed Frequency</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardChangesPrintedFrequency?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Terms & Conditions
                </Typography>
                <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={Boolean(formdetails?.addAppATMDebitCardGeneralTermsConditions)} disabled />
                    }
                    label="
I/We confirm that the information given above is true and complete, and that I/We have received the Bank’s General Terms and Conditions..."
                  />
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Additional Applicant 1</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardAdditionalApplicant1 || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Additional Applicant 2</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardAdditionalApplicant2 || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Additional Applicant 3</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardAdditionalApplicant3 || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Applicant 4</InputLabel>
                    <OutlinedInput
                      sx={{
                        width: '100%',
                      }}
                      value={formdetails?.addAppATMDebitCardAdditionalApplicant4 || 'N/A'}
                      disabled
                    />
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
