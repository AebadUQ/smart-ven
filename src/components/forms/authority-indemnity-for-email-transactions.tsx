'use client';

import * as React from 'react';
import { Box, Card, CardContent, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';

export interface AccountOpeningFormProps {
  data: any;
}

export default function AuthorityIndemnityEmailTransactions({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;

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
            <Stack>
              <Typography variant="h5" sx={{ color: '#6E2585' }}>
                Authority and Indemnity for Email Transactions
              </Typography>

              <Grid sx={{ mt: '40px' }}>
                <Typography variant="h6" sx={{ mb: '20px' }}>
                  Whereas
                </Typography>
                <Typography sx={{ mb: '20px' }}>
                  A) I/We hereby represent, declare, and understand that the nature of my/our work requires me/us to
                  give instructions to banks by the quickest and most expedient means of communication, which is
                  transmission by email.
                </Typography>
                <Typography sx={{ mb: '20px' }}>
                  B) I/We hereby represent that if I/we adopt/ employ any other means of transmission other than by
                  email to communicate my/our instructions to the Bank, there will be a delay in my/our banking
                  transactions and I/we will consequently suffer loss of opportunity and/or profits.
                </Typography>
                <Typography sx={{ mb: '20px' }}>
                  C) I/We hereby expressly acknowledge that I/we are fully aware and cognizant of the various risks
                  (e.g. technical forgery, programming of bogus email domains /email id’s) inherent and associated with
                  communicating instructions to banks by email transmission and various fraudulent activities arising
                  from and out of such transmissions and are fully prepared to accept such risks and that it is not in
                  the interest of banks to assume such risks which have far-reaching consequences.
                </Typography>
                <Typography sx={{ mb: '20px' }}>
                  D) I / we undertake to inform the bank immediately in writing about any changes of the authorized
                  signatories / officials.
                </Typography>
              </Grid>

              <Grid>
                <Typography variant="h6" sx={{ mb: '20px' }}>
                  In consideration of your acceding to my/our request and me/us agreeing to accept and act upon
                  instructions by email as above, I/we hereby confirm, agree and undertake the following:
                </Typography>
                <Typography sx={{ mb: '30px' }}>
                  1. While it is not mandatory for me/us to send the original instruction to the Bank, should I/we
                  choose to forward the original to you, it will be boldly marked with the following:
                </Typography>

                <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end', mb: '20px' }}>
                  <Stack>
                    <InputLabel>Emailed On</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.indemnityEmailedOn}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Stack>
                  <Typography>Avoids Duplication</Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end', mb: '12px' }}>
                  <Typography>2. If for any reason or other, you acted on instructions sent through our</Typography>
                  <Stack>
                    <InputLabel>Emailed On</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.indemnityEmailedOn2}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Stack>
                  <Typography>or</Typography>
                  <Stack>
                    <InputLabel>Emailed Domain</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.indemnityEmailedDomain}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Stack>
                </Stack>
                <Typography>
                  company domain name) which were misused, or were sent by any unauthorized person, or if you do not
                  receive the original of any email message or its attachments as above, and subsequently it is proved
                  that this email or it’s attachments is not sent by me/us, you will not be responsible for acting on
                  this message and I/we will take full responsibility and liability for this, as this amounts to
                  violation of my/our duty to exercise diligence and due care and to my/our agreement and undertaking
                  with you as above.
                </Typography>

                <Grid sx={{ my: '20px' }}>
                  <Typography sx={{ mb: '20px' }}>
                    3. Acting by you on what may be photocopies emanating from the emails is fully binding on me/us even
                    if you do not receive the original of the email authorization/ instructions.
                  </Typography>
                  <Typography sx={{ mb: '20px' }}>
                    4. You will not be held liable for any irregularity, delay, mistake or omission which may occur in
                    the transmission of email instructions, or for the non-receipt of, or misinterpretation of the email
                    instructions.
                  </Typography>
                  <Typography sx={{ mb: '20px' }}>
                    5. You are hereby irrevocably authorized to rely on email instructions as genuine, true and accurate
                    reproduction of the original instructions and you shall bear no liability for acting thereupon and
                    you are entitled to treat each email authorization/ instructions as fully authorized and binding on
                    me/us and you are entitled (but not bound) to take such steps in connection with or in reliance upon
                    such communication as you may in your sole and absolute discretion, deem appropriate.
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end', flexWrap: 'wrap', mb: '20px' }}>
                    <Typography>
                      6. This email Indemnity covers all the existing accounts (Current Account, Mudaraba Investment
                      Account etc.), with Bank Nizwa of
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end', flexWrap: 'wrap', mb: '20px' }}>
                    <Stack>
                      <InputLabel>Name of Person / Company</InputLabel>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={formDetails?.indemnityWithBankNizwa}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ borderBottom: '1px solid #ccc' }}
                      />
                    </Stack>
                    <Typography>
                      that are held in his/its name. It also covers any future accounts that may be opened by my/our
                      name with Bank Nizwa
                    </Typography>
                  </Stack>

                  <Grid sx={{ mb: '45px' }}>
                    <Typography sx={{ mb: '20px' }}>
                      7. I/We acknowledge and understand that the Bank might refuse or refrain from acting upon certain
                      Email instructions, if the Bank, acting reasonably, suspects any discrepancies in the Email
                      instructions, or if the signatures do not tally with the approved signatures in the Bank records.
                    </Typography>
                    <Typography>
                      8. In all cases, I/we undertake to indemnify & keep the Bank indemnified at all times and to hold
                      the Bank harmless from any and all actions, proceedings, claims, losses, damages, costs and
                      expenses which may be brought against the Bank suffered or incurred by the Bank and which shall
                      have either directly or indirectly come out of or in connection with the Bank acting upon the
                      Email instructions
                    </Typography>
                  </Grid>

                  <Stack sx={{ width: '285px' }}>
                    <InputLabel>CIF No</InputLabel>
                    <TextField
                      variant="standard"
                      fullWidth
                      value={formDetails?.indemnityCifNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ borderBottom: '1px solid #ccc' }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
