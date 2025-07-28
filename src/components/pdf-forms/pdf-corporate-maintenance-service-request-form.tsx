'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
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
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',

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
    fontSize: 8,
    fontWeight: 'bold',
    color: '#6E2B8C',
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    fontSize: 8,
    flexGrow: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
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
    gap: 8,
    // justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function CorporateInternetBankingServiceRequestPdfForm({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const date = Array.from({ length: 9 }).toString();
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
            Note: Please complete in Block letters and sign in the appropriate space.
          </Text>
          <CustomDate date={formatedDate} />

          <View style={styles.secondRow}>
            <Text style={styles.secondLabel}>Branch:</Text>
            <Text style={styles?.inputLine}> {formdetails?.cibmBranch?.value || 'N/A'}</Text>
          </View>

          {/* <View style={styles.secondRow}>
            <Text style={styles.secondLabel}>CIF:</Text>
            <Text style={styles?.inputLine}>{formdetails?.cibmCifNumber || 'N/A'} </Text>
          </View> */}
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
              CORPORATE DETAILS
            </Text>
            <View style={{ flexDirection: 'row', gap: 5, width: '100%' }}>
              <View style={{ flexDirection: 'column', width: '50%', gap: 10, padding: 5 }}>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Phone Number:</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmOfficePhone || 'N/A'}</Text>
                </View>

                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Name of Corporate: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmCorporateName || 'N/A'}</Text>
                </View>

                                <InputComp n={60} inputEight="Email ID:" outputEight={formdetails?.cibmCorporateEmailId || 'N/A'} n={60}/>


                {/* <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Email ID: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmCorporateEmailId || 'N/A'}</Text>
                </View> */}
                {/* <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Address: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmAddress || 'N/A'}</Text>
                </View> */}
                <InputComp n={50} inputEight="Address:" outputEight={formdetails?.cibmAddress || 'N/A'}/>
              </View>

              <View style={{ flexDirection: 'column', width: '50%', gap: 10, padding: 5 }}>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Office Telephone/GSM NO.(s):</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmOfficeTelephone || 'N/A'}</Text>
                </View>

                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>CR No: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmCRNumber || 'N/A'}</Text>
                </View>

                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Master User Name:</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmMasterUsername || 'N/A'}</Text>
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Job Title: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmJobTitle || 'N/A'}</Text>
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
                <View style={{ paddingTop: 3, paddingLeft: 2, justifyContent: 'center' }}>
                  <Text style={{ color: 'white' }}>SERVICE REQUEST</Text>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding:5
                }}
              >
                <View style={{ padding: 2, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.secondLabel}>User Title: </Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmUserTitle || 'N/A'}</Text>
                </View>
              </View>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  borderLeft: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  padding:5
                }}
              >
                <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                  <Text style={styles.secondLabel}>CompanyID:</Text>
                  <Text style={styles.inputLine}>{formdetails?.cibmCompanyId}</Text>
                </View>
              </View>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >

                <View style={{ flexDirection: 'column', padding: 2, gap: 2 }}>
                  <CheckBoxComp label="Mobile Number Change" val={formdetails?.cibmMobileNumberchange} />
                  <View style={{ flexDirection: 'row', marginLeft: '25px', alignItems: 'center' }}>
                    <InputComp inputOne="New Mobile Number" outputOne={formdetails?.cibmServiceMobileNumberchange || "N/A"} />
                  </View>
                </View>
              </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View style={{ flexDirection: 'column', padding: 2, gap: 2 }}>
                  <CheckBoxComp label="Change in Email" val={formdetails?.cibmChangeinEmail} />
                  <View style={{ flexDirection: 'row', marginLeft: '25px', alignItems: 'center' }}>
                    <InputComp inputEight="New Email ID" outputEight={formdetails?.cibmServiceChangeinEmail  || "N/A"} n={120} />
                  </View>
                </View>
              </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View style={{ flexDirection: 'column', padding: 2, gap: 2 }}>
                  <CheckBoxComp label="Change in Job Title" val={formdetails?.cibmChangeinJobTitle} />
                  <View style={{ flexDirection: 'row', marginLeft: '25px', alignItems: 'center' }}>
                    <InputComp inputOne="New Job Title" outputOne={formdetails?.cibmServiceChangeinJobTitle || "N/A"} />
                  </View>
                </View>
              </View>

            </View>

            {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >
                <View style={{ paddingTop: 2, paddingLeft: 2 }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}></View>
                      <Text style={styles.secondLabel}> Enable </Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}></View>
                      <Text style={styles.secondLabel}> Disable </Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}></View>
                      <Text style={styles.secondLabel}> Unlock </Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}></View>
                      <Text style={styles.secondLabel}> Disconnect </Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}></View>
                      <Text style={styles.secondLabel}> Sms Password </Text>
                    </View>

                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}></View>
                      <Text style={styles.secondLabel}> Email Password </Text>
                    </View>
                  </View>
                </View>
              </View>

            </View> */}

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                }}
              >

                <View style={{ flexDirection: 'column', padding: 2, gap: 4 }}>
                  <Text style={styles.secondLabel}>Change in Roles</Text>
                  <View style={{ flexDirection: 'column', marginLeft: '25px',gap:4 }}>
                    <CheckBoxComp label="User Management" val={formdetails?.cibmChangeInRole?.cibmUserManagement} />
                    <CheckBoxComp label="View accounts" val={formdetails?.cibmChangeInRole?.cibmViewAccounts} />
                    <CheckBoxComp label="Fund Transfer Maker" val={formdetails?.cibmChangeInRole?.cibmFundTransferMaker} />
                    <CheckBoxComp label="Fund Transfer Checker" val={formdetails?.cibmChangeInRole?.cibmFundTransferChecker} />

                  </View>
                </View>
              </View>

            </View>
          </View>

          <View style={{ flexDirection: 'column',gap:1 }}>
            <Text style={styles.label}>Note:</Text>
            <Text style={styles.secondLabel}>1) All Limits will be in account currency</Text>
            <Text style={styles.secondLabel}>
              2) In Case if the limits are not specified, default daily limit of 50,000 (Account currency) would be set.
            </Text>
            <Text style={styles.secondLabel}>
              3) In Case if limit per transaction is not specified, default limit of 1000 (Account currency) would be
              set.
            </Text>
            <Text style={styles.secondLabel}>4) The limits requested can be changed by Admin user at any time.</Text>
          </View></View><PdfFooter/>
          </Page><Page size="A4" style={styles.page}>

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
              have read and understood the Terms and Conditions for usage of Corporate Internet Banking Services
              provided by Smart Ven. We agree that we will adhere to all the terms and conditions for opening/
              applying/ availing/ maintaining/ operating (as applicable) and usage of Internet Banking, as may be in
              force From time to time. We agree and understand that the bank may, in its absolute discretion,
              discontinue any of the services completely or partially without providing any reasons.
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

          <View style={{ flexDirection: 'column', marginTop: 3 }}>
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
                          {date?.split('')?.map((items: any, index: number) => {
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
                          {date?.split('')?.map((items: any, index: number) => {
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
                          {date?.split('')?.map((items: any, index: number) => {
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
                          {date?.split('')?.map((items: any, index: number) => {
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
