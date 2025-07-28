'use client';

import * as React from 'react';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';
import dayjs from 'dayjs';

export interface AccountOpeningFormProps {
  data: any;
}

export default function PrimarySupplementaryCardServiceRequestForm({
  data,
}: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;
  console.log('primary form:', formDetails);

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
        {/* {formDetails?.csrRequestType?.value === 'Request for new card' ? ( */}
        <Card>
          <CardContent>
            <Stack spacing={4}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Card Service Request Form
              </Typography>
              <Grid container spacing={4}></Grid>

              <Grid item md={12} xs={12}>
                {/* <Grid item md={3} xs={12}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Request Type"
                      value={formDetails?.csrRequestType?.value}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid> */}
              </Grid>
              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Account Number"
                    value={formDetails?.primSuppCSRAccountNumber}
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
                    label="Card Number"
                    value={formDetails?.primSuppCSRCardNumber}
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
                    value={formDetails?.primSuppCSRBranch?.value}
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
                    value={formDetails?.primSuppCSRCardType?.value}
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
                    label="Card Relationship"
                    value={formDetails?.primSuppCSRCardRelationship?.value}
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
                    value={formDetails?.primSuppCSRCIFType}
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
                    label="Card Holder Name"
                    value={formDetails?.primSuppCSRNameofCardholder}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Name on Card
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Title"
                    value={formDetails?.primSuppCSRTitle?.value}
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
                    value={formDetails?.primSuppCSRFirstName}
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
                    value={formDetails?.primSuppCSRSecondName}
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
                    value={formDetails?.primSuppCSRSurnameTribe}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>
              <Stack spacing={5} flexDirection={'column'}>
                <Grid container>
                  <Grid md={3} xs={12}></Grid>
                </Grid>
              </Stack>


            </Stack>
          </CardContent>
        </Card>
        {/* // ) : ( */}
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant='h6' style={{color:'#6E2585'}}>REQUEST NEW PRIMARY/SUPPLEMENTARY* CARD</Typography>
              <Grid container spacing={3}>
              <Grid item md={6} xs={12} style={{ width: '100%' }}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Card Relationsip"
                      value={
                       formDetails?.primSuppCSRCardRelationship?.value
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
              <Grid item md={6} xs={12} style={{ width: '100%' }}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Name on Card"
                      value={
                       formDetails?.primSuppRNPSCNameonCard
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid></Grid>

            </Stack>
          </CardContent>
        </Card>
        <>
          <Card>
            <CardContent>
              <Stack spacing={4}>
                <Typography variant="h6">Card Maintaince Request</Typography>

                <Stack flexDirection={'row'} spacing={5}>
                  <Grid xs={12} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrCardRenewalByDateCheckBox)} disabled />}
                      label="Card Renewal"
                    />
                  </Grid>

                  <Grid item md={9} xs={12} style={{ width: '100%' }}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Card Renewal"
                      value={
                        formDetails?.csrCardRenewalByDate
                          ? format(new Date(formDetails.csrCardRenewalByDate), 'yyyy-MM-dd hh:mm a')
                          : 'N/A'
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Stack>
                <Stack flexDirection={'row'} spacing={5}>
                  <Grid xs={12} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrPinRegenerationReset)} disabled />}
                      label="PIN Regeneration / Reset"
                    />
                  </Grid>
                </Stack>
                <Stack flexDirection={'column'}>
                  <Grid item md={3} xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrAddressChange)} disabled />}
                      label="Address Change"
                    />
                  </Grid>
                  <Grid container style={{ marginTop: 10 }}>
                    <Grid xs={12} md={3}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="P.O BOX"
                        value={formDetails?.csrAddressChangePOBox || 'N/A'}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid xs={12} md={3}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="PC:"
                        value={formDetails?.csrAddressChangePC || 'N/A'}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid xs={12} md={3}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="GSM"
                        value={formDetails?.csrAddressChangeGSM || 'N/A'}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid xs={12} md={3}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="Residential Tel:"
                        value={formDetails?.csrAddressChangeResTel || 'N/A'}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                        variant="standard"
                        fullWidth
                        label="Address:"
                        value={formDetails?.csrAddressChangeEmail || 'N/A'}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                  </Grid>
                </Stack>

                <Stack flexDirection={'row'} spacing={5}>
                  <Grid xs={12} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrCardRenewalByDateCheckBox)} disabled />}
                      label="Updated Salary"
                    />
                  </Grid>

                  <Grid item md={9} xs={12} style={{ width: '100%' }}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Updated Salary"
                      value={formDetails?.csrUpdatedSalaryAmount || 'N/A'}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Stack>
                <Stack flexDirection={'row'} spacing={5}>
                  <Grid xs={12} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrUpdatedEmployerName)} disabled />}
                      label="Updated Employer Name"
                    />
                  </Grid>
                  {formDetails?.csrUpdatedEmployerName && (
                    <>
                      <Grid xs={12} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Boolean(formDetails?.csrUpdatedEmployerNameSelectField?.value)}
                              disabled
                            />
                          }
                          label={formDetails?.csrUpdatedEmployerNameSelectField?.value}
                        />
                      </Grid>
                      <Grid xs={12} md={3}>
                        <TextField
                          variant="standard"
                          fullWidth
                          label="Emplyee Name"
                          value={formDetails?.csrUpdatedEmployerNameTextField || 'N/A'}
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={{ borderBottom: '1px solid #ccc' }}
                        />
                      </Grid>
                    </>
                  )}
                </Stack>

                <Stack flexDirection={'row'} spacing={5}>
                  <Grid xs={12} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrCardLimitChange)} disabled />}
                      label="Card limit change from OMR"
                    />
                  </Grid>

                  <Grid item md={9} xs={12} style={{ width: '100%' }}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Card limit change from OMR"
                      value={formDetails?.csrCardLimitChangeTextField ? formDetails.csrCardLimitChangeTextField : 'N/A'}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Stack>
                <Stack flexDirection="row">
                  <Grid container>
                    <Grid xs={12} md={3}>
                      <FormControlLabel
                        control={<Checkbox checked={Boolean(formDetails?.csrChangeCreditCardType)} disabled />}
                        label="Change Credit Card type"
                      />
                    </Grid>
                    <Grid item md={4} xs={12} style={{ width: '100%' }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="From"
                        value={
                          formDetails?.csrChangeCreditCardTypeFrom
                            ? formDetails.csrChangeCreditCardTypeFrom?.value
                            : 'N/A'
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} style={{ width: '100%' }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="To"
                        value={formDetails?.csrChangeCreditCardTypeTo ? formDetails.csrChangeCreditCardTypeTo : 'N/A'}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                  </Grid>
                </Stack>
                {/*  */}

                <Stack flexDirection="row">
                  <Grid container>
                    <Grid xs={12} md={3}>
                      <FormControlLabel
                        control={<Checkbox checked={Boolean(formDetails?.csrDuplicateMonthlyStatementFor)} disabled />}
                        label="Duplicate monthly statement for"
                      />
                    </Grid>
                    <Grid item md={4} xs={12} style={{ width: '100%' }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="From"
                        value={
                          formDetails?.csrDuplicateMonthlyStatementForFrom
                            ? dayjs(formDetails?.csrDuplicateMonthlyStatementForFrom).format('DD-MM-YYYY')
                            : 'N/A'
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Grid>
                    <Grid item md={4} xs={12} style={{ width: '100%' }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        label="To"
                        value={
                          formDetails?.csrDuplicateMonthlyStatementForTo
                            ? dayjs(formDetails?.csrDuplicateMonthlyStatementForTo).format('DD-MM-YYYY')
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

                <Grid container spacing={2} alignItems="center" sx={{ color: '#6E2B8C', width: '100%' }}>
                  {/* Checkbox: Card Replacement Due to Following Reasons */}
                  <Grid item xs={12} sm={5}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrCardReplacementReasonCheckBox)} disabled />}
                      label="Card Replacement Due to Following Reasons:"
                    />
                  </Grid>

                  {formDetails?.csrCardReplacementReason?.value && (
                    <Grid item xs={12} sm={2.5}>
                      <FormControlLabel
                        control={<Checkbox checked={Boolean(formDetails?.csrCardReplacementReason?.value)} disabled />}
                        label={formDetails?.csrCardReplacementReason?.value}
                      />
                    </Grid>
                  )}

                  {/* Text Input: Other Replacement Reason */}
                  <Grid item xs={12} sm={4.5}>
                    <TextField
                      fullWidth
                      label="Other Reason"
                      value={formDetails?.csrOtherReplacementReason || 'N/A'}
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}></Grid>
              </Stack>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Stack spacing={4}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Link / Delink - Default Account
                </Typography>
               <Grid container direction="column" spacing={2}>
      {/* ✅ Add Link Account */}
      {formDetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount && (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label="Add Link Account No.:"
            />
          </Grid>
          <Grid item>
            <TextField
              value={formDetails?.csrAddLinkAccountTextField || 'N/A'}
              label="Account No."
              size="small"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 12, color: '#6E2B8C' }}>
              Type of account:
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label={formDetails?.csrAddLinkAccountSelectField?.value || 'N/A'}
            />
          </Grid>
        </Grid>
      )}

      {/* ✅ Remove Link Account */}
      {formDetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount && (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label="Remove Link Account No.:"
            />
          </Grid>
          <Grid item>
            <TextField
              value={formDetails?.csrRemoveLinkAccountTextField || 'N/A'}
              label="Account No."
              size="small"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 12 }}>
              Type of account:
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label={formDetails?.csrRemoveLinkAccountSelectField?.value || 'N/A'}
            />
          </Grid>
        </Grid>
      )}

      {/* ✅ Change Link Account */}
      {formDetails?.csrAddRemoveChangeDefaultLinkAccount?.csrChangeLinkAccount && (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControlLabel
                control={<Checkbox checked disabled />}
                label="Change Link Account from Account No.:"
              />
            </Grid>
            <Grid item>
              <TextField
                value={formDetails?.csrChangeLinkAccountFrom || 'N/A'}
                label="From Account No."
                size="small"
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 12, color: '#6E2B8C' }}>to:</Typography>
            </Grid>
            <Grid item>
              <TextField
                value={formDetails?.csrChangeLinkAccountTo || 'N/A'}
                label="To Account No."
                size="small"
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 12, color: '#6E2B8C' }}>
                Type of account:
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox checked disabled />}
                label={formDetails?.csrChangeLinkAccountSelectField?.value || 'N/A'}
              />
            </Grid>
          </Grid>
        </>
      )}

      {/* ✅ Change Default Account */}
      {data?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount && (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label="Change Default Account to Account No.:"
            />
          </Grid>
          <Grid item>
            <TextField
              value={formDetails?.csrDefaultAccountTextField || 'N/A'}
              label="Account No."
              size="small"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 12, color: '#6E2B8C' }}>
              Type of account:
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label={formDetails?.csrDefaultAccountSelectField?.value || 'N/A'}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
              </Stack>
            </CardContent>
          </Card>
          <Card>
            <CardContent>



              <Stack spacing={4}>
      {/* Section Title */}
      <Typography variant="h6" sx={{ color: '#6E2585' }}>
        POS / CASH WITHDRAWAL / FUND TRANSFER LIMIT CHANGE REQUEST FOR DEBIT CARD
      </Typography>

      {/* Network Checkboxes */}
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <FormControlLabel
            control={<Checkbox checked={!!formDetails?.csrOnUsBankNizwa} disabled />}
            label="ON-US / Smart Ven"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FormControlLabel
            control={<Checkbox checked={!!formDetails?.csrMasterCard} disabled />}
            label="MasterCard"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FormControlLabel
            control={<Checkbox checked={!!formDetails?.csrOmanNet} disabled />}
            label="OmanNet"
          />
        </Grid>
      </Grid>

      {/* --- ON-US / Smart Ven --- */}
      <Typography variant="h6">ON-US / Smart Ven</Typography>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography>Cash</Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Usage Daily Limit (OMR)"
            value={formDetails?.csrOnUsBankNizwaCashUsageDailyLimit || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Number of Frequency Per Day"
            value={formDetails?.csrOnUsBankNizwaCashNoOfFreqPerDay || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography>Fund Transfer</Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Usage Daily Limit (OMR)"
            value={formDetails?.csrOnUsBankNizwaFundUsageDailyLimit || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Number of Frequency Per Day"
            value={formDetails?.csrOnUsBankNizwaFundNoOfFreqPerDay || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>

      {/* --- MasterCard --- */}
      <Typography variant="h6">MasterCard</Typography>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography>POS</Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Usage Daily Limit (OMR)"
            value={formDetails?.csrMasterCardPOSUsageDailyLimit || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Number of Frequency Per Day"
            value={formDetails?.csrMasterCardPOSNoOfFreqPerDay || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography>Cash</Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Usage Daily Limit (OMR)"
            value={formDetails?.csrMasterCardCashUsageDailyLimit || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Number of Frequency Per Day"
            value={formDetails?.csrMasterCardCashNoOfFreqPerDay || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>

      {/* --- OmanNet --- */}
      <Typography variant="h6">OmanNet</Typography>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography>POS</Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Usage Daily Limit (OMR)"
            value={formDetails?.csrOmannetPOSUsageDailyLimit || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Number of Frequency Per Day"
            value={formDetails?.csrOmannetPOSCashNoOfFreqPerDay || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography>Cash</Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Usage Daily Limit (OMR)"
            value={formDetails?.csrOmannetCashUsageDailyLimit || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Number of Frequency Per Day"
            value={formDetails?.csrOmannetCashNoOfFreqPerDay || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item md={3}>
          <Typography>Fund Transfer</Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Usage Daily Limit (OMR)"
            value={formDetails?.csrOmannetFundTransferUsageDailyLimit || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Number of Frequency Per Day"
            value={formDetails?.csrOmannetFundTransferNoOfFreqPerDay || 'N/A'}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
      </Grid>

      {/* Select Duration */}
      <Grid container spacing={4}>
        <Grid item md={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Select Duration"
            value={formDetails?.csrSelectDuration?.value || ''}
            InputProps={{ readOnly: true }}
            sx={{ borderBottom: '1px solid #ccc' }}
          />
        </Grid>
         <Grid item xs={12} sm={3} md={2}>
    <TextField
      fullWidth
      variant="standard"
      label="From"
      value={formDetails?.csrSelectDurationTempFrom ? dayjs(formDetails?.csrSelectDurationTempFrom).format('DD-MM-YYYY') : 'N/A'}
      InputProps={{ readOnly: true }}
      sx={{ borderBottom: '1px solid #ccc' }}
    />
  </Grid>
  <Grid item xs={12} sm={3} md={2}>
    <TextField
      fullWidth
      variant="standard"
      label="To"
      value={formDetails?.csrSelectDurationTempTo ? dayjs(formDetails?.csrSelectDurationTempTo).format('DD-MM-YYYY') : 'N/A'}
      InputProps={{ readOnly: true }}
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
                  Supplementary Credit Card Limit Per Day
                </Typography>

                <Grid container spacing={5}>
                  <Grid item md={3} xs={12}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Retail/POS Trax Frequency"
                      value={formDetails?.csrRetailPOSTraxFrequency || "N/A"}
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
                      value={formDetails?.csrRetailPOSAmount || 'N/A'}
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
                      label="ATM cash Trax Frequency"
                      value={formDetails?.csrATMCashTraxFrequency || "N/A"}
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
                      label="ATM cash amount"
                      value={formDetails?.csrATMCashAmount || "N/A"}
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
                      value={formDetails?.csrRetailPOSAmountPerTransaction || "N/A"}
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
                      value={formDetails?.csrATMCashAmountPerTransaction || "N/A"}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6">Card Cancellation Request</Typography>

               <Grid container direction="column" spacing={3} px={2} py={2}>
      <Grid item>
        <Typography sx={{ fontSize: 14 }}>
          Kindly request to cancel my card due to the following reasons:
        </Typography>
      </Grid>

      {/* Row 1: Card Services / Transfer Salary */}
      <Grid item>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={!!formDetails?.csrCardService} disabled />}
              label="Card Services"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControlLabel
              control={
                <Checkbox checked={!!formDetails?.csrTransferMySalaryToAnotherBank} disabled />
              }
              label="Transfer my Salary to another bank"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Row 2: Finance Top-Up / Customer Services */}
      <Grid item>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={!!formDetails?.csrRequestForFinanceTopUp} disabled />}
              label="Request for Finance Top-Up"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={!!formDetails?.csrCustomerService} disabled />}
              label="Customer Services"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Row 3: Fees and Charges */}
      <Grid item>
        <FormControlLabel
          control={<Checkbox checked={!!formDetails?.csrFeesAndChanges} disabled />}
          label="Fees and Charges"
        />
      </Grid>

      {/* Row 4: Customer Request + Input */}
      <Grid item>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={3} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={!!formDetails?.csrCardCancellationOthers} disabled />}
              label="Customer Request"
            />
          </Grid>
          {formDetails?.csrCardCancellationOthersTextField && (
            <Grid item md={9} xs={12}>
              <TextField
                fullWidth
                variant="standard"
                value={formDetails?.csrCardCancellationOthersTextField}
                disabled
              />
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Confirmation Text */}
      <Grid item>
        <Typography sx={{ fontSize: 12 }}>
          I confirm that I am fully aware and shall be held liable for any
          unauthorised/fraudulent transactions charged to my Card and not
          authorised by me before the request was given to the bank.
        </Typography>
      </Grid>
    </Grid>
                 <Stack sx={{ gap: '20px' }}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Declaration
                </Typography>

                <Grid container direction="column" spacing={3}>
                  <Grid item md={3} xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={Boolean(formDetails?.csrDeclarationTermsandCond)} disabled />}
                      label="I hereby indemnify Smart Ven and hold the Bank harmless against any claim, cost, loss, liability, damage"
                    />
                  </Grid>
                </Grid>
              </Stack>
              </Stack>
            </CardContent>
          </Card>
        </>
        {/* // )} */}
      </Stack>
    </Box>
  );
}
