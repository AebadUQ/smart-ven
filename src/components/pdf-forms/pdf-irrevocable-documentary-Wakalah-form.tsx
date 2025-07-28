'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PDFTermsAndCondition } from './sections/pdf-terms-condition';
import DualLabelField from './ui/dualLabelField';
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

    direction: 'rtl',
    textAlign: 'right',

    color: '#6E2B8C',
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
    color: '#6E2585',
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
    fontSize: 9,
    fontWeight: 'bold',
    color: '#6E2B8C',
  },

  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: 'black',
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
    borderBottom: '1px solid #6E2B8C',
    // borderBottomWidth: 1,
    // borderBottomColor: '#6E2B8C',
    // color: '#6E2B8C',
    // textAlign:'center',
    // width: '50%',
    flexWrap: 'wrap',
    fontSize: 8,
    flexGrow: 1,
    color: 'black',
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

export function IrrevocableDocumentaryWakalahForm({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDateTwo = dayjs(data?.createdAt).format('DDMMYYYY');

  const termsConditionData = {
    title: '',
    list: [
      {
        title: '',
        description: [
          {
            isClosure: true,
            text: 'The SWIFT messages or courier mail advising details of this Letter of Credit shall be dispatched at our risk and cost, with no liability being attributed to Bank Nizwa (the "Bank"). The Bank shall not be held liable for any delay, mutilation, agent or correspondent errors or omissions that may arise during its transmission or delivery, or by reason of the Bank acting upon such defective SWIFT messages.',
          },
          {
            isClosure: true,
            text: "The Bank shall not be under responsibility regarding the validity of documents taken in connection with the Letter of Credit nor for any error or defects of quantity, quality, value, weight, packing or description of any goods. It is further agreed that the Bank's right to reimbursement from us for bills handled under this authority shall not be prejudiced or affected by any invalidity, insufficiency, irregularity, or inaccurate description arising from any of the document or for delays in shipment or arrival of goods.",
          },
          {
            isClosure: true,
            text: 'The Bank is authorized to make any addition to the Letter of Credit and/or terms & conditions specified under this Letter of Credit which the Bank may consider to be necessary to comply with Government regulations, including any future changes in relevant laws or regulations.',
          },
          {
            isClosure: true,
            text: "At any time, whenever and as many times the Bank may deem it necessary, we undertake to pay on demand such sum as margin, as the Bank may in their absolute discretion consider necessary as further security for the fulfillment of our obligation. The Bank may also deduct from our account any such sums at the Bank's discretion, provided that notice is given to us to that effect. The Bank is authorized to apply such cash margin against any other liability that may become due to the Bank.",
          },
          {
            isClosure: true,
            text: 'If we fail to provide Takaful policy/certificate or fail to provide Takaful policy/certificate that meets the Bank requirements at the time of submitting Letter of Credit application, the Bank is authorized to issue Takaful policy/certificate at our cost.',
          },

          {
            isClosure: true,
            text: 'The Commission and Charges collected by the Bank shall not be refunded for any reason whatsoever, and the cash margin shall be refundable only in the currency in which it was kept at our request in case this Letter of Credit expires unutilized. We agree to pay the charges incurred outside the Bank, if the payment of the same is refused by the Beneficiaries.',
          },
          {
            isClosure: true,
            text: 'The Applicant undertakes to receive the documents drawn under this Letter of Credit from the Bank upon receipt of its first advice against payment of Invoice amount less proportionate margin regardless of arrival or non-arrival of relative goods. The Applicant shall also indemnify the Bank against loss of exchange resulting from devaluation of currencies or other factors of a like nature on a prevailing market spot rate basis.',
          },
          {
            isClosure: true,
            text: 'In the event that we default on payment of the principal, fees and charges as aforesaid, the Bank is entitled without our consent, but with prior notice, to sell the goods. Should there be any deficiency, we will remain liable for the outstanding amount until our full settlement of the amount due inclusive of fees, charges, and any other expenses.',
          },
          {
            isClosure: true,
            text: 'In case of Usance Letter of Credit, we authorize the Bank to debit our Account immediately for documents value on Maturity Date(s) of the Bill(s) as per payment terms of the Letter of Credit.',
          },
          {
            isClosure: true,
            text: 'We release the Bank, its branches and affiliates, from any responsibility, whatsoever, regarding the authenticity of the Letter of Credit documents and value or nature of the goods to be shipped under this Letter of Credit, nor shall they be responsible for the correctness and genuineness of the shipping and other documents.',
          },
          {
            isClosure: true,
            text: 'We acknowledge that the Bank is not responsible to lodge any claim with the Takaful Company in connection with any damage to the goods on the strength of the Takaful Policy, Certificate which may be in the Banks possession. Further, we undertake to get the relative goods insured against theft and fire from the expiry date of the respective Marine/Air/Land Insurance until the goods are finally cleared, If we fail to do so, the Bank may, without referring to us, effect the necessary Takaful (insurance) document and debit our Account for the expenses incurred.',
          },
          {
            isClosure: true,
            text: 'We hereby declare that we are aware of the regulations governing the boycott and that the Beneficiary with whom this Letter of Credit is opened is not on the blacklist, and non-dealing with countries as specified by the regulatory authority. We declare our full responsibility of any deviation from this fact.',
          },

          {
            isClosure: true,
            text: 'We hereby authorize the Bank to use the Courier Services whenever required/ available for carrying documents to and from the Foreign Correspondent at our risk and responsibility and agree to absolve the Bank from any consequences, whatsoever, caused due to any loss, destruction, damage, delay or non-delivery of documents by the said Courier Services.',
          },
          {
            isClosure: true,
            text: 'All the revisions of this Agreement shall apply on all subsequent extensions, increases and modifications to this Letter of Credit and to the drafts, documents and goods covered thereby. and to any action taken by the Bank, its Agents or Correspondents in accordance with such extensions, increases or modifications.',
          },
          {
            isClosure: true,
            text: 'We authorize the Bank to buy or sell at their prevailing foreign exchange spot rate the foreign currency equal to documents amount to settle documents and/or deferred payment related to this Letter of Credit.',
          },
          {
            isClosure: true,
            text: 'The Applicant acknowledges that its address is that one provided at the beginning of this Letter of credit and in the Account Opening Form.',
          },
          {
            isClosure: true,
            text: 'The Applicant is hereby irrevocably bound to the General Terms and Conditions of the Bank.',
          },
          {
            isClosure: true,
            text: 'This Letter of Credit shall be governed by Uniform Customs and Practice for Documentary Credits Currently in Force Issued by International Chamber of Commerce and/or subsequent amendments thereto admissible/applicable during the validity of this Letter of Credit and until it is fully Utilized/Expired/Settled not in contradiction to Islamic Sharia rules and principles.',
          },
          {
            isClosure: true,
            text: 'Any dispute arising out of, or in connection with this L/C, shall be referred to the jurisdiction of the competent courts in the Sultanate of Oman.',
          },
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
            isClosure: true,
            text: 'تعقدنا أن تتحمل مسؤولية رسائل السويفت أو الرسالة الخاصة بتبليغ تفاصيل هذا الاعتماد المستندي (الاعتماد) بواسطة خدمات الشركات الناقلة للبريد وجميع المصاريف التابعة لها، ولن نحقل ينك نزوى المشار اليه فيما بعد ب «البنك) أي مسؤولية ناتجة عن أي تأخير أو أخطاء مراسلي البنك أو الهفوات التي يمكن أن تحصل خلال الارسال أو التسليم، أو بسبب مراسلات السويفت التي يشوبها الخلل.',
          },
          {
            isClosure: true,
            text: 'ان يتحمل البنك مسؤولية عدم صلاحية المستندات الخاصة بالاعتماد المستندي ولا أي خلل أو خطأ يتعلق بالكمية أو النوعية أو قيمة أو وزن أو تعبئة أو مواصفات أي بضاعة ووافقنا على عدم تعريض حق البنك في استرداد قيمة السندات إلى أي مخاطر نتيجة عدم الصلاحية أو عدم الكفاية أو الخلل أو اختلاف الوصف في أي مستند أو بسبب تأخر الشحن ووصول البضاعة.',
          },
          {
            isClosure: true,
            text: 'فوضنا البنك بإضافة أي مستند إلى المستندات و/أو الشروط والأحكام الخاصة بهذا الاعتماد التي يراها البنك ضرورية للتوافق مع الأنظمة الحكومية وأن متغيرات لاحقة فيها.',
          },
          {
            isClosure: true,
            text: 'تعهدنا أن ندفع عند طلب البنك في أي وقت وبقراره المستقل، مبلغ الهامش النقدي الذي يعتبره البنك ضماناً ضرورياً للوفاء بالتزامتنا. وكذلك فؤضنا البنك بحسم أي مبالغ من حسابنا بهذا الخصوص مع إشعارنا بذلك، واستخدام هذه المبالغ لسداد التزاماتنا الأخرى تجاه البنك.',
          },
          {
            isClosure: true,
            text: 'فوضنا البنك بالاستحصال على وثيقة تكافل تتناسب مع متطلباته في حال عدم تقديمنا هذه الوثية مع طلب فتح الاعتماد على نفقتنا.',
          },

          {
            isClosure: true,
            text: 'لا يحق لنا استرداد العمولة والمصاريف التي استوفاها البنك ما عدا الهامش النقدي بالعملة التي طلبناها في حال انتهاء صلاحيتة الاعتماد وعدم استخدامه كما وافقنا على دفع أي مصاريف تكبدها البنك للجهات الخارجية في حالة رفض المستفيدين دفعها.',
          },
          {
            isClosure: true,
            text: 'تعهدنا بأن نستلم من البنك المستندات المسحوبة بموجب هذا الاعتماد بمجرد استلام أول إشعار منه بذلك مقابل دفع قيمة الفاتورة التجارية، بعد حسم الهامش النقدي، بغض النظر عن وصول البضاعة كما تعهدنا بتعويض البنك مقابل أي خسارة ناشئة عن انخفاض السعر الفوري لصرف العملات أو أي عوامل أخرى من هذا القبيل.',
          },
          {
            isClosure: true,
            text: 'فوضنا البنك في حال عجزنا عن تسديد قيمة الاعتماد ومصاريفه بقبض البضاعة دون موافقتنا، ولكن مع إشعارنا بذلك. وبيعها، وفي حال كانت قيمة بيع البضاعة غير كافية للوفاء بحقوقه التزمنا بسداد قيمة النقص بما فيها المصاريف والنفقات.',
          },
          {
            isClosure: true,
            text: 'فوضنا البنك بحسم قيمة المستندات من حسابنا ، بتاريخ تواريخ الاستحقاق. في حال الاعتماد مؤجل الدفع، حسب شروط الدفع الموضحة في الإعتماد.',
          },
          {
            isClosure: true,
            text: 'أعفينا البنك وفروعه ومراسليه من كافة المسؤوليات أياً كانت التي تتعلق بصحة المستندات التي سيتم تداولها أو بقيمة أو طبيعة البضاعة التي تشحن بموجب هذا الاعتماد. ولن نحقل البنك أي مسؤولية عن صحة ومصداقية مستندات الشحن وغيرها من المستندات.',
          },
          {
            isClosure: true,
            text: 'أقررنا بأن البنك غير مسؤول عن تقديم أية مطالبة إلى شركة التكافل فيما يتعلق بأي أضرار قد تلحق بالبضاعة بالإستناد إلى وثيقة / شهادة التكافل والتي قد تكون في حيازته. كما تعهدنا بالاستحصال على وثيقة تكافل ضد أخطار السرقة والحريق من تاريخ انتهاء وثيقة تكافل الشحن حتى تخليص البضائع. وفي حال تخلفنا عن إصدارها فؤضنا البنك باستصدار وثيقة التكافل وحسم التكلفة من حسابنا، دون موافقنا السابقة.',
          },

          {
            isClosure: true,
            text: 'أقررنا بأننا على علم تام بالقوانين الخاصة بالمقاطعة وأن المستفيدين من هذا الاعتماد والدول التي نصت عليها السلطات التنظيمية غير مدرجين في القائمة السوداء، وتتعهد بتحمل المسؤولية كاملة في حالة مخالفة ذلك.',
          },
          {
            isClosure: true,
            text: 'فؤضنا البنك باستخدام خدمات الشركات الناقلة للبريد حيثما وجدت لنقل المستندات من وإلى المراسلين الأجانب على مسؤوليتنا وعاتقنا، ووافقنا على إعفاء البنك من أي ضياع أو تلف أو عدم تسليم المستندات بواسطة خدمات الشركة الناقلة للبريد المذكورة.',
          },
          {
            isClosure: true,
            text: 'تطبق جميع أحكام هذه الاتفاقية على جميع التمديدات اللاحقة والزيادات والتعديلات على هذا الاعتماد والسندات والمستندات والبضاعة الخاصة به، وعلى أي إجراء يتخذه البنك أو وكلاؤه أو مراسلوه وفقاً لهذه التمديدات أو الزيادات أو التعديلات.',
          },
          {
            isClosure: true,
            text: 'فوضنا البنك بأن يشتري أو يبيع لحسابنا، حسب سعر الصرف السائد لديه، قيمة العملة الأجنبية اللازمة والمساوية لقيمة المستندات لغايات تسديد قيمة المستندات و/أو الدفعات المؤجلة الخاصة بالاعتماد.',
          },
          {
            isClosure: true,
            text: 'أقر مقدم الطلب أن عنوانه هو العنوان الوارد في مقدمة هذا الاعتماد، وعلى نموذج فتح الحساب.',
          },
          {
            isClosure: true,
            text: 'التزم مقدم الطلب بشكل غير قابل للنقض بالشروط والأحكام العامة للبنك.',
          },
          {
            isClosure: true,
            text: 'يخضع هذا الاعتماد للأصول والأعراف الموحدة في الاعتمادات المستندية الصادرة عن غرفة التجارة الدولية، السارية المفعول، و/أو التعديلات اللاحقة لها والمقبولة المطبقة خلال فترة سريان هذا الاعتماد وحتى الإنتهاء الكامل من استخدامه/ صلاحيته/ تسديده، بما لا يتعارض مع أحكام الشريعة الاسلامية ومبادئها.',
          },
          {
            isClosure: true,
            text: 'يحال أي نزاع قد ينشأ بخصوص الاعتماد المستندي إلى الجهات القضائية والمحاكم المختصة في سلطنة عُمان.',
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
          <View style={styles.row}>
            <View style={styles.secondRow}>
              <Text style={styles.secondLabel}>Branch:</Text>
              <Text style={styles?.inputField}> {formdetails?.tradeFinIrrDocCreAppWakalahBranch?.value || 'N/A'}</Text>
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
              val={formdetails?.tradeFinIrrDocCreAppWakalahFullSwiftandCourier?.tradeFinIrrDocCreAppWakalahFullSwift}
            />
            <CheckBoxComp
              label={`Courier Service`}
              val={
                formdetails?.tradeFinIrrDocCreAppWakalahFullSwiftandCourier?.tradeFinIrrDocCreAppWakalahCourierService
              }
            />

            {/* <View style={styles.checkboxRow}>
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalahFullSwiftandCourier
                      ?.tradeFinIrrDocCreAppWakalahCourierService
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
                  {/* <Text style={styles.secondLabel}>Applicant Name/In the name of Bank Nizwa </Text>
                  <Text style={styles.inputField}>
                    {formdetails?.tradeFinIrrDocCreAppWakalahApplicantNameonBehal || 'N/A'}
                  </Text> */}
                  {/* \n/In the name of Bank Nizwa */}
                  <InputComp
                    inputNine={`Applicant Name`}
                    outputNine={formdetails?.tradeFinIrrDocCreAppWakalahApplicantNameonBehal}
                  />
                </View>
                <InputComp
                  inputNine={`Applicant Address`}
                  outputNine={formdetails?.tradeFinIrrDocCreAppWakalahApplicantNameonBehalAddress}
                />

                <View style={{ ...styles.row, alignItems: 'center' }}>
                  <Text style={styles.secondLabel}>Tolerance: </Text>
                  <CheckBoxComp
                    label={formdetails?.tradeFinIrrDocCreAppWakalahAmount?.value}
                    val={formdetails?.tradeFinIrrDocCreAppWakalahAmount?.value || 'N/A'}
                  />

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Text>{' + '}</Text>

                    <Text style={styles.inputField}>
                      {formdetails?.tradeFinIrrDocCreAppWakalahAmountAboutPlus || 'N/A'}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Text>{' - '}</Text>

                    <Text style={styles.inputField}>
                      {formdetails?.tradeFinIrrDocCreAppWakalahAmountAboutMin || 'N/A'}
                    </Text>
                  </View>
                </View>
                <InputComp
                  inputNine="Accountee"
                  outputNine={formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryAccountee}
                />

                <View style={styles.row}>
                  <Text style={styles.secondLabel}>In figures : </Text>
                  <Text style={{ ...styles.inputField, fontSize: 8 }}>
                    {formdetails?.tradeFinIrrDocCreAppWakalahInFigures || 'N/A'}
                  </Text>
                </View>

                <View style={styles.row}>
                  {/* <Text style={styles.secondLabel}>In words : </Text>
                  <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppWakalahInWords || 'N/A'}</Text> */}
                  <InputComp
                    inputNine="In Words"
                    outputNine={formdetails?.tradeFinIrrDocCreAppWakalahInWords || 'N/A'}
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
                    {formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryName}{' '}
                    {formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryAddress}
                  </Text>
                </View> */}
                <InputComp
                  inputNine="Beneficiary Name"
                  outputNine={formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryName}
                />
                <InputComp
                  inputNine="Beneficiary Address"
                  outputNine={formdetails?.tradeFinIrrDocCreAppWakalahBeneficiaryAddress}
                />

                <View style={styles.row}>
                  <InputComp
                    inputNine="Advising Bank"
                    outputNine={formdetails?.tradeFinIrrDocCreAppWakalahAdvisingBank}
                  />

                  {/* <Text style={styles.secondLabel}>Advising Bank : </Text>
                  <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppWakalahAdvisingBank || 'N/A'}</Text> */}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                  <Text style={styles.textFont}>Currency</Text>
                  {formdetails?.tradeFinIrrDocCreAppWakalahCurreny?.map((items: any, index: any) => (
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
                      label={formdetails?.tradeFinIrrDocCreAppWakalahConfirmation?.value}
                      val={formdetails?.tradeFinIrrDocCreAppWakalahConfirmation?.value}
                    />

                    {/* {formdetails?.tradeFinIrrDocCreAppWakalahConfirmation?.value && (
                      <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.label}>{formdetails?.tradeFinIrrDocCreAppWakalahConfirmation?.value}</Text>
                      </View>
                    )} */}
                  </View>
                  {/* {formdetails?.tradeFinIrrDocCreAppWakalahConfirmBanking && ( */}
                  <View style={{ width: '40%' }}>
                    <InputComp
                      inputNine="Confirming Bank"
                      // outputNine={"gfugfyugfuygdf ugvcfyugfvy utfyucyuctfurifgysgi sfvgey fetfuytftuy wtfxyuwtf"}
                      outputNine={formdetails?.tradeFinIrrDocCreAppWakalahConfirmBanking || 'N/A'}
                    />
                  </View>
                  {/* )} */}
                  <View style={{ ...styles.secondRow, width: '35%' }}>
                    <Text style={styles.label}>Confirmation charges are for: </Text>
                    <CheckBoxComp
                      label={formdetails?.tradeFinIrrDocCreAppWakalahConfirmationCharges?.value}
                      val={formdetails?.tradeFinIrrDocCreAppWakalahConfirmationCharges?.value}
                    />

                    {/* {formdetails?.tradeFinIrrDocCreAppWakalahConfirmationCharges?.value && (
                      <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.label}>
                          {formdetails?.tradeFinIrrDocCreAppWakalahConfirmationCharges?.value}
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
                  {formdetails?.tradeFinIrrDocCreAppWakalahDateofExpiry
                    ? dayjs(formdetails?.tradeFinIrrDocCreAppWakalahDateofExpiry)?.format('DD-MM-YYYY')
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.label}>Place of Expiry : </Text>
                <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppWakalahPlaceofExpiry || 'N/A'}</Text>
              </View>

              <View style={styles.secondRow}>
                <Text style={styles.label}>Latest date of Shipment : </Text>
                <Text style={styles.inputField}>
                  {formdetails?.homeFinFtradeFinIrrDocCreAppWakalahLastestDateofShipmentinDetTenure || 'N/A'}
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
                      label={formdetails?.tradeFinIrrDocCreAppWakalahPartialShipment?.value}
                      val={formdetails?.tradeFinIrrDocCreAppWakalahPartialShipment?.value}
                    />
                    {formdetails?.tradeFinIrrDocCreAppWakalahPartialShipmentConditional && (
                      <InputComp
                        inputNine="Any Conditios please mention"
                        outputNine={formdetails?.tradeFinIrrDocCreAppWakalahPartialShipmentConditional}
                      />
                    )}

                    {/* {formdetails?.tradeFinIrrDocCreAppWakalahPartialShipment?.value && (
                      <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.label}>
                          {formdetails?.tradeFinIrrDocCreAppWakalahPartialShipment?.value}
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
                      label={formdetails?.tradeFinIrrDocCreAppWakalahTransshipment?.value}
                      val={formdetails?.tradeFinIrrDocCreAppWakalahTransshipment?.value}
                    />
                    {/* {formdetails?.tradeFinIrrDocCreAppWakalahTransshipment?.value && (
                      <View style={styles.checkboxRow}>
                        <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                        <Text style={styles.label}>{formdetails?.tradeFinIrrDocCreAppWakalahTransshipment?.value}</Text>
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
                        val={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahSea}
                      />
                      <CheckBoxComp
                        label={'Air'}
                        val={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahAir}
                      />
                      <CheckBoxComp
                        label={'Land'}
                        val={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahLand}
                      />
                      <CheckBoxComp
                        label={'Delivery'}
                        val={formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy?.tradeFinIrrDocCreAppWakalahDelivery}
                      />
                      {/* <View
                        style={[
                          styles.checkbox,
                          {
                            backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy
                              ?.tradeFinIrrDocCreAppWakalahSea
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
                            backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy
                              ?.tradeFinIrrDocCreAppWakalahAir
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
                            backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy
                              ?.tradeFinIrrDocCreAppWakalahLand
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
                            backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalahShipmentBy
                              ?.tradeFinIrrDocCreAppWakalahDelivery
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
                        {formdetails?.tradeFinIrrDocCreAppWakalahShipmentbyFrom || 'N/A'}
                      </Text>
                    </View>

                    <View style={[styles.secondRow, { width: '49%', alignItems: 'flex-start' }]}>
                      <Text style={styles.secondLabel}>To :</Text>
                      <Text style={styles?.inputField}>
                        {' '}
                        {formdetails?.tradeFinIrrDocCreAppWakalahShipmentbyTo || 'N/A'}
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
                    formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy?.tradeFinIrrDocCreAppWakalahSightPayment
                  }
                />

                <View style={styles.checkboxRow}>
                  <CheckBoxComp
                    label={'Acceptance / Deferred payment after'}
                    val={
                      formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                        ?.tradeFinIrrDocCreAppWakalahAcceptanceDeferredPayment
                    }
                  />

                  <Text style={[styles.inputField, { width: '50px' }]}>
                    {formdetails?.tradeFinIrrDocCreAppWakalahAfterNoofDays || 'N/A'}
                  </Text>
                  <Text style={styles.label}>days from </Text>
                  <Text style={[styles.inputField, { width: '50px' }]}>
                    {formdetails?.tradeFinIrrDocCreAppWakalahDaysfrom || 'N/A'}
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
                    formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                      ?.tradeFinIrrDocCreAppWakalahNegotiationatSightAcceptance
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
                    formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                      ?.tradeFinIrrDocCreAppWakalahUsanceAcceptance
                  }
                />
                <Text style={[styles.inputField, { width: '50px' }]}>
                  {formdetails?.tradeFinIrrDocCreAppWakalahMixedPaymentSightUsanceDays || 'N/A'}
                </Text>
                <Text style={styles.label}>days from </Text>
                <Text style={[styles.inputField, { width: '50px' }]}>
                  {formdetails?.tradeFinIrrDocCreAppWakalahMixedPaymentSightUsance || 'N/A'}
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
                  formdetails?.tradeFinIrrDocCreAppWakalahCreditAvailableBy
                    ?.tradeFinIrrDocCreAppWakalahMixedPaymentSightUsance
                }
              />
              {formdetails?.tradeFinIrrDocCreAppWakalahTexttobeAdded && (
                <View style={[styles.secondRow, { flexGrow: 1, alignItems: 'center' }]}>
                  <Text style={styles.label}>As Test To be Added:</Text>
                  <Text style={styles.inputLine}>{formdetails?.tradeFinIrrDocCreAppWakalahTexttobeAdded || 'N/A'}</Text>
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
                  {formdetails?.tradeFinIrrDocCreAppWakalahDescriptionofGoodsServices}
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
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahEXW}
                />

                <CheckBoxComp
                  label={'FOB'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahFOB}
                />

                <CheckBoxComp
                  label={'FCA'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahFOB}
                />

                <CheckBoxComp
                  label={'CFR'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCFR}
                />

                <CheckBoxComp
                  label={'CIF'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCIF}
                />

                <CheckBoxComp
                  label={'CPT'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCPT}
                />
                <CheckBoxComp
                  label={'CIP'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahCIP}
                />

                <CheckBoxComp
                  label={'Others'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalahDeliveryTerm?.tradeFinIrrDocCreAppWakalahOthers}
                />
              </View>
              {formdetails?.tradeFinIrrDocCreAppWakalahOthersSpecify && (
                <View style={{ width: '33%', flexGrow: 1, textAlign: 'left' }}>
                  <View style={{ ...styles.thirdRow, gap: 2 }}>
                    <View style={{ maxWidth: '40%', minWidth: '1%' }}>
                      {/* <Text style={{...styles.textFont}}>{inputNine}: </Text> */}
                    </View>
                    <View style={{ width: '60%', flexGrow: 10 }}>
                      <Text style={{ ...styles.input, maxWidth: '100%', flexGrow: 5, textAlign: 'left' }}>
                        {formdetails?.tradeFinIrrDocCreAppWakalahOthersSpecify || 'N/A'}
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
                      { backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalaDocReqSigned ? '#6E2B8C' : '' },
                    ]}
                  ></View> */}
                <CheckBoxComp
                  label="Signed Commercial Invoice in one original and"
                  val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqSigned}
                />
              </View>
              {/* <Text style={styles.label}>Signed Commercial Invoice in one original and</Text> */}
              <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppWakalaDocReqNoofCopies || 'N/A'}</Text>
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
                      { backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBills ? '#6E2B8C' : '' },
                    ]}
                  ></View>

                <Text style={styles.label}>
                  Full set of clean on board Bill(s) of Lading in long form issued or endorsed to the order of Bank
                  Nizwa, marked
                </Text> */}

                <CheckBoxComp
                  label={
                    'Full set of clean on board Bill(s) of Lading in long form issued or endorsed to the order of Bank Nizwa, marked'
                  }
                  val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBills}
                />
              </View>
              <Text style={styles.label}>freight</Text>

              <View style={{ flexDirection: 'row', gap: 70, paddingHorizontal: 30 }}>
                {/* {formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPrepaid ? ( */}
                <CheckBoxComp label="Prepaid" val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPrepaid} />
                {/* ) : ( */}
                <CheckBoxComp
                  label="Payable at destination"
                  val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPayableDestination}
                />
                {/* )} */}
                {/* <CheckBoxComp label="Prepaid" val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPrepaid} /> */}

                {/* <CheckBoxComp label="Payable at destination" val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPayableDestination} /> */}

                {/* <Text style={styles.label}>
                    {formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPrepaid
                      ? 'Prepaid'
                      : formdetails?.tradeFinIrrDocCreAppWakalaDocReqOnBoardBillsPayableDestination
                        ? 'Payable at destination'
                        : 'N/A'}
                  </Text> */}
              </View>

              <Text style={styles.label}>
                and notify Bank Nizwa and Ourselves, and showing full name and address of the carrying vessel's agent{' '}
              </Text>
              <Text style={styles.label}> address of the carrying vessel's agent</Text>
              <Text style={styles.label}>at port of destination.</Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 5 }}>
              {/* <View style={styles.checkboxRow}>
                  <View
                    style={[
                      styles.checkbox,
                      { backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybills ? '#6E2B8C' : '' },
                    ]}
                  ></View>
                </View>
                <Text style={styles.label}>
                  Air Waybill(s) consigned to Bank Nizwa, evidencing dispatch of the goods marked freight{' '}
                </Text> */}

              <CheckBoxComp
                label="Air Waybill(s) consigned to Bank Nizwa, evidencing dispatch of the goods marked freight"
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybills}
              />

              <View style={{ flexDirection: 'row', gap: 70, paddingHorizontal: 30 }}>
                {/* {formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybillsPrepaid ? ( */}
                <CheckBoxComp label={'Prepaid'} val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybillsPrepaid} />
                {/* ) : ( */}
                <CheckBoxComp label={'Collect'} val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybillsCollect} />
                {/* )} */}
                {/* <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                  <Text style={styles.label}>
                    {formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybillsPrepaid
                      ? 'Prepaid'
                      : formdetails?.tradeFinIrrDocCreAppWakalaDocReqAirWaybillsCollect
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
                        backgroundColor: formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignment ? '#6E2B8C' : '',
                      },
                    ]}
                  ></View>
                </View>
                <Text style={styles.label}>
                  Truck Consignment Note(s) consigned to Bank Nizwa, evidencing dispatch of the goods marked freight{' '}
                </Text> */}
              <CheckBoxComp
                label="Truck Consignment Note(s) consigned to Bank Nizwa, evidencing dispatch of the goods marked freight"
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignment}
              />
              <View style={{ flexDirection: 'row', gap: 70, paddingHorizontal: 30 }}>
                {/* {formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignmentPrepaid ? ( */}
                <CheckBoxComp
                  label="Prepaid"
                  val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignmentPrepaid}
                />
                {/* ) : ( */}
                <CheckBoxComp
                  label="Collect"
                  val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignmentCollect}
                />
              </View>
              {/* )} */}
              {/* <View style={styles.checkboxRow}>
                  <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                  <Text style={styles.label}>
                    {formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignmentPrepaid
                      ? 'Prepaid'
                      : formdetails?.tradeFinIrrDocCreAppWakalaDocReqTruckConsignmentCollect
                        ? 'Collect'
                        : 'N/A'}
                  </Text>
                </View> */}
            </View>

            {/* {formdetails?.tradeFinIrrDocCreAppMurabahaDocReqCertificateOrigin && ( */}
            <View style={styles.secondRow}>
              <CheckBoxComp
                label="Certificate of Origin in one original plus"
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateOrigin}
              />
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateOriginNoofCopies || 'N/A'}
              </Text>
              <Text style={styles.label}>copy(ies) issued or certified by Chamber of Commerce or equivalent</Text>
              <Text style={styles.label}>
                {' '}
                original to be certified by Chamber of Commerce or equivalent authority and legalized by Omani
                Embassy/consulate or in absence, any Arab embassy/consulate, stating that goods are purely of
              </Text>
              <View style={{flexDirection:'row', alignItems:'center',width:'100%'}}>
              <Text style={{ borderBottomWidth: 1, borderBottomColor: '#6E2B8C',width:"90%", color: 'black', fontSize: 10 }}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateOriginOrigin || 'N/A'}
              </Text>
              <Text style={{...styles.label,width:'10%'}}>origin.</Text></View>
            </View>
            {/* // )} */}

            {formdetails?.tradeFinIrrDocCreAppWakalaDocReqDeliveryOrder && (
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
                    val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqDeliveryOrder}
                  />
                </View>
                {/* <Text style={styles.label}>Delivery Order in one original and</Text> */}
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqDeliveryOrderNoofCopies || 'N/A'}
                </Text>
                <Text style={styles.label}>copy(ies)</Text>
              </View>
            )}

            {formdetails?.tradeFinIrrDocCreAppWakalaDocReqPackingList && (
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
                    val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqPackingList}
                  />
                </View>
                {/* <Text style={styles.label}>Packaging List in one original and</Text> */}
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqPackingListNoofCopies || 'N/A'}
                </Text>
                <Text style={styles.label}>copy(ies)</Text>
              </View>
            )}

            {/* <CheckBoxComp label={'Packaging List in one original and'} val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqPackingList}/> */}

            {formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateWeight && (
              <View style={styles.secondRow}>
                {/* <View style={styles.checkboxRow}>
                  <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                </View> */}
                {/* <Text style={styles.label}>Certificate of Weight in one original and</Text> */}
                <CheckBoxComp
                  label={'Certificate of Weight in one original and'}
                  val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateWeight}
                />
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateWeightNoofCopies || 'N/A'}
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
                      {formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentMS || 'N/A'}
                    </Text>
                    <Text style={styles.textFont}> and Applicant</Text>
                  </View>
                </>
              }
              val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipment}
            />

            <View style={{ width: '100%' }}>
              <InputComp
                inputNine="Insurance Company Name"
                outputNine={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentInsuranceCompanyName}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 5, width: '100%' }}>
              <View style={{ width: '50%' }}>
                <InputComp
                  inputNine="Address"
                  outputNine={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentAddress}
                />
              </View>
              <View style={{ width: '50%' }}>
                <InputComp
                  inputNine="Email"
                  outputNine={formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentEmail}
                />
              </View>
            </View>
            {/* {formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipment && (
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
                    {formdetails?.tradeFinIrrDocCreAppWakalaDocReqCertificateShipmentMS || 'N/A'}
                  </Text>
                  <Text style={styles.label}>and Applicant.</Text>
                </View>
              )} */}

            {/* {formdetails?.tradeFinIrrDocCreAppWakalaDocReqMarineAirLand && ( */}
            <View style={styles.secondRow}>
              <CheckBoxComp
                label="Marine/Air/Land Takaful (insurance) policy/certificate in"
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqMarineAirLand}
              />
              {/* <View style={styles.checkboxRow}>
                  <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                </View>
                <Text style={styles.label}>Marine/Air/Land Takaful (insurance) policy/certificate in</Text> */}
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqMarineAirLandNoofCertificatesOrignal || 'N/A'}
              </Text>

              <Text style={styles.label}>original and</Text>
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqMarineAirLandNoofCetificatesCopies || 'N/A'}
              </Text>

              <Text style={styles.label}>
                copies issued to the order of Bank Nizwa in the currency of this L/C for at least 110% of the invoice
                value covering all risks
              </Text>
              <Text style={styles.label}>
                and expressly stating claims if any are payable in the Sultanate of Oman. Takaful policy must contain
                name, address
              </Text>
              <Text style={styles.label}> and telephone number of the issuer agent in the Sultanate of Oman</Text>
            </View>
            {/* )} */}

            {formdetails?.tradeFinIrrDocCreAppWakalaDocReqTakfulLocally && (
              <View style={styles.secondRow}>
                <CheckBoxComp
                  label="Takaful covered by us locally, Takaful Company name"
                  val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqTakfulLocallyCompanyName}
                />
                {/* <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                  </View>
                  <Text style={styles.label}>Takaful covered by us locally, Takaful Company name : </Text> */}
                <Text style={styles.inputField}>
                  {formdetails?.tradeFinIrrDocCreAppWakalaDocReqTakfulLocallyCompanyName || 'N/A'}
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

              {formdetails?.tradeFinIrrDocCreAppWakalaAddDetAuthorizeOMRFCYLCAccountNo
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
          {formdetails?.tradeFinIrrDocCreAppWakalaDocReqHealthCertificate && (
            <View style={styles.secondRow}>
              {/* <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                  </View>
                  <Text style={styles.label}>Health Certificate : </Text> */}
              <CheckBoxComp
                label="Health Certificate :"
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqHealthCertificate}
              />
              {/* <View style={styles.secondRow}> */}
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqHealthCertificateTextField || 'N/A'}
              </Text>
            </View>
            // </View>
          )}
          {formdetails?.tradeFinIrrDocCreAppWakalaDocReqPhytosanitaryCertificate && (
            <View style={styles.secondRow}>
              <CheckBoxComp
                label={`Phytosanitary Certificate`}
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqPhytosanitaryCertificate}
              />

              {/* <View style={styles.secondRow}> */}
              <Text style={styles.inputField}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqPhytosanitaryCertificateTextField || 'N/A'}
              </Text>
              {/* </View> */}
            </View>
          )}
          {formdetails?.tradeFinIrrDocCreAppWakalaDocReqFumigationCertificate && (
            <View style={styles.secondRow}>
              <CheckBoxComp
                label={`Fumigation Certificate`}
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqFumigationCertificate}
              />

              {/* <View style={styles.secondRow}> */}
              <Text style={styles.inputLine}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqPhytosanitaryCertificateTextField || 'N/A'}
              </Text>
              {/* </View> */}
            </View>
          )}
          {formdetails?.tradeFinIrrDocCreAppWakalaDocReqInspetionCertificate && (
            <View style={styles.secondRow}>
              <CheckBoxComp
                label={`
Inspection Certificate`}
                val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqInspetionCertificate}
              />

              {/* <View style={styles.secondRow}> */}
              <Text style={{ ...styles.inputField, flexGrow: 1 }}>
                {formdetails?.tradeFinIrrDocCreAppWakalaDocReqInspetionCertificateTextField || 'N/A'}
              </Text>
              {/* </View> */}
            </View>
          )}

          {/* {formdetails?.tradeFinIrrDocCreAppWakalaDocReqOthertermsDocuments && ( */}
          <View style={styles.secondRow}>
            {/* <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                  </View>
                  <Text style={styles.label}>Other terms/documents : </Text> */}
            <CheckBoxComp
              label="Other terms/documents :"
              val={formdetails?.tradeFinIrrDocCreAppWakalaDocReqOthertermsDocumentsOthers}
            />
            <Text style={styles.inputField}>
              {formdetails?.tradeFinIrrDocCreAppWakalaDocReqOthertermsDocumentsOthers || 'N/A'}
            </Text>
          </View>
          {/* {formdetails?.tradeFinIrrDocCreAppWakalaAddDetShippingMarks && ( */}
          <View style={styles.secondRow}>
            <CheckBoxComp label="Shipping Marks :" val={formdetails?.tradeFinIrrDocCreAppWakalaAddDetShippingMarks} />
            {/* <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                  </View>
                  <Text style={styles.label}>Shipping Marks :</Text> */}

            <Text style={styles.inputField}>
              {formdetails?.tradeFinIrrDocCreAppWakalaAddDetShippingMarksTypeHere || 'N/A'}
            </Text>
          </View>
          {/* )} */}

          {/* {formdetails?.tradeFinIrrDocCreAppWakalaAddDetDocumentsLC && ( */}
          <View style={styles.secondRow}>
            <CheckBoxComp
              label="Documents to be presented within"
              val={formdetails?.tradeFinIrrDocCreAppWakalaAddDetNoofDays}
            />

            {/* <View style={styles.checkboxRow}>
                    <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                  </View>
                  <Text style={styles.label}>Documents to be presented within</Text> */}

            <Text style={styles.inputField}>{formdetails?.tradeFinIrrDocCreAppWakalaAddDetNoofDays || 'N/A'}</Text>

            <Text style={styles.label}>days after shipment/delivery date, and within L/C validity.</Text>
          </View>
          {/* )} */}
          <View style={styles.secondRow}>
            {/* <CheckBoxComp label="All commissions & charges outside Bank Nizwa including reimbursement charges are for" val={}/> */}
            <Text style={styles.label}>
              All commissions & charges outside Bank Nizwa including reimbursement charges are for
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
                    {formdetails?.tradeFinIrrDocCreAppWakalahAdditionalDetailsConfirmationCharges?.value}
                  </Text>
                </View> */}
            <CheckBoxComp
              label={formdetails?.tradeFinIrrDocCreAppWakalahAdditionalDetailsConfirmationCharges?.value}
              val={formdetails?.tradeFinIrrDocCreAppWakalahAdditionalDetailsConfirmationCharges?.value}
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

            {formdetails?.tradeFinIrrDocCreAppWakalaAddDetAuthorizeOMRFCYLCAccountNo
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
        <View style={{ flexDirection: 'column', gap: 5 }}>
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
            Terms And Condition
          </Text>

          <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
            <View style={{ width: '47.5%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>1.</Text>
              <Text style={styles.textFont}>
                The SWIFT messages or courier mail advising details of this Letter of Credit shall be dispatched at our
                risk and cost, with no liability being attributed to Bank Nizwa (the "Bank"). The Bank shall not be held
                liable for any delay, mutilation, agent or correspondent errors or omissions that may arise during its
                transmission or delivery, or by reason of the Bank acting upon such defective SWIFT messages.
              </Text>
            </View>
            <View style={{ width: '47.5%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
              <Text style={styles.arabicText}>1.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 5 }}>
                تعقدنا أن تتحمل مسؤولية رسائل السويفت أو الرسالة الخاصة بتبليغ تفاصيل هذا اعتماد المستندي (العتماد)
                بواسطة خدمات الشركات الناقلة للبريد وجميع المصاريف التابعة لها، ولن نحقل ينك نزوى المشار اليه فيما بعد ب
                «البنك) أي مسؤولية ناتجة عن أي تأخير أو أخطاء مراسلي البنك أو الهفوات التي يمكن أن تحصل خل الرسال أو
                التسليم، أو بسبب مراسلت السويفت التي .يشوبها الخلل
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
            <View style={{ width: '47.5%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>2.</Text>
              <Text style={styles.textFont}>
                2. The Bank shall not be under responsibility regarding the validity of documents taken in connection
                with the Letter of Credit nor for any error or defects of quantity, quality, value, weight, packing or
                description of any goods. It is further agreed that the Bank's right to reimbursement from us for bills
                handled under this authority shall not be prejudiced or afected by any invalidity, insufciency,
                irregularity, or inaccurate description arising from any of the document or for delays in shipment or
                arrival of goods.
              </Text>
            </View>
            <View style={{ width: '47.5%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
              <Text style={styles.arabicText}>2.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                ان يتحمل البنك مسؤولية عدم صلحية المستندات الخاصة بالعتماد المستندي ول أي خلل أو خطأ يتعلق بالكمية أو
                النوعية أو قيمة أو وزن أو تعبئة أو مواصفات أي بضاعة ووافقنا على عدم تعريض حق البنك في استرداد قيمة
                السندات إلى أي مخاطر نتيجة عدم الصحية أو عدم الكفاية أو الخلل أو اختلف الوصف في أي .مستند أو بسبب تأخر
                الشحن ووصول البضاعة
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: '5%' }}>
            <View style={{ width: '47.5%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>3.</Text>
              <Text style={styles.textFont}>
                {' '}
                The Bank is authorized to make any addition to the Letter of Credit and/or terms & conditions specifed
                under this Letter of Credit which the Bank may consider to be necessary to comply with Government
                regulations, including any future changes in relevant laws or regulations.
              </Text>
            </View>
            <View style={{ width: '47.5%', flexDirection: 'row-reverse' }}>
              <Text style={styles.arabicText}>3.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                فوضنا البنك بإضافة أي مستند إلى المستندات و/أو الشروط والحكام الخاصة بهذا العتماد التي يراها البنك
                ضرورية للتوافق مع النظمة الحكومية وأن .متغيرات لحقة فيها
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
            <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>4.</Text>
              <Text style={styles.textFont}>
                {' '}
                At any time, whenever and as many times the Bank may deem it necessary, we undertake to pay on demand
                such sum as margin, as the Bank may in their absolute discretion consider necessary as further security
                for the fulfllment of our obligation. The Bank may also deduct from our account any such sums at the
                Bank's discretion, provided that notice is given to us to that efect. The Bank is authorized to apply
                such cash margin against any other liability that may become due to the Bank
              </Text>
            </View>
            <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
              <Text style={styles.arabicText}>4.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                تعهدنا أن ندفع عند طلب البنك في أي وقت وبقراره المستقل، مبلغ الهامش النقدي الذي يعتبره البنك ضماناً
                ضرورياً للوفاء بالتزامتنا. وكذلك فؤضنا البنك بحسم أي مبالغ من حسابنا بهذا الخصوص مع إشعارنا بذلك،
                واستخدام هذه .المبالغ لسداد التزاماتنا الخرى تجاه البنك
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
            <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>5.</Text>
              <Text style={styles.textFont}>
                {' '}
                . If we fail to provide Takaful policy/certifcate or fail to provide Takaful policy/certifcate that
                meets the Bank requirements at the time of submitting Letter of Credit application, the Bank is
                authorized to issue Takaful policy/certifcate at our cost.
              </Text>
            </View>
            <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
              <Text style={styles.arabicText}>5.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                فوضنا البنك بالستحصال على وثيقة تكافل تتناسب مع متطلباته في حال عدم .تقديمنا هذه الوثية مع طلب فتح
                العتماد على نفقتنا
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
            <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>6.</Text>
              <Text style={styles.textFont}>
                The Commission and Charges collected by the Bank shall not be refunded for any reason whatsoever, and
                the cash margin shall be refundable only in the currency in which it was kept at our request in case
                this Letter of Credit expires unutilized. We agree to pay the charges incurred outside the Bank, if the
                payment of the same is refused by the Benefciaries.
              </Text>
            </View>
            <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
              <Text style={styles.arabicText}>6.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                ل يحق لنا استرداد العمولة والمصاريف التي استوفاها البنك ما عدا الهامش النقدي بالعملة التي طلبناها في حال
                انتهاء صلحيتة العتماد وعدم استخدامه كما وافقنا على دفع أي مصاريف تكبدها البنك للجهات الخارجية في حالة
                رفض .المستفيدين دفعها
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
            <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>7.</Text>
              <Text style={styles.textFont}>
                The Applicant undertakes to receive the documents drawn under this Letter of Credit from the Bank upon
                receipt of its frst advice against payment of Invoice amount less proportionate margin regardless of
                arrival or non-arrival of relative goods. The Applicant shall also indemnify the Bank against loss of
                exchange resulting from devaluation of currencies or other factors of a like nature on a prevailing
                market spot rate basis.
              </Text>
            </View>
            <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
              <Text style={styles.arabicText}>7.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                تعهدنا بأن نستلم من البنك المستندات المسحوبة بموجب هذا العتماد بمجرد استلم أول إشعار منه بذلك مقابل دفع
                قيمة الفاتورة التجارية، بعد حسم الهامش النقدي، بغض النظر عن وصول البضاعة كما تعهدنا بتعويض البنك مقابل
                أي خسارة ناشئة عن انخفاض السعر الفوري لصرف العملت أو أي عوامل .أخرى من هذا القبيل
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
            <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>8.</Text>
              <Text style={styles.textFont}>
                In the event that we default on payment of the principal, fees and charges as aforesaid, the Bank is
                entitled without our consent, but with prior notice, to sell the goods. Should there be any defciency,
                we will remain liable for the outstanding amount until our full settlement of the amount due inclusive
                of fees, charges, and any other expenses
              </Text>
            </View>
            <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
              <Text style={styles.arabicText}>8.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                فوضنا البنك في حال عجزنا عن تسديد قيمة العتماد ومصاريفه بقبض البضاعة دون موافقتنا، ولكن مع إشعارنا بذلك.
                وبيعها، وفي حال كانت قيمة بيع البضاعة غير كافية للوفاء بحقوقه التزمنا بسداد قيمة النقص بما فيها المصاريف
                .والنفقات
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
            <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
              <Text style={styles.textFont}>9.</Text>
              <Text style={styles.textFont}>
                {' '}
                In case of Usance Letter of Credit, we authorize the Bank to debit our Account immediately for documents
                value on Maturity Date(s) of the Bill(s) as per payment terms of the Letter of Credit.
              </Text>
            </View>
            <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-start' }}>
              <Text style={styles.arabicText}>9.</Text>
              <Text style={{ ...styles.arabicText, marginRight: 8 }}>
                {' '}
                فوضنا البنك بحسم قيمة المستندات من حسابنا ، بتاريخ تواريخ الستحقاق. .في حال العتماد مؤجل الدفع، حسب شروط
                الدفع الموضحة في العتماد
              </Text>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>10.</Text>
            <Text style={styles.textFont}>
              {' '}
              We release the Bank, its branches and afliates, from any responsibility, whatsoever, regarding the
              authenticity of the Letter of Credit documents and value or nature of the goods to be shipped under this
              Letter of Credit, nor shall they be responsible for the correctness and genuineness of the shipping and
              other documents.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>10.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 8 }}>
              {' '}
              أعفينا البنك وفروعه ومراسليه من كافة المسؤوليات أياً كانت التي تتعلق بصحة المستندات التي سيتم تداولها أو
              بقيمة أو طبيعة البضاعة التي تشحن بموجب هذا العتماد. ولن نحقل البنك أي مسؤولية عن صحة ومصداقية .مستندات
              الشحن وغيرها من المستندات
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>11.</Text>
            <Text style={styles.textFont}>
              We acknowledge that the Bank is not responsible to lodge any claim with the Takaful Company in connection
              with any damage to the goods on the strength of the Takaful Policy, Certifcate which may be in the Banks
              possession. Further, we undertake to get the relative goods insured against theft and fre from the expiry
              date of the respective Marine/Air/Land Insurance until the goods are fnally cleared, If we fail to do so,
              the Bank may, without referring to us, efect the necessary Takaful (insurance) document and debit our
              Account for the expenses incurred.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>11.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              {' '}
              أقررنا بأن البنك غير مسؤول عن تقديم أية مطالبة إلى شركة التكافل فيما يتعلق بأي أضرار قد تلحق بالبضاعة
              بالستناد إلى وثيقة / شهادة التكافل والتي قد تكون في حيازته. كما تعهدنا بالستحصال على وثيقة تكافل ضد أخطار
              السرقة والحريق من تاريخ انتهاء وثيقة تكافل الشحن حتى تخليص البضائع. وفي حال تخلفنا عن إصدارها فؤضنا البنك
              باستصدار وثيقة التكافل وحسم التكلفة من .حسابنا، دون موافقنا السابقة
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>12.</Text>
            <Text style={styles.textFont}>
              {' '}
              We hereby declare that we are aware of the regulations governing the boycott and that the Benefciary with
              whom this Letter of Credit is opened is not on the blacklist, and non-dealing with countries as specifed
              by the regulatory authority. We declare our full responsibility of any deviation from this fact.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>12.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              {' '}
              أقررنا بأن البنك غير مسؤول عن تقديم أية مطالبة إلى شركة التكافل فيما يتعل أقررنا بأننا على علم تام
              بالقوانين الخاصة بالمقاطعة وأن المستفيدين من هذا العتماد والدول التي نصت عليها السلطات التنظيمية غير
              مدرجين في القائمة .السوداء، وتتعهد بتحمل المسؤولية كاملة في حالة مخالفة ذلك
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>13.</Text>
            <Text style={styles.textFont}>
              {' '}
              We hereby authorize the Bank to use the Courier Services whenever required/ available for carrying
              documents to and from the Foreign Correspondent at our risk and responsibility and agree to absolve the
              Bank from any consequences, whatsoever, caused due to any loss, destruction, damage, delay or non-delivery
              of documents by the said Courier Services
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>13.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              {' '}
              أقررنا بأن البنك غير مسؤول عن تقديم أية مطالبة إلى شركة التكافل فيما يتعل أقررنا بأننا على علم تام
              بالقوانين الخاصة بالمقاطعة وأن المستفيدين من هذفؤضنا البنك باستخدام خدمات الشركات الناقلة للبريد حيثما
              وجدت لنقل المستندات من وإلى المراسلين الجانب على مسؤوليتنا وعاتقنا، ووافقنا على إعفاء البنك من أي ضياع أو
              تلف أو عدم تسليم المستندات بواسطة خدمات .الشركة الناقلة للبريد المذكورة
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>14.</Text>
            <Text style={styles.textFont}>
              All the revisions of this Agreement shall apply on all subsequent extensions, increases and modifcations
              to this Letter of Credit and to the drafts, documents and goods covered thereby. and to any action taken
              by the Bank, its Agents or Correspondents in accordance with such extensions, increases or modifcations.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>14.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              {' '}
              أقررنا بأن البنك غير مسؤول عن تقديم أية مطالبة إلى شركة التكافل فيما يتعل أقررنا بأننا على علم تام
              بالقوانين الخاصة بالمقاطعة وأن المستفيدين من هذفؤضنا البنك باستخدام خدمات الشركات الناقلة للبريد حيثما
              وجدت لنق تطبق جميع أحكام هذه التفاقية على جميع التمديدات اللحقة والزيادات والتعديلت على هذا العتماد
              والسندات والمستندات والبضاعة الخاصة به، وعلى أي إجراء يتخذه البنك أو وكلؤه أو مراسلوه وفقاً لهذه التمديدات
              أو .الزيادات أو التعديلت
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>15.</Text>
            <Text style={styles.textFont}>
              {' '}
              We authorize the Bank to buy or sell at their prevailing foreign exchange spot rate the foreign currency
              equal to documents amount to settle documents and/or deferred payment related to this Letter of Credit.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>15.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              {' '}
              فوضنا البنك بأن يشتري أو يبيع لحسابنا، حسب سعر الصرف السائد لديه، قيمة العملة الجنبية اللزمة والمساوية
              لقيمة المستندات لغايات تسديد .قيمة المستندات و/أو الدفعات المؤجلة الخاصة بالعتماد
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>16.</Text>
            <Text style={styles.textFont}>
              The Applicant acknowledges that its address is that one provided at the beginning of this Letter of credit
              and in the Account Opening Form.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5 }}>
            <Text style={styles.arabicText}>16.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 15 }}>
              {' '}
              قر مقدم الطلب أن عنوانه هو العنوان الوارد في مقدمة هذا العتماد، وعلى .نموذج فتح الحساب
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>17.</Text>
            <Text style={styles.textFont}>
              The Applicant is hereby irrevocably bound to the General Terms and Conditions of the Bank.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>17.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              {' '}
              قر مقدم الطلب أن عنوانه هو العنوان الوارد في مقدمة هذا العتماد، وعلالتزم مقدم الطلب بشكل غير قابل للنقض
              بالشروط والحكام العامة للبنك
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>18.</Text>
            <Text style={styles.textFont}>
              . This Letter of Credit shall be governed by Uniform Customs and Practice for Documentary Credits
              Currently in Force Issued by International Chamber of Commerce and/or subsequent amendments thereto
              admissible/applicable during the validity of this Letter of Credit and until it is fully
              Utilized/Expired/Settled not in contradiction to Islamic Sharia rules and principles.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>18.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              يخضع هذا اعتماد للصول والعراف الموحدة في العتمادات المستندية الصادرة عن غرفة التجارة الدولية، السارية
              المفعول، و/أو التعديت اللحقة لها والمقبولة المطبقة خلل فترة سريان هذا العتماد وحتى النتهاء الكامل من
              استخدامه/ صحيته/ تسديده، بما يتعارض مع أحكام الشريعة السلمية .ومبادئها
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', width: '100%', gap: '4%' }}>
          <View style={{ width: '48%', flexDirection: 'row', gap: 5 }}>
            <Text style={styles.textFont}>19.</Text>
            <Text style={styles.textFont}>
              Any dispute arising out of, or in connection with this L/C, shall be referred to the jurisdiction of the
              competent courts in the Sultanate of Oman. and principles.
            </Text>
          </View>
          <View style={{ width: '48%', flexDirection: 'row-reverse', gap: 5, justifyContent: 'flex-end' }}>
            <Text style={styles.arabicText}>18.</Text>
            <Text style={{ ...styles.arabicText, marginRight: 10 }}>
              يحال أي نزاع قد ينشأ بخصوص العتماد المستندي إلى الجهات القضائية .والمحاكم المختصة في سلطنة عُمان
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // marginTop: '30px',
            padding: '5px',
          }}
        >
          <MultiTitleHeader titleEN="For Bank Use Only" titleAR="وعد ملزم للشراء بالمرابحة (الوعد )" />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View
              style={{
                height: 'auto',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
                width: '40%',
              }}
            >
              <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                <View style={[styles.row, { padding: '4px' }]}>
                  <DualLabelField labelEN="Seriousness Cash Margin %" labelAR="الهامش النقدي" value={' '} />
                </View>
              </View>
            </View>

            <View
              style={{
                height: 'auto',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',

                width: '30%',
              }}
            >
              <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                <View style={[styles.row, { padding: '4px' }]}>
                  <DualLabelField labelEN="Swift" labelAR="السويفت" value={' '} />
                </View>
              </View>
            </View>

            <View
              style={{
                height: 'auto',
                fontSize: '10px',
                borderTop: '1px solid #6E2585',
                borderRight: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',

                width: '30%',
              }}
            >
              <View style={[styles.secondRow, { borderBottom: '1px solid #6E2585' }]}>
                <View style={[styles.row, { padding: '4px' }]}>
                  <DualLabelField labelEN="Commission" labelAR="العمولة" value={' '} />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              height: 'auto',
              fontSize: '10px',
              borderLeft: '1px solid #6E2585',
              borderRight: '1px solid #6E2585',
              borderBottom: '1px solid #6E2585',
              width: '100%',
            }}
          >
            <View style={styles.row}>
              <View style={[styles.row, { padding: '4px', width: '50%' }]}>
                <Text style={styles.secondLabel}>Staff Name : </Text>
                <Text style={styles.inputField}></Text>
              </View>

              <View style={[styles.row, { padding: '4px', width: '50%' }]}>
                <Text style={styles.secondLabel}>Signature : </Text>
                <Text style={styles.inputField}></Text>
              </View>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
    </Document>
  );
}
