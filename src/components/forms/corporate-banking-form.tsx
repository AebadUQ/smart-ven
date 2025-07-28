'use client';

import * as React from 'react';
import { CheckBox } from '@mui/icons-material';
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

export default function CorporateBnakingForm({ data }: ProductEditFormProps): React.JSX.Element {
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
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Account Opening
              </Typography>
              <Stack spacing={5}>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Branch</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.selectBranch?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Account Type</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.selectAccountType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Currency</InputLabel>

                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.selectCurrencyType?.map((maping: any) => ' ' + maping?.value) || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Initial Deposit</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.initialDeposit || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Constitution</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.selectConstitutionType || 'N/A'}
                      disabled
                    />
                  </Grid>
                  {formdetails?.constitutionOther && (
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Other</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={formdetails?.constitutionOther || 'N/A'}
                        disabled
                      />
                    </Grid>
                  )}

                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Country of Incorporation</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.selectCountryofIncorporationType?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5" sx={{ color: '#6E2585' }}>
                  Company Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Name of the Company</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.nameoftheCompany || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Commercial Registration (C.R.) No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.commercialRegistrationCR || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Date of Establishment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.dateofEstablishment).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={dayjs(formdetails?.expiryDate).format('MMM D, YYYY h:mm A') || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.phoneNumber || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Registered Address (Location)
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Shop/Building No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.shopBuildingNo || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Way No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.wayNo || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Building Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.buildingName || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Area</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.area || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Mailing Address</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>P.O. Box No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.poBoxNo || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Postal Code</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.postalCode || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.selectCountry?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.email || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              {/*  */}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Partnership / Ownership
              </Typography>
              <Stack spacing={5}>
                {formdetails?.partnership?.map((child: any) => (
                  <Grid container spacing={5}>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={child?.partnershipName || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Percentage (%)</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={child?.partnershipPercentage || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>ID / Passport No.</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={child?.partnershipPassport || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Expiry Date</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={dayjs(child?.partnershipExpiryDate).format('MMM D, YYYY h:mm A') || 'N/A'}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Nature Or Purpose Of Business Entity & Lines Of Business</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Nature or purpose of business entity</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.NatureofBusiness || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Commercial Registration (C.R.) No.</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.LinesofBusinessandProductsOffered || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Major Supplier(s)/Buyer(s)
              </Typography>
              <Stack spacing={5}>
                {formdetails?.majorSuppandBuy?.map((child: any) => (
                  <Grid container spacing={5}>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={child?.majorSuppandBuyName || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Supplier</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={child?.majorSuppandBuySupplier?.value || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Geographical Location(s)</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={child?.majorSuppandBuyGeoLocation?.value || 'N/A'}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}
              </Stack>

              <Stack>
                <Typography variant="h5" sx={{ marginBottom: 3 }}>
                  We Frequently Use Our Account For The Following Business/investment Related Transactions
                </Typography>
                <Grid spacing={10}>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.bussInvestRelatedTransaction?.importPayment} disabled />}
                      label="Import Payment"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.bussInvestRelatedTransaction?.exportPayment} disabled />}
                      label="Export Payment"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.bussInvestRelatedTransaction?.investmentinShares} disabled />
                      }
                      label="Investment in Shares"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.bussInvestRelatedTransaction?.paymentstoSuppliers} disabled />
                      }
                      label="Payments to Suppliers"
                    />
                  </Grid>
                </Grid>

                <Grid spacing={10}>
                  <Grid sx={{ sm: 12, md: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.bussInvestRelatedTransaction?.collectionofSalesProceeds}
                          disabled
                        />
                      }
                      label="Collection of Sales Proceeds"
                    />
                  </Grid>

                  <Grid sx={{ sm: 12, md: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.bussInvestRelatedTransaction?.realEstateInvestment} disabled />
                      }
                      label="Real Estate Investment"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.bussInvestRelatedTransaction?.commissionPaymentReceipts}
                          disabled
                        />
                      }
                      label="Commission Payments/Receipts"
                    />
                  </Grid>
                </Grid>

                <Grid spacing={10}>
                  <Grid container sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.bussInvestRelatedTransaction?.servicesContractsPaymentsReceipts}
                          disabled
                        />
                      }
                      label="Services/Contracts Payments/Receipts"
                    />
                  </Grid>
                  <Grid container sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.bussInvestRelatedTransaction?.other} disabled />}
                      label="Others"
                    />
                  </Grid>
                  {formdetails?.bussInvestRelatedTransaction?.other && (
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel></InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={formdetails?.othersSuppandBuy || 'N/A'}
                        disabled
                      />
                    </Grid>
                  )}
                </Grid>
              </Stack>

              {/*  */}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Expected Cash Deposits / Withdrawal / Cheques
              </Typography>
              <Stack spacing={5}>
                <Typography variant="h5">Cash Deposits</Typography>

                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Average Amount per Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        `Min(${formdetails?.expectDWCavgCashDepMinRO}) - Max (${
                          formdetails?.expectDWCavgCashDepMaxRO
                        }) ` || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Frequency</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.expectDWCfreqCashDep?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Nature of Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.expectDWCcashDepdnatureOfTrans || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Cash Withdrawal</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Average Amount per Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={
                        `Min(${formdetails?.expectDWCavgCashdraMinRO}) - Max (${
                          formdetails?.expectDWCavgCashdraMaxRO
                        }) ` || 'N/A'
                      }
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Frequency </InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.expectDWCfreqCashWithdra?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Nature of Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.expectDWCavgCashdracashWithnatureOfTran || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Cheque Deposited</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Average Amount per Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={
                        `Min(${formdetails?.expectDWCavgCashDepedMinRO}) - Max (${
                          formdetails?.expectDWCavgCashDepedMaxRO
                        }) ` || 'N/A'
                      }
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Frequency </InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.expectDWCfreqCashDeped?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Nature of Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.expectDWCcashDepnatureOfTran || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              {/*  */}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Inward Remittance – Foreign
              </Typography>
              <Stack spacing={5}>
                <Typography variant="h5">Inward Remittance – Foreign</Typography>

                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Average Amount per Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        `Min (${formdetails?.depRemavgIRFMinRO}) - Max (${formdetails?.depRemavgIRFMaxRO})` || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>No. of Transactions per month</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        `Min (${formdetails?.depRemnoOfTransIRFMin}) - Max (${formdetails?.depRemnoOfTransIRFMax})` ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransIRFCountry?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Purpose of Remittance</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransIRFRemitt || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Inward Remittance – Local</Typography>

                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Average Amount per Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        `Min (${formdetails?.depRemavgIRLMinRO}) - Max (${formdetails?.depRemavgIRLMaxRO})` || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>No. of Transactions per month</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        `Min (${formdetails?.depRemnoOfTransIRLMin}) - Max (${formdetails?.depRemnoOfTransIRLMax})` ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransIRLCountry?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Purpose of Remittance</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransIRLRemitt || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Outward Remittance – Foreign</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Average Amount per Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={
                        `Min (${formdetails?.depRemavgORFMinRO}) - Max (${formdetails?.depRemavgORFMaxRO})` || 'N/A'
                      }
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>No. of Transactions per month</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        `Min (${formdetails?.depRemnoOfTransORFMin}) - Max (${formdetails?.depRemnoOfTransORFMax})` ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransORFCountry?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Purpose of Remittance</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransOutRFRemitt || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Outward Remittance – Local</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Average Amount per Transaction</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={
                        `Min (${formdetails?.depRemavgORLMinRO}) - Max (${formdetails?.depRemavgORLMaxRO})` || 'N/A'
                      }
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>No. of Transactions per month</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        `Min (${formdetails?.depRemnoOfTransORLMin}) - Max (${formdetails?.depRemnoOfTransORLMax})` ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransORLCountry?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Purpose of Remittance</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.depRemnoOfTransORLRemitt || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              {/*  */}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Financial Information
              </Typography>
              <Grid container>
                <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                  <Stack spacing={5}>
                    <Typography variant="h6">Annual Sales</Typography>

                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Amount</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfAnualSaleAmt || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Amount Current Year</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfAnualSaleCYRO || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Amount Last Year</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfAnualSaleLYRO || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                  <Stack spacing={5}>
                    <Typography variant="h6">Profit</Typography>

                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Amount</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfProfAmt || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Amount Current Year</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={
                            `Min (${formdetails?.finInfProfCYMinRO}) - Max(${formdetails?.finInfProfLYMaxRO})` || 'N/A'
                          }
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Amount Last Year</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfProfLYMaxRO || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={3}>
                <Typography variant="h5">Capital</Typography>
                <Grid spacing={4} container>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Authorised</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.finInfCapAuth || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Paid Up</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.finInfCapPaidUp || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Trade Finance Service Activity
              </Typography>
              <Grid container>
                <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                  <Stack spacing={5}>
                    <Typography variant="h6">Import Letters of Credit (LC)</Typography>

                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Monthly Turnover (RO)</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfILCMTRO || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Import from/Export to</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfILCIE?.value || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Description of Comodities</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfILCDC || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                  <Stack spacing={5}>
                    <Typography variant="h6">Export Letters of Credit (EXLC)</Typography>

                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Monthly Turnover (RO)</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfELCMTRO || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Import from/Export to</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfELCIE?.value || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Description of Comodities</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfELCDC || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container>
                <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                  <Stack spacing={5}>
                    <Typography variant="h6">Letters of Guarantee (LG)</Typography>

                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Monthly Turnover (RO)</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfLGMT || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Import from/Export to</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfLGIE?.value || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Description Of commodities</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfLGDC || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                  <Stack spacing={5}>
                    <Typography variant="h6">Documentary Collections (DC)</Typography>

                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Monthly Turnover (RO)</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfDCMT || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Import from/Export to</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfDCIE?.value || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <InputLabel>Description Of Commodities</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.finInfDCDC || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            {/*  */}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Stack spacing={5}>
                <Typography variant="h5">Banking Products of Interest</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsFinancingFacilities
                          )}
                          disabled
                        />
                      }
                      label="Financing Facilities"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsPortfolioInvestment
                          )}
                          disabled
                        />
                      }
                      label="Portfolio Investment"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsRemittances
                          )}
                          disabled
                        />
                      }
                      label="Remittances"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsChequeBookFacility
                          )}
                          disabled
                        />
                      }
                      label="Cheque Book Facility"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            formdetails?.bankProIntbankingProducts
                              ?.bankProIntbankingProductsSalaryRelatedFinancingEmployees
                          )}
                          disabled
                        />
                      }
                      label="
Salary Related Financing to the employees"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            formdetails?.bankProIntbankingProducts
                              ?.bankProIntbankingProductsSalaryDisbursementthroughBankNizwa
                          )}
                          disabled
                        />
                      }
                      label="Salary Disbursement through Bank Nizwa"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(
                            formdetails?.bankProIntbankingProducts
                              ?.bankProIntbankingProductsCollectionACwithInteriorBranches
                          )}
                          disabled
                        />
                      }
                      label="Collection A/C with Interior Branches"
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h5" sx={{ color: '#6E2585' }}>
                  Details Of Holding / Associate / Subsidiary (If Applicable)
                </Typography>
                {formdetails?.bankProIntHAS?.map((map: any) => (
                  <Grid container>
                    <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                      <Stack spacing={5}>
                        <Grid size={{ xs: 12 }} spacing={5} container>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <InputLabel>Branches/Associate/Subsidiary</InputLabel>
                            <OutlinedInput
                              sx={{
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderRadius: 'none',
                              }}
                              value={map?.bankProIntHASBranchesAssociateSubsidiary || 'N/A'}
                              disabled
                            ></OutlinedInput>
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <InputLabel>Holding</InputLabel>
                            <OutlinedInput
                              sx={{
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderRadius: 'none',
                              }}
                              value={map?.bankProIntHASHolding || 'N/A'}
                              disabled
                            ></OutlinedInput>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                      <Stack spacing={5}>
                        <Grid size={{ xs: 12 }} spacing={5} container>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <InputLabel>Location</InputLabel>
                            <OutlinedInput
                              sx={{
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderRadius: 'none',
                              }}
                              value={map?.bankProIntHASLocation?.value || 'N/A'}
                              disabled
                            ></OutlinedInput>
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <InputLabel>Activity</InputLabel>
                            <OutlinedInput
                              sx={{
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderRadius: 'none',
                              }}
                              value={map?.bankProIntHASActivity?.value || 'N/A'}
                              disabled
                            ></OutlinedInput>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Please send our Statement</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(formdetails?.bankProIntHASStatement?.bankProIntHASStatementWeekly)}
                          disabled
                        />
                      }
                      label="Weekly"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(formdetails?.bankProIntHASStatement?.bankProIntHASStatementFortnightly)}
                          disabled
                        />
                      }
                      label="Fortnightly"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(formdetails?.bankProIntHASStatement?.bankProIntHASStatementMonthly)}
                          disabled
                        />
                      }
                      label="Monthly"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(formdetails?.bankProIntHASStatement?.bankProIntHASStatementasPerLetter)}
                          disabled
                        />
                      }
                      label="As per letter"
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack>
                <Typography variant="h6" sx={{ marginVertival: 3 }}>
                  The Account Operated By:
                </Typography>
                <Stack flexDirection="row">
                  <FormControlLabel
                    sx={{ marginTop: 5 }}
                    control={
                      <Checkbox
                        disabled
                        checked={formdetails?.bankProIntAccountOperatedByInstructionAccountOperation}
                      />
                    }
                    label={formdetails?.bankProIntAccountOperatedByInstructionAccountOperation?.value || 'N/A'}
                  />
                  {formdetails?.bankProIntAccountOperatedByInstructionAccountOperationOthers && (
                    <Grid size={{ xs: 12, md: 3, sm: 6 }} sx={{ marginTop: 'auto' }}>
                      <InputLabel></InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                        }}
                        value={formdetails?.bankProIntAccountOperatedByInstructionAccountOperationOthers || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Grid>
                  )}
                </Stack>
              </Stack>
            </Stack>

            {/*  */}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                We Currently Have An Account With
              </Typography>
              {formdetails?.bankProIntCurrentlyHaveanAccountWith?.map((map: any) => (
                <Grid container>
                  <Grid>
                    <InputLabel>Bank Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={map?.bankProIntCurrentlyHaveanAccountWithBankName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid>
                    <InputLabel>Branch</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={map?.bankProIntCurrentlyHaveanAccountWithBranch?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              ))}
            </Stack>

            {/*  */}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                FATCA Classification
              </Typography>
              <Stack spacing={5}>
                <Typography variant="h5">Part 1 - FATCA Classification</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Account Operated by</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.fatcaClassAccountOperatedBy?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  {formdetails?.fatcaClassAccountOperatedByOtherPleaseSpecify && (
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Other specify</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={formdetails?.fatcaClassAccountOperatedByOtherPleaseSpecify || 'N/A'}
                        disabled
                      />
                    </Grid>
                  )}
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Country of Tax Residence</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.fatcaClassCountryofTaxResidance?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Listed on Stock Exchange</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.fatcaClassListedonStockExchange?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Part 1 - Classification Of Entity</Typography>

                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Exempt Beneficial Owner (EBO)</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.fatcaClassEBO?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Financial Institution (FI)?</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.fatcaClassFI?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Non-Financial Foregin Entity (NFFE)?</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.fatcaClassNFFE?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h5">Section C.1: Beneficial Owner / Controlling Person</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 6, xs: 12, sm: 6 }} sx={{ width: '100%' }}>
                    <InputLabel>Is any of the shareholders is owning 10% and above is US person?</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.fatcaClassSahreholdersBeneOwnerControlPerson?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Section C.1: Beneficial Owner / Controlling Person
              </Typography>
              <Stack spacing={5}>
                {formdetails?.fatcaClassBeneficialOwnerControllingPerson?.map((map: any) => (
                  <Grid container spacing={5}>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonName || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>U.S. Citizen/Green Card Holder/Tax Res.</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonUSCitizenCardTax?.value || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Place of Birth</InputLabel>

                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonPlaceofBirth?.value || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>PhoneNumber</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonContact || 'N/A'}
                        disabled
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>TIN (If applicable)</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonTIN || 'N/A'}
                        disabled
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Ownership %</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonOwnership || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Position</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonPosition || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                      <InputLabel>Address</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100%',
                        }}
                        value={map?.fatcaClassBeneficialOwnerControllingPersonAddress?.value || 'N/A'}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}
              </Stack>

              {/*  */}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Common Reporting Standard (CRS)
              </Typography>

              <Grid container spacing={5}>
                {formdetails?.crsTINList?.map((item: any, index: any) => (
                  <Grid size={{ sm: 12, md: 3 }}>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={item?.crsTINCountry?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                ))}

                {formdetails?.crsTINList?.map((item: any, index: any) => (
                  <Grid size={{ sm: 12, md: 3 }}>
                    <InputLabel>TIN</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={item?.crsTINNumber || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                ))}

                <Grid size={{ sm: 12, md: 3 }}>
                  <InputLabel>Reason for no Tin </InputLabel>
                  <OutlinedInput
                    sx={{
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderRadius: 'none',
                    }}
                    value={formdetails?.crsTINUnavailableReason?.value || 'N/A'}
                    disabled
                  ></OutlinedInput>
                </Grid>

                {/* <Grid size={{ sm: 12, md: 3 }}>
                  <InputLabel>PhoneNumber</InputLabel>
                  <OutlinedInput
                    sx={{
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderRadius: 'none',
                    }}
                    value={formdetails?.busDebCardCWLBDCPOSONGCCEnableService?.value || 'N/A'}
                    disabled
                  ></OutlinedInput>
                </Grid> */}
              </Grid>

              <Grid container>
                <Stack spacing={5}>
                  <Stack spacing={5}>
                    <Typography variant="h6">Explanation for Selecting Reason B:</Typography>

                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 12 }} sx={{ width: '100%' }}>
                        <InputLabel>Please Explain</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                            width: '100%',
                          }}
                          value={formdetails?.crsTINUnavailableReasonBDescription || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack spacing={5}>
                    <Grid size={{ xs: 12 }} spacing={5} container>
                      <Grid size={{ xs: 12, md: 12 }} sx={{ width: '100%' }}>
                        <InputLabel sx={{ width: '100%' }}>
                          Is any of the controlling person is owning 50% and above from the company shares?
                        </InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.crsControllingPersonOwning?.value || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Beneficial Owner / Ultimate Beneficial Owner
              </Typography>
              <Grid container>
                {/* <Typography variant="h6">POS</Typography> */}
                <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                  <Stack spacing={5}>
                    <Grid size={{ xs: 12 }} spacing={5} container>
                      {formdetails?.crsBeneficialOwner?.map((map: any) => (
                        <Grid size={{ xs: 12, md: 6 }}>
                          <InputLabel>Name of Owner</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                            }}
                            value={map?.crsBeneficialOwnerName || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            {/*  */}
          </CardContent>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                PEP Declaration
              </Typography>
              <Stack spacing={2}>
                <Stack flexDirection="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                  <Typography>
                    1. Are you or any of the company's beneficial owner a current or former Politically Exposed Person
                    (PEP)? To learn more about what "Politically Exposed Person (PEP)" means,
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={formdetails?.pepDeclarationPoliticallyExposedPersonSelectOne?.value}
                      />
                    }
                    label="Yes"
                  />
                  <OutlinedInput value={formdetails?.pepDeclarationPoliticallyExposedPersonSelectOneOptions?.value} />
                </Stack>
                  <Typography>
                    2. Are you or any of the company's beneficial owners a "family member" of a current or former PEP?
                    To learn what "family member" means, click here
                  </Typography>
                <Stack flexDirection="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={formdetails?.pepDeclarationPoliticallyExposedPersonSelectTwo?.value}
                      />
                    }
                    label="Yes"
                  />{' '}
                  <OutlinedInput value={formdetails?.pepDeclarationPoliticallyExposedPersonSelectTwoOptions?.value} />
                </Stack>

                  <Typography>
                    3. Are you or any of the company's beneficial owners a "close associate" of a current or former PEP?
                    To learn what "close associate" means, click here
                  </Typography>
                <Stack flexDirection="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={formdetails?.pepDeclarationPoliticallyExposedPersonSelectThree?.value}
                      />
                    }
                    label="Yes"
                  />
                  <OutlinedInput value={formdetails?.pepDeclarationPoliticallyExposedPersonSelectThreeTextField} />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>

          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Sanctions Undertaking
              </Typography>
              <Stack spacing={2}>
                <Typography>
                  The attached Sanctions Undertaking For Clients shall form integral part of this account opening
                  documentation and I/We hereby affirm and pledge that our business endeavors will not knowingly engage
                  in any form of direct or indirect association with the following sanctioned or embargoed countries:
                  Cuba, Iran, Israel, North Korea, Ukraine, Russia, Belarus, and Syria
                </Typography>

                <Typography>
                  Such association entails, but is not limited to, engaging in financial transactions and services,
                  including payments to/from sanctioned countries, credit card activities, trade finance, insurance, and
                  investments in sanctioned countries.
                </Typography>

                <Typography>
                  1) Transaction on-behalf of third parties’ individuals/entities those have direct/indirect nexus with
                  one or more sanctioned country/ countries
                </Typography>
                <Typography>
                  2) Transport to / from, or (trans) shipment through one or more sanctioned country / countries.{' '}
                </Typography>
                <Typography>
                  3) A company domiciled in, operating out of, or branch/ subsidiary of an entity located in such
                  sanctioned country (including but not limited to banks, government entities and their extended arms){' '}
                </Typography>

                <Typography>
                  4) Seagoing vessels, including oil tankers and cargo vessels, holding the flag of any of the mentioned
                  sanctioned countries, or owned, controlled, charted, or operated directly or indirectly by such
                  sanctioned countries.{' '}
                </Typography>
                <Typography>
                  I/We agree to provide the Bank with any supporting documents upon its request and hereby authorize the
                  Bank to reject any transaction and/ or to discontinue the client
                </Typography>
                <Typography>
                  relationship, if proved otherwise or if the Bank, at its sole assessment and discretion, believes that
                  such business with sanctioned countries dealings do nevertheless exist.
                </Typography>
                <Grid container>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography>Signatory Name:</Typography>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                  <OutlinedInput
                    sx={{}}
                    value={formdetails?.sactionsUndertakingClientsAuthorizedSignatoryName || 'N/A'}
                  ></OutlinedInput>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography sx={{ color: '#6E2585' }} variant="h5">
                Terms and Condition
              </Typography>
              <Stack spacing={4}>
                <Typography>Following Documents Are To Be Enclosed</Typography>
                <Grid spacing={5}>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={
                            formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedArticlesMemorandumofAssociation
                          }
                        />
                      }
                      label="Articles & Memorandum of Association"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox disabled checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedByeLaws} />
                      }
                      label="Bye-Laws (for clubs/societies etc.) and Concerned Ministry’s approval"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedChamberofCommerceCertificate}
                        />
                      }
                      label="Chamber of Commerce Certificate"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={
                            formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedCommercialRegistrationCertificate
                          }
                        />
                      }
                      label="Commercial Registration Certificate"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedComputerExtractPrintout}
                        />
                      }
                      label="Computer Extract Printout
"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedForallpartnershipaccounts}
                        />
                      }
                      label="For all partnership accounts, a company resolution authorising opening and operation of account"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedIDPPCopies}
                        />
                      }
                      label="more of share holding with their ID/PP with valid visa and/or CR copies"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedMinistryofFinanceApproval}
                        />
                      }
                      label="Ministry of Finance Approval for Government Institutions
"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedMunicipalityCertificate}
                        />
                      }
                      label="Municipality Certificate"
                    />
                  </Grid>
                  <Grid sx={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox disabled checked={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedSAOGS} />
                      }
                      label="If S.A.O.G/S.A.O.C/Limited Liability Companies, List of Names of all shareholders with 5% or more of share holding with their ID/PP with valid visa and/or CR copies"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={5}>
                  <Grid size={{ sm: 12, md: 3 }}>
                    <InputLabel>On Behalf of</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.authSigBehalfOfCompany || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
                <Grid size={{ sm: 12, md: 3 }}>
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput
                    sx={{
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderRadius: 'none',
                    }}
                    value={formdetails?.authSigName || 'N/A'}
                    disabled
                  ></OutlinedInput>
                </Grid>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
