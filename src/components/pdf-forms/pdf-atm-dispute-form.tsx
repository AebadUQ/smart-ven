'use client';

import * as React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';

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
    fontSize: 8,
    marginTop: 5,
  },
  smallText: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 4,
    marginRight: 5,
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
    fontSize: 8,

    // width: '100%',
    flexGrow: 1,
    // marginTop: 'auto',
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
    gap: 15,
  },

  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  brand: {
    width: '300px',
    height: '250px',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function AtmDisputeFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  console.log('date herte', data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={{ marginBottom: 10 }}>
          <CustomDate date={formatedDate} />
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Card No.:</Text>
            {formdetails?.atdAtmCard?.split('')?.map((item: any, ind: any) => {
              const extraMargin = ind === 2 || ind === 10 ? 10 : '0px';
              return (
                <View
                  key={ind}
                  style={{
                    width: 20,
                    height: 20,
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
                  <Text style={{ fontSize: 8, padding: '0px' }}> {item}</Text>
                </View>
              );
            })}
          </View>
          {/*  */}
          <View style={{ flexDirection: 'column', gap: 2 }}>
                      <View style={{ width: '100%' }}>
                        <Text style={styles.label}>Cardholder Name:</Text>
                      </View>
                      <View style={{ flexDirection: 'row', gap: '5px', alignItems: 'flex-end' }}>
                        <View style={{ flexDirection: 'row', width: '100%', gap: 2,alignItems: 'flex-start' }}>
                          <View style={{ flexDirection: 'column-reverse', width: '5%' }}>
                            <Text style={{ ...styles.inputLine, textAlign: 'center', fontSize: 8 }}>
                              {formdetails?.atdTitle?.value}
                            </Text>

                            <Text style={{ color: '#6E2B8C' }}>Title</Text>
                          </View>
                          <View style={{ flexDirection: 'column-reverse', width: '31.6666666667%' }}>
                            {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.atdFirstName || 'N/A'}</Text> */}
                            <InputComp inputSix=" " outputSix={formdetails?.atdFirstName || 'N/A'} n={30}/>

                            <Text style={{ color: '#6E2B8C' }}>FirstName</Text>
                          </View>

                          <View style={{ flexDirection: 'column-reverse', width: '31.6666666667%' }}>
                            <InputComp inputSix=" " outputSix={formdetails?.atdSecondName || 'N/A'} n={30}/>

                            {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.atdSecondName || 'N/A'}</Text> */}
                            <Text style={{ color: '#6E2B8C' }}>Second Name</Text>
                          </View>

                          <View style={{ flexDirection: 'column-reverse', width: '31.6666666667%' }}>
                            <InputComp inputSix=" " outputSix={formdetails?.atdSurname || 'N/A'} n={30}/>

                            {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.atdSurname || 'N/A'}</Text> */}
                            <Text style={{ color: '#6E2B8C' }}>Surname/Tribe</Text>
                          </View>
                        </View>
                      </View>
                    </View>

          {/*  */}
          <View style={styles.row}>
            <Text style={styles.label}>Account No.:</Text>
            {formdetails?.atdAccountNumber?.split('')?.map((item: any, ind: any) => {
              const extraMargin = ind === 2 || ind === 10 ? 10 : '0px';
              return (
                <View
                  key={ind}
                  style={{
                    width: 20,
                    height: 20,
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
                  <Text style={{ fontSize: 8, padding: '0px' }}> {item}</Text>
                </View>
              );
            })}
          </View>
          {/*  */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={styles.label}>Type of Card: </Text>
            <CheckBoxComp label={formdetails?.atdCardType?.value} val={formdetails?.atdCardType?.value} />

            {/* <View style={styles.row}>
              <View style={styles.checkboxRow}>
                <View style={styles.checkbox}>
                  <Text>v</Text>
                </View>
                <Text style={styles.textFontCheckBox}>{formdetails?.atdCardType?.value} </Text>
              </View>
            </View> */}
          </View>
          {/* <CheckBoxComp label="Type of Card" val={} /> */}

          {/* <View style={{ display: 'flex', flexDirection: 'row',alignItems:'center' }}>
            <View
              style={{
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                width: '16.6666666667%',
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
                  // padding: '8px',
                }}
              >
                <Text style={styles.smallText}>Transaction Date</Text>
              </View>
            </View>

            <View
              style={{
                // height: '110px',
                // borderRight: '1px solid #6E2585',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                width: '16.6666666667%',
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
                }}
              >
                <Text style={styles.smallText}>Transaction Time</Text>
              </View>
            </View>

            <View
              style={{
                // height: '110px',
                // borderRight: '1px solid #6E2585',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                width: '16.6666666667%',
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
                }}
              >
                <Text style={styles.smallText}>ATM Card</Text>
              </View>
            </View>

            <View
              style={{
                // height: '110px',
                // borderRight: '1px solid #6E2585',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                width: '16.6666666667%',
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
                }}
              >
                <Text style={styles.smallText}>ATM Location</Text>
              </View>
            </View>
            <View
              style={{
                // height: '110px',
                // borderRight: '1px solid #6E2585',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                width: '16.6666666667%',
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
                  // padding: '2.5px',
                }}
              >
                <Text style={styles.smallText}>Amount Requested (OMR)</Text>
              </View>
            </View>

            <View
              style={{
                // height: '110px',
                borderRight: '1px solid #6E2585',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                width: '16.6666666667%',
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
                  // padding: '2.5px',
                }}
              >
                <Text style={styles.smallText}>Amount Disbursed (OMR)</Text>
              </View>
            </View>
          </View> */}
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', border: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>Transaction Date</Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>Transaction Time</Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>ATM Card</Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>ATM Location</Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Amount Requested (OMR)</Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8 }}>
                <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>
                  Amount Disbursed{'\n'}
                  (OMR)
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottom: '1px solid 6E2B8C',
                borderRight: '1px solid 6E2B8C',
                borderLeft: '1px solid 6E2B8C',
              }}
            >
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>
                  {dayjs(formdetails?.atdTransactionDatendTime).format('DD-MM-YYYY') || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>
                  {dayjs(formdetails?.atdTransactionDatendTime).format('h:mm A') || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>
                  {formdetails?.atdAtmCard || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>
                  {formdetails?.atdAtmLocation || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8, borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>
                  {formdetails?.atdAmountRequested || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '16.66666%', fontSize: 8 }}>
                <Text style={{ textAlign: 'center', marginTop: 5, color: '#6E2B8C' }}>
                  {formdetails?.atdAmountDisbursed || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
          {/*  */}
          <View
            style={{
              flexDirection: 'column',
              gap: 5,
            }}
          >
            {formdetails?.atdWithdrawlIssue?.value === 'No Funds disbursed by the ATM' ? (
              <CheckBoxComp
                label="I have attempted to withdraw cash using my Smart Ven Card. However, no fund was disbursed by the ATM at the time of performing the transaction(s)."
                val={formdetails?.atdWithdrawlIssue?.value}
              />
            ) : (
              <CheckBoxComp label="I have attempted to withdraw cash using my Smart Ven Card. However, no fund was disbursed by the ATM at the time of performing the transaction(s)." />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {formdetails?.atdWithdrawlIssue?.value === 'Partial Funds disbursed by the ATM' ? (
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <CheckBoxComp
                      label="I have attempted to withdraw cash using my Smart Ven Card from the ATM. However, I only received OMR"
                      val={formdetails?.atdWithdrawlIssue?.value}
                    />
                    {formdetails?.atdWithdrawlIssue?.value ? (
                      <Text style={styles.inputLine}>{formdetails?.atdWithdrawlIssue?.value}</Text>
                    ) : null}
                  </View>
                  <Text style={{ ...styles.label, color: '#6E2B8C' }}>
                    as partial disbursement by the ATM at the time of performing the transaction(s).
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <CheckBoxComp label="I have attempted to withdraw cash using my Smart Ven Card from the ATM. However, I only received OMR" />
                    {/* <Text style={styles.inputLine}>{'N/A'}</Text> */}
                  </View>
                  <Text style={styles.label}>
                    as partial disbursement by the ATM at the time of performing the transaction(s).
                  </Text>
                </View>
              )}
            </View>
            {formdetails?.atdWithdrawlIssue?.value === 'Others (Specify)' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBoxComp label="Others (please specify):" val={formdetails?.atdWithdrawlIssue?.value} />
                <Text style={styles.inputLine}>{formdetails?.atdWithdrawlIssueOtherSpecify || 'N/A'}</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBoxComp label="Others (please specify):" />
                {/* <Text style={styles.inputLine}></Text> */}
              </View>
            )}
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
                marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              Declaration
            </Text>
            <Text style={{ color: '#6E2585' }}>
              I here by affirm that the information furnished above along with enclosures are true and accurate and also
              re-confirm that in case the dispute charges from third parties do pertain to my Smart Ven card account I
              would be liable to pay the dispute amount along with retrieval charges as applicable.
            </Text>
            <Text style={{ color: '#6E2585' }}>
              I here by confirm the Card Account will be credited in respect of the Chargeback amount until the
              transaction under dispute is resolved after examination of the appropriate evidence. If the dispute is not
              resolved in the Cardholder's favour, then the Cardholder will be responsible for the entire disputed
              amount.
            </Text>
          </View>
          <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text>____________________________</Text>
              <Text style={{ color: '#6E2585' }}>Primary Cardholder Signature</Text>
            </View>
            <View style={{ flexDirection: 'column', gap: 2, marginRight: '30px' }}>
              <Text>____________________________</Text>
              <Text style={{ color: '#6E2585' }}>Supplementary Cardholder Signature </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text>Date Assign:</Text>
              <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: 8 })?.map((_, index: number) => {
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
                        paddingRight: '2px',
                      }}
                    >
                      <Text style={{ fontSize: 8, padding: '0px' }}> </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text>Date Signed:</Text>
              <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: 8 })?.map((_, index: number) => {
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
                        paddingRight: '2px',
                      }}
                    >
                      <Text style={{ fontSize: 8, padding: '0px' }}> </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          <Text style={styles.textFontCheckBox}>
            (Please note that the supplementary cardholder’s name & signature is mandatory where the transactions
            disputed are done through the Supplementary Card)
          </Text>
        </View>
        <PdfFooter />
      </Page>
    </Document>
  );
}
