'use client';

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

export default function HomeFinanceForm({ data }: ProductEditFormProps): React.JSX.Element {
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
      <Stack spacing={2.5} sx={{ display: 'flex', flexDirection: 'column' }}>
         <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Personal Details
                </Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>CIF Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinPerDetCIFNumber || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Customer Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinPerDetCustomerName || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Martial Status</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinPerDetMaritalStatus?.value || 'N/A'}
                      disabled
                    />
                    {formdetails?.homeFinPerDetMaritalStatusOther &&
                    <Grid size={{xs:12, md:3}} > <InputLabel>Other</InputLabel><OutlinedInput  value={formdetails?.homeFinPerDetMaritalStatusOther}/></Grid>}
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>No. of Dependents</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinPerDetNoofDependents || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Education Status</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinPerDetEducationStatus?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  {formdetails?.homeFinPerDetEducationStatusOther &&
                  <Grid size={{xs:12, md:3}}><InputLabel>Other</InputLabel><OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinPerDetEducationStatusOther || 'N/A'}
                      disabled
                    /></Grid>}

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Residence Status</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinPerDetResidenceStatus?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Financial Details
                </Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Estimated Property Value</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinFinEstimatedPropertyValue || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Hamish Jiddiyah (RO)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetHamishJiddiyahRO || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Amount of Finance Required</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetFinanceAmount || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Tenure</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetTenure || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>No. of Payment(s)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetNoofPayments || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Monthly Payment Amount (tentative)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetMonthlyPaymentAmountTentative || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Type of Financing</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetTypeofFinancing?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Monthly Income/Salary</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetMonthlyIncomeSalary || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Salary Day of each month</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetSalaryDayofeachmonth || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Property Takaful Cover</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetPropertyTakafulCover?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Additional income amount (RO) if any</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetAdditionalIncomeAmountROifany || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Source of additional income</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetSourceofAdditionalIncome?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Unified Credit Life Takaful</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetUnifiedCreditLifeTakaful?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Fees & Charges</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFinDetFeesandCharges?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Payment Methods</Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>SI Account No (if applicable)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinPayMethodsSIAccountNoifApplicable || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Direct Debit Mandate Number (if applicable)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinPayMethodsDirectDebitMandateNumberifApplicable || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Property Form
                </Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Developer</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinProInfDeveloper || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Property Type</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfPropertyType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Business Use</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfBusinessUse?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Main Residence</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfMainResidence?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Renting Out</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfRentingOut?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Estimated Rental Income</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfEstimatedRentalIncome || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Purpose</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfPurpose?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Property Number</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfPropertyNumber || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Property Address</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfPropertyAddress || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Area</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfArea}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Walayat</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinProInfWalayat || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Property Ownership
                </Typography>

                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                {formdetails?.homeFinPropertyOwnership?.map((items: any, index:any) => (
                  <Grid container spacing={5}>
                    <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                      <InputLabel>Name of Seller {index+1}</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          // width: '100%',
                        }}
                        value={items?.homeFinProOwnNameofSeller1 || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Grid>
                    <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                      <InputLabel>Relation to the Applicant</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={items?.homeFinProOwnRelationApplicant?.value || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Seller ID NO</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={items?.homeFinProOwnSellerIDNO || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Seller CR NO (if any)</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={items?.homeFinProOwnSellerCRNOifany || 'N/A'}
                        disabled
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Developer</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={items.homeFinProOwnDeveloper?.value || 'N/A'}
                        disabled
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Project Name</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={items?.homeFinProOwnProjectName || 'N/A'}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}

                {/* <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Name of Seller (1)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.autoFinSelInfDealerSellerName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Relation to the Applicant</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinSelInfDealerSellerPhoneNumber || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Seller ID NO</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinSelInfDealerSellerEmailId || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Seller CR NO (if any)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinSelInfDealerSellerAddress || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Developer</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinSelInfSellerIDNO || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Project Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinSelInfSellerCRNOifany || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid> */}
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Other Assets Owned by Applicant
                </Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>No. of Properties Owned & Value</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinOtherAssetOwnedAppNoofPropertiesOwnedValue || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Is property Financed</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinOtherAssetOwnedAppIsPropertFinanced?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>EMI Amount Per Month</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinOtherAssetOwnedAppEMIAmountPerMonth || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Outstanding Amount</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinOtherAssetOwnedAppOutstandingAmount || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Bank Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinOtherAssetOwnedAppBank || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Banking Relationships
                </Typography>

                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}

                {formdetails?.homeFinBankingRelationships?.map((items: any) => {
                  return (
                    <Grid container spacing={5}>
                      <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                        <InputLabel>Bank Name</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                            // width: '100%',
                          }}
                          value={items?.homeFinBankRelBankName || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                        <InputLabel>Account Number</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                            width: '100%',
                          }}
                          value={items?.homeFinBankRelBankAccountNumber || 'N/A'}
                          disabled
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                        <InputLabel>Type of Account</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                            width: '100%',
                          }}
                          value={items?.homeFinBankRelBankTypeofAccount?.value || 'N/A'}
                          disabled
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                        <InputLabel>Relationship Since</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                            width: '100%',
                          }}
                          value={
                            dayjs(items?.homeFinBankRelBankRelationshipSince).format('MMM D, YYYY h:mm A') || 'N/A'
                          }
                          disabled
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </Stack>
              {/* Type of liability */}
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Type of Liability
                </Typography>
                <Typography variant="h6">Personal Finanace</Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelPersonalFinanceBank || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelPersonalFinanceMonthlyPayment || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelPersonalFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Auto Finance</Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelAutoFinanceBank || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelAutoFinanceMonthlyPayment || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelAutoFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Credit card</Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelCreditCardBank || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelCreditCardMonthlyPayment || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Home Finance</Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelHomeFinanceBank || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelHomeFinanceMonthlyPayment || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6">Other Liability (including 3rd Party Guarantees)</Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelOtherLiabilityBank || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelOtherLiabilityAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Total</Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelTotalMonthlyPayment || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinBankRelTotalAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Reference
                </Typography>
                <Grid container>
                  {/* <Typography variant="h6">In Oman</Typography> */}
                  <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                    <Stack spacing={5}>
                      <Typography variant="h6">In Oman</Typography>

                      <Grid size={{ xs: 12 }} spacing={5} container>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Name</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInOmanName || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Relationship</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInOmanRelationship?.value || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Employer</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInOmanEmployer || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Address</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInOmanAddress || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Office Tel</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInOmanOfficeTel || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Mobile</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInOmanMobile || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                    <Stack spacing={5}>
                      <Typography variant="h6">In Home Country (For Expatriates / GCC Nationals)</Typography>

                      <Grid size={{ xs: 12 }} spacing={5} container>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Name</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInHomeCountryName || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Relationship</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInHomeCountryRelationship?.value || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Employer</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInHomeCountryEmployer || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Address</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInHomeCountryAddress || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Office Tel</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInHomeCountryOfficeTel || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Mobile</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                              // width: '100%',
                            }}
                            value={formdetails?.homeFinInHomeCountryMobile || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Promise to Purchase/Lease
                </Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.homeFinPromisetoPurchaseLease || false} disabled />}
                      label="The Applicant requests the Bank to purchase the Property for onward sale to the Applicant and once the Bank notifies "
                    />

                    {/* /> */}
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Consent & Declaration
                </Typography>
                {/* <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',gap:"20px",justifyContent:"", }}> */}
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.homeFinConsentandDeclaration || false} disabled />}
                      label="I/We agree to the terms and conditions of this Declaration"
                    />

                    {/* /> */}
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
