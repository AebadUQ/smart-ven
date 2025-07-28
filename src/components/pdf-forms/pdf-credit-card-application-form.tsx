'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
// import DinFont from '../../font/DinTextARRegular.otf'; // Double-check the path

// import Din from '../../font/DinTextARRegular.otf';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PdfTable } from './pdf-table-component';
import { PDFTermsAndCondition } from './sections/pdf-terms-condition';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.
Font.register({
  family: 'Amiri',
  src: 'https://fonts.gstatic.com/s/amiri/v8/wXG5Bltw6Qmj8zJm8jxZ5Q.woff2', // Use a web-hosted font as a test
});
export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  totalAmount: number;
}

const lineItems = [
  { id: 'LI-001', name: 'Pro Subscription', quantity: 1, currency: 'USD', unitAmount: 14.99, totalAmount: 14.99 },
] satisfies LineItem[];

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
    borderTop: '8px solid #FFC000',
    borderBottom: '7px solid #6E2B8C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  customRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  rowFav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 3,
    gap: '20px',
  },
  thirdRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    marginRight: 1,
    paddingLeft: 3,
    paddingRIght: 3,
    paddingBottom: 1,
  },

  headerText: {
    fontSize: 10,
    color: '#6E2B8C',
  },

  textFont: {
    fontSize: 8,
    color: '#6E2B8C',
    marginTop: 2,
  },

  label: {
    fontWeight: 'bold',
    marginRight: 2,
    color: '#6E2B8C',
    fontSize: 12,
  },
  secondLabel: {
    color: '#6E2B8C',
    fontSize: 9,
    // paddingLeft: 3,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  smallCheckbox: {
    width: 15,
    // marginRight: 2,
    height: 15,
    borderWidth: 1,
    borderColor: '#6E2B8C',
    display: 'flex',
    justifyContent: 'flex-end',
    // textAlign: 'center',
  },

  checkbox: {
    width: 15,
    marginRight: 6,
    height: 15,
    borderWidth: 1,
    borderColor: '#6E2B8C',
    marginLeft: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    width: '80px',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 1,
  },
  clause: {
    // fontSize: 8,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Times-Bold',
    color: '#6E2585',
    fontSize: 10,
  },
  superClause: {
    // fontSize: 8,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Times-Bold',
    color: '#6E2585',
    fontSize: 12,
  },
  subClause: {
    fontSize: 8,
    marginLeft: 10,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
    color: '#6E2585',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}
const termsConditionData = {
  title: 'Terms and Conditions for Smart Ven Credit Card',
  list: [
    {
      title: 'Definitions',
      description: [
        {
          isClosure: false,
          text: 'The Bank: Refers to Smart Ven.',
        },
        {
          isClosure: false,
          text: 'Credit Card: A card with a credit line provided by the Bank for cash withdrawals and purchases on credit.',
        },
        {
          isClosure: false,
          text: 'Customer/Cardholder: The individual to whom the card is issued, including Primary and Supplementary Cardholders.',
        },
        {
          isClosure: false,
          text: 'Supplementary Card: A secondary card under the Primary Credit Card account.',
        },
        {
          isClosure: false,
          text: 'Credit Card Account: The account allocated to track all transactions and charges.',
        },
        {
          isClosure: false,
          text: 'Credit Card Limit: The approved amount of credit available to the Cardholder.',
        },
      ],
    },
    {
      title: 'Sharia Compliant Credit Card (Qard Hassan)',
      description: [
        {
          isClosure: true,
          text: 'The Credit Limit is based on the Sharia principle of Qard Hasan (profit-free loan).',
        },
        {
          isClosure: true,
          text: 'The Bank may reduce the Credit Limit with prior notice, requiring the Cardholder to adjust the outstanding amount accordingly.',
        },
      ],
    },
    {
      title: 'Credit Card Delivery and Usage',
      description: [
        {
          isClosure: true,
          text: 'The Cardholder must sign the bank register to confirm receipt of the card.',
        },
        {
          isClosure: true,
          text: 'The PIN can be generated via Phone Banking using the IVR System.',
        },
        {
          isClosure: true,
          text: 'The Bank is not responsible if the card is not received when sent by mail.',
        },
        {
          isClosure: true,
          text: 'The card can be used within the validity period embossed on it.',
        },
      ],
    },
    {
      title: 'Supplementary Card',
      description: [
        {
          isClosure: true,
          text: 'The Primary Cardholder can request Supplementary Cards within the approved credit limit.',
        },
        {
          isClosure: true,
          text: 'The Primary Cardholder is fully responsible for all debits and charges on the Credit Card account, including those made by Supplementary Cardholders.',
        },
        {
          isClosure: true,
          text: 'All cards are subject to the maximum credit limit set by the Bank.',
        },
      ],
    },
    {
      title: 'Card Account',
      description: [
        {
          isClosure: true,
          text: 'The Bank will debit the Credit Card Account for fees and all transaction amounts resulting from customer usage of the card.',
        },
        {
          isClosure: true,
          text: 'Transactions in foreign currencies will be converted at the prevailing market rate on the debit date.',
        },
        {
          isClosure: true,
          text: 'Annual fees are charged during the first month of card issuance, replacement, or renewal and are non-refundable.',
        },
      ],
    },
    {
      title: 'Credit Card Statement',
      description: [
        {
          isClosure: true,
          text: "Statements are issued at specified intervals and sent to the customer's recorded postal address unless otherwise instructed.",
        },
        {
          isClosure: true,
          text: 'Discrepancies must be reported in writing within 15 days; otherwise, the Statement is deemed correct.',
        },
        {
          isClosure: true,
          text: 'The Cardholder remains liable for payments even if a Statement is not received.',
        },
      ],
    },
    {
      title: 'Payment of Fees',
      description: [
        {
          isClosure: true,
          text: 'Annual Subscription Fees are based on the Bank’s Services & Price Guide and may be amended by the Bank.',
        },
        {
          isClosure: true,
          text: "The Cardholder is liable for all dues upon the Bank's request.",
        },
        {
          isClosure: true,
          text: 'Fees are added to the Credit Card Statement and must be paid upon card issuance or renewal.',
        },
        {
          isClosure: true,
          text: 'The Primary Cardholder must pay the Current Balance or the Minimum Amount Due by the Payment Due Date.',
        },
        {
          isClosure: true,
          text: 'Unpaid amounts may incur a 1% charity payment in case of default, as per Sharia guidelines.',
        },
        {
          isClosure: true,
          text: "The Bank is authorized to debit fees from any of the Cardholder's accounts.",
        },
      ],
    },
    {
      title: 'Loss of Credit Card and Security Code',
      description: [
        {
          isClosure: true,
          text: 'The Cardholder must memorize and destroy the Security Code upon receipt.',
        },
        {
          isClosure: true,
          text: 'The Cardholder is liable for all transactions made with the Security Code, even if unauthorized.',
        },
        {
          isClosure: true,
          text: 'Loss, theft, or disclosure of the Security Code must be reported immediately to the Bank and the police.',
        },
        {
          isClosure: true,
          text: 'The Bank may issue a replacement card or new Security Code at its discretion.',
        },
      ],
    },
    {
      title: 'Credit Card Conditions',
      description: [
        {
          isClosure: true,
          text: "The card remains the Bank's property and must be returned upon request.",
        },
        {
          isClosure: true,
          text: 'The Cardholder must sign the card upon receipt, which constitutes acceptance of these Terms and Conditions.',
        },
        {
          isClosure: true,
          text: 'The card is non-transferable and must not be used by others or pledged as security.',
        },
        {
          isClosure: true,
          text: 'The Cardholder must keep the card safe at all times.',
        },
      ],
    },
    {
      title: 'Use of the Credit Card',
      description: [
        {
          isClosure: true,
          text: 'The card can be used within the Credit Limit and until the expiry date.',
        },
        {
          isClosure: true,
          text: 'The Cardholder must ensure the card is used for Sharia-compliant purposes only.',
        },
        {
          isClosure: true,
          text: 'Prohibited transactions include alcohol, pork, gambling, pornography, and illegal activities.',
        },
        {
          isClosure: true,
          text: 'The Bank may restrict card usage or refuse transactions without liability.',
        },
        {
          isClosure: true,
          text: "The Cardholder is liable for all transactions, and the Bank's records are conclusive.",
        },
        {
          isClosure: true,
          text: 'Unauthorized or fraudulent use before reporting is the Cardholder’s responsibility.',
        },
      ],
    },
  ],
};

// const termsConditionData = {
//   title: 'Terms and Conditions for Smart Ven Credit Card ',
//   list: [
//     {
//       title: 'Definitions',
//       description: [
//         {
//           isClosure: false,
//           text: 'Debit Card: The bank debit card is a card used for payment of cash purchases between the customer, the Bank and the merchant; it is used to pay for goods and services and for cash withdrawals from ATM’s (Automated Teller Machines) and cash withdrawals from banks bearing the OmanNet, GCCNET, Visa or MasterCard logos.',
//         },
//         {
//           isClosure: false,
//           text: 'Credit Card: A card with credit line provided by the Bank to a customer to be used for Cash withdrawal over ATM or Purchases on credit from Point of Sale terminals',
//         },
//         {
//           isClosure: false,
//           text: 'Personal Identification Number (PIN): Secret number that is given to customers in sealed envelopes or generated by customer through ATM or Phone banking. The PIN is used for cash withdrawals, for balance enquiries over ATM’s and for verification on POS machines',
//         },
//         {
//           isClosue: false,
//           text: 'Customer / Cardholder: means an individual to whom a card, bearing that individual’s name, is issued by the Bank and includes the Primary Cardholder and any Supplementary Cardholder. Reference in these Terms and Conditions to ‘Cardholder’ shall mean Primary Cardholder and/or Supplementary Cardholder as shall be appropriate in the context',
//         },
//         {
//           isClosure: false,
//           text: 'Branch: All Smart Ven branches',
//         },
//         {
//           isClosure: false,
//           text: 'Supplementary Card: Secondary Card under the primary Credit Card account.',
//         },
//         {
//           isClosure: false,
//           text: 'Renewal of Credit Card: Renewing customer credit card facility after card expiration.',
//         },
//         {
//           isClosure: false,
//           text: 'Replacement Card: Replacing customer physical credit card with new card number',
//         },
//         {
//           isClosure: false,
//           text: 'Credit Card Account: Means the account allocated to a Card for the purpose of entering all credits and debits received and (or) incurred by the Primary Cardholder and (or) the Supplementary Cardholder, if any, under these Terms and Conditions for that Credit Card.',
//         },
//         {
//           isClosure: false,
//           text: 'Credit Card Statement: Means Bank’s monthly statement issued to the Primary Cardholder showing particulars of the Card Transactions since the last Card Statement and the Current Balance and Minimum Amount Due payable to the Bank by the Payment Due Date and sent to the Primary Cardholder at the postal address provided by Customer or by such other means as may be agreed with Customer.',
//         },
//         {
//           isClosure: false,
//           text: 'Credit Card Limit: Is the amount of purchases on credit that is approved by the Bank to the credit cardholder.',
//         },
//         {
//           isClosure: false,
//           text: 'Credit Card Services: The department within the bank responsible for issuing and embossing of all types of cards',
//         },
//         {
//           isClosure: false,
//           text: 'Annual Membership Subscription Fees: Is the fees which client pays to the Bank to issue the different types of Credit Cards.',
//         },
//       ],
//     },
//     {
//       title: 'Sharia Compliant Credit Card',
//       description: [
//         {
//           isClosue: true,
//           text: 'Bank shall make available to the Cardholder the Credit Limit based on the Sharia principle of profit-free loan (Qard Hasan). The Credit Limit may be utilized by the Cardholder for Card Transactions for the specified payment period.',
//         },
//         {
//           isClosure: true,
//           text: 'Bank, may at any time, with prior notice to the Cardholder reduce the Credit Limit. In such an event, the Cardholder shall be required to repay the outstanding credit amount to be within the new Credit Limit.',
//         },
//       ],
//     },
//     {
//       title: 'Credit Card Delivery and Usage',
//       description: [
//         {
//           isClosue: true,
//           text:"Customer shall sign the bank register to confirm receipt of the card."

//         },
//         {
//           isClosue: true,
//           text: "Customer will generate the PIN by calling the Phone Banking using IVR System."
//         },
//         {
//           isClosure:true,
//         }
//       ]
//     },
//   ],
// };

export function CreditCardApplicationFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data?.updatedAt);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  const dated = dayjs(formdetails.ccaEmploymentBusinessDateOfJoining).format('MM DD YYYY');
  // const relationshipDate = dayjs(formdetails.ccaBankingRelationshipSince)?.format('DD MM YYYY');
  const personalDetailsResidentExpDate = dayjs(formdetails.ccaPersonalDetailResidentCardExpiryDate)?.format(
    'DD MM YYYY'
  );
  const personalDetailsPassportExpDate = dayjs(formdetails.ccaPersonalDetailPassportExpiryDate)?.format('DD MM YYYY');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />

        <View style={styles.column}>
          <CustomDate date={formatedDate} />
          <View style={styles.secondColumn}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* <View style={{ flexDirection: 'row' }}>
                <Text style={styles.secondLabel}>Application Number:</Text>
                <Text style={styles.input}></Text>
              </View> */}
              <View style={styles.thirdRow}>
                <Text style={styles.secondLabel}>Branch:</Text>
                <Text style={styles.input}>{formdetails?.ccaBranch?.value || 'N/A'}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* <View style={{ flexDirection: 'row' }}>
                <Text style={styles.secondLabel}>Card Number:</Text>
                <Text style={styles.input}></Text>
              </View> */}
              <View style={styles.thirdRow}>
                <Text style={styles.secondLabel}>CIF No.:</Text>
                <Text style={styles.input}>{formdetails?.ccaFundingCIFNumber}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
              Note: Please complete in Block letters and sign in the appropriate space.
            </Text>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              CUSTOMER TYPE
            </Text>
            <View style={{ flexDirection: 'column', gap: 2, border: '1px solid #6E2B8C' }}>
              <View style={styles.secondRow}>
                {/* <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}>
                    {formdetails?.ccaCustomerType.value ? <Text style={{ fontSize: 7 }}>v</Text> : null}
                  </View>
                  <Text style={styles.textFont}>{formdetails?.ccaCustomerType.value}</Text>
                </View> */}
                <CheckBoxComp label={formdetails?.ccaCustomerType?.value} val={formdetails?.ccaCustomerType} />
                {/* <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}></View>
                  <Text style={styles.textFont}>Existing Salary Customer </Text>
                </View>

                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}></View>
                  <Text style={styles.textFont}>Collateral Customer</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}></View>
                  <Text style={styles.textFont}>BN Staff</Text>
                </View> */}
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              CARD TYPE
            </Text>
            <View style={{ flexDirection: 'column', gap: 2, border: '1px solid #6E2B8C' }}>
              <View style={styles.secondRow}>
                <CheckBoxComp label={formdetails?.ccaCardType?.value} val={formdetails?.ccaCardType} />
                {/* <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}>
                    {formdetails?.ccaCardType.value ? <Text style={{ fontSize: 7 }}>v</Text> : null}
                  </View>
                  <Text style={styles.textFont}>{formdetails?.ccaCardType.value}</Text>
                </View> */}
                {/* <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}></View>
                  <Text style={styles.textFont}>Gold Credit Card</Text>
                </View>

                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}></View>
                  <Text style={styles.textFont}>Titanium Credit Card </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}></View>
                  <Text style={styles.textFont}> Platinum Credit Card</Text>
                </View> */}
              </View>
              {/* <View style={styles.secondRow}>
                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}></View>
                  <Text style={styles.textFont}>World Credit Card </Text>
                </View>
              </View> */}
              <View style={styles.thirdRow}>
                {/* <Text style={styles.textFont}>Credit Card requested limit:</Text>
                <Text style={styles.input}>{formdetails?.ccaCreditCardReqLimit || 'N/A'}</Text> */}
                <InputComp
                  inputOne="Credit Card requested limit:"
                  outputOne={formdetails?.ccaCreditCardReqLimit || 'N/A'}
                />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: 'column', gap: '4px' }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                Personal Details
              </Text>
              <View style={styles.secondColumn}>
                <Text style={styles.secondLabel}>Name(s) of Additional Applicant(s) - as per ID Card</Text>

                <View style={{ flexDirection: 'row', gap: '5px', alignItems: 'flex-end' }}>
                  <View style={{ flexDirection: 'row', width: '100%', gap: 2, alignItems: 'flex-start' }}>
                    <View style={{ flexDirection: 'column-reverse', width: '4%' }}>
                      <Text style={{ ...styles.inputLine, textAlign: 'center', fontSize: 8 }}>
                        {formdetails?.ccaPersonalDetailTitle?.value}
                      </Text>

                      <Text style={{ color: '#6E2B8C' }}>Title</Text>
                    </View>
                    <View style={{ flexDirection: 'column-reverse', width: '32.6666666667%' }}>
                      {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.atdFirstName || 'N/A'}</Text> */}
                      <InputComp inputSix=" " outputSix={formdetails?.ccaPersonalDetailFirstName || 'N/A'} n={40} />

                      <Text style={{ color: '#6E2B8C' }}>FirstName</Text>
                    </View>

                    <View style={{ flexDirection: 'column-reverse', maxWidth: '31.6666666667%' }}>
                      <InputComp inputSix=" " outputSix={formdetails?.ccaPersonalDetailSecondName || 'N/A'} n={40} />

                      {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.atdSecondName || 'N/A'}</Text> */}
                      <Text style={{ color: '#6E2B8C' }}>Second Name</Text>
                    </View>

                    <View style={{ flexDirection: 'column-reverse', maxWidth: '31.6666666667%' }}>
                      <InputComp inputSix=" " outputSix={formdetails?.ccaPersonalDetailSurName || 'N/A'} n={40} />

                      {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.atdSurname || 'N/A'}</Text> */}
                      <Text style={{ color: '#6E2B8C' }}>Surname/Tribe</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      width: '33.3333333333%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderBottom: '1px solid #6E2585',
                        alignItems: 'center',
                        color: '#6E2585',

                        width: '100%',

                        height: '20px',
                      }}
                    >
                      <Text style={styles.secondLabel}>Nationality</Text>
                    </View>

                    <View
                      style={{
                        height: '22px',

                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    >
                      {/* <InputComp inputNine=" " outputNine={formdetails?.ccaPersonalDetailNationality?.value}/> */}
                      <Text style={{ fontSize: 8 }}> {formdetails?.ccaPersonalDetailNationality?.value}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      // height: '150px',
                      // borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      // borderBottom: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      width: '33.3333333333%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderBottom: '1px solid #6E2585',
                        alignItems: 'center',
                        color: '#6E2585',
                        width: '100%',
                        // padding: '8px',
                        height: '20px',
                      }}
                    >
                      <Text style={styles.secondLabel}>ID/Resident Card</Text>
                    </View>
                    <View
                      style={{
                        height: '22px',

                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    >
                      <Text style={styles.textFont}>{formdetails?.ccaPersonalDetailIDResidentCard}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      // height: '150px',
                      borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      // borderBottom: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      width: '33.3333333333%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderBottom: '1px solid #6E2585',
                        alignItems: 'center',
                        color: '#6E2585',
                        width: '100%',
                        // padding: '4px',
                        height: '20px',
                      }}
                    >
                      <Text style={styles.secondLabel}>Expiry Date</Text>
                    </View>

                    <View
                      style={{
                        height: '22px',

                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    >
                      <Text style={styles.textFont}>
                        {dayjs(formdetails?.ccaPersonalDetailExpiryDate)?.format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      // height: '150px',
                      // borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      // borderTop: '1px solid #6E2585',
                      // borderBottom: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      width: '33.3333333333%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderBottom: '1px solid #6E2585',
                        alignItems: 'center',
                        color: '#6E2585',
                        width: '100%',
                        // padding: '15px',
                        height: '20px',
                      }}
                    >
                      <Text style={styles.secondLabel}>Date of Birth</Text>
                    </View>

                    <View
                      style={{
                        height: '22px',

                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    >
                      <Text style={styles.textFont}>
                        {formdetails?.ccaPersonalDetailDateOfBirth ? dayjs(formdetails?.ccaPersonalDetailDateOfBirth)?.format('DD-MM-YYYY'): "N/A"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      // height: '150px',
                      // borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      // borderTop: '1px solid #6E2585',
                      // borderBottom: '1px solid #6E2585',
                      // borderLeft: '1px solid #6E2585',
                      width: '33.3333333333%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderBottom: '1px solid #6E2585',
                        borderLeft: '1px solid #6E2585',

                        alignItems: 'center',
                        color: '#6E2585',
                        width: '100%',
                        // padding: '15px',
                        height: '20px',
                      }}
                    >
                      <Text style={styles.secondLabel}>Place of Birth</Text>
                    </View>

                    <View
                      style={{
                        height: '22px',
                        borderLeft: '1px solid #6E2585',

                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    >
                      <Text style={styles.textFont}>{formdetails?.ccaPersonalDetailPlaceOfBirth?.value}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      // height: '150px',
                      borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      // borderTop: '1px solid #6E2585',
                      // borderBottom: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      width: '33.3333333333%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderBottom: '1px solid #6E2585',
                        alignItems: 'center',
                        color: '#6E2585',
                        width: '100%',
                        // padding: '15px',
                        height: '20px',
                      }}
                    >
                      <Text style={styles.secondLabel}>Gender</Text>
                    </View>

                    <View
                      style={{
                        height: '22px',
                        // backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                        padding: '8px',
                      }}
                    >
                      <View style={styles.secondRow}>
                        <View style={styles.checkboxRow}>
                          {/* <View style={[styles.smallCheckbox, { backgroundColor: '#6E2585' }]} /> */}
                          {/* <CheckBoxComp label=""/> */}
                          <Text style={styles.secondLabel}>
                            {formdetails?.ccaPersonalDetailTitle?.id === 506 ||
                            formdetails?.ccaPersonalDetailTitle?.id === 507
                              ? 'F'
                              : 'M'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <InputComp
                inputOne="Passport No.*:"
                inputTwo="Passport Expiry Date*: "
                inputThree="Resident ID.*:"
                outputOne={formdetails?.ccaPersonalDetailPassportNo || 'N/A'}
                outputTwo={personalDetailsPassportExpDate || 'N/A'}
                outputThree={formdetails?.ccaPersonalDetailResidentID || 'N/A'}
              />
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5, width: '50%' }}>
                  <Text style={styles.secondLabel}>Marital Status:</Text>

                  <CheckBoxComp
                    label={formdetails?.ccaPersonalDetailMaritalStatus?.value}
                    val={formdetails?.ccaPersonalDetailMaritalStatus}
                  />
                </View>
                <View style={{ width: '50%' }}>
                  <InputComp
                    inputOne="Resident Card Expiry Date*"
                    outputOne={personalDetailsResidentExpDate || 'N/A'}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                ADDRESS
              </Text>
              <View style={{ flexDirection: 'column', gap: 2, border: '1px solid #6E2B8C' }}>
                {/* <View style={styles.secondRow}> */}
                <View style={{...styles.thirdRow,marginTop:2}}>
                  <InputComp
                    inputOne="P.O. Box:"
                    outputOne={formdetails?.ccaStatementAddressPOBox || 'N/A'}
                    inputTwo="Postal Box:"
                    outputTwo={formdetails?.ccaStatementAddressPostalCode || 'N/A'}
                  />
                </View>
                {/* </View> */}
                <View style={{ flexDirection: 'column', gap: 1 }}>
                  <View style={styles.thirdRow}>
                    <Text style={styles.secondLabel}>Residential Status:</Text>
                  </View>
                  <View style={styles.secondRow}>
                    <View style={styles.thirdRow}>
                      <CheckBoxComp
                        label={formdetails?.ccaStatementAddressResidentStatus.value}
                        val={formdetails?.ccaStatementAddressResidentStatus.value}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.thirdRow}>
                  <InputComp
                    inputOne="House No./Flat No.:"
                    outputOne={formdetails?.ccaStatementAddressHouseNo || 'N/A'}
                    inputTwo="Building No.:"
                    outputTwo={formdetails?.ccaStatementAddressBuildingNo || 'N/A'}
                    inputThree="Way No.:"
                    outputThree={formdetails?.ccaStatementAddressWayNo || 'N/A'}
                    inputFour="Area:"
                    outputFour={formdetails?.ccaStatementAddressArea || 'N/A'}
                  />
                </View>

                <View style={styles.thirdRow}>
                  <InputComp
                    inputTwo="Res. Tel. No.:"
                    inputThree="Mobile (1):"
                    inputFour="Mobile (2):"
                    outputThree={formdetails?.ccaStatementAddressMobileNo1 || "N/A"}
                    inputOne="Wilayat:"
                    outputFour={formdetails?.ccaStatementAddressMobileNo2 || "N/A"}
                    outputOne={formdetails?.ccaStatementAddressWaliyat || "N/A"}
                    outputTwo={formdetails?.ccaStatementAddressResTelNo || "N/A"}
                  />
                </View>
                <View style={styles.secondRow}>
                  <InputComp inputOne="Email" outputOne={formdetails?.ccaStatementAddressEmail || "N/A"} />
                </View>
              </View>
            </View>

            {/* <View style={{flexDirection:'column'}}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                PERMANENT ADDRESS (IF DIFFERENT FROM ABOVE)
              </Text>
              <View style={{ flexDirection: 'column', gap: 1, border: '1px solid #6E2B8C' }}>
                <View style={styles.secondRow}>
                  <View style={styles.thirdRow}>
                    <InputComp
                      inputOne="P.O. Box:"
                      outputOne={formdetails?.ccaStateccaPermanentAddressPOBoxmentAddressPOBox || 'N/A'}
                      inputTwo="Postal Box:"
                      outputTwo={formdetails?.ccaStatementAddresccaPermanentAddressPostalCodesPostalCode || 'N/A'}
                    />
                  </View>
                </View>
                <View style={styles.secondRow}>
                  <View style={styles.thirdRow}>
                    <InputComp
                      inputOne="House No./Flat No.:"
                      outputOne={formdetails?.ccaStatementAddressHccaPermanentAddressHouseNoouseNo || 'N/A'}
                      inputTwo="Building No.:"
                      outputTwo={formdetails?.ccaPermanentAddressBuildingNo || 'N/A'}
                      inputThree="Way No.:"
                      outputThree={formdetails?.ccaPermanentAddressWayNo || 'N/A'}
                      inputFour="Area:"
                      outputFour={formdetails?.ccaPermanentAddressArea || 'N/A'}
                    />
                  </View>
                </View>

                <View style={styles.thirdRow}>
                  <View style={styles.thirdRow}>
                    <InputComp
                      inputOne="Wilayat:"
                      outputOne={formdetails?.ccaPermanentAddressWaliyat || 'N/A'}
                      inputTwo="Res. Tel. No.:"
                      outputTwo={formdetails?.ccaPermanentAddresssResTelNo || 'N/A'}
                      inputThree="Mobile (1):"
                      outputThree={formdetails?.ccaPermanentAddressMobileNo1 || 'N/A'}
                      inputFour="Mobile (2):"
                      outputFour={formdetails?.ccaPermanentAddressMobileNo2 || 'N/A'}
                    />
                  </View>
                </View>
              </View>
            </View> */}
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            EMPLOYMENT / BUSINESS
          </Text>
          <View style={{ flexDirection: 'column', gap: 2, border: '1px solid #6E2B8C' }}>
            <View style={{ flexDirection: 'row', width: '100%', gap: 4, paddingTop: 2 }}>
              <View style={{ flexDirection: 'row', width: '70%', paddingLeft: 2 }}>
                <InputComp
                  inputOne="Name of the Employer / Business:"
                  outputOne={formdetails?.ccaEmploymentBusinessName || 'N/A'}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={styles.textFont}>Sector:</Text>

                <CheckBoxComp label={formdetails?.ccaEmploymentBusinessSector?.value} val={formdetails?.ccaEmploymentBusinessSector?.value} />
              </View>
            </View>

            <View style={{ paddingLeft: 2 }}>
              <InputComp
                inputOne="Employer Code:"
                outputOne={formdetails?.ccaEmploymentBusinessEmployerCode || 'N/A'}
              />
            </View>

            <View style={{ paddingLeft: 2 }}>
              <InputComp
                inputOne="If Self-employed provide the CR No.:"
                outputOne={formdetails?.ccaEmploymentBusinessCRNo || 'N/A'}
              />
            </View>

            <View style={{ paddingLeft: 2 }}>
              <InputComp
                inputOne="Nature of Business:"
                outputOne={formdetails?.ccaEmploymentBusinessNatureOfBusiness || 'N/A'}
                inputTwo="Designation:"
                outputTwo={formdetails?.ccaEmploymentBusinessDesignation || 'N/A'}
              />
              <View style={{ marginTop: 2 }}></View>
              <InputComp
                inputThree="Employee No.:"
                outputThree={formdetails?.ccaEmploymentBusinessEmployeeNo || 'N/A'}
                inputFour="Date of Joining:"
                outputFour={dated || 'N/A'}
              />
            </View>
            <View style={{ flexDirection: 'column', gap: '1px' }}>
              <View style={{ paddingLeft: 2 }}>
                {/* <Text style={styles.textFont}>Address:</Text> */}
              </View>
              <View style={{ paddingLeft: 2 }}>
                <InputComp
                  inputOne="PO Box:"
                  outputOne={formdetails?.ccaEmploymentBusinessPOBox || 'N/A'}
                  inputTwo="PC:"
                  outputTwo={formdetails?.ccaEmploymentBusinessPostalCode || 'N/A'}
                  inputThree="Fax:"
                  outputThree={formdetails?.ccaEmploymentBusinessFax || 'N/A'}
                />
                <View style={{ marginTop: 2 }}></View>
                <InputComp

                  inputThree="City / Town:"
                  outputThree={formdetails?.ccaEmploymentBusinessCityTown || 'N/A'}
                  inputFour="Tel. No."
                  outputFour={formdetails?.ccaEmploymentBusinessTelNo || 'N/A'}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 5, marginTop: 5 }}>
          <PdfTable
            head="INCOME"
            body={
              <View style={styles.column}>
                <View style={{ ...styles.thirdRow, width: '100%' }}>
                  {/* <Text style={styles.textFont}>Monthly Gross Salary Income:</Text>
                      <Text style={styles.input}>{formdetails?.ccaIncomeMonthlyGrossSalary}</Text> */}
                  <InputComp
                    inputOne="Monthly Gross Salary Income:"
                    outputOne={formdetails?.ccaIncomeMonthlyGrossSalary}
                  />
                </View>
                <View style={styles.thirdRow}>
                  <InputComp
                    inputOne="Basic Salary"
                    inputTwo="Allowance"
                    inputThree="Total Income"
                    inputFour="Additional Income"
                    outputOne={formdetails?.ccaIncomeBasicSalary || 'N/A'}
                    outputTwo={formdetails?.ccaIncomeAllowance || 'N/A'}
                    outputThree={formdetails?.ccaIncomeTotalIncome || 'N/A'}
                    outputFour={formdetails?.ccaIncomeAdditionalIncome || 'N/A'}
                  />
                </View>
                <View style={styles.thirdRow}>
                  <InputComp
                    inputOne="Annual Income:"
                    inputTwo="Salary Date:"
                    outputTwo={formdetails?.ccaIncomeSalaryDate}
                    outputOne={formdetails?.ccaIncomeAnnualIncome}
                  />
                </View>
              </View>
            }
          />
          <PdfTable
            head="FUNDING ACCOUNT"
            body={
              <View style={styles.column}>
                <View style={styles.thirdRow}>
                  <InputComp
                    inputOne="I would like to settle my Credit Card bills"
                    outputOne={formdetails?.ccaFundingAccCreditCardBillSettlement.value}
                  />
                </View>
                <View style={styles.thirdRow}>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 3 }}>
                    <Text style={styles.textFont}>Please debit my Smart Ven Account No.:</Text>
                    <AccountBoxes length={14} data={formdetails?.ccaFundingDebitAccTo.split('')} />
                    <Text style={styles.textFont}>to settle my Credit Card bills</Text>
                    <Text style={styles.textFont}>as per percentage marked above</Text>
                  </View>
                </View>
                <View style={styles.thirdRow}>
                  <InputComp
                    inputOne="CIF No.:"
                    inputTwo="Branch:"
                    outputOne={formdetails?.ccaFundingCIFNumber || 'N/A'}
                    outputTwo={formdetails?.ccaFundingBranch?.value || 'N/A'}
                  />
                </View>
              </View>
            }
          />
          <PdfTable
            head="PRIMARY CARD DETAILS"
            body={
              <View style={styles.thirdRow}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.textFont}>
                    My name to appear on the card, as below: (English only; max 20 characters including spaces)
                  </Text>
                  <AccountBoxes length={20} data={formdetails?.ccaPrimaryCardRetailCardName.split('')} />
                </View>
              </View>
            }
          />
          <PdfTable
            head="SUPPLEMENTARY CARD DETAILS "
            body={
              <View style={styles.thirdRow}>
                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <InputComp inputOne="Name:" outputOne={formdetails?.ccaSupplementaryCardDetailName || 'N/A'} />
                  <InputComp
                    inputOne="Relationship:"
                    outputOne={formdetails?.ccaSupplementaryCardDetailRelationship?.value || 'N/A'}
                    inputTwo="Date of Birth:"
                    outputTwo={formdetails?.ccaSupplementaryCardDetailDob ? dayjs(formdetails?.ccaSupplementaryCardDetailDob).format('DD-MM-YYYY') : 'N/A'}
                    inputThree="ID/Passport:"
                    outputThree={formdetails?.ccaSupplementaryCardDetailIdPassport || 'N/A'}
                    inputFour="Nationality: "
                    outputFour={formdetails?.ccaSupplementaryCardDetailNationality?.value || 'N/A'}
                  />
                  <Text style={styles.textFont}>
                    Supplementary card name to appear on the card, as below: (English only; max 20 characters including
                    spaces)
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 2,width:"100%", alignItems:'flex-end'}}>
                    <View style={{width:'70%'}}>
                    <AccountBoxes
                      length={20}
                      data={formdetails?.ccaSupplementaryCardDetailSupplementaryCardName.split('')}
                    /></View><View style={{width:'30%'}}>
                    <InputComp inputOne="Card Limit" outputOne={formdetails?.ccaSupplementaryCardDetailCardLimit || "N/A"}/></View>
                  </View>
                </View>
              </View>
            }
          />
          <PdfTable
            head="Supplementary credit card – Number of transaction per Day"
            body={
              <View
                style={{
                  flexDirection: 'row',

                  width: '100%',
                }}
              >
                <View style={{ padding: 4 }}>
                  <InputComp
                    inputOne="Number of Transaction Per Day:"
                    outputOne={formdetails?.ccaSupplementaryCardLimitNumberOfTransactionPerDay || 'N/A'}
                  />
                </View>
                {/* <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Retail/POS number</Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>ATM cash number</Text>
                    </View>
                    <View style={{ padding: 2, borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Retail/POS amount per transaction</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.ccaSupplementaryCardLimitRetailPosNum || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.ccaSupplementaryCardLimitATMCashNum || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ padding: 2, borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.ccaSupplementaryCardLimitRetailPosAmount || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Retail/POS amount</Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>ATM cash amount</Text>
                    </View>
                    <View style={{ padding: 2, borderRight: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>ATM cash amount per transaction</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.ccaSupplementaryCardLimitRetailPosAmountPerTrans || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.ccaSupplementaryCardLimitATMCashNum || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ padding: 2 }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.ccaSupplementaryCardLimitRetailPosNum || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View> */}
              </View>
            }
          />
          <PdfTable
            head="BANKING SERVICE REQUIRED"
            body={
              <View style={{ paddingVertical: 2 }}>
                <View style={styles.secondRow}>
                  <CheckBoxComp
                    label="SMS alerts for card transactions:"
                    val={formdetails?.ccaBankServiceReqSmsAlert.value}
                  />

                  <CheckBoxComp
                    label={formdetails?.ccaBankServiceReqSmsAlert.value}
                    val={formdetails?.ccaBankServiceReqSmsAlert.value}
                  />

                  <CheckBoxComp
                    label="Email alerts for card transactions"
                    val={formdetails?.ccaBankServiceReqEmailAlertCardTrans}
                  />
                </View>
              </View>
            }
          />
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', gap: 2 }}>
          <PdfTable
            head="BANKING RELATIONSHIPS"
            body={
              <View
                style={{
                  flexDirection: 'column',
                  // border: '1px solid #6E2585',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    // borderTop: '1px solid #6E2585',
                    // borderBottom: '1px solid #6E2585',
                  }}
                >
                  <View style={{ width: '40%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                    <Text style={{ textAlign: 'center' }}>Bank Name</Text>
                  </View>
                  <View style={{ width: '20%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                    <Text style={{ textAlign: 'center' }}>Account Number</Text>
                  </View>
                  <View style={{ width: '20%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                    <Text style={{ textAlign: 'center' }}>Type of Account</Text>
                  </View>
                  <View style={{ width: '20%', backgroundColor: '#C0C0C0' }}>
                    <Text style={{ textAlign: 'center' }}>Relationship Since</Text>
                  </View>
                </View>
                {formdetails?.ccaBankingRelationship?.map((item: any, index: any) => (
                  <View
                    style={{
                      // key={index}
                      flexDirection: 'row',
                      width: '100%',
                      borderTop:'1px solid #6E2585'
                      // borderTop: '1px solid #6E2585',
                      // borderBottom: '1px solid #6E2585',
                    }}
                  >
                    <View style={{ width: '40%', borderRight: '1px solid #6E2585', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {item?.ccaBankingRelationshipBankName || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '20%', borderRight: '1px solid #6E2585', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {item?.ccaBankingRelationshipAccountNum || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '20%', borderRight: '1px solid #6E2585', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {item.ccaBankingRelationshipTypeOfAccount?.value || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '20%', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                       {item?.ccaBankingRelationshipSince ? dayjs(item?.ccaBankingRelationshipSince)?.format('DD-MM-YYYY') : "N/A" }
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            }
          />

          <View
            style={{
              flexDirection: 'column',
              marginTop: 5,
              borderBottom: '1px solid #6E2585',
              borderTop: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              borderRight: '1px solid #6E2585',
            }}
          >
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '18%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>Type of Liability</Text>
              </View>

              <View style={{ width: '35%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>Bank</Text>
              </View>
              <View style={{ width: '26%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>Amount Outstanding</Text>
              </View>

              <View style={{ width: '26%', backgroundColor: '#C0C0C0' }}>
                <Text style={{ textAlign: 'center' }}>Monthly Payment</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Personal Finance</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>{formdetails?.ccaLiabilityPFBank || 'N/A'}</Text>
                {/* Omani Bank Ul Hujjati */}
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityPFAmountOutstanding || 'N/A'}</Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityPFMonthlyPayment || 'N/A'}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>Auto Finance</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>{formdetails?.ccaLiabilityAFBank || 'N/A'}</Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityAFAmountOutstanding || 'N/A'}</Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityAFMonthlyPayment || 'N/A'}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Credit Card</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>{formdetails?.ccaLiabilityCCBank || 'N/A'}</Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityCCAmountOutstanding || 'N/A'}</Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityCCMonthlyPayment || 'N/A'}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Home Finance</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>{formdetails?.ccaLiabilityHFBank || 'N/A'}</Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityHFAmountOutstanding || 'N/A'}</Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityHFMonthlyPayment || 'N/A'}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}
                >{`Other Liability (including\n3rd Party Guarantees)`}</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>{formdetails?.ccaLiabilityOLBank || 'N/A'}</Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityOLAmountOutstanding || 'N/A'}</Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityOLMonthlyPayment || 'N/A'}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Total</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}>
                {/* <Text style={{ textAlign: 'center' }}>{formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}</Text> */}
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityTOAmountOutstanding || 'N/A'}</Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.ccaLiabilityTOMonthlyPayment || 'N/A'}</Text>
              </View>
            </View>
          </View>

          {/* */}
        </View>

        <View style={{ marginTop: 10 }}>
          <PdfTable
            head="REFERENCE"
            body={
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid black' }}>
                  <View
                    style={{
                      paddingVertical: 3,
                      paddingHorizontal: 1,
                      borderBottom: '1px solid #6E2585',
                      textAlign: 'center',
                      // borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                      color: '#6E2585',
                    }}
                  >
                    <Text>In Oman</Text>
                  </View>
                  <View style={styles.thirdRow}>
                    <View style={styles.column}>
                      <InputComp inputOne="Name:" outputOne={formdetails?.ccaRefInOmanName || 'N/A'} />
                      <InputComp
                        inputOne="Relationship:"
                        outputOne={formdetails?.ccaRefInOmanRelationship?.value || 'N/A'}
                      />
                      <InputComp inputOne="Employer:" outputOne={formdetails?.ccaRefInOmanEmployer || 'N/A'} />
                      <InputComp inputNine="Address:" outputNine={formdetails?.ccaRefInOmanAddress || 'N/A'} />
                      <InputComp inputOne="Office Tel.:" outputOne={formdetails?.ccaRefInOmanOfficeTel || 'N/A'} />
                      <InputComp inputOne="Mobile:" outputOne={formdetails?.ccaRefInOmanMobile || 'N/A'} />
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                  <View
                    style={{
                      padding: 3,
                      borderBottom: '1px solid #6E2585',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                      color: '#6E2585',
                    }}
                  >
                    <Text>In Home Country (For Expatriates / GCC Nationals)</Text>
                  </View>
                  <View style={styles.thirdRow}>
                    <View style={styles.column}>
                      <InputComp inputOne="Name:" outputOne={formdetails?.ccaRefInHomeName || 'N/A'} />
                      <InputComp
                        inputOne="Relationship:"
                        outputOne={formdetails?.ccaRefInHomeRelationship?.value || 'N/A'}
                      />
                      <InputComp inputOne="Employer:" outputOne={formdetails?.ccaRefInHomeEmployer || 'N/A'} />
                      <InputComp inputNine="Address:" outputNine={formdetails?.ccaRefInHomeAddress || 'N/A'} />
                      <InputComp inputOne="Office Tel.:" outputOne={formdetails?.ccaRefInHomeOfficeTel || 'N/A'} />
                      <InputComp inputOne="Mobile:" outputOne={formdetails?.ccaRefInHomeMobile || 'N/A'} />
                    </View>
                  </View>
                </View>
              </View>
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',

              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            TERMS AND CONDITIONS:
          </Text>
          <Text style={{ fontSize: 8 }}>
            I confirm that the information given above is true and complete, and that I have received the Bank’s General
            Terms and Conditions for the operations of the Credit Card Account and Electronic Banking Services and those
            applicable specifically to the type of account chosen by me.
          </Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View
            style={{
              fontSize: '10px',
              borderTop: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              // borderBottom: '1px solid #6E2585',
              width: '33.3333333333%',
            }}
          >
            <View
              style={{
                backgroundColor: '#C0C0C0',
                justifyContent: 'center',
                borderRight: 0,
                alignItems: 'center',
                color: '#6E2585',
                borderBottom: '1px solid #6E2585',
                width: '100%',
                // height: '30px',
                padding: '8px',
              }}
            >
              <Text style={{ fontSize: 10 }}>Name</Text>
            </View>
            <View
              style={{
                height: '60px',
                // backgroundColor: '#C0C0C0',
                justifyContent: 'flex-start',
                borderRight: 0,
                alignItems: 'flex-start',
                color: '#6E2585',
                borderBottom: '1px solid #6E2585',
                width: '100%',
                padding: '8px',
              }}
            >
              <Text style={styles.textFont}>Primary Card Holder </Text>
            </View>
          </View>

          <View
            style={{
              // height: '150px',
              // borderRight: '1px solid #6E2585',
              fontSize: '10px',
              borderTop: '1px solid #6E2585',
              // borderBottom: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              width: '33.3333333333%',
            }}
          >
            <View
              style={{
                backgroundColor: '#C0C0C0',
                justifyContent: 'center',
                borderBottom: '1px solid #6E2585',
                alignItems: 'center',
                color: '#6E2585',
                // padding: '1px',
                width: '100%',
                // textAlign: 'center',
                height: '31px',
                // padding: '8px',
              }}
            >
              <Text style={{ fontSize: 10 }}>Signature/Thumb Impression</Text>
            </View>
            {Array.from({ length: 1 })?.map((items: any, index: any) => (
              <View
                key={index}
                style={{
                  height: '60px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-start',
                  borderRight: 0,
                  alignItems: 'flex-start',
                  color: '#6E2585',
                  borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              >
                <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              // height: '150px',
              borderRight: '1px solid #6E2585',
              fontSize: '10px',
              borderTop: '1px solid #6E2585',
              // borderBottom: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              width: '33.3333333333%',
            }}
          >
            <View
              style={{
                backgroundColor: '#C0C0C0',
                justifyContent: 'center',
                borderBottom: '1px solid #6E2585',
                alignItems: 'center',
                color: '#6E2585',
                width: '100%',
                padding: 1,
                // padding: '8px',
                // height: '30px',
              }}
            >
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                Signature/Thumb Impression Verified (Bank use only)
              </Text>
            </View>
            {Array.from({ length: 1 })?.map((items: any, index: any) => (
              <View
                style={{
                  height: '60px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-start',
                  borderRight: 0,
                  alignItems: 'flex-start',
                  color: '#6E2585',
                  borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              >
                <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',

            backgroundColor: '#FFFACD',
            padding: '5px',
            gap: 1,
          }}
        >
          <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BRANCH USE ONLY</Text>

          <View style={{ flexDirection: 'column', gap: '10px' }}>
            {/*  */}
            <View style={{ flexDirection: 'row', width: '100%', gap: 5 }}>
              <View style={{ flexDirection: 'column', width: '50%', gap: 5 }}>
                <InputComp inputOne="CIF No." outputOne={' '} />
                <InputComp inputOne="Branch:" outputOne={' '} />
                <InputComp inputOne="Card Type:" outputOne={' '} />
              </View>
              <View style={{ flexDirection: 'column', width: '50%', gap: 5 }}>
                <InputComp inputOne="Recommended by:" outputOne={' '} />
                <InputComp inputOne="Signature:" outputOne={' '} />
                <InputComp inputOne="Card Limit:" outputOne={' '} />
              </View>
            </View>
            {/*  */}
            <View style={{ flexDirection: 'row', gap: '15px',alignItems:'center' }}>
              <Text style={styles.secondLabel}>Customer Segment:</Text>
              <View style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox} />
                  <Text style={styles.secondLabel}>Mass</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox} />
                  <Text style={styles.secondLabel}>Mass Affluent </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox} />
                  <Text style={styles.secondLabel}>Affluent</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox} />
                  <Text style={styles.secondLabel}>VIP</Text>
                </View>
              </View>
            </View>
            {/*  */}
            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View
                  style={{
                    height: '100px',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '21%',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#C0C0C0',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      borderBottom: '1px solid #6E2585',
                      // alignItems: 'flex-start',
                      color: '#6E2585',
                      // width: '100%',
                    }}
                  >
                    <Text style={{ ...styles.textFont, textAlign: 'center' }}>Processed and Input By</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: '100px',
                    borderRight: '1px solid #6E2585',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
                    width: '20%',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#C0C0C0',
                      display: 'flex',
                      // justifyContent: 'flex-s/tart',
                      borderBottom: '1px solid #6E2585',

                      // alignItems: 'flex-start',
                      color: '#6E2585',
                      // height: '30px',
                      // width: '100%',
                    }}
                  >
                    <Text style={{ ...styles.textFont, textAlign: 'center' }}>DSR / PBO Code</Text>
                  </View>
                </View>

                <View
                  style={{
                    borderRight: '1px solid #6E2585',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                    // borderLeft: '1px solid #6E2585',
                    width: '18%',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#C0C0C0',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      borderBottom: '1px solid #6E2585',

                      // alignItems: 'flex-start',
                      color: '#6E2585',
                      // width: '100%',
                    }}
                  >
                    <Text style={{ ...styles.textFont, textAlign: 'center' }}>Branch Sales Code</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: '100px',
                    borderRight: '1px solid #6E2585',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                    // borderLeft: '1px solid #6E2585',
                    width: '40.33333%',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#C0C0C0',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      borderBottom: '1px solid #6E2585',

                      // alignItems: 'flex-start',
                      color: '#6E2585',
                      // width: '100%',
                    }}
                  >
                    <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                      Data Input Verified and Authorised By
                    </Text>
                  </View>
                  {/* {Array.from({ length: 2 })?.map((items: any, index: any) => (
                        <View
                          key={index}
                          style={{
                            height: '30px',
                            // backgroundColor: '#C0C0C0',
                            justifyContent: 'center',
                            borderRight: 0,
                            alignItems: 'center',
                            color: '#6E2585',
                            borderBottom: '1px solid #6E2585',
                            width: '100%',
                            // padding: '8px',
                          }}
                        >
                          <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
                        </View>
                      ))} */}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                borderRight: '1px solid #6E2585',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E', padding: 2 }}>
                FOR CARDS OPERATIONS USE ONLY
              </Text>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flexDirection: 'column', width: '50%' ,gap:5,paddingLeft:5 }}>
                  <InputComp inputOne="Application Reference No.:" outputOne={' '} />
                  <InputComp inputOne="Logo.:" outputOne={' '} />
                </View>
                <View style={{ flexDirection: 'column', width: '50%',gap:5 }}>
                  <InputComp inputOne="NBR:" outputOne={' '} />
                  <InputComp inputOne="PCT:" outputOne={' '} />
                </View>
              </View>

              <View style={{ width: '100%' }}>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      // height: '100px',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      // borderLeft: '1px solid #6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '20%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        borderBottom: '1px solid #6E2585',
                        // alignItems: 'flex-start',
                        color: '#6E2585',
                        // width: '100%',
                      }}
                    >
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>User</Text>
                    </View>
                    <View
                      style={{
                        height: '30px',
                        // backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        // borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                        // padding: '8px',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}>Input</Text>
                    </View>

                    <View
                      style={{
                        height: '30px',
                        // backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        // borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        // borderBottom: '1px solid #6E2585',
                        width: '100%',
                        // padding: '8px',
                      }}
                    >
                      <Text style={{ fontSize: 8, marginTop: 5 }}>Authorizer</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      // height: '100px',
                      borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderBottom: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      width: '20%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        display: 'flex',
                        // justifyContent: 'flex-s/tart',
                        borderBottom: '1px solid #6E2585',

                        // alignItems: 'flex-start',
                        color: '#6E2585',
                        // height: '30px',
                        // width: '100%',
                      }}
                    >
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>User ID</Text>
                    </View>

                    <View
                      style={{
                        height: '30px',
                        // backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                        // padding: '8px',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}></Text>
                    </View>

                    <View
                      style={{
                        height: '30px',
                        // backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        // borderBottom: '1px solid #6E2585',
                        width: '100%',
                        // padding: '8px',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}></Text>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100px',
                      borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '20%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        borderBottom: '1px solid #6E2585',
                        // alignItems: 'flex-start',
                        color: '#6E2585',
                        // width: '100%',
                      }}
                    >
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Name</Text>
                    </View>
                    <View
                      style={{
                        height: '30px',
                        // backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                        // padding: '8px',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}> </Text>
                    </View>
                    <View
                      style={{
                        height: '30px',
                        // backgroundColor: '#C0C0C0',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        // borderBottom: '1px solid #6E2585',
                        width: '100%',
                        // padding: '8px',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}> </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      height: '100px',
                      borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderBottom: '1px solid #6E2585',
                      // borderLeft: '1px solid #6E2585',
                      width: '20%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        borderBottom: '1px solid #6E2585',

                        // alignItems: 'flex-start',
                        color: '#6E2585',
                        // height: '30px',
                        // width: '100%',
                        // padding: '7px',
                      }}
                    >
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Signature</Text>
                    </View>

                    <View
                      style={{
                        height: '30px',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    ></View>
                    <View
                      style={{
                        height: '30px',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        //  borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    ></View>
                  </View>

                  <View
                    style={{
                      height: '100px',
                      // borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderBottom: '1px solid #6E2585',
                      // borderLeft: '1px solid #6E2585',
                      width: '20%',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#C0C0C0',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        borderBottom: '1px solid #6E2585',

                        // alignItems: 'flex-start',
                        color: '#6E2585',
                        // height: '30px',
                        // width: '100%',
                        // padding: '7px',
                      }}
                    >
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Date/Time</Text>
                    </View>

                    <View
                      style={{
                        height: '30px',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    ></View>
                    <View
                      style={{
                        height: '30px',
                        justifyContent: 'center',
                        borderRight: 0,
                        alignItems: 'center',
                        color: '#6E2585',
                        //  borderBottom: '1px solid #6E2585',
                        width: '100%',
                      }}
                    ></View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: '100%', marginTop: 5 }}>
            <View style={styles.thirdRow}>
              <View style={{ flexDirection: 'column', gap: 5, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.textFont}>Primary Card No.: </Text>
                  <View style={{ marginLeft: 33 }}>
                    <AccountBoxes length={16} />
                  </View>
                </View>
                <View style={styles.checkboxRow}>
                  <Text style={styles.textFont}>Supplementary 1 Card No.: </Text>
                  <AccountBoxes length={16} />
                </View>
                <View style={styles.checkboxRow}>
                  <Text style={styles.textFont}>Supplementary 2 Card No.: </Text>
                  <AccountBoxes length={16} />
                </View>
                <View style={styles.checkboxRow}>
                  <Text style={styles.textFont}>Supplementary 3 Card No.:</Text>
                  <View style={{ marginLeft: 2 }}>
                    <AccountBoxes length={16} />
                  </View>
                  =
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
          {/* <Text style={styles.label}>Terms and Conditions for Smart Ven Credit Card </Text> */}
          <View>
            <Text style={styles.clause}>Terms and Conditions for Smart Ven Credit Card</Text>

            <Text style={styles.clause}>
              The issuance and usage of the Smart Ven Credit Card shall be subject to the following terms and
              conditions:
            </Text>

            <Text style={styles.clause}>1. Definitions</Text>
            <Text style={styles.subClause}>The Bank: Smart Ven</Text>
            <Text style={styles.subClause}>
              Debit Card: The bank debit card is a card used for payment of cash purchases between the customer, the
              Bank and the merchant; it is used to pay for goods and services and for cash withdrawals from ATM’s
              (Automated Teller Machines) and cash withdrawals from banks bearing the OmanNet, GCCNET, Visa or
              MasterCard logos
            </Text>
            <Text style={styles.subClause}>
              Credit Card: A card with credit line provided by the Bank to a customer to be used for Cash withdrawal
              over ATM or Purchases on credit from Point of Sale terminals.
            </Text>
            <Text style={styles.subClause}>
              Personal Identification Number (PIN): Secret number that is given to customers in sealed envelopes or
              generated by customer through ATM or Phone banking. The PIN is used for cash withdrawals, for balance
              enquiries over ATM’s and for verification on POS machines.
            </Text>
            <Text style={styles.subClause}>
              Customer / Cardholder: means an individual to whom a card, bearing that individual’s name, is issued by
              the Bank and includes the Primary Cardholder and any Supplementary Cardholder. Reference in these Terms
              and Conditions to ‘Cardholder’ shall mean Primary Cardholder and/or Supplementary Cardholder as shall be
              appropriate in the context.
            </Text>
            <Text style={styles.subClause}>Branch: All Smart Ven branches.</Text>
            <Text style={styles.subClause}>
              Supplementary Card: Secondary Card under the primary Credit Card account.
            </Text>
            <Text style={styles.subClause}>
              Renewal of Credit Card: Renewing customer credit card facility after card expiration.
            </Text>
            <Text style={styles.subClause}>
              Replacement Card: Replacing customer physical credit card with new card number.
            </Text>
            <Text style={styles.subClause}>
              Credit Card Account: Means the account allocated to a Card for the purpose of entering all credits and
              debits received and (or) incurred by the Primary Cardholder and (or) the Supplementary Cardholder, if any,
              under these Terms and Conditions for that Credit Card.
            </Text>
            <Text style={styles.subClause}>
              Credit Card Statement: Means Bank’s monthly statement issued to the Primary Cardholder showing particulars
              of the Card Transactions since the last Card Statement and the Current Balance and Minimum Amount Due
              payable to the Bank by the Payment Due Date and sent to the Primary Cardholder at the postal address
              provided by Customer or by such other means as may be agreed with Customer.
            </Text>
            <Text style={styles.subClause}>
              Credit Card Limit: Is the amount of purchases on credit that is approved by the Bank to the credit
              cardholder.
            </Text>
            <Text style={styles.subClause}>
              Credit Card Services: The department within the bank responsible for issuing and embossing of all types of
              cards.
            </Text>
            <Text style={styles.subClause}>
              Annual Membership Subscription Fees: Is the fees which client pays to the Bank to issue the different
              types of Credit Cards.
            </Text>

            <Text style={styles.superClause}>Sharia Compliant Credit Card</Text>
            <Text style={styles.clause}>1. Qard Hassan</Text>
            <Text style={styles.subClause}>
              1.1 Bank shall make available to the Cardholder the Credit Limit based on the Sharia principle of
              profit-free loan (Qard Hasan). The Credit Limit may be utilized by the Cardholder for Card Transactions
              for the specified payment period.
            </Text>
            <Text style={styles.subClause}>
              1.2 Bank, may at any time, with prior notice to the Cardholder reduce the Credit Limit. In such an event,
              the Cardholder shall be required to repay the outstanding credit amount to be within the new Credit Limit.
            </Text>
            <Text style={styles.clause}>2. Credit Card Delivery and Usage</Text>
            <Text style={styles.subClause}>
              2.1 Customer shall sign the bank register to confirm receipt of the card.
            </Text>
            <Text style={styles.subClause}>
              2.2 Customer will generate the PIN by calling the Phone Banking using IVR System.
            </Text>
            <Text style={styles.subClause}>
              2.3 Customer may request the Bank to send the Credit Card by mail. In this case, Bank shall not bear any
              responsibility if customer didn’t receive the card.
            </Text>
            <Text style={styles.subClause}>
              2.4 Customer can use the credit card limit within the validity period which is clearly embossed on it.
            </Text>

            <Text style={styles.clause}>3. Supplementary Card</Text>
            <Text style={styles.subClause}>
              3.1 The Customer/Primary Credit Cardholder can request the bank to issue Supplementary Credit Card in
              addition to the Primary Credit Card account and within the approved credit limit.
            </Text>
            <Text style={styles.subClause}>
              3.2 The Primary cardholder will be fully responsible for all amount debits to the Credit Card account. As
              well as any expenses or charge imposed on the Credit Card
            </Text>
            <Text style={styles.subClause}>
              3.3 The Primary card and all supplementary cards shall be subject to the maximum credit limit allowed by
              the bank.
            </Text>
            {/* <Text style={styles.subClause}>3.4 Card can be used within its validity period only.</Text> */}

            <Text style={styles.clause}>4. Card Account</Text>
            <Text style={styles.subClause}>
              4.1 The Bank will debit the Credit Card Account for fees and all transaction amounts resulting from
              customer usage of the card.
            </Text>
            <Text style={styles.subClause}>
              4.2 The amount of any Credit Card transaction, in any currency other than Omani Rials, will be converted
              at the prevailing market rate of exchange on the date when the transaction is debited to the Credit Card
              Account.
            </Text>
            <Text style={styles.subClause}>
              4.3 The Bank shall charge the customer for the Credit Card fees during the first month of the card
              issuance, replacement and renewal in accordance with the annual fees set by the bank for each Credit Card
              type, and such fees shall be considered as due and are non-refundable
            </Text>
          </View>
        </View>

        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.clause}>5. Credit Card Statement</Text>
          <Text style={styles.subClause}>
            5.1 The bank shall issue Credit Card Statements at specified intervals. Unless instructed by the customer in
            writing to hold all correspondence, the Bank will dispatch Statements and advices to the customer’s postal
            address as recorded in Bank’s records. The same will be deemed to have been received by the customer.
          </Text>
          <Text style={styles.subClause}>
            5.2 The customer should carefully check the Transactions in the Statement, and any error or discrepancy must
            be notified in writing to the Bank within (15) fifteen days from the date on which the Statement is sent to
            the customer address. If the Cardholder gives no such notice, the Statement will be deemed to be correct and
            the Bank will not be liable or responsible for any further objection received from the Customer
          </Text>
          <Text style={styles.subClause}>
            5.3 If the Cardholder does not receive a Statement for any period, customer remains liable to pay the due
            amount.
          </Text>

          <Text style={styles.clause}>6. Payment of Fees</Text>
          <Text style={styles.subClause}>
            6.1 The Annual Subscription Fee shall be calculated in accordance with the Bank’s “Services & Price Guide”.
            The Customer acknowledges and agrees that the Annual Subscription Fee may be amended by the Bank at its sole
            discretion. Bank shall notify the customer of the revised Fee by making the relevant changes to the Schedule
            available at the Bank branches or on the Website.
          </Text>
          <Text style={styles.subClause}>
            6.2 The Cardholder(s) shall be liable to pay the Annual Subscription Fee and all dues as per the bank
            records upon the request of the Bank.6.2 Cardholders must pay fees and dues as recorded by the Bank.
          </Text>
          <Text style={styles.subClause}>
            6.3 The Annual Subscription Fee shall be added to the Credit Card Statement issued to the customer.
          </Text>
          <Text style={styles.subClause}>
            6.4 The Annual Subscription Fees as presented by the Bank for each Credit Card type shall be paid by the
            Cardholder when the Credit Card is issued or renewed, and upon issuance or renewal of every Primary and
            Supplementary Cards.
          </Text>
          <Text style={styles.subClause}>
            6.5 For avoidance of doubt, the Annual Subscription Fee that shall be paid by the Cardholder has no linkages
            directly or indirectly with the credit limit granted by the Bank to the credit cardholder(s)
          </Text>
          <Text style={styles.subClause}>
            6.6 The Primary Cardholder agrees to pay the total amount of all Charges described as the Current Balance
            specified in the Credit Card Statement. Such Charges to be due in full and payable not later than the
            Payment Due Date specified on the Credit Card Statement.{' '}
          </Text>
          <Text style={styles.subClause}>
            6.7 The Primary Cardholder may choose not to settle the Current Balance in full, in which case the
            Cardholder must pay at least the Minimum Amount Due on or before the Payment Due Date. If the Current
            Balance is less than as prescribed by the Bank from time to time, the Current Balance becomes fully due. If
            the Minimum Amount Due is not paid by the Payment Due Date or only partly paid, the unpaid amount of such
            Minimum Amount Due will be included in the next Card Statement’s Minimum Amount Due.{' '}
          </Text>
          <Text style={styles.subClause}>
            6.8 If the Credit Cardholder fails to pay the Minimum Amount Due Date, the Cardholder undertakes to pay an
            agreed amount to charity calculated at the rate of (1%) of the unpaid amount in addition to any actual cost
            incurred by the Bank, if any, (excluding any loss of profit, cost of funding or any other amount in the
            nature of interest) which will be paid to Charity as per the guidelines provided by the Bank’s Sharia
            Supervisory Board.{' '}
          </Text>
          <Text style={styles.subClause}>
            The Customer authorizes the Bank to debit Fees or Charges due to the Bank from any of Credit Cardholder
            accounts.
          </Text>
          <Text style={styles.clause}>7. Loss of Credit Card and Security Code</Text>
          <Text style={styles.subClause}>
            7.1 Bank will issue a Security Code for the Credit Cardholder for use at any ATM or electronic device which
            accepts the Credit Card, and the Credit Cardholder agrees that the PIN may be sent by post or courier to the
            Credit Cardholder at the Customer’s risk.
          </Text>
          <Text style={styles.subClause}>
            7.2 Bank will issue a Security Code for the Credit Cardholder’s use with Phone Services, and the Credit
            Cardholder agrees that the Security Code may be generated over the telephone or any other communication
            device or may be sent by post or courier to the Cardholder at the Customer’s risk.
          </Text>
          <Text style={styles.subClause}>
            7.3 When any Security Code is advised by mail or courier, the Credit Cardholder must memorize the Security
            Code and immediately destroy the advice
          </Text>
          <Text style={styles.subClause}>
            7.4 The Credit Cardholder shall be fully liable for Credit Card Transactions made with the Security Code,
            whether with or without the knowledge of the Cardholder.
          </Text>
          <Text style={styles.subClause}>
            7.5 The Credit Cardholder shall take all reasonable precautions to prevent the loss or theft of the Credit
            Card, and shall not disclose the Security Code to any party
          </Text>
          <Text style={styles.subClause}>
            7.6 In the event that the Credit Card is lost or stolen, or the Security Code is disclosed to any other
            party, the Credit Cardholder shall immediately notify the said loss, theft or disclosure together with the
            particulars thereof to the Bank and to the police of the country where such loss or theft or disclosure
            occurred.
          </Text>
          <Text style={styles.subClause}>
            7.7 The Credit Cardholder shall be and remains fully liable to make payment to the Bank for any debit to the
            Credit Card Account arising from any Card Transactions, Cash Withdrawal, ATM transactions, utility payments
            and/or any services or facilities provided through Phone Services, effected through the use of the Credit
            Card and/or Security Code by any person whether with or without knowledge of the Cardholder.
          </Text>
          <Text style={styles.subClause}>
            7.8 Bank may at its sole discretion issue a replacement Credit Card for any lost or stolen Credit Card, or a
            new Security Code on these Terms and Conditions or such other terms and conditions that the Bank may deem
            fit.
          </Text>
          <Text style={styles.subClause}>
            7.9 In the event that the lost or stolen Credit Card is recovered, the Cardholder shall immediately not use
            it and cut the recovered Credit Card in half and return the cut card to the Bank. The Credit Cardholder
            shall not use the Security Code after reporting to the Bank of the disclosure of the same to any other
            party.
          </Text>
        </View>{' '}
      </Page>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.clause}>8. Credit Card Conditions</Text>
          <Text style={styles.subClause}>
            8.1 The Credit Card is and will at all times remain the property of the Bank and must be delivered to the
            Bank immediately upon request by the Bank or its duly authorized agent.
          </Text>
          <Text style={styles.subClause}>
            8.2 The Primary Credit Card and Supplementary Credit Cards may be collected by the Primary Credit Cardholder
            or sent by post or courier to the address notified to the Bank by the Credit Cardholder at the risk of the
            Primary Credit Cardholder. Supplementary Credit Cards will be delivered as instructed by, and at the risk of
            the Primary Credit Cardholder.
          </Text>
          <Text style={styles.subClause}>
            8.3 Upon receipt of the Credit Card, the Cardholder shall sign on the back of the Card immediately and such
            signature and/or activation and/ or use of the Credit Card will constitute binding and conclusive evidence
            of the confirmation of the Cardholder to be bound by these Terms and Conditions, and for which purpose the
            Primary Credit Cardholder hereby appoints all Supplementary Credit Cardholders as the Customer’s agent for
            this purpose, notwithstanding that the Bank is not notified of the Cardholder’s receipt of the Card.
          </Text>
          <Text style={styles.subClause}>
            8.4 In the event the Cardholder does not wish to be bound by these Terms and Conditions, the Cardholder
            shall cut the card in half and return both halves to the Bank, and clause (9.5) hereof shall henceforth be
            operative.
          </Text>
          <Text style={styles.subClause}>
            8.5 The Credit Card is not transferable and shall be used exclusively by the Cardholder. The Credit
            Cardholder under no circumstance whatsoever will allow the Credit Card and/or the Security Code be used by
            any other individual. The Credit Card may not be pledged by the Cardholder as security for any purpose
            whatsoever.
          </Text>
          <Text style={styles.subClause}>
            8.6 The Credit Cardholder shall at all times ensure that the Credit Card is kept in a safe place and is
            responsible for safe keeping the card at all times.
          </Text>

          <Text style={styles.clause}>9. Use of the Credit Card</Text>
          <Text style={styles.subClause}>9.1 The Credit Card may be used for Credit Card Transactions:</Text>
          <Text style={{ ...styles.subClause, marginLeft: 5 }}>
            (a) Within the Credit Limit notified by the Bank to the Primary Credit Cardholder, and
          </Text>
          <Text style={{ ...styles.subClause, marginLeft: 5 }}>
            (b) Until the last day of the expiry month embossed on the Credit Card.
          </Text>
          <Text style={styles.subClause}>
            9.2 If any Credit Cardholder loses or damages the Credit Card or requires replacement or Supplementary
            Cards, Bank may at its discretion issue such Card or Cards as Primary Credit Cardholder may request in
            writing, or through Phone Services
          </Text>
          <Text style={styles.subClause}>
            9.3 The Credit Cardholder undertakes to act in good faith at all times in relation to all dealings with the
            Credit Card and with the Bank, and not to use the Credit Card for any Sharia non-compliant or illegal or
            immoral purposes.
          </Text>
          <Text style={styles.subClause}>
            9.4 Certain purchases of goods and services, such as alcohol, pork and pork related products, gambling,
            pornography and illegal activities, and others, are prohibited under the principles of the Islamic Sharia.
            It is the Cardholder’s responsibility to ensure that the Credit Card is utilized for Card Transactions which
            are not contrary, offensive or repugnant to the principles of the Islamic Sharia.
          </Text>
          <Text style={styles.subClause}>
            9.5 Notwithstanding that the Credit Cardholder’s Card Limit has not been reached, Bank shall be entitled to,
            at any time, including but not limited to clause (8.4), and giving notice to Credit Cardholder and without
            liability towards Bank, withdraw and restrict the Credit Cardholder’s right to use the Credit Card or to
            refuse to authorise any Credit Card Transaction.
          </Text>
          <Text style={styles.subClause}>
            9.6 The Credit Cardholder will at all times remain liable for any Credit Card Transaction, and Bank records
            in respect of any Credit Card Transaction will be conclusive and binding on the Credit Cardholder
          </Text>
          <Text style={styles.subClause}>
            9.7 Bank will provide a Security Code to be used in conjunction with the Card when effecting a Transaction
            (locally or internationally), which may or may not be required at the time of the Transaction.
          </Text>
          <Text style={styles.subClause}>
            9.8 Bank’s record of any Transaction effected by the Primary Credit Cardholder or Supplementary Credit
            Cardholder in conjunction with a Security Code shall be binding on the Primary Credit Cardholder as to its
            consequence.
          </Text>
          <Text style={styles.subClause}>
            9.9 Bank’s record of any Transaction effected by the Primary Credit Cardholder or Supplementary Credit
            Cardholder in conjunction with a Security Code shall be binding on the Primary Credit Cardholder as to its
            consequence.
          </Text>

          <Text style={styles.subClause}>
            I confirm that I am fully aware and shall be held liable for any unauthorised/fraudulent transactions
            charged to my Card and not authorised by me before the request was given to the Bank.
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text
                style={{ borderBottomWidth: 1, borderBottomColor: '#6E2B8C', color: '#6E2B8C', width: '100px' }}
              ></Text>
              <Text style={{ fontSize: 8 }}>Customer Name</Text>
            </View>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text
                style={{ borderBottomWidth: 1, borderBottomColor: '#6E2B8C', color: '#6E2B8C', width: '100px' }}
              ></Text>
              <Text style={{ fontSize: 8 }}>Customer Signature</Text>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 115,
                    marginRight: 5,
                    marginLeft: 23,
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 8, color: 'gray', marginLeft: 1, marginRight: 2 }}>DD</Text>
                  <Text style={{ fontSize: 8, color: 'gray', marginRight: 15, marginLeft: 3 }}>MM</Text>
                  <Text style={{ fontSize: 8, color: 'gray', marginRight: 7 }}>YYYY</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                  <Text style={{ color: '#6E2B8C', paddingTop: 2 }}>Date:</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {Array.from({ length: 8 })?.map((items: any, index: number) => {
                      const extraMargin = index === 1 || index === 3 ? '5px' : '2px';
                      return (
                        <View
                          key={index}
                          style={{
                            width: 15,
                            height: 15,
                            borderWidth: 1,
                            borderColor: '#6E2B8C',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 8,
                            fontWeight: 'bold',
                            color: '#000',
                            marginRight: extraMargin,
                            textAlign: 'center',
                            paddingTop: '2px',
                            paddingLeft: '2px',
                          }}
                        >
                          <Text style={{ fontSize: 7, padding: '0px' }}>{items ? items : null} </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}
