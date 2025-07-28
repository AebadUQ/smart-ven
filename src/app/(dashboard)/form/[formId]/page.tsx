'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFormBYId } from '@/services/form.api';
import { Button, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/system';
import { ArrowLeft as BackIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import AccountClosingForm from '@/components/forms/account-closing-form';
import AccountOpeningFormAdditionalAccount from '@/components/forms/account-opening-form-additional-account';
import AccountOpeningFormCurrentAccount from '@/components/forms/account-opening-form-current-account';
import AccountOpeninFormSavingAccount from '@/components/forms/account-opening-form-savings-account';
import AccountOpeningWithApplicantForm from '@/components/forms/account-opening-from-applicant-account';
import AccountServiceRequestForm from '@/components/forms/account-service-request-form';
import AtmDisputeForm from '@/components/forms/atm-dispute-form';
import AuthorityIndemnityEmailTransactions from '@/components/forms/authority-indemnity-for-email-transactions';
import AutoFinanceForm from '@/components/forms/auto-finance-form';
import BusinessDebitCardForm from '@/components/forms/business-debit-card-form';
import CorporateBankingForm from '@/components/forms/business-debit-card-form';
import CardTransactionDisputeForm from '@/components/forms/card-transaction-dispute-form';
import CorporateBnakingForm from '@/components/forms/corporate-banking-form';
import CorporateInternetBankingRegistration from '@/components/forms/corporate-internet-banking-regstration';
import CorporateInternetBankingServicesMaintenanceRequest from '@/components/forms/corporate-internet-banking-service-maintenance-request';
import CreditCardApplicationForm from '@/components/forms/credit-card-application-form';
import HomeFinanceForm from '@/components/forms/home-finance-form';
import IrrevocableDocumntaryCreditApplicationForm from '@/components/forms/irrevocable-documentary-credit-application-form-murabah';
import IrrevocableDocumntaryCreditApplicationWakalahForm from '@/components/forms/irrevocable-documentary-credit-application-form-wakalah';
import LetterOfGuaranteeApplicationForm from '@/components/forms/letter-of-guarantee-application-form';
import LossStopPaymentForm from '@/components/forms/loss-stop-payment-form';
import MandateByIndividualForm from '@/components/forms/mandate-by-individual-form';
import PersonalFinance from '@/components/forms/personal-finance';
import PrimarySupplementaryCardServiceRequestForm from '@/components/forms/primary-supplementary-card-service-request-form';
import SignatureChangeRequestForm from '@/components/forms/signature-change-request-form';
import SpecialNeedCustomerForm from '@/components/forms/special-need-customer-form';
import StandingOrderForm from '@/components/forms/standing-order-form';
import TradeAndFinanceFundForm from '@/components/forms/trade-and-finance-fund-form';
import TransferPaymentFundsTransferForm from '@/components/forms/transfer-payment-fund-transfer-form';
import { paths } from '@/paths';

export default function Page(): React.JSX.Element {
  const [data, setData] = React.useState(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.formId;
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const fetchData = async (id: any) => {
    if (!id) return;
    try {
      let data = await getFormBYId(id);
      setData(data?.data[0]);
    } catch (err) {
      console.error('Error fetching form data:', err);
    }
  };
  const RenderForm = ({ data }: any) => {
    switch (data?.form_slug) {
      case 'account-closing-form':
        return <AccountClosingForm data={data} />; // Done checked
      case 'account-opening-form-additional-account':
        return <AccountOpeningFormAdditionalAccount data={data} />;
      case 'account-service-request-form':
        return <AccountServiceRequestForm data={data} />;
      case 'account-opening-form-additional-applicant':
        return <AccountOpeningWithApplicantForm data={data} />;
      case 'account-opening-form-saving-account':
        return <AccountOpeninFormSavingAccount data={data} />;
      case 'atm-dispute-form':
        return <AtmDisputeForm data={data} />;            // Done Checked
      case 'loss-stop-payment-form':
        return <LossStopPaymentForm data={data} />;         // Done Checked
      case 'auto-finance-form':
        return <AutoFinanceForm data={data} />;
      case 'trade-and-finance-fund-transfer-form':
        return <TradeAndFinanceFundForm data={data} />;
      case 'irrevocable-documentary-credit-application-murabaha-form':
        return <IrrevocableDocumntaryCreditApplicationForm data={data} />;
      case 'home-finance-form':
        return <HomeFinanceForm data={data} />;
      case 'irrevocable-documentary-credit-application-wakalah-form':
        return <IrrevocableDocumntaryCreditApplicationWakalahForm data={data} />;
      case 'card-transaction-dispute-form':
        return <CardTransactionDisputeForm data={data} />;
      case 'credit-card-appliation-form':
        return <CreditCardApplicationForm data={data} />;
      case 'standing-order-form':
        return <StandingOrderForm data={data} />;
      case 'primary-supplementary-card-service-request-form':
        return <PrimarySupplementaryCardServiceRequestForm data={data} />;
      case 'current-account-opening-form':
        return <AccountOpeningFormCurrentAccount data={data} />;
      case 'corporate-internet-banking-service-maintenance-request-form':
        return <CorporateInternetBankingServicesMaintenanceRequest data={data} />;
      case 'corporate-internet-banking-registration-form':
        return <CorporateInternetBankingRegistration data={data} />;
      case 'indemnity-form':
        return <AuthorityIndemnityEmailTransactions data={data} />;
      case 'personal-finance-form':
        return <PersonalFinance data={data} />;
      case 'special-needs-customer-form':
        return <SpecialNeedCustomerForm data={data} />;
      case 'mandate-by-individual-form':
        return <MandateByIndividualForm data={data} />;
      case 'transfer-and-payment-fund-transfer-form':
        return <TransferPaymentFundsTransferForm data={data} />;
      case 'letter-of-guarantee-application-form':
        return <LetterOfGuaranteeApplicationForm data={data} />;
      case 'signature-change-request-form':
        return <SignatureChangeRequestForm data={data} />;
      case 'business-debit-card-form':
        return <BusinessDebitCardForm data={data} />;
      case 'corporate-banking-form':
        return <CorporateBnakingForm data={data} />;
      default:
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        );
    }
  };
  React.useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);
  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{marginTop: '10px'}}>
        <Button
          sx={{ width: '100px', marginLeft: '30px' }}
          startIcon={<BackIcon />}
          variant="outlined"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          sx={{ width: '100px', marginRight: '30px' }}
          component="a"
          href={`${paths.dashboard.form}/${id}/pdf`}
          target="_blank"
          variant="contained"
        >
          Preview
        </Button>
      </Stack>

      <RenderForm data={data} />
      <Button
        sx={{ width: '150px', marginLeft: '30px', marginTop: '5px', marginBottom: '10px' }}
        variant="outlined"
        onClick={() => goTop()}
      >
        Back to Top
      </Button>
    </>
  );
}
