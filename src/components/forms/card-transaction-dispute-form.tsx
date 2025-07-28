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
import dayjs from 'dayjs';

export interface AccountOpeningFormProps {
    data: any;
}

export default function AccountOpeningFormAdditionalAccount({ data }: AccountOpeningFormProps): React.JSX.Element {
    const formDetails = data?.user_form_detail;
    console.log("card transaction dispute:", formDetails)

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
                                Card Transaction Dispute
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="Card Number"
                                        value={formDetails?.ctdCardNumber}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>

                            </Grid>

                            <Typography variant="h6">
                                Cardholder Name
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="First Name"
                                        value={formDetails?.ctdFirstName}
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
                                        value={formDetails?.ctdSecondName}
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
                                        value={formDetails?.ctdSurname}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container spacing={4}>
                                <Grid item md={3} xs={12}>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        label="Account No"
                                        value={formDetails?.ctdAccountNumber}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ borderBottom: '1px solid #ccc' }}
                                    />
                                </Grid>

                            </Grid>



                            {formDetails?.ctdCardholderData?.map((data: any, index: number) =>
                                 <Grid container spacing={4}>
                                 <Grid item md={3} xs={12}>
                                     <TextField
                                         variant="standard"
                                         fullWidth
                                         label="Transaction Date & Time"
                                         value={
                                             dayjs(data?.ctdCardholderTransactionDateTime).format('DD/MM/YYYY HH:mm')
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
                                         label="Merchant Name"
                                         value={data?.ctdCardholderMerchantName}
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
                                         label="Amount (OMR)"
                                         value={data?.ctdCardholderAmount}
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
                                         label="Amount in Forein Currency"
                                         value={data?.ctdCardholderAmountInForeignCurrency}
                                         InputProps={{
                                             readOnly: true,
                                         }}
                                         sx={{ borderBottom: '1px solid #ccc' }}
                                     />
                                 </Grid>

                             </Grid>

                          )
                            }

                            <Typography variant="h6">I dispute the above mentioned transaction(s) for the following reasons [Please tick relevant box(es) below]</Typography>

                            <Grid container direction="column" spacing={3}>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt1)}
                                                disabled
                                            />
                                        }
                                        label="I do not recognise the transaction(s)"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt2)}
                                                disabled
                                            />
                                        }
                                        label="I did not participate in or authorise the transaction(s). My card was in my possession at the time of the transaction(s)"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt3)}
                                                disabled
                                            />
                                        }
                                        label="I have been debited instead of receiving a credit"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt4)}
                                                disabled
                                            />
                                        }
                                        label="I have been debited for this(ese) transaction(s) more than once"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt5)}
                                                disabled
                                            />
                                        }
                                        label="I had agreed to pay a different amount. "
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt6)}
                                                disabled
                                            />
                                        }
                                        label="I did not receive any cash or I only received"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt7)}
                                                disabled
                                            />
                                        }
                                        label="I had paid for this(ese) transaction(s) through other means."
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt8)}
                                                disabled
                                            />
                                        }
                                        label="I have not received the promised credit/refund"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt9)}
                                                disabled
                                            />
                                        }
                                        label="I cancelled membership on"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt10)}
                                                disabled
                                            />
                                        }
                                        label="I did not receive the ordered merchandise/services"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt11)}
                                                disabled
                                            />
                                        }
                                        label="I cancelled the transaction on"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt12)}
                                                disabled
                                            />
                                        }
                                        label="*Cardholder contacted merhant on"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt13)}
                                                disabled
                                            />
                                        }
                                        label="*Cardholder contacted by"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt14)}
                                                disabled
                                            />
                                        }
                                        label="*Merchant Response"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt15)}
                                                disabled
                                            />
                                        }
                                        label="*No Response from Merchant"
                                    />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={Boolean(formDetails?.reasonOpt16)}
                                                disabled
                                            />
                                        }
                                        label="Any Other"
                                    />
                                </Grid>

                            </Grid>
                            <Typography variant="h6" sx={{ color: '#6E2585' }}>Declaration</Typography>
                            <Typography variant="body2">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={Boolean(formDetails?.ctdTermsAndCondition
                                            )}
                                            disabled
                                        />
                                    }
                                    label="I hereby affirm that the information furnished above along with enclosures are true and accurate "
                                />
                            </Typography>


                        </Stack>
                    </CardContent>
                </Card>
            </Stack>

        </Box>
    );
}
