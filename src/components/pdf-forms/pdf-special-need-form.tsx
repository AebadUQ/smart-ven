'use client';

import { isNull } from 'util';



import * as React from 'react';
import { AccountBox, SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { Input, typographyClasses } from '@mui/material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { solarizedLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { symbol } from 'zod';



import { dayjs } from '@/lib/dayjs';



import { AccountBoxes } from './account-number-boxes-component';
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
    marginTop: 2,
  },

  label: {
    fontWeight: 'bold',
    marginRight: 2,
    color: '#6E2B8C',
    fontSize: 12,
  },
  secondLabel: {
    color: '#6E2B8C',
    fontSize: 9,
    paddingLeft: 3,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
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
    gap: 4,
  },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    width: '100px',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 1,
    // textAlign:"right"
  },
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 8,
    direction: 'rtl',
    // textAlign: 'right',
    color: '#6E2B8C',
  },
   arabicTextTwo: {
    fontFamily: 'Cairo',
    fontSize: 8,
    // direction: 'rtl',
    // textAlign: 'right',
    color: '#6E2B8C',
  },
  arabText: {
    fontFamily: 'Cairo',
    direction: 'rtl',
    textAlign: 'right',
    color: '#6E2B8C',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:10

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

export function SpecialNeedPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  const standingOrderStartDate = dayjs(formdetails?.sofStandingOrderStartDate).format('MMM D, YYYY h:mm A');
  const standingOrderEndDate = dayjs(formdetails?.sofStandingOrderEndDate).format('MMM D, YYYY h:mm A');

  return (
    <Document>
      <Page size="A4" style={{ ...styles.page }}>
        <PdfHeader formName={data?.form_name} />

        <View style={{ flexDirection: 'row', maxWidth: '100%', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column', maxWidth: '48%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
                Note: Please complete in Block letters and sign in the appropriate space.
              </Text>
            </View>
            <View style={styles.column}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'column', gap: 1 }}>
                    <Text style={styles.textFont}>The Manager,</Text>
                    {/* <View style={{ flexDirection: 'row', gap: 5 }}> */}
                      <InputComp inputOne="Branch" outputOne={formdetails?.sncBranch?.value}/>

                    {/* </View> */}
                    <View style={{ flexDirection: 'column', gap: 5, marginTop: 10 }}>
                      <Text style={{ fontSize: 7, color: '#6E2B8C' }}>Based on my application to the Bank dated</Text>
                      <CustomDate date={formatedDate} />

                    </View>
                    <View style={{ flexDirection: 'column', gap: 10, marginTop: 5 }}>
                      <Text style={{ fontSize: 7, color: '#6E2B8C' }}>
                        to provide me with an ATM card for my account no.
                      </Text>
                      <AccountBoxes data={formdetails?.sncAccountNumber.split("")} />
                    </View>
                    <View style={{ flexDirection: 'column', gap: 5 }}>
                      <Text style={{ color: '#6E2B8C', fontSize: 8, marginTop: 5 }}>
                        with the Bank, and as I am aware of the consequences of issuing such a card, I hereby
                        acknowledge and accept assume full responsibility for all my transactions carried out on my
                        account through any ATM/ POS Machine, inside or outside the Sultanate and I shall be liable for
                        the safe custody of the ATM card and its PIN number, which were issued to me by Bank Nizwa upon
                        my own request.
                      </Text>
                      <Text style={{ color: '#6E2B8C', fontSize: 8}}>
                        I admit that the employee of the Bank, in the presence of two witnesses mentioned below, has
                        read and explained to me all the terms and conditions related to the use of the card through
                        ATM/POS Machine and clarified to me the risk and consequences ensuing from such use.
                      </Text>
                      <Text style={{ color: '#6E2B8C', fontSize: 8}}>
                        II also admit that I have personally received from the Bank my ATM card, as well as a copy of
                        the Bank’s terms and conditions, which I understood and accepted its content.
                      </Text>
                      <Text style={{ color: '#6E2B8C', fontSize: 8 }}>
                        II also admit that I have personally received from the Bank my ATM card, as well as a copy oI
                        also hereby declare that neither the Bank nor any of its employees are responsible for my
                        transaction related to ATM/PIN/POS and indemnify the Bank against any request or claim for any
                        losses or damages from the use of the ATM/PIN/POS.
                      </Text>
                    </View>
                  </View>

                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', maxWidth: '48%',marginTop:2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text style={{ ...styles.arabicText }}>
                مالحظة: الرجاء تعبئة هذا الطلب بخط واضح والتوقيع في الفراغ المخصص لذلك.
              </Text>
            </View>
            <View style={styles.column}>
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'column', gap: 1 }}>
                    <Text style={styles.arabicText}>الفاضل/مدير الفرع المحترم</Text>
                    {/* <View style={{ flexDirection: 'row-reverse', gap: 5 }}> */}
                      <InputArabicComp inputOne="فرع" outputOne={formdetails?.sncBranch?.value}/>
                      {/* <Text style={styles.arabicText}>فرع:</Text>
                      <Text style={styles.input}>{formdetails?.sncBranch?.value}</Text> */}
                    {/* </View> */}
                    <View style={{ flexDirection: 'column', gap: 5, marginTop: 10,justifyContent:"flex-end" }}>
                      <Text style={{...styles.arabicText }}>بناء على طلبي المقدم إلى البنك بتاريخ</Text>
                      <CustomArabicDate date={formatedDate}/>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 10, marginTop: 5, justifyContent:'flex-end' }}>
                      <View>
                      <Text style={{ ...styles.arabicText }}>لتزويدي ببطاقة صراف آلي على حسابي بالبنك رقم
</Text></View>
                      <AccountBoxes data={formdetails?.sncAccountNumber.split("")} />
                    </View>

                    <View style={{ flexDirection: 'column', gap: 5 }}>
                      <Text style={{ ...styles.arabicText, marginTop: 10 }}>
وإدراكاً مني وقبولاً لما قد يترتب على إصدار هذه البطاقة، فإنني بموجب هذا أقر وأقبل بتحمل كامل المسؤولية عن إصدار البطاقة لي، وعلى وجه الخصوص أتحمل مسؤولية كافة المعاملات التي تتم على حسابي المذكور عبر أي من أجهزة الصراف الآلي/نقاط البيع سواء داخل السلطنة أو خارجها. وأتحمل مسؤولية الحفاظ على البطاقة والرقم السري اللذين يصدرهما لي البنك بناءً على طلبي                      </Text>
                      <Text style={{ ...styles.arabicText, marginTop: 10 }}>
وأقر أن موظف البنك، وبحضور الشاهدين المذكورين أدناه، قد قرأ لي وأطلعني على كافة الشروط والبنود المتعلقة باستخدام البطاقة عبر أجهزة الصراف الآلي/نقاط البيع، كما أوضح لي المخاطر والعواقب المترتبة على ذلك.

                      </Text>
                      <Text style={{ ...styles.arabicText,marginTop:15}}>
وأقر بأني قد استلمت شخصياً من البنك بطاقة الصراف الآلي الخاصة بي، وكذلك قد استلمت نسخة من الشروط والبنود الخاصة بالبنك، وفهمت ووافقت على محتوياتها                      </Text>
                      <Text style={{ ...styles.arabicText,marginTop:10}}>
كما أدرك أيضاً بأن البنك أو أي من موظفيه لا يتحملون مسؤولية المعاملات التي تتم عبر أجهزة الصراف الآلي/الرقم السري/نقاط البيع، وأتنازل عن حقي في أي ادعاء على البنك أو مطالبة بأي عطل أو ضرر أو خسارة من جراء المعاملات التي تتم عبر الصراف الآلي أو استخدام الرقم السري أو نقاط البيع.                      </Text>
                    </View>
                  </View>

                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 5 }}>
            <View
              style={{
                fontSize: '8px',
                borderTop: '1px solid #6E2585',
                borderRight: '1px solid #6E2585',
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
                }}
              >
                <Text style={styles.arabText}>(1) اسم الشاهد</Text>
              </View>
              <View
                style={{
                  height: '30px',
                  justifyContent: 'flex-start',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              ></View>
              <View
                style={{
                  height: '30px',
                  justifyContent: 'flex-end',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              ></View>
            </View>

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
                  borderBottom: '1px solid #6E2585',
                  alignItems: 'center',
                  color: '#6E2585',
                  width: '100%',
                }}
              >
                <Text >Name of the Customer(1)</Text>
              </View>
              {Array.from({ length: 2 })?.map((_, index: any) => (
                <View
                  key={index}
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'flex-start',
                    borderRight: 0,
                    alignItems: 'flex-start',
                    color: '#6E2585',
                    // borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  <Text style={styles.arabicText}> </Text>
                </View>
              ))}
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
                  // padding: '8px',
                  // height: '15px',
                }}
              >
                <Text style={styles.arabText}> Right Thumb Impression األيمن االبهام ب</Text>
              </View>
              {Array.from({ length: 2 })?.map((items: any, index: any) => (
                <View
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'flex-start',
                    borderRight: 0,
                    alignItems: 'flex-start',
                    color: '#6E2585',
                    // borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <View
              style={{
                fontSize: '8px',
                borderTop: '1px solid #6E2585',
                // borderLeft: '1px solid #6E2585',
                // borderBottom: '1px solid #6E2585',
                borderRight: '1px solid #6E2585',
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
                }}
              >
                <Text style={styles.arabText}>اسم العميل:</Text>
              </View>
              <View
                style={{
                  height: '30px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-start',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  // borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              ></View>
              <View
                style={{
                  height: '30px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-end',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  // borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              ></View>
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
                  // padding: '8px',
                }}
              >
                <Text >Name of the Customer</Text>
              </View>
              {Array.from({ length: 2 })?.map((_, index: any) => (
                <View
                  key={index}
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'flex-start',
                    borderRight: 0,
                    alignItems: 'flex-start',
                    color: '#6E2585',
                    // borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  <Text style={styles.arabicText}> </Text>
                </View>
              ))}
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
                  // padding: '8px',
                }}
              >
                <Text style={styles.arabText}> signature التوقيع</Text>
              </View>
              {Array.from({ length: 2 })?.map((items: any, index: any) => (
                <View
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'flex-start',
                    borderRight: 0,
                    alignItems: 'flex-start',
                    color: '#6E2585',
                    // borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row-reverse', borderBottom: '1px solid #6E2585' }}>
            <View
              style={{
                fontSize: '8px',
                borderTop: '1px solid #6E2585',
                // borderLeft: '1px solid #6E2585',
                // borderBottom: '1px solid #6E2585',
                borderRight: '1px solid #6E2585',
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
                }}
              >
                <Text style={styles.arabText}>اسم العميل:</Text>
              </View>
              <View
                style={{
                  height: '30px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-start',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  // borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              ></View>
              <View
                style={{
                  height: '30px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-end',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  // borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: '8px',
                }}
              ></View>
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
                  // padding: '8px',
                }}
              >
                <Text>Name of the Customer</Text>
              </View>
              {Array.from({ length: 2 })?.map((_, index: any) => (
                <View
                  key={index}
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'flex-start',
                    borderRight: 0,
                    alignItems: 'flex-start',
                    color: '#6E2585',
                    // borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  <Text style={styles.arabText}> </Text>
                </View>
              ))}
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
                  // padding: '8px',
                }}
              >
                <Text style={styles.arabText}> signature التوقيع</Text>
              </View>
              {Array.from({ length: 2 })?.map((items: any, index: any) => (
                <View
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'flex-start',
                    borderRight: 0,
                    alignItems: 'flex-start',
                    color: '#6E2585',
                    // borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
                </View>
              ))}
            </View>
          </View>
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
              backgroundColor: '#FFFACD',
              padding: '5px',
            }}
          >
            <View style={{ flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.arabicText}>الستخدام الفرع فقط</Text>
              <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>
            </View>
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                  <View style={{ flexDirection: 'column',gap:1,justifyContent:'flex-end' }}>
                    <Text style={styles.textFont}> :Signature</Text>
                    <Text style={styles.arabicTextTwo}> التوقيع</Text>
                  </View>
                  <Text style={styles.input}></Text>
                </View>
                 <View style={{ flexDirection: 'row-reverse', gap: 5}}>
                  <View style={{ flexDirection: 'column',alignItems:'center',justifyContent:'center' }}>
                    <Text style={styles.textFont}> :Staff Name/No.</Text>
                    <Text style={styles.arabicTextTwo}> اسم / رقم الموظف</Text>
                  </View>
                  <Text style={styles.input}></Text>
                </View>
              </View>

               <View style={{ flexDirection: 'row-reverse',gap:10}}>
              <CustomDate date={" ".repeat(8)} />
              {/* <InputArabicComp inputOne=":التاريخ" outputOne={""} /> */}
                 <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                  <View style={{ flexDirection: 'column', alignItems:'flex-end' }}>
                    <Text style={styles.textFont}> :BM/ABM Signature & Stamp</Text>
                    <Text style={styles.arabicTextTwo}>توقيع مدير الفرع / مساعد مدير الفرع والختم</Text>
                  </View>
                  <Text style={styles.input}></Text>
                </View>
              </View>

            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',

              backgroundColor: '#FFFACD',
              padding: '5px',
            }}
          >
            <View style={{ flexDirection: 'column', gap: 2,marginTop:10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.arabicTextTwo}>الستخدام عمليات البطاقات فقط</Text>
              <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR CARD OPERATION USE ONLY</Text>
            </View>
            <View style={{flexDirection:'row-reverse',gap:150}}>
            <View style={{ flexDirection: 'column', gap: 10,justifyContent:'space-between' }}>
              <View style={{ flexDirection: 'row',gap:10, justifyContent:'flex-start' }}>
                <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textFont}> :Signature</Text>
                    <Text style={styles.arabicTextTwo}> التوقيع</Text>
                  </View>
                  <Text style={styles.input}></Text>
                </View>

              </View>

               <View style={{ flexDirection: 'row',gap:30  }}>

                 <View style={{ flexDirection: 'row-reverse', gap: 5, }}>
                  <View style={{ flexDirection: 'column', alignItems:"flex-end" }}>
                    <Text style={styles.textFont}>  :BM/ABM Signature & Stamp</Text>
                    <Text style={styles.arabicTextTwo}>توقيع مدير الفرع / مساعد مدير الفرع والختم</Text>
                  </View>
                  <Text style={styles.input}></Text>
                </View>
              </View>

              </View>
              <View style={{ width: "150px", height: "60px", flexDirection: "column", padding:2, border:"1px solid #56004E" }}>
                <Text style={styles.arabicText}>تاريخ ووقت االستالم والختم</Text>
                <Text style={styles.arabicText}>Date/Time Received & Stamp</Text>
              </View>
              </View>
          </View>


        <PdfFooter />
      </Page>
    </Document>
  );
}
