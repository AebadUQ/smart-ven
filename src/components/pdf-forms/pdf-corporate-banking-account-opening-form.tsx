'use client';

import { isNull } from 'util';

import * as React from 'react';
import { AccountBox, SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { Input, typographyClasses } from '@mui/material';
import { flexbox, fontFamily, lineHeight, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { solarizedLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
// import DinFont from '../../font/DinTextARRegular.otf'; // Double-check the path

// import Din from '../../font/DinTextARRegular.otf';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { AutoFinanceArabicFormPDFProps } from './pdf-arabic-forms/arabic-auto-finance-form';
import { InputArabicComp } from './pdf-arabic-forms/arabic-input-component';
import { StandingOrderArabicFormPDFProps } from './pdf-arabic-forms/arabic-standing-order-form';
import { CustomArabicDate } from './pdf-arabic-forms/pdf-custom-arabic-date';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PdfTable } from './pdf-table-component';
import { PDFTermsAndCondition } from './sections/pdf-terms-condition';

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

const termsConditionData = {
  title: 'Corporate Current Account Terms & Conditions:',
  list: [
    {
      title: '',
      description: [
        {
          isClosure: true,
          text: 'These conditions in addition to the General Terms & Conditions shall govern the relationship between Bank Nizwa (the “Bank”) and the Customer or Customers whose particulars are set out on the appropriate account opening form (the “Customer”) regarding all and any accounts opened by the Customer with the Bank (together the “Accounts”) subject only to any special condition applicable to any of the Accounts.',
        },
        {
          isClosure: true,
          text: 'The credit balance in the Current Account is deposited by the Customer as a “Qard” to the Bank, on which no profit or other form of return is payable. The Bank undertakes to pay any credit balance in its favour in the Current Account in full at the request of the Customer, subject to the Customer’s compliance with these Conditions, and the General terms and Conditions of the Bank. The Bank may invest the credit balance in the Current Account in such manner as the Bank, in its absolute discretion, deems fit, not contradicting Shari’a Principles. No returns of whatsoever nature (including profit) shall be paid out to the Customer on the Current Account. The opening of the Current Account shall be subject to the minimum balance requirements prescribed by the Central Bank of Oman from time to time, and advised to the Customer, where the Bank shall not charge any fees for the fall below balance of the Account, and may be operated in such denominations approved by the Bank from time to time.',
        },
        {
          isClosure: true,
          text: 'The Customer shall draw cheques in Arabic or English languages. The Bank shall not accept cheques written in any other languages.',
        },
        {
          isClosure: true,
          text: 'The Customer will periodically receive statements in respect of each of the Accounts. The Customer agrees to examine each statement of Account and to raise any objection in writing within thirty (30) days from the date of issue of such statement notice or other communication. If there is any delay in making any subject objection they shall be deemed to be accurate and if as a consequence of such delay the Bank incurs any loss whatsoever, such loss shall be borne by the Customer.',
        },
        {
          isClosure: true,
          text: 'All statements, notices and other communications shall be deemed to have been validly transmitted upon the day following the date of their dispatch by the Bank or on the date of deposit in the mailbox allotted to the Customer, if any in the Bank’s premises. The date of the copies of such notices, statements and other communications or the mailing lists in the possession of Bank, shall be conclusive evidence as to the date of such dispatch. The Bank should also be informed as quickly as possible if any such statement, notice or communication is not received by the Customer when expected.',
        },
        {
          isClosure: true,
          text: 'No profit will be paid on current account deposits. Incidental/service charges or any out-of-pocket expenses will be recovered at the prevailing rates at the Bank’s discretion.',
        },
        {
          isClosure: true,
          text: 'Any foreign currency account of the Customer is deemed to be held in that foreign currency. Governmental measures and/or restrictions whether international or domestic affecting the Bank shall correspondingly apply to the Customer credit balance in the account for any loss, delay, liability or damage whatsoever arising on any foreign currency account may be subject to special conditions as shall be notified to the Customer by the Bank and shall be subject to a commission payable to the Bank.',
        },
        {
          isClosure: true,
          text: 'Whereas the Bank may grant or continue to grant financing facilities to the company by way of opening documentary credits and/or by any other transactions of whatsoever nature as the Bank may in its absolute discretion think fit at a Profit rate(s) which the Bank shall have the right to vary at any time with the need to give intimation to and receive concurrence from the Company. The Company undertakes to repay to the Bank on demand at any time all monies and discharge all such liabilities and the Bank may at any time without further order from or notice to the Company apply such monies in or towards satisfaction of such indebtedness or liability.',
        },
        {
          isClosure: true,
          text: 'The Bank shall have a right of set-off over all and any deposit of the Customer including any foreign currency accounts in respect of all and any indebtedness of the Customer at any time to the Bank and all the Accounts of the Customer with the Bank and any branch thereof shall be treated as a single combined account for the purpose of Article 346 of Royal Decree 55/90.',
        },
        {
          isClosure: true,
          text: 'Any money or other asset of whatever nature, which are held in the name of the Customer by the Bank, shall be exclusively pledged to the Bank or any other monies due to the Bank from the Customer including without limitation all and any principal sums together with all and any profit and other charges. The Bank shall have expressed rights of lien over any credit balance available in any of the Customers’ accounts for settlement of any outstanding amount in the name of the Customer and in favour of the Bank.',
        },
        {
          isClosure: true,
          text: 'The Bank is authorised to debit and charge to any of the Accounts all cheque, orders signing authority or authorities provided, to the Bank by the Customer and Customer herby waives the Customer’s right to immediate notice pursuant to Article 341 or Royal Decree 55/90 in the event of such overdrawing.',
        },
        {
          isClosure: true,
          text: 'All sums/instruments deposited to the credit of an account shall be acknowledged by the signature of an authorised official and stamp of the Bank on Customer’s copy of pay-in-slip in the absence of which the Bank shall be absolved of all responsibility or consequences.',
        },
        {
          isClosure: true,
          text: 'Cheque books will be issued upon completion in all respects of formalities for opening of the account. It is the responsibility of the Customer to keep all cheque book issued to the company under secure control at all times and to notify the Bank immediately should any cheque leaf/book be lost or stolen. The Customer shall be liable for all losses incurred from such loss or theft if the loss or theft wholly or in part arose from the negligence of the Customer or as result of the Customer failing to exercise due care. It is understood and agreed by the Customer that cheques will be drawn on the Bank only if sufficient freely available funds are maintained in the account. The Bank is further authorised to debit and charge to any of the Accounts a service charge in respect of returned cheque at rate deemed appropriate by the Bank.',
        },
        {
          isClosure: true,
          text: 'All instruments such as cheques and dividend warrants Payable to the Customer shall be accepted simply for collection, without assuming any responsibility as to form, regularity or authenticity of such instrument and the Bank shall not be under any obligation whatsoever to pursue the recovery of such instruments.',
        },
        {
          isClosure: true,
          text: 'The Customer agrees that the Bank shall have the right, without giving notice to the Customer, to refuse to repay when demanded or when the same fall due any of the Bank’s indebtedness to the Customer if and to the extent that the Customer’s aggregate liabilities at the relevant time are equal to or exceed the Bank’s indebtedness to the Customer.',
        },
        {
          isClosure: true,
          text: 'Notwithstanding Article 345 of Royal Decree 55/90, all and any deposit and withdrawals on any of the accounts may be made at any branch of the Bank in the Sultanate of Oman subject to production of satisfactory evidence of the Customer identity and the necessary details of such Account and subject to the Bank’s Customer charges.',
        },
        {
          isClosure: true,
          text: 'In the event of bankruptcy or incapacity of the Customer the Bank shall not be liable for any loss, damage or liability pursuant to such bankruptcy or incapacity which may arise from any dealing on any of the Accounts unless and until the Bank shall receive notice in writing of such bankruptcy or incapacity signed by a suitable representative of the Customer and supported by documentary evidence satisfactory to the Bank or from the Government authority. However, the Bank shall have the right to take all steps it seems appropriate, if such information has reached the Bank at its sole discretion.',
        },
        {
          isClosure: true,
          text: 'The Bank shall have the right without any consent from or notice to the Customer to debit any of the Accounts with all fees, profit, commission, taxes, charges, duties and other expenses paid or incurred by the Bank on behalf of the Customer or arising out of any dealings between the Bank and the Customer.',
        },
        {
          isClosure: true,
          text: 'A stop payment order will not be accepted by the Bank except in the event of, loss or theft of a cheque or the bankruptcy of the intended payee or in such other cases as shall be agreed by the Bank in writing in advance, provided always that any such stop payment order is made at the sole risk and responsibility of the Customer and against completion of and valid execution by the Customer of the appropriate form of document required by the Bank.',
        },
        {
          isClosure: true,
          text: 'The Customer’s address for service of any notice, statement or communication shall be the address indicated on the appropriate account opening form or such other addresses the Customer shall notify to the Bank in writing.',
        },
        {
          isClosure: true,
          text: 'Any failure or delay on the part of the Bank to insist on fulfilment by the Customer of any these conditions including without limitation any indulgence, concession, settlement or arrangement that the Bank may at its discretion allow or provide to the Customer, shall not mean or be taken as a waiver on the part of the Bank of any of its rights hereunder.',
        },
        {
          isClosure: true,
          text: 'The Customer warrants and undertakes that as at the date of opening all and any of the Accounts, the Customer is solvent and has not ceased to make payment of any debts for the purposes of Article 609 of Royal Decree 55/90.',
        },
        {
          isClosure: true,
          text: 'The Customer further warrants that all particulars given to the Bank (whether in an account opening form or otherwise) are true and accurate and if the particulars change at any time it will immediately notify the Bank of any such change.',
        },
        {
          isClosure: true,
          text: 'Each of these conditions is severable and the invalidity or unenforceability of one or more such conditions shall not affect the remaining such conditions which shall remain if full force and effect.',
        },
        {
          isClosure: true,
          text: 'The signature of the Customer below hereby authorises the provision of any information by the Bank to any third party pursuant to Article 4-4.07 (a) of the Oman Banking Law of 1974, as amended from time to time.',
        },
        {
          isClosure: true,
          text: 'Disclaimer/Indemnity:',
          subClause: [
            {
              text: 'The Bank is hereby irrevocably authorised to accept instruction from the Customer at the sole discretion of the Bank from time to time by facsimile transmission (the “instructions”) for the operation of the Customer’s account without requiring written confirmation bearing an actual signature in accordance with mandate for such account prior to acting on the instructions the Customer confirms that:',
            },
            {
              text: 'The Bank is hereby irrevocably and unconditionally authorised to act on the instructions which, in the Bank’s sole discretion the Bank believes emanate from the Customer or otherwise appear to comply with terms of the mandate for the above account and the Bank shall not be liable for so acting in any circumstance whatsoever.',
            },
            {
              text: 'The Bank shall in particular not be under any duty to verify the identity of the person or persons giving the instructions’ purportedly in Customers name or the authenticity of the facsimile signature, and any transaction made pursuant to the instruction shall be binding upon the Customer whether made with or without Customer’s authority, knowledge or consent.',
            },
            {
              text: 'The Customer undertakes to keep the Bank indemnified at all times against and to hold the Bank harmless from all actions, proceedings, claims, losses, damages, costs and expenses which may be brought against the Bank suffered or incurred by the Bank and which shall have either directly or indirectly come out of or in connections and acting thereon.',
            },
          ],
        },
        {
          isClosure: true,
          text: 'The Customer declares and undertakes that the accounts will only be used for legitimate business transaction and not for any illegal purposes.',
        },
        {
          isClosure: true,
          text: 'It will be an obligation of the Customer to avoid negligence and take sufficient necessary precautions in all acts and matters relating to the operation and maintenance of the account with the Bank. The Bank reserves the right to close any account and/or withdraw cheque book facility if the conduct of account is deemed unsatisfactory. In such an eventuality, the balance available in the account net of Bank charges, if any, will be remitted to the Customer by way of a banker’s cheque/demand draft mailed to their latest address available with the Bank.',
        },
        {
          isClosure: true,
          text: 'Any item not covered under these conditions, shall be governed by the General Terms & Conditions of the Bank, as applicable from time to time. The Corporate Current Account Terms & Conditions shall be read and interpreted in conjunction with the General Terms & Conditions of the Bank. Words capitalized but not otherwise defined in these conditions, shall have the same meaning as defined under the General Terms & Conditions.',
        },
        {
          isClosure: true,
          text: 'These conditions shall be governed by the laws of the Sultanate of Oman and the Customer submits to the non-exclusive jurisdiction of the commercial court in Muscat, Sultanate of Oman, or any successor body thereto and courts of any other country or jurisdiction not contradicting Shari’a principles.',
        },
      ],
    },
  ],
};
const termsConditionDataAr = {
  title: 'شروط وأحكام الحوالات عند الطلب والحوالات المصرفية',
  list: [
    {
      title: '',
      description: [
        {
          isClosure: true,
          text: 'أصرح/نصرح بأن المعلومات التي قدمتها إلى البنك جميعها دقيقة وصحيحة.',
        },
        {
          isClosure: true,
          text: 'أوافق/نوافق بأن يتم التحويل وفقًا لنظام البنك ولوائحه المعمول بها.',
        },
      ],
    },
  ],
};

const lineItems = [
  { id: 'LI-001', name: 'Pro Subscription', quantity: 1, currency: 'USD', unitAmount: 14.99, totalAmount: 14.99 },
] satisfies LineItem[];

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.3,
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
    // marginTop: 2,
  },

  label: {
    fontWeight: 'bold',
    marginRight: 2,
    color: '#6E2B8C',
    fontSize: 10,
  },
  secondLabel: {
    color: '#6E2B8C',
    fontSize: 9,
    paddingLeft: 3,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    flexGrow: 1,
    fontSize: 8,
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
   title: {
      fontWeight: 'bold',
      color: '#6E2B8C',
      fontSize: 18,
      textAlign: 'left',
      fontFamily: 'Cairo',
    },
    paragraph: {
      fontSize: 8,
      color: '#6E2585',
      fontFamily: 'Cairo',
      textAlign:  'left',
      marginBottom: 6,
    },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',

    fontSize: 8,
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

export function CorporateAccountOpningFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.createdAt).format('DDMMYYYY');
  const standingOrderStartDate = dayjs(formdetails?.sofStandingOrderStartDate).format('MMM D, YYYY h:mm A');
  const standingOrderEndDate = dayjs(formdetails?.sofStandingOrderEndDate).format('MMM D, YYYY h:mm A');

  return (
    <Document>
      <Page size="A4" style={{ ...styles.page }}>
        <PdfHeader formName={data?.form_name} />

        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <CustomDate date={formatedDate} />
          {/* <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
            <Text style={{ ...styles.label }}>Account Number</Text>
            <AccountBoxes length={14} />
          </View> */}
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.textFont}>The Manager</Text>
          <Text style={styles.textFont}>Bank Nizwa</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View
            style={{ flexDirection: 'column', width: '48%', alignItems: 'flex-start', justifyContent: 'flex-start' }}
          >
            <InputComp inputOne="Branch:" outputOne={formdetails?.selectBranch?.value || 'N/A'} />
          </View>
          {/* <View
            style={{ flexDirection: 'column', width: '48%', alignItems: 'flex-start', justifyContent: 'flex-start' }}
          >
            <Text style={styles.textFont}>Please mark (Tick) where applicable</Text>
          </View> */}
        </View>
        {/* <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View
            style={{ flexDirection: 'column', width: '48%', alignItems: 'flex-start', justifyContent: 'flex-start' }}
          >
            <Text style={{ color: '#6E2B8C', fontSize: 10, marginTop: 20 }}>Account Type</Text>
            <CheckBoxComp label={formdetails?.selectAccountType?.value} val={formdetails?.selectAccountType?.value} />
          </View>
          <View style={{ flexDirection: 'column', gap: 4 }}>
            <Text style={styles.textFont}>Constitution:</Text>
            <View style={{ flexDirection: 'row', gap: '5px' }}>
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <CheckBoxComp label="Proprietorship" />
                <CheckBoxComp label="Limited Liability Company" />
                <CheckBoxComp label="S.A.O.G/S.A.O.C Company" />
              </View>
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <CheckBoxComp label="General Partnership" />
                <CheckBoxComp label="Limited Partnership" />
                <CheckBoxComp label="Establishment" />
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <CheckBoxComp label="Others (Specify)" />
              <Text style={styles.inputLine}></Text>
            </View>
          </View>
        </View> */}
        <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', marginVertical: 2 }}>
          <Text style={styles.textFont}>Currency:</Text>
          {formdetails?.selectCurrencyType?.map((item: any, index: number) => (
            <Text key={index} style={styles.input}>
              {item.value || 'N/A'}
            </Text>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <InputComp inputOne="Initial Deposit" outputOne={formdetails?.initialDeposit || 'N/A'} />
          <InputComp
            inputOne="Country of Incorporation:"
            outputOne={formdetails?.selectCountryofIncorporationType?.value || 'N/A'}
          />
        </View>
        <View style={{ ...styles.secondColumn, marginTop: 7 }}></View>
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
          Company Details
        </Text>
        <View style={{ flexDirection: 'column', gap: 4, padding: 4 }}>
          <View style={{ flexDirection: 'column', minWidth: '100%' }}>
            {/* <Text style={{ width: '100%', borderBottom: '1px solid black',fontSize:8 }}>
              {formdetails?.nameoftheCompany || 'N/A'}
            </Text> */}
            <InputComp inputOne="Name Of The Company:" outputOne={formdetails?.nameoftheCompany || 'N/A'} />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}
          >
            <View >
              <InputComp
                inputOne="Commercial Registration (C.R.) No."
                outputOne={formdetails?.commercialRegistrationCR || 'N/A'}
                inputThree="Phone Number:" outputThree={formdetails?.phoneNumber || 'N/A'}
                inputTwo="Date Of Establishment"
                outputTwo={dayjs(formdetails?.dateofEstablishment).format('DD/MM/YYYY')}
              />
            </View>

          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}
          >
            <View style={{ width: '50%' }}>
              <InputComp inputOne="Expiry Date" outputOne={dayjs(formdetails?.expiryDate).format('DD/MM/YYYY')} />
            </View>
            <View style={{ width: '50%' }}>
              <InputComp inputOne="Nature of Business" outputOne={formdetails?.NatureofBusiness} />
            </View>
          </View>

          <View style={{ border: '1px solid #6E2B8C' }}>
            <View style={{ flexDirection: 'row', width: '100%', gap: '1%' }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  gap: 5,
                  borderRight: '1px solid #6E2B8C',
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ fontFamily: 'Times-Bold', ...styles.textFont }}>Registered Address (Location):</Text>

                <InputComp
                  inputOne="Shop/Building No.:"
                  inputTwo="Way:"
                  outputOne={formdetails?.shopBuildingNo || 'N/A'}
                  outputTwo={formdetails?.wayNo || 'N/A'}
                />
                <InputComp inputOne="Building Name" outputOne={formdetails?.buildingName || 'N/A'} />
                <InputComp inputOne="Area" outputOne={formdetails?.area || 'N/A'} />
                {/* <InputComp inputOne="Phone Number:" outputOne={formdetails?.phoneNumber || 'N/A'} /> */}
              </View>
              <View
                style={{ flexDirection: 'column', width: '50%', gap: 2, paddingVertical: 10, paddingHorizontal: 5 }}
              >
                <Text style={{ fontFamily: 'Times-Bold', ...styles.textFont }}>Mailing Address:</Text>

                <InputComp inputOne="P.O. Box No.:" outputOne={formdetails?.poBoxNo || 'N/A'} />
                <InputComp inputOne="Postal Code:" outputOne={formdetails?.postalCode || 'N/A'} />
                <InputComp inputOne="Country:" outputOne={formdetails?.selectCountry?.value} />
                <InputComp inputOne="Emial:" outputOne={formdetails?.email} />
              </View>
            </View>
          </View>

          <PdfTable
            head="PARTNERSHIP/OWNERSHIP"
            body={
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#C0C0C0' }}>
                  <View style={{ width: '5%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', marginTop: 12, ...styles.textFont }}>S.NO.</Text>
                  </View>
                  <View style={{ width: '35%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', marginTop: 12, ...styles.textFont }}>Name(s)</Text>
                  </View>
                  <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', marginTop: 12, ...styles.textFont }}>Percentage %</Text>
                  </View>
                  <View style={{ width: '40%' }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View style={{ borderBottom: '1px solid #6E2B8C' }}>
                        <Text style={{ textAlign: 'center', ...styles.textFont }}>ID/PP</Text>
                      </View>

                      <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%', borderRight: '1px solid #6E2B8C' }}>
                          <Text style={{ ...styles.textFont, marginTop: 5, textAlign: 'center' }}>Number</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                          <Text style={{ textAlign: 'center', ...styles.textFont }}>Expiry Date{'\n'}DD/MM/YYYY</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                   {formdetails?.partnership?.map((child: any, index: number) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      borderTop: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ width: '5%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>{index + 1}</Text>
                    </View>
                    <View style={{ width: '35%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>
                        {child?.partnershipName || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>
                        {child?.partnershipPercentage || 'N/A'}
                      </Text>
                    </View>
                    {/* <View style={{ width: '40%' }}>
                      <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 5 }}>
                        {child?.partnershipPassport || 'N/A'}
                      </Text>
                    </View> */}
                    <View style={{ width: '40%' }}>
                      <View style={{ flexDirection: 'column', height: 'auto' }}>
                        {/* <View style={{ borderBottom: '1px solid #6E2B8C' }}>
                        <Text style={{ textAlign: 'center', ...styles.textFont }}>ID/PP</Text>
                      </View> */}

                        <View style={{ flexDirection: 'row', width: '100%', height: 'auto' }}>
                          <View style={{ width: '50%', borderRight: '1px solid #6E2B8C' }}>
                            <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>
                              {child?.partnershipPassport || 'N/A'}
                            </Text>
                          </View>
                          <View style={{ width: '50%', height: 'auto' }}>
                            <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>
                              {dayjs(child?.partnershipExpiryDate).format('DD-MM-YY ') || 'N/A'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            }
          />
          <Text style={{ ...styles.textFont }}>
            Nature or purpose of business entity and lines of business (including types of products and services offered
            and list of major suppliers/buyers and their geographical location):
          </Text>
          <InputComp
            inputOne="a) Nature or purpose of business entity:"
            outputOne={formdetails?.NatureofBusiness || 'N/A'}
          />
          <InputComp
            inputOne="b) Commercial Registration (C.R.) No.:"
            outputOne={formdetails?.LinesofBusinessandProductsOffered || 'N/A'}
          />
          {/*  */}

          <View style={{ flexDirection: 'column' }}>
            <View
              style={{ flexDirection: 'row', border: '1px solid #6E2B8C', marginTop: 7, backgroundColor: '#C0C0C0' }}
            >
              <View style={{ width: '10%', borderRight: '1px solid #6E2B8C' }}>
                <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 5 }}>S.NO.</Text>
              </View>
              <View style={{ width: '35%', borderRight: '1px solid #6E2B8C' }}>
                <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 5 }}>
                  Name of Major Supplier(s)/Buyer(s)
                </Text>
              </View>
              <View style={{ width: '35%', borderRight: '1px solid #6E2B8C' }}>
                <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 5 }}>Supplier/Buyer</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 5 }}>
                  Geographical Location(s)
                </Text>
              </View>
            </View>
            {/* {Array.from({length:5})?.map((child: any, index: any) => ( */}
            {formdetails?.majorSuppandBuy?.map((child: any, index: any) => (
              <View
                style={{
                  flexDirection: 'row',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <View style={{ width: '10%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>{index + 1}</Text>
                </View>

                <View style={{ width: '35%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>
                    {child?.majorSuppandBuyName || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '35%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>
                    {child?.majorSuppandBuySupplier?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, paddingVertical: 2 }}>
                    {child?.majorSuppandBuyGeoLocation?.value || 'N/A'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={{ ...styles.page }}>
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
            WE FREQUENTLY USE OUR ACCOUNT FOR THE FOLLOWING BUSINESS/INVESTMENT RELATED TRANSACTIONS
          </Text>

          <View style={{ flexDirection: 'row', width: '100%', gap: '2%', padding: 4 }}>
            <View style={{ flexDirection: 'column', width: '49%', gap: 3 }}>
              <CheckBoxComp label="Import Payment" val={formdetails?.bussInvestRelatedTransaction?.importPayment} />
              <CheckBoxComp label="Export Receipts" val={formdetails?.bussInvestRelatedTransaction?.exportPayment} />
              <CheckBoxComp
                label="Investment in Shares"
                val={formdetails?.bussInvestRelatedTransaction?.investmentinShares}
              />
              <CheckBoxComp
                label="Payments to Suppliers"
                val={formdetails?.bussInvestRelatedTransaction?.paymentstoSuppliers}
              />
              <CheckBoxComp
                label="Services/Contracts Payments/Receipts"
                val={formdetails?.bussInvestRelatedTransaction?.servicesContractsPaymentsReceipts}
              />
            </View>
            <View style={{ flexDirection: 'column', width: '49%', gap: 3 }}>
              <CheckBoxComp
                label="Real Estate Investment"
                val={formdetails?.bussInvestRelatedTransaction?.realEstateInvestment}
              />
              <CheckBoxComp
                label="Collection of Sales Proceeds"
                val={formdetails?.bussInvestRelatedTransaction?.collectionofSalesProceeds}
              />
              <CheckBoxComp
                label="Commission Payments/Receipts"
                val={formdetails?.bussInvestRelatedTransaction?.commissionPaymentReceipts}
              />
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                <View style={{ minWidth: '21%' }}>
                  <CheckBoxComp label="Others" val={formdetails?.bussInvestRelatedTransaction?.other} />
                </View>
                <View style={{ minWidth: '10%' }}>
                  {formdetails?.othersSuppandBuy && (
                    <InputComp inputSix=" " outputSix={formdetails?.othersSuppandBuy || 'N/A'} n={75}></InputComp>
                  )}
                </View>
                {/* <InputComp inputSix=" " outputSix={formdetails?.othersSuppandBuy || 'N/A'} n={75}></InputComp> */}
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 5 }}></View>
        <PdfTable
          head="EXPECTED CASH DEPOSITS/WITHDRAWAL/CHEQUES"
          body={
            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
                </View>
                <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ width: '100%', borderBottom: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        Average Amount per Transaction (RO)
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Min.</Text>
                      </View>
                      <View style={{ flexDirection: 'column', width: '50%' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Max.</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {`Frequency(Daily/Weekly\n/Monthly/ Quarterly/Yearly)`}
                  </Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>Nature of Transaction</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Cash Deposits</Text>
                </View>
                <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.expectDWCavgCashDepMinRO}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.expectDWCavgCashDepMaxRO}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {formdetails?.expectDWCfreqCashDep?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {formdetails?.expectDWCcashDepdnatureOfTrans || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Cash Withdrawal</Text>
                </View>
                <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.expectDWCavgCashdraMinRO}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.expectDWCavgCashdraMaxRO}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {formdetails?.expectDWCfreqCashWithdra?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {formdetails?.expectDWCavgCashdracashWithnatureOfTran || 'N/A'}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Cheques Deposited</Text>
                </View>
                <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.expectDWCavgCashDepedMinRO || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>
                        {formdetails?.expectDWCavgCashDepedMaxRO || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {formdetails?.expectDWCfreqCashDeped?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '30%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {formdetails?.expectDWCcashDepnatureOfTran || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          }
        />

        <View style={{ marginTop: 5 }}></View>

        <PdfTable
          head="INWARD AND OUTWARD REMITTANCES, LOCAL/FOREIGN"
          body={
            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ width: '100%', borderBottom: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Amount per Transaction (RO)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Min.</Text>
                      </View>
                      <View style={{ flexDirection: 'column', width: '50%' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Max.</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ width: '100%', borderBottom: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>No. of Transactions per month</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Min.</Text>
                      </View>
                      <View style={{ flexDirection: 'column', width: '50%' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Max.</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: '15%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>Country</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>Purpose of Remittance</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C', borderBottom: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Inward Remittance – Foreign
                  </Text>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C', borderBottom: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgIRFMinRO || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgIRFMaxRO || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C', borderBottom: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemnoOfTransIRFMin || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemnoOfTransIRFMax || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '15%', borderRight: '1px solid #6E2B8C', borderBottom: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.depRemnoOfTransIRFCountry?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%', borderBottom: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.depRemnoOfTransIRFRemitt || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Inward Remittance – Local
                  </Text>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgIRLMinRO || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgIRLMaxRO || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemnoOfTransIRLMin || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemnoOfTransIRLMax || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '15%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.depRemnoOfTransIRLCountry?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.depRemnoOfTransIRLRemitt || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Outward Remittance – Foreign
                  </Text>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgORFMinRO || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgORFMaxRO || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemnoOfTransORFMin || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemnoOfTransORFMax || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '15%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.depRemnoOfTransORFCountry?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.depRemnoOfTransOutRFRemitt || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Outward Remittance – Local
                  </Text>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgORLMinRO || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemavgORLMaxRO || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.depRemnoOfTransORLMin || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginTop: 5 }}>
                        {formdetails?.depRemnoOfTransORLMax || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '15%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>
                    {formdetails?.depRemnoOfTransORLCountry?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>
                    {formdetails?.depRemnoOfTransORLRemitt || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          }
        />
        <View style={{ marginTop: 5 }}></View>

        <PdfTable
          head="FINANCIAL INFORMATION"
          body={
            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>Amount (RO)</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ width: '100%', borderBottom: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center' }}>Year</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Current Year</Text>
                      </View>
                      <View style={{ flexDirection: 'column', width: '50%' }}>
                        <Text style={{ ...styles.textFont, textAlign: 'center' }}>Last Year</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Annual Sales</Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfAnualSaleAmt || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.finInfAnualSaleCYRO || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.finInfAnualSaleLYRO || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Profit</Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfProfAmt || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.finInfAnualSaleCYRO || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.finInfProfLYMaxRO || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ padding: 2 }}>
                <InputComp
                  inputOne="Capital: Authorised "
                  inputTwo="Paid up"
                  outputOne={formdetails?.finInfCapAuth || 'N/A'}
                  outputTwo={formdetails?.finInfCapPaidUp || 'N/A'}
                />
              </View>
            </View>
          }
        />
        <View style={{ marginTop: 5 }}></View>

        <PdfTable
          head="TRADE FINANCE SERVICE ACTIVITY"
          body={
            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Products/Facilities
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Monthly Turnover (RO)
                  </Text>
                </View>

                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    Import from/Export to{'\n'} (specify countries)
                  </Text>
                </View>

                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Description of Commodities
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Import Letters of Credit (LC)
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfILCMTRO || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid #6E2B8C' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.finInfILCIE?.value || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {formdetails?.finInfILCDC || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Export Letters of Credit (EXLC)
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfELCMTRO || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfELCIE?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfELCDC || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Letters of Guarantee (LG)
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfLGMT || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfLGIE?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfLGDC || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                   Documentary Collections (DC)
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfDCMT || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfDCIE?.value || 'N/A'}
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    {formdetails?.finInfDCDC || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          }
        />
        <View style={{ marginTop: 5 }}></View>
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
            BANKING PRODUCTS OF INTEREST
          </Text>
          <View style={{ flexDirection: 'row', width: '100%', gap: '2%', padding: 4 }}>
            <View style={{ flexDirection: 'column', width: '32.6666666667%', gap: 2 }}>
              <CheckBoxComp
                label="Financing Facilities"
                val={formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsFinancingFacilities}
              />
              <CheckBoxComp
                label="Cheque Book Facility "
                val={formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsChequeBookFacility}
              />
              <CheckBoxComp
                label="Collection A/C with Interior Branches"
                val={formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsCollectionACwithInteriorBranches}
              />
            </View>
            <View style={{ flexDirection: 'column', width: '33%', gap: 2 }}>
              <CheckBoxComp
                label="Portfolio Investment"
                val={formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsPortfolioInvestment}
              />
              <CheckBoxComp
                label={'Salary Related Financing\nto the employees'}
                val={formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsSalaryRelatedFinancingEmployees}
              />
            </View>
            <View style={{ flexDirection: 'column', width: '32%', gap: 3 }}>
              <CheckBoxComp
                label="Remittances"
                val={formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsRemittances}
              />
              <CheckBoxComp
                label={'Salary Disbursement through\n Bank Nizwa'}
                val={
                  formdetails?.bankProIntbankingProducts?.bankProIntbankingProductsSalaryDisbursementthroughBankNizwa
                }
              />
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <PdfTable
          head="DETAILS OF HOLDING/ASSOCIATE/SUBSIDIARY (IF APPLICABLE)"
          body={
            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                <View style={{ width: '5%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Sr.No</Text>
                </View>
                <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                    Branches/Associate/Subsidiary Companies
                  </Text>
                </View>

                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Holding</Text>
                </View>

                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Location</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Activity</Text>
                </View>
              </View>

              {/* {Array.from({length:4})?.map((item: any, index: any) => ( */}
              {formdetails?.bankProIntHAS?.map((item: any, index: any) => (
                <View style={{ flexDirection: 'row',borderBottom:"1px solid #6E2B8C" }}>
                  <View style={{ width: '5%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>{index + 1}</Text>
                  </View>
                  <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                      {item?.bankProIntHASBranchesAssociateSubsidiary || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                      {item?.bankProIntHASHolding || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                      {item?.bankProIntHASLocation?.value || 'N/A'}
                    </Text>
                  </View>
                  <View style={{ width: '20%' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                      {item?.bankProIntHASActivity?.value || 'N/A'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          }
        />
        <View style={{ marginTop: 3 }}></View>

        <PdfTable
          head="WE CURRENTLY HAVE AN ACCOUNT WITH"
          body={
            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                <View style={{ width: '10%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Sr.No</Text>
                </View>
                <View style={{ width: '45%', borderRight: '1px solid #6E2B8C' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Bank Name</Text>
                </View>

                <View style={{ width: '45%' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Branch</Text>
                </View>
              </View>

              {formdetails?.bankProIntCurrentlyHaveanAccountWith?.map((item: any, index: any) => (
              // {Array.from({length:3})?.map((item: any, index: any) => (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '10%', borderRight: '1px solid #6E2B8C',borderBottom:"1px solid #6E2B8C" }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>{index + 1}</Text>
                  </View>
                  <View style={{ width: '45%', borderRight: '1px solid #6E2B8C',borderBottom:"1px solid #6E2B8C" }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                      {item?.bankProIntCurrentlyHaveanAccountWithBankName || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ width: '45%',borderBottom:"1px solid #6E2B8C"  }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                      {item?.bankProIntCurrentlyHaveanAccountWithBranch?.value || 'N/A'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          }
        />
        <View style={{ marginVertical: 5, flexDirection: 'column', gap: 5 }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '30%' }}>
              <Text style={styles.textFont}>Please send our Statement:</Text>
            </View>
            <View style={{ width: '70%', flexDirection: 'row', gap: 20 }}>
              <CheckBoxComp label="Weekly" val={formdetails?.bankProIntHASStatement?.bankProIntHASStatementWeekly} />
              <CheckBoxComp
                label="Fortnightly"
                val={formdetails?.bankProIntHASStatement?.bankProIntHASStatementFortnightly}
              />
              <CheckBoxComp label="Monthly" val={formdetails?.bankProIntHASStatement?.bankProIntHASStatementMonthly} />
              <CheckBoxComp
                label="As per letter"
                val={formdetails?.bankProIntHASStatement?.bankProIntHASStatementasPerLetter}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
            <View style={{ width: '30%' }}>
              <Text style={styles.textFont}>The account will be operated by:</Text>
            </View>
            <View style={{ width: '70%', flexDirection: 'row', gap: 20 }}>
              {/* <CheckBoxComp
                label={formdetails?.bankProIntAccountOperatedByInstructionAccountOperation?.value || 'N/A'}
                val={formdetails?.bankProIntAccountOperatedByInstructionAccountOperation?.value}
              /> */}
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={{ minWidth: '15%' }}>
                  <CheckBoxComp
                    label="Others:"
                    val={formdetails?.bankProIntAccountOperatedByInstructionAccountOperation}
                  />
                </View>
                {formdetails?.bankProIntAccountOperatedByInstructionAccountOperationOthers && (
                  // <Text styles={styles.inputLine}>
                  //   {formdetails?.bankProIntAccountOperatedByInstructionAccountOperationOthers || 'N/A'}
                  // </Text>
                  <View style={{ minWidth: '10%' }}>
                    <InputComp
                      inputOne=" "
                      outputOne={formdetails?.bankProIntAccountOperatedByInstructionAccountOperationOthers || 'N/A'}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        <PdfTable
          head="PART 1 - FATCA CLASSIFICATION"
          body={
            <View>
              <View style={{ flexDirection: 'column', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    paddingTop: 2,
                    paddingBottom: 2,
                    backgroundColor: '#C0C0C0',
                  }}
                >
                  <Text style={{ ...styles.secondLabel }}>PART 1 - FATCA CLASSIFICATION</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={{ width: '80%', borderRight: '1px solid #6E2B8C', padding: 5 }}>
                    <Text style={styles.textFont}>
                      1. Is your Company / Partnership / Trust organized / incorporated / resident in U.S?
                    </Text>
                    <Text style={styles.textFont}>
                      (A company created in US, established under the laws of U.S or a U.S tax payer)
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <Text style={styles.textFont}>If yes, please provide your Tax Identification Number</Text>
                      <Text style={styles.inputLine}>
                        {formdetails?.fatcaClassIsyourCPTOIRUSTaxIdentificationNumber || 'N/A'}
                      </Text>
                    </View>
                    {/* <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <Text style={styles.textFont}>
                        If no, please provide name of country in which the entity is incorporated or resident
                      </Text>
                      <Text style={styles.inputLine}>{'N/A'}</Text>
                    </View> */}
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}
                  >
                    <CheckBoxComp
                      label={formdetails?.fatcaClassIsyourCPTOIRUS?.value}
                      val={formdetails?.fatcaClassIsyourCPTOIRUS?.value}
                    />
                  </View>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderTop: '1px solid #6E2B8C',
                    padding: 4,
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <InputComp
                    inputOne="Country Of Residence"
                    outputOne={formdetails?.fatcaClassCountryofTaxResidance?.value || 'N/A'}
                  />
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={{ width: '80%', borderRight: '1px solid #6E2B8C', padding: 5 }}>
                    <Text style={styles.textFont}>3. Is your company listed on stock exchange?</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.textFont}>(If Yes, please mention details) </Text>
                      <Text style={styles.inputLine}>
                        {formdetails?.fatcaClassListedonStockExchangeMentionDetails || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}
                  >
                    <CheckBoxComp
                      label={formdetails?.fatcaClassListedonStockExchange?.value}
                      val={formdetails?.fatcaClassListedonStockExchange?.value || 'N/A'}
                    />
                    {/* <CheckBoxComp label="No" /> */}
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'column', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderTop: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ ...styles.secondLabel }}>Part 1 - Classification Of Entity</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', borderBottom: '1px solid #6E2B8C' }}>
                  <View style={{ width: '80%', borderRight: '1px solid #6E2B8C', padding: 5 }}>
                    <Text style={styles.textFont}>1. Is your entity Exempt Beneficial Owner (EBO)?</Text>
                    <Text style={styles.textFont}>(If yes, please fill Section A)</Text>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}
                  >
                    <CheckBoxComp label={formdetails?.fatcaClassEBO?.value} val={formdetails?.fatcaClassEBO?.value} />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', borderBottom: '1px solid #6E2B8C' }}>
                  <View style={{ width: '80%', borderRight: '1px solid #6E2B8C', padding: 5 }}>
                    <Text style={styles.textFont}>2. Is your entity a Financial Institution (FI)?</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.textFont}>(If yes, please fill Section B)</Text>
                      {/* <Text style={styles.inputLine}></Text> */}
                    </View>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}
                  >
                    <CheckBoxComp label={formdetails?.fatcaClassFI?.value} val={formdetails?.fatcaClassFI?.value} />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={{ width: '80%', borderRight: '1px solid #6E2B8C', padding: 5 }}>
                    <Text style={styles.textFont}>3. Is your entity Exempt a Non-Financial Foreign Entity (NFFE)?</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.textFont}>(If yes, please fill Section C)</Text>
                      {/* <Text style={styles.inputLine}></Text> */}
                    </View>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}
                  >
                    <CheckBoxComp label={formdetails?.fatcaClassNFFE?.value} val={formdetails?.fatcaClassNFFE?.value} />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'column', width: '100%', gap: 5 }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderTop: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ ...styles.secondLabel }}>SECTION C.1: BENEFICIAL OWNER / CONTROLLING PERSON</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View style={{ width: '80%', borderRight: '1px solid #6E2B8C', padding: 5 }}>
                    <Text style={styles.textFont}>
                      1. (Is any of the shareholders is owning 10% and above is US person?)
                    </Text>
                    <Text style={styles.textFont}>
                      (If Yes, kindly fill the below boxes from FATCA form section C.1)
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}
                  >
                    <CheckBoxComp
                      label={formdetails?.fatcaClassSahreholdersBeneOwnerControlPerson?.value}
                      val={formdetails?.fatcaClassSahreholdersBeneOwnerControlPerson?.value}
                    />
                  </View>
                </View>
              </View>
            </View>
          }
        />
        {/* <View style={{ marginTop: 10 }}></View> */}

        <PdfTable
          head="SECTION C.1: BENEFICIAL OWNERS / CONTROLLING PERSONS"
          body={
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '32%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>Name</Text>
                </View>
                <View style={{ width: '18%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    U.S. Citizen / Green Card Holder/ Tax Resident
                  </Text>
                </View>

                <View style={{ width: '20%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont, marginTop: 5 }}>Place of Birth</Text>
                </View>

                <View style={{ width: '17%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>
                    {`Contact Number\n(with Country Code)`}
                  </Text>
                </View>

                <View style={{ width: '13%', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>TIN (If applicable)</Text>
                </View>
              </View>

              {formdetails?.fatcaClassBeneficialOwnerControllingPerson?.map((map: any, index: any) => (
              // {/* {Array.from({length:3})?.map((map: any, index: any) => ( */}
                <View style={{ flexDirection: 'row', borderTop: '1px solid #6E2B8C' }}>
                  <View style={{ width: '32%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                      {map?.fatcaClassBeneficialOwnerControllingPersonName || 'N/A'}
                    </Text>
                  </View>
                  <View style={{ width: '18%', borderRight: '1px solid #6E2B8C', flexDirection: 'row' }}>
                    <View style={{ width: '100%' }}>
                      <Text style={{ ...styles.textFont, textAlign: 'center', marginVertical: 5 }}>
                        {map?.fatcaClassBeneficialOwnerControllingPersonUSCitizenCardTax?.value || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: '20%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                      {map?.fatcaClassBeneficialOwnerControllingPersonPlaceofBirth?.value || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ width: '17%', borderRight: '1px solid #6E2B8C' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                      {map?.fatcaClassBeneficialOwnerControllingPersonContact || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ width: '13%' }}>
                    <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
                      {map?.fatcaClassBeneficialOwnerControllingPersonTIN || 'N/A'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          }
        />


        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>

        {/* <View style={{ marginTop: 5 }}></View> */}
        <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', borderTop: '1px solid #6E2B8C' }}>
          <View
            style={{
              width: '25%',
              borderLeft: '1px solid #6E2B8C',
              borderRight: '1px solid #6E2B8C',
              backgroundColor: '#C0C0C0',
            }}
          >
            <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Ownership %</Text>
          </View>
          <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
            <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>
              U.S. Citizen / Green Card Position
            </Text>
          </View>

          <View style={{ width: '50%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
            <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 5 }}>Address</Text>
          </View>
        </View>
        {formdetails?.fatcaClassBeneficialOwnerControllingPerson?.map((map: any, index: any) => (
        //  {Array.from({length:3})?.map((map: any, index: any) => (
          <View>
            <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C' }}>
              <View style={{ width: '25%', borderLeft: '1px solid #6E2B8C', borderRight: '1px solid #6E2B8C' }}>
                <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                  {map?.fatcaClassBeneficialOwnerControllingPersonOwnership || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '25%', borderRight: '1px solid #6E2B8C' }}>
                <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                  {map?.fatcaClassBeneficialOwnerControllingPersonPosition || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '50%', borderRight: '1px solid #6E2B8C' }}>
                <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>
                  {map?.fatcaClassBeneficialOwnerControllingPersonAddress?.value || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <View style={{ marginTop: 5 }}></View>

        <PdfTable
          head="COMMON REPORTING STANDARD (CRS)"
          body={
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <Text
                style={{
                  fontSize: 8,
                  fontFamily: 'Times-Bold',
                  color: '#6E2B8C',
                  backgroundColor: '#C0C0C0',
                  borderBottom: '1px solid #6E2585',
                }}
              >
                PART 1 – COUNTRY/JURISDICTION OF RESIDENCE FOR TAX PURPOSES AND RELATED TAXPAYER IDENTIFICATION NUMBER
                {`\n`} OR FUNCTIONAL EQUIVALENT* (“TIN”) (SEE APPENDIX)
              </Text>
              <View style={{ flexDirection: 'column', gap: 5, padding: 4 }}>
                <Text style={styles.textFont}>
                  Please complete the following table indicating (i) where the Controlling Person is tax resident; (ii)
                  the Controlling Person’s TIN for each country/jurisdiction indicated; and, (iii) if the Controlling
                  Person is a tax resident in a country/jurisdiction that is a Reportable Jurisdiction(s) then please
                  also complete Part 3 “Type of Controlling Person”. Countries/Jurisdictions adopting the wider approach
                  may require that the self-certification include a tax identifying number for each country/jurisdiction
                  of residence (rather than for each Reportable Jurisdiction).
                </Text>

                <Text style={styles.textFont}>
                  Please complete the following table indicating (i) where the Controlling Person is tax resident; (ii)
                  the Controlling Person’s TIN for each country/jurisdiction indicated; and, (iii) if the Controlling
                  Person is a tax resident in a country/jurisdiction that is a Reportable Jurisdiction(s) then please
                  also complete Part 3 “Type of Controlling Person”. Countries/Jurisdictions adopting the wider approach
                  may require that the self-certification include a tax identifying number for each country/jurisdiction
                  of residence (rather than for each Reportable Jurisdiction).
                </Text>
                <Text style={styles.textFont}>
                  (You can also find out more about whether a country/jurisdiction is a Reportable Jurisdiction on the
                  OECD automatic exchange of information portal)
                </Text>
                <Text style={styles.textFont}>
                  If the Controlling Person is tax resident in more than three countries/jurisdictions, please use a
                  separate sheet
                </Text>
                <Text style={{ fontFamily: 'Times-Bold', fontSize: 8, color: '#6E2B8C' }}>
                  If a TIN is unavailable please provide the appropriate reason A, B or C:
                </Text>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', gap: '5%' }}>
                  <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 8, color: '#6E2B8C' }}>Reason A -:</Text>
                  </View>
                  <View style={{ width: '85%' }}>
                    <Text style={{ fontSize: 8, color: '#6E2B8C' }}>The country/jurisdiction where the Controlling Person is resident does not issue TINs to its residents
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', gap: '5%' }}>
                  <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 8, color: '#6E2B8C' }}>Reason B -:</Text>
                  </View>
                  <View style={{ width: '85%' }}>
                    <Text style={{ fontSize: 8, color: '#6E2B8C' }}>The Account Holder is otherwise unable to obtain a TIN or equivalent number (Please explain why you are unable to obtain a TIN in the below table if you have selected this reason)
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', gap: '5%' }}>
                  <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 8, color: '#6E2B8C' }}>Reason C -:</Text>
                  </View>
                  <View style={{ width: '85%' }}>
                    <Text style={{ fontSize: 8, color: '#6E2B8C' }}>No TIN is required. (Note. Only select this reason if the domestic law of the relevant jurisdiction does not require the collection of the TIN issued by such jurisdiction)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          }
        />

        <View style={{ marginTop: 10 }}>
          <InputComp inputOne="Stamp" inputTwo="Initials" outputOne={' '} outputTwo={' '} />
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              borderBottom: '1px solid #6E2B8C',
              borderTop: '1px solid #6E2B8C',
              justifyContent: 'center',
              flexGrow: 2,
            }}
          >
            <View
              style={{
                width: '10%',
                borderLeft: '1px solid #6E2B8C',
                borderRight: '1px solid #6E2B8C',
                backgroundColor: '#C0C0C0',
              }}
            >
              <Text style={{ textAlign: 'center', ...styles.textFont }}></Text>
            </View>
            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
              <Text style={{ textAlign: 'center', fontSize: 10, color: '#6E2B8C', fontFamily: 'Times-Bold' }}>
                Country/{'\n'}Jurisdiction of tax residence
              </Text>
            </View>

            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
              <Text
                style={{ textAlign: 'center', fontSize: 10, color: '#6E2B8C', fontFamily: 'Times-Bold', marginTop: 8 }}
              >
                TIN
              </Text>
            </View>

            <View style={{ width: '30%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2B8C' }}>
              <Text style={{ textAlign: 'center', fontSize: 10, color: '#6E2B8C', fontFamily: 'Times-Bold' }}>
                If no TIN available enter{'\n'}
                Reason A, B or C
              </Text>
            </View>
          </View>
          {formdetails?.crsTINList?.map((map: any, index: any) => (
            <View
              style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', justifyContent: 'center', flexGrow: 2 }}
            >
              <View
                style={{
                  width: '10%',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  // alignSelf: 'center',
                  // height: 30,
                }}
              >
                <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 3 }}>{index + 1}</Text>
              </View>
              <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#6E2B8C',
                    // fontFamily: 'Times-Bold',
                    marginVertical: 3,
                  }}
                >
                  {map?.crsTINCountry?.value || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#6E2B8C',
                    // fontFamily: 'Times-Bold',
                    marginVertical: 3,
                  }}
                >
                  {map?.crsTINNumber || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#6E2B8C',
                    // fontFamily: 'Times-Bold',
                    marginVertical: 3,
                  }}
                >
                  {formdetails?.crsTINUnavailableReason?.value || 'N/A'}
                </Text>
              </View>
            </View>
          ))}

          {/* <View
            style={{
              width: '100%',
              borderRight: '1px solid #6E2B8C',
              borderLeft: '1px solid #6E2B8C',
              borderBottom: '1px solid #6E2B8C',
              padding: 4,
            }}
          >
            <Text style={{ fontSize: 10, color: '#6E2B8C', fontFamily: 'Times-Bold' }}>
              Please explain in the following boxes why you are unable to obtain a TIN if you selected Reason B above.
            </Text>
          </View> */}

          {/* <View
            style={{
              flexDirection: 'row',
              borderBottom: '1px solid #6E2B8C',
              justifyContent: 'center',
              flexGrow: 2,
            }}
          >
            <View
              style={{
                width: '10%',
                borderLeft: '1px solid #6E2B8C',
                borderRight: '1px solid #6E2B8C',
                height: 30,
              }}
            >
              <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 8 }}>1.</Text>
            </View>
            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>

            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>

            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>
          </View> */}

          {/* <View
            style={{
              flexDirection: 'row',
              borderBottom: '1px solid #6E2B8C',
              justifyContent: 'center',
              flexGrow: 2,
            }}
          >
            <View
              style={{
                width: '10%',
                borderLeft: '1px solid #6E2B8C',
                borderRight: '1px solid #6E2B8C',
                height: 30,
              }}
            >
              <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 8 }}>2.</Text>
            </View>
            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>

            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>

            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottom: '1px solid #6E2B8C',
              justifyContent: 'center',
              flexGrow: 2,
            }}
          >
            <View
              style={{
                width: '10%',
                borderLeft: '1px solid #6E2B8C',
                borderRight: '1px solid #6E2B8C',
                height: 30,
              }}
            >
              <Text style={{ textAlign: 'center', ...styles.textFont, marginVertical: 8 }}>3</Text>
            </View>
            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>

            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>

            <View style={{ width: '30%', borderRight: '1px solid #6E2B8C' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#6E2B8C',
                  fontFamily: 'Times-Bold',
                  marginVertical: 8,
                }}
              ></Text>
            </View>
          </View> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginBottom: 10,
            marginTop: 10,
            padding: 5,
            border: '1px solid #6E2B8C',
          }}
        >
          <View style={{ width: '80%', padding: 5 }}>
            <Text style={styles.textFont}>
              Is any of the controlling person is owning 50% and above from the company shares?
            </Text>
            <Text style={styles.textFont}>If Yes, Kindly fill CRS Controlling Person form</Text>
          </View>
          <View
            style={{
              width: '20%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}
          >
            <CheckBoxComp
              label={formdetails?.crsControllingPersonOwning?.value}
              val={formdetails?.crsControllingPersonOwning?.value}
            />
          </View>
        </View>

        <PdfTable
          head="BENEFICIAL OWNER/ ULTIMATE BENEFICIAL OWNER"
          body={
            <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
              <View style={{ width: '100%', padding: 5 }}>
                <Text style={{ fontFamily: 'Times-Bold', fontSize: 10, color: '#6E2B8C' }}>
                  Kindly list the beneficial owner/ultimate beneficial owner of the Entity (owning 25% shares and
                  above):
                </Text>
                <View style={{ flexDirection: 'column', gap: 8 }}>
                  {formdetails?.crsBeneficialOwner?.map((map: any, index: any) => (
                    <View style={{ flexDirection: 'row', gap: 2, width: '100%' }}>
                      <Text style={styles.textFont}>{index + 1})</Text>
                      <Text style={styles.inputLine}>{map?.crsBeneficialOwnerName || 'N/A'}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          }
        />
        <View style={{marginTop:5}}></View>
        <PdfTable
          head="PEP DECLARATION"
          body={
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', width: '100%' , borderBottom:"1px solid #6E2585"}}>
                <View
                  style={{
                    width: '80%',
                    borderRight: '1px solid #6E2B8C',
                    padding: 5,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={styles.textFont}>
                    1.Are you or any of the company's beneficial owner a current or former Politically Exposed Person
                    (PEP)? To learn more about what "Politically Exposed Person (PEP)" means, if Yes
                  </Text>
                  <InputComp
                    inputOne=" "
                    outputOne={formdetails?.pepDeclarationPoliticallyExposedPersonSelectOneOptions?.value || 'N/A'}
                  />
                </View>

                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                  }}
                >
                  <CheckBoxComp
                    label={formdetails?.pepDeclarationPoliticallyExposedPersonSelectOne?.value}
                    val={formdetails?.pepDeclarationPoliticallyExposedPersonSelectOne?.value}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%', borderBottom:"1px solid #6E2585" }}>
                <View
                  style={{
                    width: '80%',
                    borderRight: '1px solid #6E2B8C',
                    padding: 5,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={styles.textFont}>
                    2. Are you or any of the company's beneficial owners a "family member" of a current or former PEP?
                    To learn what "family member" means, click here
                  </Text>
                  <InputComp
                    inputOne=" "
                    outputOne={formdetails?.pepDeclarationPoliticallyExposedPersonSelectTwoOptions?.value || 'N/A'}
                  />
                </View>

                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                  }}
                >
                  <CheckBoxComp
                    label={formdetails?.pepDeclarationPoliticallyExposedPersonSelectTwo?.value}
                    val={formdetails?.pepDeclarationPoliticallyExposedPersonSelectTwo?.value}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' , borderBottom:"1px solid #6E2585"}}>
                <View
                  style={{
                    width: '80%',
                    borderRight: '1px solid #6E2B8C',
                    padding: 5,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}
                >
                  <Text style={styles.textFont}>
                    3. Are you or any of the company's beneficial owners a "close associate" of a current or former PEP?
                    To learn what "close associate" means, click here{' '}
                  </Text>
                  <InputComp
                    inputOne=" "
                    outputOne={formdetails?.pepDeclarationPoliticallyExposedPersonSelectThreeTextField || 'N/A'}
                  />
                </View>

                <View
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                  }}
                >
                  <CheckBoxComp
                    label={formdetails?.pepDeclarationPoliticallyExposedPersonSelectThree?.value}
                    val={formdetails?.pepDeclarationPoliticallyExposedPersonSelectThree?.value}
                  />
                </View>
              </View>
            </View>
          }
        />
        <PdfFooter />
      </Page>
      <Page size="A4" style={{ ...styles.page }}>





        <View style={{ ...styles.secondColumn, textAlign: 'left', marginTop: 5 }}>
          <Text
            style={{
              ...styles.arabicTextHead,
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
              textAlign: 'left',
              color: 'white',
            }}
          >
            Sanctions Undertaking
          </Text>
          <View style={{ flexDirection: 'column', gap: 5, padding: 5 }}>
            <Text style={styles.textFont}>
              The attached Sanctions Undertaking For Clients shall form integral part of this account opening
              documentation and I/We hereby affirm and pledge that our business endeavors will not knowingly engage in
              any form of direct or indirect association with the following sanctioned or embargoed countries: Cuba,
              Iran, Israel, North Korea, Ukraine, Russia, Belarus, and Syria.
            </Text>
            <View style={{ flexDirection: 'column', gap: 2, marginTop: 6 }}>
              <Text style={{ ...styles.textFont, fontSize: 8, fontFamily: 'Times-Bold' }}>
                Such association entails, but is not limited to, engaging in financial transactions and services,
                including payments to/from sanctioned countries, credit card activities, trade finance, insurance, and
                investments in sanctioned countries.
              </Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 2, marginTop: 3 }}>
              <Text style={{ ...styles.textFont, fontSize: 8, lineHeight: 2 }}>
                1) Transaction on-behalf of third parties’ individuals/entities those have direct/indirect nexus with
                one or more sanctioned country/ countries.{`\n`}</Text>
                <Text style={styles.textFont}>
                  2) Transport to / from, or (trans) shipment through one or more sanctioned country / countries.{`\n`}
                </Text>
                <Text style={styles.textFont}>
                  3) A company domiciled in, operating out of, or branch/ subsidiary of an entity located in such
                  sanctioned country (including but not limited to banks, government entities and their extended arms).
                  {`\n`}
                </Text>
                <Text style={styles.textFont}>
                  4) Seagoing vessels, including oil tankers and cargo vessels, holding the flag of any of the mentioned
                  sanctioned countries, or owned, controlled, charted, or operated directly or indirectly by such
                  sanctioned countries.
                </Text>

            </View>
            <View style={{marginTop:5}}>
              <Text style={styles.textFont}>I/We agree to provide the Bank with any supporting documents upon its request and hereby authorize the Bank to reject any transaction and/ or to discontinue the client{`\n`} relationship, if proved otherwise or if the Bank, at its sole assessment and discretion, believes that such business with sanctioned countries dealings do nevertheless exist.</Text>
            </View>
            <View style={{marginTop:3}}>
              <InputComp inputOne="Signatory Name:" outputOne={formdetails?.sactionsUndertakingClientsAuthorizedSignatoryName}/>
            </View>
          </View>
        </View>
        <Text style={{ marginVertical: 2, ...styles.textFont }}>*Kindly complete the beneficial certificate.</Text>

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
            FOLLOWING DOCUMENTS ARE TO BE ENCLOSED
          </Text>
          <View style={{ flexDirection: 'row', width: '100%', gap: '4%', padding: 4 }}>
            <View style={{ flexDirection: 'column', width: '48%', gap: 3 }}>
              <CheckBoxComp
                label="Commercial Registration Certificate"
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedCommercialRegistrationCertificate}
              />
              <CheckBoxComp
                label="Chamber of Commerce Certificate"
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedChamberofCommerceCertificate}
              />
              <CheckBoxComp
                label="Signature Attestation by Ministry of Commerce"
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedSignatureAttestationbyMinistryofCommerce}
              />
              <CheckBoxComp
                label="Computer Extract Printout"
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedComputerExtractPrintout}
              />
              <CheckBoxComp
                label={
                  'If S.A.O.G/S.A.O.C/Limited Liability Companies\nList of Names of all shareholders with\n 5% or more of share holding with their ID/PP with\n valid visa and/or CR copies'
                }
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedSAOGS}
              />
              <CheckBoxComp
                label="For all partnership accounts, a company resolution authorising opening and operation of account"
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedForallpartnershipaccounts}
              />
            </View>
            <View style={{ flexDirection: 'column', width: '48%', gap: 3 }}>
              <CheckBoxComp
                label={'ID/PP Copies of Proprietor/Partners\n/Directors/Authorised signatories'}
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedIDPPCopies}
              />
              <CheckBoxComp
                label=" Articles & Memorandum of Association"
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedArticlesMemorandumofAssociation}
              />
              <CheckBoxComp
                label="Municipality Certificate "
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedMunicipalityCertificate}
              />
              <CheckBoxComp
                label={'Bye-Laws (for clubs/societies etc.)\n and Concerned Ministry’s approval'}
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedByeLaws}
              />
              <CheckBoxComp
                label="Ministry of Finance Approval for Government Institutions"
                val={formdetails?.attDocumnetsEnclosed?.attDocumnetsEnclosedMinistryofFinanceApproval}
              />
            </View>
          </View>
        </View>
        <View style={{ borderBottom: '1px solid #6E2585', width: '100%', marginVertical: 4 }}></View>
        <View style={{ flexDirection: 'column', gap: 7 }}>
          <Text style={styles.textFont}>
            The attached “General Terms & Conditions of Account” shall form integral part of this account opening
            documentation and we hereby irrevocably agree to abide by them.
          </Text>
          <Text style={styles.textFont}>
            The authorised signatories and the power to sign as mentioned above to operate this account will hold good
            until such a time as notification of any amendment shall be received by the Bank in writing from the
            Company.
          </Text>
          <Text style={styles.textFont}>
            For a company under formation (except for S.A.O.G/S.A.O.C): We confirm that the signatories to this
            application are the promoters and we are fully aware that the amount deposited in the account cannot be
            withdrawn until the company is registered with the Commercial Registration
          </Text>
          <Text style={styles.textFont}>
            We certify that the information contained herein is true and accurate and undertake to notify you
            immediately in writing of any future changes in the Legal status of the Company or change in Ownership. In
            agreement whereof we sign hereunder on ________________ / ________________ / 20______________
          </Text>
          <View style={{ flexDirection: 'row', gap: 2, width: '100%' }}>
            <View style={{ flexDirection: 'row', gap: 1,alignItems:"center" }}>
              <Text style={{...styles.textFont,textAlign:'center'}}>And on behalf of:</Text>
              <Text style={{ borderBottom: '1px solid #6E2585', width: '90%' }}>{formdetails?.authSigBehalfOfCompany}</Text>
            </View>
            <Text style={styles.textFont}>(Company)</Text>
          </View>
          <InputComp inputOne="Name: "  outputOne={formdetails?.authSigName} />
          <InputComp inputOne="Name: " inputTwo="Signature:" outputOne={' '} outputTwo={' '} />
          <InputComp inputOne="Name: " inputTwo="Signature:" outputOne={' '} outputTwo={' '} />
          <InputComp inputOne="Name: " inputTwo="Signature:" outputOne={' '} outputTwo={' '} />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.textFont}>Company Seal/Stamp:</Text>
        </View>
        <PdfFooter />
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
          }}
        >
          <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>
          <View style={{ width: '100%', flexDirection: 'column', gap: 5, padding: 4 }}>
            <View style={{ flexDirection: 'column', gap: 4, width: '100%' }}>
              <Text style={{ fontFamily: 'Times-Bold', ...styles.textFont, textAlign: 'left' }}>
                Section A – FATCA due diligence Entities{' '}
              </Text>
              <Text style={{ fontFamily: 'Times-Bold', ...styles.textFont, textAlign: 'left' }}>
                Please confirm the FATCA status by checking the relevant box{' '}
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', backgroundColor: '#C0C0C0', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderTop: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Particular</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderTop: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Yes</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderTop: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>No</Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderTop: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Required Form</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Is the entity specified U.S person?</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>If yes, please obtain form W9</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Is the entity a financial institution?</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                    If yes, please obtain form W9 or W8 BEN E or other W8 Form proving relevant FATCA statusIf yes,
                    please obtain form W9
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>
                    Is the entity an Exempt Beneficial Owner?
                  </Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                    If yes, please obtain form W8 BEN E, W8 EXP or other W8 form as applicable
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Is the entity an active NFFE?</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>If yes, please obtain form W8 BEN E</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Is the entity Direct reporting NFFE?</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                    If yes, please obtain form W8 BEN E and GIIN
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>Does the entity have one or more</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>US indicia listed in Note 1</Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                    If yes, please obtain form W8 BEN E / other W8 form (as applicable) or similar documentation
                    establishing
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>
                    Does the entity substantial owner(s) have{' '}
                  </Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                    If yes, please obtain form W8 BEN E / other W8 form (as applicable) or similar documentation
                    establishing
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}> </Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                    If yes, please obtain form W- BEN E; and U.S. / Non-U.S. passport/ID or similar documentation
                    establishing foreign citizenship; or written explanation regarding U.S. citizenship
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>
                    Is the entity's income effectively connected
                  </Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderLeft: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>
                    with conduct of trade or business in U.S?{' '}
                  </Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '10%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#6E2B8C' }}></Text>
                </View>

                <View
                  style={{
                    width: '40%',
                    padding: 4,
                    borderRight: '1px solid #6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>If yes, please obtain form W8 ECI</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={{ ...styles.textFont, fontFamily: 'Times-Bold' }}>Section B – US Indicia</Text>
          <View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>
                  Note 1 – U.S Indicia For Corporate Entities
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  backgroundColor: '#C0C0C0',
                  borderTop: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'center', color: '#6E2B8C' }}>
                  Note 2 – U.S Indicia For Substantial Owner
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  Place of incorporation or organized in the U.S.
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  Shareholder/trustee/partner/director is a U.S. citizen or lawful permanent resident
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>Listed on U.S. Stock Exchange</Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  Place of birth shareholder/trustee/partner/director is in U.S
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  U.S. mailing / business / registered mailing address
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  Shareholder/trustee/partner/director has a US address or US phone number
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>Telephone number for the entity in U.S</Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}></Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  An offshore obligation, standing instructions to pay amounts to a U.S. address or U.S. based account
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}></Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  Power of attorney or signatory authority granted to a person with U.S. address
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}></Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}>
                  An "In-Care-Of" address or “Hold Mail” address that is the sole address provided for the entity.
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                }}
              >
                <Text style={{ textAlign: 'left', color: '#6E2B8C' }}></Text>
              </View>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>
      <Page size="A4" style={{ ...styles.page }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '10px',
            backgroundColor: '#FFFACD',
          }}
        >
          <Text style={{ ...styles.textFont, fontFamily: 'Times-Bold' }}>Section B – US Indicia</Text>
          <View style={{ flexDirection: 'column', gap: 10, width: '100%', padding: 5 }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <CheckBoxComp label="Specified U.S Person" />
              <CheckBoxComp label="Non US Person" />
              <View style={{ marginLeft: 28 }}>
                <CheckBoxComp label=" US owned Passive NFFE" />
              </View>

              <CheckBoxComp label="Recalcitrant " />
            </View>

            <View style={{ flexDirection: 'row', gap: 20, width: '100%' }}>
              <CheckBoxComp label="Non-Participating FFI" />
              <CheckBoxComp label="Direct Reporting NFFE" />
              <View style={{ flexDirection: 'row', gap: 2, width: '50%' }}>
                <CheckBoxComp label="Other (Please specify)" />
                <Text style={styles.inputLine}></Text>
              </View>
            </View>
          </View>
          <Text style={styles.textFont}>
            It is hereby confirmed that to the best of our knowledge, customer self-certification is correct. If
            subsequently anything comes to our knowledge that the customer is a specified U.S. person then we will get
            the customer’s status updated as a U.S. reportable account
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '40%' }}>
              <Text style={styles.inputLine}></Text>
              <Text style={styles.textFont}>Name</Text>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '40%' }}>
              <Text style={styles.inputLine}></Text>
              <Text style={styles.textFont}>Name</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '40%' }}>
              <Text style={styles.inputLine}></Text>
              <Text style={styles.textFont}>Signature & Date </Text>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '40%' }}>
              <Text style={styles.inputLine}></Text>
              <Text style={styles.textFont}>Signature & Date </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', borderTop: '1px solid #6E2B8C' }}>
                <View
                  style={{
                    width: '25%',
                    borderLeft: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                  }}
                >
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Introduced by</Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Signature</Text>
                </View>

                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Checked by</Text>
                </View>

                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
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

            <View>
              <View style={{ flexDirection: 'row', borderBottom: '1px solid #6E2B8C', borderTop: '1px solid #6E2B8C' }}>
                <View
                  style={{
                    width: '25%',
                    borderLeft: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                  }}
                >
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Introduced by</Text>
                </View>
                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Signature</Text>
                </View>

                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
                  <Text style={{ textAlign: 'center', ...styles.textFont }}>Checked by</Text>
                </View>

                <View style={{ width: '25%', borderRight: '1px solid #6E2B8C', backgroundColor: '#C0C0C0' }}>
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
          </View>
          <View style={{ marginTop: 5, flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
              <View style={{ width: '75%', flexDirection: 'row', gap: 5 }}>
                <Text style={styles.textFont}>1.</Text>
                <View>
                  <Text style={styles.textFont}>
                    Is Business activity categorized as High Risk Business activities within bank?{' '}
                  </Text>
                  <Text style={styles.textFont}>If Yes, Kindly obtain CDD Corporate form</Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}
              >
                <CheckBoxComp label="Yes" />
                <CheckBoxComp label="No" />
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
              <View style={{ width: '75%', flexDirection: 'row', gap: 5 }}>
                <Text style={styles.textFont}>2.</Text>
                <View>
                  <Text style={styles.textFont}>Is any of the shareholders or authorize signatories are PEP?</Text>
                  <Text style={styles.textFont}>If Yes, kindly obtain CDD Corporate form</Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}
              >
                <CheckBoxComp label="Yes" />
                <CheckBoxComp label="No" />
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
              <View style={{ width: '75%', flexDirection: 'row', gap: 5 }}>
                <Text style={styles.textFont}>3.</Text>
                <View>
                  <Text style={styles.textFont}>
                    Is company name and major shareholders has been screened through the sanction lists?
                  </Text>
                  <Text style={styles.textFont}>(Screening result should be attached)</Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}
              >
                <CheckBoxComp label="Yes" />
                <CheckBoxComp label="No" />
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
              <View style={{ width: '75%', flexDirection: 'row', gap: 5 }}>
                <Text style={styles.textFont}>4.</Text>
                <View>
                  <Text style={styles.textFont}>
                    Is any of the shareholders nationalities are listed in the sanction/high risk nationalities as per
                    {'\n'}
                    OFAC list?Is company name and major shareholders has been screened through the sanction lists?
                  </Text>
                  <Text style={styles.textFont}>if Yes, kindly obtain CDD corporate form</Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}
              >
                <CheckBoxComp label="Yes" />
                <CheckBoxComp label="No" />
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
              <View style={{ width: '75%', flexDirection: 'row', gap: 5,alignItems:'center' }}>
                <Text style={styles.textFont}>5.</Text>
                <View>
                  <View style={{ flexDirection: 'row', gap: 50,alignItems:'center' }}>
                    <Text style={styles.textFont}>
                      What is the initial risk rating of the entity based on AML risk factors above?
                    </Text>
                    <CheckBoxComp label="High" />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}
              >
                <CheckBoxComp label="Yes" />
                <CheckBoxComp label="No" />
              </View>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={{ ...styles.page,lineHeight:1 }}>
 <View style={{ flexDirection: 'column', marginTop: 5 }}>
      <Text style={styles.title}>Corporate Current Account Terms & Conditions:</Text>
      <View style={{ flexDirection: 'column', marginTop: 16 }}>
        <Text style={styles.paragraph}>1. These conditions in addition to the General Terms & Conditions shall govern the relationship between Bank Nizwa (the “Bank”) and the Customer or Customers whose particulars are set out on the appropriate account opening form (the “Customer”) regarding all and any accounts opened by the Customer with the Bank (together the “Accounts”) subject only to any special condition applicable to any of the Accounts.</Text>
        <Text style={styles.paragraph}>2. The credit balance in the Current Account is deposited by the Customer as a “Qard” to the Bank, on which no profit or other form of return is payable. The Bank undertakes to pay any credit balance in its favour in the Current Account in full at the request of the Customer, subject to the Customer’s compliance with these Conditions, and the General terms and Conditions of the Bank. The Bank may invest the credit balance in the Current Account in such manner as the Bank, in its absolute discretion, deems fit, not contradicting Shari’a Principles. No returns of whatsoever nature (including profit) shall be paid out to the Customer on the Current Account.</Text>
        <Text style={styles.paragraph}>3. The Customer shall draw cheques in Arabic or English languages. The Bank shall not accept cheques written in any other languages.</Text>
        <Text style={styles.paragraph}>4. The Customer will periodically receive statements in respect of each of the Accounts. The Customer agrees to examine each statement of Account and to raise any objection in writing within thirty (30) days from the date of issue of such statement notice or other communication. If there is any delay in making any subject objection they shall be deemed to be accurate and if as a consequence of such delay the Bank incurs any loss whatsoever, such loss shall be borne by the Customer.</Text>
        <Text style={styles.paragraph}>5. All statements, notices and other communications shall be deemed to have been validly transmitted upon the day following the date of their dispatch by the Bank or on the date of deposit in the mailbox allotted to the Customer, if any in the Bank’s premises. The date of the copies of such notices, statements and other communications or the mailing lists in the possession of Bank, shall be conclusive evidence as to the date of such dispatch. The Bank should also be informed as quickly as possible if any such statement, notice or communication is not received by the Customer when expected.</Text>
        <Text style={styles.paragraph}>6. No profit will be paid on current account deposits. Incidental/service charges or any out-of-pocket expenses will be recovered at the prevailing rates at the Bank’s discretion.</Text>
        <Text style={styles.paragraph}>7. Any foreign currency account of the Customer is deemed to be held in that foreign currency. Governmental measures and/or restrictions whether international or domestic affecting the Bank shall correspondingly apply to the Customer credit balance in the account for any loss, delay, liability or damage whatsoever arising on any foreign currency account may be subject to special conditions as shall be notified to the Customer by the Bank and shall be subject to a commission payable to the Bank.</Text>
        <Text style={styles.paragraph}>8. Whereas the Bank may grant or continue to grant financing facilities to the company by way of opening documentary credits and/or by any other transactions of whatsoever nature as the Bank may in its absolute discretion think fit at a Profit rate(s) which the Bank shall have the right to vary at any time with the need to give intimation to and receive concurrence from the Company. The Company undertakes to repay to the Bank on demand at any time all monies and discharge all such liabilities and the Bank may at any time without further order from or notice to the Company apply such monies in or towards satisfaction of such indebtedness or liability.</Text>
        <Text style={styles.paragraph}>9. The Bank shall have a right of set-off over all and any deposit of the Customer including any foreign currency accounts in respect of all and any indebtedness of the Customer at any time to the Bank and all the Accounts of the Customer with the Bank and any branch thereof shall be treated as a single combined account for the purpose of Article 346 of Royal Decree 55/90.</Text>
        <Text style={styles.paragraph}>10. Any money or other asset of whatever nature, which are held in the name of the Customer by the Bank, shall be exclusively pledged to the Bank or any other monies due to the Bank from the Customer including without limitation all and any principal sums together with all and any profit and other charges. The Bank shall have expressed rights of lien over any credit balance available in any of the Customers’ accounts for settlement of any outstanding amount in the name of the Customer and in favour of the Bank.</Text>
        <Text style={styles.paragraph}>11.The Bank is authorised to debit and charge to any of the Accounts all cheque, orders signing authority or authorities provided, to the Bank by the Customer and Customer herby waives the Customer’s right to immediate notice pursuant to Article 341 or Royal Decree 55/90 in the event of such overdrawing.</Text>
        <Text style={styles.paragraph}>12. All sums/instruments deposited to the credit of an account shall be acknowledged by the signature of an authorised official and stamp of the Bank on Customer’s copy of pay-in-slip in the absence of which the Bank shall be absolved of all responsibility or consequences.</Text>
        <Text style={styles.paragraph}>13. Cheque books will be issued upon completion in all respects of formalities for opening of the account. It is the responsibility of the Customer to keep all cheque book issued to the company under secure control at all times and to notify the Bank immediately should any cheque leaf/book be lost or stolen. The Customer shall be liable for all losses incurred from such loss or theft if the loss or theft wholly or in part arose from the negligence of the Customer or as result of the Customer failing to exercise due care. It is understood and agreed by the Customer that cheques will be drawn on the Bank only if sufficient freely available funds are maintained in the account. The Bank is further authorised to debit and charge to any of the Accounts a service charge in respect of returned cheque at rate deemed appropriate by the Bank.</Text>
        <Text style={styles.paragraph}>14. All instruments such as cheques and dividend warrants Payable to the Customer shall be accepted simply for collection, without assuming any responsibility as to form, regularity or authenticity of such instrument and the Bank shall not be under any obligation whatsoever to pursue the recovery of such instruments.</Text>
        <Text style={styles.paragraph}>15. The Customer agrees that the Bank shall have the right, without giving notice to the Customer, to refuse to repay when demanded or when the same fall due any of the Bank’s indebtedness to the Customer if and to the extent that the Customer’s aggregate liabilities at the relevant time are equal to or exceed the Bank’s indebtedness to the Customer.</Text>
        <Text style={styles.paragraph}>16. Notwithstanding Article 345 of Royal Decree 55/90, all and any deposit and withdrawals on any of the accounts may be made at any branch of the Bank in the Sultanate of Oman subject to production of satisfactory evidence of the Customer identity and the necessary details of such Account and subject to the Bank’s Customer charges.</Text>
 <Text style={styles.paragraph}>17. In the event of bankruptcy or incapacity of the Customer the Bank shall not be liable for any loss, damage or liability pursuant to such bankruptcy or incapacity
which may arise from any dealing on any of the Accounts unless and until the Bank shall receive notice in writing of such bankruptcy or incapacity signed by
a suitable representative of the Customer and supported by documentary evidence satisfactory to the Bank or from the Government authority. However, the
Bank shall have the right to take all steps it seems appropriate, if such information has reached the Bank at its sole discretion.</Text>

        <Text style={styles.paragraph}>18. The Bank shall have the right without any consent from or notice to the Customer to debit any of the Accounts with all fees, profit, commission, taxes, charges, duties and other expenses paid or incurred by the Bank on behalf of the Customer or arising out of any dealings between the Bank and the Customer.</Text>
        <Text style={styles.paragraph}>19. A stop payment order will not be accepted by the Bank except in the event of, loss or theft of a cheque or the bankruptcy of the intended payee or in such other cases as shall be agreed by the Bank in writing in advance, provided always that any such stop payment order is made at the sole risk and responsibility of the Customer and against completion of and valid execution by the Customer of the appropriate form of document required by the Bank.</Text>

      </View>
      </View>
       </Page>
       <Page size="A4" style={{ ...styles.page }}>
        <View style={{ flexDirection: 'column', marginTop: 16 }}>
          <Text style={styles.paragraph}>20. The Customer’s address for service of any notice, statement or communication shall be the address indicated on the appropriate account opening form or such other addresses the Customer shall notify to the Bank in writing.</Text>
        <Text style={styles.paragraph}>21. Any failure or delay on the part of the Bank to insist on fulfilment by the Customer of any these conditions including without limitation any indulgence, concession, settlement or arrangement that the Bank may at its discretion allow or provide to the Customer, shall not mean or be taken as a waiver on the part of the Bank of any of its rights hereunder.</Text>
        <Text style={styles.paragraph}>22. The Customer warrants and undertakes that as at the date of opening all and any of the Accounts, the Customer is solvent and has not ceased to make payment of any debts for the purposes of Article 609 of Royal Decree 55/90.</Text>
        <Text style={styles.paragraph}>23. The Customer further warrants that all particulars given to the Bank (whether in an account opening form or otherwise) are true and accurate and if the particulars change at any time it will immediately notify the Bank of any such change.</Text>
        <Text style={styles.paragraph}>24. Each of these conditions is severable and the invalidity or unenforceability of one or more such conditions shall not affect the remaining such conditions which shall remain if full force and effect.</Text>
        <Text style={styles.paragraph}>25. The signature of the Customer below hereby authorises the provision of any information by the Bank to any third party pursuant to Article 4-4.07 (a) of the Oman Banking Law of 1974, as amended from time to time.</Text>
           <Text style={{...styles.paragraph}}>26. Disclaimer/Indemnity</Text>
        <Text style={{...styles.paragraph, marginLeft:10}}>26.1 The Bank is hereby irrevocably authorised to accept instruction from the Customer at the sole discretion of the Bank from time to time by facsimile transmission (the “instructions”) for the operation of the Customer’s account without requiring written confirmation bearing an actual signature in accordance with mandate for such account prior to acting on the instructions the Customer confirms that:</Text>
        <Text style={{...styles.paragraph, marginLeft:10}}>26.2 The Bank is hereby irrevocably and unconditionally authorised to act on the instructions which, in the Bank’s sole discretion the Bank believes emanate from the Customer or otherwise appear to comply with terms of the mandate for the above account and the Bank shall not be liable for so acting in any circumstance whatsoever.</Text>
        <Text style={{...styles.paragraph, marginLeft:10}}>26.3 The Bank shall in particular not be under any duty to verify the identity of the person or persons giving the instructions’ purportedly in Customers name or the authenticity of the facsimile signature, and any transaction made pursuant to the instruction shall be binding upon the Customer whether made with or without Customer’s authority, knowledge or consent.</Text>
        <Text style={{...styles.paragraph, marginLeft:10}}>26.4 The Customer undertakes to keep the Bank indemnified at all times against and to hold the Bank harmless from all actions, proceedings, claims, losses, damages, costs and expenses which may be brought against the Bank suffered or incurred by the Bank and which shall have either directly or indirectly come out of or in connections and acting thereon.</Text>
        {/* <Text style={{...styles.paragraph, marginLeft:10}}>26.3 The Bank shall in particular not be under any duty to verify the identity of the person or persons giving the instructions’ purportedly in Customers name or the authenticity of the facsimile signature, and any transaction made pursuant to the instruction shall be binding upon the Customer whether made with or without Customer’s authority, knowledge or consent.</Text> */}
        <Text style={styles.paragraph}>27. The Customer declares and undertakes that the accounts will only be used for legitimate business transaction and not for any illegal purposes.</Text>
        <Text style={styles.paragraph}>28. It will be an obligation of the Customer to avoid negligence and take sufficient necessary precautions in all acts and matters relating to the operation and maintenance of the account with the Bank. The Bank reserves the right to close any account and/or withdraw cheque book facility if the conduct of account is deemed unsatisfactory. In such an eventuality, the balance available in the account net of Bank charges, if any, will be remitted to the Customer by way of a banker’s cheque/demand draft mailed to their latest address available with the Bank.</Text>
        <Text style={styles.paragraph}>29. Any item not covered under these conditions, shall be governed by the General Terms & Conditions of the Bank, as applicable from time to time. The Corporate Current Account Terms & Conditions shall be read and interpreted in conjunction with the General Terms & Conditions of the Bank. Words capitalized but not otherwise defined in these conditions, shall have the same meaning as defined under the General Terms & Conditions. These terms must be read in conjunction.</Text>
        <Text style={styles.paragraph}>30. These conditions shall be governed by the laws of the Sultanate of Oman and the Customer submits to the non-exclusive jurisdiction of the commercial court in Muscat, Sultanate of Oman, or any successor body thereto and courts of any other country or jurisdiction not contradicting Shari’a principles.</Text>

        </View>
       </Page>
    </Document>
  );
}
