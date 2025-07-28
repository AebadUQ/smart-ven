'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CustomDate } from './custom-date';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { InputComp } from './input-component';
import { CheckBoxComp } from './checkbox-component';

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
    // gap: 5,
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
    // marginTop: 4,
    // marginRight: 5,
    color: '#6E2B8C',
    fontSize: 9,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    flexGrow:1
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

export function SignatureRequestFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
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
              <View style={{ flexDirection: 'column', gap: '5px' }}>
                <CustomDate date={formatedDate} />

                <View style={{ flexDirection: 'column', gap: '1px' }}>
                  <Text style={styles.label}>The Manager</Text>
                  <Text style={styles.label}>Smart Ven</Text>
                  <View style={styles.secondRow}>
                    <Text style={styles.label}>Branch:</Text>
                    <Text style={styles.inputLine}> {formdetails?.scrBranch?.value} </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 4, marginTop: 15 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 9 }}>
              I/We wish to change my/our signature in your record for the following account No.:
            </Text>

            {formdetails?.scrAccountNoandAccountName?.map((items: any, index: number) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 5, gap:10,width:"100%"}}>
                <View style={{ flexDirection: 'row', gap: 5,width:"50%"}}>
                  <Text style={{ paddingTop: 5, color: '#6E2B8C' }}>{index + 1}.</Text>

                  <AccountBoxes data={items?.scrAccountNo?.split('')} />
                </View>

                <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', width: '50%' }}>
                  <InputComp inputOne="Account Name:" outputOne={items?.scrAccountName}/>


                </View>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'column', gap: 5, marginTop:2 }}>
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
              Nature Of Account
            </Text>
            <View style={styles.secondRow}>
            <CheckBoxComp label={formdetails?.scrNatureofAccount?.value} val={formdetails?.scrNatureofAccount?.value} />

            </View>
            <View style={{ flexDirection: 'column', gap: '5px' }}>
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
                SPECIMEN SIGNATURE
              </Text>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View
                  style={{
                    height: '100px',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                  }}
                >
                  <Text style={{ color: '#6E2585' }}> Existing Signature</Text>
                </View>

                <View
                  style={{
                    height: '100px',
                    borderRight: '1px solid #6E2585',
                    fontSize: '10px',
                    color: '#6E2585',
                    borderTop: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                  }}
                >
                  <Text>New Signature</Text>
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
                Declaration
              </Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>I/We indemnify the following:</Text>
              <View style={styles.secondRow}>
                <Text style={{ fontSize: 8, color: '#6E2585' }}>1.</Text>
                <Text style={{ fontSize: 8, color: '#6E2585' }}>
                  I/We fully authorise the bank and its officials to change the above signatures in the bank records at
                  my/our risk and responsibilities.
                </Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={{ fontSize: 8, color: '#6E2585' }}>2.</Text>
                <Text style={{ fontSize: 8, color: '#6E2585' }}>
                  I/We will compensate the bank or its staff in case the bank or its staff suffers any loss due to
                  change in my/our signature(s).{' '}
                </Text>
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
                CUSTOMER DETAILS
              </Text>
              <View style={{flexDirection:'column',gap:10}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', width:'100%' }}>
                <View style={{flexDirection:'row',alignItems:'center', width:"50%"}}>
                  <InputComp inputOne="Customer Name(s): (1)" outputOne={formdetails?.scrCustomerOne || "N/A"} />
                </View>
                <View style={{flexDirection:'row',alignItems:'center', width:"50%"}}>

                  <InputComp inputOne="(2)" outputOne={formdetails?.scrCustomerTwo || "N/A"} />
                </View>
              </View>
              <View style={styles.secondRow}>
              <InputComp inputOne="Mobile Number" outputOne={formdetails?.scrCustomerMobileNo} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <View style={styles.secondRow}>
                  <Text style={{...styles.textFont,color:'#6E2B8C'}}>Customer New Signature(s):(1) </Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '188px' }}></Text>
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>(2)</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '225px' }}></Text>
                </View>
                </View>
                </View>
            </View>


{formdetails?.scrAccountNoandAccountName?.length < 2 &&
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
            </View>}

            {/* <View
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
                        flexDirection: 'column',
                        gap: 10,
                        padding: 10,
                      }}
                    >
                      <Text style={styles.secondLabel}>Processed by:</Text>
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
                      <Text style={styles.secondLabel}>Approved by:</Text>
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
            </View> */}
          </View>
        </View>
        <PdfFooter />
      </Page>
      {formdetails?.scrAccountNoandAccountName?.length >= 2 && <Page size="A4" style={styles.page}>
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
        <PdfFooter/>
      </Page>}

    </Document>
  );
}
