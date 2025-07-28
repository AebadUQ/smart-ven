'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { bgcolor, flexbox, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { PdfFooter } from '../pdf-footer';
import { PdfArabicHeader } from './pdf-arabic-header';
import { CustomArabicDate } from './pdf-custom-arabic-date';
import { CheckBoxComp } from '../checkbox-component';
import { PDFTermsAndCondition } from '../sections/pdf-terms-condition';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
});
export interface LineItem {
  id: string;
  name: string;
  quantity: number;
  currency: string;
  unitAmount: number;
  totalAmount: number;
}

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
  customRow: {
    flexDirection: 'row-reverse',
    gap: 5,
    alignItems: 'center',
    width: '100%',
  },
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 8,
    direction: 'rtl',
    textAlign: 'right',
    color: '#6E2B8C',
  },
  row: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    // marginTop: 15,
  },
  rowFav: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  secondRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    paddingLeft: 5,
  },
  thirdRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',

    paddingLeft: 5,
  },
  fourthRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
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
    textAlign: 'center',
    color: '#6E2B8C',
    fontWeight: 'black',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 2,
    color: '#6E2B8C',
    fontSize: 12,
  },
  secondLabel: {
    marginTop: 4,
    color: '#6E2B8C',
    fontSize: 9,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
  },
  checkboxRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 2,

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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    // width: '80px ',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 1,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    justifyContent: 'center',
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
export function ArabicAccountOpeningSavingsFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  let date = data?.createdAt;
  const formatedDate = dayjs(date)?.format('DDMMYYYY');
  const termsConditionData = {
    title: 'Terms and Conditions for Savings Account',
    list: [
      {
        title: 'Qualifying Accounts',
        description: [
          {
            isClosure: false,
            text: 'Only accounts which satisfy the minimum balance requirement as prescribed by the Central Bank of Oman and/or the Bank, from time to time, (excluding Current Accounts), shall qualify and be treated as Savings Accounts (Mudaraba Account). To the extent and for the period any Mudaraba Account does not meet the minimum balance requirement is included in the Mudaraba pool, and if the balance is below the minimum balance requirement, the Mudaraba Account will be entitled to profit according to its weightage in the Mudaraba pool. The bank has the right to impose fees on the account if it goes below the minimum requirement.',
          },
        ],
      },

      {
        title: 'Accounts',
        description: [
          {
            isClosure: true,
            text: 'Under a Savings Account, the Customer, being the owner of funds (“Rab al-Mal”), authorizes the Bank (being the “Mudarib” or fund manager), to invest the Customer’s funds available in the Mudaraba Account in accordance with Shari’a rules and principles and at the absolute discretion of the Bank.',
          },
          {
            isClosure: true,
            text: 'The Customer may make withdrawals from the (Savings) Mudaraba Accounts by using any of the modes made available by the Bank, including but not limited to using the Card, withdrawal slips, standing instructions, pay orders or electronic instructions, through the channels made available by the Bank, including but not limited to point of sale, branches, Internet Banking, ATMs, Mobile Banking, Phone Banking or by such other modes or channels as shall be made available by the Bank from time to time.',
          },
          {
            isClosure: true,
            text: 'The Mudaraba Accounts may be in such denominations as approved by the Bank from time to time.',
          },
        ],
      },

      {
        title: 'Investment and Profits',
        description: [
          {
            isClosure: true,
            text: 'The Bank shall invest the credit balance available in the Mudaraba Accounts (the “Mudaraba Funds”) maintained by the Customer, in a joint investment pool (the “Mudaraba Pool”), and the bank is entitled to co-mingle funds from the Bank’s equity and other investors (Shareholders’ Funds) in the Mudaraba Pool. The Mudaraba Pool shall be invested and managed by the Bank in certain Sharia compliant assets (the “Mudaraba Assets”) on an unrestricted basis in accordance with Shari’a rules and principles.',
          },
          {
            isClosure: true,
            text: 'The profits (“Mudaraba Profits”) realized as a result of the Bank’s investment activity under clause (3.1) above, shall be allocated between the Shareholders’ Funds and the Mudaraba Funds, as follows:',
            subClause: [
              {
                text: 'in consideration of investing Shareholders’ Funds in the Mudaraba Pool, the Bank shall be entitled to a specified percentage share of the Mudaraba profit, for the corresponding Investment Period (Shareholders’ Profit Share).',
              },
              {
                text: 'in consideration of the services provided by the Bank hereunder as the Mudarib, the Bank shall be entitled to a predetermined profit sharing percentage of the Mudaraba Profits, for the corresponding Investment Period (the “Mudarib’s Profit Share”).',
              },
              {
                text: 'the remaining Mudaraba Profit, after deduction of the Shareholders’ Profit Share and Mudarib’s Profit Share (the “Profit Amount”), shall be allocated among Mudaraba Accounts by reference to the Weightages in accordance with clause (3.5) below. The Customer’s share of the profit will be determined in accordance with the weightage applicable to the relevant category to which the Customer’s Mudaraba investment belongs, and shall be paid on the relevant Profit Payment Date, based on the average monthly balance.',
              },
              {
                text: 'the updated and prevailing Shareholders’ Profit Share, Mudarib’s Profit Share, and (Rab al-Mal) Customers’ Profit Amount, and Weightages applicable to each category shall be displayed in the Bank’s branches, and Bank’s website, in addition to expected profit for the next month. These may be obtained from the Bank in accordance with the Bank’s prevailing practices. The Bank reserves its right to vary the Shareholders’ Profit Share, Mudarib’s Profit Sharing Percentage and/or the Weightages from time to time in accordance with the prevailing regulations, and/ or directives applicable to it; and such variation shall be deemed to be effective upon the commencement of the Mudaraba Period immediately succeeding such variation. The Customer shall be deemed to have accepted such variation if the Bank does not receive any notice to the contrary within seven (7) days from the issuance of such variation.',
              },
            ],
          },
          {
            isClosure: true,
            text: 'The Customer acknowledges that nothing in these Conditions and the General Terms & Conditions shall be construed as being a warranty or a representation by the Bank of any guaranteed profits, or any guaranteed repayment of any part or the entire portion, in respect of the Mudaraba Account. The Customer is aware that all balances in the Savings Account (including the original Mudaraba Funds) are exposed to potential losses arising out of a loss incurred in respect of Mudaraba Assets, and that such losses may even affect the principal amount of funds deposited by the Customers in the Mudaraba Account.',
          },

          {
            isClosure: true,
            text: 'Any losses incurred to the Mudaraba Pool during a Profit Calculation Period shall be borne proportionately between the Mudaraba Funds and the Shareholders’ Funds invested in the Mudaraba Pool (whether from the Bank’s equity funds or otherwise). Loss allocated to the Mudaraba Funds shall be then shared between all Mudaraba Accounts proportionately in accordance with the respective amounts invested by each Customer in the Mudaraba Fund. However, the Bank (as Mudarib) shall bear any loss attributable only to its gross negligence or violation in the carrying out of its duties as a Mudarib under these Conditions and the General Terms & Conditions of the Bank. In the event that such losses occur during an Investment Period, the Bank shall not be entitled to the Mudarib’s Profit Share for such Investment Period.',
          },

          {
            isClosure: true,
            text: 'The Mudaraba Fund profit percentage shall be calculated and notified and disclosed to the Customer in the applicable profit table.',
          },

          {
            isClosure: true,
            text: 'The Bank is entitled to determine the closing balances in cases where a Savings Account is closed prior to the applicable Profit Payment Date. The Customer shall be entitled to receive the profits accrued on the Mudaraba Funds, for the relevant Investment Period, based on last investment period’s declared profit rate. The client waives its right to any farther claims of profit or from reserve accounts from the bank in this regard.',
          },

          {
            isClosure: true,
            text: 'The Bank, as Mudarib, is hereby authorized by the Customer to deduct an identified percentage of the Mudaraba Profit due to investors in the Mudaraba Fund, as Investment Risk Reserve, for the following purposes : ',
            subClause: [
              {
                text: 'This is the amount allocated by the Bank from the Mudaraba Fund profit share, after deducting Mudarib share, to provide a cushion for possible future losses for investors.',
              },
              {
                text: 'The utilisation of Mudaraba Profit transferred to the Investment Risk Reserve account as set out in clause (3.7) is solely for the benefit of Mudaraba Account holders and is supervised by the Bank’s Shari’a Supervisory Board. The Bank reserves the right to invest the balance in the Investment Risk Reserve in Shari’a compliant investments',
              },
            ],
          },

          {
            isClosure: true,
            text: 'The Bank, as Mudarib, is hereby authorized by the Customer to deduct a certain percentage of the Mudaraba Profit due to the investors in the Mudaraba Pool, as Profit Equalisation Reserve, for the purpose of maintaining the stream of profits disbursed to Mudaraba Account holders, and owners’ equity, and this deduction shall be made before allocating the Mudarib share. If the balance exceeds the amount considered prudent, then the excess amount, at the discretion of the Bank, shall be released from reserve to the relevant party’s share of income for that financial period, after allocating the Mudarib share.',
          },
        ],
      },

      {
        title: 'General',
        description: [
          {
            isClosure: false,
            text: 'Anything not covered under these Conditions, will be governed by the General Terms & Conditions of the Bank, as applicable from time to time. ',
          },
          {
            isClosure: false,
            text: 'The Saving Account Terms & Conditions (the “Conditions”) shall be read and interpreted in conjunction with the General Terms & Conditions of the Bank. Words capitalized but not otherwise defined in these Conditions, shall have the same meaning as defined under the General Terms & Conditions.',
          },
        ],
      },
    ],
  };
  return (
    <Page size="A4" style={styles.page}>
      <PdfArabicHeader formName={data?.form_name} />
      <View style={styles.column}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
          <CustomArabicDate />
          <View style={{...styles.row, marginTop:15}}>
            <Text style={styles.arabicText}>الفرع: </Text>
            <Text style={styles.input}>{formdetails?.saoRelationshipDetailsBranch?.value}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
          <Text style={styles.arabicText}>مالحظة: الرجاء تعبئة هذا الطلب بخط واضح والتوقيع في الفراغ المخصص لذلك</Text>
        </View>

        <View style={{ flexDirection: 'column', gap: 3 }}>
          <Text
            style={{
              ...styles.arabicTextHead,
              marginBottom: 12,
              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingRight: '5px',
            }}
          >
            بيانات الحساب
          </Text>
          <View style={{ flexDirection: 'column', gap: '1px', alignItems: 'flex-end' }}>
            <View style={{ width: '40%' }}>
              <View style={styles?.thirdRow}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.arabicText}>طبيعة الحساب:</Text>
                </View>
                <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text style={styles.arabicText}>{formdetails?.saoRelationshipDetailsCIFType?.value} </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: '40%', justifyContent: 'flex-start' }}>
              <View style={styles?.thirdRow}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.arabicText}>عملة الحساب:</Text>
                </View>
                <View style={{ width: '100px' }}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text style={styles.arabicText}>{formdetails?.saoRelationshipDetailsCurrency?.value}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: '40%', justifyContent: 'flex-start' }}>
              <View style={styles?.thirdRow}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.arabicText}>أساس المعامالت البنكية:</Text>
                </View>
                <View style={{ width: '100px' }}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text style={styles.arabicText}>
                      {formdetails?.saoRelationshipDetailsRelationshipCriteria?.value}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: '3px', border: '0.5 px solid #6E2585' }}>
            <Text
              style={{
                ...styles.arabicTextHead,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingRight: '5px',
              }}
            >
              البيانات الشخصية
            </Text>
            <View style={[styles.column, { paddingHorizontal: 10 }]}>
              <Text style={styles.arabicText}>اسم/أسماء مقدم/مقدمي الطلب (كما هو مذكور بالبطاقة الشخصية)</Text>
              <View style={[styles.secondRow, { paddingRight: '20px' }]}>
                <Text style={{ width: '100%', ...styles.arabicText }}>اللقب</Text>
                <Text style={{ width: '100%', ...styles.arabicText }}>االسم األول</Text>
                <Text style={{ width: '100%', ...styles.arabicText }}> االسم الثاني</Text>
                <Text style={{ width: '100%', ...styles.arabicText }}>العائلة/ القبيلة</Text>
              </View>
              <View>
                <Text style={styles.arabicText}>1.</Text>
                <View style={[styles.secondRow, { paddingRight: '20px' }]}>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoRelationshipDetailsTitle?.value}
                  </Text>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoRelationshipDetailsFirstName}
                  </Text>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoRelationshipDetailsSecondName}
                  </Text>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoRelationshipDetailsSurnameTribe}
                  </Text>
                </View>
                <Text style={styles.arabicText}>2.</Text>
                <View style={[styles.secondRow, { paddingRight: '20px' }]}>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoSecondApplicantDetailsTitle?.value}
                  </Text>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoSecondApplicantDetailsFirstName}
                  </Text>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoSecondApplicantDetailsSecondName}
                  </Text>
                  <Text style={{ borderBottom: '1px solid black', width: '100%', ...styles.arabicText }}>
                    {formdetails?.saoSecondApplicantDetailsSurnameTribe}
                  </Text>
                </View>
              </View>
            </View>
            {/* ------------------------------------------------------------------------ */}

            <View style={{ display: 'flex', flexDirection: 'row',width:"100%" }}>
                            <View
                              style={{
                                fontSize: '10px',
                                borderTop: '1px solid #6E2585',
                                // borderLeft: '1px solid #6E2585',
                                // borderBottom: '1px solid #6E2585',
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
                                  padding: '8px',
                                }}
                              >
                                {/* <Text>Transaction Date and Time</Text> */}
                              </View>
                              <View
                                style={{
                                  height: '42px',
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
                                <Text style={{ fontSize: 8 }}>Applicant 1</Text>
                              </View>
                              <View
                                style={{
                                  height: '42px',
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
                                <View style={{ flexDirection: 'column', gap: 2 }}>
                                  <Text style={{ fontSize: 8, color: '#6E2585' }}>Applicant 2</Text>
                                  <Text style={{ fontSize: 6, color: '#6E2585' }}>(if joint account)</Text>
                                </View>
                              </View>
                            </View>

                            <View
                              style={{
                                fontSize: 6,
                                borderTop: '1px solid #6E2585',
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

                                  height: '20px',
                                }}
                              >
                                <Text style={{ fontSize: 8}}>Nationality</Text>
                              </View>

                              <View
                                style={{
                                  height: '42px',

                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'center',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                }}
                              >
                                <Text style={{ fontSize: 8 }}> {formdetails?.saoRelationshipDetailsNationality?.value || "N/A"}</Text>
                              </View>

                              <View
                                style={{
                                  height: '42px',
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
                                <Text style={{ fontSize: 8 }}> {formdetails?.saoSecondApplicantDetailsNationality?.value}</Text>
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
                                width: '20%',
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
                                  height: '20px',
                                }}
                              >
                                <Text style={{ fontSize: 8 }}>Other Nationality</Text>
                              </View>
                              <View
                                style={{

                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'flex-start',
                                  color: '#6E2585',
                                  flexDirection:"column",
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  gap:1,
                                  padding: 2,
                                }}
                              >
                                <View style={{ flexDirection:"row", gap:1}}>
                                <View style={styles.checkboxRow}>
                                                  <View style={[styles.smallCheckbox, { backgroundColor: formdetails?.saoRelationshipDetailsHasOtherNationality?.id===399 ? '#6E2585' : '' }]}>
                        </View>
                                      <Text style={{color:"#6E2585", fontSize:7}}>Yes, please specify: </Text>
                                    </View>
                                                       <Text style={{ ...styles.input, fontSize: 7 }}>{formdetails?.saoRelationshipDetailsOtherNationality}</Text></View>
                                <CheckBoxComp label="No"/>
                              </View>

                              <View
                                style={{

                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'flex-start',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  padding: 2,
                                }}
                              >
            <View style={{ flexDirection:"row", gap:1}}>
                                <View style={styles.checkboxRow}>
<View style={[styles.smallCheckbox, { backgroundColor: formdetails?.saoSecondApplicantDetailsHasOtherNationality?.id===399 ? '#6E2585' : '' }]}>
                        </View>
                                      <Text style={{color:"#6E2585", fontSize:7}}>Yes, please specify: </Text>
                                    </View>
                                                       <Text style={{ ...styles.input, fontSize: 7 }}>{formdetails?.saoSecondApplicantDetailsOtherNationality}</Text>
                                 </View>
                                <CheckBoxComp label="No"/>                  </View>
                            </View>















                            <View
                              style={{
                                // height: '150px',
                                // borderRight: '1px solid #6E2585',
                                fontSize: '10px',
                                borderTop: '1px solid #6E2585',
                                // borderBottom: '1px solid #6E2585',
                                borderLeft: '1px solid #6E2585',
                                width: '13%',
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
                                  height: '20px',
                                }}
                              >
                                <Text style={{ fontSize: 8 }}>ID/Resident Card</Text>
                              </View>
                              <View
                                style={{
                                  height: '42px',
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
                                <Text style={{ fontSize: 8 }}>{formdetails?.saoRelationshipDetailsIDResidentCard}</Text>
                              </View>

                              <View
                                style={{
                                  height: '42px',
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
                                <Text style={{ fontSize: 8 }}>{formdetails?.saoSecondApplicantDetailsIDResidentCard}</Text>
                              </View>
                            </View>

                            <View
                              style={{
                                // height: '150px',
                                borderRight: '1px solid #6E2585',
                                fontSize: '10px',
                                borderTop: '1px solid #6E2585',
                                // borderBottom: '1px solid #6E2585',
                                borderLeft: '1px solid #6E2585',
                                width: '10%',
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
                                  // padding: '4px',
                                  height: '20px',
                                }}
                              >
                                <Text style={{ fontSize:8 }}>Expiry Date</Text>
                              </View>
                              <View
                                style={{
                                  height: '42px',
                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'center',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  padding: '8px',
                                }}
                              >
                                <Text style={{ fontSize: 8 }}>
                                  {dayjs(formdetails?.saoRelationshipDetailsPerExpiryDate)?.format('DD/MM/YYYY')}
                                </Text>
                              </View>

                              <View
                                style={{
                                  height: '42px',
                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'center',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  padding: '8px',
                                }}
                              >
                                <Text style={{ fontSize: 8 }}>{dayjs(formdetails?.saoSecondApplicantDetailsPerExpiryDate).format("DD//MM/YYYY")}</Text>
                              </View>
                            </View>

                            <View
                              style={{
                                // height: '150px',
                                // borderRight: '1px solid #6E2585',
                                fontSize: '10px',
                                borderTop: '1px solid #6E2585',
                                // borderBottom: '1px solid #6E2585',
                                // borderLeft: '1px solid #6E2585',
                                width: '12%',
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
                                  // padding: '15px',
                                  height: '20px',
                                }}
                              >
                                <Text style={{ fontSize:8}}>Date of Birth</Text>
                              </View>
                              <View
                                style={{
                                  height: '42px',
                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'center',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  padding: '8px',
                                }}
                              >
                                <Text style={{ fontSize: 8 }}>{dayjs(formdetails?.saoRelationshipDetailsDateofBirth).format('DD//MM/YYYY')}</Text>
                              </View>

                              <View
                                style={{
                                  height: '42px',
                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'center',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  padding: '8px',
                                }}
                              >
                                <Text style={{ fontSize: 8 }}>{dayjs(formdetails?.saoSecondApplicantDetailsDateofBirth).format("DD/MM/YYYY")}</Text>
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
                                  // padding: '15px',
                                  height: '20px',
                                }}
                              >
                                <Text>Gender</Text>
                              </View>
                              <View
                                style={{
                                  height: '42px',
                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'center',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  padding: '8px',
                                }}
                              >
                                <View style={styles.fourthRow}>
                                  <View style={styles.checkboxRow}>
                                    <View style={[styles.smallCheckbox, { backgroundColor: '#6E2585' }]} />
                                                            <Text style={styles.secondLabel}>
                                                              {formdetails?.addAppSecAppDetTitle?.id === 506 ||
                                                              formdetails?.addAppSecAppDetTitle?.id === 507
                                                                ? 'F'
                                                                : 'M'}
                                                            </Text>
                                  </View>
                                </View>
                              </View>

                              <View
                                style={{
                                  height: '42px',
                                  // backgroundColor: '#C0C0C0',
                                  justifyContent: 'center',
                                  borderRight: 0,
                                  alignItems: 'center',
                                  color: '#6E2585',
                                  borderBottom: '1px solid #6E2585',
                                  width: '100%',
                                  padding: '8px',
                                }}
                              >
                                <View style={styles.fourthRow}>
                                  <View style={styles.checkboxRow}>
                                    <View style={[styles.smallCheckbox, { backgroundColor: '#6E2585' }]} />
                        <Text style={styles.secondLabel}>
                          {formdetails?.addAppSecAppDetTitle?.id === 506 ||
                          formdetails?.addAppSecAppDetTitle?.id === 507
                            ? 'F'
                            : 'M'}
                        </Text>
                                  </View>

    
                                </View>
                              </View>
                            </View>
                          </View>
          </View>
          <View style={{...styles.secondRow, justifyContent:"flex-end", alignItems:"flex-end"}}>
            <Text style={styles.arabicText}>سم الوكيل/ الوصي: </Text>
            <Text style={{ borderBottom: '1px solid black', width: '70%',...styles.arabicText  }}>{ formdetails?.saoBankingServicesSecondApplicantName}</Text>
          </View>

          <View style={{...styles.secondRow, justifyContent:"flex-end", alignItems:"flex-end"}}>
            <Text style={styles.arabicText}>رقم البطاقة الشخصية/ جواز السفر:</Text>
            <Text style={{ borderBottom: '1px solid black', width: '70%',...styles.arabicText }}>
              {formdetails?.saoRelationshipDetailsRelationshipCriteria?.value}
            </Text>
          </View>
          <View style={{ flexDirection: "row-reverse", gap: 3, justifyContent:"flex-end", alignItems:"flex-end" }}>
            <Text style={styles.arabicText}>تعليمات تشغيل الحساب:</Text>
          <CheckBoxComp label="Singly"/>
          </View>


          <View
            style={{
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <Text
              style={{
                ...styles.arabicTextHead,
                // marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              الوكيل/الوصي

            </Text>
            <View style={styles.column}>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: '10px' }}>
                <View style={styles.secondRow}>
                  <Text style={styles.arabicText}>اسم الوكيل/ الوصي:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '190px', marginLeft: 5 }}></Text>
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.arabicText }> رقم البطاقة الشخصية/ جواز السفر:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
                </View>
              </View>
              <View style={{...styles.secondRow, alignItems:"flex-end", justifyContent:"flex-end", textAlign:"right"}}>
                <Text style={styles.arabicText}>تاريخ انتهاء التوكيل:</Text>
                <Text style={{ borderBottom: '1px solid #6E2B8C', width: '420px' }}></Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',

              border: '1px solid #6E2585',
            }}
          >
            <Text
              style={{
                ...styles.arabicText,
                // marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              بطاقات الصراف اآللي
            </Text>
            <View style={{ flexDirection: 'row-reverse', gap: 5, marginTop: 3 }}>
              <View style={{ flexDirection: 'column', borderLeft: '1px solid #6E2585' }}>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-end',
                    gap:5
                    // gap: '20px',
                  }}
                >
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.arabicText}>أرجو/نرجو إصدار بطاقة الصراف اآللي لي/لنا</Text>
                  </View>

                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.arabicText}>أرجو/نرجو عدم إصدار بطاقة الصراف اآللي لي/لنا</Text>
                  </View>
                </View>
                {/* --------------------------------------------------------------------- */}

                {Array.from({ length: 2 })?.map((items: any, index: number) => (
                  <View style={{ flexDirection: 'column', gap: 2 }}>
                    <View style={styles.customRow}>
                      <Text style={{ ...styles.arabicText, paddingLeft: 2 }}>
                    {index+1}  اسمي الذي سيظهر على البطاقة كالتالي:
                      </Text>
                      <Text style={styles.arabicText}>(باللغة الإنجليزية فقط – 20 حرفًا)</Text>
                    </View>
                    <View>
                      <View key={index} style={{ flexDirection: 'row-reverse', marginBottom: 5 }}>
                        <View style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row-reverse' }}>
                          {Array.from({ length: 20 })
                            // items?.scrAccountNo
                            // ?.toString()
                            // ?.split('')
                            ?.map((item: any, ind: number) => {
                              const extraMargin = ind === 2 || ind === 10 ? 6 : 2;
                              return (
                                <View
                                  key={`${index}-${ind}`}
                                  style={{
                                    width: 17,
                                    height: 17,
                                    borderWidth: 1.5,
                                    borderColor: '#6E2B8C',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // marginRight: extraMargin,
                                    textAlign: 'center',
                                    paddingTop: 2,
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}> {item} </Text>
                                </View>
                              );
                            })}
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View style={{...styles.column,justifyContent:"space-between", alignItems:"flex-end" }}>
                <Text style={styles.arabicText}>بيانات حامل البطاقة اإلضافية</Text>
                <View style={styles.thirdRow}>
                  <Text style={styles.arabicText}>رقم البطاقة الشخصية/ جواز السفر:</Text>
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#6E2B8C',
                      width: 30,
                      marginTop: 4,
                    }}
                  ></Text>
                </View>

                <View style={styles.thirdRow}>
                  <Text style={styles.arabicText}>الحد المطلوب:</Text>
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#6E2B8C',
                      width: 90,
                      marginTop: 4,
                    }}
                  ></Text>
                </View>
                <Text style={styles.arabicText}>
                يتم تفعيل البطاقة من قبل حامل البطاقة األساسي
                </Text>
              </View>
            </View>
          </View>

          {/*  */}
          <View style={{ flexDirection: 'column', gap: '10px', marginTop: 60 }}>
            <Text
              style={{
                ...styles.arabicTextHead,
                // marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingRight: '5px',
              }}
            >
              بيانات مقدم الطلب األول
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2585',
                  width: '50%',
                  padding: 4,
                }}
              >
                <View style={styles.column}>
                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>مصدر الدخل:</Text>
                    <View style={styles.checkboxRow}>
                      <View
                        style={[
                          styles.smallCheckbox,
                          {
                            backgroundColor: '#6E2B8C',
                          },
                        ]}
                      ></View>
                      <Text style={styles.arabicText}>
                        {formdetails?.saoRelationshipDetailsSourceofIncome?.value || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  {formdetails?.saoRelationshipDetailsSourceofIncome?.value?.toLowerCase() === 'salary' && (
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                      <Text style={styles.arabicText}>القطاع (إذا كان مصدر الدخل - الراتب):</Text>
                      <View style={styles.checkboxRow}>
                        <View style={[styles.smallCheckbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.arabicText}>
                          {' '}
                          {formdetails?.saoRelationshipDetailsSectorifsalary?.value}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>جهة العمل:</Text>
                    <Text style={styles.input}> {formdetails?.saoRelationshipDetailsNameofEmployer || 'N/A'}</Text>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>الوظيفة: </Text>
                    <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText }}>
                      {' '}
                      {formdetails?.saoRelationshipDetailsNatureofBusiness || 'N/A'}
                    </Text>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>الرقم الوظيفي:</Text>
                    <Text style={{ borderBottom: '1px solid #6E2585', marginTop: 7, ...styles.arabicText }}>
                      {' '}
                      {formdetails?.saoRelationshipDetailsDesignation || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الرقم الوظيفي: </Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {' '}
                        {formdetails?.saoRelationshipDetailsEmployeeNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>تاريخ اإللتحاق بالعمل:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {dayjs(formdetails?.saoRelationshipDetailsDateofJoining)?.format('DD-MM-YYYY') || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم الجواز*:</Text>
                      <Text
                        style={{ borderBottom: '1px solid #6E2585', width: '70px', marginTop: 7, ...styles.arabicText }}
                      >
                        {formdetails?.saoRelationshipDetailsPassportNo}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>تاريخ انتهاءالجواز*:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', width: '50px', marginTop: 7 }}>
                        {dayjs(formdetails?.saoRelationshipDetailsPassportExpiryDate)?.format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>قم التأشيرة*:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsPassportNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}> تاريخ انتهاء التأشيرة*:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {dayjs(formdetails?.saoRelationshipDetailsPassportExpiryDate)?.format('DD-MM-YYYY') || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم الهاتف: </Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoRelationshipDetailsEmploymentTelephone || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}> فاكس:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsFax || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center', width: '100%' }}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الدخل الشهري:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsIncomepm || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}> مصدر دخل آخر:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsSourceofOtherIncome || 'N/A'}
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
                  color: '#6E2585',
                  borderTop: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '50%',
                  padding: 2,
                }}
              >
                <View style={styles.column}>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>ص. ب:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoRelationshipDetailsPOBox || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الرمز البريدي:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoRelationshipDetailsPostalCode || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={styles.customRow}>
                      <Text style={styles.secondLabel}>House No./Flat No.:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', width: '170px', marginTop: 7 }}></Text>
                    </View> */}

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم المنزل / الشقة:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsHouseNoFlatNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم البناية:.</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoRelationshipDetailsBuildingNo || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم السكة:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsWayNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>المنطقة:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsArea || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الولاية</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsWilayat || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم هاتف المنزل:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsResTelNo || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>هاتف نقال (1): </Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsMobile1 || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>هاتف نقال (2):</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoRelationshipDetailsMobile2 || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>البريد اإللكتروني : </Text>
                    <Text
                      style={{
                        borderBottom: '1px solid #6E2585',
                        ...styles.arabicText,
                        marginTop: 7,
                        marginRight: 5,
                        ...styles.arabicText,
                      }}
                    >
                      {formdetails?.saoRelationshipDetailsEmail || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>العنوان الدائم (الموطن الأصلي):</Text>
                    <Text
                      style={{
                        borderBottom: '1px solid #6E2585',
                        ...styles.arabicText,
                        marginTop: 7,
                        marginRight: 5,
                        ...styles.arabicText,
                      }}
                    >
                      {formdetails?.saoRelationshipDetailsPermanentAddressHomeCountry || 'N/A'}
                    </Text>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>هاتف المنزل:</Text>
                    <Text
                      style={{ borderBottom: '1px solid #6E2585', marginTop: 7, marginRight: 5, ...styles.arabicText }}
                    >
                      {formdetails?.saoRelationshipDetailsContactTelephone || 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/*  */}

          <View style={{ flexDirection: 'column', gap: '10px', marginTop: 60 }}>
            <Text
              style={{
                ...styles.arabicTextHead,
                // marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingRight: '5px',
              }}
            >
              بيانات مقدم الطلب الثاني
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2585',
                  width: '50%',
                  padding: 4,
                }}
              >
                <View style={styles.column}>
                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>مصدر الدخل:</Text>
                    <View style={styles.checkboxRow}>
                      <View
                        style={[
                          styles.smallCheckbox,
                          {
                            backgroundColor: '#6E2B8C',
                          },
                        ]}
                      ></View>
                      <Text style={styles.arabicText}>
                        {formdetails?.saoSecondApplicantDetailsSourceofIncome?.value || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  {formdetails?.saoRelationshipDetailsSourceofIncome?.value?.toLowerCase() === 'salary' && (
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                      <Text style={styles.arabicText}>القطاع (إذا كان مصدر الدخل - الراتب):</Text>
                      <View style={styles.checkboxRow}>
                        <View style={[styles.smallCheckbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.arabicText}>
                          {' '}
                          {formdetails?.saoSecondApplicantDetailsSectorifsalary?.value}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>جهة العمل:</Text>
                    <Text style={styles.input}> {formdetails?.saoRelationshipDetailsNameofEmployer || 'N/A'}</Text>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>الوظيفة: </Text>
                    <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText }}>
                      {' '}
                      {formdetails?.saoSecondApplicantDetailsNatureofBusiness || 'N/A'}
                    </Text>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>الرقم الوظيفي:</Text>
                    <Text style={{ borderBottom: '1px solid #6E2585', marginTop: 7, ...styles.arabicText }}>
                      {' '}
                      {formdetails?.saoSecondApplicantDetailsDesignation || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الرقم الوظيفي: </Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {' '}
                        {formdetails?.saoSecondApplicantDetailsEmployeeNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>تاريخ اإللتحاق بالعمل:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {dayjs(formdetails?.saoSecondApplicantDetailsDateofJoining)?.format('DD-MM-YYYY') || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم الجواز*:</Text>
                      <Text
                        style={{ borderBottom: '1px solid #6E2585', width: '70px', marginTop: 7, ...styles.arabicText }}
                      >
                        {formdetails?.saoSecondApplicantDetailsPassportNo}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>تاريخ انتهاءالجواز*:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', width: '50px', marginTop: 7 }}>
                        {dayjs(formdetails?.saoSecondApplicantDetailsPassportExpiryDate)?.format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>قم التأشيرة*:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsPassportNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}> تاريخ انتهاء التأشيرة*:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {dayjs(formdetails?.saoSecondApplicantDetailsPassportExpiryDate)?.format('DD-MM-YYYY') || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم الهاتف: </Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoSecondApplicantDetailsEmploymentTelephone || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}> فاكس:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsFax || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center', width: '100%' }}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الدخل الشهري:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsIncomepm || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}> مصدر دخل آخر:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsSourceofOtherIncome || 'N/A'}
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
                  color: '#6E2585',
                  borderTop: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '50%',
                  padding: 2,
                }}
              >
                <View style={styles.column}>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>ص. ب:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoSecondApplicantDetailsPOBox || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الرمز البريدي:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoSecondApplicantDetailsPostalCode || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={styles.customRow}>
                      <Text style={styles.secondLabel}>House No./Flat No.:</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', width: '170px', marginTop: 7 }}></Text>
                    </View> */}

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم المنزل / الشقة:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsHouseNoFlatNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم البناية:.</Text>
                      <Text style={{ borderBottom: '1px solid #6E2585', ...styles.arabicText, marginTop: 7 }}>
                        {formdetails?.saoSecondApplicantDetailsBuildingNo || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم السكة:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsWayNo || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>المنطقة:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsArea || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>الولاية</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsWilayat || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>رقم هاتف المنزل:</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsResTelNo || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>هاتف نقال (1): </Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsMobile1 || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.customRow}>
                      <Text style={styles.arabicText}>هاتف نقال (2):</Text>
                      <Text
                        style={{
                          borderBottom: '1px solid #6E2585',
                          ...styles.arabicText,
                          marginTop: 7,
                          ...styles.arabicText,
                        }}
                      >
                        {formdetails?.saoSecondApplicantDetailsMobile2 || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>البريد اإللكتروني : </Text>
                    <Text
                      style={{
                        borderBottom: '1px solid #6E2585',
                        ...styles.arabicText,
                        marginTop: 7,
                        marginRight: 5,
                        ...styles.arabicText,
                      }}
                    >
                      {formdetails?.saoSecondApplicantDetailsEmail || 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>العنوان الدائم (الموطن الأصلي):</Text>
                    <Text
                      style={{
                        borderBottom: '1px solid #6E2585',
                        ...styles.arabicText,
                        marginTop: 7,
                        marginRight: 5,
                        ...styles.arabicText,
                      }}
                    >
                      {formdetails?.saoSecondApplicantDetailsPermanentAddressHomeCountry || 'N/A'}
                    </Text>
                  </View>

                  <View style={styles.customRow}>
                    <Text style={styles.arabicText}>هاتف المنزل:</Text>
                    <Text
                      style={{ borderBottom: '1px solid #6E2585', marginTop: 7, marginRight: 5, ...styles.arabicText }}
                    >
                      {formdetails?.saoSecondApplicantDetailsContactTelephone || 'N/A'}
                    </Text>
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
                ...styles.arabicTextHead,
                // marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                marginTop: 10,
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              الخدمة المصرفية المطلوبة
            </Text>
            <View style={styles.rowFav}>
              <View style={{ flexDirection: 'column', width: '60%', paddingRight: 5 }}>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text style={styles.arabicText}> دفتر شيكات</Text>
                  </View>
                  <View style={styles.rowFav}>
                    <Text style={styles.arabicText}>{formdetails?.saoBankingServicesChequeBook?.value}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text style={styles.arabicText}>إشعارات بالبريد اإللكتروني لعمليات الحساب</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text style={styles.arabicText}>اشعار بالرسائل القصيرة لعمليات الحساب:</Text>
                  </View>
                  <View style={styles.rowFav}>
                    <View style={styles.checkboxRow}>
                      <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                      <Text style={styles.arabicText}>
                        {formdetails?.saoBankingServicesSMSAlertsforAccountTransaction?.value}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginTop: 10,
              gap: 5,
            }}
          >
            <Text
              style={{
                ...styles.arabicText,

                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingRight: '5px',
              }}
            >
              نوع كشف الحساب والتكرار
            </Text>
            <View style={styles.rowFav}>
              <View style={{ flexDirection: 'column', width: '60%', paddingRight: 5 }}>
                <View>
                  <Text style={styles.arabicText}>التكرار الحالي:</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.arabicText}>البريد (نصف سنوي)</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.arabicText}>تغيير التكرار لكشف الحساب المطبوع - يرجى التحديد:</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'column', padding: 2 }}></View>

              <View
                style={{
                  flexDirection: 'column',
                  width: '60%',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  paddingRight: 5,
                }}
              >
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginLeft: 5 }}>
                  <Text style={styles.arabicText}>✓ البريد(نصف سنوي)</Text>
                </View>

                <View style={styles.rowFav}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text>{formdetails?.saoBankingServicesChangesinPrintedFrequency?.value}</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'column', width: '60%', paddingRight: 5 }}>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginLeft: 5 }}>
                  <Text style={styles.arabicText}>✓ بريد إلكتروني (شهرياً)</Text>
                </View>

                <View style={styles.rowFav}>
                  <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2585' }]}></View>
                    <Text>{formdetails?.saoBankingServicesChangesinEmailFrequency?.value}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>


          <View style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 40 }}>
            <View
              style={{
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                borderRight: '1px solid #6E2585',
                // borderBottom: '1px solid #6E2585',
                width: '33.3333333333%',
              }}
            >
              <View
                style={{
                  height: '30px',
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
                <Text style={styles.arabicText}>اإلسم </Text>
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
                <Text style={styles.arabicText}>مقدم الطلب األول</Text>
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
                <Text style={styles.arabicText}>مقدم الطلب الثاني (للحساب المشترك)</Text>
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
                <Text style={styles.arabicText}>التوقيع / البصمة</Text>
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
                  <Text style={styles.arabicText}> {items?.ctdCardholderMerchantName}</Text>
                </View>
              ))}
            </View>
            <View
              style={{
                // height: '150px',
                // borderLeft: '1px solid #6E2585',
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
                <Text style={styles.arabicText}>تم التحقق من التوقيع/البصمة (للاستخدام البنك فقط)</Text>
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
                  <Text style={styles.arabicText}>{items?.ctdCardholderAmount}</Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              // flexDirection:"row-reverse",

              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: '60px',
              backgroundColor: '#FFFACD',
              padding: '5px',
              gap: 5,
            }}
          >
            <Text style={styles.arabicText}>الستخدام البنك فقط</Text>

            <View style={styles.column}>
              <Text style={styles.arabicText}>
                {' '}
                قائمة المستندات المستلمة والتي تم التحقق منها حسب قائمة الفحص األصلية/ KYC
              </Text>
              {/*  */}
              <View>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <View
                      style={{
                        height: 'auto',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        borderRight: '1px solid #6E2585',
                        width: '20%',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'right',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',

                                ...styles.arabicText,
                              }}
                            >
                              بطاقة اإلقامة للعميل
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              جواز سفر العميل
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'right',
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'column',
                                gap: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  fontWeight: 'extrabold',
                                  ...styles.arabicText,
                                }}
                              >
                                البطاقة الشخصية لمواطني دول مجل التعاون
                              </Text>
                            </View>
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
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              بطاقة نموذج التوقيع
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              صورتان للعمالء من ذوي االحتياجات الخاصة
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              مقابلة العميل شخصي
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 'auto',
                        borderLeft: '1px solid #6E2585',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        width: '45%',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              سند وكالة
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              نسخ من التفويض األصلي من حامل الحساب
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              شهادة ميلاد (لحساب القُصَّر فقط){' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row-reverse' }}>
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
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              لعائد الشهري على الحساب :
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

                        borderLeft: '1px solid #6E2585',
                        width: '45%',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-end',
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
                              flexDirection: 'row-reverse',
                              alignItems: 'center',
                              gap: 2,
                              justifyContent: 'space-between',
                              textAlign: 'center',
                            }}
                          >
                            <View style={styles.smallCheckbox}></View>
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                ...styles.arabicText,
                              }}
                            >
                              تأشيرة العميل
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {/*  */}
              <View style={{ flexDirection: 'row-reverse', gap: 10, alignItems: 'center' }}>
                <Text style={styles.arabicText}>تصنيف العميل :</Text>
                <View style={styles.row}>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.arabicText}>عام</Text>
                  </View>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.arabicText}>متوسط الدخل</Text>
                  </View>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.arabicText}>عالي الدخل </Text>
                  </View>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.arabicText}>كبار الشخصيات</Text>
                  </View>
                </View>
              </View>
              {/*  */}
              <View>
                <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <View
                    style={{
                      height: 'auto',
                      fontSize: '10px',
                      borderTop: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
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
                      <Text style={styles.arabicText}> الستخدام الفرع</Text>
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
                      <Text style={styles.arabicText}> الستخدام العمليات</Text>
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
                        justifyContent: 'flex-end',
                        borderBottom: '1px solid #6E2585',

                        alignItems: 'flex-end',
                        color: '#6E2585',
                        height: '30px',
                        width: '100%',
                        padding: '7px',
                      }}
                    >
                      <Text style={styles.arabicText}>تمت المراجعة بواسطة</Text>
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
                      borderLeft: '1px solid #6E2585',
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
                        justifyContent: 'flex-end',
                        borderBottom: '1px solid #6E2585',

                        alignItems: 'flex-end',
                        color: '#6E2585',
                        height: '30px',
                        width: '100%',
                        padding: '7px',
                      }}
                    >
                      <Text style={styles.arabicText}>تم التحقق من البيانات المقدمة واعتمدت من قبل</Text>
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
                </View>
              </View>
              {/*  */}
            </View>
            <View style={styles.customRow}>
              <View style={styles.customRow}>
                <Text style={styles.arabicText}>اسم الموظف PBO/DSR:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '150px', marginTop: 7 }}></Text>
              </View>
              <View style={styles.customRow}>
                <Text style={styles.arabicText}>الرقم الوظيفي:</Text>
                <Text style={{ borderBottom: '1px solid #6E2585', width: '150px', marginTop: 7 }}></Text>
              </View>
            </View>
          </View>

          <PDFTermsAndCondition data={termsConditionData} direction='rtl'/>
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <Text
                  style={{ borderBottomWidth: 1, borderBottomColor: '#6E2B8C', color: '#6E2B8C', width: '100px' }}
                ></Text>
                <Text style={{ fontSize: 8 }}>Customer Name</Text>
              </View>
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <Text
                  style={{ borderBottomWidth: 1, borderBottomColor: '#6E2B8C', color: '#6E2B8C', width: '100px' }}
                ></Text>
                <Text style={{ fontSize: 8 }}>Customer Signature</Text>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
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
        </View>
      </View>
      <PdfFooter />
    </Page>
  );
}
