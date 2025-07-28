'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';



import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfArabicHeader } from './pdf-arabic-forms/pdf-arabic-header';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PDFTermsAndCondition } from './sections/pdf-terms-condition';
import DualLabelField from './ui/dualLabelField';
import { PdfTable } from './pdf-table-component';
import { CheckBoxComp } from './checkbox-component';
import { AccountBoxes } from './account-number-boxes-component';




Font.register({
  family: 'DejaVuSans',
  src: '/fonts/DejaVuSans.ttf',
});
Font.register({
  family: 'DejaVuSans-Bold',
  src: '/fonts/DejaVuSans-Bold.ttf',
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
  tickMark: {
    fontSize: 11,
    fontFamily: 'DejaVuSans-Bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  arabicText: {
    marginTop: 4,
    width: 'auto',
    color: '#6E2B8C',
    fontSize: 9,
    fontFamily: 'Cairo',
    textAlign: 'center',
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
    // justifyContent: 'space-between',
    // width: '70%',
    // alignItems:'center',
    paddingLeft: 5,
    // paddingVertical:1
  },
  thirdRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingLeft: 5,
  },
  fourthRow: {
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
    color: '#6E2B8C',
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
    fontSize: 12,
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
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    fontSize: 10,
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#6E2B8C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // paddingBottom: '2px',
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

export function AccountOpeningCurrentFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');

  const termsConditionData = {
    title: 'Terms and Conditions for Current Account',
    list: [
      {
        title: '',
        description: [
          {
            isClosure: true,
            text: "The credit balance in the Current Account is deposited by the Customer as a loan [Qard] to the Bank, on which no profit or other form of return is payable. The Bank undertakes to pay any credit balance in its favour in the Current Account in full at the request of the Customer, subject to the Customer's compliance with these Conditions, and the General Terms and Conditions of the Bank. The Bank may invest the credit balance in the Current Account in such manner as the Bank, in its absolute discretion deems fit, not contradicting Shari'a Principles. No returns of whatsoever nature (including profit) shall be paid out to the Customer on the Current Account. The opening of the Current Account shall be subject to the minimum balance requirements prescribed by the Central Bank of Oman from time to time, and advised to the Customer, where the Bank shall not charge any fees for the fall below balance of the Account, and may be operated in such denominations approved by the Bank from time to time.",
          },
          {
            isClosure: true,
            text: "Withdrawals from a Current Account shall be made using the Card, withdrawal slips, cheques, standing instructions, pay orders or electronic instructions, through the channels made available by the Bank, including but not limited to point of sale, branches, Internet Banking, ATMs, Mobile Banking, Phone Banking or by such other modes or channels as shall be made available by the Bank from time to time. Deposits in the Current Account shall be accepted in all branches of the Bank in OMAN by cash, transfers, cheques drawn on the Bank's branches or local banks or through the Bank's ATMs, or by any other mode acceptable to the Bank.",
          },
          {
            isClosure: true,
            text: "The Bank shall have the right to refuse to pay any payment orders or cheques written on forms other than the Bank's forms, without any responsibility whatsoever on the part of the Bank.",
          },
          {
            isClosure: true,
            text: 'The Customer shall draw cheques in Arabic or English languages. The Bank shall not accept cheques written in any other language.',
          },
          {
            isClosure: true,
            text: "The Bank shall have the right, without any obligation, to honour the value of cheques or other negotiable instruments, drawn on the Current Account even if this were to cause the Current Account to be overdrawn. The Customer undertakes to pay or repay all the due amounts in the Customer's overdrawn Current Account immediately upon the request of the Bank.",
          },
          {
            isClosure: true,
            text: 'The Bank shall have the right, without taking any liability, to refuse to pay the value of the cheques, drawings and payment orders drawn on the Current Account if the balance is not sufficient, even if the Customer has credit balance in any other Accounts, unless the Customer has prearranged with the Bank in writing to cover the amount of cheques, or any other withdrawals from any of his current or saving accounts with the Bank, subject to any service fee notified by the Bank from time to time.',
          },
          {
            isClosure: true,
            text: 'The Bank may, without taking any liability, accept from the Customer any stop payment of cheque in case it is lost and proof has to be provided from the ROP, or in other circumstance as shall be allowed by law and agreed by the Bank. However, the Customer will bear any loss, damage and cost (including legal cost) due to these incidents.',
          },
          {
            isClosure: true,
            text: 'The Customer shall take due care of the cheque book issued to it by the Bank, and shall bear full responsibility and liability in respect of the issuance and use of any cheques and shall be responsible in all cases arising out of theft of the cheque book or the misuse thereof or of any of the cheques contained therein, including forgery, regardless of whether the aforementioned misuse was committed by any employee(s) of the Customer or by any other person. The Customer shall sustain all the consequences of the default and indemnify and hold the Bank harmless in all respects. The Customer will promptly notify the Bank in writing of the loss or theft of any cheque or payment instrument and will return to the Bank or destroy any unused cheque, payment instruments and related materials when the relevant Account is closed. The Customer shall not give any of the cheque books to any third parties. The Customer shall immediately inform the Bank in writing, upon the loss or theft of a cheque book, in the absence of which otherwise the Customer shall bear all the consequences in cases of its misuse.',
          },
          {
            isClosure: true,
            text: 'The Bank has the right to refuse issuing a cheque book to the Customer, without giving any reason. This shall not prevent the right of withdrawal by other means.',
          },
          {
            isClosure: true,
            text: "The Bank has the right to close the Current Account and to cause the Customer's name to be blacklisted in accordance with the regulations of any applicable credit agency or the CBO or any other regulatory authority in force from time to time.",
          },
          {
            isClosure: true,
            text: 'The total amount of cheques drawn on the Current Account, but not yet presented for payment must not, at any time, exceed the available balances of the Current Account and available for withdrawal. The Bank is not obliged to honour cheques drawn against unrealised or uncleared payments into the Current Account. The Bank will levy a charge for any cheque that is returned unpaid for lack of funds.',
          },
          {
            isClosure: true,
            text: 'Anything not covered under these Conditions, will be governed by the General Terms & Conditions of the Bank, as applicable from time to time.',
          },
          {
            isClosure: false,
            text: 'The Current Account Terms & Conditions (the "Conditions") shall be read and interpreted in conjunction with the General Terms & Conditions of the Bank. Words capitalized but not otherwise defined in these Conditions, shall have the same meaning as defined under the General Terms & Conditions.',
          },
        ],
      },
    ],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
            <View style={styles.row}>
              <Text style={styles.label}>Branch : </Text>
              <Text style={styles.inputLine}>{formdetails?.caoRelDetBranch?.value}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
              Note: Please complete in Block letters and sign in the appropriate space.
            </Text>
          </View>

          <View style={{ flexDirection: 'column', gap: 3 }}>
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
              Relationship Details
            </Text>
            <View style={{ flexDirection: 'column', gap: '1px' }}>
              <View style={{ width: '40%' }}>
                <View style={styles?.thirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>CIF Types: </Text>
                  </View>
                  <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                    <CheckBoxComp label={formdetails?.caoRelDetCIFType?.value} val={formdetails?.caoRelDetCIFType?.value} />

                  </View>
                </View>
              </View>


              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.thirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Account Type:</Text>
                  </View>
                  <View style={{ width: '100px' }}>

                    <CheckBoxComp label={formdetails?.caoRelDetAccountType?.value} val={formdetails?.caoRelDetAccountType?.value} />

                  </View>
                </View>
              </View>

              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.thirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Account Currency:</Text>
                  </View>
                  <View style={{ width: '100px' }}>
                  <CheckBoxComp label={formdetails?.caoRelDetCurrency?.value} val={formdetails?.caoRelDetCurrency?.value} />

                  </View>
                </View>
              </View>
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.thirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Relationship Criteria:</Text>
                  </View>
                  <View style={{ width: '100px' }}>
                  <CheckBoxComp label={formdetails?.caoRelDetRelationshipCriteria?.value} val={formdetails?.caoRelDetRelationshipCriteria?.value} />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column', gap: '3px' }}>
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
                Personal Details
              </Text>
              <View style={[styles.column]}>
                <Text style={styles.secondLabel}>Name(s) of Additional Applicant(s) - as per ID Card</Text>
                <View style={[{ paddingLeft: 2,width:'100%',gap:5,flexDirection:'row' }]}>
                  <Text style={{ width: '5%' }}>Title</Text>
                  <Text style={{ width: '31.666667%' }}>First Name</Text>
                  <Text style={{ width: '31.666667%' }}>Second Name</Text>
                  <Text style={{ width: '31.666667%' }}>Surname/Tribe</Text>
                </View>
                <View style={{flexDirection:'column', gap:3}}>
                  <View style={{flexDirection:'row', alignItems:"center"}}>
                  <Text>1.</Text>
                  <View style={[{ paddingLeft: 2, flexDirection:"row",width:'100%', gap:5 }]}>
                    <Text style={{ borderBottom: '1px solid black', width: '5%' }}>
                      {formdetails?.caoAppDetTitle?.value || 'N/A'}
                    </Text>
                    <Text style={{ borderBottom: '1px solid black', width: '31.6666667%' }}>
                      {formdetails?.caoAppDetFirstName || 'N/A'}
                    </Text>
                    <Text style={{ borderBottom: '1px solid black', width: '31.6666667%' }}>
                      {formdetails?.caoAppDetSecondName || 'N/A'}
                    </Text>
                    <Text style={{ borderBottom: '1px solid black', width: '31.6666667%' }}>
                      {formdetails?.caoAppDetSurnameTribe || 'N/A'}
                    </Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text>2.</Text>
                  <View style={[ { paddingLeft: 2, flexDirection:'row',gap:5, width:'100%'}]}>
                    <Text style={{ borderBottom: '1px solid black', width: '5%' }}>
                      {formdetails?.caoSecAppDetTitle?.value || 'N/A'}
                    </Text>
                    <Text style={{ borderBottom: '1px solid black', width: '31.666667%' }}>
                      {formdetails?.caoSecAppDetFirstName || 'N/A'}
                    </Text>
                    <Text style={{ borderBottom: '1px solid black', width: '31.666667%' }}>
                      {formdetails?.caoSecAppDetSecondName || 'N/A'}
                    </Text>
                    <Text style={{ borderBottom: '1px solid black', width: '31.666667%' }}>
                      {formdetails?.caoSecAppDetSurnameTribe || 'N/A'}
                    </Text>
                    </View>
                    </View>
                </View>
              </View>
              {/* ------------------------------------------------------------------------ */}

              <View style={{ display: 'flex', flexDirection: 'row', marginTop:5 }}>
                <View
                  style={{
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
                    width: '15%',
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
                      height: '20px',
                      padding: '6px',
                    }}
                  > <Text style={{ fontSize: 8 }}> </Text></View>
                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}>Applicant 1</Text>
                  </View>
                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <View style={{ flexDirection: 'column', gap: 2 }}>
                      <Text style={{ fontSize: 8, color: '#6E2585' }}>Applicant 2</Text>
                      <Text style={{ fontSize: 6, color: '#6E2585' }}>(if joint account)</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
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

                      height: '20px',
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>Nationality</Text>
                  </View>

                  <View
                    style={{
                      height: '22px',

                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}> {formdetails?.caoAppDetNationality?.value || 'N/A'}</Text>
                  </View>

                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}> {formdetails?.caoSecAppDetNationality?.value || 'N/A'}</Text>
                  </View>
                </View>
                <View
                  style={{
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
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
                      height: '20px',
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>ID/Resident Card</Text>
                  </View>
                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}>{formdetails?.caoAppDetIDResidentCard || 'N/A'}</Text>
                  </View>

                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}>{formdetails?.caoSecAppDetIDResidentCard || 'N/A'}</Text>
                  </View>
                </View>

                <View
                  style={{
                    borderRight: '1px solid #6E2585',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
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
                      height: '20px',
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>Expiry Date</Text>
                  </View>
                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{fontSize:8}}>
                      {formdetails?.caoAppDetPerExpiryDate
                        ? dayjs(formdetails?.caoAppDetPerExpiryDate)?.format('DD-MM-YYYY')
                        : 'N/A'}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{fontSize:8}}>
                      {formdetails?.caoSecAppDetPerExpiryDate
                        ? dayjs(formdetails?.caoSecAppDetPerExpiryDate)?.format('DD-MM-YYYY')
                        : 'N/A'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
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
                      height: '20px',
                    }}
                  >
                    <Text>Date of Birth</Text>
                  </View>
                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}>
                      {formdetails?.caoAppDetDateofBirth
                        ? dayjs(formdetails?.caoAppDetDateofBirth)?.format('DD-MM-YYYY')
                        : 'N/A'}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}>
                      {formdetails?.caoSecAppDetDateofBirth
                        ? dayjs(formdetails?.caoSecAppDetDateofBirth)?.format('DD-MM-YYYY')
                        : 'N/A'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderRight: '1px solid #6E2585',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
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
                      height: '20px',
                    }}
                  >
                    <Text>Gender</Text>
                  </View>
                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    {formdetails?.caoAppDetTitle?.id && (
                      <View style={styles.fourthRow}>
                          <View />

                          <Text style={{fontSize:8}}>
  {[506, 507].includes(formdetails?.caoAppDetTitle?.id)
    ? 'Female'
    : 'Male'}
</Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      height: '22px',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                    }}
                  >
                    {/* {formdetails?.caoSecAppDetTitle?.id && ( */}
                      <View style={styles.fourthRow}>
                          <View/>

                         <Text style={{fontSize:8}}>
  {
   [506, 507].includes(formdetails?.caoSecAppDetTitle?.id)
    ? 'Female'
    : 'Male'}
</Text>
                      </View>
                    {/* )} */}
                  </View>
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.secondRow, { width: '50%', padding: 0, gap: 5 }]}>
                  <Text style={styles.secondLabel}>Account Name : </Text>
                  <Text style={[styles.inputField, { flexGrow: 1 }]}>{formdetails?.caoRelDetAccountName || 'N/A'}</Text>
                </View>

                <View style={[styles.secondRow, { width: '50%', padding: 0, gap: 5 }]}>
                  <Text style={styles.secondLabel}>Type of Relationship: </Text>
                  <Text style={[styles.inputField, { flexGrow: 1 }]}>
                    {formdetails?.caoRelDetTypeofRelationship?.value || 'N/A'}
                  </Text>
                </View>
              </View>
              <InputComp inputOne="Instruction for Account Operation:" outputOne={formdetails?.caoRelDetIntructionforAccountOperation?.value || "N/A"} />

              {/* <View style={[styles.secondRow, { width: '100%', padding: 0, gap: 5 }]}>
                <Text style={styles.secondLabel}>Instruction for Account Operation: </Text>
                <View style={[styles.thirdRow, { width: '100%' }]}>
                  {formdetails?.caoRelDetIntructionforAccountOperation?.id && (
                    <Text style={styles.inputField}>{formdetails?.caoRelDetIntructionforAccountOperation?.value}</Text>
                  )}
                </View>
              </View> */}
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 5,
                marginVertical: '10px',
              }}
            >
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
                ATTORNEY/GUARDIAN
              </Text>
              <View style={styles.column}>
                <View style={styles.row}>
                  <View style={[styles.secondRow, { width: '50%', gap: 5 }]}>
                    <Text style={styles.secondLabel}>Name of Attorney/Guardian:</Text>
                    <Text style={styles.inputField}>{formdetails?.caoRelDetInstructionNameOfAttoney || 'N/A'}</Text>
                  </View>
                  <View style={[styles.secondRow, { width: '50%', gap: 5 }]}>
                    <Text style={styles.secondLabel}>ID/PP No.:</Text>
                    <Text style={styles.inputField}>{formdetails?.caoRelDetIDPassportNo || 'N/A'}</Text>
                  </View>
                </View>
                <View style={[styles.secondRow, { gap: 5 }]}>
                  <Text style={styles.secondLabel}>Power of Attorney Expiry Date:</Text>
                  <Text style={styles.inputField}>
                    { dayjs(formdetails?.caoRelDetPowerofAttorneyExpiryDate)?.format('DD-MM-YYYY')
                     }
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                border: '1px solid #6E2585',
                paddingBottom:2
              }}
            >
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
                ATM CARDS
              </Text>
              <View style={{ flexDirection: 'row', gap: 5, marginTop: 3 }}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingHorizontal: 4,
                    borderRight: '1px solid #6E2585',
                    width: '70%',
                    gap:3
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // gap: '20px',
                      gap:3
                    }}
                  >



                      <CheckBoxComp label="Please do not issue me/us a Debit Card" val={formdetails?.caoATMDebitCardIssuance?.value} />

                  </View>
                  {/* --------------------------------------------------------------------- */}

                  <View style={{ flexDirection: 'column', gap: 2 }}>
                    <View style={styles.customRow}>
                      <Text style={{ fontSize: 9, color: '#6E2585', paddingLeft: 2 }}>
                        Additional Applicant 1 Name-Supplementary Card:
                      </Text>
                      <Text style={{ fontSize: 8, color: '#6E2585' }}>(English only: max 20 characters)</Text>
                    </View>
                    <View>

                          <AccountBoxes data={formdetails?.caoATMDebitCardFirstApplicantName?.split('')}/>


                    </View>
                  </View>
                  {formdetails?.caoATMDebitCardSecondApplicantName &&
                   <View style={{ flexDirection: 'column', gap: 2 }}>
                    <View style={styles.customRow}>
                      <Text style={{ fontSize: 9, color: '#6E2585', paddingLeft: 2 }}>
                        Additional Applicant 2 Name-Supplementary Card:
                      </Text>
                      <Text style={{ fontSize: 8, color: '#6E2585' }}>(English only: max 20 characters)</Text>
                    </View>
                    <View>

                             <AccountBoxes data={formdetails?.caoATMDebitCardSecondApplicantName?.split('')}/>


                    </View>
                  </View>}


                </View>
                <View style={[styles.column, { width: '30%', paddingHorizontal: 4 }]}>
                  <Text style={styles.secondLabel}>Supplementary Cardholder’s Details</Text>

                  <InputComp inputOne="ID/PP No" outputOne={formdetails?.caoATMDebitCardIDPPNo || 'N/A'} />

                  <InputComp
                    inputOne="Limit to be assigned"
                    outputOne={formdetails?.caoATMDebitCardLimitassigned || 'N/A'}
                  />

                  <Text style={{ fontSize: 6, color: '#6E2585' }}>
                    Supplementary card to be activated by principal cardholder
                  </Text>
                </View>
              </View>
            </View>
            </View>
        </View>
        <PdfFooter/>
            </Page>
          <Page size="A4" style={styles.page}>
            {/*  */}
            <View style={{ flexDirection: 'column',marginBottom:4 }}>
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
                ADDITIONAL APPLICANT (1) DETAILS
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
                      <Text style={{ color: '#6E2B8C', fontSize: 8 }}>Source of Income : </Text>
                      <CheckBoxComp label={formdetails?.caoAppDetSourceofIncome?.value} val={formdetails?.caoAppDetSourceofIncome?.value} />

                    </View>

                    {formdetails?.caoAppDetSectorifsalary?.id && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#6E2B8C', fontSize: 8 }}>Sector (if salary): </Text>
                        <CheckBoxComp label={formdetails?.caoAppDetSectorifsalary?.value} val={formdetails?.caoAppDetSectorifsalary?.value} />


                      </View>
                    )}

                    <InputComp
                      inputOne="Name of the Employer"
                      outputOne={formdetails?.caoAppDetNameofEmployer || 'N/A'}
                    />

                    <InputComp
                      inputOne="Nature of Business"
                      outputOne={formdetails?.caoAppDetNatureofBusiness || 'N/A'}
                    />

                    <InputComp inputOne="Designation" outputOne={formdetails?.caoAppDetDesignation || 'N/A'} />

                    <InputComp
                      inputOne="Employee No"
                      inputTwo="Date of Joining"
                      outputOne={formdetails?.caoAppDetEmployeeNo || 'N/A'}
                      outputTwo={
                        formdetails?.caoAppDetDateofJoining
                          ? dayjs(formdetails?.caoAppDetDateofJoining)?.format('DD-MM-YYYY')
                          : 'N/A'
                      }
                    />

                    <InputComp inputOne="Passport No" outputOne={formdetails?.caoAppDetPassportNo || 'N/A'} />

                    <InputComp
                      inputOne="Passport Expiry Date"
                      outputOne={
                        formdetails?.caoAppDetPassportExpiryDate
                          ? dayjs(formdetails?.caoAppDetPassportExpiryDate)?.format('DD-MM-YYYY')
                          : 'N/A'
                      }
                    />

                    <InputComp
                      inputOne="Telephone"
                      inputTwo="Fax"
                      outputOne={formdetails?.caoAppDetTelephone || 'N/A'}
                      outputTwo={formdetails?.caoAppDetFax || 'N/A'}
                    />

                    <InputComp inputOne="Income p.m" outputOne={formdetails?.caoAppDetIncomepm?.value || 'N/A'} />

                    <InputComp
                      inputOne="Source of Other Income"
                      outputOne={formdetails?.caoAppDetSourceofOtherIncome || 'N/A'}
                    />
                  </View>
                </View>

                <View
                  style={{
                    height: 'auto',
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
                  <View style={styles.column}>
                    <InputComp
                      inputOne="P.O Box"
                      inputTwo="Postal Code"
                      outputOne={formdetails?.caoAppDetPOBox || 'N/A'}
                      outputTwo={formdetails?.caoAppDetPostalCode?.value || 'N/A'}
                    />
                    <InputComp
                      inputOne="House No./Flat No"
                      inputTwo="Building No"
                      outputOne={formdetails?.caoAppDetHouseNoFlatNo || 'N/A'}
                      outputTwo={formdetails?.caoAppDetBuildingNo || 'N/A'}
                    />
                    <InputComp
                      inputOne="Way No"
                      inputTwo="Area"
                      outputOne={formdetails?.caoAppDetWayNo || 'N/A'}
                      outputTwo={formdetails?.caoAppDetArea || 'N/A'}
                    />
                    <InputComp
                      inputOne="Telephone"
                      inputTwo="Fax"
                      outputOne={formdetails?.caoAppDetTelephone || 'N/A'}
                      outputTwo={formdetails?.caoAppDetFax || 'N/A'}
                    />
                    <InputComp
                      inputOne="Wilayat"
                      inputTwo="Res. Tel. No"
                      outputOne={formdetails?.caoAppDetWilayat?.value || 'N/A'}
                      outputTwo={formdetails?.caoAppDetResTelNo || 'N/A'}
                    />
                    <InputComp
                      inputOne="Mobile (1)"
                      inputTwo="Mobile (2)"
                      outputOne={formdetails?.caoAppDetMobile1 || 'N/A'}
                      outputTwo={formdetails?.caoAppDetMobile2 || 'N/A'}
                    />
                    <InputComp inputOne="Email" outputOne={formdetails?.caoAppDetEmail || 'N/A'} />
                    <InputComp
                      inputOne="Permenent Address"
                      outputOne={formdetails?.caoAppDetPermanentAddressHomeCountry || 'N/A'}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/*  */}

            <View style={{ flexDirection: 'column', marginBottom:4 }}>
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
                ADDITIONAL APPLICANT (2) DETAILS
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
                      <Text style={{ color: '#6E2B8C', fontSize: 8 }}>Source of Income:</Text>
                      <CheckBoxComp label="Source of Income:" val={formdetails?.caoSecAppDetSourceofIncome?.value}/>


                    </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#6E2B8C', fontSize: 8 }}>Sector (if salary): </Text>


                        <CheckBoxComp val={formdetails?.caoSecAppDetSectorifsalary?.value} label={formdetails?.caoSecAppDetSectorifsalary?.value}/>
                      </View>

                    <InputComp
                      inputOne="Name of the Employer"
                      outputOne={formdetails?.caoSecAppDetNameofEmployer || 'N/A'}
                    />
                    <InputComp
                      inputOne="Nature of Business"
                      outputOne={formdetails?.caoSecAppDetNatureofBusiness || 'N/A'}
                    />
                    <InputComp inputOne="Designation" outputOne={formdetails?.caoSecAppDetDesignation || 'N/A'} />
                    <InputComp
                      inputOne="Employee No"
                      inputTwo="Date of Joining"
                      outputOne={formdetails?.caoSecAppDetEmployeeNo || 'N/A'}
                      outputTwo={
                        formdetails?.caoSecAppDetDateofJoining
                          ? dayjs(formdetails?.caoSecAppDetDateofJoining)?.format('DD-MM-YYYY')
                          : 'N/A'
                      }
                    />

                    <InputComp inputOne="Passport No" outputOne={formdetails?.caoSecAppDetPassportNo || 'N/A'} />

                    <InputComp
                      inputOne="Passport Expiry Date*"
                      outputOne={
                        formdetails?.caoSecAppDetPassportExpiryDate
                          ? dayjs(formdetails?.caoSecAppDetPassportExpiryDate)?.format('DD-MM-YYYY')
                          : 'N/A'
                      }
                    />

                    <InputComp
                      inputOne="Telephone"
                      inputTwo="Fax"
                      outputOne={formdetails?.caoSecAppDetTelephone || 'N/A'}
                      outputTwo={formdetails?.caoSecAppDetFax || 'N/A'}
                    />
                    <InputComp inputOne="Income p.m" outputOne={formdetails?.caoSecAppDetIncomepm?.value || 'N/A'} />

                    <InputComp
                      inputOne="Source of Other Income"
                      outputOne={formdetails?.caoSecAppDetSourceofOtherIncome?.value || 'N/A'}
                    />
                  </View>
                </View>

                <View
                  style={{
                    height: 'auto',
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
                  <View style={styles.column}>
                    <InputComp
                      inputOne="P.O Box"
                      inputTwo="Postal Code"
                      outputOne={formdetails?.caoSecAppDetPOBox || 'N/A'}
                      outputTwo={formdetails?.caoSecAppDetPostalCode?.value || 'N/A'}
                    />
                    <InputComp
                      inputOne="House No./Flat No"
                      inputTwo="Building No"
                      outputOne={formdetails?.caoSecAppDetHouseNoFlatNo || 'N/A'}
                      outputTwo={formdetails?.caoSecAppDetBuildingNo || 'N/A'}
                    />
                    <InputComp
                      inputOne="Way No"
                      inputTwo="Area"
                      outputOne={formdetails?.caoSecAppDetWayNo || 'N/A'}
                      outputTwo={formdetails?.caoSecAppDetArea || 'N/A'}
                    />
                    <InputComp
                      inputOne="Telephone"
                      inputTwo="Fax"
                      outputOne={formdetails?.caoSecAppDetTelephone || 'N/A'}
                      outputTwo={formdetails?.caoSecAppDetFax || 'N/A'}
                    />
                    <InputComp
                      inputOne="Wilayat"
                      inputTwo="Res. Tel. No"
                      outputOne={formdetails?.caoSecAppDetWilayat?.value || 'N/A'}
                      outputTwo={formdetails?.caoSecAppDetResTelNo|| 'N/A'}
                    />
                    <InputComp
                      inputOne="Mobile (1)"
                      inputTwo="Mobile (2)"
                      outputOne={formdetails?.caoSecAppDetMobile1 || 'N/A'}
                      outputTwo={formdetails?.caoSecAppDetMobile2 || 'N/A'}
                    />
                    <InputComp inputOne="Email" outputOne={formdetails?.caoSecAppDetEmail || 'N/A'} />
                    <InputComp
                      inputOne="Permenent Address"
                      outputOne={formdetails?.caoSecAppDetPermanentAddressHomeCountry || 'N/A'}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
            gap: 5,
                marginBottom:3
              }}
            >
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
                BANKING SERVICE REQUIRED
              </Text>
              <View style={styles.rowFav}>
                <View
                  style={{ flexDirection: 'column', width: '60%', borderRight: '1px solid #6E2585', paddingRight: 5,gap:5 }}
                >
                  {/* {formdetails?.caoATMDebitCardChequeBook?.id === 446 && ( */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <CheckBoxComp label="Cheque Book" val={formdetails?.caoATMDebitCardChequeBook?.value}/>
                      {/* <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                        <Text>Cheque Book</Text>
                      </View> */}

                        <CheckBoxComp label={"leaves" + " "+formdetails?.caoATMDebitCardChequeBookLeaves?.value} val={formdetails?.caoATMDebitCardChequeBookLeaves?.value}/>

                    </View>
                  {/* )} */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                <CheckBoxComp label="SMS Alerts for Account Transactions:" val={formdetails?.caoATMDebitCardSMSAlert} />


                      <View style={styles.rowFav}>
                        <CheckBoxComp label={formdetails?.caoATMDebitCardSMSAlert?.value} val={formdetails?.caoATMDebitCardSMSAlert?.value} />

                      </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', padding: 2 }}></View>
                {formdetails?.caoATMDebitCardEmailAlertsAccountTransactions && (
                                          <CheckBoxComp label="Email Alerts for Account Transactions" val={formdetails?.caoATMDebitCardEmailAlertsAccountTransactions} />


                )}
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
                <View
                  style={{ flexDirection: 'column', width: '60%', borderRight: '1px solid #6E2585', paddingRight: 5 }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                    <Text style={{ color: '#6E2585', fontSize: 8 }}>Standard Frequencies: </Text>
                    <Text style={{ color: '#6E2585', fontSize: 8 }}> Printed (Biannually) </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={styles.checkboxRow}>
                      <Text style={{ fontSize: 8 }}>Change in Printed Frequency*, please specify</Text>
                    </View>
                    <View style={styles.rowFav}>
                        <CheckBoxComp label={formdetails?.caoATMDebitCardChangesPrintedFrequency?.value}  val={formdetails?.caoATMDebitCardChangesPrintedFrequency?.value} />

                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={styles.checkboxRow}>
                      <Text style={{ fontSize: 7 }}>*Charges applicable</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', padding: 2 }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap:5 }}>
                    <Text style={{ fontSize: 8 }}>Email (Monthly)</Text>
                                              <CheckBoxComp label={formdetails?.caoATMDebitCardChangesEmailFrequency?.value}  val={formdetails?.caoATMDebitCardChangesEmailFrequency?.value} />

                </View>
              </View>
            </View>

        <PdfFooter />
        </Page>
      <Page size="A4" style={styles.page}>
            <View
              style={{
                flexDirection: 'column',
                gap: 5,
                // marginBottom: 50,
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
                TERMS AND CONDITIONS:
              </Text>
              <Text style={{ fontSize: 8 }}>
                I/We confirm that the information given above is true and complete, and that I/We have received the
                Bank’s General Terms and Conditions for the operation of the Account(s) and Electronic Banking Services
                and those applicable specifically to the type of account chosen by me/us. I/We understand and expressly
                agree and accept to be bound by them whether set out in English and/or Arabic. I/We confirm that all
                expected inward remittances to my/our account(s) will comply with the stipulation of Central Bank of
                Oman.
              </Text>
        </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              <View
                style={{
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
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    height: '30px',
                    padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Name</Text>
                </View>
                <View
                  style={{
                    height: '30px',
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
                    height: '30px',
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    // padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>Second Applicant</Text>
                  <Text style={{ fontSize: 6 }}>(if joint account)</Text>
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
                    height: '30px',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Signature/Thumb Impression</Text>
                </View>
                {Array.from({ length: 2 })?.map((items: any, index: any) => (
                  <View
                    key={index}
                    style={{
                      height: '30px',
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
                    <Text style={{ fontSize: 8 }}> </Text>
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
                    // padding: '8px',
                    height: '30px',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Signature Verified by Branch</Text>
                </View>
                {Array.from({ length: 2 })?.map((items: any, index: any) => (
                  <View
                    style={{
                      height: '30px',
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
                    <Text style={{ fontSize: 8 }}></Text>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: 5,
                backgroundColor: '#FFFACD',
                padding: '5px',
                gap: 5,
              }}
            >
              <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>

              <View style={styles.column}>
                <Text style={styles.label}>List of documents obtained and verified against original/KYC steps</Text>
                {/*  */}
                <View>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 'auto',
                          fontSize: '10px',
                          borderTop: '1px solid #6E2585',
                          borderLeft: '1px solid #6E2585',
                          width: '20%',
                          // paddingBottom:1
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                                // margin:1
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  // marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Customer ID
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Customer Passport
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Resident
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          height: 'auto',
                          borderRight: '1px solid #6E2585',
                          fontSize: '10px',
                          borderTop: '1px solid #6E2585',
                          // borderBottom: '1px solid #6E2585',
                          borderLeft: '1px solid #6E2585',
                          width: '35%',
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Specimen Signature Card
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                2 Photographs for Special Needs Customers
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Customer Met in Person
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          height: 'auto',
                          borderRight: '1px solid #6E2585',
                          fontSize: '10px',
                          borderTop: '1px solid #6E2585',
                          width: '45%',
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Power of Attorney Document
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Attested Copies of Original Mandate from the Account Holder
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Birth Certificate (for Minor Account Only)
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 'auto',
                          fontSize: '10px',
                          // borderTop: '1px solid #6E2585',
                          borderLeft: '1px solid #6E2585',
                          borderRight: '1px solid #6E2585',
                          width: '55%',
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Monthly turnover of the account:
                              </Text>
                              <Text style={{ borderBottom: '1px solid #6E2B8C', width: '100px', marginTop: 8 }}></Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          height: 'auto',
                          fontSize: '10px',
                          // borderTop: '1px solid #6E2585',
                          // borderLeft: '1px solid #6E2585',
                          borderRight: '1px solid #6E2585',
                          width: '45%',
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderBottom: '1px solid #6E2585',
                            alignItems: 'flex-start',
                            color: '#6E2585',
                            height: '25px',
                            width: '100%',
                            paddingTop: '4px',
                            paddingLeft: '4px',
                          }}
                        >
                          <View style={styles.secondRow}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between',
                                textAlign: 'center',
                              }}
                            >
                              <View style={styles.checkbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 7,
                                }}
                              >
                                Customer Visa
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {/*  */}
                <View style={{ flexDirection: 'row', gap: 40 }}>
                  <Text style={styles.secondLabel}>Customer Segment:</Text>
                  <View style={{...styles.thirdRow,gap:5}}>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Mass</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Mass Affluent </Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Affluent</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>VIP</Text>
                    </View>
                  </View>
                </View>
                {/*  */}
                <View>
                  {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View
                      style={{
                        height: 'auto',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        borderLeft: '1px solid #6E2585',
                        // borderBottom: '1px solid #6E2585',
                        width: '33.33333%',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-start',
                          color: '#6E2585',
                          height: '30px',
                          width: '100%',
                          padding: '4px',
                        }}
                      ></View>
                      <View
                        style={{
                          height: '30px',
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
                        <Text style={styles.label}> For Branch Use</Text>
                      </View>
                      <View
                        style={{
                          height: '30px',
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
                        <Text style={styles.label}> For Operation Use</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 'auto',
                        borderRight: '1px solid #6E2585',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        // borderBottom: '1px solid #6E2585',
                        borderLeft: '1px solid #6E2585',
                        width: '33.33333%',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',

                          alignItems: 'flex-start',
                          color: '#6E2585',
                          height: '30px',
                          width: '100%',
                          padding: '7px',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Processed and Input By</Text>
                      </View>
                      {Array.from({ length: 2 })?.map((items: any, index: any) => (
                        <View
                          key={index}
                          style={{
                            height: '30px',
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
                          <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
                        </View>
                      ))}
                    </View>

                    <View
                      style={{
                        height: 'auto',
                        borderRight: '1px solid #6E2585',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        // borderBottom: '1px solid #6E2585',
                        // borderLeft: '1px solid #6E2585',
                        width: '33.33333%',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',

                          alignItems: 'flex-start',
                          color: '#6E2585',
                          height: '30px',
                          width: '100%',
                          padding: '7px',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Data Input Verified and Authorised By</Text>
                      </View>
                      {Array.from({ length: 2 })?.map((items: any, index: any) => (
                        <View
                          key={index}
                          style={{
                            height: '30px',
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
                          <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
                        </View>
                      ))}
                    </View>
                  </View> */}

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
                          height: '30px',
                          padding: '8px',
                        }}
                      >
                        <Text style={{ fontSize: 10 }}>Name</Text>
                      </View>
                      <View
                        style={{
                          height: '30px',
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
                        <Text style={{ fontSize: 8 }}>For Branch Use</Text>
                      </View>
                      <View
                        style={{
                          height: '30px',
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
                        <Text style={{ fontSize: 8 }}>For Operation Use</Text>
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
                          height: '30px',
                          // padding: '8px',
                        }}
                      >
                        <Text style={{ fontSize: 10 }}>Processed and Input By</Text>
                      </View>
                      {Array.from({ length: 2 })?.map((items: any, index: any) => (
                        <View
                          key={index}
                          style={{
                            height: '30px',
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
                          <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
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
                          // padding: '8px',
                          height: '30px',
                        }}
                      >
                        <Text style={{ fontSize: 10 }}>Data Input Verified and Authorised By</Text>
                      </View>
                      {Array.from({ length: 2 })?.map((items: any, index: any) => (
                        <View
                          style={{
                            height: '30px',
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
                </View>
                {/*  */}
              </View>
              <View style={styles.customRow}>
                <InputComp
                  inputOne="DSR/PBO Code"
                  inputTwo="DSR/PBO Name"
                  outputOne={formdetails?.caoSecAppDetMobile1}
                  outputTwo={formdetails?.caoSecAppDetMobile2}
                />
              </View>
            </View>

            <PDFTermsAndCondition data={termsConditionData} />

            <View style={{width:'90%',position:"absolute",bottom:0,paddingRight:20}}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:"center", width: '100%' }}
              >
                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <Text
                    style={{ borderBottomWidth: 1, borderBottomColor: '#6E2B8C', color: '#6E2B8C', width: '200px' }}
                  ></Text>
                  <Text style={{ fontSize: 8 }}>Customer Name</Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <Text
                    style={{ borderBottomWidth: 1, borderBottomColor: '#6E2B8C', color: '#6E2B8C', width: '100px' }}
                  ></Text>
                  <Text style={{ fontSize: 8 }}>Customer Signature</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
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
                        {Array.from({ length: 8 })?.map((items: any, index: number) => {
                          const extraMargin = index === 1 || index === 3 ? '5px' : '2px';
                          return (
                            <View
                              key={index}
                              style={{
                                minWidth: 15,
                                width: 15,
                                minHeight: 15,
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
                              <Text style={{ fontSize: 7, padding: '0px' }}>{items ? items : null} </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

        <PdfFooter />
      </Page>
      <Page size={[595.28, 560]} style={styles.page}>
        <PdfArabicHeader formName={data?.form_name} />
        <View style={{ flexDirection: 'column', gap: 2 }}>
          <View style={{ flexDirection: 'row', gap: '5%' }}>
            <View style={{ width: '20%' }}>
              <DualLabelField labelEN="Branch" labelAR="الفرع" value={formdetails?.caoRelDetBranch?.value || "N/A"} />
            </View>
            <View style={{ width: '75%' }}>
              <DualLabelField labelEN="Account Name" labelAR="اسم الحساب" value={formdetails?.caoRelDetAccountName || "N/A"} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: '10%' }}>
            <View style={{ width: '45%' }}>
              <DualLabelField labelEN="Account No." labelAR=" رقم الحساب" value="" />
            </View>
            <View style={{ width: '45%' }}>
              <CustomDate date={formatedDate} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <Text style={styles.textFont}>Account Operating Instructions:</Text>
            <Text style={styles.arabicText}>تعليمات خاصة بتشغيل الحساب:</Text>
          </View>
          <View style={{ width: '100%' }}>
            <DualLabelField
              labelEN="Singly/Jointly/Others (Please specify):"
              labelAR="فردي / مشترك / أخرى (يرجى التحديد):"
              value={formdetails?.caoRelDetIntructionforAccountOperation?.value || "N/A"}
            />
          </View>
          <View style={{ flexDirection: 'column', marginTop: 5 }}>
            {Array.from({ length: 2 })?.map((items: any, index: number) => (
              <View>
                <View
                  style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', borderTop: '1px solid #6E2B8C' }}
                >
                  <View
                    style={{
                      width: '25%',
                      borderLeft: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                      backgroundColor: '#C0C0C0'
                      ,flexDirection:"column",gap:1
                    }}
                  >
                                      <Text style={{  ...styles.arabicText }}>اسم المفوض بالتوقيع </Text>

                    <Text style={{ textAlign: 'center', ...styles.textFont }}>Signatory Name</Text>
                  </View>
                  <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0',flexDirection:"column",gap:1 }}>
                  <Text style={{  ...styles.arabicText }}> التوقيع</Text>

                    <Text style={{ textAlign: 'center', ...styles.textFont }}>Signature</Text>
                  </View>

                  <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0',flexDirection:"column",gap:1 }}>
                  <Text style={{  ...styles.arabicText }}>اسم المفوض بالتوقيع </Text>

                    <Text style={{ textAlign: 'center', ...styles.textFont }}>Signatory Name</Text>
                  </View>

                  <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0',flexDirection:"column",gap:1 }}>
                  <Text style={{  ...styles.arabicText }}> التوقيع</Text>

                    <Text style={{ textAlign: 'center', ...styles.textFont }}>Signature</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                  <View
                    style={{
                      width: '25%',
                      borderLeft: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                      height: 50,
                    }}
                  >
                    <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
                  </View>
                  <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
                  </View>

                  <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
                  </View>

                  <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
                  </View>
                </View>
              </View>
            ))}
            <PdfTable head="For Branch Use Only" body={
              <View style={{ backgroundColor: '#FFFACD', width: '100%', flexDirection: 'column', gap: 4,padding:2 }}>
                <DualLabelField
                  labelEN="Received by:"
                  labelAR=" ستلمت من قبل::"
                  value="" />
                <DualLabelField
                  labelEN="Scanned by:"
                  labelAR=" مسحت ضوئيا من قبل:"
                  value="" />
                <DualLabelField
                  labelEN="Authorised by:"
                  labelAR=" اعتمدت من قبل:"
                  value=""/>

              </View>
             }/>
          </View>
        </View>
        <PdfFooter />
      </Page>
    </Document>
  );
}
