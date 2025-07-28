'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Grid, textAlign } from '@mui/system';
import dayjs from 'dayjs';

export interface ProductEditFormProps {
  data: any;
}

export default function LetterOfGuaranteeApplicationForm({ data }: ProductEditFormProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  console.log('letter', formdetails);

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
      <Stack spacing={5} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  {data?.form_name}
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Branch</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBranch?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Application Ref No</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppApplicationRefNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Choose Language</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppChooseLanguage?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Choose Options</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppChooseOption?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>L/C No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.letterGuartAppBankUseOnlyLCNo || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>

              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Application Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Applicant Name / On Behalf of</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.letterGuartAppApplicantDetailsNameonBehalf || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <InputLabel>Benificiary Address</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppApplicantDetailsAddress || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Telephone No</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppApplicantDetailsTelphoneNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputLabel>Fax</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppApplicantDetailsFax || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Instructing Party Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Instructing Party Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.letterGuartAppApplicantDetailsInstructingPartyName || "N/A"}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <InputLabel>Instructing Party Address</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppApplicantDetailsInstructingPartyAddress || "N/A"}
                      disabled
                    />
                  </Grid>


                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Instructing Party Telephone</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppApplicantDetailsInstructingTelphoneNo || "N/A"}
                      disabled
                    />
                  </Grid>
                  {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Fax</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsFax || "N/A"}
                      disabled
                    />
                  </Grid> */}


                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Beneficiary Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Beneficiary Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsBeneficiaryName || "N/A"}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <InputLabel>Address</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsAddress || "N/A"}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Postal Code</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsPostalCode || "N/A"}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>P.O. BOX</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsPOBox || "N/A"}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Telephone</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsTelephone || "N/A"}
                      disabled
                    />
                  </Grid>
                  {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Fax</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsFax || "N/A"}
                      disabled
                    />
                  </Grid> */}
                  {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Type of Guarantee</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuarantee?.value || "N/A"}
                      disabled
                    />
                  </Grid> */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Other</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuaranteeOther || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Additional Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Currency</InputLabel>
                    {formdetails?.letterGuartAppAddtionalDetailsCurreny?.map((items: any, index: any) => (
                      <Stack direction='row'> <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={items?.value || 'N/A'}
                      disabled
                    ></OutlinedInput></Stack>

                    ))}

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Amount in Figures</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppAddtionalDetailsAmountinFigures || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Amount in Words</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppAddtionalDetailsAmountinWords || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Contract Value in %</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppAddtionalDetailsContractValueinPer || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Purpose (Project)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppAddtionalDetailsPurposeProject || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputLabel>Text of Guarantee</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppAddtionalDetailsTextofGuarantee?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  </Grid>
                  <Grid container spacing={5}>
                  <Grid size={{ sm: 12, md:3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.
                        letterGuartAppAddtionalDetailsRenewableAutomatically || false} disabled />}
                      label="Renewable Automatically"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Valid From</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.letterGuartAppAddtionalDetailsValidFrom).format('MMM D, YYYY h:mm A') ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Valid Until</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.letterGuartAppAddtionalDetailsValidUntil).format('MMM D, YYYY h:mm A')}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Declaration
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.letterGuartAppDeclarationDeductionCharges || false} disabled />
                      }
                      label="We irrevocably authorize you (i.e. the Bank) to deduct from our accounts with you for any cash margin, commissions, swift, courier service, or any other expenses incurred by you under this Letter of Guarantee (“Guarantee”)."
                    />

                  </Grid>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ textAlign: 'strat' }}
                          checked={formdetails?.letterGuartAppDeclarationGeneralTermsConditions || false}
                          disabled
                        />
                      }
                      label="We here by declare that we have read, understood, and agree with the General Terms and Conditions related to this Guarantee."
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputLabel>Account Number</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppDeclarationAccountNo || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputLabel>Customer Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.letterGuartAppDeclarationCustomerName || 'N/A'}
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
