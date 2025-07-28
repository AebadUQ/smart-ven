'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

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
    flexGrow: 1,
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
    gap: 8,
    justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function AuthorityImdemnityForEmailTransactionPdfForm({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(formdetails?.mbiauthorizationConfirmationDate).format('DDMMYYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <CustomDate date={formatedDate} />

          {/* <View style={styles.row}> */}
          <View style={styles.column}>
            <View style={{ flexDirection: 'column', gap: '2px' }}>
              <Text style={styles.secondLabel}>Bank Nizwa</Text>
              <Text style={styles.secondLabel}>P.O. Box: 1423, PC 133</Text>
              <Text style={styles.secondLabel}>Muscat, Oman</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 2 }}>
            <View style={{ marginBottom: 3 }}>
              <Text style={styles.label}>Whereas</Text>
            </View>

            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>A)</Text>
              <Text style={styles.secondLabel}>
                I/We hereby represent, declare, and understand that the nature of my/our work requires me/us to give
                instructions to banks by the quickest and most expedient means of communication, which is transmission
                by email
              </Text>
            </View>

            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>B)</Text>
              <Text style={styles.secondLabel}>
                I/We hereby represent that if I/we adopt/ employ any other means of transmission other than by email to
                communicate my/our instructions to the Bank, there will be a delay in my/our banking transactions and
                I/we will consequently suffer loss of opportunity and/or profits.
              </Text>
            </View>

            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>C)</Text>
              <Text style={styles.secondLabel}>
                I/We hereby expressly acknowledge that I/we are fully aware and cognizant of the various risks (e.g.
                technical forgery, programming of bogus email domains /email id’s) inherent and associated with
                communicating instructions to banks by email transmission and various fraudulent activities arising from
                and out of such transmissions and are fully prepared to accept such risks and that it is not in the
                interest of banks to assume such risks which have far-reaching consequences.
              </Text>
            </View>
            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>D)</Text>
              <Text style={styles.secondLabel}>
                I / we undertake to inform the bank immediately in writing about any changes of the authorized
                signatories / officials.
              </Text>
            </View>

            <Text style={{...styles.secondLabel,fontFamily:'Times-Bold',fontSize:10}}>
              In consideration of your acceding to my/our request and me/us agreeing to accept and act upon instructions
              by email as above, I/we hereby confirm, agree and undertake the following:
            </Text>
            <View></View>
            <View style={styles.secondRow}>
              <View style={styles.secondRow}>
                <Text style={{ color: '#6E2B8C', fontSize: 8 }}>1.</Text>
                <Text style={styles.secondLabel}>
                  While it is not mandatory for me/us to send the original instruction to the Bank, should I/we choose
                  to forward the original to you, it will be boldly marked with the following:
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
              <View style={{...styles.secondRow, marginLeft:12,width:"100%"}}>
                <Text style={styles.secondLabel}>Emailed on</Text>
                <Text style={styles.inputLine}>{formdetails?.indemnityEmailedOn}</Text>
                <Text style={styles.secondLabel}>Avoids Duplication</Text>
              </View>
              {/* <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Avoids Duplication</Text>
              </View> */}
            </View>

            <View style={{ flexDirection: 'column',  gap: 1,width:'100%' }}>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text style={styles.secondLabel}>
                  2. If for any reason or other, you acted on instructions sent through our
                </Text>
                <Text style={styles.inputLine}>
                  {formdetails?.indemnityEmailedOn2}
                </Text>
              </View>
              <View style={{...styles.secondRow,flexDirection:'row', gap: 5, paddingLeft:5}}>
                <Text style={styles.secondLabel}>or</Text>
                <Text style={styles.inputLine}>
                  {formdetails?.indemnityEmailedDomain}
                </Text>
              </View>
            </View>

            <View style={styles.secondRow}>
              <View style={styles.secondRow}>
                <Text style={{ color: '#6E2B8C', fontSize: 8 }}>3.</Text>
                <Text style={styles.secondLabel}>
                  Acting by you on what may be photocopies emanating from the emails is fully binding on me/us even if
                  you do not receive the original of the email authorization/ instructions.
                </Text>
              </View>
            </View>

            <View style={styles.secondRow}>
              <View style={styles.secondRow}>
                <Text style={{ color: '#6E2B8C' , fontSize: 8}}>4.</Text>
                <Text style={styles.secondLabel}>
                  You will not be held liable for any irregularity, delay, mistake or omission which may occur in the
                  transmission of email instructions, or for the non-receipt of, or misinterpretation of the email
                  instructions.
                </Text>
              </View>
            </View>

            <View style={styles.secondRow}>
              <View style={styles.secondRow}>
                <Text style={{ color: '#6E2B8C', fontSize: 8 }}>5.</Text>
                <Text style={styles.secondLabel}>
                  You are hereby irrevocably authorized to rely on email instructions as genuine, true and accurate
                  reproduction of the original instructions and you shall bear no liability for acting thereupon and you
                  are entitled to treat each email authorization/ instructions as fully authorized and binding on me/us
                  and you are entitled (but not bound) to take such steps in connection with or in reliance upon such
                  communication as you may in your sole and absolute discretion, deem appropriate.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.secondRow}>
                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <View style={styles.secondRow}>
                    <Text style={{ color: '#6E2B8C', fontSize: 8 }}>6.</Text>
                    <Text style={styles.secondLabel}>
                      This email Indemnity covers all the existing accounts (Current Account, Mudaraba Investment
                      Account etc.), with Bank Nizwa of
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.inputLine}>{formdetails?.indemnityWithBankNizwa}</Text>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#6E2B8C' }}>
                      (Name of Person/Company) that are held in his/its name. It also covers any future accounts that
                      may be opened by my/our name with Bank Nizwa
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.secondRow}>
              <View style={styles.secondRow}>
                <Text style={{ color: '#6E2B8C' , fontSize: 8}}>7.</Text>
                <Text style={styles.secondLabel}>
                  I/We acknowledge and understand that the Bank might refuse or refrain from acting upon certain Email
                  instructions, if the Bank, acting reasonably, suspects any discrepancies in the Email instructions, or
                  if the signatures do not tally with the approved signatures in the Bank records.
                </Text>
              </View>
            </View>

            <View style={styles.secondRow}>
              <View style={styles.secondRow}>
                <Text style={{ color: '#6E2B8C', fontSize: 8 }}>8.</Text>
                <Text style={styles.secondLabel}>
                  . In all cases, I/we undertake to indemnify & keep the Bank indemnified at all times and to hold the
                  Bank harmless from any and all actions, proceedings, claims, losses, damages, costs and expenses which
                  may be brought against the Bank suffered or incurred by the Bank and which shall have either directly
                  or indirectly come out of or in connection with the Bank acting upon the Email instructions.
                </Text>
              </View>
            </View>
          </View>
          </View>
          <PdfFooter />
          </Page>
      <Page size="A4" style={styles.page}>

            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'column', marginTop: 2 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '20px',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                      borderLeft: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ paddingTop: 2, paddingLeft: 2 }}>
                      <Text style={{ color: '#6E2B8C',fontSize:8 }}>CIF</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '80%',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ paddingTop: 2, paddingLeft: 2 }}>
                      <Text>{formdetails.indemnityCifNumber}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '20px',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                      borderLeft: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ paddingTop: 2, paddingLeft: 2 }}>
                      <Text style={{ color: '#6E2B8C',fontSize:8 }}>Customer Name</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '80%',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                    }}
                  >
                    <View>{/* <Text>Hello</Text> */}</View>
                  </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '20%',
                      height: '25px',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                      borderLeft: '1px solid #6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      paddingTop: 2,
                      paddingLeft: 2,
                    }}
                  >
                    <View>
                      <Text style={{ color: '#6E2B8C',fontSize:8 }}>Signature/ Stamp</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '80%',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      paddingTop: 2,
                      paddingLeft: 2,
                    }}
                  >
                    <View>{/* <Text>Hello</Text> */}</View>
                  </View>
                </View>
              </View>

              {/* ............................................................... */}

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
                      <Text style={{ color: 'white' }}>FOR BANK USE ONLY</Text>
                    </View>
                  </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      height: '20px',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                      borderLeft: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ paddingTop: 2, paddingLeft: 2 }}>
                      <Text style={{ color: '#6E2B8C',fontSize:8 }}>Checked by (Staff Name)</Text>
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
                      <Text style={{ color: '#6E2B8C',fontSize:8 }}>Approved by (Staff Name):</Text>
                    </View>
                  </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      height: '20px',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                      borderLeft: '1px solid #6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      paddingTop: 2,
                      paddingLeft: 2,
                    }}
                  >
                    <View>
                      <Text style={{ color: '#6E2B8C',fontSize:8 }}>Approved by (Staff Name):</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      borderRight: '1px solid #6E2B8C',
                      borderTop: '1px solid #6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      paddingTop: 2,
                      paddingLeft: 2,
                    }}
                  >
                    <View>
                      <Text style={{ color: '#6E2B8C',fontSize:8   }}>Signature</Text>
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
