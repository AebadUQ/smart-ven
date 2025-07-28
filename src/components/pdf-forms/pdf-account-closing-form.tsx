'use client';

import * as React from 'react';
import { flexbox, style } from '@mui/system';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';

Font.register({
  family: 'DejaVuSans',
  src: '/fonts/DejaVuSans.ttf',
});
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
    paddingTop: 1,
    fontFamily: 'DejaVuSans-Bold',
    fontSize: 7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inlineProp: {
    display: 'flex',
    direction: 'row',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    justifyContent: 'flex-start',
    marginTop: '5px',
  },
  headerText: {
    fontSize: 10,
    color: '#6E2B8C',
  },
  section: {
    marginBottom: 8,
  },
  textFont: {
    fontSize: 8,
  },
  textFontCheckBox: {
    fontSize: 8,
    marginTop: 2,
  },
  label: {
    fontWeight: 'bold',
    // marginTop: 4,
    // marginRight: 5,
    color: '#6E2B8C',
  },
  branchLabel: {
    fontWeight: 'bold',
    marginLeft: 20,
  },
  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 4,
    flexGrow: 1,
    // paddingVertical: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 5,
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
    width: 17,
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
    textAlign: 'center',
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 12,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBox: {
    fontSize: 7,
    textAlign: 'center',
    width: '100%',
    height: 'auto',
  },
  accountBoxes: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#6E2B8C',

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    fontSize: 7,
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function AccountClosingFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />

        <CustomDate date={formatedDate} />
        <View style={{ marginTop: 6 }}></View>

        <Text style={{ color: '#6E2B8C', fontSize: 9 }}>
          Note: Please complete in Block letters and sign in the appropriate space.
        </Text>

        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            marginBottom: 8,
            color: 'white',
            backgroundColor: '#6E2585',
            paddingTop: '4px',
            paddingLeft: '5px',
          }}
        >
          PLEASE CLOSE THE BELOW MENTIONED ACCOUNT/S
        </Text>
        {formdetails?.acfMentionedAccount.map((items: any, index: any) => (
          <View style={{ flexDirection: 'column', marginBottom: 8 }}>
            {/* <View style={styles.section}> */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }} key={index}>
              <Text style={styles.label}>{index+1 > 1 ? `Account No.(${index + 1}):` : 'Account No.:'}</Text>
              {items?.accountNum?.split('')?.map((item: any, ind: any) => {
                const extraMargin = ind === 2 || ind === 10 ? 10 : 2;
                return (
                  <View
                    key={ind}
                    style={{
                      ...styles.accountBoxes,
                      marginRight: extraMargin,
                    }}
                  >
                    <Text style={styles.textBox}>{item}</Text>
                  </View>
                );
              })}
            </View>
            {/* </View> */}
            <View style={styles.signatureRow}>
              <CheckBoxComp
                label="All services to be cancelled related to this account"
                val={items?.serviceCancelledCheck}
              />
              <View style={styles.signatureRow}>
                {
                  (index+1 < 2 ? (
                    <Text style={styles.branchLabel}>Branch:</Text>
                  ) : (
                    <Text style={styles.branchLabel}>Branch({index + 1}):</Text>
                  ))
                }
                {/* <Text style={styles.branchLabel}>Branch({index + 1}):</Text> */}
                <Text> {items?.branch?.value} </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '2%' }}>
          {/* <InputComp inputOne=" In the name of:" inputTwo="Tel. No.:" outputOne={formdetails?.acfAccountName || "N/A"} outputTwo={formdetails?.acfTelNo  || "N/A"} /> */}
          <View style={{ flexDirection: 'row', gap: 2, width: '49%' }}>
            {/* <InputComp inputOne="Account Name:" outputOne={formdetails?.acfAccountName || "N/A"}/> */}
            <Text style={styles.label}>Account Name:</Text>

            <Text style={styles.inputLine}>{formdetails?.acfAccountName || 'N/A'}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 2, width: '49%' }}>
            <Text style={styles.label}>Tel. No.:</Text>
            <Text style={styles.inputLine}>{formdetails?.acfTelNo || 'N/A'}</Text>
          </View>
        </View>

        {/* Reason for closing */}
        <View style={styles.section}>
          <Text style={styles.label}>The reason for closing my account/s is:</Text>

          {/* <Text>{formdetails}</Text> */}
          <Text style={styles.inputLine}> {formdetails?.acfClosingReason?.value || 'N/A'}</Text>
          {formdetails?.acfOtherClosingReason && (
            <>
              <Text style={styles.label}>Other (Please Specify)</Text>
              <Text style={styles.inputLine}> {formdetails?.acfOtherClosingReason}</Text>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Return Proceeds as:</Text>
          <Text style={styles.inputLine}> {formdetails?.acfReturnProceedAs?.value || 'N/A'}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <CheckBoxComp label="Transfer to A/C No.:" val={formdetails?.acfTransferToAccountNum} />
          {formdetails?.acfTransferToAccountNum && (
            <Text style={styles.inputLine}>{formdetails?.acfTransferToAccountNum || 'N/A'}</Text>
          )}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View
            style={{
              height: '90px',
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
                justifyContent: 'center',
                borderRight: 0,
                alignItems: 'center',
                color: '#6E2585',
                borderBottom: '1px solid #6E2585',
                width: '100%',
                padding: '8px',
              }}
            >
              <Text>Signature/Thumb Impression</Text>
            </View>
          </View>

          <View
            style={{
              height: '90px',
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
                justifyContent: 'center',
                borderBottom: '1px solid #6E2585',
                alignItems: 'center',
                color: '#6E2585',

                width: '100%',
                padding: '8px',
              }}
            >
              <Text>Signature/Thumb Impression Verified (Bank use only)</Text>
            </View>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}></View>

        {/* For Bank Use Only */}
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
          <View>
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
                    color: '#6E2585',
                    paddingHorizontal: '5px',
                    paddingVertical: '15px',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  <InputComp inputOne="Balance as of closure request date" outputOne=" " />
                  <InputComp inputOne="Accrued profits as of closure request date" outputOne=" " />

                  <InputComp inputOne="Charges" outputOne=" " />

                  <InputComp inputOne="Net Proceeds" outputOne=" " />
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
                    <Text style={styles.textFont}>Outstanding Liabilities settled:</Text>
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
                  <Text style={styles.textFont}>
                    Cheque Book surrendered From: _______________ To: _______________{' '}
                  </Text>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={styles.textFont}>ATM Card No.:</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      {Array.from({ length: 16 }).map((_, index) => {
                        const extraMargin = index === 3 || index === 7 || index === 11 || index === 15 ? 10 : 2;
                        return (
                          <View
                            key={index}
                            style={{
                              width: 15,
                              height: 13,
                              borderWidth: 1,
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
                            <Text style={{ fontSize: 8, padding: '0px' }}> </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={styles.row}>
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
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: '30px',
                    }}
                  >
                    <Text style={styles.textFont}>Standing Instructions cancelled:</Text>
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
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#C0C0C0',
              display: 'flex',
              justifyContent: 'flex-start',
              borderBottom: '1px solid #6E2585',
              borderRight: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              alignItems: 'flex-start',
              color: '#6E2585',

              width: '100%',
              padding: '4px',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Signatures</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderBottom: '1px solid #6E2585',
              borderRight: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              color: '#6E2585',
              height: '60px',
            }}
          >
            <Text
              style={{
                paddingHorizontal: '5px',
                paddingVertical: '8px',
                width: '33.33%',
                borderRight: '1px solid #6E2585',
                fontSize: 8,
              }}
            >
              Branch Staff
            </Text>
            <Text
              style={{
                paddingHorizontal: '5px',
                paddingVertical: '8px',
                width: '33.33%',
                borderRight: '1px solid #6E2585',
                fontSize: 8,
              }}
            >
              Assistant Branch Manager
            </Text>
            <Text style={{ paddingHorizontal: '5px', paddingVertical: '8px', width: '33.33%', fontSize: 8 }}>
              Branch Manager
            </Text>
          </View>
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}
