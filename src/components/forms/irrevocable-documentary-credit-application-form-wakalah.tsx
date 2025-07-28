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

export default function IrrevocableDocumntaryCreditApplicationWakalahForm({
  data,
}: ProductEditFormProps): React.JSX.Element {
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
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputLabel>Branch</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: '0px',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahBranch?.value || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>

                  {/* <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InputLabel>Application Ref No</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: '0px',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahApplicationRefNo || 'N/A'}
                      disabled
                    />
                  </Grid> */}
                </Grid>
              </Stack>
              <Stack spacing={5}>
                {/* <Typography variant="h6">For Bank use only</Typography> */}
                <Grid container spacing={5}>
                  {/*  */}
                  <Stack direction="column" spacing={2}>
                    <Typography variant="body2">Dear Sir(s),</Typography>
                    <Grid container size={{ xs: 12 }} spacing={2.1}>
                      <Grid size={{ md: 8, xs: 12 }}>
                        <Typography variant="body2">
                          Kindly issue an Irrevocable Murabaha Letter of Credit (“L/C”) for our account and at our full
                          responsibility by
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack direction="row" sx={{ width: '100%' }} spacing={2.1}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahFullSwiftandCourier?.tradeFinIrrDocCreAppWakalahFullSwift || false} disabled />
                            }
                            label="Full Swift"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formdetails?.tradeFinIrrDocCreAppWakalahFullSwiftandCourier?.tradeFinIrrDocCreAppWakalahCourierService || false}
                                disabled
                              />
                            }
                            label="Courier"
                          />

                        </Stack>

                      </Grid>
                      <Typography>as per details given below: (Instructions marked (X) to be followed) </Typography>
                    </Grid>
                  </Stack>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Application Details
                </Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Applicant Name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahApplicantNameonBehal || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Applicant Address</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahApplicantNameonBehalAddress || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Beneficiary name</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryName || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Beneficiary Address</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryAddress || 'N/A'}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Accountee</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryAddress || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Currency</InputLabel>
                    {formdetails?.tradeFinIrrDocCreAppWakalahCurreny?.map((item, index) => (
<OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={item?.value || 'N/A'}
                      disabled
                    />
      ))}

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Tolerance</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahAmount?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                  {formdetails?.tradeFinIrrDocCreAppWakalahAmountAboutPlus &&
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Tolerance in % +</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahAmountAboutPlus || 'N/A'}
                      disabled
                    />
                  </Grid>}
                  {formdetails?.tradeFinIrrDocCreAppWakalahAmountAboutMin &&
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Tolerance in % -</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahAmountAboutMin || 'N/A'}
                      disabled
                    />
                  </Grid>
                  }

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>In Figure</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahInFigures || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>In Words</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahInWords || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Advising Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahAdvisingBank || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Confirmation</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahConfirmation?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                 {formdetails?.tradeFinIrrDocCreAppWakalahConfirmBanking &&
                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Confirming Bank</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahConfirmBanking || 'N/A'}
                      disabled
                    />
                  </Grid>



                 }





                  {formdetails?.tradeFinIrrDocCreAppWakalahConfirmationCharges?.value &&

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Confirmation Charges</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahConfirmationCharges?.value || 'N/A'}
                      disabled
                    />
                  </Grid>

                  }


                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Expiry Date</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={
                        dayjs(formdetails?.tradeFinIrrDocCreAppWakalahDateofExpiry).format('MMM D, YYYY h:mm A') ||
                        'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Place of Expiry</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahPlaceofExpiry || 'N/A'}
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Latest date of shipment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.homeFinFtradeFinIrrDocCreAppWakalahLastestDateofShipmentinDetTenure?
                        dayjs(formdetails?.homeFinFtradeFinIrrDocCreAppWakalahLastestDateofShipmentinDetTenure).format(
                          'MMM D,YYYY h:mm A'
                        ) : 'N/A'
                      }
                      disabled
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Partial Shipment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahPartialShipment?.value || 'N/A'}
                      disabled
                    />

                  </Grid>
                  {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Partial Shipment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahPartialShipment?.value || 'N/A'}
                      disabled
                    />

                  </Grid> */}
                  {formdetails?.tradeFinIrrDocCreAppWakalahPartialShipmentConditional &&
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Any Conditions please mention</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahPartialShipmentConditional || 'N/A'}
                      disabled
                    /></Grid>

                    }
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <InputLabel>Transshipment</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahTransshipment?.value || 'N/A'}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">Shipment By</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ textAlign: 'center' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahSea || false}
                          disabled
                        />
                      }
                      label="Sea"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ textAlign: 'start' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahAir || false}
                          disabled
                        />
                      }
                      label="Air"
                    />
                  </Grid>
                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ textAlign: 'start' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahLand || false}
                          disabled
                        />
                      }
                      label="Land"
                    />
                  </Grid>

                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ textAlign: 'start' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahDelivery || false}
                          disabled
                        />
                      }
                      label="Delivery"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>From</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                        // width: '100%',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahShipmentbyFrom || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>To</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahShipmentbyTo || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={5}>
                <Typography variant="h6">The Credit is Available by</Typography>
                <Grid container spacing={5} alignItems={'start'}>
                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy?.tradeFinIrrDocCreAppWakalahSightPayment || false} disabled />
                      }
                      label="Sight Payment"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ textAlign: 'strat' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                        ?.tradeFinIrrDocCreAppWakalahAcceptanceDeferredPayment || false}
                          disabled
                        />
                      }
                      label="Acceptance/Deferred Payment"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>After No of Days</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahAfterNoofDays || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Days from</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahDaysfrom ?
                        dayjs(formdetails?.tradeFinIrrDocCreAppWakalahDaysfrom).format('MMM D, YYYY h:mm A') : 'N/A'
                      }
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', textAlign: 'start' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                      ?.tradeFinIrrDocCreAppWakalahNegotiationatSightAcceptance || false}
                          disabled
                        />
                      }
                      label="Negotiation at Sight/Usance (Acceptance)"
                    />
                  </Grid>
                  <Grid size={{ sm: 6, md: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', textAlign: 'start' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                      ?.tradeFinIrrDocCreAppWakalahUsanceAcceptance || false}
                          disabled
                        />
                      }
                      label="Usance (Acceptance)"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>After No of Days</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahMixedPaymentSightUsanceDays || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Days from</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahMixedPaymentSightUsance ?
                        dayjs(formdetails?.tradeFinIrrDocCreAppWakalahMixedPaymentSightUsance).format(
                          'MMM D, YYYY h:mm A'
                        ) : 'N/A'
                      }
                      disabled
                    ></OutlinedInput>
                  </Grid>


                </Grid>
                <Grid container>
                  <Grid size={{xs:12, md:4}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', textAlign: 'start' }}
                          checked={formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                        ?.tradeFinIrrDocCreAppWakalahMixedPaymentSightUsance || false}
                          disabled
                        />
                      }
                      label="Mixed Payment Sight/Usance"
                    />
                  </Grid>
                  <Grid size={{xs:12, md:4}}>
                    <InputLabel>As Test To be Added:</InputLabel>
                     <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahTexttobeAdded || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Description of Goods/Services</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahDescriptionofGoodsServices || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>
              </Stack>
              <Stack spacing={5}>
                <Typography variant="h6">Delivery Term</Typography>
                <Grid container spacing={5}>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahEXW || false} disabled />}
                      label="EXW"
                    />

                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahFOB || false} disabled />}

                      label="FOB"
                    />

                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahFOB || false} disabled />}
                      label="
FCA"
                    />

                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCFR || false} disabled />}
                      label="
CFR"
                    />

                    {/* /> */}
                  </Grid>

                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCIF || false} disabled />}
                      label="CIF"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCPT || false} disabled />}
                      label="CPT"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }} display="flex" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCIP || false} disabled />}
                      label="CIP"
                    />

                    {/* /> */}
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }} display="flex" alignItems="center">
                    <FormControlLabel
                      control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahOthers || false} disabled />}
                      label="Others"
                    />

                    {/* /> */}
                  </Grid>
                  {formdetails?.tradeFinIrrDocCreAppWakalahOthersSpecify && <Grid size={{ xs: 12, md: 3 }}>
                    <InputLabel>Please Specify</InputLabel>
                    <OutlinedInput
                      sx={{
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 'none',
                      }}
                      value={formdetails?.tradeFinIrrDocCreAppWakalahOthersSpecify || 'N/A'}
                      disabled
                    ></OutlinedInput>
                  </Grid>}


                </Grid>
              </Stack>
              {/* Documents Required */}

              <Stack spacing={2.5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Documents Required
                </Typography>

                <Stack spacing={5}>
                  <Stack spacing={2.14}>
                    <Grid container spacing={2.5} size={{ xs: 12 }} alignItems={'start'}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <FormControlLabel
                          control={
                            <Checkbox checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqSigned || false} disabled />
                          }
                          label="Signed Commercial Invoice in one original and"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }} sx={{ marginLeft: { xs: '30px', md: '0px' } }}>
                        <InputLabel>No of copies</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: '0px',

                          }}
                          value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqNoofCopies || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="body2">
                          issued by Beneficiary, original to be certified by Chamber of
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" sx={{ textAlign: 'start', paddingLeft: '30px' }}>
                      Commerce or equivalent authority and legalized by Oman embassy/consulate or in absence any Arab
                      embassy/consulate.
                    </Typography>
                  </Stack>
                  {/* field have to filled */}
                  <Stack spacing={2.14}>
                    <Grid container spacing={2.14}>
                      <Grid size={{ sm: 12 }} spacing={2.5} alignItems={'start'}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBills || false}
                              disabled
                            />
                          }
                          label="Full set of clean on board Bill(s) of Lading in long form issued or endorsed to the order of Smart Ven, marked freight"
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }} spacing={2.14} container>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <FormControlLabel
                            sx={{ marginLeft: '30px' }}
                            control={
                              <Checkbox
                                checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPrepaid || false}
                                disabled
                              />
                            }
                            label="Prepaid"
                          />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPayableDestination || false
                                }
                                disabled
                              />
                            }
                            label="Payable at Destination"
                          />
                        </Grid>
                      </Grid>
                      <Typography sx={{ paddingLeft: '30px' }} variant="body2">
                        and notify Smart Ven and Ourselves, and showing full name and address of the carrying vessel’s
                        agent at port of destination.
                      </Typography>
                    </Grid>
                  </Stack>
                  <Stack spacing={2.14}>
                    <Grid container spacing={2.14}>
                      <Grid size={{ xs: 12 }} spacing={2.5} alignItems={'start'}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybills || false}
                              disabled
                            />
                          }
                          label="Air Waybill(s) consigned to Smart Ven, evidencing dispatch of the goods marked freight"
                        />
                      </Grid>
                      <Grid container size={{ xs: 12 }}>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <FormControlLabel
                            sx={{ paddingLeft: '30px', width: '287.5px' }}
                            control={
                              <Checkbox
                                checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybillsPrepaid || false}
                                disabled
                              />
                            }
                            label="Prepaid"
                          />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybillsCollect || false}
                                disabled
                              />
                            }
                            label="Collect"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack spacing={2.14}>
                    <Grid container spacing={2.14}>
                      <Grid container size={{ xs: 12 }} spacing={2.5} alignItems={'start'}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignment || false}
                              disabled
                            />
                          }
                          label="Truck Consignment Note(s) consigned to Smart Ven, evidencing dispatch of the goods marked freight"
                        />
                      </Grid>
                      <Grid container spacing={2.14} size={{ xs: 12 }}>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <FormControlLabel
                            sx={{ paddingLeft: '30px', width: '287.5px' }}
                            control={
                              <Checkbox
                                checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignmentPrepaid || false}
                                disabled
                              />
                            }
                            label="Prepaid"
                          />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                          <FormControlLabel
                            sx={{ width: '287.5px' }}
                            control={
                              <Checkbox
                                checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignmentCollect || false}
                                disabled
                              />
                            }
                            label="Collect"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack spacing={2.14}>
                    <Grid container spacing={2.5} alignItems={'start'}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateOrigin || false}
                              disabled
                            />
                          }
                          label="Certificate of Origin in one original plus"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }} sx={{ marginLeft: { xs: '30px', md: '0px' } }}>
                        <InputLabel>No of copies</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateOriginNoofCopies || 'N/A'}
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="body2">
                          issued by Beneficiary, original to be certified by Chamber of
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" sx={{ textAlign: 'start', paddingLeft: '30px' }}>
                      Commerce or equivalent authority and legalized by Oman embassy/consulate or in absence any Arab
                      embassy/consulate.
                    </Typography>
                    {/* field to be filled */}
                    <Box sx={{ marginLeft: { xs: '30px', md: '0px' } }}>
                      <InputLabel>Origin</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',

                          marginLeft: '30px',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateOriginOrigin || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Box>
                  </Stack>

                  <Stack spacing={6} direction="row">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqDeliveryOrder || false}
                          disabled
                        />
                      }
                      label="Delivery Order in one original and"
                    />
                    <Box>
                      <InputLabel>No of copies</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqDeliveryOrderNoofCopies || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Box>
                  </Stack>

                  <Stack spacing={6} direction="row">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqPackingList || false}
                          disabled
                        />
                      }
                      label="Packing List in one original and"
                    />
                    <Box>
                      <InputLabel>No of copies</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: '0px',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqPackingListNoofCopies || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Box>
                  </Stack>
                  <Stack spacing={6} direction="row">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateWeight || false}
                          disabled
                        />
                      }
                      label="Certificate of Weight in one original and"
                    />
                    <Box>
                      <InputLabel>No of copies</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: '0px',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateWeightNoofCopies || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Box>
                  </Stack>
                  <Stack spacing={1.2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipment || false}
                          disabled
                        />
                      }
                      label="Shipment advice stating the details of shipments such as invoice number, date, value, description of goods, country of origin, manufacturer’s name and"
                    />
                    <Stack sx={{ marginLeft: '30px' }} spacing={1.2}>
                      <Typography variant="body2">
                        address, vessel name, Bill of Lading number and date, ETD, ETA, L/C Number and Date. Such advice
                        should be sent via fax to
                      </Typography>
                      <Stack spacing={2.12} direction="row" alignItems={'start'}>
                        <Stack direction="column">
                          <InputLabel>M/S</InputLabel>
                          <OutlinedInput
                            sx={{
                              borderTop: 'none',
                              borderLeft: 'none',
                              borderRight: 'none',
                              borderRadius: 'none',
                            }}
                            value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentMS || 'N/A'}
                            disabled
                          ></OutlinedInput>
                        </Stack>

                        <Typography variant="body2">and Applicant.</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Grid container>
                    <Grid size={{xs:12,md:4}}>
                      <InputLabel>Insurance Company Name</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={
                            formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentInsuranceCompanyName || 'N/A'
                          }
                          disabled
                        ></OutlinedInput>
                    </Grid>
                    <Grid size={{xs:12,md:4}}>
                      <InputLabel>Address</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={
                            formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentAddress || 'N/A'
                          }
                          disabled
                        ></OutlinedInput>
                    </Grid>
                    <Grid size={{xs:12,md:4}}>
                      <InputLabel>Email</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={
                            formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentEmail || 'N/A'
                          }
                          disabled
                        ></OutlinedInput>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2.14}>
                    <Grid container spacing={2.5} alignItems={'start'}>
                      <Grid size={{ xs: 12, md: 5 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqMarineAirLand || false}
                              disabled
                            />
                          }
                          label="Marine/Air/Land Takaful (insurance) policy/certificate in"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }} sx={{ marginLeft: { xs: '30px', md: '0px' } }}>
                        <InputLabel>No of Orignals</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={
                            formdetails?.tradeFinIrrDocCreAppWakalaDocReqMarineAirLandNoofCertificatesOrignal || 'N/A'
                          }
                          disabled
                        ></OutlinedInput>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }} sx={{ marginLeft: { xs: '30px', md: '0px' } }}>
                        <Typography variant="body2">original and</Typography>
                      </Grid>
                      <Grid sx={{ marginLeft: { xs: '30px', md: '0px' } }}>
                        <InputLabel>No of copies</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                          }}
                          value={
                            formdetails?.tradeFinIrrDocCreAppWakalaDocReqMarineAirLandNoofCetificatesCopies || 'N/A'
                          }
                          disabled
                        ></OutlinedInput>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" sx={{ textAlign: 'start', paddingLeft: '30px' }}>
                      copies issued to the order of Smart Ven in the currency of this L/C for at least 110% of the
                      invoice value covering all risks and expressly stating claims if any are payable in the Sulatanate
                      of Oman. Takaful policy must contain name, address and telephone number of the issuer agent in the
                      Sultanate of Oman.
                    </Typography>
                  </Grid>
                  <Stack direction="row" spacing={6} alignItems={'end'}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTakfulLocally || false}
                          disabled
                        />
                      }
                      label="Takaful covered by us locally"
                    />
                    <Box>
                      <InputLabel>Company's Name</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: '0px',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTakfulLocallyCompanyName || 'N/A'}
                        disabled
                      ></OutlinedInput>
                    </Box>
                  </Stack>
                  <Stack flexDirection="column" spacing={4}>
                    <Typography variant='h6' style={{color:"6E2585"}}>Certificates</Typography>
                    <Grid container>
                  <Grid size={{xs:12, md:3}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqHealthCertificate || false}
                          disabled
                        />
                      }
                      label="Health Certificate"
                    />
                  </Grid>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqHealthCertificateTextField  &&
                  <Grid size={{xs:12,md:9}}>
                    <InputLabel>Health Certificate</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100% ',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqHealthCertificateTextField || 'N/A'}
                        disabled
                      />
                    </Grid>}
                    </Grid>
                 <Grid container>
                  <Grid size={{xs:12, md:3}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqFumigationCertificate || false}
                          disabled
                        />
                      }
                      label="Fumigation Certificate"
                    />
                  </Grid>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqFumigationCertificateTextField  &&
                  <Grid size={{xs:12,md:9}}>
                    <InputLabel>Fumigation Certificate</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100% ',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqFumigationCertificateTextField || 'N/A'}
                        disabled
                      />
                    </Grid>}
                    </Grid>

                  <Grid container>
                  <Grid size={{xs:12, md:3}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqPhytosanitaryCertificate || false}
                          disabled
                        />
                      }
                      label="Phytosanitary Certificate"
                    />
                  </Grid>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqPhytosanitaryCertificateTextField  &&
                  <Grid size={{xs:12,md:9}}>
                    <InputLabel>Phytosanitary Certificate</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100% ',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqFumigationCertificateTextField || 'N/A'}
                        disabled
                      />
                    </Grid>}
                    </Grid>
                 <Grid container>
                  <Grid size={{xs:12, md:3}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqInspetionCertificate || false}
                          disabled
                        />
                      }
                      label="Inspection Certificate"
                    />
                  </Grid>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqInspetionCertificateTextField  &&
                  <Grid size={{xs:12,md:9}}>
                    <InputLabel>Inspection Certificate</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100% ',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqInspetionCertificateTextField || 'N/A'}
                        disabled
                      />
                    </Grid>}
                    </Grid>
                  <Grid container>
                  <Grid size={{xs:12, md:3}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOthertermsDocumentsOthers || false}
                          disabled
                        />
                      }
                      label="Other terms/documents :"
                    />
                  </Grid>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqOthertermsDocumentsOthers  &&
                  <Grid size={{xs:12,md:9}}>
                    <InputLabel>Other terms/documents :</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100% ',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOthertermsDocumentsOthers || 'N/A'}
                        disabled
                      />
                    </Grid>}
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing={2.5}>
                <Typography variant="h6" sx={{ color: '#6E2585' }}>
                  Additional Details
                </Typography>
                <Stack spacing={5}>
                  <Grid spacing={2.5} container>
                    <Grid size={{ xs: 12, md: 2 }} sx={{ width: 'full' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formdetails?.tradeFinIrrDocCreAppWakalaAddDetShippingMarks || false}
                            disabled
                          />
                        }
                        label="Shipping Marks"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                      <InputLabel>Type here</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100% ',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaAddDetShippingMarksTypeHere || 'N/A'}
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid spacing={2.5} size={{ xs: 12 }} container>
                    <Grid size={{ xs: 12, md: 2 }} sx={{ width: 'full' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formdetails?.tradeFinIrrDocCreAppWakalaAddDetDocumentsLC || false}
                            disabled
                          />
                        }
                        label="
              Documents to be presented within
              "
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <InputLabel>No of days</InputLabel>
                      <OutlinedInput
                        sx={{
                          borderTop: 'none',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 'none',
                          width: '100% ',
                        }}
                        value={formdetails?.tradeFinIrrDocCreAppWakalaAddDetNoofDays || 'N/A'}
                        disabled
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography>days after shipment/ delivery date, and within L/C validity.</Typography>
                    </Grid>
                  </Grid>

                  <Stack spacing={1.2}>
                    {/* <Grid size={{ xs: 12 }} spacing={1.2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formdetails?.tradeFinIrrDocCreAppWakalaAddDetCommissionsandCharges || false}
                            disabled
                          />
                        }
                        label="All commissions & charges outside Smart Ven including reimbursement charges are for"
                      />
                    </Grid> */}
                    <Grid container spacing={5}>
                                          <Typography variant='body2'>All commissions & charges outside Smart Ven including reimbursement charges are for</Typography>

                      <Grid size={{ xs: 12, md: 4 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formdetails?.tradeFinIrrDocCreAppWakalahAdditionalDetailsConfirmationCharges?.value || false}
                              disabled
                            />
                          }
                          label={formdetails?.tradeFinIrrDocCreAppWakalahAdditionalDetailsConfirmationCharges?.value}
                        />
                      </Grid>
                      {/* <Grid size={{ xs: 12, md: 4 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                formdetails?.tradeFinIrrDocCreAppWakalaAddDetCommissionsandChargesBeneficiaryAC || false
                              }
                              disabled
                            />
                          }
                          label="Beneficiary A/C"
                        />
                      </Grid> */}
                    </Grid>
                  </Stack>

                  <Stack spacing={1.2}>
                    <Typography variant="h6" sx={{ color: '#6E2585' }}>
                      Declaration
                    </Typography>
                    <Grid container spacing={1.2} alignItems={'start'}>
                      <Grid size={{ sm: 12, md: 4 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formdetails?.tradeFinIrrDocCreAppWakalaAddDetAuthorizeOMRFCYLC || false}
                              disabled
                            />
                          }
                          label="We authorize you to debit our OMR/FCY account no."
                        />
                      </Grid>
                      <Grid size={{ sm: 12, md: 2 }}>
                        <InputLabel>Account Number</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: '0px',
                            width: '100% ',
                          }}
                          value={formdetails?.tradeFinIrrDocCreAppWakalaAddDetAuthorizeOMRFCYLCAccountNo || 'N/A'}
                          disabled
                        />
                      </Grid>
                      <Grid size={{ sm: 12, md: 6 }}>
                        <Typography variant="body2">
                          We declare that we have read, understood, and agree with the General Terms & Conditions
                          related to this L/C.
                        </Typography>
                      </Grid>
                    </Grid>

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formdetails?.tradeFinIrrDocCreAppWakalaAddDetGeneralTermsandConditions || false}
                          disabled
                        />
                      }
                      label="We declare that we have read, understood, and agree with the General Terms & Conditions related to this L/C."
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
