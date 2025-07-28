'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { StandingOrderArabicFormPDFProps } from './pdf-arabic-forms/arabic-standing-order-form';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
});

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
  checkBoxColor: {
    height: '100%',
    width: '100%',
    backgroundColor: '#6E2B8C',
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

  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 3,
    gap: '20px',
  },
  arabicSecondRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: 3,
    gap: '20px',
  },
  thirdRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    gap: 10,
    // padding: 3,
    // paddingLeft: 5,
    // paddingRight: 3,
    // paddingBottom: 1,
  },

  arabicThirdRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: 10,
    // padding: 3,
    paddingRight: 5,
    paddingLeft: 3,
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
    paddingLeft: 3,
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
    textAlign: 'center',
    // marginBottom: 4,
  },

  smallCheckbox: {
    width: 12,
    marginRight: 2,
    height: 12,
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

  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: 'black',
    width: '60%',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 1,
    // textAlign:"right"
  },
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 8,
    direction: 'rtl',
    textAlign: 'right',
    color: '#6E2B8C',
  },
  arabicTextHead: {
    fontFamily: 'Cairo',
    fontSize: 10,
    direction: 'rtl',
    textAlign: 'right',
    // color: '#56004E',
    fontWeight: 400,
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function StandingOrderFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  const standingOrderStartDate = dayjs(formdetails?.sofStandingOrderStartDate).format('MMM D, YYYY h:mm A');
  const standingOrderEndDate = dayjs(formdetails?.sofStandingOrderEndDate).format('MMM D, YYYY h:mm A');
  const addAppNames=[formdetails?.sofScheduleOfChargesFirstApplicant,formdetails?.sofScheduleOfChargesSecondApplicant]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
            Note: Please complete in Block letters and sign in the appropriate space.
          </Text>
          {/* <CustomDate date={formatedDate} /> */}
        </View>
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'column', gap: 1 }}>
                <Text style={styles.textFont}>The Manager,</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <Text style={styles.textFont}>Branch:</Text>
                  <Text style={styles.input}>{formdetails?.sofBranch?.value}</Text>
                </View>
                <Text style={styles.textFont}>Bank Nizwa</Text>
                <Text style={{ ...styles.textFont }}>Sultanate of Oman</Text>
              </View>
              <Text style={{ ...styles.textFont, marginVertical: 5 }}>Dear Sir/Madam,</Text>
              <Text style={{ ...styles.textFont, marginVertical: 5, fontFamily: 'Helvetica-Bold' }}>
                Re: Standing Order
              </Text>
              <Text style={styles.textFont}>
                I/We hereby authorise you to execute the following Standing Order on my/our behalf:
              </Text>
            </View>
            <CustomDate date={formatedDate} />
          </View>

          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
              <Text style={{ ...styles.textFont }}>Account to be Debited:</Text>
              <AccountBoxes data={formdetails?.sofAccountToBeDebit.split('')} />
            </View>
            <InputComp inputOne="Account Name:" outputOne={formdetails?.sofAccountName} />
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <InputComp inputOne="Account Amount in figures:" outputOne={formdetails?.sofAmountFigures} />
              <InputComp inputOne="Currency:" outputOne={formdetails.sofCurrency?.value} />
            </View>
            <InputComp inputOne="Amount in words:" outputOne={formdetails.sofAmountWords} />
            <View style={styles.thirdRow}>
              <Text style={styles.textFont}>Frequency of Transfer:</Text>
              <CheckBoxComp
                label={formdetails?.sofFrequencyOfTransfer?.value}
                val={formdetails?.sofFrequencyOfTransfer?.value}
              />
              {/* <View style={styles.checkboxRow}>
                <View style={styles.smallCheckbox}>
                  {formdetails?.sofFrequencyOfTransfer?.value ? (
                    <Text style={{ height: '100%', width: '100%', backgroundColor: '#6E2B8C' }}></Text>
                  ) : null}
                </View>
                <Text style={styles.textFont}>{formdetails?.sofFrequencyOfTransfer?.value}</Text>
              </View> */}
            </View>
            <InputComp
              inputOne="Standing Order Start Date:"
              outputOne={standingOrderStartDate}
              outputTwo={standingOrderEndDate}
              inputTwo="Standing Order End Date:"
            />
            <View style={styles.thirdRow}>
              <Text style={styles.textFont}>Mode of Standing Order:</Text>
              <CheckBoxComp
                label={formdetails?.sofModeOfStandingOrderExecution?.value}
                val={formdetails?.sofModeOfStandingOrderExecution?.value}
              />
              {/* <View style={styles.checkboxRow}>
                <View style={styles.smallCheckbox}>
                  {formdetails?.sofModeOfStandingOrderExecution?.value ? (
                    <Text style={{ width: '100%', height: '100%', backgroundColor: '#6E2B8C' }}></Text>
                  ) : null}
                </View>
                <Text style={styles.textFont}>{formdetails?.sofModeOfStandingOrderExecution?.value}</Text>
              </View> */}
            </View>
          </View>

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
              BENEFICIARY DETAILS
            </Text>
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <InputComp inputOne="Name:" outputOne={formdetails?.sofBeneficiarylName} />
              <InputComp inputOne="Account No./IBAN No.:" outputOne={formdetails?.sofBeneficiaryAccNumOrIBAN} />
              {/* <AccountBoxes data={formdetails?.sofBeneficiaryAccNumOrIBAN?.split('')} /> */}
              <InputComp inputOne="Bank Name:" outputOne={formdetails?.sofBeneficiaryBankName} />
              <InputComp inputOne="Branch" outputOne={formdetails?.sofBeneficiaryBranch?.value} />
              <InputComp inputOne="SWIFT/SORT/BIC Code No.:" outputOne={formdetails?.sofBeneficiarySwiftCode} />
              <InputComp inputOne="Details of payment:" outputOne={formdetails?.sofBeneficiaryPaymentDetail} />
              <InputComp inputOne="Address" outputOne={formdetails?.sofBeneficiaryAddress} />
              <View style={styles.thirdRow}>
                <Text style={styles.textFont}>Corresponding Bank Charges: </Text>
                <CheckBoxComp
                  label={formdetails?.sofBeneficiaryCorrespondentBankCharges?.value}
                  val={formdetails?.sofBeneficiaryCorrespondentBankCharges?.value}
                />
                {/* <View style={styles.checkboxRow}>
                  <View style={styles.smallCheckbox}>
                    {formdetails?.sofBeneficiaryCorrespondentBankCharges?.value ? (
                      <Text style={{ width: '100%', height: '100%', backgroundColor: '#6E2B8C' }}></Text>
                    ) : null}
                  </View>
                  <Text style={styles.textFont}>{formdetails?.sofBeneficiaryCorrespondentBankCharges?.value}</Text>
                </View> */}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 4 }}>
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
              TERMS AND CONDITIONS
            </Text>
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                1) Standing Orders will be executed by the Bank from the very first due date. 2) Service charges at the
                rates prevailing at the time of transaction will be charged to the customer’s account on each Standing
                Order executed. 3) Charges will also be recovered from the customer’s account, if Standing Order could
                not be executed due to insufficient balance maintained in the account. 4) Bank will not be responsible
                for non-execution of Standing Order, because of insufficient balance in customer’s account due to
                currency rate fluctuations or for any other reason. 5) If Standing Order remains unexecuted due to the
                reasons of insufficient balance in customer’s account the Bank reserves the right to cancel the Standing
                Order without informing the customer at any time. 6) Above conditions are in addition to (Terms and
                Conditions) agreed upon by the customer in the Account Opening Form and Funds Transfer Form.
              </Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                I/We have read and understood the Bank’s Terms and Conditions mentioned and agree to abide by them. I/We
                undertake to maintain sufficient balance in my/our account for execution of Standing Order on due date.
                I/We agree to pay charges prevailing at the time of execution.
              </Text>
            </View>
          </View>
          <View style={styles.thirdRow}>
              <Text style={styles.textFont}>Select Payment Type:</Text>
              <CheckBoxComp
                label={formdetails?.sofScheduleOfChargesPaymentType?.value
                }
                val={formdetails?.sofScheduleOfChargesPaymentType?.value}
              />
              {/* <View style={styles.checkboxRow}>
                <View style={styles.smallCheckbox}>
                  {formdetails?.sofFrequencyOfTransfer?.value ? (
                    <Text style={{ height: '100%', width: '100%', backgroundColor: '#6E2B8C' }}></Text>
                  ) : null}
                </View>
                <Text style={styles.textFont}>{formdetails?.sofFrequencyOfTransfer?.value}</Text>
              </View> */}
            </View>

        </View>
        <PdfFooter/>
      </Page>
      <Page size="A4" style={styles.page}>
        {formdetails?.sofScheduleOfChargesDemandDraft?.value || formdetails?.sofScheduleOfChargesPayOrder?.value &&

        <View style={styles.secondColumn}>
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
              SCHEDULE OF CHARGES (tick on appropriate field)
            </Text>
            <View style={{ flexDirection: 'column', gap: 2,border:'1px solid #6E2585' }}>
              {formdetails?.sofScheduleOfChargesDemandDraft ?
                <View style={{ flexDirection: 'column', gap: 3 }}>
                  <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold'}}>Demand Draft</Text>
                  <View style={{ padding: 4, ...styles.thirdRow }}>

              <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>{formdetails?.sofScheduleOfChargesDemandDraft?.value} </Text>
              <CheckBoxComp label=" " val={formdetails?.sofScheduleOfChargesDemandDraft?.value} /></View>
    </View>

                : <View style={{ flexDirection: 'column', gap: 3 ,padding: 4,}}>
                  <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold'}}>PayOrder</Text>
                <View style={{ ...styles.thirdRow }}>
            <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>{formdetails?.sofScheduleOfChargesPayOrder?.value} </Text>
            <CheckBoxComp label=" " val={formdetails?.sofScheduleOfChargesPayOrder?.value} />
          </View></View>}</View>
            {/* <View style={{ flexDirection: 'column', gap: 2,border:'1px solid #6E2585' }}> */}


              {/* <View style={{ flexDirection: 'column', gap: 2,border:'1px solid #6E2585' }}> */}



                    {/* </View> */}
              {/* <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '50%',
                    borderLeft: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                  }}
                >
                  <View
                    style={{
                      height: '15px',
                      paddingHorizontal: 5,
                      borderBottom: '1px solid #6E2585',
                      textAlign: 'left',

                      backgroundColor: '#C0C0C0',
                      color: '#6E2585',
                    }}
                  >
                    <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>PAY ORDER/DEMAND DRAFT</Text>
                  </View>
                  <View style={{ ...styles.column, borderRight: '1px solid #6E2585' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        borderBottom: '1px solid #6E2585',
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: 2 }}>
                        <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>Pay Order</Text>
                        <Text style={{ ...styles.textFont }}>- RO 2</Text>
                      </View>
                      <View style={styles.checkbox}></View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        borderBottom: '1px solid #6E2585',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: 2 }}>
                        <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>TT Local</Text>
                        <Text style={{ ...styles.textFont }}>- RO 1</Text>
                      </View>
                      <View style={styles.checkbox}></View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: 2 }}>
                        <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>
                          Standing Order Internal{' '}
                        </Text>
                        <Text style={{ ...styles.textFont }}>- RO 1</Text>
                      </View>
                      <View style={styles.checkbox}></View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '50%',
                    borderRight: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                  }}
                >
                  <View
                    style={{
                      height: '15px',
                      borderBottom: '1px solid #6E2585',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#C0C0C0',
                      color: '#6E2585',
                    }}
                  ></View>
                  <View style={{ ...styles.column }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        borderBottom: '1px solid #6E2585',
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: 2 }}>
                        <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>Demand Draft </Text>
                        <Text style={{ ...styles.textFont }}>- RO 2 </Text>
                      </View>
                      <View style={styles.checkbox}></View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        borderBottom: '1px solid #6E2585',
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: 2 }}>
                        <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>TT International SWIFT</Text>
                        <Text style={{ ...styles.textFont }}>RO 1 </Text>
                      </View>
                      <View style={styles.checkbox}></View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: 2 }}>
                        <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>
                          Standing Order External{' '}
                        </Text>
                        <Text style={{ ...styles.textFont }}>- RO 1 </Text>
                      </View>
                      <View style={styles.checkbox}></View>
                    </View>
                  </View>
                </View>
              </View> */}
            {/* </View> */}
          </View>

        }

        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
          <View
            style={{
              fontSize: '8px',
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
                height: '15px',
              }}
            >
              <Text style={{ fontSize: 8 }}></Text>
            </View>
            <View
              style={{
                height: '30px',
                // backgroundColor: '#C0C0C0',
                justifyContent: 'flex-start',
                borderRight: 0,
                alignItems: 'flex-start',
                color: '#6E2585',
                borderBottom: '1px solid #6E2585',
                width: '100%',
                padding: 2,
              }}
            >
              {/*  */}
              <Text style={{ fontSize: 8 }}>(First Applicant)</Text>
            </View>
            <View
              style={{
                height: '30px',
                // backgroundColor: '#C0C0C0',
                justifyContent: 'flex-start',
                borderRight: 0,
                alignItems: 'flex-start',
                color: '#6E2585',
                borderBottom: '1px solid #6E2585',
                width: '100%',
                padding: 2
              }}
            >
              <Text style={{ fontSize: 8 }}>(Second Applicant)</Text>
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
                height: '15px',
                // padding: '8px',
              }}
            >
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold' }}>Customer Name(s)</Text>
            </View>
            {addAppNames?.map((items: any, index: any) => (
              <View
                key={index}
                style={{
                  height: '30px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-start',
                  borderRight: 0,
                  alignItems: 'flex-start',
                  color: '#6E2585',
                  borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: 2,
                }}
              >
                <Text style={{ fontSize: 8 }}>{items || "N/A"}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              borderRight: '1px solid #6E2585',
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
                // padding: '8px',
                height: '15px',
              }}
            >
              <Text style={{ fontSize: 8, textAlign: 'center', fontFamily: 'Helvetica-Bold' }}>Signature</Text>
            </View>
            {Array.from({ length: 2 })?.map((items: any, index: any) => (
              <View
                style={{
                  height: '30px',
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
                <Text style={{ fontSize: 8 }}>{}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:50 }}>
          <CustomDate date={' '.repeat(8)} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>Approved:</Text>
            <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>Operations Officer/Branch Manager </Text>
          </View>
        </View>

        <PdfFooter />
      </Page>
      <StandingOrderArabicFormPDFProps data={data} />
    </Document>
  );
}
