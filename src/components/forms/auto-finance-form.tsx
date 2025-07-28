'use client';

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
import { Grid } from '@mui/system';
import dayjs from 'dayjs';

export interface ProductEditFormProps {
  data: any;
}

export default function AutoFinanceForm({ data }: ProductEditFormProps): React.JSX.Element {
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
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>CIF Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.autoFinPerDetCIFNumber || 'N/A'}
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
                      value={formdetails?.autoFinPerDetCustomerName || 'N/A'}
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
                      value={formdetails?.autoFinPerDetMaritalStatus?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>No. of Dependencies</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinPerDetNoofDependents || 'N/A'}
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
                      value={formdetails?.autoFinPerDetEducationStatus?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

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
                      value={formdetails?.autoFinPerDetResidenceStatus?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Financial Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Vehicle Cost</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.autoFinFinDetVehicleCost || 'N/A'}
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
                      value={formdetails?.autoFinFinDetHamishJiddiyahRO || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Finance Amount</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetFinanceAmount || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>No. of Instalments</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetNoofInstalments || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Monthly Payments (tentative)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetMonthlyPaymentsTentative || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Salary Day of each mounth</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetSalaryDayofeachMonth || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Salary Transfer to Smart Ven</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetSalaryTransfertoBankNizwa?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Payment Method</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetPaymentMethod?.value || 'N/A'}
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
                      value={formdetails?.autoFinFinDetAdditionalIncomeAmountROifany || 'N/A'}
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
                      value={formdetails?.autoFinFinDetSourceofAdditionalIncome?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Unified Credit Life Takaful </InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetUnifiedCreditLifeTakaful?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  {/* <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Fees & Charges</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinFinDetFeesandCharges?.value || 'N/A'}
                      disabled
                    />
                  </Grid> */}
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Payment Methods</Typography>
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
                      value={formdetails?.autFinPayMethodsSIAccountNoifApplicable || 'N/A'}
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
                      value={formdetails?.autFinPayMethodsDirectDebitMandateNumberifApplicable || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Vehicle Information
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Manufacturer</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.autoFinVehInfManufacture || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Model</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfModel || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Condition Type</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfConditionType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Color</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfColor || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Year of Make</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.autoFinVehInfYearofMake).format('DD-MM-YYYY') || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Chassis No</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfChassisNo || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Engine No</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfEngineNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Registration No</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfRegistrationNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Car Mileage</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfCarMileage || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Proposed Date of Delivery</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.autoFinVehInfProposedDateofDelivery).format('MMM D,YYYY h:mm:A') || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Purpose </InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfPurpose || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Vehicle Type</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.autoFinVehInfVehicleType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Seller Information
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Dealer/Seller’s Name</InputLabel>
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
                    <InputLabel>Dealer/Seller’s Phone Number</InputLabel>
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
                    <InputLabel>Dealer/Seller’s Email ID</InputLabel>
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
                    <InputLabel>Dealer/Seller’s Address</InputLabel>
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
                    <InputLabel>Seller ID NO</InputLabel>
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
                    <InputLabel>Seller CR NO (if any)</InputLabel>
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
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Banking Relationships
                </Typography>

                {formdetails?.autoFinBankingRelationships?.map((items: any) => {
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
                          value={items?.autoFinBankRelBankName || 'N/A'}
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
                          value={items?.autoFinBankRelBankAccountNumber || 'N/A'}
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
                          value={items?.autoFinBankRelBankTypeofAccount?.value || 'N/A'}
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
                            dayjs(items?.autoFinBankRelBankRelationshipSince).format('MMM D, YYYY h:mm A') || 'N/A'
                          }
                          disabled
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Type of Liability
                </Typography>
                <Typography variant="h6">Personal Finanace</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.autoFinBankRelPersonalFinanceBank || 'N/A'}
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
                      value={formdetails?.autoFinBankRelPersonalFinanceMonthlyPayment || 'N/A'}
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
                      value={formdetails?.autoFinBankRelPersonalFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Auto Finance</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.autoFinBankRelAutoFinanceBank || 'N/A'}
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
                      value={formdetails?.autoFinBankRelAutoFinanceMonthlyPayment || 'N/A'}
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
                      value={formdetails?.autoFinBankRelAutoFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Credit card</Typography>
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
                      value={formdetails?.autoFinBankRelCreditCardBank || 'N/A'}
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
                      value={formdetails?.autoFinBankRelCreditCardMonthlyPayment || 'N/A'}
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
                      value={formdetails?.autoFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Home Finance</Typography>
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
                      value={formdetails?.autoFinBankRelHomeFinanceBank || 'N/A'}
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
                      value={formdetails?.autoFinBankRelHomeFinanceMonthlyPayment || 'N/A'}
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
                      value={formdetails?.autoFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Typography variant="h6">Other Liability (including 3rd Party Guarantees)</Typography>
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
                      value={formdetails?.autoFinBankRelOtherLiabilityBank || 'N/A'}
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
                      value={formdetails?.autoFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}
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
                      value={formdetails?.autoFinBankRelOtherLiabilityAmountOutstanding || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Total</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.autoFinBankRelTotalMonthlyPayment || 'N/A'}
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
                      value={formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInOmanName || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInOmanRelationship?.value || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInOmanEmployer || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInOmanAddress || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInOmanOfficeTel || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInOmanMobile || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInautoCountryName || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInautoCountryRelationship?.value || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInautoCountryEmployer || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInautoCountryAddress || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInautoCountryOfficeTel || 'N/A'}
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
                            }}
                            value={formdetails?.autoFinInautoCountryMobile || 'N/A'}
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
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.autoFinPromisetoPurchaseLease || false} disabled />}
                      label="I/We agree to the Promise to Purchase/Lease and acknowledge the terms as outlined in the Goods Murabaha Agreement/Service Ijara Agreement "
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Consent & Declaration
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.autoFinConsentandDeclaration || false} disabled />}
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
