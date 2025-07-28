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

export default function IrrevocableDocumntaryCreditApplicationForm({ data }: ProductEditFormProps): React.JSX.Element {
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaBranch?.value || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaApplicationRefNo || 'N/A'}
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
                                 <Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaFullSwiftandCourier?.tradeFinIrrDocCreAppMurabahaFullSwift || false} disabled />
                               }
                               label="Full Swift"
                             />
                             <FormControlLabel
                               control={
                                 <Checkbox
                                   checked={formdetails?.tradeFinIrrDocCreAppMurabahaFullSwiftandCourier?.tradeFinIrrDocCreAppMurabahaCourierService || false}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaApplicantNameonBehal || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaApplicantNameonBehalAddress || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryName || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryAddress || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryAddress || 'N/A'}
                         disabled
                       />
                     </Grid>
                     <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                       <InputLabel>Currency</InputLabel>
                       {formdetails?.tradeFinIrrDocCreAppMurabahaCurreny?.map((item, index) => (
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaAmount?.value || 'N/A'}
                         disabled
                       />
                     </Grid>
                     {formdetails?.tradeFinIrrDocCreAppMurabahaAmountAboutPlus &&
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaAmountAboutPlus || 'N/A'}
                         disabled
                       />
                     </Grid>}
                     {formdetails?.tradeFinIrrDocCreAppMurabahaAmountAboutMin &&
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaAmountAboutMin || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaInFigures || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaInWords || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaAdvisingBank || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmation?.value || 'N/A'}
                         disabled
                       />
                     </Grid>

                    {formdetails?.tradeFinIrrDocCreAppMurabahaConfirmBanking &&
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmBanking || 'N/A'}
                         disabled
                       />
                     </Grid>



                    }





                     {formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value &&

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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value || 'N/A'}
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
                           dayjs(formdetails?.tradeFinIrrDocCreAppMurabahaDateofExpiry).format('MMM D, YYYY h:mm A') ||
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaPlaceofExpiry || 'N/A'}
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
                         value={formdetails?.homeFinFtradeFinIrrDocCreAppMurabahaLastestDateofShipmentinDetTenure?
                           dayjs(formdetails?.homeFinFtradeFinIrrDocCreAppMurabahaLastestDateofShipmentinDetTenure).format(
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipment?.value || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipment?.value || 'N/A'}
                         disabled
                       />

                     </Grid> */}
                     {formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipmentConditional &&
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipmentConditional || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaTransshipment?.value || 'N/A'}
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaSea || false}
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaAir || false}
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaLand || false}
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaDelivery || false}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentbyFrom || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentbyTo || 'N/A'}
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
                           <Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy?.tradeFinIrrDocCreAppMurabahaSightPayment || false} disabled />
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                           ?.tradeFinIrrDocCreAppMurabahaAcceptanceDeferredPayment || false}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaAfterNoofDays || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaDaysfrom ?
                           dayjs(formdetails?.tradeFinIrrDocCreAppMurabahaDaysfrom).format('MMM D, YYYY h:mm A') : 'N/A'
                         }
                         disabled
                       ></OutlinedInput>
                     </Grid>
                     <Grid size={{ sm: 6, md: 3 }}>
                       <FormControlLabel
                         control={
                           <Checkbox
                             sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', textAlign: 'start' }}
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                         ?.tradeFinIrrDocCreAppMurabahaNegotiationatSightAcceptance || false}
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                         ?.tradeFinIrrDocCreAppMurabahaUsanceAcceptance || false}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaMixedPaymentSightUsanceDays || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaMixedPaymentSightUsance ?
                           dayjs(formdetails?.tradeFinIrrDocCreAppMurabahaMixedPaymentSightUsance).format(
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                           ?.tradeFinIrrDocCreAppMurabahaMixedPaymentSightUsance || false}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaTexttobeAdded || 'N/A'}
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
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaDescriptionofGoodsServices || 'N/A'}
                         disabled
                       ></OutlinedInput>
                     </Grid>
                 </Stack>
                 <Stack spacing={5}>
                   <Typography variant="h6">Delivery Term</Typography>
                   <Grid container spacing={5}>
                     <Grid size={{ xs: 6, md: 3 }}>
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaEXW || false} disabled />}
                         label="EXW"
                       />

                     </Grid>
                     <Grid size={{ xs: 6, md: 3 }}>
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaFOB || false} disabled />}

                         label="FOB"
                       />

                     </Grid>
                     <Grid size={{ xs: 6, md: 3 }}>
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaFOB || false} disabled />}
                         label="
   FCA"
                       />

                     </Grid>
                     <Grid size={{ xs: 6, md: 3 }}>
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCFR || false} disabled />}
                         label="
   CFR"
                       />

                       {/* /> */}
                     </Grid>

                     <Grid size={{ xs: 6, md: 3 }}>
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCIF || false} disabled />}
                         label="CIF"
                       />

                       {/* /> */}
                     </Grid>
                     <Grid size={{ xs: 6, md: 3 }}>
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCPT || false} disabled />}
                         label="CPT"
                       />

                       {/* /> */}
                     </Grid>
                     <Grid size={{ xs: 6, md: 3 }} display="flex" alignItems="center">
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCIP || false} disabled />}
                         label="CIP"
                       />

                       {/* /> */}
                     </Grid>
                     <Grid size={{ xs: 6, md: 3 }} display="flex" alignItems="center">
                       <FormControlLabel
                         control={<Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaOthers || false} disabled />}
                         label="Others"
                       />

                       {/* /> */}
                     </Grid>
                     {formdetails?.tradeFinIrrDocCreAppMurabahaOthersSpecify && <Grid size={{ xs: 12, md: 3 }}>
                       <InputLabel>Please Specify</InputLabel>
                       <OutlinedInput
                         sx={{
                           borderTop: 'none',
                           borderLeft: 'none',
                           borderRight: 'none',
                           borderRadius: 'none',
                         }}
                         value={formdetails?.tradeFinIrrDocCreAppMurabahaOthersSpecify || 'N/A'}
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
                               <Checkbox checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqSigned || false} disabled />
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
                             value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqNoofCopies || 'N/A'}
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
                                 checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBills || false}
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
                                   checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPrepaid || false}
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
                                     formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPayableDestination || false
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
                                 checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybills || false}
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
                                   checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybillsPrepaid || false}
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
                                   checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybillsCollect || false}
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
                                 checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignment || false}
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
                                   checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignmentPrepaid || false}
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
                                   checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignmentCollect || false}
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
                                 checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOrigin || false}
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
                             value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOriginNoofCopies || 'N/A'}
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOriginOrigin || 'N/A'}
                           disabled
                         ></OutlinedInput>
                       </Box>
                     </Stack>

                     <Stack spacing={6} direction="row">
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqDeliveryOrder || false}
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqDeliveryOrderNoofCopies || 'N/A'}
                           disabled
                         ></OutlinedInput>
                       </Box>
                     </Stack>

                     <Stack spacing={6} direction="row">
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPackingList || false}
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPackingListNoofCopies || 'N/A'}
                           disabled
                         ></OutlinedInput>
                       </Box>
                     </Stack>
                     <Stack spacing={6} direction="row">
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateWeight || false}
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateWeightNoofCopies || 'N/A'}
                           disabled
                         ></OutlinedInput>
                       </Box>
                     </Stack>
                     <Stack spacing={1.2}>
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipment || false}
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
                               value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentMS || 'N/A'}
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
                               formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentInsuranceCompanyName || 'N/A'
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
                               formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentAddress || 'N/A'
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
                               formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentEmail || 'N/A'
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
                                 checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqMarineAirLand || false}
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
                               formdetails?.tradeFinIrrDocCreAppMurabahaDocReqMarineAirLandNoofCertificatesOrignal || 'N/A'
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
                               formdetails?.tradeFinIrrDocCreAppMurabahaDocReqMarineAirLandNoofCetificatesCopies || 'N/A'
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTakfulLocally || false}
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTakfulLocallyCompanyName || 'N/A'}
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
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqHealthCertificate || false}
                             disabled
                           />
                         }
                         label="Health Certificate"
                       />
                     </Grid>
                     {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqHealthCertificateTextField  &&
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqHealthCertificateTextField || 'N/A'}
                           disabled
                         />
                       </Grid>}
                       </Grid>
                    <Grid container>
                     <Grid size={{xs:12, md:3}}>
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqFumigationCertificate || false}
                             disabled
                           />
                         }
                         label="Fumigation Certificate"
                       />
                     </Grid>
                     {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqFumigationCertificateTextField  &&
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqFumigationCertificateTextField || 'N/A'}
                           disabled
                         />
                       </Grid>}
                       </Grid>

                     <Grid container>
                     <Grid size={{xs:12, md:3}}>
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPhytosanitaryCertificate || false}
                             disabled
                           />
                         }
                         label="Phytosanitary Certificate"
                       />
                     </Grid>
                     {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPhytosanitaryCertificateTextField  &&
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqFumigationCertificateTextField || 'N/A'}
                           disabled
                         />
                       </Grid>}
                       </Grid>
                    <Grid container>
                     <Grid size={{xs:12, md:3}}>
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqInspetionCertificate || false}
                             disabled
                           />
                         }
                         label="Inspection Certificate"
                       />
                     </Grid>
                     {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqInspetionCertificateTextField  &&
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqInspetionCertificateTextField || 'N/A'}
                           disabled
                         />
                       </Grid>}
                       </Grid>
                     <Grid container>
                     <Grid size={{xs:12, md:3}}>
                       <FormControlLabel
                         control={
                           <Checkbox
                             checked={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOthertermsDocumentsOthers || false}
                             disabled
                           />
                         }
                         label="Other terms/documents :"
                       />
                     </Grid>
                     {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOthertermsDocumentsOthers  &&
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOthertermsDocumentsOthers || 'N/A'}
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
                               checked={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetShippingMarks || false}
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetShippingMarksTypeHere || 'N/A'}
                           disabled
                         />
                       </Grid>
                     </Grid>
                     <Grid spacing={2.5} size={{ xs: 12 }} container>
                       <Grid size={{ xs: 12, md: 2 }} sx={{ width: 'full' }}>
                         <FormControlLabel
                           control={
                             <Checkbox
                               checked={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetNoofDays || false}
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
                           value={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetNoofDays || 'N/A'}
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
                               checked={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetCommissionsandCharges || false}
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
                                 checked={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value || false}
                                 disabled
                               />
                             }
                             label={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value}
                           />
                         </Grid>
                         {/* <Grid size={{ xs: 12, md: 4 }}>
                           <FormControlLabel
                             control={
                               <Checkbox
                                 checked={
                                   formdetails?.tradeFinIrrDocCreAppMurabahaAddDetCommissionsandChargesBeneficiaryAC || false
                                 }
                                 disabled
                               />
                             }
                             label="Beneficiary A/C"
                           />
                         </Grid> */}
                       </Grid>
                     </Stack>

                      <Stack spacing={1.2} direction="column">
                    <Typography variant="h6" sx={{ color: '#6E2585' }}>
                      Declaration
                    </Typography>
                    <Stack spacing={4.5}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetGeneralTermsandConditions || false}
                            disabled
                          />
                        }
                        label="We hereby confirm that the above goods details have been filled... Read More"
                      />
                      <Box>
                        <InputLabel>Customer Account NO</InputLabel>
                        <OutlinedInput
                          sx={{
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: 'none',
                            width: '100% ',
                          }}
                          value={formdetails?.tradeFinIrrDocCreAppMurabahaAddCustomerAccountNo || 'N/A'}
                          disabled
                        />
                      </Box>
                    </Stack>
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
