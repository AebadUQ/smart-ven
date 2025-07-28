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

export interface AccountOpeningFormProps {
  data: any;
}

export default function TransferPaymentFundsTransferForm({ data }: AccountOpeningFormProps): React.JSX.Element {
  const formDetails = data?.user_form_detail;

  console.log('TransferPaymentFundsTransferForm ===========================', formDetails);

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
      <Stack spacing={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">{data?.form_name}</Typography>
        <Card>
          <CardContent>
            <Stack spacing={5}>
              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Funds Transfer Application
              </Typography>

              <Grid container spacing={5}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Type of Remittance</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpFundTranferTypeOfRemittance?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Payment & Beneficiary Details
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Currency</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiaryCurrency?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Amount In Figures</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiaryAmountFigures}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Amount in Words</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiaryAmountWords}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Beneficiary Account No./IBAN</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiaryAccNoOrIBAN}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Beneficiary Name</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiaryName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Beneficiary Bank</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiaryBank}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Swift Code/Sort Code/ABA #</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiarySwiftCode}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Address of Bank</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiarAddressBank}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Correspondent Bank</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiarCorrespondentBank}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Swift Code/Sort Code/ABA #</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpPaymentBenificiaryCorrespondentSwiftCode}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#000000DE', fontSize: '16px' }}>
                Choose Option
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  {formDetails?.tpPaymentMethods?.id === 491 ? <FormControlLabel
                    control={<Checkbox checked={true} disabled />}
                    label="Credit Card Payments"
                  /> : <FormControlLabel
                    control={<Checkbox checked={false} disabled />}
                    label="Credit Card Payments"
                  />}

                </Grid>
                <Grid item md={3} xs={12}>
                  {formDetails?.tpPaymentMethods?.id === 492 ? <FormControlLabel
                    control={<Checkbox checked={true} disabled />}
                    label="Charitable Contributions"
                  /> : <FormControlLabel
                    control={<Checkbox checked={false} disabled />}
                    label="Charitable Contributions"
                  />}

                </Grid>
                <Grid item md={3} xs={12}>
                  {formDetails?.tpPaymentMethods?.id === 493 ? <FormControlLabel
                    control={<Checkbox checked={true} disabled />}
                    label="Remittance"
                  /> : <FormControlLabel
                    control={<Checkbox checked={false} disabled />}
                    label="Remittance"
                  />}

                </Grid>
                <Grid item md={3} xs={12}>
                  {formDetails?.tpPaymentMethods?.id === 494 ? <FormControlLabel
                    control={<Checkbox checked={true} disabled />}
                    label="Cross Border Payments"
                  /> : <FormControlLabel
                    control={<Checkbox checked={false} disabled />}
                    label="Cross Border Payments"
                  />}

                </Grid>
                <Grid item md={3} xs={12}>
                  {formDetails?.tpPaymentMethods?.id === 495 ? <FormControlLabel
                    control={<Checkbox checked={true} disabled />}
                    label="Miscellaneous Payment with Invoice Details"
                  /> : <FormControlLabel
                    control={<Checkbox checked={false} disabled />}
                    label="Miscellaneous Payment with Invoice Details"
                  />}

                </Grid>
                <Grid item md={3} xs={12}>
                  {formDetails?.tpPaymentMethods?.id === 496 ? <FormControlLabel
                    control={<Checkbox checked={true} disabled />}
                    label="Miscellaneous Payment with Beneficiary Customer Reference"
                  /> : <FormControlLabel
                    control={<Checkbox checked={false} disabled />}
                    label="Miscellaneous Payment with Beneficiary Customer Reference"
                  />}

                </Grid>
                <Grid item md={3} xs={12}>
                  {formDetails?.tpPaymentMethods?.id === 497 ? <FormControlLabel
                    control={<Checkbox checked={true} disabled />}
                    label="Miscellaneous Payment with Ordering Customer Reference"
                  /> : <FormControlLabel
                    control={<Checkbox checked={false} disabled />}
                    label="Miscellaneous Payment with Ordering Customer Reference"
                  />}

                </Grid>
                {/* <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.tpCharitableContributionsCheck)} disabled />}
                    label="Charitable Contributions"
                  />
                </Grid> */}
                {/* <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.tpRemittanceCheck)} disabled />}
                    label="Remittance"
                  />
                </Grid> */}
                {/* <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.tpCrossBorderCheck)} disabled />}
                    label="Cross Border Payments"
                  />
                </Grid> */}
                {/* <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={Boolean(formDetails?.tpMiscellaneousPaymenWithInvoieCheck)} disabled />}
                    label="Miscellaneous Payment with Invoice Details"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={Boolean(formDetails?.tpMiscellaneousPaymenWithBeneCustRefCheck)} disabled />
                    }
                    label="Miscellaneous Payment with Beneficiary Customer Reference"
                  />
                </Grid> */}
                {/* <Grid item md={3} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={Boolean(formDetails?.tpPaymentMethods?.id === 49)} disabled />
                    }
                    label="Miscellaneous Payment with Ordering Customer Reference"
                  />
                </Grid> */}
              </Grid>

              <Stack>
                <InputLabel>Details of Payment</InputLabel>
                <TextField
                  variant="standard"
                  fullWidth
                  value={formDetails?.tpPaymentBenificiaryPaymentDetail}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ borderBottom: '1px solid #ccc' }}
                />
              </Stack>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Remittance Charges Borne by
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Remittance Charges Borne By</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpRemittanceChargesBorneBy?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Correspondent Bank Charges Borne By</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpRemittanceChargesCorrespondentBankCharges?.value}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ color: '#6E2585' }}>
                Mode of Payment
              </Typography>

              <Grid container spacing={4}>
                <Grid item md={3} xs={12}>
                  <InputLabel>Debit My Account Number</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpModeOfPaymentDebitMyAccNum}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Applicant Contact No</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpModeOfPaymentApplicantContactNo1}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <InputLabel>Applicant Contact No</InputLabel>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formDetails?.tpModeOfPaymentApplicantContactNo2}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ borderBottom: '1px solid #ccc' }}
                  />
                </Grid>
              </Grid>

              <Stack>
                <Typography variant="h6" sx={{ color: '#6E2585', mb: '20px' }}>
                  Terms & Conditions
                </Typography>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(formDetails?.tpTermsAndCondition)} disabled />}
                  label="I/We confirm that the information given above is true and complete, and that I/We have received the Bank’s General Terms and Conditions..."
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
