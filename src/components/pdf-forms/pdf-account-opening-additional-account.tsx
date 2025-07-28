'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { InputComp } from './input-component';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.
Font.register({
  family: 'DejaVuSans-Bold',
  src: '/fonts/DejaVuSans-Bold.ttf',
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
  tickMark: {
    // fontSize: 11,
    fontFamily: 'DejaVuSans-Bold',
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
    // marginTop: 15,
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
  textFont: {
    fontSize: 8,
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    fontSize: 10,
    width: '150px',
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    // marginBottom: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    // justifyContent: 'space-between',
    textAlign: 'center',
    // marginBottom: 5,
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
    gap: 7,
    justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function AccountOpeningAdditionalAccountFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.inputLine}>{formdetails?.adBranch?.value}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ flexDirection: 'column', gap: '5px' }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Text style={styles.label}>Existing Account Number: </Text>
                {formdetails?.adExistingAccountNo?.split('')?.map((item: any, ind: any) => {
                  const extraMargin = ind === 2 || ind === 10 ? 10 : '2px';
                  return (
                    <View
                      key={ind}
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1.5,
                        borderColor: '#6E2B8C',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 8,
                        fontWeight: 'bold',
                        color: '#000',
                        marginRight: extraMargin,
                        textAlign: 'center',
                        paddingTop: '2px',
                        // paddingRight: '1px',
                      }}
                    >
                      <Text style={{ fontSize: 8, padding: '0px' }}> {item} </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
              Note: Please complete in Block letters and sign in the appropriate space.
            </Text>
          </View>

          <View style={{ flexDirection: 'column', gap: 3 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              ACCOUNT DETAILS
            </Text>
            <View style={{ flexDirection: 'column', gap: '5px' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <View style={styles.secondRow}>
                  <Text style={styles.label}>Account Name:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '190px', marginLeft: 5 }}>
                    {formdetails?.adAccountName || 'N/A'}
                  </Text>
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.label}>Number Of Applicants:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '150px' }}>
                    {formdetails?.adNumberOfApplicant || 'N/A'}
                  </Text>
                </View>
              </View>
              <View style={{ width: '40%' }}>
                <View style={styles?.secondRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Account Type: </Text>
                  </View>
                  <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                    <CheckBoxComp label={formdetails?.adAccountType?.value} val={formdetails?.adAccountType?.value} />
                  </View>
                </View>
              </View>
              <View style={{ width: '40%' }}>
                <View style={styles?.secondRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Currency: </Text>
                  </View>
                  <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                    <CheckBoxComp label={formdetails?.adCurrency?.value} val={formdetails?.adCurrency?.value} />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  // marginBottom: 12,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                STATEMENT TYPE AND FREQUENCY
              </Text>
              <View style={styles.rowFav}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '60%',
                    borderRight: '1px solid #6E2585',
                    paddingRight: 5,
                    gap: 5,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                    <Text style={{ color: '#6E2585', fontSize: 10 }}>Standard Frequencies: </Text>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={{ ...styles.tickMark, fontSize: 10 }}>{'\u2713'}</Text>
                      <Text style={{ color: '#6E2585', fontSize: 10 }}> Printed (Biannually) </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginLeft: 5,
                    }}
                  >
                    <View style={styles.checkboxRow}>
                      <Text style={{ fontSize: 9 }}>Change in Printed Frequency*, please specify</Text>
                    </View>
                    <CheckBoxComp
                      label={formdetails?.adChangesPrintedFrequency?.value}
                      val={formdetails?.adChangesPrintedFrequency?.value}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginLeft: 5,
                    }}
                  >
                    <View style={styles.checkboxRow}>
                      <Text style={{ fontSize: 9 }}>*Charges applicable</Text>
                    </View>
                    {/* <CheckBoxComp label={formdetails?.adChangesEmailFrequency?.value} val={formdetails?.adChangesEmailFrequency?.value} /> */}
                  </View>
                </View>
                <View style={{ flexDirection: 'column', padding: 2, gap: 5 }}></View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> */}
                <View style={{ flexDirection: 'column', gap: 5 }}></View>
                <View style={styles.checkboxRow}>
                   <Text style={{ ...styles.tickMark, fontSize: 10 }}>{'\u2713'}</Text>
                  {/* <View style={styles.checkbox}></View> */}
                  <Text style={{ fontSize: 8 }}>Email (Monthly)</Text>
                </View>
                <CheckBoxComp
                  label={formdetails?.adChangesEmailFrequency?.value}
                  val={formdetails?.adChangesEmailFrequency?.value}
                />

                {/* <CheckBoxComp label={} /> */}
                {/* <View style={styles.rowFav}>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text>Daily </Text>
                  </View>

                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text>Weekly</Text>
                  </View>
                </View> */}
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 5,
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
                BANKING SERVICE REQUIRED
              </Text>
              <View style={styles.rowFav}>
                <View style={{ flexDirection: 'column', paddingRight: 5, gap: 4, width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}
                  >
                    <CheckBoxComp label="ATM/Debit Card:" val={formdetails?.adBankServiceATMDebitCard} />
                    <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                      <CheckBoxComp
                        label={formdetails?.adBankServiceATMDebitCard?.value}
                        val={formdetails?.adBankServiceATMDebitCard?.value}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}
                  >
                    <CheckBoxComp label="Cheque Book:" val={formdetails?.adBankServiceATMDebitCard} />
                    <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                      <CheckBoxComp
                        label={formdetails?.adChequeBook?.value + ' ' + 'leaves'}
                        val={formdetails?.adChequeBook?.value}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}
                  >
                    <CheckBoxComp label="Account Statements:" val={formdetails?.adAccountStatement} />
                    <View style={{ justifyContent: 'flex-start', width: '100px' }}>
                      <CheckBoxComp
                        label={formdetails?.adAccountStatement?.value}
                        val={formdetails?.adAccountStatement?.value}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}
                  >
                    <CheckBoxComp
                      label="SMS Alerts for Account Transactions:"
                      val={formdetails?.adSmsAlertsAccountTransactions}
                    />
                    <View style={{ justifyContent: 'flex-start', width: '100px' }}>
                      <CheckBoxComp
                        label={formdetails?.adSmsAlertsAccountTransactions?.value}
                        val={formdetails?.adSmsAlertsAccountTransactions?.value}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}
                  >
                    <CheckBoxComp
                      label="Email Alerts for Account Transactions:"
                      val={formdetails?.adEmailAlertsAccountTransactions}
                    />
                    <View style={{ justifyContent: 'flex-start', width: '100px' }}>
                      {/* <CheckBoxComp label={formdetails?.adEmailAlertsAccountTransactions?.value} val={formdetails?.adEmailAlertsAccountTransactions?.value} /> */}
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '60%',
                    }}
                  >
                    <CheckBoxComp
                      label="Informational and Promotional Alerts"
                      val={formdetails?.adInternationalAndPromotionalAlerts}
                    />
                    <View style={{ justifyContent: 'flex-start', width: '100px' }}>
                      {/* <CheckBoxComp label={formdetails?.adInternationalAndPromotionalAlerts?.value} val={formdetails?.adInternationalAndPromotionalAlerts?.value} /> */}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  // marginBottom: 12,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                TERMS AND CONDITIONS:
              </Text>
              <Text style={{ fontSize: 8 }}>
                I/We confirm that the information given above is true and complete, and that I/We have received the
                Bank’s General Terms and Conditions for the operation of the Account(s) and Electronic Banking Services
                and those applicable specifically to the type of account chosen by me/us. I/We understand and expressly
                agree and accept to be bound by them whether set out in English and/or Arabic. I/We confirm that all
                expected inward remittances to my/our account(s) will comply with the stipulation of Central Bank of
                Oman.
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  // borderBottom: '1px solid #6E2585',
                  width: '40%',
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
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    flexWrap:'wrap',
                    padding: 2,

                  }}
                >
                  <Text style={{ fontSize: 8 }}>(First Aplicant)</Text>

                  <Text style={{ fontSize: 10,width:"100%",wordBreak: 'break-word'}}>{formdetails?.adFirstApplicantName || 'N/A  '}</Text>

                </View>
                <View
                  style={{
                    height: '60px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: 2,
                  }}
                >
                   <Text style={{ fontSize: 8 }}>(Second Applicant)</Text>
                  <Text style={{ fontSize: 10 }}>{formdetails?.adSecondApplicantName || 'N/A'}</Text>

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
                  width: '30%',
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
                  <Text style={{ fontSize: 10 }}>Signature/Thumb Impression</Text>
                </View>
                {Array.from({ length: 2 })?.map((items: any, index: any) => (
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
                  borderRight: '1px solid #6E2585',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '30%',
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
                    padding: '1px',
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: 'center' }}>
                    Signature/Thumb Impression Verified (Bank use only)
                  </Text>
                </View>
                {Array.from({ length: 2 })?.map((items: any, index: any) => (
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
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '10px',
            backgroundColor: '#FFFACD',
            padding: '5px',
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>s
          <View style={styles.secondRow}>
            <View style={{ flexDirection: 'column', gap: 5, width: '50%' }}>
              <View style={{ flexDirection: 'row' }}>
                <InputComp inputOne="CIF No.:" outputOne=" " />
                {/* <Text style={styles.secondLabel}>CIF No.:</Text>
                <Text style={styles.input}></Text> */}
              </View>
              {/*  */}
              <View style={{ flexDirection: 'row' }}>
              <InputComp inputOne="Branch:" outputOne=" " />

                {/* <Text style={styles.secondLabel}>Branch:</Text>
                <Text style={styles.input}></Text> */}
              </View>

              <View style={{ flexDirection: 'row' }}>
              <InputComp inputOne="DSR/PBO Code:" outputOne=" " />

                {/* <Text style={styles.secondLabel}>DSR/PBO Code:</Text>
                <Text style={styles.input}></Text> */}
              </View>
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <Text style={styles.secondLabel}>New Account No.:</Text>
                <View style={{ flexDirection: 'row' }}>
                  {Array.from({ length: 15 })?.map((item: any, ind: any) => {
                    const extraMargin = ind === 2 || ind === 10 ? '2px' : '0px';
                    return (
                      <View
                        key={ind}
                        style={{
                          width: 17,
                          height: 15,
                          borderWidth: 1,
                          borderColor: '#6E2B8C',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          // fontSize: 8,
                          fontWeight: 'bold',
                          color: '#000',
                          marginRight: extraMargin,
                          textAlign: 'center',
                          paddingTop: '2px',
                          // paddingRight: '1px',
                        }}
                      >
                        <Text style={{ fontSize: 8, padding: '0px' }}> {item} </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'column', gap: 10, width: '45%' }}>
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <InputComp inputOne="Processed by:" outputOne=" "/>
                {/* <Text style={styles.secondLabel}>Processed by:</Text>
                 */}
                  {/* <Text style={styles.secondLabel}>Signature:</Text>
                  <Text style={styles.input}></Text> */}
                <View style={{ flexDirection: 'row' }}>
                                <InputComp inputOne="Signature:" outputOne=" "/>

                </View>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Text style={styles.secondLabel}>Name:</Text>
                  <Text style={styles.input}></Text> */}
                                <InputComp inputOne="Name:" outputOne=" "/>

                </View>
              </View>

              <View style={{ flexDirection: 'column', gap: 2 }}>
                <Text style={styles.secondLabel}>Approved by:</Text>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Text style={styles.secondLabel}>Signature:</Text>
                  <Text style={styles.input}></Text> */}
                  <InputComp inputOne="Signature:" outputOne=" "/>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Text style={styles.secondLabel}>Name:</Text>
                  <Text style={styles.input}></Text> */}
                  <InputComp inputOne="Name:" outputOne=" "/>
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
