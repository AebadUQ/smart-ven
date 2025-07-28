'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

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
    fontSize: 8,
    marginTop: 5,
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
  secondLabel: {
    fontWeight: 'bold',
    // marginTop: 4,
    // marginRight: 5,
    color: '#6E2B8C',
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    flexGrow: 1,

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
    gap: 5,
    justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function MandateIndividualForm({ data }: InvoicePDFDocumentProps): React.JSX.Element {
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
              <View style={{ flexDirection: 'column', gap: '2px' }}>
                <Text style={{ color: '#6E2B8C' }}>The Manager</Text>
                <Text style={{ color: '#6E2B8C' }}>Bank Nizwa</Text>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.secondLabel}>Branch:</Text>
                <Text style={styles.inputLine}>{formdetails?.mbiBranch?.value}</Text>
              </View>

              <Text style={styles.label}>Dear Sir/Madam,</Text>
            </View>

            <CustomDate date={formatedDate} />
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Text style={styles.label}>RE: ACCOUNT NO. </Text>
              {formdetails?.mbiAccountNumber?.split('')?.map((item: any, ind: any) => {
                const extraMargin = ind === 2 || ind === 10 ? 10 : '2px';
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
          </View>

          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>Account Name:</Text>
              <Text style={styles.inputLine}>{formdetails?.mbiAccountName}</Text>
            </View>
            <Text style={{ color: '#6E2B8C' }}>
              I request until you receive written instructions from me to the contrary, or in the event of my death, or
              until you shall receive written notice thereof, and not withstanding that I maybe in the meantime
              personally exercising any of the powers in question, you will treat.
            </Text>
            <View style={styles.secondRow}>

              <Text style={styles.secondLabel}>
  {[506, 507].includes(formdetails?.mbiAccountTitle?.id)
    ? 'Mrs'
    : 'Mr'}
</Text>

              <Text style={styles.inputLine}>{formdetails?.mbiAuthoriserName}</Text>
            </View>
            <Text style={{ color: '#6E2B8C' }}>
              as fully authorised for me and my accounts to execute the following:
            </Text>
            <Text style={{ color: '#6E2B8C' }}>
              1. To operate on any account of mine with you and to draw, sign, accept and endorse cheques, bills and
              promissory notes
            </Text>
            <View style={styles.secondRow}>
              <Text style={{ color: '#6E2B8C' }}>2.</Text>
              <Text style={{ color: '#6E2B8C' }}>
                To give, vary and revoke instructions to you regarding remittances, including telegraphic transfers, and
                as to the manner in which any money payable by or to me (whether periodically or otherwise) are to be
                paid or dealt with.{' '}
              </Text>
            </View>

            <View style={styles.secondRow}>
              <Text style={{ color: '#6E2B8C' }}>3.</Text>
              <Text style={{ color: '#6E2B8C' }}>
                To deposit with you and withdraw, and to give, vary and revoke instructions to you as the custody or
                disposal of property of all kinds, including (without prejudice to the general of the foregoing)
                certificates relating to stocks, shares and other securities, documents of title of all kinds and boxes
                (including sealed boxes).
              </Text>
            </View>
            <View style={styles.secondRow}>
              <View style={styles.secondRow}>
                <Text style={{ color: '#6E2B8C' }}>4</Text>
                <Text style={styles.secondLabel}>
                  Taking delivery of documents, invoices and/or bills of lading covering goods consigned to
                </Text>
              </View>
              {formdetails?.mbiDeliveryOfDocument?.length < 24 ? (
                <Text style={{ ...styles.inputLine, wrap: true }}>{formdetails?.mbiDeliveryOfDocument || 'N/A'}</Text>
              ) : null}
            </View>
            {formdetails?.mbiDeliveryOfDocument?.length >= 24 ? (
              <Text style={{ ...styles.inputLine, wrap: true }}>{formdetails?.mbiDeliveryOfDocument || 'N/A'}</Text>
            ) : null}

            <Text style={{ color: '#6E2B8C' }}>
              for all which this request shall be full and sufficient authority to you, and I confirm that you are to be
              under no obligation to ascertain or enquire into the purpose for which any of the said powers exercised,
              and I hereby indemnify the Bank and hold it harmless against any losses, claims, costs, liabilities which
              might rise out of this authorisation.
            </Text>
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <InputComp inputOne={
   [506, 507].includes(formdetails?.mbiauthorizationConfirmatioTitle?.id)
    ? 'Ms'
    : 'Mr.'} outputOne={formdetails?.mbiauthorizationConfirmationName || 'N/A'} />
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                  <InputComp inputOne="Third Party Signature:" outputOne={' '} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                  <InputComp inputOne="ID No.:" outputOne={formdetails?.mbiauthorizationConfirmationIDNo || 'N/A'} />
                </View>
              </View>
              <View style={styles.secondRow}>
                <InputComp inputOne="Customer Signature:" outputOne={' '} />
              </View>
              <View style={styles.secondRow}>
                <InputComp
                  inputOne="Dated this"
                  outputOne={dayjs(formdetails?.mbiauthorizationConfirmationDate).format('DD-MM-YYYY')}
                />
              </View>
            </View>
          </View>
        </View>
        <PdfFooter />

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
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}
