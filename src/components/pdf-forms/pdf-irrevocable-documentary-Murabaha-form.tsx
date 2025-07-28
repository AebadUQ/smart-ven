'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import MultiTitleHeader from './ui/multiTitleHeader';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
});

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginRight: 2,
    color: '#6E2B8C',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Cairo',
  },
  subTitle: {
    fontWeight: 'semibold',
    color: '#6E2B8C',
    fontSize: 12,
    textAlign: 'left',
    // direction: 'direction',
    fontFamily: 'Cairo',
  },

  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 8,
    color:"#6E2585",
    direction: 'rtl',
    textAlign: 'right',
  },
  customRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '100%',
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

  rowAr: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },

  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },

  secondRowAr: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    color:'#6E2585'
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

  labelAr: {
    fontWeight: 'bold',
    marginTop: 4,
    marginRight: 5,
    color: '#6E2B8C',
    fontFamily: 'Cairo',
    textAlign: 'right',
  },

  secondLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6E2B8C',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    fontSize: 10,
    flexGrow: 1,
    alignSelf: 'flex-end',
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
    fontSize: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
    // marginBottom: 5,
    gap: 5,
  },
  dateCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 5,
    marginLeft: 8,
  },
  // checkbox: {
  //   width: 10,
  //   marginRight: 2,
  //   height: 10,
  //   fontSize: 2,
  //   borderWidth: 1,
  //   borderColor: '#6E2B8C',
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   textAlign: 'center',
  // },
  checkbox: {
    width: 15,
    minWidth: 15,
    // marginRight: 6,
    height: 15,
    minHeight: 15,
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

export function IrrevocableDocumentaryMurabahaForm({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDateTwo = dayjs(data?.createdAt).format('DDMMYYYY');

  const termsConditionData = {
    title: '',
    list: [
      {
        title: '',
        description: [
          {
            isClosure: false,
            text: 'The Promisor has given this binding Promise in accordance with the following terms and conditions : ',
          },

          {
            isClosure: true,
            text: 'The above Preamble and the attached Proforma Invoice/Quotation/Offer shall be considered an integral part of this Promise, and all its clauses should be construed in the light of their respective terms and intended meanings.',
          },

          {
            isClosure: true,
            text: 'The sale of Goods, which is the subject of this Promise, shall be made on Murabaha basis and at the Murabaha Sale Price detailed hereunder : ',
          },

          // {
          //   isClosure: true,
          //   text: 'The Murabaha contract shall include the following main terms : ',
          //   subClause: [
          //     {
          //       isClosure: true,
          //       text: 'Before clearing the Goods from the port of destination, and upon the Bank selling the purchased Goods to the Promisor on Murabaha basis, and transferring possession of the Goods to the Promisor, the Promisor shall bear the loading and unloading charges, Customs duty, port clearance charges, taxes and transportation cost of Goods to the Promisors warehouse, after which the Promisor is not entitled to claim any of the aforesaid charges from the Bank.',
          //     },

          //     {
          //       isClosure: true,
          //       text: 'The Promisor shall bear all ownership risks of the Goods after signing the Murabaha Sale Contract and assuming ownership of the Goods by actual or constructive possession.',
          //     },
          //   ],
          // },

          // {
          //   isClosure: true,
          //   text: 'The Promisor shall guarantee the good performance of the suppliers M/s: from whom the Promisor requests purchase of the Goods, regarding the delivery of Goods, matching quantities, qualities and specific conditions and specifications. As such, the Promisor irrevocably undertakes to compensate the Bank, on demand, for any actual damages or losses resulting from suppliers failure to meet its obligations, except for overwhelming circumstances (Force Majeur).',
          // },

          // {
          //   isClosure: true,
          //   text: 'The Promisor authorizes the bank to buy or sell, at the prevailing foreign exchange spot rate, at the date of signing the Murabaha sale contract, the foreign currency equal to value of documents and settle documents received under sight or Usance (Acceptance) L/C.',
          // },
          // {
          //   isClosure: true,
          //   text: 'If the Promisor breaches on the Promise to purchase the Goods after the Bank purchased the same, the Bank, as owner of the Goods, is entitled to sell the same Goods and recover the purchase cost and all relevant actual costs and administrative expenses thereof. If the proceeds from sale of Goods exceed the Banks entitlement, such excess will be the sole right of the Bank in its capacity as the owner of the Goods. If the proceeds from sale of Goods are less than the purchase cost and all administrative expenses/ actual costs, the shortfall shall be deducted from the seriousness cash margin amount, and the Promisor is liable to pay the Bank any difference amount if this seriousness cash margin is not sufficient, until final settlement.',
          // },

          // {
          //   isClosure: true,
          //   text: 'If the Client refuses to receive the Goods, or documents relating to the Goods, after concluding the Murabaha sale contract within a period specified by the Bank, the Bank is entitled in this case to abrogate the Murabaha sale contract and retain ownership of the goods and sell the Goods and receive the sale proceeds to settle the purchase cost and all relevant expenses and costs, and revert to the Promisor for any shortfall.',
          // },
          // {
          //   isClosure: true,
          //   text: 'In the event that the supplier fails to act on the Letter of Credit opened by the Bank and supply the goods to the Bank, the Promisor acknowledges that the Bank will not be held responsible by it for the non-execution of the order by the supplier. The Promisor undertakes to reimburse the Bank for L/C opening expenses, Takaful, and all other related expenses and costs.',
          // },
          // {
          //   isClosure: true,
          //   text: 'The Promisor also acknowledges that the Bank shall not be responsible for any losses which the Promisor may incur due to delay in the shipping and arrival of the Goods/documents thereof. The Promisor, in the execution of this Promise, undertakes to buy the Goods and enter into a Murabaha sale contract immediately upon the Bank assuming constructive possession thereof.',
          // },
          // {
          //   isClosure: true,
          //   text: 'The Promisor acknowledges that its address is that one provided at the beginning of this Promise and in the Account Opening Form.',
          // },
          // {
          //   isClosure: true,
          //   text: 'The Promisor hereby irrevocably undertakes to be bound to the General Terms and Conditions of the Bank.',
          // },

          // {
          //   isClosure: true,
          //   text: 'This Promise is to be read together with the Master Murabaha Agreement. All terms contained therein are to be incorporated herein by reference.',
          // },
        ],
      },
    ],
  };

  const termsConditionDataAr = {
    title: '',
    list: [
      {
        title: '',
        description: [
          {
            isClosure: false,
            text: 'فإن الواعد قد أصدر هذا الوعد استناداً إلى الشروط والأحكام التالية : ',
          },

          {
            isClosure: true,
            text: 'يُعتبر التمهيد السابق والمرفقات من الفاتورة المبدئية / عرض/ الأسعار العرض جزءاً لا يتجزأ من هذا الوعد. وينبغي أن تفسر كل بنودها في ضوء مفهوم كل منهما',
          },
          {
            isClosure: true,
            text: 'سيبيع البنك البضائع موضوع هذا الوعد إلى الواعد، على أساس بيع المرابحة بسعر بيع حسب التفاصيلأدناه : ',
          },

          // {
          //   isClosure: true,
          //   text: 'يجب أن يتضمن عقد بيع المرابحة الشروط الرئيسية التالية:',
          //   subClause: [
          //     {
          //       isClosure: true,
          //       text: 'قبل تخليص البضائع من ميناء الوصول، وبعد بيع البنك البضائع إلى الواعد مرابحة، يتحمل الواعد رسوم التحميل والتفريغ، والرسوم الجمركية، ورسوم التخليص من الميناء، والضرائب، وكلفة نقل البضائع إلى مستودعات الواعد، ولا يحق للواعد بعد ذلك مطالبة البنك بأي من الرسوم أو المصاريف المذكورة.',
          //     },
          //     {
          //       isClosure: true,
          //       text: 'يتحمل الواعد جميع مخاطر البضائع بعد توقيع عقد بيع المرابحة وحيازته الحكمية أو الفعلية للبضائع.',
          //     },
          //   ],
          // },
          // {
          //   isClosure: true,
          //   text: 'ضَمِنَ الواعد حسن أداء المورد الذي طلب الواعد شراء البضائع منه، فيما يتعلق بتسليم البضاعة، ومطابقة الكميات، والنوعيات، والمواصفات، والشروط المحددة. وتعهد الواعد تعهداً غير قابل للنقض بتعويض البنك عند الطلب عن أية أضرار أو خسائر فعلية تلحق به جراء إخفاق المورّد في الوفاء بالتزاماته، إلا لظرف قاهر.',
          // },
          // {
          //   isClosure: true,
          //   text: 'فوّض الواعد البنك أن يشتري أو يبيع لحسابه، حسب سعر صرف العملات السائد لديه بتاريخ إبرام عقد المرابحة، قيمة العملة الأجنبية اللازمة والمساوية لتسديد قيمة المستندات، سواء كان الاعتماد المستندي صالحاً للدفع عند الاطلاع، أو مؤجل الدفع.',
          // },
          // {
          //   isClosure: true,
          //   text: 'إذا رفض الواعد شراء البضائع بعد أن اشتراها البنك، يحق للبنك بيعها لاستيفاء كلفة شرائها وكافة المصاريف الأخرى الفعلية والإدارية المتعلقة بشرائها. وإذا تجاوزت حصيلة البيع متطلبات البنك، فإن هذه الزيادة ستكون من حق البنك وحده بصفته مالك البضائع. أما إذا نقصت حصيلة البيع عن متطلبات البنك، تُحسم قيمة النقص من مبلغ هامش الجدية، ويبقى للبنك في ذمة الواعد قيمة أي نقص يزيد عن مبلغ هامش الجدية، حتى يتم السداد الكامل.',
          // },
          // {
          //   isClosure: true,
          //   text: 'إذا رفض الزبون استلام البضائع، أو الوثائق المتعلقة بها بعد توقيع عقد المرابحة في مدة قررها البنك، يحق للبنك في هذه الحالة فسخ عقد البيع، وتعود البضائع إلى ملكيته، ويقوم ببيعها لاستيفاء كلفة شرائها وكافة المصاريف الأخرى، وله الرجوع على الواعد بقيمة أي نقص.',
          // },
          // {
          //   isClosure: true,
          //   text: 'في حال عدم استخدام المورّد للاعتماد و/أو توريد البضائع، أقر الواعد أن البنك لن يتحمل أية مسؤولية نتيجة عدم تنفيذ المورد. وتعهد الواعد بدفع المصاريف كافة، مثل نفقات فتح الاعتماد، ورسوم التكافل، وأية مصاريف أخرى متعلقة بالاعتماد.',
          // },
          // {
          //   isClosure: true,
          //   text: 'أقر الواعد أن البنك لن يكون مسؤولاً عن أية خسائر يتكبدها الواعد بسبب تأخر شحن البضائع ووصولها أو المستندات والوثائق المتعلقة بها. وتعهد الواعد بتنفيذ وعد الشراء، وإبرام عقد بيع المرابحة فوراً بعد وصول البضائع أو استلام البنك المستندات المتعلقة بها.',
          // },
          // {
          //   isClosure: true,
          //   text: 'أقر الواعد أن عنوانه هو العنوان الوارد في مقدمة هذا الوعد، وعلى نموذج فتح الحساب.',
          // },
          // {
          //   isClosure: true,
          //   text: 'التزم الواعد بشكل غير قابل للنقض بالشروط والأحكام العامة للبنك.',
          // },
          // {
          //   isClosure: true,
          //   text: 'يُقرأ هذا الوعد بالتلازم مع اتفاقية المرابحة الأساسية، وتكون كافة شروطها متضمنة في هذا الاعتماد والوعد على أساس المرجعية.',
          // },
        ],
      },
    ],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>Branch:</Text>
              <Text style={styles?.inputField}> {formdetails?.tradeFinIrrDocCreAppMurabahaBranch?.value || 'N/A'}</Text>
            </View>

            <View style={{ flexDirection: 'column', width: '48%', padding: 4 }}>
              <View style={{ flexDirection: 'row', width: '100%', border: '1px solid #6E2B8C' }}>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                  <Text
                    style={{
                      ...styles.textFont,
                      borderBottom: '1px solid #6E2B8C',
                      padding: 2,
                      borderRight: '1px solid #6E2B8C',
                      color: '#6E2B8C',
                    }}
                  >
                    Application Ref No.
                  </Text>
                  <Text style={{ ...styles.textFont, padding: 2, borderRight: '1px solid #6E2B8C', color: '#6E2B8C' }}>
                    W
                  </Text>
                </View>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                  <Text style={{ ...styles.textFont, borderBottom: '1px solid #6E2B8C', padding: 2, color: '#6E2B8C' }}>
                    For Bank Use Only
                  </Text>
                  <View style={{ paddingHorizontal: 2 }}>
                    <InputComp inputOne="L/C No. " />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <CustomDate date={formatedDateTwo} />

          <View style={[styles?.row, { gap: '6px', justifyContent: 'flex-start', alignItems: 'center' }]}>
            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
              Dear Sir(s) Kindly issue an Irrevocalble Murabaha Letter of Credit('L/C') by :
            </Text>
            <CheckBoxComp
              label={`Full Swift`}
              val={formdetails?.tradeFinIrrDocCreAppMurabahaFullSwiftandCourier?.tradeFinIrrDocCreAppMurabahaFullSwift}
            />
            <CheckBoxComp
              label={`Courier Service`}
              val={
                formdetails?.tradeFinIrrDocCreAppMurabahaFullSwiftandCourier?.tradeFinIrrDocCreAppMurabahaCourierService
              }
            />

            {/* <View style={styles.checkboxRow}>
                    <View
                      style={[
                        styles.checkbox,
                        {
                          backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaFullSwiftandCourier
                            ?.tradeFinIrrDocCreAppMurabahaCourierService
                            ? '#6E2585'
                            : '',
                        },
                      ]}
                    ></View>
                    <Text style={{ color: '#6E2B8C', fontSize: 7 }}>Courier Service</Text>
                  </View> */}

            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>as per given details below :</Text>
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
                padding: 4,
              }}
            >
              <View style={styles.column}>
                <View style={styles.row}>
                  {/* <Text style={styles.secondLabel}>Applicant Name/In the name of Smart Ven </Text>
                        <Text style={styles.inputField}>
                          {formdetails?.tradeFinIrrDocCreAppMurabahaApplicantNameonBehal || 'N/A'}
                        </Text> */}
                  {/* \n/In the name of Smart Ven */}
                  <InputComp
                    inputNine={`Applicant Name`}
                    outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaApplicantNameonBehal}
                  />
                </View>
                <InputComp
                  inputNine={`Applicant Address`}
                  outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaApplicantNameonBehalAddress}
                />

                <View style={{ ...styles.row, alignItems: 'center' }}>
                  <Text style={styles.secondLabel}>Tolerance: </Text>
                  <CheckBoxComp
                    label={formdetails?.tradeFinIrrDocCreAppMurabahaAmount?.value}
                    val={formdetails?.tradeFinIrrDocCreAppMurabahaAmount?.value || 'N/A'}
                  />

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Text>{' + '}</Text>

                    <Text style={styles.inputField}>
                      {formdetails?.tradeFinIrrDocCreAppMurabahaAmountAboutPlus || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Text>{' - '}</Text>

                    <Text style={styles.inputField}>
                      {formdetails?.tradeFinIrrDocCreAppMurabahaAmountAboutMin || 'N/A'}
                    </Text>
                  </View>
                </View>
                <InputComp
                  inputNine="Accountee"
                  outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryAccountee}
                />

                <View style={styles.row}>
                  <Text style={styles.secondLabel}>In figures : </Text>
                  <Text style={{ ...styles.inputField, fontSize: 8 }}>
                    {formdetails?.tradeFinIrrDocCreAppMurabahaInFigures || 'N/A'}
                  </Text>
                </View>

                <View style={styles.row}>
                  {/* <Text style={styles.secondLabel}>In words : </Text>
                        <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppMurabahaInWords || 'N/A'}</Text> */}
                  <InputComp
                    inputNine="In Words"
                    outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaInWords || 'N/A'}
                  />
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
                padding: 4,
              }}
            >
              <View style={styles.column}>
                {/* <View style={styles.row}>
                        <Text style={styles.secondLabel}>Beneficiary Name and Address : </Text>
                        <Text style={styles.inputField}>
                          {formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryName}{' '}
                          {formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryAddress}
                        </Text>
                      </View> */}
                <InputComp
                  inputNine="Beneficiary Name"
                  outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryName}
                />
                <InputComp
                  inputNine="Beneficiary Address"
                  outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaBeneficiaryAddress}
                />

                <View style={styles.row}>
                  <InputComp
                    inputNine="Advising Bank"
                    outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaAdvisingBank}
                  />

                  {/* <Text style={styles.secondLabel}>Advising Bank : </Text>
                        <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppMurabahaAdvisingBank || 'N/A'}</Text> */}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                  <Text style={styles.textFont}>Currency</Text>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaCurreny?.map((items: any, index: any) => (
                    <Text key={index} style={styles.inputLine}>
                      {items?.value}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', marginTop: 3 }}>
            <View style={styles.row}>
              <View
                style={{
                  flexDirection: 'column',
                  // width: '50%',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '100%' }}>
                  <View style={{ flexDirection: 'row', gap: 5, width: '25%' }}>
                    <Text style={styles.label}>Confirmation : </Text>
                    <CheckBoxComp
                      label={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmation?.value}
                      val={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmation?.value}
                    />

                    {/* {formdetails?.tradeFinIrrDocCreAppMurabahaConfirmation?.value && (
                            <View style={styles.checkboxRow}>
                              <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                              <Text style={styles.label}>{formdetails?.tradeFinIrrDocCreAppMurabahaConfirmation?.value}</Text>
                            </View>
                          )} */}
                  </View>
                  {/* {formdetails?.tradeFinIrrDocCreAppMurabahaConfirmBanking && ( */}
                  <View style={{ width: '40%' }}>
                    <InputComp
                      inputNine="Confirming Bank"
                      // outputNine={"gfugfyugfuygdf ugvcfyugfvy utfyucyuctfurifgysgi sfvgey fetfuytftuy wtfxyuwtf"}
                      outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmBanking || 'N/A'}
                    />
                  </View>
                  {/* )} */}
                  <View style={{ ...styles.secondRow, width: '35%' }}>
                    <Text style={styles.label}>Confirmation charges are for: </Text>
                    <CheckBoxComp
                      label={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value}
                      val={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value}
                    />

                    {/* {formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value && (
                            <View style={styles.checkboxRow}>
                              <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                              <Text style={styles.label}>
                                {formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value}
                              </Text>
                            </View>
                          )} */}
                  </View>
                  {/* // )} */}
                </View>
              </View>
              {/* <View
                      style={{
                        flexDirection: 'column',
                        width: '50%',
                        // height: '20px',
                        borderRight: '1px solid #6E2B8C',
                        borderTop: '1px solid #6E2B8C',
                        borderBottom: '1px solid #6E2B8C',
                        // borderLeft: '1px solid #6E2B8C',
                        padding: 4,
                      }}
                    >
                      <View>

                      </View>
                    </View> */}
            </View>
            <View
              style={[
                styles.row,
                {
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  padding: 4,
                },
              ]}
            >
              <View style={styles.secondRow}>
                <Text style={styles.label}>Date of Expiry : </Text>
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaDateofExpiry
                    ? dayjs(formdetails?.tradeFinIrrDocCreAppMurabahaDateofExpiry)?.format('DD-MM-YYYY')
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.label}>Place of Expiry : </Text>
                <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppMurabahaPlaceofExpiry || 'N/A'}</Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.label}>Latest date of Shipment : </Text>
                <Text style={styles.inputField}>
                  {formdetails?.homeFinFtradeFinIrrDocCreAppMurabahaLastestDateofShipmentinDetTenure || 'N/A'}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <View
                style={{
                  flexDirection: 'column',
                  // width: '50%',
                  borderTop: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  // borderBottom: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <View style={styles.secondRow}>
                    <Text style={styles.label}>Partial Shipment : </Text>
                    <CheckBoxComp
                      label={formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipment?.value}
                      val={formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipment?.value}
                    />
                    {formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipmentConditional && (
                      <InputComp
                        inputNine="Any Conditios please mention"
                        outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipmentConditional}
                      />
                    )}

                    {/* {formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipment?.value && (
                            <View style={styles.checkboxRow}>
                              <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                              <Text style={styles.label}>
                                {formdetails?.tradeFinIrrDocCreAppMurabahaPartialShipment?.value}
                              </Text>
                            </View>
                          )} */}
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  // width: '50%',
                  // height: '20px',
                  borderRight: '1px solid #6E2B8C',
                  borderTop: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.label}>Transhipment : </Text>
                    <CheckBoxComp
                      label={formdetails?.tradeFinIrrDocCreAppMurabahaTransshipment?.value}
                      val={formdetails?.tradeFinIrrDocCreAppMurabahaTransshipment?.value}
                    />
                    {/* {formdetails?.tradeFinIrrDocCreAppMurabahaTransshipment?.value && (
                            <View style={styles.checkboxRow}>
                              <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                              <Text style={styles.label}>{formdetails?.tradeFinIrrDocCreAppMurabahaTransshipment?.value}</Text>
                            </View>
                          )} */}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  borderLeft: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View>
                  <View style={styles.secondRow}>
                    <Text style={styles.label}>Shipment by : </Text>

                    <View style={styles.checkboxRow}>
                      <CheckBoxComp
                        label={'Sea'}
                        val={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaSea}
                      />
                      <CheckBoxComp
                        label={'Air'}
                        val={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaAir}
                      />
                      <CheckBoxComp
                        label={'Land'}
                        val={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaLand}
                      />
                      <CheckBoxComp
                        label={'Delivery'}
                        val={formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy?.tradeFinIrrDocCreAppMurabahaDelivery}
                      />
                      {/* <View
                              style={[
                                styles.checkbox,
                                {
                                  backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy
                                    ?.tradeFinIrrDocCreAppMurabahaSea
                                    ? '#6E2B8C'
                                    : '',
                                },
                              ]}
                            ></View>
                            <Text style={styles.label}>Sea</Text> */}

                      {/* <View
                              style={[
                                styles.checkbox,
                                {
                                  backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy
                                    ?.tradeFinIrrDocCreAppMurabahaAir
                                    ? '#6E2B8C'
                                    : '',
                                },
                              ]}
                            ></View>
                            <Text style={styles.label}>Air</Text> */}

                      {/* <View
                              style={[
                                styles.checkbox,
                                {
                                  backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy
                                    ?.tradeFinIrrDocCreAppMurabahaLand
                                    ? '#6E2B8C'
                                    : '',
                                },
                              ]}
                            ></View>
                            <Text style={styles.label}>Land</Text> */}

                      {/* <View
                              style={[
                                styles.checkbox,
                                {
                                  backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaShipmentBy
                                    ?.tradeFinIrrDocCreAppMurabahaDelivery
                                    ? '#6E2B8C'
                                    : '',
                                },
                              ]}
                            ></View>
                            <Text style={styles.label}>Delivery</Text> */}
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '50%',
                  borderRight: '1px solid #6E2B8C',
                  borderBottom: '1px solid #6E2B8C',
                  borderLeft: '1px solid #6E2B8C',
                  padding: 4,
                }}
              >
                <View>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    <View style={[styles.secondRow, { width: '49%', alignItems: 'flex-start' }]}>
                      <Text style={styles.secondLabel}>From :</Text>
                      <Text style={styles?.inputField}>
                        {' '}
                        {formdetails?.tradeFinIrrDocCreAppMurabahaShipmentbyFrom || 'N/A'}
                      </Text>
                    </View>

                    <View style={[styles.secondRow, { width: '49%', alignItems: 'flex-start' }]}>
                      <Text style={styles.secondLabel}>To :</Text>
                      <Text style={styles?.inputField}>
                        {' '}
                        {formdetails?.tradeFinIrrDocCreAppMurabahaShipmentbyTo || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.row,
                {
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                },
              ]}
            >
              <View style={styles.secondRow}>
                <Text style={styles.label}>The Credit is available by : </Text>
                <CheckBoxComp
                  label={'Sight Payment'}
                  val={
                    formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy?.tradeFinIrrDocCreAppMurabahaSightPayment
                  }
                />

                <View style={styles.checkboxRow}>
                  <CheckBoxComp
                    label={'Acceptance / Deferred payment after'}
                    val={
                      formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                        ?.tradeFinIrrDocCreAppMurabahaAcceptanceDeferredPayment
                    }
                  />

                  <Text style={[styles.inputField, { width: '50px' }]}>
                    {formdetails?.tradeFinIrrDocCreAppMurabahaAfterNoofDays || 'N/A'}
                  </Text>
                  <Text style={styles.label}>days from </Text>
                  <Text style={[styles.inputField, { width: '50px' }]}>
                    {formdetails?.tradeFinIrrDocCreAppMurabahaDaysfrom || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.row,
                {
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  padding: 4,
                  width: '100%',
                  borderBottom: '1px solid #6E2B8C',
                },
              ]}
            >
              <View style={{ width: '30%', margin: 4 }}>
                <CheckBoxComp
                  label={`Negiotiation at Sight/Usance\n(Acceptance)`}
                  val={
                    formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                      ?.tradeFinIrrDocCreAppMurabahaNegotiationatSightAcceptance
                  }
                />
              </View>
              <View
                style={{
                  width: '70%',
                  flexDirection: 'row',
                  paddingLeft: 4,
                  gap: 5,
                  alignItems: 'center',
                  borderLeft: '1px solid #6E2585',
                }}
              >
                <CheckBoxComp
                  label={`Usance (Acceptance)`}
                  val={
                    formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                      ?.tradeFinIrrDocCreAppMurabahaUsanceAcceptance
                  }
                />
                <Text style={[styles.inputField, { width: '50px' }]}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaMixedPaymentSightUsanceDays || 'N/A'}
                </Text>
                <Text style={styles.label}>days from </Text>
                <Text style={[styles.inputField, { width: '50px' }]}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaMixedPaymentSightUsance || 'N/A'}
                </Text>
              </View>
            </View>

            <View
              style={[
                {
                  flexDirection: 'row',
                  gap: 5,
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                  alignItems: 'center',
                },
              ]}
            >
              <CheckBoxComp
                label="Mixed Payment Sight/Usance"
                val={
                  formdetails?.tradeFinIrrDocCreAppMurabahaCreditAvailableBy
                    ?.tradeFinIrrDocCreAppMurabahaMixedPaymentSightUsance
                }
              />
              {formdetails?.tradeFinIrrDocCreAppMurabahaTexttobeAdded && (
                <View style={[styles.secondRow, { flexGrow: 1, alignItems: 'center' }]}>
                  <Text style={styles.label}>As Test To be Added:</Text>
                  <Text style={styles.inputLine}>
                    {formdetails?.tradeFinIrrDocCreAppMurabahaTexttobeAdded || 'N/A'}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={[
                styles.row,
                {
                  borderLeft: '1px solid #6E2B8C',
                  borderRight: '1px solid #6E2B8C',
                  padding: 4,
                  borderBottom: '1px solid #6E2B8C',
                },
              ]}
            >
              <View style={[styles.secondRow, { width: '100%' }]}>
                <Text style={styles.label}>Description of good/services : </Text>
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaDescriptionofGoodsServices}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.row,
            {
              borderLeft: '1px solid #6E2B8C',
              borderRight: '1px solid #6E2B8C',
              padding: 4,
              borderTop: '1px solid #6E2B8C',
            },
          ]}
        >
          <View style={{ flexDirection: 'column', gap: 2 }}>
            <Text style={styles.label}>Delivery Term : </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                width: '100%',
                justifyContent: 'flex-start',
              }}
            >
              <View style={{ minWidth: '67%', flexDirection: 'row' }}>
                <CheckBoxComp
                  label={'EXW'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaEXW}
                />

                <CheckBoxComp
                  label={'FOB'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaFOB}
                />

                <CheckBoxComp
                  label={'FCA'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaFOB}
                />

                <CheckBoxComp
                  label={'CFR'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCFR}
                />

                <CheckBoxComp
                  label={'CIF'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCIF}
                />

                <CheckBoxComp
                  label={'CPT'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCPT}
                />
                <CheckBoxComp
                  label={'CIP'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaCIP}
                />

                <CheckBoxComp
                  label={'Others'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDeliveryTerm?.tradeFinIrrDocCreAppMurabahaOthers}
                />
              </View>
              {formdetails?.tradeFinIrrDocCreAppMurabahaOthersSpecify && (
                <View style={{ width: '33%', flexGrow: 1, textAlign: 'left' }}>
                  <View style={{ ...styles.thirdRow, gap: 2 }}>
                    <View style={{ maxWidth: '40%', minWidth: '1%' }}>
                      {/* <Text style={{...styles.textFont}}>{inputNine}: </Text> */}
                    </View>
                    <View style={{ width: '60%', flexGrow: 10 }}>
                      <Text style={{ ...styles.input, maxWidth: '100%', flexGrow: 5, textAlign: 'left' }}>
                        {formdetails?.tradeFinIrrDocCreAppMurabahaOthersSpecify || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
        <View>
          <View
            style={[
              styles.column,
              {
                borderLeft: '1px solid #6E2B8C',
                borderRight: '1px solid #6E2B8C',
                padding: 4,
                borderTop: '1px solid #6E2B8C',
              },
            ]}
          >
            <View style={styles.secondRow}>
              <Text style={styles.label}>Documents Required : </Text>
            </View>

            <View style={styles.secondRow}>
              <View style={styles.checkboxRow}>
                {/* <View
                          style={[
                            styles.checkbox,
                            { backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaDocReqSigned ? '#6E2B8C' : '' },
                          ]}
                        ></View> */}
                <CheckBoxComp
                  label="Signed Commercial Invoice in one original and"
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqSigned}
                />
              </View>
              {/* <Text style={styles.label}>Signed Commercial Invoice in one original and</Text> */}
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqNoofCopies || 'N/A'}
              </Text>
              <Text style={styles.label}>copy(ies) issued by Beneficiary,</Text>
              <Text style={styles.label}>
                original to be certified by Chamber of Commerce or equivalent authority and legalized by Oman
                embassy/consulate or in absence any Arab embassy/consulate.
              </Text>
            </View>

            <View style={styles.secondRow}>
              <View style={styles.checkboxRow}>
                {/* <View
                          style={[
                            styles.checkbox,
                            { backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBills ? '#6E2B8C' : '' },
                          ]}
                        ></View>

                      <Text style={styles.label}>
                        Full set of clean on board Bill(s) of Lading in long form issued or endorsed to the order of Bank
                        Nizwa, marked
                      </Text> */}

                <CheckBoxComp
                  label={
                    'Full set of clean on board Bill(s) of Lading in long form issued or endorsed to the order of Smart Ven, marked'
                  }
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBills}
                />
              </View>
              <Text style={styles.label}>freight</Text>

              <View style={{ flexDirection: 'row', gap: 70, paddingHorizontal: 30 }}>
                {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPrepaid ? ( */}
                <CheckBoxComp
                  label="Prepaid"
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPrepaid}
                />
                {/* ) : ( */}
                <CheckBoxComp
                  label="Payable at destination"
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPayableDestination}
                />
                {/* )} */}
                {/* <CheckBoxComp label="Prepaid" val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPrepaid} /> */}

                {/* <CheckBoxComp label="Payable at destination" val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPayableDestination} /> */}

                {/* <Text style={styles.label}>
                          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPrepaid
                            ? 'Prepaid'
                            : formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOnBoardBillsPayableDestination
                              ? 'Payable at destination'
                              : 'N/A'}
                        </Text> */}
              </View>

              <Text style={styles.label}>
                and notify Smart Ven and Ourselves, and showing full name and address of the carrying vessel's agent{' '}
              </Text>
              <Text style={styles.label}> address of the carrying vessel's agent</Text>
              <Text style={styles.label}>at port of destination.</Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 5 }}>
              {/* <View style={styles.checkboxRow}>
                        <View
                          style={[
                            styles.checkbox,
                            { backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybills ? '#6E2B8C' : '' },
                          ]}
                        ></View>
                      </View>
                      <Text style={styles.label}>
                        Air Waybill(s) consigned to Smart Ven, evidencing dispatch of the goods marked freight{' '}
                      </Text> */}

              <CheckBoxComp
                label="Air Waybill(s) consigned to Smart Ven, evidencing dispatch of the goods marked freight"
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybills}
              />

              <View style={{ flexDirection: 'row', gap: 70, paddingHorizontal: 30 }}>
                {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybillsPrepaid ? ( */}
                <CheckBoxComp
                  label={'Prepaid'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybillsPrepaid}
                />
                {/* ) : ( */}
                <CheckBoxComp
                  label={'Collect'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybillsCollect}
                />
                {/* )} */}
                {/* <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.label}>
                          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybillsPrepaid
                            ? 'Prepaid'
                            : formdetails?.tradeFinIrrDocCreAppMurabahaDocReqAirWaybillsCollect
                              ? 'Collect'
                              : 'N/A'}
                        </Text> */}
              </View>

              {/* <Text style={styles.label}>and showing flight number.</Text> */}
            </View>
          </View>

          <View
            style={[
              styles.column,
              {
                borderTop: '1px solid #6E2B8C',
                borderLeft: '1px solid #6E2B8C',
                borderRight: '1px solid #6E2B8C',
                padding: 4,
                borderBottom: '1px solid #6E2B8C',
              },
            ]}
          >
            <View style={styles.secondRow}>
              {/* <View style={styles.checkboxRow}>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignment ? '#6E2B8C' : '',
                            },
                          ]}
                        ></View>
                      </View>
                      <Text style={styles.label}>
                        Truck Consignment Note(s) consigned to Smart Ven, evidencing dispatch of the goods marked freight{' '}
                      </Text> */}
              <CheckBoxComp
                label="Truck Consignment Note(s) consigned to Smart Ven, evidencing dispatch of the goods marked freight"
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignment}
              />
              <View style={{ flexDirection: 'row', gap: 70, paddingHorizontal: 30 }}>
                {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignmentPrepaid ? ( */}
                <CheckBoxComp
                  label="Prepaid"
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignmentPrepaid}
                />
                {/* ) : ( */}
                <CheckBoxComp
                  label="Collect"
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignmentCollect}
                />
              </View>
              {/* )} */}
              {/* <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.label}>
                          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignmentPrepaid
                            ? 'Prepaid'
                            : formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTruckConsignmentCollect
                              ? 'Collect'
                              : 'N/A'}
                        </Text>
                      </View> */}
            </View>

            {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOrigin && ( */}
            <View style={styles.secondRow}>
              <CheckBoxComp
                label="Certificate of Origin in one original plus"
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOrigin}
              />
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOriginNoofCopies || 'N/A'}
              </Text>
              <Text style={styles.label}>copy(ies) issued or certified by Chamber of Commerce or equivalent</Text>
              <Text style={styles.label}>
                {' '}
                original to be certified by Chamber of Commerce or equivalent authority and legalized by Omani
                Embassy/consulate or in absence, any Arab embassy/consulate, stating that goods are purely of
              </Text>
              <Text style={styles.label}> </Text>

              <Text style={styles.inputLine}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOriginOrigin || 'N/A'}
              </Text>
              <Text style={styles.label}> origin.</Text>
            </View>
            {/* // )} */}

            {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqDeliveryOrder && (
              <View style={styles.secondRow}>
                <View style={styles.checkboxRow}>
                  {/* <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: '#6E2B8C',
                            },
                          ]}
                        ></View> */}
                  <CheckBoxComp
                    label={'Delivery Order in one original and'}
                    val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqDeliveryOrder}
                  />
                </View>
                {/* <Text style={styles.label}>Delivery Order in one original and</Text> */}
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqDeliveryOrderNoofCopies || 'N/A'}
                </Text>
                <Text style={styles.label}>copy(ies)</Text>
              </View>
            )}

            {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPackingList && (
              <View style={styles.secondRow}>
                <View style={styles.checkboxRow}>
                  {/* <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: '#6E2B8C',
                            },
                          ]}
                        ></View> */}
                  <CheckBoxComp
                    label={'Packaging List in one original and'}
                    val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPackingList}
                  />
                </View>
                {/* <Text style={styles.label}>Packaging List in one original and</Text> */}
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPackingListNoofCopies || 'N/A'}
                </Text>
                <Text style={styles.label}>copy(ies)</Text>
              </View>
            )}

            {/* <CheckBoxComp label={'Packaging List in one original and'} val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPackingList}/> */}

            {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateWeight && (
              <View style={styles.secondRow}>
                {/* <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                      </View> */}
                {/* <Text style={styles.label}>Certificate of Weight in one original and</Text> */}
                <CheckBoxComp
                  label={'Certificate of Weight in one original and'}
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateWeight}
                />
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateWeightNoofCopies || 'N/A'}
                </Text>
                <Text style={styles.label}>copy(ies)</Text>
              </View>
            )}
            {/* <View style={{flexDirection:'row', gap:2}}></View> */}
            <CheckBoxComp
              label={
                <>
                  <Text style={styles.textFont}>
                    {` Shipment advice stating the details of shipments such as invoice number, date, value, description of goods, country of origin, manufacturers \nname and address` +
                      ' '}
                  </Text>

                  <View style={{ flexDirection: 'row', gap: 2, paddingHorizontal: 10, width: '100%' }}>
                    <Text style={styles.inputLine}>
                      {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentMS || 'N/A'}
                    </Text>
                    <Text style={styles.textFont}> and Applicant</Text>
                  </View>
                </>
              }
              val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipment}
            />

            <View style={{ width: '100%' }}>
              <InputComp
                inputNine="Insurance Company Name"
                outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentInsuranceCompanyName}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 5, width: '100%' }}>
              <View style={{ width: '50%' }}>
                <InputComp
                  inputNine="Address"
                  outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentAddress}
                />
              </View>
              <View style={{ width: '50%' }}>
                <InputComp
                  inputNine="Email"
                  outputNine={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentEmail}
                />
              </View>
            </View>
            {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipment && (
                      <View style={styles.secondRow}>
                        <View style={styles.checkboxRow}>
                          <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        </View>
                        <Text style={styles.label}>
                          Shipment advice stating the details of shipments such as invoice number, date, value, description of
                          goods,
                        </Text>
                        <Text style={styles.label}>country of origin, manufacturers name and address</Text>
                        <Text style={styles.label}>
                          vessel name, Bill of Lading number and date, ETD, ETA, L/C number and date. Such advice should be
                          sent via fax to M/s
                        </Text>
                        <Text style={styles.inputField}>
                          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateShipmentMS || 'N/A'}
                        </Text>
                        <Text style={styles.label}>and Applicant.</Text>
                      </View>
                    )} */}

            {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqMarineAirLand && ( */}
            <View style={styles.secondRow}>
              <CheckBoxComp
                label="Marine/Air/Land Takaful (insurance) policy/certificate in"
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqMarineAirLand}
              />
              {/* <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                      </View>
                      <Text style={styles.label}>Marine/Air/Land Takaful (insurance) policy/certificate in</Text> */}
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqMarineAirLandNoofCertificatesOrignal || 'N/A'}
              </Text>

              <Text style={styles.label}>original and</Text>
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqMarineAirLandNoofCetificatesCopies || 'N/A'}
              </Text>

              <Text style={styles.label}>
                copies issued to the order of Smart Ven in the currency of this L/C for at least 110% of the invoice
                value covering all risks
              </Text>
              <Text style={styles.label}>
                and expressly stating claims if any are payable in the Sultanate of Oman. Takaful policy must contain
                name, address
              </Text>
              <Text style={styles.label}> and telephone number of the issuer agent in the Sultanate of Oman</Text>
            </View>
            {/* )} */}

            {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTakfulLocally && (
              <View style={styles.secondRow}>
                <CheckBoxComp
                  label="Takaful covered by us locally, Takaful Company name"
                  val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTakfulLocallyCompanyName}
                />
                {/* <View style={styles.checkboxRow}>
                          <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        </View>
                        <Text style={styles.label}>Takaful covered by us locally, Takaful Company name : </Text> */}
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqTakfulLocallyCompanyName || 'N/A'}
                </Text>
              </View>
            )}
          </View>

          {/* <View
                  style={[
                    styles.column,
                    {
                      borderLeft: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                      padding: 4,
                      borderBottom: '1px solid #6E2B8C',
                    },
                  ]}
                >
                  <View style={styles.row}>
                    <View style={[styles.column, { width: '50%' }]}>
                      <Text style={styles.label}>
                        We hereby confirm that the above goods details have been filled, completed and approved by us, and the
                        described goods are of the same specification that we have requested the Bank to purchase the goods
                        from the Supplier / Vendor and subsequently to sell to us on Murabaha basis. We understand that the
                        Bank will purchase the said goods upon our request according to the specification and conditions
                        stated above by means of issuance of a Letter of Credit. We hereby irrevocably promise and undertake
                        to purchase the above said goods from the Bank at a price equivalent to total purchase cost plus the
                        agreed profit margin (hereinafter referred to as 'Murabaha Sale Price').
                      </Text>
                    </View>

                    <View style={[styles.column, { width: '50%' }]}>
                      <Text style={styles.labelAr}>
                        نؤكد أن تفاصيل معلومات البضائع أعلاه قد استوفيت بمعرفتنا وموافقتنا وأن المعلومات المدونة أعلاه تطابق
                        مواصفات البضائع التي طلبنا منكم شراءها من المورّد ومن ثم بيعها لنا بالمرابحة، وإنه من المعلوم لدينا
                        بأن البنك سوف يشتري البضائع، بناءً على طلبنا، حسب المواصفات والشروط المدونة أعلاه من خلال فتح اعتماد
                        مستندي (الاعتماد)، وتعهدنا تعهداً غير قابل للنقض بشراء البضائع من البنك بسعر التكلفة زائد الربح المتفق
                        عليه.
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    styles.column,
                    {
                      borderLeft: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                      padding: 4,
                      borderBottom: '1px solid #6E2B8C',
                    },
                  ]}
                >
                  <View style={styles.secondRow}>
                    <Text style={styles.label}>Customer Account Number</Text>

                    {formdetails?.tradeFinIrrDocCreAppMurabahaAddDetAuthorizeOMRFCYLCAccountNo
                      ?.split('')
                      ?.map((item: any, ind: any) => {
                        const extraMargin = ind === 2 || ind === 10 ? 10 : '0px';
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

                <View style={{ ...styles.row, marginVertical: 5 }}>
                  <View style={styles.secondRow}>
                    <Text style={styles.label}>Name of the Customer : </Text>
                    <Text style={[styles.inputField, { width: '100px' }]}></Text>
                  </View>

                  <View style={styles.secondRow}>
                    <Text style={styles.label}>Signature & Official Stamp : </Text>
                    <Text style={[styles.inputField, { width: '100px' }]}></Text>
                  </View>
                </View> */}
        </View>
        {/* </View> */}
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View
          style={[
            styles.column,
            {
              borderLeft: '1px solid #6E2B8C',
              borderRight: '1px solid #6E2B8C',
              padding: 4,
              borderBottom: '1px solid #6E2B8C',
              borderTop: '1px solid #6E2B8C',
            },
          ]}
        >
          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqHealthCertificate && (
            <View style={styles.secondRow}>
              {/* <View style={styles.checkboxRow}>
                          <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        </View>
                        <Text style={styles.label}>Health Certificate : </Text> */}
              <CheckBoxComp
                label="Health Certificate :"
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqHealthCertificate}
              />
              {/* <View style={styles.secondRow}> */}
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqHealthCertificateTextField || 'N/A'}
              </Text>
            </View>
            // </View>
          )}
          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPhytosanitaryCertificate && (
            <View style={styles.secondRow}>
              <CheckBoxComp
                label={`Phytosanitary Certificate`}
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPhytosanitaryCertificate}
              />

              {/* <View style={styles.secondRow}> */}
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPhytosanitaryCertificateTextField || 'N/A'}
              </Text>
              {/* </View> */}
            </View>
          )}
          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqFumigationCertificate && (
            <View style={styles.secondRow}>
              <CheckBoxComp
                label={`Fumigation Certificate`}
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqFumigationCertificate}
              />

              {/* <View style={styles.secondRow}> */}
              <Text style={styles.inputLine}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqPhytosanitaryCertificateTextField || 'N/A'}
              </Text>
              {/* </View> */}
            </View>
          )}
          {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqInspetionCertificate && (
            <View style={styles.secondRow}>
              <CheckBoxComp
                label={`
      Inspection Certificate`}
                val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqInspetionCertificate}
              />

              {/* <View style={styles.secondRow}> */}
              <Text style={{ ...styles.inputField, flexGrow: 1 }}>
                {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqInspetionCertificateTextField || 'N/A'}
              </Text>
              {/* </View> */}
            </View>
          )}

          {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOthertermsDocuments && ( */}
          <View style={styles.secondRow}>
            {/* <View style={styles.checkboxRow}>
                          <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        </View>
                        <Text style={styles.label}>Other terms/documents : </Text> */}
            <CheckBoxComp
              label="Other terms/documents :"
              val={formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOthertermsDocumentsOthers}
            />
            <Text style={styles.inputField}>
              {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqOthertermsDocumentsOthers || 'N/A'}
            </Text>
          </View>
          {/* {formdetails?.tradeFinIrrDocCreAppMurabahaAddDetShippingMarks && ( */}
          <View style={styles.secondRow}>
            <CheckBoxComp label="Shipping Marks :" val={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetShippingMarks} />
            {/* <View style={styles.checkboxRow}>
                          <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        </View>
                        <Text style={styles.label}>Shipping Marks :</Text> */}

            <Text style={styles.inputField}>
              {formdetails?.tradeFinIrrDocCreAppMurabahaAddDetShippingMarksTypeHere || 'N/A'}
            </Text>
          </View>
          {/* )} */}

          {/* {formdetails?.tradeFinIrrDocCreAppMurabahaAddDetDocumentsLC && ( */}
          <View style={styles.secondRow}>
            <CheckBoxComp
              label="Documents to be presented within"
              val={formdetails?.tradeFinIrrDocCreAppMurabahaAddDetNoofDays}
            />

            {/* <View style={styles.checkboxRow}>
                          <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        </View>
                        <Text style={styles.label}>Documents to be presented within</Text> */}

            <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppMurabahaAddDetNoofDays || 'N/A'}</Text>

            <Text style={styles.label}>days after shipment/delivery date, and within L/C validity.</Text>
          </View>
          {/* )} */}
          <View style={styles.secondRow}>
            {/* <CheckBoxComp label="All commissions & charges outside Smart Ven including reimbursement charges are for" val={}/> */}
            <Text style={styles.label}>
              All commissions & charges outside Smart Ven including reimbursement charges are for
            </Text>

            {/* <View style={styles.checkboxRow}>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              backgroundColor: '#6E2B8C',
                            },
                          ]}
                        ></View>
                        <Text style={styles.label}>
                          {formdetails?.tradeFinIrrDocCreAppMurabahaAdditionalDetailsConfirmationCharges?.value}
                        </Text>
                      </View> */}
            <CheckBoxComp
              label={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value}
              val={formdetails?.tradeFinIrrDocCreAppMurabahaConfirmationCharges?.value}
            />
          </View>
          {/* <View
                  style={[
                    styles.column,
                    {
                      borderLeft: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                      padding: 4,
                      borderBottom: '1px solid #6E2B8C',
                    },
                  ]}
                > */}
          <View style={styles.row}>
            <View style={[styles.column, { width: '50%' }]}>
              <Text style={styles.label}>
                We hereby confirm that the above goods details have been filled, completed and approved by us, and the
                described goods are of the same specification that we have requested the Bank to purchase the goods from
                the Supplier / Vendor and subsequently to sell to us on Murabaha basis. We understand that the Bank will
                purchase the said goods upon our request according to the specification and conditions stated above by
                means of issuance of a Letter of Credit. We hereby irrevocably promise and undertake to purchase the
                above said goods from the Bank at a price equivalent to total purchase cost plus the agreed profit
                margin (hereinafter referred to as 'Murabaha Sale Price').
              </Text>
            </View>

            <View style={[styles.column, { width: '50%' }]}>
              <Text style={styles.labelAr}>
                نؤكد أن تفاصيل معلومات البضائع أعلاه قد استوفيت بمعرفتنا وموافقتنا وأن المعلومات المدونة أعلاه تطابق
                مواصفات البضائع التي طلبنا منكم شراءها من المورّد ومن ثم بيعها لنا بالمرابحة، وإنه من المعلوم لدينا بأن
                البنك سوف يشتري البضائع، بناءً على طلبنا، حسب المواصفات والشروط المدونة أعلاه من خلال فتح اعتماد مستندي
                (الاعتماد)، وتعهدنا تعهداً غير قابل للنقض بشراء البضائع من البنك بسعر التكلفة زائد الربح المتفق عليه.
              </Text>
            </View>
          </View>
          {/* </View> */}

          {/* <View
                  style={[
                    styles.column,
                    {
                      borderLeft: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                      padding: 4,
                      borderBottom: '1px solid #6E2B8C',
                    },
                  ]}
                > */}
          <View style={styles.secondRow}>
            <Text style={styles.label}>Customer Account Number</Text>

            {formdetails?.tradeFinIrrDocCreAppMurabahaAddCustomerAccountNo?.split('')?.map((item: any, ind: any) => {
              const extraMargin = ind === 2 || ind === 10 ? 10 : '0px';
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
          {/* </View> */}
        </View>

        <View style={{ ...styles.row, marginTop: 25 }}>
          <View style={styles.secondRow}>
            <Text style={styles.label}>Name of the Customer : </Text>
            <Text style={[styles.inputField, { width: '100px' }]}></Text>
          </View>

          <View style={styles.secondRow}>
            <Text style={styles.label}>Signature & Official Stamp : </Text>
            <Text style={[styles.inputField, { width: '100px' }]}></Text>
          </View>
        </View>
        {/* <View style={styles.column}>

      <View style={[styles.row, { gap: '10px' }]}>
      <View style={{ width: '50%' }}>
      <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'column', gap: '5' }}>
      <MultiTitleHeader titleEN="BINDING PROMISE TO PURCHASE" titleAR="وعد ملزم للشراء بالمرابحة (الوعد )" />
      <PDFTermsAndCondition data={termsConditionData} />
                      </View>
                    </View>
                  </View>


                  <View style={{ width: '50%' }}>
                    <View style={{ flexDirection: 'column' }}>
                      <View style={{ flexDirection: 'column', gap: '5' }}>
                        <PDFTermsAndCondition data={termsConditionDataAr} direction="rtl" />
                      </View>
                    </View>
                  </View>
                </View>
              </View> */}

        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.column}>
          <MultiTitleHeader titleEN="BINDING PROMISE TO PURCHASE" titleAR="وعد ملزم للشراء بالمرابحة (الوعد )" />

          <View style={[styles.row, { gap: '10px' }]}>
            <View style={{ width: '50%' }}>
              <View style={{ flexDirection: 'column', marginTop: 15 }}>
                <View style={{ flexDirection: 'column', gap: '5', marginTop: 10 }}>
                  <View style={[styles.column, { marginLeft: 2 }]}>
                    <View
                      style={[
                        styles.row,
                        {
                          flexWrap: 'wrap',
                          maxWidth: '100%',
                          marginLeft: 0,
                          marginRight: 0,
                          gap: 10,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                        }}
                      >
                        This Promise is made on this day of
                      </Text>

                      <Text style={styles.inputField}>{}</Text>

                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                        }}
                      >
                        Nizwa, Oman (to be hereinafter referred to as the "Bank"), by{' '}
                      </Text>

                      <View style={styles.column}>
                        <View style={styles.row}>
                          <Text style={styles.label}> Company Name : </Text>

                          <Text style={[styles.inputField, { width: '100px' }]}>{}</Text>
                        </View>

                        <View style={styles.row}>
                          <Text style={styles.label}> Company Address : </Text>

                          <Text style={[styles.inputField, { width: '100px' }]}>{}</Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                        }}
                      >
                        (to be hereinafter referred to as the "Promisor, Client")
                      </Text>

                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                        }}
                      >
                        Whereas the Promisor declared its commitment to purchase the Goods as described and detailed in
                        the Proforma Invoice/Quotation/Offer dated
                      </Text>

                      <Text style={styles.inputField}>{}</Text>

                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                        }}
                      >
                        Whereas the Bank, relying on the Promisor's Binding Promise to Purchase, intends to
                        purchase/import the described Goods from the Supplier / Vendor, and then sell the same Goods to
                        the Promisor by Murabaha sale contract;
                      </Text>
                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                        }}
                      ></Text>
                    </View>
                  </View>
                  {termsConditionData?.list?.map((item: any, n: number) => (
                    <View key={n} style={[styles.column, { marginLeft: 2 }]}>
                      {item?.description?.map((para: any, index: number) => (
                        <>
                          <View
                            style={[
                              styles.row,
                              {
                                flexWrap: 'wrap',
                                maxWidth: '100%',
                                marginLeft: 0,
                                marginRight: 0,
                              },
                            ]}
                          >
                            {para?.isClosure && (
                              <Text
                                style={{
                                  fontSize: 8,
                                  color: '#6E2585',
                                }}
                              >
                                {`${index}. `}
                              </Text>
                            )}

                            <Text
                              key={index}
                              style={{
                                fontSize: 8,
                                color: '#6E2585',
                                flexShrink: 1,
                                flexGrow: 1,
                                flexBasis: '0%',
                              }}
                            >
                              {para?.text}
                            </Text>
                          </View>

                          {para?.subClause?.map((subClause: any, i: number) => (
                            <View style={styles.column}>
                              <View key={i} style={[styles.row, { marginLeft: 0, marginRight: 0 }]}>
                                {subClause?.isClosure && (
                                  <Text
                                    style={{
                                      fontSize: 8,
                                      color: '#6E2585',
                                    }}
                                  >
                                    {`${index}.${i + 1}. `}
                                  </Text>
                                )}

                                <Text
                                  key={i}
                                  style={{
                                    fontSize: 8,
                                    width: '100%',
                                    color: '#6E2585',
                                    flexShrink: 1,
                                    flexGrow: 1,
                                    flexBasis: '0%',
                                  }}
                                >
                                  {subClause?.text}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* ARABIC SECTION  */}

            <View style={{ width: '50%' }}>
              <View style={{ flexDirection: 'column', marginTop: 15 }}>
                <View style={{ flexDirection: 'column', gap: '5', marginTop: 10 }}>
                  <View style={[styles.column, { marginLeft: 2 }]}>
                    <View
                      style={[
                        styles.rowAr,
                        {
                          flexWrap: 'wrap',
                          maxWidth: '100%',
                          marginLeft: 0,
                          marginRight: 0,
                          gap: 10,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: 'right',
                          fontFamily: 'Cairo',
                        }}
                      >
                        أبرم هذا الوعد في هذا اليوم من
                      </Text>

                      <Text style={styles.inputField}>{}</Text>

                      <Text
                        style={{
                          fontFamily: 'Cairo',
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: 'left',
                        }}
                      >
                        الصالح بنك نزوى الذي يُشار إليه فيما
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Cairo',
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: 'left',
                        }}
                      >
                        بعد بالبنك)، من السادة
                      </Text>

                      <View style={styles.column}>
                        <View style={styles.rowAr}>
                          <Text style={styles.labelAr}>اسم الشركة وعنوانها : </Text>

                          <Text style={[styles.inputField, { width: '100px' }]}>{}</Text>
                        </View>

                        <View style={styles.rowAr}>
                          <Text style={styles.labelAr}>ويشار إليها فيما بعد باسم الواعد الزبون : </Text>

                          <Text style={[styles.inputField, { width: '100px' }]}>{}</Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontFamily: 'Cairo',
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: 'right',
                        }}
                      >
                        تمهيد
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Cairo',
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: 'right',
                        }}
                      >
                        حيث إن الواعد التزم بشراء البضائع بالتفاصيل المذكورة في الفاتورة المبدئية عرض الأسعار العرض،
                        المؤرخة
                      </Text>

                      <Text style={styles.inputField}>{}</Text>

                      <Text
                        style={{
                          fontFamily: 'Cairo',
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: 'right',
                        }}
                      >
                        وحيث إن البنك سوف يشتري البضائع بالاعتماد على وعد الزبون بالشراء، ثم يبيعها إلى الواعد بالمرابحة
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Cairo',
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: 'right',
                        }}
                      >
                        {'  '}
                      </Text>
                      <View
                        style={{
                          height: '30px',
                        }}
                      >
                        {'  '}
                      </View>
                    </View>
                  </View>
                  {termsConditionDataAr?.list?.map((item: any, n: number) => (
                    <View key={n} style={[styles.column, { marginLeft: 2 }]}>
                      {item?.description?.map((para: any, index: number) => (
                        <>
                          <View
                            style={[
                              styles.rowAr,
                              {
                                flexWrap: 'wrap',
                                fontFamily: 'Cairo',
                                maxWidth: '100%',
                                marginLeft: 0,
                                marginRight: 0,
                              },
                            ]}
                          >
                            {para?.isClosure && (
                              <Text
                                style={{
                                  fontFamily: 'Cairo',
                                  fontSize: 8,
                                  color: '#6E2585',
                                  textAlign: 'right',
                                }}
                              >
                                {`${index}. `}
                              </Text>
                            )}

                            <Text
                              key={index}
                              style={{
                                fontSize: 8,
                                color: '#6E2585',
                                flexShrink: 1,
                                flexGrow: 1,
                                flexBasis: '0%',
                                fontFamily: 'Cairo',
                                textAlign: 'right',
                              }}
                            >
                              {para?.text}
                            </Text>
                          </View>

                          {para?.subClause?.map((subClause: any, i: number) => (
                            <View style={styles.column}>
                              <View key={i} style={[styles.rowAr, { marginLeft: 0, marginRight: 0 }]}>
                                {subClause?.isClosure && (
                                  <Text
                                    style={{
                                      fontSize: 8,
                                      color: '#6E2585',
                                      textAlign: 'right',
                                      fontFamily: 'Cairo',
                                    }}
                                  >
                                    {`${index}.${i + 1}. `}
                                  </Text>
                                )}

                                <Text
                                  key={i}
                                  style={{
                                    fontSize: 8,
                                    textAlign: 'right',
                                    width: '100%',
                                    color: '#6E2585',
                                    flexShrink: 1,
                                    flexGrow: 1,
                                    fontFamily: 'Cairo',
                                    flexBasis: '0%',
                                  }}
                                >
                                  {subClause?.text}
                                </Text>
                              </View>
                            </View>
                          ))}


                        </>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{ width: '48%' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '5%',
                }}
              >
                <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' }]}>
                  <Text style={{ fontWeight: 400, fontSize: 8, color: 'white', margin: 'auto' }}> </Text>
                </View>

                {[...Array(10)].map((_, i: number) => (
                  <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                    <Text
                      style={{
                        fontSize: 8,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 2,
                        margin: 'auto',
                      }}
                    >
                      {i + 1}
                    </Text>
                  </View>
                ))}
              </View>

              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '70%',
                }}
              >
                <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' }]}>
                  <Text style={{ fontWeight: 400, fontSize: 8, color: 'white', margin: 'auto' }}>
                    Murabaha Sale Elements
                  </Text>
                </View>

                {[
                  'Currency',
                  'Cost of Goods as per Pro-forma Invoice',
                  'Murabaha Profit',
                  'Other Expense',
                  'Seriousness Cash Margin',
                  'Murabaha Sale Price',
                  'Delivery Location',
                  'Payment Term (Monthly/Quarterly/Other)',
                  'Number of Installments',
                  'Installment Amount (Refer)',
                ].map((value, i: number) => (
                  <View key={i} style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                    <Text
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        fontSize: 8,
                        padding: 2,
                      }}
                    >
                      {value}
                    </Text>
                  </View>
                ))}
              </View>

              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '10%',
                }}
              >
                <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' }]}>
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: 8,
                      color: 'white',
                      margin: 'auto',
                    }}
                  >
                    {' '}
                  </Text>
                </View>

                {[...Array(10)].map((_, i: number) => (
                  <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                    <Text
                      style={{
                        fontSize: 8,
                        padding: 2,
                        margin: 'auto',
                        textAlign: 'center',
                      }}
                    >
                      {' '}
                    </Text>
                  </View>
                ))}
              </View>

              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '15%',
                }}
              >
                <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' }]}>
                  <Text style={{ fontWeight: 400, fontSize: 8, color: 'white', margin: 'auto' }}>Amount</Text>
                </View>

                {[...Array(10)].map((_, i: number) => (
                  <View key={i} style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                    <Text
                      style={{
                        margin: 'auto',
                        fontSize: 8,
                        padding: 2,
                        textAlign: 'center',
                      }}
                    >
                      {' '}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={{ width: '48%' }}>
            <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                  <View
                                    style={{
                                      height: 'auto',
                                      fontSize: '10px',
                                      borderTop: '1px solid #6E2585',
                                      borderLeft: '1px solid #6E2585',
                                      borderRight: '1px solid #6E2585',
                                      width: '5%',
                                    }}
                                  >
                                    <View
                                      style={[
                                        styles.secondRowAr,
                                        { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' },
                                      ]}
                                    >
                                      <Text style={{ fontWeight: 400, fontSize: 8, color: 'white', margin: 'auto' }}>
                                        {' '}
                                      </Text>
                                    </View>

                                    {[...Array(10)].map((_, i: number) => (
                                      <View key={i} style={[styles.secondRowAr, { borderBottom: '1px solid #6E2585' }]}>
                                        <Text
                                          style={{
                                            fontSize: 8,
                                            textAlign: 'center',
                                            display: 'flex',
                                            fontFamily: 'Cairo',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: 2,
                                            margin: 'auto',
                                          }}
                                        >
                                          {i + 1}
                                        </Text>
                                      </View>
                                    ))}
                                  </View>

                                  <View
                                    style={{
                                      height: 'auto',
                                      fontSize: '10px',
                                      borderTop: '1px solid #6E2585',
                                      borderLeft: '1px solid #6E2585',
                                      width: '70%',
                                    }}
                                  >
                                    <View
                                      style={[
                                        styles.secondRow,
                                        { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' },
                                      ]}
                                    >
                                      <Text
                                        style={{
                                          fontWeight: 400,
                                          fontSize: 8,
                                          color: 'white',
                                          margin: 'auto',
                                          textAlign: 'right',
                                          fontFamily: 'Cairo',
                                        }}
                                      >
                                        عناصر سعر البيع بالمرابحة
                                      </Text>
                                    </View>

                                    {[
                                      'العملة',
                                      'تكلفة البضاعة حسب الفاتورة المبدئية',
                                      'الربح المتفق عليه',
                                      'مصاريف أخرى',
                                      'هامش الجدية',
                                      'صافي مبلغ البيع',
                                      'مكان التسليم',
                                      'شروط الدفع',
                                      'عدد الاقساط',
                                      'قيمة القسط',
                                    ].map((value, i: number) => (
                                      <View key={i} style={[styles.secondRowAr, { borderBottom: '1px solid #6E2585' }]}>
                                        <Text
                                          style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            fontFamily: 'Cairo',
                                            textAlign: 'right',
                                            fontSize: 8,
                                            padding: 2,
                                          }}
                                        >
                                          {value}
                                        </Text>
                                      </View>
                                    ))}
                                  </View>

                                  <View
                                    style={{
                                      height: 'auto',
                                      fontSize: '10px',
                                      borderTop: '1px solid #6E2585',
                                      borderLeft: '1px solid #6E2585',
                                      width: '10%',
                                    }}
                                  >
                                    <View
                                      style={[
                                        styles.secondRow,
                                        { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' },
                                      ]}
                                    >
                                      <Text
                                        style={{
                                          fontWeight: 400,
                                          fontSize: 8,
                                          color: 'white',
                                          margin: 'auto',
                                        }}
                                      >
                                        {' '}
                                      </Text>
                                    </View>

                                    {[...Array(10)].map((_, i: number) => (
                                      <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                                        <Text
                                          style={{
                                            fontSize: 8,
                                            padding: 2,
                                            margin: 'auto',
                                            textAlign: 'center',
                                          }}
                                        >
                                          {' '}
                                        </Text>
                                      </View>
                                    ))}
                                  </View>

                                  <View
                                    style={{
                                      height: 'auto',
                                      fontSize: '10px',
                                      borderTop: '1px solid #6E2585',
                                      borderLeft: '1px solid #6E2585',
                                      width: '15%',
                                    }}
                                  >
                                    <View
                                      style={[
                                        styles.secondRow,
                                        { borderBottom: '1px solid #6E2585', backgroundColor: '#6E2585' },
                                      ]}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 8,
                                          fontWeight: 400,
                                          color: 'white',
                                          margin: 'auto',
                                          fontFamily: 'Cairo',
                                          textAlign: 'right',
                                        }}
                                      >
                                        القيمة
                                      </Text>
                                    </View>

                                    {[...Array(10)].map((_, i: number) => (
                                      <View key={i} style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                                        <Text
                                          style={{
                                            margin: 'auto',
                                            fontSize: 8,
                                            fontFamily: 'Cairo',
                                            padding: 2,
                                            textAlign: 'center',
                                          }}
                                        >
                                          {' '}
                                        </Text>
                                      </View>
                                    ))}
                                  </View>
                                </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>3</Text>
            <Text style={styles.textFont}>The Murabaha contract shall include the following main terms :</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>3</Text>
            <Text style={styles.arabicText}>يجب أن يتضمن عقد بيع المرابحة الشروط الرئيسية التالية:</Text>
          </View>
        </View>


         <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5,marginLeft:5}}>
            <Text style={styles.textFont}>3.1</Text>
            <Text style={styles.textFont}>Before clearing the Goods from the port of destination, and upon the
Bank selling the purchased Goods to the Promisor on Murabaha basis,
and transferring possession of the Goods to the Promisor, the Promisor
shall bear the loading and unloading charges, Customs duty, port clearance charges, taxes and transportation cost of Goods to the Promisors
warehouse, after which the Promisor is not entitled to claim any of the
aforesaid charges from the Bank.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5,marginRight:5}}>
            <Text style={{...styles.arabicText}}>3.1</Text>
            <Text style={{...styles.arabicText,marginRight:10}}>
ضَمِنَ الواعد حسن أداء المورد الذي طلب الواعد شراء البضائع منه، فيما يتعلق بتسليم البضاعة، ومطابقة الكميات، والنوعيات، والمواصفات، والشروط المحددة. وتعهد الواعد تعهداً غير قابل للنقض بتعويض البنك عند الطلب عن أية أضرار أو خسائر فعلية تلحق به جراء إخفاق المورّد في الوفاء بالتزاماته، إلا في حالة الظرف القاهر.

</Text>
          </View>
        </View>


<PdfFooter/>
              </Page>
              <Page size="A4" style={styles.page}>
                <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5,marginLeft:5}}>
            <Text style={styles.textFont}>3.2</Text>
            <Text style={styles.textFont}>The Promisor shall bear all ownership risks of the Goods after signing
the Murabaha Sale Contract and assuming ownership of the Goods by
actual or constructive possession</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5,marginRight:5}}>
            <Text style={{...styles.arabicText}}>3.2</Text>
            <Text style={{...styles.arabicText,marginRight:13}}>
تحمل الواعد جميع مخاطر البضائع بعد توقيع عقد بيع المرابحة وحيازته الحكمية
.أو الفعلية للبضائع
</Text>
          </View>
        </View>
                <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>4</Text>
            <Text style={styles.textFont}>The Promisor shall guarantee the good performance of the suppliers M/s:
from whom the Promisor requests purchase of the Goods, regarding the
delivery of Goods, matching quantities, qualities and specific conditions
and specifications. As such, the Promisor irrevocably undertakes to compensate the Bank, on demand, for any actual damages or losses resulting
from suppliers failure to meet its obligations, except for overwhelming
circumstances (Force Majeur)</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>4</Text>
            <Text style={{...styles.arabicText,marginRight:13}}>
ضَمِنَ الواعد حسن أداء المورد الذي طلب الواعد شراء البضائع منه، فيما يتعلق بتسليم البضاعة، ومطابقة الكميات، والنوعيات، والمواصفات، والشروط المحددة. وتعهد الواعد تعهداً غير قابل للنقض بتعويض البنك عند الطلب عن أية أضرار أو خسائر فعلية تلحق به جراء إخفاق المورّد في الوفاء بالتزاماته، إلا في حالة الظرف القاهر.

</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>5</Text>
            <Text style={styles.textFont}>The Promisor authorizes the bank to buy or sell, at the prevailing foreign
exchange spot rate, at the date of signing the Murabaha sale contract,
the foreign currency equal to value of documents and settle documents
received under sight or Usance (Acceptance) L/C</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>5</Text>
            <Text style={{...styles.arabicText,marginRight:13}}>
فوّض الواعد البنك أن يشتري أو يبيع لحسابه، حسب سعر صرف العملت السائد
 لديه بتاريخ إبرام عقد المرابحة، قيمة العملة الجنبية اللزمة والمساوية لتسديد
 قيمة المستندات، سواء كان اعتماد المستندي صالحاً للدفع عند الطلع، أو مؤجل
.الدفع
</Text>
          </View>
        </View>

         <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>6</Text>
            <Text style={styles.textFont}>If the Promisor breaches on the Promise to purchase the Goods after the
Bank purchased the same, the Bank, as owner of the Goods, is entitled
to sell the same Goods and recover the purchase cost and all relevant
actual costs and administrative expenses thereof. If the proceeds from
sale of Goods exceed the Banks entitlement, such excess will be the
sole right of the Bank in its capacity as the owner of the Goods. If the
proceeds from sale of Goods are less than the purchase cost and all
administrative expenses/ actual costs, the shortfall shall be deducted from
the seriousness cash margin amount, and the Promisor is liable to pay
the Bank any difference amount if this seriousness cash margin is not
sufficient, until final settlement.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>6</Text>
            <Text style={{...styles.arabicText,marginRight:13}}>إذا رفض الواعد شراء البضائع بعد أن اشتراها البنك، يحق للبنك بيعها لستيفاء
 كلفة شرائها وكافة المصاريف الخرى الفعلية والدارية المتعلقة بشرائها. وإذا
 تجاوزت حصيلة البيع متطلبات البنك، فإن هذه الزيادة ستكون من حق البنك وحده
 بصفته مالك البضائع. أما إذا نقصت حصيلة البيع عن متطلبات البنك، تُحسم قيمة
 النقص من مبلغ هامش الجدية، ويبقى للبنك في ذمة الواعد قيمة أي نقص يزيد عن
.مبلغ هامش الجدية، حتى يتم السداد الكامل
</Text>
          </View>
        </View>


         <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>7</Text>
            <Text style={styles.textFont}> If the Client refuses to receive the Goods, or documents relating to the
Goods, after concluding the Murabaha sale contract within a period specified by the Bank, the Bank is entitled in this case to abrogate the Murabaha
sale contract and retain ownership of the goods and sell the Goods and
receive the sale proceeds to settle the purchase cost and all relevant
expenses and costs, and revert to the Promisor for any shortfall.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>7</Text>
            <Text style={{...styles.arabicText,marginRight:13}}>إذا رفض الواعد شراء البضائع بعد أن اشتراها البنك، يحق للبنك بيعها لستيف إذا رفض الزبون استلم البضائع، أو الوثائق المتعلقة بها بعد توقيع عقد المرابحة
 في مدة قررها البنك، يحق للبنك في هذه الحالة فسخ عقد البيع، وتعود البضائع إلى
 ملكيته، ويقوم ببيعها لستيفاء كلفة شرائها وكافة المصاريف الخرى، وله الرجوع
.على الواعد بقيمة أي نقص
</Text>
          </View>
        </View>


        <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>8</Text>
            <Text style={styles.textFont}>In the event that the supplier fails to act on the Letter of Credit opened by
the Bank and supply the goods to the Bank, the Promisor acknowledges
that the Bank will not be held responsible by it for the non-execution of the
order by the supplier. The Promisor undertakes to reimburse the Bank for
L/C opening expenses, Takaful, and all other related expenses and costs.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>8</Text>
            <Text style={{...styles.arabicText,marginRight:13}}>إذا رفض الواعد شراء البضائع بعد أن اشتراها البنك، يحق للبنك بيعها لستيف إذا رفض الزبون استلم البضائع، أو الوثائق المتعلقة بها بعد توقيع عقد المرابحفي حال عدم استخدام المورّد للعتماد و/أو توريد البضائع، أقر الواعد أن البنك لن
 يتحمل أية مسؤولية نتيجة عدم تنفيذ المورد. وتعهد الواعد بدفع المصاريف كافة،
.مثل نفقات فتح اعتماد، ورسوم التكافل، وأية مصاريف أخرى متعلقة بالعتماد

</Text>
          </View>
        </View>

         <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>9</Text>
            <Text style={styles.textFont}> The Promisor also acknowledges that the Bank shall not be responsible for
any losses which the Promisor may incur due to delay in the shipping and
arrival of the Goods/documents thereof. The Promisor, in the execution of
this Promise, undertakes to buy the Goods and enter into a Murabaha sale
contract immediately upon the Bank assuming constructive possession
thereof.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>9</Text>
            <Text style={{...styles.arabicText,marginRight:13}}> أقر الواعد أن البنك لن يكون مسؤولً عن أية خسائر يتكبدها الواعد بسبب تأخر
 شحن البضائع ووصولها أو المستندات والوثائق المتعلقة بها. وتعهد الواعد بتنفيذ
 وعد الشراء، وإبرام عقد بيع المرابحة فوراً بعد وصول البضائع أو استلم البنك
.المستندات المتعلقة بها
</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>10</Text>
            <Text style={styles.textFont}>. The Promisor acknowledges that its address is that one provided at the
beginning of this Promise and in the Account Opening Form.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>10</Text>
            <Text style={{...styles.arabicText,marginRight:10}}>
أقر الواعد أن عنوانه هو العنوان الوارد في مقدمة هذا الوعد، وعلى نموذج فتح
.الحساب</Text>
          </View>
        </View>

         <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>11</Text>
            <Text style={styles.textFont}>The Promisor hereby irrevocably undertakes to be bound to the General
Terms and Conditions of the Bank.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>11</Text>
            <Text style={{...styles.arabicText,marginRight:10}}>
التزم الواعد بشكل غير قابل للنقض بالشروط والحكام العامة للبنك</Text>
          </View>
        </View>


         <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-start', gap: '4%',marginTop:5}}>
          <View style={{width:'48%',flexDirection:'row',gap:5}}>
            <Text style={styles.textFont}>12</Text>
            <Text style={styles.textFont}>This Promise is to be read together with the Master Murabaha Agreement. All terms contained therein are to be incorporated herein by reference.</Text>
          </View>
           <View style={{width:'48%',flexDirection:'row-reverse',gap:5}}>
            <Text style={styles.arabicText}>12</Text>
            <Text style={{...styles.arabicText,marginRight:10}}>
يُقرأ هذا الوعد بالتلزم مع اتفاقية المرابحة الساسية، وتكون كافة شروطها
.متضمنة في هذا العتماد والوعد على أساس المرجعية</Text>
          </View>
        </View>



        <View style={[styles.row, { marginTop: '10px' }]}>
          <View style={styles.secondRow}>
            <Text style={styles.label}>Customer (Promiser) Name : </Text>
            <Text style={[styles.inputField, { width: '100px' }]}></Text>
          </View>

          <View style={styles.secondRow}>
            <Text style={styles.label}>Signature(s) & Official Stamp : </Text>
            <Text style={[styles.inputField, { width: '100px' }]}></Text>
          </View>
        </View>
        <PdfFooter/>

              </Page>
    </Document>
  );
}
