'use client';

import * as React from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';

export interface AccountOpeningFormProps {
  data: any;
}

export default function AccountOpeningFormSavinsAccount({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;

  console.log('savings account:', formDetails);

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
                    label="Branch"
                    value={formDetails?.saoRelationshipDetailsBranch?.value}
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
                    value={formDetails?.saoRelationshipDetailsCIFType?.value}
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
                    value={formDetails?.saoRelationshipDetailsCurrency?.value}
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
                    label="Relationship Criteria"
                    value={formDetails?.saoRelationshipDetailsRelationshipCriteria?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                First Applicant Details
              </Typography>
              <Typography variant="h6">Personal</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="First Name"
                    value={formDetails?.saoRelationshipDetailsFirstName}
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
                    label="Second Name"
                    value={formDetails?.saoRelationshipDetailsSecondName}
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
                    label="Surname/Tribe"
                    value={formDetails?.saoRelationshipDetailsSurnameTribe}
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
                    label="Date of Birth"
                    value={
                      formDetails?.saoRelationshipDetailsDateofBirth
                        ? format(new Date(formDetails.saoRelationshipDetailsDateofBirth), 'yyyy-MM-dd hh:mm a')
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
                    label="Nationality"
                    value={formDetails?.saoRelationshipDetailsNationality?.value}
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
                    label="ID/Resident Card"
                    value={formDetails?.saoRelationshipDetailsIDResidentCard}
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
                    label="Expiry Date"
                    value={
                      formDetails?.saoRelationshipDetailsPerExpiryDate
                        ? format(new Date(formDetails.saoRelationshipDetailsPerExpiryDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Employment</Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Source of Income"
                    value={formDetails?.saoRelationshipDetailsSourceofIncome?.value}
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
                    value={formDetails?.saoRelationshipDetailsSectorifsalary?.value}
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
                    value={formDetails?.saoRelationshipDetailsNameofEmployer}
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
                    value={formDetails?.saoRelationshipDetailsNatureofBusiness}
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
                    value={formDetails?.saoRelationshipDetailsDesignation}
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
                    value={formDetails?.saoRelationshipDetailsEmployeeNo}
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
                      formDetails?.saoRelationshipDetailsDateofJoining
                        ? format(new Date(formDetails.saoRelationshipDetailsDateofJoining), 'yyyy-MM-dd hh:mm a')
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
                    value={formDetails?.saoRelationshipDetailsEmploymentTelephone}
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
                    value={formDetails?.saoRelationshipDetailsFax}
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
                    value={formDetails?.saoRelationshipDetailsIncomepm?.value}
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
                    value={formDetails?.saoRelationshipDetailsSourceofOtherIncome}
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
                    value={formDetails?.saoRelationshipDetailsPassportNo}
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
                      formDetails?.saoRelationshipDetailsPassportExpiryDate
                        ? format(new Date(formDetails.saoRelationshipDetailsPassportExpiryDate), 'yyyy-MM-dd hh:mm a')
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
                    value={formDetails?.saoRelationshipDetailsVisaNo}
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
                      formDetails?.saoRelationshipDetailsVisaExpiryDate
                        ? format(new Date(formDetails.saoRelationshipDetailsVisaExpiryDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Contact</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="P.O Box"
                    value={formDetails?.saoRelationshipDetailsPOBox}
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
                    value={formDetails?.saoRelationshipDetailsPostalCode?.value}
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
                    value={formDetails?.saoRelationshipDetailsHouseNoFlatNo}
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
                    value={formDetails?.saoRelationshipDetailsBuildingNo}
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
                    value={formDetails?.saoRelationshipDetailsWayNo}
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
                    value={formDetails?.saoRelationshipDetailsArea?.value}
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
                    value={formDetails?.saoRelationshipDetailsWilayat?.value}
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
                    value={formDetails?.saoRelationshipDetailsResTelNo}
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
                    value={formDetails?.saoRelationshipDetailsMobile1}
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
                    value={formDetails?.saoRelationshipDetailsMobile2}
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
                    value={formDetails?.saoRelationshipDetailsEmail}
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
                    value={formDetails?.saoRelationshipDetailsPermanentAddressHomeCountry}
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
                    value={formDetails?.saoRelationshipDetailsContactTelephone}
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
                Second Applicant Details
              </Typography>

              <Typography variant="h6">Personal</Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="First Name"
                    value={formDetails?.saoSecondApplicantDetailsFirstName}
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
                    label="Second Name"
                    value={formDetails?.saoSecondApplicantDetailsSecondName}
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
                    label="Surname/Tribe"
                    value={formDetails?.saoSecondApplicantDetailsSurnameTribe}
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
                    label="Date of Birth"
                    value={
                      formDetails?.saoSecondApplicantDetailsDateofBirth
                        ? format(new Date(formDetails.saoSecondApplicantDetailsDateofBirth), 'yyyy-MM-dd hh:mm a')
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
                    label="Nationality"
                    value={formDetails?.saoSecondApplicantDetailsNationality?.value}
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
                    label="ID/Resident Card"
                    value={formDetails?.saoSecondApplicantDetailsIDResidentCard}
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
                    label="Expiry Date"
                    value={
                      formDetails?.saoSecondApplicantDetailsPerExpiryDate
                        ? format(new Date(formDetails.saoSecondApplicantDetailsPerExpiryDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Employment</Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Source of Income"
                    value={formDetails?.saoSecondApplicantDetailsSourceofIncome?.value}
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
                    value={formDetails?.saoSecondApplicantDetailsSectorifsalary?.value}
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
                    value={formDetails?.saoSecondApplicantDetailsNameofEmployer}
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
                    value={formDetails?.saoSecondApplicantDetailsNatureofBusiness}
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
                    value={formDetails?.saoSecondApplicantDetailsDesignation}
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
                    value={formDetails?.saoSecondApplicantDetailsEmployeeNo}
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
                      formDetails?.saoSecondApplicantDetailsDateofJoining
                        ? format(new Date(formDetails.saoSecondApplicantDetailsDateofJoining), 'yyyy-MM-dd hh:mm a')
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
                    value={formDetails?.saoSecondApplicantDetailsEmploymentTelephone}
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
                    value={formDetails?.saoSecondApplicantDetailsFax}
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
                    value={formDetails?.saoSecondApplicantDetailsIncomepm}
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
                    value={formDetails?.saoSecondApplicantDetailsSourceofOtherIncome}
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
                    value={formDetails?.saoSecondApplicantDetailsPassportNo}
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
                      formDetails?.saoSecondApplicantDetailsPassportExpiryDate
                        ? format(
                            new Date(formDetails.saoSecondApplicantDetailsPassportExpiryDate),
                            'yyyy-MM-dd hh:mm a'
                          )
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
                    value={formDetails?.saoSecondApplicantDetailsVisaNo}
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
                      formDetails?.saoSecondApplicantDetailsVisaExpiryDate
                        ? format(new Date(formDetails.saoSecondApplicantDetailsVisaExpiryDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Contact</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="P.O Box"
                    value={formDetails?.saoSecondApplicantDetailsPOBox}
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
                    value={formDetails?.saoSecondApplicantDetailsPostalCode}
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
                    value={formDetails?.saoSecondApplicantDetailsHouseNoFlatNo}
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
                    value={formDetails?.saoSecondApplicantDetailsBuildingNo}
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
                    value={formDetails?.saoSecondApplicantDetailsWayNo}
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
                    value={formDetails?.saoSecondApplicantDetailsArea?.value}
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
                    value={formDetails?.saoSecondApplicantDetailsWilayat}
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
                    value={formDetails?.saoSecondApplicantDetailsResTelNo}
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
                    value={formDetails?.saoSecondApplicantDetailsMobile1}
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
                    value={formDetails?.saoSecondApplicantDetailsMobile2}
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
                    value={formDetails?.saoSecondApplicantDetailsEmail}
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
                    value={formDetails?.saoSecondApplicantDetailsPermanentAddressHomeCountry}
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
                    value={formDetails?.saoSecondApplicantDetailsTelephone}
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
                Banking Service Required
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Cheque Book"
                    value={formDetails?.saoBankingServicesChequeBook?.value}
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
                    label="SMS Alerts for Account Transaction"
                    value={formDetails?.saoBankingServicesSMSAlertsforAccountTransaction?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(formDetails?.saoBankingServicesEmailAlertsforAccountTransactions)}
                        disabled
                      />
                    }
                    label="Email Alerts for Account Transactions"
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Statement Type & Frequency
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Changes in Email Frequency*"
                    value={formDetails?.saoBankingServicesChangesinEmailFrequency?.value}
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
                    label="Changes in Printed Frequency*"
                    value={formDetails?.saoBankingServicesChangesinPrintedFrequency?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Terms & Conditions
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.saoBankingServicesTermsConditions)} disabled />}
                    label="I/We confirm that the information given above is true and complete, and that I/We have received the Bank’s General Terms and Conditions..."
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="First Name"
                    value={formDetails?.saoBankingServicesFirstApplicantName}
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
                    label="Second Name (if joint account)"
                    value={formDetails?.saoBankingServicesSecondApplicantName}
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
