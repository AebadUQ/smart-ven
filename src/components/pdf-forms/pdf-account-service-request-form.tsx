'use client';

import * as React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: 'black',
    // width: '100px',
    fontSize: 10,
    flexGrow: 1,

    // textAlign:"right"},
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
    alignItems: 'flex-end',
    gap: 5,
    // justifyContent: 'space-between',
    // width: '70%',
    // paddingLeft: 5,
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
    gap: 7,
    justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function AccountServiceRequestFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt)?.format('DDMMYYYY');
  const dateOfJoin = dayjs(formdetails?.asrEmpDateOfJoining)?.format('DD/MM/YYYY');
  const passExpiry = dayjs(formdetails?.asrPassportExpiryDate)?.format('DD/MM/YYYY');
  const addApplicants = [
    {
      label: 'First Applicant',
      name: formdetails?.asfConsentAndDeclarationFirstApplicantName,
    },
    {
      label: 'Second Applicant',
      name: formdetails?.asfConsentAndDeclarationSecondApplicantName,
    },
    {
      label: 'Third Applicant',
      name: formdetails?.asfConsentAndDeclarationThirdApplicantName,
    },
    {
      label: 'Fourth Applicant',
      name: formdetails?.asfConsentAndDeclarationFourthApplicantName,
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
            <View style={styles.row}>
              <Text style={styles.label}>Branch : </Text>
              <Text style={styles.inputLine}>{formdetails?.asrBranchName?.value}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
              Note: Please complete in Block letters and sign in the appropriate space.
            </Text>
          </View>

          <View style={{ flexDirection: 'column', gap: 3 }}>
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
                CUSTOMER(S) DETAILS
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                }}
              >
                <View
                  style={{ width: '15%', padding: 2, borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: '10px' }}></Text>
                </View>

                <View
                  style={{ width: '35%', padding: 2, borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2585' }}>Name</Text>
                </View>

                <View
                  style={{ width: '15%', padding: 2, borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2585' }}>Mobile</Text>
                </View>

                <View style={{ width: '35%', padding: 2, backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', color: '#6E2585' }}>Email</Text>
                </View>
              </View>
              {formdetails?.asrCustomerDetail?.map((items: any, index: any) => (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderBottom: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
                    borderRight: '1px solid #6E2585',
                  }}
                  key={index}
                >
                  <View
                    style={{
                      width: '15%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585'
                      ,paddingVertical:10,
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize:8 }}>
                      Additional Applicant {index + 1}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '35%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                      paddingVertical:10,
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize:8 }}>
                      {items?.asrCustomerName || 'N/A'}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '15%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                      paddingVertical:10,
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize:8 }}>
                      {items?.asrCustomerMobileNo || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ width: '35%', padding: 2, borderTop: '1px solid #6E2585',paddingVertical:10, }}>
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {items?.asrCustomerEmailId || 'N/A'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                marginTop: 5,
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
                ACCOUNT DETAILS
              </Text>
              <View style={styles.column}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', marginVertical: 5 }}>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>Account No.:</Text>
                    <AccountBoxes data={formdetails?.asrAccountNumber.split('')} />
                  </View>
                  {/* <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}> Account Name:</Text>
                    <Text style={styles.input}>{formdetails?.asrAccountName || 'N/A'}</Text>
                  </View> */}
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}> Account Name:</Text>
                  <Text style={styles.input}>{formdetails?.asrAccountName || 'N/A'}</Text>
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
                BANKING SERVICE REQUIRED
              </Text>
              <View style={styles.rowFav}>
                <View style={{ flexDirection: 'column', width: '100%', paddingRight: 5 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'space-between',
                      gap: 10,
                      width: '90%',
                    }}
                  >
                    <CheckBoxComp label="Cheque Book" val={formdetails?.asrChequeBook?.value} />
                    <View style={styles.rowFav}>
                      <CheckBoxComp
                        label={'leaves' + ' ' + formdetails?.asrChequeBook?.value}
                        val={formdetails?.asrChequeBook?.value}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '58%',
                      marginLeft: 5,
                      marginTop: 5,
                    }}
                  >
                    <Text style={styles.secondLabel}>Delivery:</Text>
                    <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                      <CheckBoxComp label="Collection from Branch:" val={formdetails?.asrReceivingMethod?.value} />

                      <Text style={styles.input}>{formdetails?.asrReceivingMethod?.value}</Text>
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
                CERTIFICATE(S) AND LETTER(S) REQUEST DETAILS
              </Text>

              <View style={{ flexDirection: 'row', width: '100%', gap: 15 }}>
                <View style={{ flexDirection: 'column', width: '100%', gap: 5 }}>
                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '20%' }}>
                      <CheckBoxComp label="Liability Letter" val={formdetails?.asrLiabilityLetter} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <InputComp inputOne="Purpose:" outputOne={formdetails?.asrLiabilityLetterPurpose || 'N/A'} />
                        {/* <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrLiabilityLetterPurpose || 'N/A'}</Text> */}
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '20%' }}>
                      <CheckBoxComp
                        label={`Account/Balance\nCertificate`}
                        val={formdetails?.asrAccountBalanceCertificate}
                      />
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <InputComp
                          inputOne="Purpose:"
                          outputOne={formdetails?.asrAccountBalanceCertificatePurpose || 'N/A'}
                        />

                        {/* <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrAccountBalanceCertificatePurpose || 'N/A'}</Text> */}
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '20%' }}>
                      <CheckBoxComp
                        label={`Account Closure\nCertificate`}
                        val={formdetails?.asrAccountClosureCertificate}
                      />
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <InputComp
                          inputOne="Purpose:"
                          outputOne={formdetails?.asrAccountClosureCertificatePurpose || 'N/A'}
                        />
                        {/*
                        <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrAccountClosureCertificatePurpose || 'N/A'}</Text> */}
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '20%' }}>
                      <CheckBoxComp label={`Release Letter`} val={formdetails?.asrReleaseLetter} />
                      {/* <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}>
                          {formdetails?.asrReleaseLetter === true ? <Text style={styles.checkBoxColor}></Text> : null}
                        </View>
                        <Text style={styles.secondLabel}>Release Letter </Text>
                      </View> */}
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <InputComp inputOne="purpose" outputOne={formdetails?.asrReleaseLetterPurpose || 'N/A'} />
                        {/* <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrReleaseLetterPurpose || 'N/A'}</Text> */}
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '20%' }}>
                      <CheckBoxComp label={`No Liability`} val={formdetails?.asrNoLiabilityLetter} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <InputComp inputOne="Purpose" outputOne={formdetails?.asrNoLiabilityLetterPurpose || 'N/A'} />
                        {/* <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrNoLiabilityLetterPurpose || 'N/A'}</Text> */}
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '20%' }}>
                      <CheckBoxComp label={`Audit Confirmation\nReport`} val={formdetails?.asrAuditConfirmReport} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <InputComp inputOne="Purpose" outputOne={formdetails?.asrAuditConfirmReportPurpose || 'N/A'} />
                        {/* <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrAuditConfirmReportPurpose || 'N/A'}</Text> */}
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '20%' }}>
                      <CheckBoxComp label={`Reference Letter`} val={formdetails?.asrReferenceLetter} />
                    </View>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                      <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <InputComp inputOne="Purpose" outputOne={formdetails?.asrReferenceLetterPurpose || 'N/A'} />

                        {/* <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrReferenceLetterPurpose || 'N/A'}</Text> */}
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'row', width: '20%' }}>
                      <CheckBoxComp label={`Statement of\nAccount`} val={formdetails?.asrStatementOfAccount} />
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', gap: 1, alignItems: 'center' }}>
                      <InputComp
                        inputOne="Statement Purpose"
                        outputOne={formdetails?.asrStatementOfAccountPurpose || 'N/A'}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'row', width: '20%' }}>
                      <CheckBoxComp label={`Other Request`} val={formdetails?.asrOtherRequest} />
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', gap: 1, alignItems: 'center' }}>
                      <InputComp
                        inputOne="Details and Purpose:"
                        outputOne={formdetails?.asrOtherRequestReason || 'N/A'}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'row', width: '20%' }}>
                      <Text style={styles.secondLabel}>Delivery:</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', gap: 1, alignItems: 'center' }}>
                      {formdetails?.asrReceivingMethod?.value && (
                        <InputComp
                          inputOne="Collection from Branch:"
                          outputOne={formdetails?.asrReceivingMethod?.value || 'N/A'}
                        />
                      )}
                    </View>
                  </View>
                </View>

                {/* <View style={{ flexDirection: 'column', width: '50%',gap:5 }}>
                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                    <CheckBoxComp label={`Release Letter`} val={formdetails?.asrNoLiabilityLetter} />

                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrNoLiabilityLetterPurpose || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                    <CheckBoxComp label={`Audit Confirmation\nReport`} val={formdetails?.asrAuditConfirmReport} />

                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrAuditConfirmReportPurpose || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', gap: 20 }}>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                    <CheckBoxComp label={`Reference Letter`} val={formdetails?.asrReferenceLetter} />

                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Text style={styles.secondLabel}>Purpose:</Text>
                        <Text style={styles.input}>{formdetails?.asrReferenceLetterPurpose || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>
                </View> */}
              </View>

              <View style={{ flexDirection: 'column', gap: 5 }}>
                {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', width: '20%' }}>
                  <CheckBoxComp label={`Statement of\nAccount`} val={formdetails?.asrStatementOfAccount} />


                  </View>
                  <View style={{ flexDirection: 'row', width: '80%', gap: 1, alignItems: 'center' }}>
                    <InputComp inputOne="Statement Purpose" outputOne={formdetails?.asrStatementOfAccountPurpose || "N/A"} />

                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', width: '20%' }}>
                  <CheckBoxComp label={`Other Request`} val={formdetails?.asrOtherRequest} />

                  </View>
                  <View style={{ flexDirection: 'row', width: '80%', gap: 1, alignItems: 'center' }}>

                    <InputComp inputOne="Details and Purpose:" outputOne={formdetails?.asrOtherRequestReason || 'N/A'}/>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', width: '20%' }}>
                    <Text style={styles.secondLabel}>Delivery:</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: '80%', gap: 1, alignItems: 'center' }}>
                  <InputComp inputOne="Collection from Branch:" outputOne={formdetails?.asrReceivingMethod?.value || 'N/A'}/>


                  </View>
                </View> */}
              </View>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', marginBottom: 2 }}>
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
            ADDITIONAL APPLICANT DETAILS
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View
              style={{
                height: 'auto',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                width: '50%',
                padding: 4,
              }}
            >
              <View style={styles.column}>
                <View style={styles.customRow}>
                  <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Source of Income:</Text>
                  {/* <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}>
                          {formdetails?.asrEmpSourceOfIncome?.value ? (
                            <Text style={{ height: '100%', width: '100%', backgroundColor: '#6E2585' }}></Text>
                          ) : null}
                        </View>

                        <Text style={styles.secondLabel}> {formdetails?.asrEmpSourceOfIncome?.value} </Text>
                      </View> */}
                  <CheckBoxComp
                    label={formdetails?.asrEmpSourceOfIncome?.value}
                    val={formdetails?.asrEmpSourceOfIncome?.value}
                  />
                  {/* <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}></View>
                        <Text style={styles.secondLabel}> Own Business </Text>
                      </View>
                      <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}></View>
                        <Text style={styles.secondLabel}> Others </Text>
                      </View> */}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Sector (if salary): </Text>
                  <CheckBoxComp label={formdetails?.asrEmpSector?.value} val={formdetails?.asrEmpSector?.value} />
                  {/* <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}>
                          {' '}
                          {formdetails?.asrEmpSector?.value ? <Text style={styles.checkBoxColor}></Text> : null}
                        </View>
                        <Text style={styles.secondLabel}> {formdetails?.asrEmpSector?.value} </Text>
                      </View> */}
                </View>

                <InputComp inputOne="Name of the Employer" outputOne={formdetails?.asrEmpName || 'N/A'} />
                <InputComp inputOne="Nature of Business" outputOne={formdetails?.asrEmpNatureOfBusiness || 'N/A'} />
                <InputComp inputOne="Designation" outputOne={formdetails?.asrEmpDesignation || 'N/A'} />

                <InputComp
                  inputOne="Employee No"
                  inputTwo="Date of Joining"
                  outputOne={formdetails?.asrEmpNo || 'N/A'}
                  outputTwo={dateOfJoin || 'N/A'}
                />
                <InputComp inputOne="Passport No" outputOne={formdetails?.asrPassportNo || 'N/A'} />

                <InputComp inputOne="Passport Expiry Date" outputOne={passExpiry || 'N/A'} />

                <InputComp
                  inputOne="Telephone"
                  inputTwo="Fax"
                  outputOne={formdetails?.asrEmpTelephone || 'N/A'}
                  outputTwo={formdetails?.asrEmpFax || 'N/A'}
                />
                <InputComp inputOne="Income p.m" outputOne={formdetails?.asrEmpIncomePm || 'N/A'} />

                <InputComp inputOne="Source of Other Income" outputOne={formdetails?.asrSourceOfOtherIncome || 'N/A'} />
              </View>
            </View>

            <View
              style={{
                height: 'auto',
                borderRight: '1px solid #6E2585',
                fontSize: '10px',
                // color: '#6E2585',
                borderTop: '1px solid #6E2585',
                borderBottom: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                width: '50%',
                padding: 2,
              }}
            >
              <View style={styles.column}>
                <InputComp
                  inputOne="P.O Box"
                  inputTwo="Postal Code"
                  outputOne={formdetails?.asrContactPOBox || 'N/A'}
                  outputTwo={formdetails?.asrContactPostalCode || 'N/A'}
                />

                <InputComp
                  inputOne="House No./Flat No"
                  inputTwo="Building No"
                  outputOne={formdetails?.asrContactHouseNo || 'N/A'}
                  outputTwo={formdetails?.asrContactBuildingNo || 'N/A'}
                />

                <InputComp
                  inputOne="Way No"
                  inputTwo="Area"
                  outputOne={formdetails?.asrContactWayNo || 'N/A'}
                  outputTwo={formdetails?.asrContactArea || 'N/A'}
                />

                <InputComp
                  inputOne="Wilayat"
                  inputTwo="Res. Tel. No"
                  outputOne={formdetails?.asrContactWilayat || 'N/A'}
                  outputTwo={formdetails?.asrContactResTelNo || 'N/A'}
                />

                <InputComp
                  inputOne="Mobile (1)"
                  inputTwo="Mobile (2)"
                  outputOne={formdetails?.asrContactMobile1 || 'N/A'}
                  outputTwo={formdetails?.asrContactMobile2 || 'N/A'}
                />

                <InputComp inputOne="Email" outputOne={formdetails?.asrContactEmail || 'N/A'} />
                <InputComp
                  inputOne="Permenent Address"
                  outputOne={formdetails?.asrContactPermanentAddressHomeCountry || 'N/A'}
                />
                <InputComp inputOne="Telephone" outputOne={formdetails?.Telephone || 'N/A'} />
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
            <View style={{ flexDirection: 'column', width: '60%', borderRight: '1px solid #6E2585', paddingRight: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>Standard Frequencies: </Text>
                <Text style={{ color: '#6E2585', fontSize: 8 }}> Printed (Biannually) </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* <View style={styles.checkboxRow}>
                      <View style={styles.checkbox}>
                        {formdetails?.asfChangesInChangesFrequency?.value ? (
                          <Text style={styles.checkBoxColor}></Text>
                        ) : null}
                      </View>
                      <Text style={{ fontSize: 8 }}>Change in Printed Frequency*, please specify</Text>
                    </View> */}
                <CheckBoxComp
                  label={'Change in Printed Frequency*, please specify'}
                  val={formdetails?.asfChangesInChangesFrequency?.value}
                />
                {formdetails?.asfChangesInChangesFrequency?.value && (
                  <View style={styles.rowFav}>
                    <CheckBoxComp
                      label={formdetails?.asfChangesInChangesFrequency?.value}
                      val={formdetails?.asfChangesInChangesFrequency?.value}
                    />
                    {/* <View style={styles.checkboxRow}>
                          <View style={styles.checkbox}>
                            {formdetails?.asfChangesInChangesFrequency?.value ? (
                              <Text style={styles.checkBoxColor}></Text>
                            ) : null}
                          </View>
                          <Text>{formdetails?.asfChangesInChangesFrequency?.value}</Text>
                        </View> */}

                    {/* <View style={styles.checkboxRow}>
                        <View style={styles.checkbox}></View>
                        <Text>Weekly</Text>
                      </View> */}
                  </View>
                )}
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.checkboxRow}>
                  <Text style={{ fontSize: 5 }}>*Charges applicable</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column', width: '40%', paddingRight: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ color: 'black', fontSize: 5 }}>✓</Text>

                <Text style={{ color: '#6E2585', fontSize: 8 }}> Email (Monthly)</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <CheckBoxComp label={'Change in Email'} val={formdetails?.asfChangesInEmailFrequency?.value} />

                {/* <View style={styles.checkboxRow}>
                      <View style={styles.checkbox}>
                        {formdetails?.asfChangesInEmailFrequency?.value ? (
                          <Text style={styles.checkBoxColor}></Text>
                        ) : null}
                      </View>
                      <Text style={{ fontSize: 8 }}>Change in Email </Text>
                    </View> */}
                <View style={styles.rowFav}>
                  {formdetails?.asfChangesInEmailFrequency?.value && (
                    <CheckBoxComp
                      label={formdetails?.asfChangesInEmailFrequency?.value}
                      val={formdetails?.asfChangesInEmailFrequency?.value}
                    />
                    // <View style={styles.checkboxRow}>
                    //   <View style={styles.checkbox}>
                    //     {formdetails?.asfChangesInEmailFrequency?.value ? (
                    //       <Text style={styles.checkBoxColor}></Text>
                    //     ) : null}
                    //   </View>
                    //   <Text>{formdetails?.asfChangesInEmailFrequency?.value}</Text>
                    // </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 2, marginBottom: 2 }}>
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
            INFORMATION SERVICES REQUEST DETAILS
          </Text>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <CheckBoxComp
              label="I/We hereby authorise the Bank to send me/us information relating to its products, services and special offers by:"
              val={formdetails?.asfInfoServiceReqDetailCheck}
            />
            {/* <View style={styles.checkboxRow}>
                  <View style={styles.checkbox}>
                    {' '}
                    {formdetails?.asfInfoServiceReqDetailCheck ? <Text style={styles.checkBoxColor}></Text> : null}
                  </View>
                  <Text style={styles.secondLabel}>
                    I/We hereby authorise the Bank to send me/us information relating to its products, services and
                    special offers by:
                  </Text>
                </View> */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <CheckBoxComp label={formdetails?.asfEmailAndSmsMms?.value} val={formdetails?.asfEmailAndSmsMms?.value} />
              {/* <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}>
                      {formdetails?.asfEmailAndSmsMms?.value ? <Text style={styles.checkBoxColor}></Text> : null}
                    </View>
                    <Text style={styles.secondLabel}>{formdetails?.asfEmailAndSmsMms?.value} </Text>
                  </View> */}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 2 }}>
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
            CONSENT AND DECLARATION
          </Text>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <Text style={styles.secondLabel}>
              I/We hereby declare that the information given in this form is true and complete. I/We hereby authorise
              the Bank to deduct applicable charges for the requested service(s) from above or below mentioned account
            </Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <Text style={styles.secondLabel}>Account Number</Text>
                <AccountBoxes data={formdetails?.asfConsentAndDeclarationAccNumber.split('')} />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 5, width: '100%', alignItems: 'flex-end' }}>
            <Text style={styles.secondLabel}>Account Name: </Text>
            <Text style={styles.input}>{formdetails?.asfConsentAndDeclarationAccName}</Text>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
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
                height: '23px',
                padding: '4px',
              }}
            >
              <Text style={{ fontSize: 10 }}></Text>
            </View>
            <View
              style={{
                height: '40px',
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
              <Text style={{ fontSize: 8 }}>Additional Applicant 1</Text>
            </View>
            <View
              style={{
                height: '40px',
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
              <Text style={{ fontSize: 8 }}>Additional Applicant 2</Text>
            </View>
            <View
              style={{
                height: '40px',
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
              <Text style={{ fontSize: 8 }}>Third Applicant (if joint account)</Text>
            </View>
            <View
              style={{
                height: '40px',
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
              <Text style={{ fontSize: 8 }}>Fourth Applicant (if joint account)</Text>
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
                padding: '4px',
              }}
            >
              <Text style={{ fontSize: 10 }}>Customer(s) Name</Text>
            </View>
            {addApplicants?.map((item: any, index: any) => (
              <View
                key={index}
                style={{
                  height: '40px',
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
                <Text style={{ fontSize: 8 }}>{item?.name || 'N/A'}</Text>
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
                padding: '4px',
                // height: '30px',
              }}
            >
              <Text style={{ fontSize: 10 }}>Signature</Text>
            </View>
            {Array.from({ length: 4 })?.map((items: any, index: any) => (
              <View
                style={{
                  height: '40px',
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
                <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 5 }}></View>
        <CustomDate date={formatedDate} />
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
                  width: '33.3333333333%',
                }}
              >
                <View
                  style={{
                    color: '#6E2585',
                    paddingHorizontal: '5px',
                    paddingVertical: '15px',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Text style={styles.label}>Signature Verified by:</Text>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Staff Name & ID:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Signature:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Date:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 'auto',
                  // borderRight: '1px solid #6E2585',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '33.3333333333%',
                }}
              >
                <View
                  style={{
                    color: '#6E2585',
                    paddingHorizontal: '5px',
                    paddingVertical: '15px',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Text style={styles.label}>Processed by:</Text>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Staff Name & ID:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Signature:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Date:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
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
                  width: '33.3333333333%',
                }}
              >
                <View
                  style={{
                    color: '#6E2585',
                    paddingHorizontal: '5px',
                    paddingVertical: '15px',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Text style={styles.label}>Approved by:</Text>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Staff Name & ID:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Signature:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.textFont}>Date:</Text>
                    <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
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
