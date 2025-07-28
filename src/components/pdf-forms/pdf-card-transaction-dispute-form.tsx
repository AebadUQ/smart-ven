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
    // marginTop: 5,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 8,
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
    marginTop: 'auto',
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

export function CardTransactionDisputeFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt)?.format('DDMMYYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />

        <View style={styles.column}>
          <CustomDate date={formatedDate} />
          <View style={styles.row}>
            <Text style={styles.label}>Card No.:</Text>
            {formdetails?.ctdCardNumber?.split('')?.map((item: any, ind: any) => {
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
                    {formdetails?.ctdTitle?.value}
                  </Text>
                  <Text style={{ color: '#6E2B8C' }}>Title</Text>
                </View>
                <View style={{ flexDirection: 'column-reverse', width: '31.6666666667%' }}>
                  {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.ctdFirstName || 'N/A'}</Text> */}
                  <InputComp inputSix=" " outputSix={formdetails?.ctdFirstName || 'N/A'} n={30}/>
                  <Text style={{ color: '#6E2B8C' }}>FirstName</Text>
                </View>

                <View style={{ flexDirection: 'column-reverse', width: '31.6666666667%' }}>
                  {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.ctdSecondName || 'N/A'}</Text> */}
                  <InputComp inputSix=" " outputSix={formdetails?.ctdSecondName || 'N/A'} n={30}/>
                  <Text style={{ color: '#6E2B8C' }}>Second Name</Text>
                </View>

                <View style={{ flexDirection: 'column-reverse', width: '31.6666666667%' }}>
                  <InputComp inputSix=" " outputSix={formdetails?.ctdSurname || 'N/A'} n={30}/>
                  {/* <Text style={{ ...styles.inputLine, fontSize: 8 }}>{formdetails?.ctdSurname || 'N/A'}</Text> */}
                  <Text style={{ color: '#6E2B8C' }}>Surname/Tribe</Text>
                </View>
              </View>
            </View>
          </View>
          {/*  */}

          {/*  */}
          <View style={styles.row}>
            <Text style={styles.label}>Account No.:</Text>
            {formdetails?.ctdAccountNumber?.split('')?.map((item: any, ind: any) => {
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
          {/* ...................................................................... */}
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <View
              style={{
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                // borderBottom: '1px solid #6E2585',
                width: '20%',
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
                <Text style={{ textAlign: 'center' }}>Transaction Date and Time</Text>
              </View>

              {formdetails?.ctdCardholderData?.map((items: any, index: any) => (
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
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 8 }}>
                    {dayjs(items?.ctdCardholderTransactionDatendTime).format('DD/MM/YYYY')}
                  </Text>
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
                width: '35%',
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
                  padding: '8px',
                }}
              >
                <Text style={{ textAlign: 'center' }}>Merchant Name / ATM Bank Name / Location</Text>
              </View>
              {formdetails?.ctdCardholderData?.map((items: any, index: any) => (
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
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
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
                width: '15%',
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
                <Text style={{ textAlign: 'center' }}>Amount (OMR)</Text>
              </View>
              {formdetails?.ctdCardholderData?.map((items: any, index: any) => (
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
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
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
                width: '30%',
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
                  padding: '15px',
                }}
              >
                <Text style={{ textAlign: 'center' }}>Amount in Foreign Currency</Text>
              </View>
              {formdetails?.ctdCardholderData?.map((items: any, index: any) => (
                <View
                  key={index}
                  style={{
                    // height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmountInForeignCurrency}</Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              gap: 2,
              alignItems: 'flex-start',
            }}
          >
            <Text style={styles.label}>
              I dispute the above mentioned transaction(s) for the following reasons: [Please tick relevant box(es)
              below]
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <CheckBoxComp
                label="I do not recognise the transaction(s)"
                val={formdetails?.ctdDisputeReasons?.reasonOpt1}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <CheckBoxComp
                  label="I did not participate in or authorise the transaction(s). My card was in my possession at the time of the transaction(s). transaction(s)."
                  val={formdetails?.ctdDisputeReasons?.reasonOpt2}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <CheckBoxComp
                  label="I have been debited instead of receiving a credit."
                  val={formdetails?.ctdDisputeReasons?.reasonOpt3}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <CheckBoxComp
                label="I have been debited for this(ese) transaction(s) more than once"
                val={formdetails?.ctdDisputeReasons?.reasonOpt4}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBoxComp
                label="I had agreed to pay a different amount"
                val={formdetails?.ctdDisputeReasons?.reasonOpt5}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <View style={{ width: '40%' }}>
                <CheckBoxComp
                  label="I did not receive any cash or I only received"
                  val={formdetails?.ctdDisputeReasons?.reasonOpt6}
                />
              </View>
              {formdetails?.ctdDisputeReasons?.reasonOpt6 === true && (
                <View style={{ width: '60%' }}>
                  <InputComp inputOne=" " outputOne={formdetails?.reasonOpt6field} />
                </View>
              )}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBoxComp
                label="I had paid for this(ese) transaction(s) through other means."
                val={formdetails?.ctdDisputeReasons?.reasonOpt7}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBoxComp
                label="I have not received the promised credit/refund  *(Please attach proof of payment)"
                val={formdetails?.ctdDisputeReasons?.reasonOpt8}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '100%' }}>
                <View style={{ width: '25%' }}>
                  <CheckBoxComp label="I cancelled membership on" val={formdetails?.ctdDisputeReasons?.reasonOpt9} />
                </View>
                {formdetails?.ctdDisputeReasons?.reasonOpt9 && (
                  <View style={{ width: '30%' }}>
                    <InputComp
                      inputOne=" "
                      outputOne={dayjs(formdetails?.reasonOpt9DateField).format('DD-MM-YYYY') || 'N/A'}
                    />
                  </View>
                )}

                <Text style={styles.textFontCheckBox}>*(Please attach the cancellation proof)</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '45%' }}>
                <CheckBoxComp
                  label="I did not receive the ordered merchandise/services"
                  val={formdetails?.ctdDisputeReasons?.reasonOpt10}
                />
              </View>
              {formdetails?.ctdDisputeReasons?.reasonOpt10 && (
                <View style={{ flexDirection: 'row', width: '30%' }}>
                  <InputComp inputOne=" " outputOne={dayjs(formdetails?.reasonOpt10DateField).format('DD-MM-YYYY')} />
                </View>
              )}
            </View>
            <Text style={styles.textFontCheckBox}>
              *(Please attach signed agreement with the merchant providing expected/confirmed date for receipt)
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '30%' }}>
                <CheckBoxComp
                  label="I cancelled the transaction on"
                  val={formdetails?.ctdDisputeReasons?.reasonOpt11}
                />
              </View>
              {formdetails?.ctdDisputeReasons?.reasonOpt11 && (
                <View style={{ flexDirection: 'row', width: '70%' }}>
                  <InputComp inputOne=" " outputOne={dayjs(formdetails?.reasonOpt11DateField).format('DD-MM-YYYY')} />
                </View>
              )}
            </View>

            <View style={{ flexDirection: 'column', gap: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={{ flexDirection: 'row', width: '40%' }}>
                  <CheckBoxComp
                    label="* (The cardholder contacted the merchant on"
                    val={formdetails?.ctdDisputeReasons?.reasonOpt12}
                  />
                </View>
                {formdetails?.ctdDisputeReasons?.reasonOpt12 && (
                  <View style={{ flexDirection: 'row', width: '20%' }}>
                    <InputComp inputOne=" " outputOne={dayjs(formdetails?.reasonOpt12DateField).format('DD-MM-YYYY')} />
                  </View>
                )}

                <View style={{ flexDirection: 'row', width: '40%' }}>
                  <View style={{ flexDirection: 'row', gap: 1 }}>
                    {formdetails?.ctdDisputeReasons?.reasonOpt12 && (
                      <Text style={styles.textFont}> {formdetails?.reasonOpt13SelectField?.value}</Text>
                    )}
                    <Text style={{ ...styles.textFont, boderBottom: '1px solid #6E2585' }}>
                      .The merchant responded saying
                    </Text>
                  </View>
                </View>
              </View>
              {formdetails?.ctdDisputeReasons?.reasonOpt13 && (
                <InputComp inputOne="            " outputOne={formdetails?.reasonOpt14TextField} />
              )}
            </View>
          </View>
          {formdetails?.ctdCardholderData?.length <3 && <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <View style={{ flexDirection: 'row', width: '10%' }}>
              <CheckBoxComp label="Others" val={formdetails?.ctdDisputeReasons?.reasonOpt16} />
            </View>
            {formdetails?.ctdDisputeReasons?.reasonOpt16 ? (
              <View style={{ flexDirection: 'row', width: '90%' }}>
                {formdetails?.ctdDisputeReasonOther && (
                  <InputComp inputSix=" " outputSix={formdetails?.ctdDisputeReasonOther} n={100} />
                )}
              </View>
            ) : null}
          </View> }

        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>

        {formdetails?.ctdCardholderData?.length >= 3 && <View style={{marginBottom:5, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <View style={{ flexDirection: 'row', width: '10%' }}>
              <CheckBoxComp label="Others" val={formdetails?.ctdDisputeReasons?.reasonOpt16} />
            </View>
            {formdetails?.ctdDisputeReasons?.reasonOpt16 ? (
              <View style={{ flexDirection: 'row', width: '90%' }}>
                {formdetails?.ctdDisputeReasonOther && (
                  <InputComp inputSix=" " outputSix={formdetails?.ctdDisputeReasonOther} n={100} />
                )}
              </View>
            ) : null}
          </View> }
        <View style={{ flexDirection: 'column', gap: 30 }}>
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
              Declaration
            </Text>
            <Text style={{ fontSize: 8 }}>
              I hereby affirm that the information furnished above along with enclosures are true and accurate and also
              re-confirm that in case the disputed charges from third parties do pertain to my Smart Ven card account I
              would be liable to pay the dispute amount along with retrieval charges where applicable. I/We confirm that
              the PIN/Security Code was not recorded on any material kept with the card, and that the PIN/Security Code
              has not been disclosed to any other person by written, verbal or other means.
            </Text>
            <Text style={{ fontSize: 8 }}>
              I/We acknowledge and agree that confidential information which may at any time be provided to the Bank in
              connection with my complaint may be used by the Bank in investigating the complaint and be disclosed by
              the Bank for that purpose to others (including the Bank’s agents and any relevant authority in either case
              here or overseas). I/We authorise the Bank to investigate the transaction(s) in dispute and correct my/our
              card account accordingly. I/We acknowledge the matter may be referred to the local or international police
              for further investigation. I/We acknowledge that the Bank may charge a fee for the dispute processing, if
              found that the transaction was done by the authorised cardholder or correctly charged/disbursed.
            </Text>
          </View>
          <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text>____________________________</Text>
              <Text>Primary Cardholder Signature</Text>
            </View>
            <View style={{ flexDirection: 'column', gap: 2, marginRight: '30px' }}>
              <Text>____________________________</Text>
              <Text>Supplementary Cardholder Signature </Text>
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
                      // style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
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
                      // style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
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

        {/* <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}></View> */}
      </Page>
    </Document>
  );
}
