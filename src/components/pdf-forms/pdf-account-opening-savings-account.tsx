'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { bgcolor, flexbox, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
// import DinFont from '../../font/DinTextARRegular.otf'; // Double-check the path

// import Din from '../../font/DinTextARRegular.otf';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { ArabicAccountOpeningSavingsFormPDFProps } from './pdf-arabic-forms/pdf-account-saving-form';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PDFTermsAndCondition } from './sections/pdf-terms-condition';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.
Font.register({
  family: 'Amiri',
  src: 'https://fonts.gstatic.com/s/amiri/v8/wXG5Bltw6Qmj8zJm8jxZ5Q.woff2', // Use a web-hosted font as a test
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    // width: '80px ',
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
    marginTop: 'auto',

    paddingLeft: 5,

    // gap: 5,
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
  arabicText: {
    fontFamily: 'Amiri',
    fontSize: 20,
    textAlign: 'right', // Right align Arabic text
    direction: 'rtl', // Right-to-left direction for Arabic text
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}
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
export function AccountOpeningSavingsFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt)?.format('DDMMYYYY');

  // const breakTextEveryNChars = (str = '', n = 110) =>
  // str.replace(new RegExp(`(.{${n}})`, 'g'), '$1\n');
  const breakTextIntoLines = (str = '', n = 110) => {
    const regex = new RegExp(`.{1,${n}}`, 'g');
    return str.match(regex) || [];
  };
  const lines = breakTextIntoLines(formdetails?.saoBankingServicesSecondApplicantName, 100);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
            <View style={styles.row}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.inputLine}>{formdetails?.saoRelationshipDetailsBranch?.value}</Text>
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
                    <CheckBoxComp
                      label={formdetails?.saoRelationshipDetailsCIFType?.value}
                      val={formdetails?.saoRelationshipDetailsCIFType?.value}
                    />
                  </View>
                </View>
              </View>

              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.thirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Account Currency:</Text>
                  </View>
                  <View style={{ width: '100px' }}>
                    <CheckBoxComp
                      label={formdetails?.saoRelationshipDetailsCurrency?.value}
                      val={formdetails?.saoRelationshipDetailsCurrency?.value}
                    />
                  </View>
                </View>
              </View>
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.thirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Relationship Criteria:</Text>
                  </View>
                  <View style={{ width: '100px' }}>
                    <CheckBoxComp
                      label={formdetails?.saoRelationshipDetailsRelationshipCriteria?.value}
                      val={formdetails?.saoRelationshipDetailsRelationshipCriteria?.value}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column', gap: '3px', border: '0.5 px solid #6E2585' }}>
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

              <View style={styles.column}>
                <Text style={{ ...styles.secondLabel, paddingHorizontal: 2 }}>
                  Name(s) of Additional Applicant(s) - as per ID Card
                </Text>
                <View style={[{ flexDirection: 'row', gap: 5, width: '100%', marginLeft: 15 }]}>
                  <Text style={{ width: '5%' }}>Title</Text>
                  <Text style={{ width: '31.6666666667%' }}>First Name</Text>
                  <Text style={{ width: '31.6666666667%' }}>Second Name</Text>
                  <Text style={{ width: '31.6666666667%' }}>Surname/Tribe</Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 3, paddingLeft: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Text>1.</Text>
                    <View style={[{ gap: 5, flexDirection: 'row', paddingLeft: 2, alignItems: 'flex-start' }]}>
                      <View style={{ width: '5%', textAlign: 'center', fontSize: 8 }}>
                        <InputComp inputOne=" " outputOne={formdetails?.saoRelationshipDetailsTitle?.value || 'N/A'} />
                      </View>
                      <View style={{ width: '31.6666666667%', fontSize: 8 }}>
                        <InputComp
                          inputSix=" "
                          outputSix={formdetails?.saoRelationshipDetailsFirstName || 'N/A'}
                          n={30}
                        />
                      </View>

                      <View style={{ width: '31.6666666667%' }}>
                        <InputComp
                          inputSix=" "
                          outputSix={formdetails?.saoRelationshipDetailsSecondName || 'N/A'}
                          n={30}
                        />
                      </View>
                      <View style={{ width: '31.6666666667%' }}>
                        <InputComp
                          inputSix=" "
                          outputSix={formdetails?.saoRelationshipDetailsSurnameTribe || 'N/A'}
                          n={30}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Text>2.</Text>
                    <View style={[{ flexDirection: 'row', gap: 5, width: '100%', paddingLeft: 2 }]}>
                      <View style={{ width: '5%', textAlign: 'center' }}>
                        <InputComp
                          inputOne=" "
                          outputOne={formdetails?.saoSecondApplicantDetailsTitle?.value || 'N/A'}
                        />
                      </View>
                      <View style={{ width: '31.6666666667%' }}>
                        <InputComp
                          inputSix=" "
                          outputSix={formdetails?.saoSecondApplicantDetailsFirstName || 'N/A'}
                          n={30}
                        />
                      </View>
                      <View style={{ width: '31.6666666667%' }}>
                        <InputComp
                          inputSix=" "
                          outputSix={formdetails?.saoSecondApplicantDetailsSecondName || 'N/A'}
                          n={30}
                        />
                      </View>
                      <View style={{ width: '31.6666666667%' }}>
                        <InputComp
                          inputSix=" "
                          outputSix={formdetails?.saoSecondApplicantDetailsSurnameTribe || 'N/A'}
                          n={30}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{ flexDirection: 'column', borderTop: '1px solid #6E2585', borderBottom: '1px solid #6E2585' }}
              >
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: '10px' }}></Text>
                  </View>

                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585' }}>Nationality</Text>
                  </View>

                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585' }}>{`Any Other\nNationality`}</Text>
                  </View>

                  <View style={{ width: '14.28571428575%', padding: 2, backgroundColor: '#C0C0C0' }}>
                    <Text style={{ textAlign: 'center', color: '#6E2585' }}>ID/Resident Card </Text>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderLeft: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585' }}>Expiry Date</Text>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585' }}>Date of Birth</Text>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      backgroundColor: '#C0C0C0',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585' }}>Gender</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>Applicant 1</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {formdetails?.saoRelationshipDetailsNationality?.value || 'N/A'}
                    </Text>
                  </View>

                  {/* <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      <InputComp inputSix=" " outputSix={formdetails?.saoRelationshipDetailsOtherNationality} n={7}/>
                    </Text>
                  </View> */}
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {formdetails?.saoRelationshipDetailsOtherNationality || 'N/A'}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <InputComp inputSeven=" " outputSeven={formdetails?.saoRelationshipDetailsIDResidentCard} n={12} />
                  </View>

                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderTop: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {dayjs(formdetails?.saoRelationshipDetailsPerExpiryDate)?.format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {dayjs(formdetails?.saoRelationshipDetailsDateofBirth).format('DD//MM/YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ fontSize: 8, textAlign: 'center' }}>
                      {[506, 507].includes(formdetails?.addAppSecAppDetTitle?.id) ? 'F' : 'M'}
                    </Text>
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {formdetails?.addAppSecAppDetTitle?.value}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>Applicant 2</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {formdetails?.saoSecondApplicantDetailsNationality?.value || 'N/A'}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {formdetails?.saoSecondApplicantDetailsOtherNationality || 'N/A'}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <InputComp inputSeven=" " outputSeven={formdetails?.saoSecondApplicantDetailsIDResidentCard} n={12} />
                  </View>

                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderTop: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {dayjs(formdetails?.saoSecondApplicantDetailsPerExpiryDate)?.format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {dayjs(formdetails?.saoSecondApplicantDetailsDateofBirth).format('DD//MM/YYYY')}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '14.2857142857%',
                      padding: 2,
                      borderRight: '1px solid #6E2585',
                      borderTop: '1px solid #6E2585',
                    }}
                  >
                    <Text style={{ fontSize: 8, textAlign: 'center' }}>
                      {[506, 507].includes(formdetails?.addAppSecAppDetTitle?.id) ? 'F' : 'M'}
                    </Text>
                    <Text style={{ textAlign: 'center', color: '#6E2585', fontSize: 8 }}>
                      {formdetails?.addAppSecAppDetTitle?.value}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingHorizontal: 2 }}>
                <InputComp
                  n={110}
                  inputSix="Account Name (if joint):"
                  outputSix={formdetails?.saoBankingServicesSecondApplicantName || 'N/A'}
                />
              </View>
              <View style={{ paddingHorizontal: 2 }}>
                <InputComp
                  inputOne="Type of Relationship:"
                  outputOne={formdetails?.saoRelationshipDetailsRelationshipCriteria?.value || 'N/A'}
                />
              </View>

              <View style={{ ...styles.secondRow, gap: 10, marginBottom: 2 }}>
                <Text style={styles.secondLabel}>Instruction for Account Operation:</Text>
                <CheckBoxComp
                  label={formdetails?.addAppRelationshipDetailsInstructionforAccountOperation}
                  val={formdetails?.addAppRelationshipDetailsInstructionforAccountOperation}
                />
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
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                ATTORNEY/GUARDIAN
              </Text>
              <View style={styles.column}>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>Name of Attorney/Guardian:</Text>
                    <Text style={{ borderBottom: '1px solid #6E2B8C', width: '190px', marginLeft: 5 }}></Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>ID/PP No.:</Text>
                    <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
                  </View>
                </View> */}
                <InputComp
                  inputOne="Name of Attorney/Guardian:"
                  inputTwo="ID/PP No.:"
                  outputOne={formdetails?.addAppRelationshipDetailsNameofAttorneyGuardian || 'N/A'}
                  outputTwo={formdetails?.addAppRelationshipDetailsNameofAttorneyGuardian || 'N/A'}
                />
                <View style={styles.secondRow}>
                  {/* <Text style={styles.secondLabel}>Power of Attorney Expiry Date:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '420px' }}></Text> */}
                  <InputComp
                    inputOne="Power of Attorney Expiry Date:"
                    outputOne={
                      dayjs(formdetails?.addAppRelationshipDetailsPowerofAttorneyExpiryDate).format('DD/MM/YYYY') ||
                      'N/A'
                    }
                  />
                </View>
              </View>
            </View>

            {/* <View
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
                ATTORNEY/GUARDIAN
              </Text>
              <View style={styles.column}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>Name of Attorney/Guardian:</Text>
                    <Text style={{ borderBottom: '1px solid #6E2B8C', width: '190px', marginLeft: 5 }}>{}</Text>
                  </View>
                  <View style={styles.secondRow}>
                    <Text style={styles.secondLabel}>ID/PP No.:</Text>
                    <Text style={{ borderBottom: '1px solid #6E2B8C', width: '200px' }}></Text>
                  </View>
                </View>
                <View style={styles.secondRow}>
                  <Text style={styles.secondLabel}>Power of Attorney Expiry Date:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2B8C', width: '420px' }}></Text>
                </View>
              </View>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'column',

                border: '1px solid #6E2585',
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
                ATM CARDS
              </Text>
              <View style={{ flexDirection: 'row', gap: 5, marginTop: 3 }}>
                <View style={{ flexDirection: 'column', borderRight: '1px solid #6E2585' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Power of Attorney Expiry Date:</Text>
                    </View>

                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Please do not issue me/us a Debit Card</Text>
                    </View>
                  </View>

                  {Array.from({ length: 2 })?.map((items: any, index: number) => (
                    <View style={{ flexDirection: 'column', gap: 2 }}>
                      <View style={styles.customRow}>
                        <Text style={{ fontSize: 9, color: '#6E2585', paddingLeft: 2 }}>
                          Additional Applicant {index + 1} Name-Supplementary Card:
                        </Text>
                        <Text style={{ fontSize: 8, color: '#6E2585' }}>(English only: max 20 characters)</Text>
                      </View>
                      <View>
                        <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                          <View style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
                            {Array.from({ length: 20 })
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
                <View style={styles.column}>
                  <Text style={styles.secondLabel}>Supplementary Cardholder’s Details</Text>
                  <View style={styles.thirdRow}>
                    <Text style={styles.secondLabel}>ID/PP No.:</Text>
                    <Text
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#6E2B8C',
                        width: 130,
                        marginTop: 4,
                      }}
                    ></Text>
                  </View>

                  <View style={styles.thirdRow}>
                    <Text style={styles.secondLabel}>Limit to be assigned:</Text>
                    <Text
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#6E2B8C',
                        width: 90,
                        marginTop: 4,
                      }}
                    ></Text>
                  </View>
                  <Text style={{ fontSize: 6, color: '#6E2585' }}>
                    Supplementary card to be activated by principal cardholder
                  </Text>
                </View>
              </View>
            </View> */}

            {/*  */}
          </View>
        </View>
      </Page>
      <Page style={styles.page} size="A4">
        {/* <View
          style={{
            flexDirection: 'column',

            border: '1px solid #6E2585',
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
            <View style={{ flexDirection: 'column', borderRight: '1px solid #6E2585' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={styles.checkboxRow}>
                  <View style={styles.checkbox} />
                  <Text style={styles.secondLabel}>Power of Attorney Expiry Date:</Text>
                </View>

                <View style={styles.checkboxRow}>
                  <View style={styles.checkbox} />
                  <Text style={styles.secondLabel}>Please do not issue me/us a Debit Card</Text>
                </View>
              </View>

              {Array.from({ length: 2 })?.map((items: any, index: number) => (
                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <View style={styles.customRow}>
                    <Text style={{ fontSize: 9, color: '#6E2585', paddingLeft: 2 }}>
                      Additional Applicant {index + 1} Name-Supplementary Card:
                    </Text>
                    <Text style={{ fontSize: 8, color: '#6E2585' }}>(English only: max 20 characters)</Text>
                  </View>
                  <View>
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <View style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
                        {Array.from({ length: 20 })

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
            <View style={styles.column}>
              <Text style={styles.secondLabel}>Supplementary Cardholder’s Details</Text>
              <View style={styles.thirdRow}>
                <Text style={styles.secondLabel}>ID/PP No.:</Text>
                <Text
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#6E2B8C',
                    width: 130,
                    marginTop: 4,
                  }}
                ></Text>
              </View>

              <View style={styles.thirdRow}>
                <Text style={styles.secondLabel}>Limit to be assigned:</Text>
                <Text
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#6E2B8C',
                    width: 90,
                    marginTop: 4,
                  }}
                ></Text>
              </View>
              <Text style={{ fontSize: 6, color: '#6E2585' }}>
                Supplementary card to be activated by principal cardholder
              </Text>
            </View>
          </View>
        </View> */}
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
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
            FIRST APPLICANT DETAILS
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
                  <CheckBoxComp
                    label={formdetails?.saoRelationshipDetailsSourceofIncome?.value}
                    val={formdetails?.saoRelationshipDetailsSourceofIncome?.value}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Sector (if salary): </Text>
                  <CheckBoxComp
                    label={formdetails?.saoRelationshipDetailsSectorifsalary?.value}
                    val={formdetails?.saoRelationshipDetailsSectorifsalary?.value}
                  />
                </View>
                <InputComp
                  inputSix="Name of the Employer:"
                  n={35}
                  outputSix={formdetails?.saoRelationshipDetailsNameofEmployer || 'N/A'}
                />
                <InputComp
                  inputOne="Nature of Business:"
                  outputOne={formdetails?.saoRelationshipDetailsNatureofBusiness || 'N/A'}
                />
                <InputComp
                  inputOne="Designation:"
                  outputOne={formdetails?.saoRelationshipDetailsDesignation || 'N/A'}
                />
                <InputComp
                  inputOne="Employee No.:"
                  inputTwo="Date of Joining:"
                  outputOne={formdetails?.saoRelationshipDetailsEmployeeNo || 'N/A'}
                  outputTwo={dayjs(formdetails?.saoRelationshipDetailsDateofJoining)?.format('DD-MM-YYYY')}
                />
                <InputComp
                  inputOne="Income p.m"
                  inputTwo="Passport Expiry Date*:"
                  outputOne={formdetails?.saoRelationshipDetailsIncomepm?.value || 'N/A'}
                  outputTwo={dayjs(formdetails?.saoRelationshipDetailsPassportExpiryDate)?.format('DD-MM-YYYY')}
                />
                <InputComp
                  inputOne="Telephone:"
                  inputTwo="Fax:"
                  outputOne={formdetails?.saoRelationshipDetailsEmploymentTelephone || 'N/A'}
                  outputTwo={formdetails?.saoRelationshipDetailsFax || 'N/A'}
                />
                <InputComp
                  inputOne="Passport No.*:"
                  outputOne={formdetails?.saoRelationshipDetailsPassportNo || 'N/A'}
                />
                <InputComp
                  inputOne="Source of Other Income:"
                  outputOne={formdetails?.saoRelationshipDetailsSourceofOtherIncome || 'N/A'}
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
                  inputOne="P.O Box:"
                  inputTwo="Postal Code"
                  outputOne={formdetails?.saoRelationshipDetailsPOBox || 'N/A'}
                  outputTwo={formdetails?.saoRelationshipDetailsPostalCode?.value || 'N/A'}
                />
                <InputComp
                  inputOne="House No./Flat No.:"
                  inputTwo="Building No.:"
                  outputOne={formdetails?.saoRelationshipDetailsHouseNoFlatNo || 'N/A'}
                  outputTwo={formdetails?.saoRelationshipDetailsBuildingNo || 'N/A'}
                />
                <InputComp
                  inputOne="Way No.:"
                  inputTwo="Area:"
                  outputOne={formdetails?.saoRelationshipDetailsWayNo || 'N/A'}
                  outputTwo={formdetails?.saoRelationshipDetailsArea || 'N/A'}
                />
                <InputComp
                  inputOne="Wilayat:"
                  inputTwo="Res. Tel. No.:"
                  outputOne={formdetails?.saoRelationshipDetailsWilayat?.value || 'N/A'}
                  outputTwo={formdetails?.saoRelationshipDetailsResTelNo || 'N/A'}
                />
                <InputComp
                  inputOne="Mobile (1):"
                  inputTwo="Mobile (2):"
                  outputOne={formdetails?.saoRelationshipDetailsMobile1 || 'N/A'}
                  outputTwo={formdetails?.saoRelationshipDetailsMobile2 || 'N/A'}
                />
                {/* <InputComp inputOne="Email" outputOne={formdetails?.addAppRelationshipDetailsEmail || 'N/A'} /> */}
                <InputComp
                  inputSix="Permanent Address (Home Country):"
                  n={30}
                  outputSix={formdetails?.saoRelationshipDetailsPermanentAddressHomeCountry || 'N/A'}
                />
                {/* <Text style={{fontSize:8,color:'#6E2585'}}>Permanent Address (Home Country):</Text> */}
                <InputComp inputOne="Email" outputOne={formdetails?.saoRelationshipDetailsEmail || 'N/A'} />
                <InputComp
                  inputOne="Telephone:"
                  outputOne={formdetails?.saoRelationshipDetailsContactTelephone || 'N/A'}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', marginTop: 5 }}>
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
                  <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Source of Income:</Text>
                  <CheckBoxComp
                    label={formdetails?.saoSecondApplicantDetailsSourceofIncome?.value}
                    val={formdetails?.saoSecondApplicantDetailsSourceofIncome?.value}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Sector (if salary): </Text>
                  <CheckBoxComp
                    label={formdetails?.saoSecondApplicantDetailsSectorifsalary?.value}
                    val={formdetails?.saoSecondApplicantDetailsSectorifsalary?.value}
                  />
                </View>
                <InputComp
                  inputSix="Name of the Employer:"
                  n={35}
                  outputSix={formdetails?.saoSecondApplicantDetailsNameofEmployer || 'N/A'}
                />
                <InputComp
                  inputOne="Nature of Business:"
                  outputOne={formdetails?.saoSecondApplicantDetailsNatureofBusiness || 'N/A'}
                />
                <InputComp
                  inputOne="Designation:"
                  outputOne={formdetails?.saoSecondApplicantDetailsDesignation || 'N/A'}
                />
                <InputComp
                  inputOne="Employee No.:"
                  inputTwo="Date of Joining:"
                  outputOne={formdetails?.saoSecondApplicantDetailsEmployeeNo || 'N/A'}
                  outputTwo={
                    formdetails?.addAppAppDetDateofJoining
                      ? dayjs(formdetails?.saoSecondApplicantDetailsDateofJoining)?.format('DD-MM-YYYY')
                      : 'N/A'
                  }
                />
                <InputComp
                  inputTwo="Passport Expiry Date*:"
                  inputOne="Income p.m"
                  outputOne={formdetails?.saoSecondApplicantDetailsIncomepm?.value || 'N/A'}
                  outputTwo={
                    dayjs(formdetails?.saoSecondApplicantDetailsPassportExpiryDate)?.format('DD-MM-YYYY') || 'N/A'
                  }
                />
                <InputComp
                  inputOne="Telephone:"
                  inputTwo="Fax:"
                  outputOne={formdetails?.saoSecondApplicantDetailsTelephone || 'N/A'}
                  outputTwo={formdetails?.saoSecondApplicantDetailsFax || 'N/A'}
                />
                <InputComp
                  outputOne={formdetails?.saoSecondApplicantDetailsPassportNo || 'N/A'}
                  inputOne="Passport No.*:"
                />
                <InputComp
                  inputOne="Source of Other Income:"
                  outputOne={formdetails?.saoSecondApplicantDetailsSourceofOtherIncome || 'N/A'}
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
                  inputOne="P.O Box:"
                  inputTwo="Postal Code"
                  outputOne={formdetails?.saoSecondApplicantDetailsPOBox || 'N/A'}
                  outputTwo={formdetails?.saoSecondApplicantDetailsPostalCode?.value || 'N/A'}
                />
                <InputComp
                  inputOne="House No./Flat No.:"
                  inputTwo="Building No.:"
                  outputOne={formdetails?.saoSecondApplicantDetailsHouseNoFlatNo || 'N/A'}
                  outputTwo={formdetails?.saoSecondApplicantDetailsBuildingNo || 'N/A'}
                />
                <InputComp
                  inputOne="Way No.:"
                  inputTwo="Area:"
                  outputOne={formdetails?.saoSecondApplicantDetailsWayNo || 'N/A'}
                  outputTwo={formdetails?.saoSecondApplicantDetailsArea || 'N/A'}
                />
                <InputComp
                  inputOne="Wilayat:"
                  inputTwo="Res. Tel. No.:"
                  outputOne={formdetails?.saoSecondApplicantDetailsWilayat?.value || 'N/A'}
                  outputTwo={formdetails?.saoSecondApplicantDetailsResTelNo || 'N/A'}
                />
                <InputComp
                  inputOne="Mobile (1):"
                  inputTwo="Mobile (2):"
                  outputOne={formdetails?.saoSecondApplicantDetailsMobile1 || 'N/A'}
                  outputTwo={formdetails?.saoSecondApplicantDetailsMobile2 || 'N/A'}
                />
                <InputComp inputOne="Email" outputOne={formdetails?.saoSecondApplicantDetailsEmail || 'N/A'} />
                <InputComp
                  inputSix="Permanent Address (Home Country):"
                  n={30}
                  outputSix={formdetails?.saoSecondApplicantDetailsPermanentAddressHomeCountry || 'N/A'}
                />
                <InputComp inputOne="Telephone:" outputOne={formdetails?.saoSecondApplicantDetailsTelephone || 'N/A'} />
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
              marginTop: 10,
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            BANKING SERVICE REQUIRED
          </Text>
          <View style={styles.rowFav}>
            <View style={{ flexDirection: 'column', width: '60%', paddingRight: 5, gap: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <CheckBoxComp label="Cheque Book" val={formdetails?.saoBankingServicesChequeBook?.value} />
                {formdetails?.saoBankingServicesChequeBook?.value && (
                  <View style={styles.rowFav}>
                    <CheckBoxComp
                      label={formdetails?.saoBankingServicesChequeBook?.value + ' ' + 'leaves'}
                      val={formdetails?.saoBankingServicesChequeBook?.value}
                    />
                  </View>
                )}
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <CheckBoxComp
                  label="Email Alerts for Account Transaction"
                  val={formdetails?.saoBankingServicesEmailAlertsforAccountTransactions}
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={styles.checkboxRow}>
                  <CheckBoxComp
                    label="SMS Alerts for Account Transactions:"
                    val={formdetails?.saoBankingServicesSMSAlertsforAccountTransaction?.value}
                  />
                </View>
                <View style={{ ...styles.rowFav, paddingRight: 3 }}>
                  <View style={styles.checkboxRow}>
                    <CheckBoxComp
                      label={formdetails?.saoBankingServicesSMSAlertsforAccountTransaction?.value}
                      val={formdetails?.saoBankingServicesSMSAlertsforAccountTransaction?.value}
                    />
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
              <View>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>Standard Frequencies: </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={styles.checkboxRow}>
                  <Text style={{ fontSize: 8 }}>Change in Printed Frequency*, please specify</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 8 }}>*Charges applicable</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'column', padding: 2 }}></View>

            <View style={{ flexDirection: 'column', width: '60%', borderRight: '1px solid #6E2585', paddingRight: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>✓ Printed (Biannually) </Text>
              </View>

              <View style={styles.rowFav}>
                <CheckBoxComp
                  label={formdetails?.saoBankingServicesChangesinPrintedFrequency?.value}
                  val={formdetails?.saoBankingServicesChangesinPrintedFrequency?.value}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'column', width: '60%', paddingRight: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>✓ Email (Monthly)</Text>
              </View>

              <View style={{ ...styles.rowFav, paddingHorizontal: 5 }}>
                <CheckBoxComp
                  label={formdetails?.saoBankingServicesChangesinEmailFrequency?.value}
                  val={formdetails?.saoBankingServicesChangesinEmailFrequency?.value}
                />
              </View>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View
            style={{
              fontSize: '10px',
              borderTop: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              // borderBottom: '1px solid #6E2585',
              width: '45%',
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
                // height: '30px',
                padding: '8px',
              }}
            >
              <Text style={{ fontSize: 10 }}>Name</Text>
            </View>
            <View
              style={{
               height: '60px',
                // backgroundColor: '#C0C0C0',
                justifyContent: 'center',
                borderRight: 0,
                alignItems: 'center',
                color: '#6E2585',
                borderBottom: '1px solid #6E2585',
                width: '100%',
                padding: 2,
              }}
            >
              <Text style={{ fontSize: 8 }}>(First Aplicant)</Text>

              <Text style={{ fontSize: 10 }}>{formdetails?.saoBankingServicesFirstApplicantName || 'N/A  '}</Text>
            </View>
            <View
              style={{
                height: '60px',
                // backgroundColor: '#C0C0C0',
                justifyContent: 'center',
                borderRight: 0,
                alignItems: 'center',
                color: '#6E2585',
                borderBottom: '1px solid #6E2585',
                width: '100%',
                padding: 2,
              }}
            >
              <Text style={{ fontSize: 8 }}>(Second Applicant)</Text>
              <Text style={{ fontSize: 10 }}>{formdetails?.saoBankingServicesFirstApplicantName || 'N/A'}</Text>
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
              width: '27.5%',
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
                // height: '30px',
                padding: '8px',
              }}
            >
              <Text style={{ fontSize: 10 }}>Signature/Thumb Impression</Text>
            </View>
            {Array.from({ length: 2 })?.map((items: any, index: any) => (
              <View
                key={index}
                style={{
                  height: '60px',
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
                <Text style={{ fontSize: 8 }}></Text>
              </View>
            ))}
          </View>
          <View
            style={{
              borderRight: '1px solid #6E2585',
              fontSize: '10px',
              borderTop: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              width: '27.5%',
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
                // height: '30px',
                padding: '1px',
              }}
            >
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                Signature/Thumb Impression Verified (Bank use only)
              </Text>
            </View>
            {Array.from({ length: 2 })?.map((items: any, index: any) => (
              <View
                style={{
                  height: '60px',
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
            marginTop: 10,
            backgroundColor: '#FFFACD',
            padding: '5px',
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: 500, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>

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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
                            }}
                          >
                            Resident ID
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
                            }}
                          >
                            Customer GCC ID
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 8,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 8,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
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
                          <View style={styles.smallCheckbox}></View>
                          <Text
                            style={{
                              marginTop: 4,
                              fontWeight: 'extrabold',
                              color: '#6E2B8C',
                              fontSize: 9,
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
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Text style={styles.secondLabel}>Customer Segment:</Text>
              <View style={styles.row}>
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
              <View style={{ display: 'flex', flexDirection: 'row' }}>
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
              </View>
            </View>
            {/*  */}
          </View>
          <View style={styles.customRow}>
            <View style={styles.customRow}>
              <Text style={styles.secondLabel}>DSR/PBO Code:</Text>
              <Text style={{ borderBottom: '1px solid #6E2585', width: '150px', marginTop: 7 }}></Text>
            </View>
            <View style={styles.customRow}>
              <Text style={styles.secondLabel}>DSR/PBO Name:</Text>
              <Text style={{ borderBottom: '1px solid #6E2585', width: '150px', marginTop: 7 }}></Text>
            </View>
          </View>
        </View>

        <PDFTermsAndCondition data={termsConditionData} />
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

        <PdfFooter />
      </Page>
      {/* <ArabicAccountOpeningSavingsFormPDFProps data={data} /> */}
    </Document>
  );
}
