'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.

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
  inlineProp: {
    display: 'flex',
    direction: 'row',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 5,
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
    fontSize: 7,
    marginTop: 2,
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
    marginRight: 5,
    color: '#6E2B8C',
  },
  secondLabel: {
    // fontWeight: 'bold',
    // marginTop: 4,
    // marginRight: 5,
    color: '#6E2B8C',
    fontSize: 9,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',

    // marginBottom: 4,
    // paddingVertical: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

    justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function LossStopPaymentFormPdfProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  const breakTextEveryNChars = (str = '', n = 35) =>
  str.replace(new RegExp(`(.{${n}})`, 'g'), '$1\n');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
            Note: Please complete in Block letters and sign in the appropriate space.
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={{ flexDirection: 'column', gap: '1px' }}>
                <Text style={styles.smallText}>To,</Text>
                <Text style={styles.smallText}>The Manager</Text>
                <Text style={styles.smallText}>Bank Nizwa</Text>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Branch:</Text>
                  <Text style={styles.inputLine}> {formdetails?.lsprBranch?.value} </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 8,
                  // marginTop: 5,
                  textAlign: 'center',
                  color: '#6E2B8C',
                  fontWeight: 'black',
                  marginTop: 4,
                }}
              >
                Dear Sir/Madam,
              </Text>
            </View>
            <View style={styles.column}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Text style={{ color: '#6E2B8C', marginTop: '7px' }}>Date:</Text>
                <View style={{ flexDirection: 'row' }}>
                  {formatedDate?.split('')?.map((items: any, index: number) => {
                    const extraMargin = index === 1 || index === 3 ? '3px' : '1px';
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
                        <Text style={{ fontSize: 7, padding: '0px' }}>{items} </Text>
                      </View>
                    );
                  })}
                </View>
              </View> */}
              <CustomDate date={formatedDate} />
            </View>
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Text style={styles.label}>Customer Account Number: </Text>
              {/* {formdetails?.lsprCustomerAccountNumber?.split("")?.map((item: any, ind: any) => {
                const extraMargin = ind === 2 || ind === 10 ? 10 : '2px';
                return (
                  <View
                    key={ind}
                    style={{
                      width: 17,
                      height: 17,
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
                      paddingRight: '2px',
                    }}
                  >
                    <Text style={{ fontSize: 8, padding: '0px' }}> {item} </Text>
                  </View>
                );
              })} */}
              <AccountBoxes data={formdetails?.lsprCustomerAccountNumber.split('')} />
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 2, marginTop: 15 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 9 }}>
              This is to inform you that I/We have lost the following instrument(s) and not in my/our possession
              anymore:
            </Text>

            <View>
              <View>
                <View style={{ flexDirection: 'column', border: '1px solid #6E2585' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View
                      style={{ width: '25%', padding: 2, borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}
                    >
                      <Text style={{ textAlign: 'center', color: '#6E2585',fontSize: '10px' }}>Currency</Text>
                    </View>

                    <View
                      style={{ width: '25%', padding: 2, borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}
                    >
                      <Text style={{ textAlign: 'center', color: '#6E2585' }}>Amount in Figure</Text>
                    </View>

                    <View
                      style={{ width: '25%', padding: 2, borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}
                    >
                      <Text
                        style={{ textAlign: 'center', color: '#6E2585' }}
                      >{`Pay Order/Demand Draft/\nCheque(s) No.`}</Text>
                    </View>

                    <View style={{ width: '25%', padding: 2, backgroundColor: '#C0C0C0' }}>
                      <Text style={{ textAlign: 'center', color: '#6E2585' }}>{`Date Of Instrument/\nTime`}</Text>
                    </View>
                  </View>
                  {formdetails?.lsprInstrumentData?.map((items: any, index: any) => (
                    <View style={{ flexDirection: 'row', width: '100%' }} key={index}>
                      <View
                        style={{
                          width: '25%',
                          padding: 2,
                          borderRight: '1px solid #6E2585',
                          borderTop: '1px solid #6E2585',
                        }}
                      >
                        <Text style={{ textAlign: 'center', color: '#6E2585',fontSize: '10px' }}>
                          {items?.lsprInstrumentCurrency?.value}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '25%',
                          padding: 2,
                          borderRight: '1px solid #6E2585',
                          borderTop: '1px solid #6E2585',
                        }}
                      >
                        <Text style={{ textAlign: 'center', color: '#6E2585' ,fontSize: '10px'}}>
                          {items?.lsprInstrumentCurrencyAmount}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '25%',
                          padding: 2,
                          borderRight: '1px solid #6E2585',
                          borderTop: '1px solid #6E2585',
                        }}
                      >
                        <Text style={{ textAlign: 'center', color: '#6E2585',fontSize: '10px' }}>
                          {items?.lsprInstrumentChequeNumber}
                        </Text>
                      </View>

                      <View style={{ width: '25%', padding: 2, borderTop: '1px solid #6E2585' }}>
                        <Text style={{ textAlign: 'center', color: '#6E2585' ,fontSize: '10px'}}>
                          {dayjs(items?.lsprInstrumentDateOfInstrument).format('DD-MM-YYYY/hh:mm:A')}
                        </Text>
                      </View>
                    </View>
                  ))}
                  <View style={{ flexDirection: 'column'}}>
                    <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                      <View
                        style={{
                          width: '50%',
                          padding: 2,
                          borderRight: '1px solid #6E2585',
                          backgroundColor: '#C0C0C0',
                        }}
                      >
                        <Text style={{ textAlign: 'center', color: '#6E2585' }}>Beneficiary</Text>
                      </View>

                      <View style={{ width: '50%', padding: 2, backgroundColor: '#C0C0C0' }}>
                        <Text style={{ textAlign: 'center', color: '#6E2585' }}>Reason For Stop Payment</Text>
                      </View>
                    </View>
                  </View>
                  {formdetails?.lsprInstrumentData?.map((items: any, index: any) => (
                    <View style={{ flexDirection: 'column',alignItems:'center'}}>
                      <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                        <View style={{ width: '50%', padding: 2, borderRight: '1px solid #6E2585'}}>
                          <Text style={{ textAlign: 'center', color: '#6E2585',fontSize: 10,selfAlign:'center' }}>
                            {items?.lsprInstrumentBeneficiary}
                          </Text>
                        </View>

                        <View style={{ width: '50%',padding:2}}>
  <Text
    style={{

      color: '#6E2585',
      fontSize: 10,
      width: '90%',
      flexShrink: 2,
      // height:"auto"
      // ,border:"1px solid black"
    }}
  >
  {breakTextEveryNChars(items?.lsprInstrumentReasonofStopPayment)}  </Text>

</View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  // borderBottom: '1px solid #6E2585',
                  width: '25%',
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
                    padding: '8px',
                  }}
                >
                  <Text>Currency–Amount</Text>
                </View>

                {formdetails?.lsprInstrumentData?.map((items: any, index: any) => (
                  <View
                    style={{

                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',

                    }}
                  >
                    <Text style={{fontSize:8,marginVertical:2}}>{items?.lsprInstrumentCurrencyAmount}</Text>
                  </View>
                ))}


              </View>

              <View
                style={{

                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '25%',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#C0C0C0',
                    justifyContent: 'center',
                    borderBottom: '1px solid #6E2585',
                    alignItems: 'center',
                    color: '#6E2585',
                    padding: '1px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Text>Pay Order/Demand Draft/ Cheque(s) No.</Text>
                </View>
                {formdetails?.lsprInstrumentData?.map((items: any, index: any) => (
                  <View
                    style={{
                      // height: '30px',
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
                    <Text style={{fontSize:8,marginVertical:2}}>{items?.lsprInstrumentChequeNumber}</Text>
                  </View>
                ))}

              </View>
              <View
                style={{
                  // height: '150px',
                  // borderRight: '1px solid #6E2585',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  // borderBottom: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '25%',
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
                    padding: '8px',
                  }}
                >
                  <Text>Date of Instrument</Text>
                </View>
                {formdetails?.lsprInstrumentData?.map((items: any, index: any) => (
                  <View
                    style={{
                      // height: '30px',
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
                    <Text style={{fontSize:8,marginVertical:2}}>{dayjs(items?.dateOfInstrument).format('DD/MM/YYYY')}</Text>
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
                  width: '25%',
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
                    padding: '8px',
                  }}
                >
                  <Text >Beneficiary</Text>
                </View>
                {formdetails?.lsprInstrumentData?.map((items: any, index: any) => (
                  <View
                    style={{
                      // height: '30px',
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
                    <Text style={{fontSize:8,marginVertical:2}}>{items?.lsprInstrumentBeneficiary}</Text>
                  </View>
                ))}
                </View>
            </View> */}
          </View>

          <View style={{ flexDirection: 'column', gap: 8, marginTop: '5px' }}>
            <Text style={{ color: '#6E2B8C', fontSize: 9 }}>I/We confirm the following:</Text>
            <Text style={{ color: '#6E2B8C', fontSize: 9 }}>
              1. I/We have not handed over the above mentioned instrument(s) to its beneficiary or to anyone else.
            </Text>
            <View style={styles.secondRow}>
              <Text style={{ color: '#6E2B8C', fontSize: 9 }}>2.</Text>
              <Text style={{ color: '#6E2B8C', fontSize: 9 }}>
                I/We fully authorise the bank and its officials to stop payment of the above mentioned instrument(s) and
                also indemnify the bank and its officials for the payment of the above mentioned instrument(s) and will
                compensate the bank or its staff in case the bank or its staff suffers any loss due to my/our
                instructions of stop payment of the instrument(s) and in case of demand draft before submitting this
                stop payment order or advising it to the drawee bank.
              </Text>
            </View>
            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>Best Regards,</Text>
              <Text style={styles.inputLine}>{formdetails?.mbiAuthoriserName}</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Customer Name(s): (1) </Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>(2)</Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '150px' }}></Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Customer Signature(s):(1) </Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '188px' }}></Text>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>(2)</Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '150px' }}></Text>
              </View>
            </View>

            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>Customer Signature: </Text>
              <Text style={{ borderBottom: '1px solid #6E2B8C', width: '150px' }}></Text>
            </View> */}
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <InputComp
                    inputOne="Customer Account Name(s): (1)"
                    outputOne={formdetails?.lsprCustomerName || 'N/A'}
                  />
                </View>
              </View>
              <View style={styles.secondRow}>
                <InputComp inputOne="Customer Contact Details" outputOne={formdetails?.lsprCustomerContactNum} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <View style={styles.secondRow}>
                  <Text style={{ ...styles.textFont, color: '#6E2B8C' }}>Customer New Signature(s):(1) </Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '188px' }}></Text>
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>(2)</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '225px' }}></Text>
                </View>
              </View>
            </View>
            {formdetails?.lsprInstrumentData.length < 2 ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: '10px',
                  backgroundColor: '#FFFACD',
                  padding: '5px',
                }}
              >
                <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>

                <View
                  style={
                    {
                      // display: 'flex',
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      // width: '100%',
                      // marginTop: '10px',
                      // backgroundColor: '#FFFACD',
                      // padding: '5px',
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
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',
                          // borderRight: '1px solid #6E2585',
                          // borderLeft: '1px solid #6E2585',
                          alignItems: 'flex-start',
                          color: '#6E2585',

                          width: '100%',
                          padding: '4px',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>SIGNATURE VERIFIED BY</Text>
                      </View>
                      <View
                        style={{
                          color: '#6E2585',
                          paddingHorizontal: '5px',
                          paddingVertical: '15px',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <Text style={styles.textFont}>Staff Name & ID:: _____________________</Text>
                        <Text style={styles.textFont}>Signature:__________________</Text>
                        {/* <Text style={styles.textFont}>Charges: _____________________</Text>

                      <Text style={styles.textFont}>Net Proceeds: _______________________</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                          <Text style={{ color: '#6E2B8C', marginTop: '7px' }}>Date:</Text>
                          <View style={{ flexDirection: 'row' }}>
                            {Array.from({ length: 8 })?.map((items: any, index: number) => {
                              const extraMargin = index === 1 || index === 3 ? '8px' : '2px';
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
                                  <Text style={{ fontSize: 7, padding: '0px' }}>{items} </Text>
                                </View>
                              );
                            })}
                          </View>
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
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',
                          // borderRight: '1px solid #6E2585',
                          // borderLeft: '1px solid #6E2585',
                          alignItems: 'flex-start',
                          color: '#6E2585',

                          width: '100%',
                          padding: '4px',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>SYSTEM VERIFICATION</Text>
                      </View>
                      <View
                        style={{
                          color: '#6E2585',
                          paddingHorizontal: '5px',
                          paddingVertical: '5px',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginRight: '30px',
                          }}
                        >
                          <Text style={styles.textFont}>Instrument(s) reported loss still unpaid</Text>
                          <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                            <View style={styles.checkboxRow}>
                              <View style={styles.smallCheckbox} />
                              <Text style={styles.textFontCheckBox}>Yes</Text>
                            </View>

                            <View style={styles.checkboxRow}>
                              <View style={styles.smallCheckbox} />
                              <Text style={styles.textFontCheckBox}>No</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                          <Text style={{ color: '#6E2B8C', marginTop: '7px', fontSize: 8 }}>System Checking Date:</Text>
                          <View style={{ flexDirection: 'row' }}>
                            {Array.from({ length: 8 })?.map((items: any, index: number) => {
                              const extraMargin = index === 1 || index === 3 ? '8px' : '2px';
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
                                  <Text style={{ fontSize: 7, padding: '0px' }}>{items} </Text>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginRight: '30px',
                          }}
                        >
                          <Text style={styles.textFont}>Stop Payment Marked in System:</Text>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6,
                            }}
                          >
                            <View style={styles.checkboxRow}>
                              <View style={styles.smallCheckbox} />
                              <Text style={styles.textFontCheckBox}>Yes</Text>
                            </View>
                            <View style={styles.checkboxRow}>
                              <View style={styles.smallCheckbox} />
                              <Text style={styles.textFontCheckBox}>No</Text>
                            </View>
                          </View>
                        </View>
                        {/* <View style={styles.row}>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>Surrendered</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>Deleted</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>Not Surrendered</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>Card Blocked</Text>
                        </View>
                      </View> */}

                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginRight: '30px',
                          }}
                        >
                          <Text style={styles.textFont}>Block/Freeze removed: :</Text>
                          <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                            <View style={styles.checkboxRow}>
                              <View style={styles.smallCheckbox} />
                              <Text style={styles.textFontCheckBox}>Yes</Text>
                            </View>
                            <View style={styles.checkboxRow}>
                              <View style={styles.smallCheckbox} />
                              <Text style={styles.textFontCheckBox}>No</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                          <Text style={{ color: '#6E2B8C', marginTop: '7px' }}>Date:</Text>
                          <View style={{ flexDirection: 'row' }}>
                            {Array.from({ length: 8 })?.map((items: any, index: number) => {
                              const extraMargin = index === 1 || index === 3 ? '8px' : '2px';
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
                                  <Text style={{ fontSize: 7, padding: '0px' }}>{items} </Text>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        <PdfFooter />
      </Page>

        {formdetails?.lsprInstrumentData.length >= 2 ? (
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
            }}
          >
            <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>

            <View
              style={
                {
                  // display: 'flex',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // width: '100%',
                  // marginTop: '10px',
                  // backgroundColor: '#FFFACD',
                  // padding: '5px',
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
                      backgroundColor: '#C0C0C0',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      borderBottom: '1px solid #6E2585',
                      // borderRight: '1px solid #6E2585',
                      // borderLeft: '1px solid #6E2585',
                      alignItems: 'flex-start',
                      color: '#6E2585',

                      width: '100%',
                      padding: '4px',
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>SIGNATURE VERIFIED BY</Text>
                  </View>
                  <View
                    style={{
                      color: '#6E2585',
                      paddingHorizontal: '5px',
                      paddingVertical: '15px',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <Text style={styles.textFont}>Staff Name & ID:: _____________________</Text>
                    <Text style={styles.textFont}>Signature:__________________</Text>
                    {/* <Text style={styles.textFont}>Charges: _____________________</Text>

                      <Text style={styles.textFont}>Net Proceeds: _______________________</Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <Text style={{ color: '#6E2B8C', marginTop: '7px' }}>Date:</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {Array.from({ length: 8 })?.map((items: any, index: number) => {
                          const extraMargin = index === 1 || index === 3 ? '8px' : '2px';
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
                              <Text style={{ fontSize: 7, padding: '0px' }}>{items} </Text>
                            </View>
                          );
                        })}
                      </View>
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
                      backgroundColor: '#C0C0C0',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      borderBottom: '1px solid #6E2585',

                      alignItems: 'flex-start',
                      color: '#6E2585',

                      width: '100%',
                      padding: '4px',
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>SYSTEM VERIFICATION</Text>
                  </View>
                  <View
                    style={{
                      color: '#6E2585',
                      paddingHorizontal: '5px',
                      paddingVertical: '5px',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: '30px',
                      }}
                    >
                      <Text style={styles.textFont}>Instrument(s) reported loss still unpaid</Text>
                      <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>Yes</Text>
                        </View>

                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>No</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <Text style={{ color: '#6E2B8C', marginTop: '7px', fontSize: 8 }}>System Checking Date:</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {Array.from({ length: 8 })?.map((items: any, index: number) => {
                          const extraMargin = index === 1 || index === 3 ? '8px' : '2px';
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
                              <Text style={{ fontSize: 7, padding: '0px' }}>{items} </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: '30px',
                      }}
                    >
                      <Text style={styles.textFont}>Stop Payment Marked in System:</Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>Yes</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>No</Text>
                        </View>
                      </View>
                    </View>


                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: '30px',
                      }}
                    >
                      <Text style={styles.textFont}>Block/Freeze removed: :</Text>
                      <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>Yes</Text>
                        </View>
                        <View style={styles.checkboxRow}>
                          <View style={styles.smallCheckbox} />
                          <Text style={styles.textFontCheckBox}>No</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <Text style={{ color: '#6E2B8C', marginTop: '7px' }}>Date:</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {Array.from({ length: 8 })?.map((items: any, index: number) => {
                          const extraMargin = index === 1 || index === 3 ? '8px' : '2px';
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
                              <Text style={{ fontSize: 7, padding: '0px' }}>{items} </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View></Page>
        ) : null}

    </Document>
  );
}
