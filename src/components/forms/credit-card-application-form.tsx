'use client';

import * as React from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';
import dayjs from 'dayjs';





export interface AccountOpeningFormProps {
  data: any;
}

export default function AccountOpeningFormAdditionalAccount({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log('data', data);
  console.log('form Details', formDetails);

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
                Credit Card Application
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Branch"
                    value={formDetails?.ccaBranch.value}
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
                    label="CIF Number"
                    value={formDetails?.ccaFundingCIFNumber}
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
                    label="Customer Type"
                    value={formDetails?.ccaCustomerType.value}
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
                    label="Card Type"
                    value={formDetails?.ccaCardType.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                {/* <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Credit Card Requested Limit"
                    value={formDetails?.ccaCreditCardReqLimit || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Personal Details
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Title"
                    value={formDetails?.ccaPersonalDetailTitle?.value}
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
                    label="First Name"
                    value={formDetails?.ccaPersonalDetailFirstName}
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
                    value={formDetails?.ccaPersonalDetailSecondName}
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
                    value={formDetails?.ccaPersonalDetailSurName}
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
                    value={formDetails?.ccaPersonalDetailNationality?.value}
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
                      formDetails?.ccaPersonalDetailDateOfBirth
                        ? format(new Date(formDetails.ccaPersonalDetailDateOfBirth), 'yyyy-MM-dd hh:mm a')
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
                    label="Place of Birth"
                    value={formDetails?.ccaPersonalDetailPlaceOfBirth.value}
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
                    value={formDetails?.ccaPersonalDetailIDResidentCard}
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
                      formDetails?.ccaPersonalDetailExpiryDate
                        ? format(new Date(formDetails.ccaPersonalDetailExpiryDate), 'yyyy-MM-dd hh:mm a')
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
                    label="Marital Status"
                    value={formDetails?.ccaPersonalDetailMaritalStatus.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                {/* <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Mother's Name"
                    value={formDetails?.ccaPersonalDetailMotherName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid> */}

                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Passport No*"
                    value={formDetails?.ccaPersonalDetailPassportNo || 'N/A'}
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
                    label="Passport Expiry Date*"
                    value={
                      formDetails?.ccaPersonalDetailPassportExpiryDate
                        ? format(new Date(formDetails.ccaPersonalDetailPassportExpiryDate), 'yyyy-MM-dd hh:mm a')
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
                    label="Resident ID"
                    value={formDetails?.ccaPersonalDetailResidentID || 'N/A'}
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
                    label="Resident Card Expiry Date*"
                    value={
                      formDetails?.ccaPersonalDetailResidentCardExpiryDate
                        ? format(new Date(formDetails.ccaPersonalDetailResidentCardExpiryDate), 'yyyy-MM-dd hh:mm a')
                        : 'N/A'
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Address</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="P.O Box"
                    value={formDetails?.ccaStatementAddressPOBox || 'N/A'}
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
                    value={formDetails?.ccaStatementAddressPostalCode || 'N/A'}
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
                    label="Residential Status"
                    value={formDetails?.ccaStatementAddressResidentStatus.value || 'N/A'}
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
                    value={formDetails?.ccaStatementAddressHouseNo || 'N/A'}
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
                    value={formDetails?.ccaStatementAddressBuildingNo || 'N/A'}
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
                    value={formDetails?.ccaStatementAddressWayNo || 'N/A'}
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
                    value={formDetails?.ccaStatementAddressArea || 'N/A'}
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
                    value={formDetails?.ccaStatementAddressWaliyat || 'N/A'}
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
                    label="Res. Tel. No."
                    value={formDetails?.ccaStatementAddressResTelNo || 'N/A'}
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
                    label="Mobile 1"
                    value={formDetails?.ccaStatementAddressMobileNo1 || 'N/A'}
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
                    label="Mobile 2"
                    value={formDetails?.ccaStatementAddressMobileNo2 || 'N/A'}
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
                    value={formDetails?.ccaStatementAddressEmail || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              {/* <Typography variant="h6">Permanent Address (if different from above)</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="P.O Box"
                    value={formDetails?.ccaPermanentAddressPOBox || 'N/A'}
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
                    value={formDetails?.ccaPermanentAddressPostalCode || 'N/A'}
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
                    value={formDetails?.ccaPermanentAddressHouseNo || 'N/A'}
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
                    value={formDetails?.ccaPermanentAddressBuildingNo || 'N/A'}
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
                    value={formDetails?.ccaPermanentAddressWayNo|| 'N/A'}
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
                    value={formDetails?.ccaPermanentAddressArea || 'N/A'}
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
                    value={formDetails?.ccaPermanentAddressWaliyat || 'N/A'}
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
                    label="Res. Tel. No."
                    value={formDetails?.ccaPermanentAddresssResTelNo || 'N/A'}
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
                    label="Mobile 1"
                    value={formDetails?.ccaPermanentAddressMobileNo1 || 'N/A'}
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
                    label="Mobile 2"
                    value={formDetails?.ccaPermanentAddressMobileNo2 || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid> */}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Employment / Business
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Name of the Employer / Business"
                    value={formDetails?.ccaEmploymentBusinessName || 'N/A'}
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
                    value={formDetails?.ccaEmploymentBusinessSector?.value || 'N/A'}
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
                    label="Employer Code"
                    value={formDetails?.ccaEmploymentBusinessEmployerCode || 'N/A'}
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
                    label="If Self-employed provide the CR No"
                    value={formDetails?.ccaEmploymentBusinessCRNo || 'N/A'}
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
                    value={formDetails?.ccaEmploymentBusinessNatureOfBusiness || 'N/A'}
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
                    label="Desination"
                    value={formDetails?.ccaEmploymentBusinessDesignation || 'N/A'}
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
                    value={formDetails?.ccaEmploymentBusinessEmployeeNo || 'N/A'}
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
                      formDetails?.ccaEmploymentBusinessDateOfJoining
                        ? format(new Date(formDetails.ccaEmploymentBusinessDateOfJoining || 'N/A'), 'yyyy-MM-dd hh:mm a')
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
                    label="P.O Box"
                    value={formDetails?.ccaEmploymentBusinessPOBox|| 'N/A'}
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
                    value={formDetails?.ccaEmploymentBusinessPostalCode|| 'N/A'}
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
                    label="City/Town"
                    value={formDetails?.ccaEmploymentBusinessCityTown|| 'N/A'}
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
                    label="Tel No."
                    value={formDetails?.ccaEmploymentBusinessTelNo|| 'N/A'}
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
                    value={formDetails?.ccaEmploymentBusinessFax|| 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Income</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Monthly Gross Salary Income"
                    value={formDetails?.ccaIncomeMonthlyGrossSalary || 'N/A'}
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
                    label="Basic Salary"
                    value={formDetails?.ccaIncomeBasicSalary}
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
                    label="Allowance"
                    value={formDetails?.ccaIncomeAllowance}
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
                    label="Total income"
                    value={formDetails?.ccaIncomeTotalIncome}
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
                    label="Additional Income"
                    value={formDetails?.ccaIncomeAdditionalIncome}
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
                    label="Annual Income"
                    value={formDetails?.ccaIncomeAnnualIncome || 'N/A'}
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
                    label="Salary Date"
                    // value={
                    //   formDetails?.ccaIncomeSalaryDate
                    //     ? format(new Date(formDetails.ccaIncomeSalaryDate), 'yyyy-MM-dd hh:mm a')
                    //     : 'N/A'
                    // }
                    value={formDetails?.ccaIncomeSalaryDate|| 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Funding Account</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="My Credit Card bill settlement"
                    value={formDetails?.ccaFundingAccCreditCardBillSettlement.value || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Debit my Smart Ven Account No"
                    value={formDetails?.ccaFundingDebitAccTo}
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
                    label="CIF No."
                    value={formDetails?.ccaFundingCIFNumber || 'N/A'}
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
                    value={formDetails?.ccaFundingBranch.value}
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
                Primary Card Details
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="My name to appear on the card"
                    value={formDetails?.ccaPrimaryCardRetailCardName || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Supplementary Card Details
              </Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Name"
                    value={formDetails?.ccaSupplementaryCardDetailName || 'N/A'}
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
                    label="Relationship"
                    value={formDetails?.ccaSupplementaryCardDetailRelationship?.value || 'N/A'}
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
                      formDetails?.ccaSupplementaryCardDetailDob
                        ? format(new Date(formDetails.ccaSupplementaryCardDetailDob), 'dd-mm-yyyy hh:mm a')
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
                    label="ID/Passport"
                    value={formDetails?.ccaSupplementaryCardDetailIdPassport || 'N/A'}
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
                    value={formDetails?.ccaSupplementaryCardDetailNationality?.value || 'N/A'}
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
                    label="Supplementary card name"
                    value={formDetails?.ccaSupplementaryCardDetailSupplementaryCardName || 'N/A'}
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
                    label="Card Limit"
                    value={formDetails?.ccaSupplementaryCardDetailCardLimit || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Supplementary credit card – Number of transaction per Day
              </Typography>
              <Grid container >

              <Grid  md={12} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Number of Transaction Per Day:"
                    value={formDetails?.ccaSupplementaryCardLimitNumberOfTransactionPerDay || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  /></Grid></Grid>
              {/* <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Retail/POS number"
                    value={formDetails?.ccaSupplementaryCardLimitRetailPosNum || 'N/A'}
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
                    label="Retail/POS amount"
                    value={formDetails?.ccaSupplementaryCardLimitRetailPosAmount || 'N/A'}
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
                    label="ATM Cash Number"
                    value={formDetails?.ccaSupplementaryCardLimitATMCashNum || 'N/A'}
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
                    label="ATM Cash Amount"
                    value={formDetails?.ccaSupplementaryCardLimitATMCashAmount|| 'N/A'}
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
                    label="Retail/POS amount per transaction"
                    value={formDetails?.ccaSupplementaryCardLimitRetailPosAmountPerTrans || 'N/A'}
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
                    label="ATM cash amount per transaction"
                    value={formDetails?.ccaSupplementaryCardLimitATMCashAmountPerTrans || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid> */}

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Banking Service Required
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="SMS alerts for card transactions"
                    value={formDetails?.ccaBankServiceReqSmsAlert.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.ccaBankServiceReqEmailAlertCardTrans)} disabled />}
                    label="Email alerts for card transactions"
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
                Banking Relationships
              </Typography>
              <Grid container spacing={4}>
                {formDetails?.ccaBankingRelationship?.map((item: any, index: any) => (
                  <React.Fragment key={index}>
                    <Grid item md={3} xs={12}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label={`Bank Name ${index + 1}`}
                        value={item.ccaBankingRelationshipBankName || 'N/A'}
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
                        label={`Account No ${index + 1}`}
                        value={item.ccaBankingRelationshipAccountNum || 'N/A'}
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
                        label={`Account Type ${index + 1}`}
                        value={item.ccaBankingRelationshipTypeOfAccount?.value || 'N/A'}
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
                        label={`Since ${index + 1}`}
                        value={new Date(item.ccaBankingRelationshipSince).toLocaleDateString()}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Types of Liability
              </Typography>

              <Typography variant="h6">Personal Finance</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Bank"
                    value={formDetails?.ccaLiabilityPFBank || 'N/A'}
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
                    label="Monthly Payment"
                    value={formDetails?.ccaLiabilityPFMonthlyPayment || 'N/A'}
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
                    label="Amount Outstanding"
                    value={formDetails?.ccaLiabilityPFAmountOutstanding || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Auto Finance</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Bank"
                    value={formDetails?.ccaLiabilityAFBank || 'N/A'}
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
                    label="Monthly Payment"
                    value={formDetails?.ccaLiabilityAFMonthlyPayment || 'N/A'}
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
                    label="Amount Outstanding"
                    value={formDetails?.ccaLiabilityAFAmountOutstanding || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Credit Card</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Bank"
                    value={formDetails?.ccaLiabilityCCBank || 'N/A'}
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
                    label="Monthly Payment"
                    value={formDetails?.ccaLiabilityCCMonthlyPayment || 'N/A'}
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
                    label="Amount Outstanding"
                    value={formDetails?.ccaLiabilityCCAmountOutstanding || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Home Finance</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Bank"
                    value={formDetails?.ccaLiabilityHFBank || 'N/A'}
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
                    label="Monthly Payment"
                    value={formDetails?.ccaLiabilityHFMonthlyPayment || 'N/A'}
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
                    label="Amount Outstanding"
                    value={formDetails?.ccaLiabilityHFAmountOutstanding || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Other Liability (including 3rd Party Guarantees)</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Bank"
                    value={formDetails?.ccaLiabilityOLBank || 'N/A'}
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
                    label="Monthly Payment"
                    value={formDetails?.ccaLiabilityOLMonthlyPayment || 'N/A'}
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
                    label="Amount Outstanding"
                    value={formDetails?.ccaLiabilityOLAmountOutstanding || 'N/A'}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Total</Typography>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Amount Outstanding"
                    value={formDetails?.ccaLiabilityTOAmountOutstanding}
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
                    label="Monthly Payment"
                    value={formDetails?.ccaLiabilityTOMonthlyPayment}
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
                Reference
              </Typography>
              <Grid container spacing={4} xs={12}>
                <Grid item md={6} xs={12}>
                  <Stack spacing={4}>
                    <Typography variant="h6">In Oman</Typography>
                    <Grid container spacing={4}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Name"
                          value={formDetails?.ccaRefInOmanName || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Relationship"
                          value={formDetails?.ccaRefInOmanRelationship?.value || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Employer"
                          value={formDetails?.ccaRefInOmanEmployer || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Address"
                          value={formDetails?.ccaRefInOmanAddress || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Office Tel"
                          value={formDetails?.ccaRefInOmanOfficeTel || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Mobile"
                          value={formDetails?.ccaRefInOmanMobile || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>

                <Grid item md={6} xs={12}>
                  <Stack spacing={4}>
                    <Typography variant="h6">In Home Country (For Expatriates / GCC Nationals)</Typography>

                    <Grid container spacing={4} item xs={12} >
                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Name"
                          value={formDetails?.ccaRefInHomeName || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Relationship"
                          value={formDetails?.ccaRefInHomeRelationship?.value || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Employer"
                          value={formDetails?.ccaRefInHomeEmployer || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Address"
                          value={formDetails?.ccaRefInHomeAddress || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Office Tel"
                          value={formDetails?.ccaRefInHomeOfficeTel || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Mobile"
                          value={formDetails?.ccaRefInHomeMobile || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Terms & Conditions
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={Boolean(formDetails?.ccaTermsandCond)} disabled />}
                label="I confirm that the information given above is true and complete, and that I have received the Bank’s General Terms and Conditions for the..."
              />

            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
