'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { getFormBYId } from '@/services/form.api';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { PDFViewer } from '@react-pdf/renderer';

import { AccountClosingFormPDFProps } from '@/components/pdf-forms/pdf-account-closing-form';
import { AccountOpeningAdditionalAccountFormPDFProps } from '@/components/pdf-forms/pdf-account-opening-additional-account';
import { AccountOpeningAdditionalApplicantFormPDFProps } from '@/components/pdf-forms/pdf-account-opening-additional-applicant-form';
import { AccountOpeningCurrentFormPDFProps } from '@/components/pdf-forms/pdf-account-opening-current-account';
import { AccountOpeningSavingsFormPDFProps } from '@/components/pdf-forms/pdf-account-opening-savings-account';
import { AccountServiceRequestFormPDFProps } from '@/components/pdf-forms/pdf-account-service-request-form';
import { AtmDisputeFormPDFProps } from '@/components/pdf-forms/pdf-atm-dispute-form';
import { AuthorityImdemnityForEmailTransactionPdfForm } from '@/components/pdf-forms/pdf-AuthorityIndemnityForEmailTransaction';
import { AutoFinanceFormPDFProps } from '@/components/pdf-forms/pdf-auto-finance-form';
import { BusinessDebitCardFormPDFProps } from '@/components/pdf-forms/pdf-business-debit-card-form';
import { CardTransactionDisputeFormPDFProps } from '@/components/pdf-forms/pdf-card-transaction-dispute-form';
import { CorporateAccountOpningFormPDFProps } from '@/components/pdf-forms/pdf-corporate-banking-account-opening-form';
import { CorporateInternetBankingRgistrationPdfForm } from '@/components/pdf-forms/pdf-corporate-internet-banking-registration-form';
import { CorporateInternetBankingServiceRequestPdfForm } from '@/components/pdf-forms/pdf-corporate-maintenance-service-request-form';
import { CreditCardApplicationFormPDFProps } from '@/components/pdf-forms/pdf-credit-card-application-form';
import HomeFinancePdfProp, { HomeFinanceFormPDFProps } from '@/components/pdf-forms/pdf-home-finance-form';
import { IrrevocableDocumentaryMurabahaForm } from '@/components/pdf-forms/pdf-irrevocable-documentary-Murabaha-form';
import { IrrevocableDocumentaryWakalahForm } from '@/components/pdf-forms/pdf-irrevocable-documentary-Wakalah-form';
import { LetterOfGuaranteePDFProps } from '@/components/pdf-forms/pdf-letter-of-guarantee';
import { LossStopPaymentFormPdfProps } from '@/components/pdf-forms/pdf-loss-payment-form';
import { MandateIndividualForm } from '@/components/pdf-forms/pdf-mandate-individual-form';
import { PersonalFinanceFormPDFProps } from '@/components/pdf-forms/pdf-peraonal-finanace-form';
import { PrimarySupplementaryCardReqFormPDFProps } from '@/components/pdf-forms/pdf-primary-supplementary-card-service-form';
import { SignatureRequestFormPDFProps } from '@/components/pdf-forms/pdf-signature-change-request-form';
import { SpecialNeedPDFProps } from '@/components/pdf-forms/pdf-special-need-form';
import { StandingOrderFormPDFProps } from '@/components/pdf-forms/pdf-standing-order-form';
import { TradeFinanceFundTransferForm } from '@/components/pdf-forms/pdf-trade-and-finance-fund-transfer-form';
import { TransferPaymentFundTransferForm } from '@/components/pdf-forms/pdf-transfer-and-payment-fund-transfer-form';

export default function FormPDFPage(): React.JSX.Element {
  const [data, setData] = React.useState<any>(null);
  const params = useParams();
  const formId = params?.formId;

  React.useEffect(() => {
    if (formId) {
      fetchData(formId);
    }
  }, [formId]);

  const fetchData = async (id: string) => {
    try {
      const response = await getFormBYId(id);
      const result = response?.data?.[0];
      setData(result);
    } catch (err) {
      console.error('Error fetching form data:', err);
    }
  };

  const RenderPDFForm = ({ data }: any) => {
    switch (data?.form_slug) {
      case 'account-closing-form':
        return <AccountClosingFormPDFProps data={data} />;
      case 'atm-dispute-form':
        return <AtmDisputeFormPDFProps data={data} />;
      case 'mandate-by-individual-form':
        return <MandateIndividualForm data={data} />;
      case 'loss-stop-payment-form':
        return <LossStopPaymentFormPdfProps data={data} />;
      case 'card-transaction-dispute-form':
        return <CardTransactionDisputeFormPDFProps data={data} />;
      case 'signature-change-request-form':
        return <SignatureRequestFormPDFProps data={data} />;
      case 'account-opening-form-additional-applicant':
        return <AccountOpeningAdditionalApplicantFormPDFProps data={data} />; // Field have to be filled based on conditions
      case 'indemnity-form':
        return <AuthorityImdemnityForEmailTransactionPdfForm data={data} />;
      case 'corporate-internet-banking-service-maintenance-request-form':
        return <CorporateInternetBankingServiceRequestPdfForm data={data} />;
      case 'corporate-internet-banking-registration-form':
        return <CorporateInternetBankingRgistrationPdfForm data={data} />;
      case 'account-opening-form-additional-account':
        return <AccountOpeningAdditionalAccountFormPDFProps data={data} />;
      case 'current-account-opening-form':
        return <AccountOpeningCurrentFormPDFProps data={data} />; // Arabic fonts issue 1/3rd is incomplete
      case 'credit-card-appliation-form':
        return <CreditCardApplicationFormPDFProps data={data} />;
      case 'personal-finance-form':
        return <PersonalFinanceFormPDFProps data={data} />;
      case 'home-finance-form':
        return <HomeFinanceFormPDFProps data={data} />;
      case 'auto-finance-form':
        return <AutoFinanceFormPDFProps data={data} />;
      case 'standing-order-form':
        return <StandingOrderFormPDFProps data={data} />;
      case 'account-opening-form-saving-account':
        return <AccountOpeningSavingsFormPDFProps data={data} />;
      case 'special-needs-customer-form':
        return <SpecialNeedPDFProps data={data} />;
      case 'account-service-request-form':
        return <AccountServiceRequestFormPDFProps data={data} />;
      case 'primary-supplementary-card-service-request-form':
        return <PrimarySupplementaryCardReqFormPDFProps data={data} />;

      case 'transfer-and-payment-fund-transfer-form':
        return <TransferPaymentFundTransferForm data={data} />;

      case 'trade-and-finance-fund-transfer-form':
        return <TradeFinanceFundTransferForm data={data} />;
      case 'business-debit-card-form':
        return <BusinessDebitCardFormPDFProps data={data} />;
      case 'letter-of-guarantee-application-form':
        return <LetterOfGuaranteePDFProps data={data} />;
      case 'corporate-banking-form':
        return <CorporateAccountOpningFormPDFProps data={data} />;

      case 'irrevocable-documentary-credit-application-murabaha-form':
        return <IrrevocableDocumentaryMurabahaForm data={data} />;

      case 'irrevocable-documentary-credit-application-wakalah-form':
        return <IrrevocableDocumentaryWakalahForm data={data} />;

      default:
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        );
    }
  };

  if (!data) {
    return <div>Loading PDF...</div>;
  }

  // Decide which PDF doc to show if you have multiple forms:
  // For example, switch on data.form_slug or create a single PDF doc that handles all forms
  return (
    <PDFViewer key={JSON.stringify(data)} style={{ width: '100vw', height: '100vh' }}>
      <RenderPDFForm data={data} />
    </PDFViewer>
  );
}
