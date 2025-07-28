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

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf', // Ensure path is correct (can be URL or local)
});

const styles = StyleSheet.create({
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 12,
    direction: 'rtl',
    textAlign: 'right',
  },

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
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',

    gap: 4,
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
    fontSize: 8,
    marginTop: 5,
    textAlign: 'center',
  },
  thirdRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingLeft: 5,
    gap: 8,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 4,
    marginRight: 5,
    color: '#6E2B8C',
  },
  secondLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6E2B8C',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    fontSize: 10,
    width: '200px',
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    flexGrow: 1,
    fontSize: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 5,
    gap: 5,
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
    fontSize: 2,
    borderWidth: 1,
    borderColor: '#6E2B8C',
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'center',
  },
  checkbox: {
    width: 15,
    // marginRight: 6,
    height: 15,
    borderWidth: 1,
    borderColor: '#6E2B8C',
    // marginLeft: 6,
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
    // justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function CorporateInternetBankingRgistrationPdfForm({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const date = Array.from({ length: 9 });
  const formatedDate = dayjs(formdetails?.cibrDate).format('DD-MM-YYYY');
  const formatedDateTwo = dayjs(data?.updatedAt).format('DDMMYYYY');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
            Note: Please complete in Block letters and sign in the appropriate space.
          </Text>

          <CustomDate date={formatedDateTwo} />

          <View style={styles.secondRow}>
            <Text style={styles.secondLabel}>Branch:</Text>
            <Text style={styles?.inputLine}> {formdetails?.cibrBranch?.value}</Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              gap: 4,
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
              CORPORATE DETAILS
            </Text>
            <View style={{ flexDirection: 'row', gap: 5, width: '100%' }}>
              <View style={{ flexDirection: 'column', width: '55%', gap: 10, padding: 5 }}>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>CIF Number:</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrCifNumber}</Text>
                </View>

                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Name of Corporate: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrCorporateName}</Text>
                </View>

                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Email ID: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrCorporateEmailId}</Text>
                </View>
                {/* <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Address: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmAddress}</Text>
                </View> */}
              </View>

              <View style={{ flexDirection: 'column', width: '45%', gap: 10, padding: 5 }}>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Office Telephone/GSM NO.(s):</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrOfficeTelephone}</Text>
                </View>

                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>CR No: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrCRNumber}</Text>
                </View>

                {/* <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Master User Name:</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmMasterUsername}</Text>
                </View> */}
                {/* <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Job Title: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmJobTitle}</Text>
                </View> */}
                <View style={{ flexDirection: 'row' }}>
                  {/* <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 115,
                        marginRight: 5,
                        marginLeft: 23,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ fontSize: 6, color: 'gray', marginLeft: 1, marginRight: 2 }}>DD</Text>
                      <Text style={{ fontSize: 6, color: 'gray', marginRight: 15, marginLeft: 3 }}>MM</Text>
                      <Text style={{ fontSize: 6, color: 'gray', marginRight: 7 }}>YYYY</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <Text style={{ color: '#6E2B8C' }}>Date:</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {formatedDate?.split('')?.map((item: any, index: number) => {
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
                              <Text style={{ fontSize: 7, padding: '0px' }}>{item}</Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View> */}
                  <View style={{ flexDirection: 'row', gap: 2, width: '100%' }}>
                    <Text style={{ color: '#6E2B8C' }}>Date:</Text>
                    <Text style={styles.inputLine}>{formatedDate || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', marginTop: 3 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',

                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  backgroundColor: '#6E2B8C',
                  color: 'white',
                }}
              >
                <View style={{ paddingTop: 3, paddingLeft: '5px', justifyContent: 'center' }}>
                  <Text style={{ color: 'white' }}>CORPORATE USERS DETAILS</Text>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View style={{ padding: 2, flexDirection: 'row' }}>
                  <Text style={styles.secondLabel}>First Name: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrFirstName || 'N/A'}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View style={{ padding: 2, flexDirection: 'row', gap: 2 }}>
                  <Text style={styles.secondLabel}>Middle Name:</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrMiddleName || 'N/A'}</Text>
                </View>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  borderRight: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Last Name:</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibrLastName || 'N/A'}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  // borderLeft: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View style={{ flexDirection: 'row', gap: 2 }}>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>Mobile Number:</Text>
                    <Text style={styles.inputLine}>{formdetails?.cibrMobileNumber || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  padding: 4,
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>Office Number:</Text>
                    <Text style={styles.inputLine}>{formdetails?.cibrOfficeNumber || 'N/A'}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View>
                  <View style={{ flexDirection: 'column', gap: 5 }}>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.secondLabel}>Email ID:</Text>

                      <Text style={styles.inputLine}>{formdetails?.cibrCorporateEmailId || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 3,
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}> Job Title: </Text>
                    <Text style={styles?.inputLine}>{formdetails?.cibrJobTitle || 'N/A'}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  padding: 4,

                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                }}
              >
                <View>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={styles.secondLabel}>Resident ID / Civil ID:</Text>
                    <Text style={styles.inputLine}>{formdetails?.cibrResidentId || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',

                  padding: 4,

                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>Address:</Text>
                    <Text style={styles.inputLine}>{formdetails?.cibrUserAddress || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 4,

                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.secondLabel}>
                      Master user name will be allotted to you subject to its availability
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 4,

                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>1st Choice: </Text>
                    <Text style={styles.inputLine}> {formdetails?.cibrFirstChoice || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 4,

                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>2nd Choice: </Text>
                    <Text style={styles.inputLine}> {formdetails?.cibrSecondChoice || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 4,
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>3rd Choice: </Text>
                    <Text style={styles.inputLine}> {formdetails?.cibrThirdChoice || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', marginTop: 3 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  backgroundColor: '#6E2B8C',
                  color: 'white',
                }}
              >
                <View style={{ paddingTop: 3, paddingLeft: '5px', justifyContent: 'center' }}>
                  <Text style={{ color: 'white' }}>ACCESS RIGHTS \ MENU OPTIONS (TICK ON THE APPROPRIATE OPTIONS)</Text>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  // height: '20px',
                  // borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View>
                  {/* <View style={styles.secondRow}>
                    <View style={styles.checkboxRow}>
                      {formdetails?.cibrOption1 ? (
                        <View style={styles.checkbox}>
                          <Text style={{ fontSize: 8 }}>v</Text>
                        </View>
                      ) : (
                        <View style={styles.smallCheckbox}></View>
                      )}

                      <Text style={styles.label}>View all account information</Text>
                    </View>
                  </View> */}
                  <CheckBoxComp
                    label="View all account information"
                    val={formdetails?.cibrAccessRightOptions?.cibrAccessViewAccountInfo}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View>
                  {/* <View style={styles.secondRow}>
                    <View style={styles.checkboxRow}>
                      {formdetails?.cibrOption2 ? (
                        <View style={styles.checkbox}>
                          <Text style={{ fontSize: 8 }}>v</Text>
                        </View>
                      ) : (
                        <View style={styles.smallCheckbox}></View>
                      )}

                      <Text style={styles.label}>User management and limit set-up</Text>
                    </View>
                  </View> */}
                  <CheckBoxComp
                    label="User management and limit set-up"
                    val={formdetails?.cibrAccessRightOptions?.cibrAccessUserManagementLimit}
                  />
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  // height: '20px',
                  borderBottom: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View>
                  {/* <View style={styles.secondRow}>
                    <View style={styles.checkboxRow}>
                      {formdetails?.cibrOption3 ? (
                        <View style={styles.checkbox}>
                          <Text style={{ fontSize: 8 }}>v</Text>
                        </View>
                      ) : (
                        <View style={styles.smallCheckbox}></View>
                      )}

                      <Text style={styles.label}>Fund Transfer Maker approval</Text>
                    </View>
                  </View> */}
                  <CheckBoxComp
                    label="Fund Transfer Maker Approval"
                    val={formdetails?.cibrAccessRightOptions?.cibrAccessFundTransferApproval}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                {/* <View style={styles.secondRow}>
                  <View style={styles.checkboxRow}>
                    {formdetails?.cibrOption4 ? (
                      <View style={styles.checkbox}>
                        <Text style={{ fontSize: 8 }}>v</Text>
                      </View>
                    ) : (
                      <View style={styles.smallCheckbox}></View>
                    )}

                    <Text style={styles.label}>Fund Transfer Checker approva</Text>
                  </View>
                </View> */}
                <CheckBoxComp
                  label="Fund Transfer Checker approva"
                  val={formdetails?.cibrAccessRightOptions?.cibrAccessFundTransferApproval}
                />
              </View>
            </View>
          </View>

          {/* <View style={{ flexDirection: 'column', marginTop: 3 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  backgroundColor: '#6E2B8C',
                  color: 'white',
                }}
              >
                <View style={{ paddingTop: 3, paddingLeft: '5px', justifyContent: 'center' }}>
                  <Text style={{ color: 'white' }}>CORPORATE TRANSACTION LIMITS </Text>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}></View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  borderRight: '1px solid #6E2B8C',
                  // height: '20px',
                  borderBottom: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 8,
                  gap: 10,
                }}
              >
                <Text style={styles.secondLabel}>
                  The daily transaction limits for transactions initiated from internet banking.
                </Text>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Total Daily Limit: </Text>
                  <Text style={styles.input}></Text>
                  <Text style={styles.secondLabel}> (for all accounts and all users)</Text>
                </View>

                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Limit per Transaction:</Text>
                  <Text style={styles.input}></Text>
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>No. of Approval per Transaction: </Text>
                  <Text style={styles.input}></Text>
                  <Text style={styles.secondLabel}>(maximum 3 approvals)</Text>
                </View>
              </View>
            </View>
          </View> */}
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', gap: '5px' }}>
          <Text style={styles.label}>Note:</Text>
          <Text style={styles.secondLabel}>1) All Limits will be in account currency</Text>
          <Text style={styles.secondLabel}>
            2) In Case if the limits are not specified, default daily limit of 50,000 (Account currency) would be set.
          </Text>
          <Text style={styles.secondLabel}>
            3) In Case if limit per transaction is not specified, default limit of 1000 (Account currency) would be set.
          </Text>
          <Text style={styles.secondLabel}>4) The limits requested can be changed by Admin user at any time.</Text>
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
            Declaration
          </Text>
          <Text style={{ fontSize: 8, color: '#6E2585' }}>
            We confirm that the information given above is true and complete. We hereby confirm and undertake that we
            have read and understood the Terms and Conditions for usage of Corporate Internet Banking Services provided
            by Bank Nizwa. We agree that we will adhere to all the terms and conditions for opening/ applying/ availing/
            maintaining/ operating (as applicable) and usage of Internet Banking, as may be in force From time to time.
            We agree and understand that the bank may, in its absolute discretion, discontinue any of the services
            completely or partially without providing any reasons.
          </Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View
            style={{
              height: 'auto',
              fontSize: '10px',
              borderTop: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              borderBottom: '1px solid #6E2585',
              width: '50%',
              paddingTop: 10,
              paddingLeft: 4,
            }}
          >
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Name:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '85%' }}></Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Name:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '85%' }}></Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Name:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '85%' }}></Text>
              </View>
              <Text style={styles.secondLabel}>Company Seal / Stamp</Text>
            </View>
          </View>

          <View
            style={{
              height: '100px',
              fontSize: '10px',
              borderTop: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              borderRight: '1px solid #6E2585',
              borderBottom: '1px solid #6E2585',
              width: '50%',
              paddingTop: 10,
              paddingLeft: 4,
            }}
          >
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Signature:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '80%' }}></Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Signature:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '80%' }}></Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Signature:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '80%' }}></Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                height: 'auto',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderLeft: '1px solid #6E2B8C',
                backgroundColor: '#6E2B8C',
                color: 'white',
                alignItems: 'center',
              }}
            >
              <View style={{ paddingTop: 3, paddingLeft: 2, justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>FOR BANK USE ONLY</Text>
              </View>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FFFACD' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                height: 'auto',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderLeft: '1px solid #6E2B8C',
              }}
            >
              <View style={{ paddingTop: 2, paddingLeft: 2 }}>
                <Text style={styles.label}>For Relationship Manager Use Only</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
              }}
            >
              <View style={{ paddingTop: 2, paddingLeft: 2 }}>
                <Text style={styles.label}>For Operational Use Only</Text>
              </View>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FFFACD' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                height: 'auto',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderLeft: '1px solid #6E2B8C',
                borderBottom: '1px solid #6E2B8C',
                padding: 8,
              }}
            >
              <View>
                <View style={{ flexDirection: 'row' }}>
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
                        {date?.map((items: any, index: number) => {
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
                              <Text style={{ fontSize: 7, padding: '0px' }}> </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                height: 'auto',
                width: '50%',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderBottom: '1px solid #6E2B8C',
                padding: 5,
              }}
            >
              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text style={styles.secondLabel}>Date of receipt at operations: </Text>
                <View style={{ flexDirection: 'row' }}>
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
                        {date?.map((items: any, index: number) => {
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
                              <Text style={{ fontSize: 7, padding: '0px' }}> </Text>
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

          <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FFFACD' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                height: 'auto',
                borderRight: '1px solid #6E2B8C',
                // borderTop: '1px solid #6E2B8C',
                borderLeft: '1px solid #6E2B8C',
                padding: 5,
              }}
            >
              <View style={{ paddingTop: 2, paddingLeft: 2, flexDirection: 'row', gap: 4 }}>
                <Text style={styles.secondLabel}>RM Name:</Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                borderRight: '1px solid #6E2B8C',
                // borderTop: '1px solid #6E2B8C',
                padding: 5,
              }}
            >
              <View style={{ paddingTop: 2, paddingLeft: 2, flexDirection: 'row', gap: 4 }}>
                <Text style={styles.secondLabel}>Deliverables Created by:</Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
              </View>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FFFACD' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                height: 'auto',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderLeft: '1px solid #6E2B8C',
                padding: 5,
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
                <Text style={styles.secondLabel}>Signature of Corporate verified:</Text>
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
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                padding: 5,
              }}
            >
              <View style={{ paddingTop: 2, paddingLeft: 2, flexDirection: 'row', gap: 4 }}>
                <Text style={styles.secondLabel}>Authorized by:</Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
              </View>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FFFACD' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                height: 'auto',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderLeft: '1px solid #6E2B8C',
                padding: 5,
              }}
            >
              <View style={{ paddingTop: 2, paddingLeft: 2, flexDirection: 'row', gap: 4 }}>
                <Text style={styles.secondLabel}>Signature of RM:</Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                padding: 5,
              }}
            >
              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text style={styles.secondLabel}>Date of Dispatch of Deliverables: </Text>
                <View style={{ flexDirection: 'row' }}>
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
                        {date?.map((items: any, index: number) => {
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
                              <Text style={{ fontSize: 7, padding: '0px' }}></Text>
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

          <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FFFACD' }}>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                height: 'auto',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderBottom: '1px solid #6E2B8C',

                borderLeft: '1px solid #6E2B8C',
                padding: 5,
              }}
            >
              <View style={{ flexDirection: 'column', gap: 5 }}>
                {/* <Text style={styles.secondLabel}>Date of Dispatch of Deliverables: </Text> */}
                <View style={{ flexDirection: 'row' }}>
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
                        {date?.map((items: any, index: number) => {
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
                              <Text style={{ fontSize: 7, padding: '0px' }}> </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '50%',
                borderRight: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
                borderBottom: '1px solid #6E2B8C',
                padding: 5,
              }}
            ></View>
          </View>
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}
