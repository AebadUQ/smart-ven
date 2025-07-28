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
import dayjs from 'dayjs';

export interface AccountOpeningFormProps {
  data: any;
}

export default function PersonalFinance({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log(formDetails, 'rabe');
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
                Personal Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>CIF Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinPerDetCIFNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Customer Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinPerDetCustomerName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Marital Status</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinPerDetMaritalStatus?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>No. of Dependents</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinPerDetNoofDependents}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Education Status</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinPerDetEducationStatus?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Residence Status</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinPerDetResidenceStatus?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={5} sx={{ mt: '60px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Financial Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={4} xs={12}>
                  <InputLabel>Purpose of Finance</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetPurposeofFinance?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Finance Amount</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetFinanceAmount}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Monthly Payments (tentative)</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetMonthlyPaymentTentative}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Salary Day of each month</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetMonthlyIncomeSalary}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Additional income amount (RO) if any</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetSalaryDayofEachMonth}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Source of additional income</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetSourceofAdditionalIncome?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Fees & Charges</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetUnitedCreditFeesandCharges?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={5} sx={{ my: '40px' }}>
              <Typography variant="h6" sx={{ color: '#212636', fontSize: '16px' }}>
                Payment Methods
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={4} xs={12}>
                  <InputLabel>SI Account No (if applicable)</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinFinaDetSIAccountNo || "N/A"}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={5} sx={{ mb: '40px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Seller Information
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Dealer/Seller’s Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinSelInfDealerSellerName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Dealer/Seller’s Phone Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinSelInfDealerSellerPhone}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Dealer/Seller’s Email ID</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinSelInfDealerSellerEmail}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Dealer/Seller’s Address</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinSelInfDealerSellerAddress}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Seller ID NO</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinSelInfSellerIDNo}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Seller CR NO (if any)</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.perFinSelInfSellerCRNo}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={5} sx={{ mb: '60px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Banking Relationships
              </Typography>
              {formDetails?.perFinBankingRelationships.map((relation: any) => {
                return (
                  <Grid container spacing={4}>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Bank Name</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={relation?.perFinBanRelBankName}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Account Number</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={relation?.perFinBanRelAccountNumber}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Type of Account</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={relation?.perFinBanRelTypeofAccount?.value}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Relationship Since</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={dayjs(relation?.perFinBanRelRelationshipSince).format('MMM D, YYYY h:mm A')}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Stack>

            <Stack spacing={5} sx={{ mb: '60px', gap: '0px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585', mb: '40px' }}>
                Type of Liability
              </Typography>

              <Stack sx={{ mb: '40px' }}>
                <Typography variant="h6" sx={{ color: '#212636', fontSize: '16px', mb: '20px' }}>
                  Personal Finance
                </Typography>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Bank</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibPersonalFinanceBank}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibPersonalFinanceMonthlyPayment}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibPersonalFinanceAmountOutstanding}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack sx={{ mb: '40px' }}>
                <Typography variant="h6" sx={{ color: '#212636', fontSize: '16px', mb: '20px' }}>
                  Auto Finance
                </Typography>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Bank</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibAutoFinanceBank}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibAutoFinanceMonthlyPayment}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibAutoFinanceAmountOutstanding}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack sx={{ mb: '40px' }}>
                <Typography variant="h6" sx={{ color: '#212636', fontSize: '16px', mb: '20px' }}>
                  Credit Card
                </Typography>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Bank</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibCreditCardBank}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibCreditCardMonthlyPayment}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibCreditCardAmountOutstanding}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack sx={{ mb: '40px' }}>
                <Typography variant="h6" sx={{ color: '#212636', fontSize: '16px', mb: '20px' }}>
                  Home Finance
                </Typography>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Bank</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibHomeFinanceBank}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibHomeFinanceMonthlyPayment}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibHomeFinanceAmountOutstanding}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack>
                <Typography variant="h6" sx={{ color: '#212636', fontSize: '16px', mb: '20px' }}>
                  Other Liability(including 3rd Party Guarantees)
                </Typography>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Bank</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibOtherLibalityBank}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Monthly Payment</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibOtherLibalityMonthlyPayment}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputLabel>Amount Outstanding</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.typLibOtherLibalityAmountOutstanding}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>

            <Stack spacing={5} sx={{ mb: '60px', gap: '0px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585', mb: '40px' }}>
                Reference
              </Typography>

              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography sx={{ fontSize: '16px', color: '#171717', mb: '30px' }}>In Oman</Typography>

                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Name</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInOmanName}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Relationship</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInOmanRelationship?.value}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Employer</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInOmanEmployer}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Address</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInOmanAddress}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Office Tel</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInOmanOfficeTel}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Mobile</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInOmanMobile}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={6} xs={12}>
                  <Typography sx={{ fontSize: '16px', color: '#171717', mb: '30px' }}>
                    In Home Country (For Expatriates / GCC Nationals)
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Name</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInHomeCountryName}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Relationship</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInHomeCountryRelationship?.value}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Employer</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInHomeCountryEmployer}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Address</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInHomeCountryAddress}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Office Tel</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInHomeCountryOfficeTel}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>Mobile</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.refInHomeCountryMobile}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={5} sx={{ mb: '60px', gap: '0px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585', mb: '20px' }}>
                Promise to Purchase/Lease{' '}
              </Typography>
              <Grid item md={3} xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(formDetails?.refPromisetoPurchaseLease)} disabled />}
                  label="I I/We agree to the Promise to Purchase/Lease and acknowledge the terms as outlined in the Goods Murabaha Agreement/Service Ijara Agreement "
                />
              </Grid>
            </Stack>

            <Stack spacing={5} sx={{ mb: '60px', gap: '0px' }}>
              <Typography variant="h6" sx={{ color: '#6E2585', mb: '20px' }}>
                Consent & Declaration
              </Typography>
              <Grid item md={3} xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(formDetails?.refConsentandDeclaration)} disabled />}
                  label="I/We agree to the terms and conditions of this Declaration"
                />
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
