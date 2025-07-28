'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { ArabicPrimarySupplementaryCardReqFormPDFProps } from './pdf-arabic-forms/arabic-primary-supplementary-card-service-form';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PdfTable } from './pdf-table-component';
import { PDFTermsAndCondition } from './sections/pdf-terms-condition';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' }],
});

export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  totalAmount: number;
}
const termsConditionData = {
  title: 'Terms and Conditions for Demand Draft/Telegraphic Transfers :',
  list: [
    {
      title: '',
      description: [
        {
          isClosure: true,
          text: 'I/We declare that all information provided to the Bank are true and accurate.',
        },
        {
          isClosure: true,
          text: 'I/We agree that this transfer shall be undertaken according and subject to the Bank’s applicable policies and regulations.',
        },
        {
          isClosure: true,
          text: 'Knowing that the Bank will exercise reasonable care for effecting transfer using the most reliable means available, the transfer remains entirely at my risk especially in case of delay, loss, error, mutilation, mistake in the transfer and communication by your correspondents and agents.',
        },

        {
          isClosure: true,
          text: 'Charges and Commissions : ',
          subClause: [
            {
              text: 'The Bank will debit the charges and commissions to the customer’s account for the processing of the remittance application/demand draft issuance as per the published schedule charge guide. The charges may be revised from time to time at the discretion of the Bank.',
            },
            {
              text: 'In the absence of any specific instructions all charges/commission outside Oman are on the beneficiary’s account.',
            },
            {
              text: 'A Correspondent Bank may charge commission, fees or other charges in making the payments to the beneficiary account. The correspondent Bank will either deduct those commission, fees or charges from the fund paid to the beneficiary account or pass them on to the sender bank (Bank Nizwa).',
            },
          ],
        },

        {
          isClosure: true,
          text: 'Unless I/We issue different instruction, the transfer will be effective in the currency of the jurisdiction of the destination and subject to related cutoff times or any other regulations applicable in that jurisdiction.',
          subClause: [],
        },

        {
          isClosure: true,
          text: 'This Demand Draft is the sole property of the Bank and normally is valid for a maximum period of 6 months. The Purchaser should not amend or alter it. It should be duly validated by the Bank.',
          subClause: [],
        },

        {
          isClosure: true,
          text: 'The Demand Draft should be handled safely and in case of loss of the draft, the purchaser should immediately inform the Bank. Refund will be considered only after confirmation of the stop payment instruction received from the Drawee Bank.',
          subClause: [],
        },

        {
          isClosure: true,
          text: 'I/We indemnify the Bank and the Bank is not liable for immediate refund if the Draft is lost or stolen and the Bank and it’s Correspondent are not liable for any fraudulent encashment. It is further understood that the Bank chooses its Correspondent at my/our risk and responsibility. I/We also declare that the issuing Bank shall not be liable for any compensation in respect of delay in encashment of the Draft by Drawee Bank including those caused by the variations of signature or missing drawing advices.',
          subClause: [],
        },
      ],
    },
  ],
};

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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    width: '100px',
    fontSize: 8,
    marginLeft: 5,
    paddingTop: 5,
  },
  checkBoxColor: {
    height: '100%',
    width: '100%',
    backgroundColor: '#6E2585',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inlineProp: {
    display: 'flex',
    direction: 'row',
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
    justifyContent: 'space-between',
    // width: '70%',
    paddingLeft: 5,
    // gap: 5,
  },
  thirdRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingLeft: 5,
    gap: 8,
  },
  headerText: {
    fontSize: 10,
    color: '#6E2B8C',
  },
  section: {
    marginBottom: 12,
  },
  boldText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  textFont: {
    fontSize: 8,
    color: '#6E2B8C',
  },
  textFontCheckBox: {
    fontSize: 10,
    marginTop: 2,
    color: '#6E2B8C',
  },
  smallText: {
    fontSize: 8,
    // marginTop: 5,
    textAlign: 'center',
    color: '#6E2B8C',
    fontWeight: 'black',
  },
  label: {
    fontWeight: 'bold',
    // marginTop: 4,
    marginRight: 2,
    color: '#6E2B8C',
  },
  secondLabel: {
    // fontWeight: 'bold',
    marginTop: 4,
    // marginRight: 5,
    color: '#6E2B8C',
    fontSize: 9,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',

  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    // justifyContent: 'space-between',
    textAlign: 'center',
    marginBottom: 5,
  },
  dateCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 5,
    marginLeft: 8,
  },
  smallCheckbox: {
    width: 10,
    marginRight: 2,
    height: 10,
    borderWidth: 1,
    borderColor: '#6E2B8C',
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'center',
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
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
  },
  littleText: {
    fontSize: 6,
    color: '#6E2B8C',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function BusinessDebitCardFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('here is our data', data?.creatdAt);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.createdAt)?.format('DDMMYYYY');
  const dateOfJoin = dayjs(formdetails?.createasrEmpDateOfJoiningdAt)?.format('DD/MM/YYYY');
  const passExpiry = dayjs(formdetails?.asrPassportExpiryDate)?.format('DD/MM/YYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
          </View>

          <View style={{ flexDirection: 'column', gap: 2 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
              Note: Please complete in Block letters and sign in the appropriate space.
            </Text>
            <View style={{ flexDirection: 'column', gap: '3' }}>
              <InputComp inputOne="Rrquest Time" />
              <InputComp inputOne="Branch" outputOne={formdetails?.busDebCardBranch?.value || 'N/A'} />
            </View>
            <PdfTable
              head="COMPANY GENERAL INFORMATION"
              body={
                <View style={{ flexDirection: 'column', gap: 2, padding: 4, alignItems: 'flex-start' }}>
                  <View style={{ flexDirection: 'column', gap: 1 }}>
                    <InputComp inputOne="Company Name:" outputOne={formdetails?.busDebCardCompanyName || 'N/A'} />
                    <Text style={styles.littleText}>
                      (Business Debit card eligibility is only for companies / entities registered in Oman)
                    </Text>
                  </View>
                  <InputComp
                    inputOne="CIF or Account No. with Bank Nizwa:"
                    outputOne={formdetails?.busDebCardCIFAccountNoWithBankNizwa || 'N/A'}
                  />
                  <Text style={styles.textFont}>Business Category:</Text>
                  <CheckBoxComp
                    label={formdetails?.busDebCardBusinessCategory?.value}
                    val={formdetails?.busDebCardBusinessCategory?.value}
                  />
                  <InputComp
                    inputOne="Nature of Business"
                    outputOne={formdetails?.busDebCardNatureofBusiness || 'N/A'}
                  />
                </View>
              }
            />
            <PdfTable
              head="CARD HOLDER INFORMATION (AUTHORISED PERSON TO USE THE CARD)"
              body={
                <View style={{ flexDirection: 'column', gap: 2, padding: 4 }}>
                  <InputComp inputOne="Name" outputOne={formdetails?.busDebCardCHIAPCName || 'N/A'} />
                  <InputComp inputOne="Position:" outputOne={formdetails?.busDebCardCHIAPCPosition || 'N/A'} />
                  <InputComp
                    inputOne="Nationality:"
                    outputOne={formdetails?.busDebCardCHIAPCNationality?.value || 'N/A'}
                  />
                  <InputComp inputOne="Email ID:" outputOne={formdetails?.busDebCardCHIPACEmailID || 'N/A'} />
                  <InputComp
                    inputOne="Civil ID / Resident ID/ Passport:"
                    outputOne={formdetails?.busDebCardCHIPACCivilResidentIDPassport || 'N/A'}
                  />
                  <InputComp
                    inputOne="Date of Issue of ID / Passport: "
                    outputOne={
                      dayjs(formdetails?.busDebCardCHIPACDateofIssueIDPassport).format('MMM D, YYYY h:mm A') || 'N/A'
                    }
                  />
                  <InputComp
                    inputOne="Date of Expiry of ID / Passport: "
                    outputOne={
                      dayjs(formdetails?.busDebCardCHIPACDateofExpiryIDPassport).format('MMM D, YYYY h:mm A') || 'N/A'
                    }
                  />
                </View>
              }
            />
            <PdfTable
              head="REQUEST FOR NEW DEBIT CARD"
              body={
                <View style={{ flexDirection: 'column', gap: 10, alignItems: 'flex-start', padding: 4 }}>
                  <CheckBoxComp
                    label="Open new current a/c & link card"
                    val={formdetails?.busDebCardRNDCOpenNewCurrentAC}
                  />
                  <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                    <CheckBoxComp
                      label="Link card to existing current a/c:"
                      val={formdetails?.busDebCardRNDCLinkCardCurrentAc}
                    />
                    <AccountBoxes data={formdetails?.busDebCardRNDCAccountNo?.split('')} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Text style={styles.textFont}>Card Holder’s Oman GSM number for OTP delivery:</Text>
                    <Text style={styles.textFont}>+968 </Text>
                    <AccountBoxes data={formdetails?.busDebCardRNDCCardHolderOTPNumber?.split('')} />
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                    <Text style={styles.textFont}>Name to be displayed on the Card: </Text>
                    <View style={{flexDirection:'column', alignItems:"flex-start"}}>
                    <View style={{ flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
                      <Text style={styles.textFont}>(Corporate short name) </Text>
                      <AccountBoxes data={formdetails?.busDebCardRNDCCorporateShortName?.split('')} />
                    </View>
                    <View style={{ flexDirection: 'column', gap: 2,marginTop:3,  justifyContent: 'center' }}>
                      <Text style={styles.textFont}>(Card Holder’s official title / short name)</Text>
                      <AccountBoxes data={formdetails?.busDebCardRNDCCardHolderOfficeTItleName?.split('')} />
                    </View></View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
                    <View style={{ flexDirection: 'column', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={styles.textFont}>New Card Number: </Text>
                      <Text style={styles.textFont}>(Bank use only)</Text>
                    </View>
                    <AccountBoxes length={16} />
                  </View>
                </View>
              }
            />
            </View>
        </View>
        <PdfFooter/>
      </Page>
      <Page size="A4" style={styles.page}>

            <PdfTable
              head="POS / CASH WITHDRAWAL LIMIT FOR BUSINESS DEBIT CARD"
              body={
                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View
                      style={{
                        width: '20%',
                        padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        backgroundColor: '#C0C0C0',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}>NETWORK</Text>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        backgroundColor: '#C0C0C0',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}>TRANSACTION TYPE</Text>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        backgroundColor: '#C0C0C0',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}>ENABLE SERVICE{'\n'}( Yes / No)</Text>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        backgroundColor: '#C0C0C0',
                        borderBottom: '1px solid #6E2B8C',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}>DEFAULT DAILY LIMIT (OMR)</Text>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        backgroundColor: '#C0C0C0',
                        borderLeft: '1px solid #6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                      }}
                    >
                      <Text style={{ fontSize: 8 }}>
                        NEW DAILY LIMIT (OMR) (To be filled only If any {'\n'}default limit to be changed)
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%',height:"auto"}}>
                    <View
                      style={{
                        width: '20%',
                        // justifyContent: 'center',
                        // padding: 4,
                        // textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center', }}>
                        <Text style={{ fontSize: 8 }}>POS </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        // padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column'  }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            // justifyContent: 'center',
                            // alignItems: 'flex-start',
                          }}
                        >
                          <Text style={{ fontSize: 8 }}>OmanNet / GCCnet</Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            // alignItems: 'flex-start',
                          }}
                        >
                          <Text style={{ fontSize: 8 }}>Master Card - International</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',

                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column' }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCPOSONGCCEnableService?.value || 'N/A'}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCPOSMCIEnableService?.value || 'N/A'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',

                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column' }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>20000</Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>20000</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',

                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        // borderRight: "1px solid #6E2B8C",
                      }}
                    >
                      <View style={{ flexDirection: 'column' }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCPOSONGCCNewDailyLimit || 'N/A'}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {' '}
                            {formdetails?.busDebCardCWLBDCPOSMCINewDailyLimit || 'N/A'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* )} */}

                  {
                    // formdetails?.busDebCardCashWithdrawalLimitforBusinessDebitCard
                    //   ?.busDebCardCashWithdrawalLimitforBusinessDebitCardECommerce &&

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View
                        style={{
                          width: '20%',
                          justifyContent: 'center',
                          // padding: 4,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          borderBottom: '1px solid #6E2B8C',
                          borderRight: '1px solid #6E2B8C',
                        }}
                      >
                        <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>eCommerce</Text>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '20%',
                          // padding: 4,
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#6E2B8C',
                          borderBottom: '1px solid #6E2B8C',
                          borderRight: '1px solid #6E2B8C',
                        }}
                      >
                        <View style={{ flexDirection: 'column' }}>
                          <View
                            style={{
                              borderBottom: '1px solid #6E2B8C',
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>OmanNet / GCCnet </Text>
                          </View>
                          <View
                            style={{
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>Master Card - International</Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '20%',

                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#6E2B8C',
                          borderBottom: '1px solid #6E2B8C',
                          borderRight: '1px solid #6E2B8C',
                        }}
                      >
                        <View style={{ flexDirection: 'column' }}>
                          <View
                            style={{
                              borderBottom: '1px solid #6E2B8C',
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>
                              {formdetails?.busDebCardCWLBDCECONGCCEnableService?.value || 'N/A'}
                            </Text>
                          </View>
                          <View
                            style={{
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>
                              {formdetails?.busDebCardCWLBDCECMCIEnableService?.value || 'N/A'}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '20%',

                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#6E2B8C',
                          borderBottom: '1px solid #6E2B8C',
                          borderRight: '1px solid #6E2B8C',
                        }}
                      >
                        <View style={{ flexDirection: 'column' }}>
                          <View
                            style={{
                              borderBottom: '1px solid #6E2B8C',
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>
                              20000
                              {/* {formdetails?.busDebCardCWLBDCECONGCCNewDailyLimit || 'N/A'} */}
                            </Text>
                          </View>
                          <View
                            style={{
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>
                              20000
                              {/* {formdetails?.busDebCardCWLBDCECSMCINewDailyLimit || 'N/A'} */}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          width: '20%',

                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#6E2B8C',
                          borderBottom: '1px solid #6E2B8C',
                          // borderRight: "1px solid #6E2B8C",
                        }}
                      >
                        <View style={{ flexDirection: 'column' }}>
                          <View
                            style={{
                              borderBottom: '1px solid #6E2B8C',
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>
                              {formdetails?.busDebCardCWLBDCECONGCCNewDailyLimit || 'N/A'}
                            </Text>
                          </View>
                          <View
                            style={{
                              padding: 1,
                              textAlign: 'center',
                              color: '#6E2B8C',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 8, textAlign: 'center' }}>
                              {formdetails?.busDebCardCWLBDCECSMCINewDailyLimit || 'N/A'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  }

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View
                      style={{
                        width: '20%',
                        justifyContent: 'center',
                        // padding: 4,
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                        <Text style={{ fontSize: 8, textAlign: 'center' }}>Cash WithDraw</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        // padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>Bank Nizwa / OmanNet / GCC Net</Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>Master Card {'\n'}- International </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        // alignItems:'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',

                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCCWONGCCEnableService?.value || 'N/A'}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCCWMCIEnableService?.value || 'N/A'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',

                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>20000</Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            20000
                            {/* {formdetails?.busDebCardCWLBDCECSMCINewDailyLimit || 'N/A'} */}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',

                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        // borderRight: "1px solid #6E2B8C",
                      }}
                    >
                      <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <View
                          style={{
                            borderBottom: '1px solid #6E2B8C',
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCCWONGCCNewDailyLimit || 'N/A'}
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCCWSMCINewDailyLimit || 'N/A'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View
                      style={{
                        width: '20%',
                        justifyContent: 'center',
                        // padding: 4,
                        textAlign: 'center',
                        color: '#6E2B8C',
                        // borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                        <Text style={{ fontSize: 8, textAlign: 'center' }}>Cash Deposit</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        // padding: 4,
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        // borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>Bank Nizwa</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',

                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        // borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCCDONGCCEnableService?.value || 'N/A'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '20%',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column', textAlign: 'center' }}>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>20000</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '20%',

                        justifyContent: 'center',
                        textAlign: 'center',
                        color: '#6E2B8C',
                      }}
                    >
                      <View style={{ flexDirection: 'column' }}>
                        <View
                          style={{
                            padding: 1,
                            textAlign: 'center',
                            color: '#6E2B8C',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 8, textAlign: 'center' }}>
                            {formdetails?.busDebCardCWLBDCCDONGCCNewDailyLimit || 'N/A'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              }
            />


        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5,marginTop:10 }}>
          <CheckBoxComp
            label={formdetails?.busDebCardCWLBDCDuration?.value}
            val={formdetails?.busDebCardCWLBDCDuration?.value}
          />
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-end' }}>
            {/* <CheckBoxComp label="Temporarily" /> */}
            <Text style={styles.textFont}>From</Text>

            <Text style={{ ...styles.inputLine, minWidth: 20 }}>
              {dayjs(formdetails?.busDebCardCWLBDCFrom).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.textFont}>To</Text>
            <Text style={{ ...styles.inputLine, minWidth: 20 }}>
              {dayjs(formdetails?.busDebCardCWLBDCTo).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}></View>
        <PdfTable
          head="Declaration"
          body={
            <View style={{ padding: 4 }}>
              <Text style={styles.textFont}>
                I/We hereby indemnify Bank Nizwa and hold the Bank harmless against any claim, cost, loss, liability,
                damage, expenses otherwise of whatever nature as a result arising from increasing the limit of the Bank
                Nizwa Card or from usage over the Internet or from the misuse, theft, fraud, negligence, bad faith or
                any illegal use of the card, and the Bank shall not in any circumstance whatsoever be held liable for
                any of the aforementioned. We also confirm that we are fully aware and shall be held liable for any
                unauthorised/fraudulent transactions charged to the Card and not authorised by the cardholder before the
                request for card cancellation/ block was received by the bank.
              </Text>
            </View>
          }
        />
        <PDFTermsAndCondition data={termsConditionData} direction={'ltr'} />
        <PdfFooter/>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', gap: 3 }}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            SIGNATURES OF AUTHORIZED OFFICIALS
          </Text>
          <View style={{ flexDirection: 'column' }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                // marginTop: '10px',
                backgroundColor: '#FFFACD',
                // padding: '5px',
              }}
            >
              <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>
              <View
                style={
                  {

                  }
                }
              >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      height: 'auto',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '50%',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'column',
                        gap: 10,
                        padding: 10,
                      }}
                    >
                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Name:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>
                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Signature:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>

                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Name:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>
                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Signature:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 'auto',
                      borderRight: '1px solid #6E2585',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderBottom: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',
                      width: '50%',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'column',
                        gap: 10,
                        padding: 10,
                      }}
                    >
                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Name:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>
                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Signature:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>

                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Name:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>
                      <View style={styles.secondRow}>
                        <Text style={styles.secondLabel}>Signature:</Text>
                        <Text style={{ borderBottom: '1px solid #6E2585', width: '100%', marginLeft: 10 }}></Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'column', gap: 5, width: '100%', padding: 4 }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <CustomDate date={' '.repeat(8)} />
                </View>
                <View style={{ flexDirection: 'column', gap: 5 }}>
                  <Text style={{ fontFamily: 'Times-Bold', color: '#6E2585' }}>
                    List of Documents required for existing bank customers
                  </Text>
                  <Text style={styles.textFont}>1. Board Resolution in Bank Nizwa format</Text>
                  <Text style={styles.textFont}>2. ID / Passport copy of the card holder</Text>
                  <Text style={styles.textFont}>3. Company Registration Form (CR)</Text>
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
