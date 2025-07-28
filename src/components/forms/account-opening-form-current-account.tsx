'use client';
import { format } from 'date-fns';

import * as React from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material';

export interface AccountOpeningFormProps {
    data: any;
}

export default function AccountOpeningFormCurrentAccount({ data }: AccountOpeningFormProps): React.JSX.Element {
    const formDetails = data?.user_form_detail;
    
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
                                Relationship Details
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="Select Branch"
                                        value={formDetails?.caoRelDetBranch?.value}
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
                                        value={formDetails?.caoRelDetCIFType?.value}
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
                                        label="Nature of Account"
                                        value={formDetails?.caoRelDetAccountType?.value}
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
                                        value={formDetails?.caoRelDetCurrency?.value}
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
                                        value={formDetails?.caoRelDetRelationshipCriteria?.value}
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
                                        label="Account Name (if joint account)"
                                        value={formDetails?.caoRelDetAccountName}
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
                                        label="Type of Relationship (if joint account)"
                                        value={formDetails?.caoRelDetTypeofRelationship?.value}
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
                                        label="Instruction for Account Operation"
                                        value={formDetails?.caoRelDetIntructionforAccountOperation?.value}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>


                            </Grid>

                            <Typography variant="h6" >
                                Attorney/Guardian
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="Name of Attorney/Guardian"
                                        value={formDetails?.caoRelDetInstructionNameOfAttoney}
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
                                        label="ID / Passport No."
                                        value={formDetails?.caoRelDetIDPassportNo}
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
                                        label="Power of Attorney Expiry Date"
                                        value={
                                            formDetails?.caoRelDetPowerofAttorneyExpiryDate
                                                ? format(new Date(formDetails.caoRelDetPowerofAttorneyExpiryDate), "yyyy-MM-dd hh:mm a")
                                                : 'N/A'
                                        }
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
                                First Applicant Details
                            </Typography>

                            <Typography variant="h6">
                                Personal
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="First Name"
                                        value={formDetails?.caoAppDetFirstName}
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
                                        value={formDetails?.caoAppDetSecondName}
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
                                        value={formDetails?.caoAppDetSurnameTribe}
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
                                            formDetails?.caoAppDetDateofBirth
                                                ? format(new Date(formDetails.caoAppDetDateofBirth), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoAppDetNationality?.value}
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
                                        value={formDetails?.caoAppDetIDResidentCard}
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
                                            formDetails?.caoAppDetPerExpiryDate
                                                ? format(new Date(formDetails.caoAppDetPerExpiryDate), "yyyy-MM-dd hh:mm a")
                                                : 'N/A'
                                        }
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6">
                                Employment
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="Source of Income"
                                        value={formDetails?.caoAppDetSourceofIncome?.value}
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
                                        value={formDetails?.
                                          caoAppDetSectorifsalary?.value}
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
                                        value={formDetails?.caoAppDetNameofEmployer}
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
                                        value={formDetails?.caoAppDetNatureofBusiness}
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
                                        value={formDetails?.caoAppDetDesignation}
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
                                        value={formDetails?.caoAppDetEmployeeNo}
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
                                            formDetails?.caoAppDetDateofJoining
                                                ? format(new Date(formDetails.caoAppDetDateofJoining), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoAppDetEmploymentTelephone}

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
                                        value={formDetails?.caoAppDetFax}
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
                                        value={formDetails?.caoAppDetIncomepm}
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
                                        value={formDetails?.caoAppDetSourceofOtherIncome}

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
                                        value={formDetails?.caoAppDetPassportNo}
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
                                            formDetails?.caoAppDetPassportExpiryDate
                                                ? format(new Date(formDetails.caoAppDetPassportExpiryDate), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoAppDetVisaNo}

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
                                            formDetails?.caoAppDetVisaExpiryDate
                                                ? format(new Date(formDetails.caoAppDetVisaExpiryDate), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoAppDetPOBox}
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
                                        value={formDetails?.caoAppDetPostalCode}
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
                                        value={formDetails?.caoAppDetHouseNoFlatNo}
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
                                        value={formDetails?.caoAppDetBuildingNo}
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
                                        value={formDetails?.caoAppDetWayNo}
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
                                        value={formDetails?.caoAppDetArea?.value}
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
                                        value={formDetails?.caoAppDetWilayat}

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
                                        value={formDetails?.caoAppDetResTelNo}

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
                                        value={formDetails?.caoAppDetMobile1}
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
                                        value={formDetails?.caoAppDetMobile2}
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
                                        value={formDetails?.caoAppDetEmail}

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
                                        value={formDetails?.caoAppDetPermanentAddressHomeCountry}
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
                                        value={formDetails?.caoAppDetTelephone}

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

                            <Typography variant="h6">
                                Personal
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="First Name"
                                        value={formDetails?.caoSecAppDetFirstName}
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
                                        value={formDetails?.caoSecAppDetSecondName}
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
                                        value={formDetails?.caoSecAppDetSurnameTribe}
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
                                            formDetails?.caoSecAppDetDateofBirth
                                                ? format(new Date(formDetails.caoSecAppDetDateofBirth), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoSecAppDetNationality?.value}
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
                                        value={formDetails?.caoSecAppDetIDResidentCard}
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
                                            formDetails?.caoSecAppDetPerExpiryDate
                                                ? format(new Date(formDetails.caoSecAppDetPerExpiryDate), "yyyy-MM-dd hh:mm a")
                                                : 'N/A'
                                        }
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6">
                                Employment
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="Source of Income"
                                        value={formDetails?.caoSecAppDetSourceofIncome?.value}
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
                                        value={formDetails?.caoSecAppDetSectorifsalary}
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
                                        value={formDetails?.caoSecAppDetNameofEmployer}
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
                                        value={formDetails?.caoSecAppDetNatureofBusiness}
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
                                        value={formDetails?.caoSecAppDetDesignation}
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
                                        value={formDetails?.caoSecAppDetEmployeeNo}
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
                                            formDetails?.caoSecAppDetDateofJoining
                                                ? format(new Date(formDetails.caoSecAppDetDateofJoining), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoSecAppDetEmploymentTelephone}

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
                                        value={formDetails?.caoSecAppDetFax}
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
                                        value={formDetails?.caoSecAppDetIncomepm}
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
                                        value={formDetails?.caoSecAppDetSourceofOtherIncome}

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
                                        value={formDetails?.caoSecAppDetPassportNo}
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
                                            formDetails?.caoSecAppDetPassportExpiryDate
                                                ? format(new Date(formDetails.caoSecAppDetPassportExpiryDate), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoSecAppDetVisaNo}

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
                                            formDetails?.caoSecAppDetVisaExpiryDate
                                                ? format(new Date(formDetails.caoSecAppDetVisaExpiryDate), "yyyy-MM-dd hh:mm a")
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
                                        value={formDetails?.caoSecAppDetPOBox}
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
                                        value={formDetails?.caoSecAppDetPostalCode}
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
                                        value={formDetails?.caoSecAppDetHouseNoFlatNo}
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
                                        value={formDetails?.caoSecAppDetBuildingNo}
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
                                        value={formDetails?.caoSecAppDetWayNo}
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
                                        value={formDetails?.caoSecAppDetArea?.value}
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
                                        value={formDetails?.caoSecAppDetWilayat}

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
                                        value={formDetails?.caoSecAppDetResTelNo}

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
                                        value={formDetails?.caoSecAppDetMobile1}
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
                                        value={formDetails?.caoSecAppDetMobile2}
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
                                        value={formDetails?.caoSecAppDetEmail}

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
                                        value={formDetails?.caoSecAppDetPermanentAddressHomeCountry}
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
                                        value={formDetails?.caoSecAppDetTelephone}

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
                                ATM/Debit Cards
                            </Typography>


                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="ATM/Debit Card Issuance"
                                        value={formDetails?.caoATMDebitCardIssuance?.value}
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
                                        label="Name to Appear on the Card"
                                        value={formDetails?.caoATMDebitCardNameAppearCard}
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
                                        label="Second Applicant-Supplementary C.."
                                        value={formDetails?.caoATMDebitCardSecondApplicantSupplementary}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6">
                                Supplementary Cardholder’s Details
                            </Typography>
                            <Typography variant="body1">
                                Supplementary card to be activated by principal cardholder
                            </Typography>


                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="ID/PP No."
                                        value={formDetails?.caoATMDebitCardIDPPNo}
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
                                        label="Limit to be assigned"
                                        value={formDetails?.caoATMDebitCardLimitassigned}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6" sx={{ color: '#6E2585' }}>
                                Banking Service Required
                            </Typography>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="Cheque Book"
                                        value={formDetails?.caoATMDebitCardChequeBook?.value}
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
                                        label="SMS Alert"
                                        value={formDetails?.caoATMDebitCardSMSAlert?.value}
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
                                                checked={Boolean(formDetails?.caoATMDebitCardEmailAlertsAccountTransactions)}
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
                                        value={formDetails?.caoATMDebitCardChangesEmailFrequency?.value}
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
                                        value={formDetails?.caoATMDebitCardChangesPrintedFrequency?.value}
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
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.caoATMDebitCardGeneralTermsConditions)}
                                                disabled
                                            />
                                        }
                                        label="I/We confirm that the information given above is true and complete, and that I/We have received the Bank’s General Terms and Conditions..."
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="First Name"
                                        value={formDetails?.caoATMDebitCardFirstApplicantName}
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
                                        value={formDetails?.caoATMDebitCardSecondApplicantName}
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
