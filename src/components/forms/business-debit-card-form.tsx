'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Grid, textAlign } from '@mui/system';
import dayjs from 'dayjs';

export interface ProductEditFormProps {
  data: any;
}

export default function BusinessDebitCardForm({ data }: ProductEditFormProps): React.JSX.Element {
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
              <Typography variant="h5">{data?.form_name}</Typography>
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
                      value={formdetails?.busDebCardBranch?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Company General Information
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Company Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.busDebCardCompanyName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>CIF or Account No. with Bank Nizwa</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardCIFAccountNoWithBankNizwa || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Business Category</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardBusinessCategory?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Nature of Business</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardNatureofBusiness || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Card Holder Information (Authorized Person To Use The Card)
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.busDebCardCHIAPCName || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Position</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardCHIAPCPosition || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Nationality</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardCHIAPCNationality?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Email ID</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardCHIPACEmailID || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Civil ID / Resident ID/ Passport</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardCHIPACCivilResidentIDPassport || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Date of Issue of ID / Passport</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.busDebCardCHIPACDateofIssueIDPassport).format('MMM D, YYYY h:mm A') || 'N/A'
                      }
                      disabled
                    />
                  </Grid>

                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Date of Expiry of ID / Passport</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.busDebCardCHIPACDateofExpiryIDPassport).format('MMM D, YYYY h:mm A') || 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Request For New Debit Card
                </Typography>

                <Grid spacing={5} container>
                  <Grid size={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.busDebCardRNDCOpenNewCurrentAC || false} disabled />}
                      label="Open new current a/c & link card"
                    />

                    {/* /> */}
                  </Grid>

                  <Grid size={{ sm: 12, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.busDebCardRNDCLinkCardCurrentAc || false} disabled />}
                      label="Link card to existing current a/c:"
                    />

                    {/* /> */}
                  </Grid>
                </Grid>

                <Grid container spacing={5}>
                  <Grid container size={{ sm: 12 }}>
                    <Grid size={{ md: 6, xs: 12, sm: 6 }}>
                      <InputLabel>Account No.</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                        }}
                        value={formdetails?.busDebCardRNDCAccountNo || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Grid>
                  </Grid>
                  <Grid size={{ md: 3, xs: 12, sm: 6 }}>
                    <InputLabel>Card Holder’s Oman GSM number for OTP</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardRNDCCardHolderOTPNumber || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Corporate short name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardRNDCCorporateShortName || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3, sm: 6 }}>
                    <InputLabel>Card Holder’s official title / short name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.busDebCardRNDCCardHolderOfficeTItleName || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  POS / Cash Withdrawal Limit For Business Debit Card
                </Typography>
                <Grid container spacing={5}>
                  <Grid spacing={5} size={{ xs: 12 }} container>
                    <Grid size={{ sm: 12, md: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              formdetails?.busDebCardCashWithdrawalLimitforBusinessDebitCard
                                ?.busDebCardCashWithdrawalLimitforBusinessDebitCardPOS || false
                            }
                            disabled
                          />
                        }
                        label="POS"
                      />

                      {/* /> */}
                    </Grid>

                    <Grid size={{ sm: 12, md: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              formdetails?.busDebCardCashWithdrawalLimitforBusinessDebitCard
                                ?.busDebCardCashWithdrawalLimitforBusinessDebitCardECommerce || false
                            }
                            disabled
                          />
                        }
                        label="eCommerce"
                      />

                      {/* /> */}
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              formdetails?.busDebCardCashWithdrawalLimitforBusinessDebitCard
                                ?.busDebCardCashWithdrawalLimitforBusinessDebitCardCashWithdrawal || false
                            }
                            disabled
                          />
                        }
                        label="Cash Withdrawal"
                      />

                      {/* /> */}
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              formdetails?.busDebCardCashWithdrawalLimitforBusinessDebitCard
                                ?.busDebCardCashWithdrawalLimitforBusinessDebitCardCashDeposit || false
                            }
                            disabled
                          />
                        }
                        label="Cash Deposit"
                      />
                    </Grid>
                  </Grid>

                  <Stack spacing={5}>
                    <Typography variant="h5">POS</Typography>
                    <Grid container>
                      <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                        <Stack spacing={5}>
                          <Typography variant="h6">OmanNet / GCCnet</Typography>

                          <Grid size={{ xs: 12 }} spacing={5} container>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>Enable Service</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                  // width: '100%',
                                }}
                                value={formdetails?.busDebCardCWLBDCPOSONGCCEnableService?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCPOSONGCCNewDailyLimit || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                        <Stack spacing={5}>
                          <Typography variant="h6">Master Card - International</Typography>

                          <Grid size={{ xs: 12 }} spacing={5} container>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>Enable Service</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCPOSMCIEnableService?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCPOSMCINewDailyLimit || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack spacing={5}>
                    <Typography variant="h5">Ecommerce</Typography>
                    <Grid container spacing={5}>
                      <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                        <Stack spacing={5}>
                          <Typography variant="h6">OmanNet / GCCnet</Typography>

                          <Grid size={{ xs: 12 }} spacing={5} container>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>Enable Service</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCECONGCCEnableService?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCECONGCCNewDailyLimit || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                        <Stack spacing={5}>
                          <Typography variant="h6">Master Card - International</Typography>

                          <Grid size={{ xs: 12 }} spacing={5} container>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>Enable Service</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                  // width: '100%',
                                }}
                                value={formdetails?.busDebCardCWLBDCECMCIEnableService?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCECSMCINewDailyLimit || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack spacing={5}>
                    <Typography variant="h5">Cash With Draw</Typography>
                    <Grid container spacing={5}>
                      {/* <Typography variant="h6">POS</Typography> */}
                      <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                        <Stack spacing={5}>
                          <Typography variant="h6">OmanNet / GCCnet</Typography>

                          <Grid size={{ xs: 12 }} spacing={5} container>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>Enable Service</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCCWONGCCEnableService?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCCWONGCCNewDailyLimit || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }} spacing={5}>
                        <Stack spacing={5}>
                          <Typography variant="h6">Master Card - International</Typography>

                          <Grid size={{ xs: 12 }} spacing={5} container>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>Enable Service</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCCWMCIEnableService?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCCWSMCINewDailyLimit || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack spacing={5}>
                    <Typography variant="h5">Cash Deposit</Typography>
                    <Grid container spacing={5}>
                      <Grid size={{ xs: 12, md: 12 }} spacing={5}>
                        <Stack spacing={5}>
                          <Grid size={{ xs: 12 }} spacing={5} container>
                            <Grid size={{ xs: 12, md: 4 }}>
                              <InputLabel>Enable Service</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCCDONGCCEnableService?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 8 }}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCCDONGCCNewDailyLimit || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                          </Grid>
                          <Grid>
                            <Typography>Duration</Typography>
                            <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 4 }} style={{marginTop:5}}>
                              <InputLabel>New Daily Limit (OMR)</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={formdetails?.busDebCardCWLBDCDuration?.value || 'N/A'}
                                disabled
                              ></OutlinedInput>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>

                              <InputLabel>From</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={dayjs(formdetails?.busDebCardCWLBDCFrom).format('DD/MM/YYYY')}
                                disabled
                              ></OutlinedInput>

                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>

                              <InputLabel>To</InputLabel>
                              <OutlinedInput
                                sx={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  borderRadius: 'none',
                                }}
                                value={dayjs(formdetails?.busDebCardCWLBDCTo).format('DD/MM/YYYY')}
                                disabled
                              ></OutlinedInput>

                            </Grid></Grid>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Declaration
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.busDebCardCWLBDCCDDeclaration || false} disabled />}
                      label="I hereby indemnify Bank Nizwa and hold the Bank harmless against any claim, cost, loss, liability, damage"
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Terms
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 12 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.busDebCardCWLBDCCDTermsandConditions || false} disabled />
                      }
                      label="I/we hereby indemnify Bank Nizwa and hold the Bank  harmless against any claim, cost, loss, liability, damage"
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
