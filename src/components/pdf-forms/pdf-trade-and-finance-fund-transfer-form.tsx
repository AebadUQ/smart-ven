'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PDFTermsAndCondition } from './sections/pdf-terms-condition';
import DualCheckbox from './ui/dualCheckbox';
import DualLabelField from './ui/dualLabelField';
import MultiTitleHeader from './ui/multiTitleHeader';
import { style } from '@mui/system';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
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
  customRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '100%',
  },
  tickMark: {
    fontSize: 11,
    fontFamily: 'DejaVuSans-Bold',
  },

  customRowAR: {
    flexDirection: 'row-reverse',
    gap: 5,
    alignItems: 'center',
    textAlign: 'right',
    direction: 'rtl',
    width: '100%',
  },

  row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  multiTitleHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6E2585',
  },

  rowFav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    gap: 15,
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
    marginTop: 4,
    color: '#6E2B8C',
    fontSize: 9,
    fontFamily: 'Cairo',
  },

  thirdLabel: {
    marginTop: 4,
    color: '#6E2B8C',
    fontSize: 7,
    fontWeight: 'bold',
    fontFamily: 'Cairo',
  },

  thirdLabelAR: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#6E2B8C',
    fontSize: 7,
    fontFamily: 'Cairo',
    textAlign: 'left',
  },

  secondLabelAR: {
    marginTop: 4,
    color: '#6E2B8C',
    fontSize: 9,
    fontFamily: 'Cairo',
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
  checkboxRowAr: {
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
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#6E2B8C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    // justifyContent: 'center',
  },
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 8,
    direction: 'rtl',
    textAlign: 'right',
    color: '#6E2B8C',
    // fontWeight: 400,
    // marginTop: 4,
  },

  arabicLabel: {
    fontFamily: 'Cairo',
    textAlign: 'right',
    direction: 'rtl',
    // marginTop: 4,
    color: '#6E2B8C',
    fontSize: 9,
  },
});
export interface InvoicePDFDocumentProps {
  data: any;
}
const termsConditionData = {
  title: 'Terms and Conditions for Demand Draft/Telegraphic Transfers :',
  list: [
    {
      title: '',
      description: [
        {
          isClosure: true,
          text: 'I/We declare that all information provided to the Bank are true and accurate.',
        },
        {
          isClosure: true,
          text: 'I/We agree that this transfer shall be undertaken according and subject to the Bank’s applicable policies and regulations.',
        },
        {
          isClosure: true,
          text: 'Knowing that the Bank will exercise reasonable care for effecting transfer using the most reliable means available, the transfer remains entirely at my risk especially in case of delay, loss, error, mutilation, mistake in the transfer and communication by your correspondents and agents.',
        },
        {
          isClosure: true,
          text: 'Charges and Commissions:',
          subClause: [
            {
              text: 'The Bank will debit the charges and commissions to the customer’s account for the processing of the remittance application/demand draft issuance as per the published schedule charge guide. The charges may be revised from time to time at the discretion of the Bank.',
            },
            {
              text: 'In the absence of any specific instructions all charges/commission outside Oman are on the beneficiary’s account.',
            },
            {
              text: 'A Correspondent Bank may charge commission, fees or other charges in making the payments to the beneficiary account. The correspondent Bank will either deduct those commission, fees or charges from the fund paid to the beneficiary account or pass them on to the sender bank (Smart Ven).',
            },
          ],
        },
        {
          isClosure: true,
          text: 'Unless I/We issue different instruction, the transfer will be effective in the currency of the jurisdiction of the destination and subject to related cutoff times or any other regulations applicable in that jurisdiction.',
        },
        {
          isClosure: true,
          text: 'This Demand Draft is the sole property of the Bank and normally is valid for a maximum period of 6 months. The Purchaser should not amend or alter it. It should be duly validated by the Bank.',
        },
        {
          isClosure: true,
          text: 'The Demand Draft should be handled safely and in case of loss of the draft, the purchaser should immediately inform the Bank. Refund will be considered only after confirmation of the stop payment instruction received from the Drawee Bank.',
        },
        {
          isClosure: true,
          text: 'I/We indemnify the Bank and the Bank is not liable for immediate refund if the Draft is lost or stolen and the Bank and it’s Correspondent are not liable for any fraudulent encashment. It is further understood that the Bank chooses its Correspondent at my/our risk and responsibility. I/We also declare that the issuing Bank shall not be liable for any compensation in respect of delay in encashment of the Draft by Drawee Bank including those caused by the variations of signature or missing drawing advices.',
        },
        {
          isClosure: true,
          text: 'The Bank may decline to make the payment it believes might involve a breach by any person of a law or regulation of any country. A payment may be delayed or declined because the person involved in the payment or an authority requires information or clarification as to compliance with the law or regulations, or declines to process it. The Bank will share information about your remittance as necessary.',
        },
        {
          isClosure: true,
          text: 'The Bank will use reasonable endeavours to process application received by the Bank before the specified cut-off time notified by receiving branches or centres from time to time. Applications received after such cut-off time will be processed on the next working day. For this purpose all the Bank holidays, Fridays and Saturdays are non-working days. In case of the payment date falling on a Bank holiday or Friday and Saturday, the Bank will effect the payment on the next working day.',
        },
        {
          isClosure: true,
          text: 'I/We agree to provide any additional details or clarifications that might be required by the bank or the correspondent bank to process the request.',
        },
        {
          isClosure: true,
          text: 'Transfers are undertaken entirely as per the instructions given by the customer, and the bank, correspondents, or agents accept no responsibility for any loss arising due to instructions issued by the customer.',
        },
        {
          isClosure: true,
          text: 'The bank is not responsible for any amount loss or delay caused due to regulatory or statutory requirements or intermediary banks.',
        },
        {
          isClosure: true,
          text: 'In certain transactions, the bank may contact the customer to confirm remittance details. If the customer fails to respond satisfactorily, the bank or the beneficiary Bank reserves the right to hold the transaction until the customer validates these details.',
        },
        {
          isClosure: true,
          text: 'The bank reserves the right to effect the transfer through a correspondent bank if operational circumstances demand.',
        },
      ],
    },
  ],
};

const termsConditionDataAr = {
  title: 'الشروط والأحكام الخاصة بالحوالات البنكية / الشيكات المصرفية:',
  list: [
    {
      title: '',
      description: [
        {
          isClosure: true,
          text: 'أقر/نقرّ بأن جميع المعلومات المقدمة إلى البنك دقيقة وصحيحة.',
        },
        {
          isClosure: true,
          text: 'أوافق/نوافق على تنفيذ الحوالة وفقًا لأنظمة ولوائح البنك.',
        },
        {
          isClosure: true,
          text:
           'في حال حدوث أي تأخير أو فقدان أو خطأ من قبل البنوك المراسلة أو وكلائكم، أتحمل/نتحمل كامل المخاطر المرتبطة، علمًا بأن البنك يتخذ كافة إجراءات الحيطة والحذر اللازمة باستخدام أفضل الوسائل الآمنة المتاحة.',
        },
        {
          isClosure: true,
          text: 'الرسوم والعمولات:',
          subClause: [
            {
              text: 'سيقوم البنك بخصم الرسوم والعمولات من حساب العميل لمعالجة طلب الحوالة/إصدار الشيك المصرفي وفقًا لدليل جدول الرسوم المنشور، والذي يمكن تعديله من وقت لآخر حسب رغبة البنك.',
            },
            {
              text: 'في حال عدم وجود تعليمات محددة، تكون جميع الرسوم والعمولات خارج سلطنة عمان على حساب المستفيد.',
            },
            {
              text: 'يجوز للبنك المراسل فرض عمولات أو رسوم أخرى عند الدفع إلى حساب المستفيد. يقوم البنك المراسل إما بخصم هذه العمولات/الرسوم من المبلغ المدفوع أو تمريرها إلى البنك المرسل (بنك نزوى).',
            },
          ],
        },
        {
          isClosure: true,
          text: 'ما لم يتم إصدار تعليمات مغايرة، يتم تنفيذ الحوالة بعملة الدولة المُستقبِلة ووفقًا لأوقات العمل والأنظمة المطبقة هناك.',
        },
        {
          isClosure: true,
          text: 'إن ملكية الشيك المصرفي تعود للبنك فقط وصلاحيته سارية لمدة ستة أشهر، ولا يجوز لحامله تعديله أو تغييره إلا بموجب توثيق من البنك.',
        },
        {
          isClosure: true,
          text: 'يجب التعامل مع الشيك المصرفي بطريقة سليمة وآمنة، وفي حال فقدانه أو سرقته، يجب على المشتري إبلاغ البنك فورًا. ولن يتم النظر في استرداد قيمته إلا بعد التأكد من استلام البنك المسحوب عليه أمرًا بإيقاف صرفه.',
        },
        {
          isClosure: true,
          text: 'أعفي/نعفي البنك من أي مسؤولية أو التزام في حال ضياع أو سرقة الشيك، ولن يكون البنك أو مراسلوه مسؤولين عن أي صرف احتيالي للشيك. أتحمل/نتحمل كافة المخاطر المتعلقة باختيار البنك ومراسليه. كما أقر/نقر بأن البنك المصدر لن يكون مسؤولًا عن أي تعويض نتيجة تأخير صرف الشيك من قبل البنك المسحوب عليه، بما في ذلك التأخير الناتج عن التحقق من صحة التوقيعات أو فقدان إشعارات السحب.',
        },
        {
          isClosure: true,
          text: 'للبنك الحق في رفض دفع أي مبلغ لأي شخص قد يخالف القوانين أو الأنظمة في أي دولة. وقد يتأخر أو يُرفض الدفع إذا طلبت أي جهة معلومات أو توضيحات إضافية. يحق للبنك مشاركة معلومات الحوالة عند الحاجة.',
        },
        {
          isClosure: true,
          text: 'سيقوم البنك بتنفيذ المعاملات المستلمة قبل الوقت المحدد في الفروع أو المراكز. المعاملات المستلمة بعد ذلك سيتم تنفيذها في يوم العمل التالي. تُعتبر أيام الجمعة والسبت والعطل الرسمية أيامًا غير عاملة.',
        },
        {
          isClosure: true,
          text: 'أوافق/نوافق على تقديم أي تفاصيل أو توضيحات إضافية قد يطلبها البنك أو البنك المراسل لمعالجة الطلب.',
        },
        {
          isClosure: true,
          text: 'يتم تنفيذ الحوالات بالكامل وفقًا لتعليمات العميل، ولا يتحمل البنك أو المراسلون أو الوكلاء أي مسؤولية عن أي خسارة ناتجة عن تلك التعليمات.',
        },
        {
          isClosure: true,
          text: 'لا يتحمل البنك أي مسؤولية عن فقدان أو تأخير المبلغ الناتج عن متطلبات تنظيمية أو قانونية أو بسبب بنوك وسيطة.',
        },
        {
          isClosure: true,
          text: 'في بعض المعاملات، قد يتواصل البنك مع العميل لتأكيد تفاصيل الحوالة. وإذا لم يقدم العميل ردًا كافيًا، يحتفظ البنك أو البنك المستفيد بالحق في حجز المعاملة حتى يتم التأكيد.',
        },
        {
          isClosure: true,
          text: 'يحتفظ البنك بالحق في تنفيذ الحوالة عبر بنك مراسل إذا تطلبت الظروف التشغيلية ذلك.',
        },
      ],
    },
  ],
};

export function TradeFinanceFundTransferForm({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row'}}>
            <CustomDate date={formatedDate} />
          </View>
          <View style={styles.row}>
            <View style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
              <Text style={[styles.label, { fontSize: 9 }]}>Type of Remittance</Text>
              <CheckBoxComp label={formdetails?.tfFundTranferTypeOfRemittance?.value} val={formdetails?.tfFundTranferTypeOfRemittance?.value}/>

              {/* <View style={styles.customRow}> */}
              {/* <View style={styles.column}> */}
              {/* <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.secondLabel}>Demand Draft</Text>
                  </View> */}

              {/* <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.secondLabel}>Telegraphic Transfer</Text>
                  </View> */}
              {/* </View> */}

              {/* <View style={styles.column}>
                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.secondLabel}>Internal Transfer</Text>
                  </View>

                  <View style={styles.checkboxRow}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.secondLabel}>Pay Order</Text>
                  </View>
                </View> */}
              {/* </View> */}
              {/* <View style={[styles.label, { flexDirection: 'column', gap: 4}]}> */}
              <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
                Note: Please complete in Block letters and sign in the appropriate space.
              </Text>
              {/* </View> */}
            </View>

            <View style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
              <Text style={[styles.arabicLabel, { fontSize: 9 }]}> نوع المستفيد:</Text>
              <CheckBoxComp direction={'rtl'} label={formdetails?.tfFundTranferTypeOfRemittance?.value} val={formdetails?.tfFundTranferTypeOfRemittance?.value}/>

              {/* <View style={[styles.customRow, { flexDirection: 'row-reverse' }]}>
                <View style={styles.column}>
                  <View style={styles.checkboxRowAr}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.arabicLabel}>حوالة عند الطلب</Text>
                  </View>

                  <View style={styles.checkboxRowAr}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.arabicLabel}>تحويل داخلي</Text>
                  </View>
                </View>

                <View style={styles.column}>
                  <View style={styles.checkboxRowAr}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.arabicLabel}>تحويل مصرفي</Text>
                  </View>

                  <View style={styles.checkboxRowAr}>
                    <View style={styles.checkbox}></View>
                    <Text style={styles.arabicLabel}>أمر دفع</Text>
                  </View>
                </View>
              </View> */}
              {/* <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}> */}
              <Text style={[styles.arabicLabel, { color: '#6E2B8C', fontSize: 7 }]}>
                مالحظة: الرجاء تعبئة هذا الطلب بخط واضح والتوقيع في الفراغ المخصص لذلك.
              </Text>
              {/* </View> */}
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <MultiTitleHeader titleEN="PAYMENT & BENEFICIARY DETAILS" titleAR="بيانات الدفعات والمستفيد" />
            <DualLabelField
              labelEN="Currency"
              labelAR="العملة"
              value={formdetails?.tfPaymentBenificiaryCurrency?.value || 'N/A'}
            />
            <DualLabelField
              labelEN="Amount in Figures"
              labelAR="المبلغ باألرقام"
              value={formdetails?.tfPaymentBenificiaryAmountFigures || 'N/A'}
            />
            <DualLabelField
              labelEN="Amount in Words"
              labelAR="المبلغ بالحروف"
              value={formdetails?.tfPaymentBenificiaryAmountWords || 'N/A'}
            />

            <DualLabelField
              labelEN="Beneficiary Account No./IBAN"
              labelAR="رقم حساب المستفيد/ أيبان"
              value={formdetails?.tfPaymentBenificiaryAccNoOrIBAN || 'N/A'}
            />
            <DualLabelField
              labelEN="Beneficiary Name"
              labelAR="اسم المستفيد"
              value={formdetails?.tfPaymentBenificiaryName || 'N/A'}
            />
            <DualLabelField
              labelEN="Beneficiary Bank"
              labelAR="بنك المستفيد"
              value={formdetails?.tfPaymentBenificiaryBank || 'N/A'}
            />
            <DualLabelField
              labelEN="Swift Code/Sort Code/ABA #"
              labelAR="رمز سويفت / رمز التصنيف / ABA #"
              value={formdetails?.tfPaymentBenificiarySwiftCode || 'N/A'}
            />
            <DualLabelField
              labelEN="Address of Bank"
              labelAR="عنوان البنك"
              value={formdetails?.tfPaymentBenificiarAddressBank || 'N/A'}
            />
            <DualLabelField
              labelEN="Correspondent Bank"
              labelAR="البنك المراسل"
              value={formdetails?.tfPaymentBenificiarCorrespondentBank || 'N/A'}
            />
            <DualLabelField
              labelEN="Swift Code/Sort Code/ABA #"
              labelAR="رمز سويفت / رمز التصنيف / ABA #"
              value={formdetails?.tfPaymentBenificiaryCorrespondentSwiftCode || 'N/A'}
            />
          </View>
          <View style={[styles.customRow, { gap: '40px', marginTop: '15px' }]}>
            <DualCheckbox
              labelEN="Credit Card Payments"
              labelAR="دفعات بطاقة الائتمان"
              isChecked={formdetails?.tfPaymentBenificiaryOptions?.tfCreditCardPaymentCheck}
            />
            <DualCheckbox
              labelEN="Charitable Contributions"
              labelAR="تبرعات خيرية"
              isChecked={formdetails?.tfPaymentBenificiaryOptions?.tfCharitableContributionsCheck}
            />
            <DualCheckbox
              labelEN="Remittance"
              labelAR="تحويل"
              isChecked={formdetails?.tfPaymentBenificiaryOptions?.tfRemittanceCheck}
            />
            <DualCheckbox
              labelEN="Cross Border Payments"
              labelAR="دفعات عبر الحدود"
              isChecked={formdetails?.tfPaymentBenificiaryOptions?.tfCrossBorderCheck}
            />
          </View>
          <View style={[styles.customRow, { gap: '40px', marginTop: '15px' }]}>
            <DualCheckbox
              labelEN="Miscellaneous Payment with Invoice Details"
              labelAR="دفعات متنوعة مع تفاصيل الفواتير"
              isChecked={formdetails?.tfPaymentBenificiaryOptions?.tfMiscellaneousPaymenWithInvoieCheck}
            />
            <DualCheckbox
              labelEN="Miscellaneous Payment with Beneficiary Customer Reference"
              labelAR="دفعات متنوعة مع مرجع العميل المستفيد"
              isChecked={formdetails?.tfPaymentBenificiaryOptions?.tfMiscellaneousPaymenWithBeneCustRefCheck}
            />
            <DualCheckbox
              labelEN="Miscellaneous Payment with Ordering Customer Reference"
              labelAR="دفعات متنوعة مع مرجع العميل مصدر الطلب"
              isChecked={formdetails?.tfPaymentBenificiaryOptions?.tfMiscellaneousPaymenWithOrderCustRefCheck}
            />
          </View>
          <DualLabelField
            labelEN="Details of Payment"
            labelAR="تفاصيل السداد"
            value={formdetails?.tfPaymentBenificiaryPaymentDetail}
          />
          <View style={[styles.customRow, { justifyContent: 'space-between', marginTop:10 }]}>
            <View style={[styles.customRow, { gap: '10px', width: '50%' }]}>
              <Text style={[styles?.secondLabel, { width: '150px' }]}>Remittance Charges Borne by</Text>

              <View style={[styles.customRow, { width: '100%', justifyContent: 'center' }]}>
                <View style={styles.checkboxRow}>
                  <View
                    style={[
                      styles.checkbox,
                      // { backgroundColor: formdetails?.tfRemittanceChargesBorneBy?.id === 292 ? '#6E2B8C' : '' },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesBorneBy?.id === 292 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.secondLabel}>Remitter</Text>
                </View>

                <View style={styles.checkboxRow}>
                  <View
                    style={[
                      styles.checkbox,
                      // { backgroundColor: formdetails?.tfRemittanceChargesBorneBy?.id === 293 ? '#6E2B8C' : '' },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesBorneBy?.id === 293 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.secondLabel}>Beneficiary</Text>
                </View>
              </View>
            </View>

            <View style={[styles.customRowAR, { gap: '10px', width: '50%' }]}>
              <Text style={[styles?.secondLabelAR, { width: '150px' }]}>تحميل رسوم التحويل على</Text>

              <View style={[styles.customRowAR, { width: '100%', justifyContent: 'center' }]}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.secondLabel}>المحول</Text>
                  <View
                    style={[
                      styles.checkbox,
                      // { backgroundColor: formdetails?.tfRemittanceChargesBorneBy?.id === 292 ? '#6E2B8C' : '' },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesBorneBy?.id === 292 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.checkboxRow}>
                  <Text style={styles.secondLabel}>المستفيد</Text>
                  <View
                    style={[
                      styles.checkbox,
                      // { backgroundColor: formdetails?.tfRemittanceChargesBorneBy?.id === 293 ? '#6E2B8C' : '' },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesBorneBy?.id === 293 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.customRow, { justifyContent: 'space-between' }]}>
            <View style={[styles.customRow, { gap: '10px', width: '50%' }]}>
              <Text style={[styles?.secondLabel, { width: '150px' }]}>Correspondent Bank Charges Borne by</Text>

              <View style={[styles.customRow, { width: '100%', justifyContent: 'center' }]}>
                <View style={styles.checkboxRow}>
                  <View
                    style={[
                      styles.checkbox,
                      // { backgroundColor: formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 292 ? '#6E2B8C' : '' },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 292 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.secondLabel}>Remitter</Text>
                </View>

                <View style={styles.checkboxRow}>
                  <View
                    style={[
                      styles.checkbox,
                      // { backgroundColor: formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 293 ? '#6E2B8C' : '' },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 293 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.secondLabel}>Beneficiary</Text>
                </View>
              </View>
            </View>

            <View style={[styles.customRowAR, { gap: '10px', width: '50%' }]}>
              <Text style={[styles?.secondLabelAR, { width: '150px' }]}>رسوم البنك المراسل على</Text>

              <View style={[styles.customRowAR, { width: '100%', justifyContent: 'center' }]}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.secondLabel}>المحول</Text>
                  <View
                    style={[
                      styles.checkbox,
                      {
                        // backgroundColor:
                        // formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 292 ? '#6E2B8C' : '',
                      },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 292 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.checkboxRow}>
                  <Text style={styles.secondLabel}>المستفيد</Text>
                  <View
                    style={[
                      styles.checkbox,
                      // {
                      //   backgroundColor:
                      //     formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 293 ? '#6E2B8C' : '',
                      // },
                    ]}
                  >
                    {' '}
                    {formdetails?.tfRemittanceChargesCorrespondentBankCharges?.id === 293 ? (
                      <Text style={styles.tickMark}>{'\u2713'}</Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: '3px' }}>
            <MultiTitleHeader titleEN="MODE OF PAYMENT" titleAR="طريقة السداد" />

            <View style={[styles.customRow, { justifyContent: 'space-between' }]}>
              <View style={styles.checkboxRow}>
                {/* <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                <Text style={styles.secondLabel}>Debit My Account Number</Text> */}
                <CheckBoxComp label="Debit My Account Number" val={formdetails?.tfModeOfPaymentDebitMyAccNum} />
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                {formdetails?.tfModeOfPaymentDebitMyAccNum?.split('')?.map((item: any, index: any) => {
                  const extraMargin = index === 2 || index === 10 || index === 11 || index === 15 ? 10 : 2;
                  return (
                    <View
                      key={index}
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

              <View style={styles.checkboxRowAr}>
                <CheckBoxComp
                  direction={'rtl'}
                  label="حسم من حساب رقم"
                  val={formdetails?.tfModeOfPaymentDebitMyAccNum}
                />
                {/* <View style={[styles.checkbox, { backgroundColor: '#6E2B8C' }]}></View>
                <Text style={styles.arabicLabel}>حسم من حساب رقم</Text> */}
              </View>
            </View>

            <View style={{ flexDirection: 'column', gap: '0px' }}>
              {/* <DualLabelField
                labelEN="Customer Name"
                labelAR="اسم العميل"
                value={formdetails?.tfPaymentBenificiaryName}
              /> */}
              <DualLabelField
                labelEN="Applicant 1 Contact No"
                labelAR="رقم هاتف مقدم الطلب"
                value={
                  formdetails?.tfModeOfPaymentApplicantContactNo1 ||
                  // formdetails?.tfModeOfPaymentApplicantContactNo2 ||
                  'N/A'
                }
              />
              <DualLabelField
                labelEN="Applicant 2 Contact No"
                labelAR="رقم هاتف مقدم الطلب"
                value={
                  // formdetails?.tfModeOfPaymentApplicantContactNo1 ||
                  formdetails?.tfModeOfPaymentApplicantContactNo2 ||
                  'N/A'
                }
              />

              <Text style={[styles.thirdLabelAR, { width: '100%', textAlign: 'center' }]}>
                تخضع التعاملات للشروط والأحكام العامة لبنك نزوى وتلك المبينة على خلف هذا الطلب والتي قرأتها ووافقت عليها
              </Text>

              <Text style={[styles.thirdLabel, { width: '100%', textAlign: 'center' }]}>
                TRANSACTIONS ARE GOVERNED BY Smart Ven’S GENERAL TERMS AND CONDITIONS, AND THOSE STATED ON THE BACK OF
                THIS APPLICATION WHICH I HAVE READ AND AGREED TO.
              </Text>
              <DualLabelField labelEN="Authorised Signature" labelAR="التوقيع المعتمد" value="" />
            </View>
          </View>{' '}
        </View>

        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={[styles.row]}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '50%',
              backgroundColor: '#FFFACD',
              padding: '5px',
              gap: 5,
            }}
          >
            <Text style={{ fontWeight: 'ultrabold', fontSize: 10, color: '#56004E', width: '100%' }}>
              FOR BANK USE ONLY
            </Text>

            <View style={styles.column}>
              <View>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View
                      style={{
                        height: 'auto',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        borderLeft: '1px solid #6E2585',
                        width: '50%',
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                                fontFamily: 'Cairo',
                              }}
                            >
                              Local CCY Amount/ المبلغ بالعملة المحلية
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                                fontFamily: 'Cairo',
                              }}
                            >
                              Rate/ سعر التحويل
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                                fontFamily: 'Cairo',
                              }}
                            >
                              Commission/ العمولة
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
                        width: '25%',
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 8,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
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
                        width: '25%',
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 8,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.customRow}>
                <DualLabelField labelEN="Bank Staff Name" labelAR="اسم موظف البنك" value="" />
              </View>

              <View style={styles.customRow}>
                <DualLabelField labelEN="Signature of Bank Staff" labelAR="توقيع موظف البنك" value="" />
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '50%',
              backgroundColor: '#FFFACD',
              padding: '5px',
              gap: 5,
            }}
          >
            <Text
              style={{
                fontWeight: 'ultrabold',
                fontSize: 10,
                color: '#56004E',
                width: '100%',
                fontFamily: 'Cairo',
                textAlign: 'right',
              }}
            >
              لاستخدام البنك فقط
            </Text>

            <View style={styles.column}>
              <View>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View
                      style={{
                        height: 'auto',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        borderLeft: '1px solid #6E2585',
                        width: '50%',
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                                fontFamily: 'Cairo',
                              }}
                            >
                              Post/Cable/ بريد/برقي
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                                fontFamily: 'Cairo',
                              }}
                            >
                              Other/ أخرى
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                                fontFamily: 'Cairo',
                              }}
                            >
                              Total/ الإجمالي
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
                        width: '25%',
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 8,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
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
                        width: '25%',
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 8,
                              }}
                            ></Text>
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
                            <Text
                              style={{
                                marginTop: 4,
                                fontWeight: 'extrabold',
                                color: '#6E2B8C',
                                fontSize: 9,
                              }}
                            ></Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.customRow}>
                <DualLabelField labelEN="Reference No" labelAR="اسم موظف البنك" value="" />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop:5}}>

                  <MultiTitleHeader titleEN={"Terms And Condirtion"} titleAR=' '/>
        </View>


        <View style={[styles.row, { marginTop:5,gap:"5%" }]}>
          <View
            style={{
              width: '47.5%',
              gap:3
            }}
          >
            {/* <PDFTermsAndCondition data={termsConditionData} /> */}
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>1.</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                I/We declare that all information provided to the Bank are true and accurate.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>2.</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                I/We agree that this transfer shall be undertaken according and subject to the Bank’s applicable
                policies and regulations.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>3.</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                Knowing that the Bank will exercise reasonable care for efecting transfer using the most reliable means
                available, the transfer remains entirely at my risk especially in case of delay, loss, error,
                mutilation, mistake in the transfer and communication by your correspondents and agents.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5}}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>4.</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>Charges and Commissions:</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, marginLeft: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>4.1</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                {' '}
                The Bank will debit the charges and commissions to the customer’s account for the processing of the
                remittance application/demand draft issuance as per the published schedule charge guide. The charges may
                be revised from time to time at the discretion of the Bank
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginLeft: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>4.2</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                In the absence of any specifc instructions all charges/commission outside Oman are on the benefciary’s
                account.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>4.3</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                A Correspondent Bank may charge commission, fees or other charges in making the payments to the
                benefciary account. The correspondent Bank will either deduct those commission, fees or charges from the
                fund paid to the benefciary account or pass them on to the sender bank (Smart Ven).
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>5</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                {' '}
                Unless I/We issue diferent instruction, the transfer will be efective in the currency of the
                jurisdiction of the destination and subject to related cutof times or any other regulations applicable
                in that jurisdiction bank (Smart Ven).
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, marginLeft: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>6</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                This Demand Draft is the sole property of the Bank and normally is valid for a maximum period of 6
                months. The Purchaser should not amend or alter it. It should be duly validated by the Bank bank (Bank
                Nizwa).
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, marginLeft: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>7</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                The Demand Draft should be handled safely and in case of loss of the draft, the purchaser should
                immediately inform the Bank. Refund will be considered only after confrmation of the stop payment
                instruction received from the Drawee Bank. bank (Smart Ven).
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>8</Text>
              <Text style={{ fontSize: 8, color: '#6E2585' }}>
                I/We indemnify the Bank and the Bank is not liable for immediate refund if the Draft is lost or stolen
                and the Bank and it’s Correspondent are not liable for any fraudulent encashment. It is further
                understood that the Bank chooses its Correspondent at my/our risk and responsibility. I/We also declare
                that the issuing Bank shall not be liable for any compensation in respect of delay in encashment of the
                Draft by Drawee Bank including those caused by the variations of signature or missing drawing advices.
                from the Drawee Bank. bank (Smart Ven).
              </Text>
            </View>


          </View>


           <View
                            style={{
                              width: '47.5%',
                              flexDirection:'column'
                              ,alignItems:'flex-end',
                              // gap:5
                            }}
                          >
                            {/* <PDFTermsAndCondition data={termsConditionData} /> */}
                            <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-start' }}>
                              <Text style={{...styles.arabicText }}>1.</Text>
                              <Text style={{...styles.arabicText }}>
                                 أصرح/نصرح بأن المعلومات التي قدمتها إلى البنك جميعها دقيقة وصحيحة.
                ً لنظام البنك ولوائحه المعمول بها
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                              <Text style={styles.arabicText}>2.</Text>
                              <Text style={styles.arabicText}>
                               ً  أوافق/نوافق بأن يتم التحويل وفق
                لنظام البنك ولوائحه المعمول بها

                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5,marginTop:7 }}>
                              <Text style={styles.arabicText}>3.</Text>
                              <Text style={styles.arabicText}>
                                           'في حال حدوث أي تأخير أو فقدان أو خطأ من قبل البنوك المراسلة أو وكلائكم، أتحمل/نتحمل كامل المخاطر المرتبطة، علمًا بأن البنك يتخذ كافة إجراءات الحيطة والحذر اللازمة باستخدام أفضل الوسائل الآمنة المتاحة.',

                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5 ,marginTop:11}}>
                              <Text style={styles.arabicText}>4.</Text>
                              <Text style={styles.arabicText}>الرسوم والعموالت:</Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5,marginLeft: 5,marginTop:9 }}>
                              <Text style={styles.arabicText}>4.1</Text>
                              <Text style={styles.arabicText}>
                                {' '}
                                سوف يحسم البنك الرسوم والعموالت من حساب العميل إلتمام طلب الحوالة/
                الشيك المصرفي وفقا لدليل جدول الرسوم والذي يمكن تعديله من وقت إلى آخر
                حسب رغبة البنك.
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5, marginLeft: 5,marginTop:9 }}>
                              <Text style={styles.arabicText}>4.2</Text>
                              <Text style={styles.arabicText}>
                                 في حالة غياب اية تعليمات محددة، جميع الرسوم والعموالت خارج سلطنة عمان
                سوف تكون على حساب المستفيد
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5,marginTop:6 }}>
                              <Text style={styles.arabicText}>4.3</Text>
                              <Text style={styles.arabicText}>
                                . يجوز للبنك المراسل أن يفرض عمولة/ رسوم
                حساب المستفيد. البنك المراسل سوف يقوم بحسم هذه العموالت/الرسوم
                من المبالغ المدفوعة إلى حساب المستفيد أو يقوم بتمريرها الى البنك المرسل
                )بنك نزوى(.

                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5 ,marginTop:11}}>
                              <Text style={styles.arabicText}>5</Text>
                              <Text style={styles.arabicText}>
                                التحويل سيكون بالعملة السارية في السلطة القضائية للمرسل إليه وبموجب أوقات
                العمل واألنظمة المطبقة هناك، إال إذا تم إصدار تعليمات بخالف ذلك.
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5, marginLeft: 5,marginTop:25}}>
                              <Text style={styles.arabicText}>6.</Text>
                              <Text style={styles.arabicText}>
                                إن ملكية الشيك المصرفي تعود للبنك وحده وستكون صالحيته سارية لمدة ستة أشهر
                وال يمكن لحامله تعديله أو تغييره إال بموجب توثيق من البنك.
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5, marginLeft: 5,marginTop:15 }}>
                              <Text style={styles.arabicText}>7</Text>
                              <Text style={styles.arabicText}>
                                .7 إن التعامل بهذا الشيك المصرفي يجب أن يتم بطريقة سليمة وآمنة وفي حالة فقدانه
                ً ولن ينظر في أمر رد قيمة الشيك إال بعد
                أو سرقته، يجب على المشتري إبالغ البنك فور
                ً بإيقاف صرفه.

                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5,marginTop:15 }}>
                              <Text style={styles.arabicText}>8</Text>
                              <Text style={styles.arabicText}>
                                في حالة ضياع الشيك المصرفي أو سرقته فإني أعفي/فإننا نعفي البنك من أي
                مسؤولية أو التزام، وإن البنك لن يكون مسؤوال عن رد قيمة الشيك على الفور كما وأن
                البنك ومراسليه لن يكونوا مسؤولين عن أي مبلغ يتم صرفه للشيك عن طريق االحتيال،
                وأني أتحمل/أننا نتحمل المخاطر المتعلقة باختيار البنك ومراسليه. كما أقر/نقر بأن البنك
                ً عن أي تعويض بسبب التأخير في صرف الشيك بواسطة البنك
                المصدر لن يكون مسؤو
                المسحوب عليه حتى لو كان التأخير بسبب التأكد من صحة التوقيعات أو فقدان إشعارات
                السحب.
                              </Text>
                            </View>


                          </View>
        </View>
      </Page>
       <Page size="A4" style={styles.page}>

                    <View style={[styles.row, { gap:"5%" ,width:"100%"}]}>

                      <View
                        style={{
                          width: '47.5%',
                        }}
                      >
                        <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
                          <Text style={{ fontSize: 8, color: '#6E2585' }}>9</Text>
                          <Text style={{ fontSize: 8, color: '#6E2585' }}>
                            The Bank may decline to make the payment it believes might involve a breach by any person of a law or
                            regulation of any country. A payment may be delayed or declined because the person involved in the
                            payment or an authority requires information or clarifcation as to compliance with the law or
                            regulations, or declines to process it. The Bank will share information about your remittance as
                            necessary
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
                          <Text style={{ fontSize: 8, color: '#6E2585' }}>10</Text>
                          <Text style={{ fontSize: 8, color: '#6E2585' }}>
                            The Bank will use reasonable endeavours to process application received by the Bank before the specifed
                            cut-of time notifed by receiving branches or centres from time to time. Applications received after such
                            cut-of time will be processed on the next working day. For this purpose all the Bank holidays, Fridays
                            and Saturdays are non-working days. In case of the payment date falling on a Bank holiday or Friday and
                            Saturday, the Bank will efect the payment on the next working day.
                          </Text>
                        </View>
                         <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
                        <Text style={styles.textFont}>11</Text>
                        <Text style={styles.textFont}>
            I \ We agree to provide any additional details or clarifications that might be
            required by the bank or the correspondent bank to process the request.            </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
                        <Text style={styles.textFont}>12</Text>
                        <Text style={styles.textFont}>
            Transfers are undertaken entirely as per the instructions given by the
            customer, and the bank, correspondents, or agents accept no responsibility
            for any loss arising due to instructions issued by the customer

                        </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row', gap: 5, marginLeft: 5 }}>
                        <Text style={styles.textFont}>13</Text>
                        <Text style={styles.textFont}>
            The bank is not responsible for any amount loss or delay caused due to
            regulatory or statutory requirements or intermediary banks.
                        </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row', gap: 5,  marginLeft: 5 }}>
                        <Text style={styles.textFont}>14</Text>
                        <Text style={styles.textFont}>
                          In certain transactions, the bank may contact the customer to confirm
            remittance details. If the customer fails to respond satisfactorily, the bank
            or the beneficiary Bank reserves the right to hold the transaction until the
            customer validates these details.

                        </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginLeft: 5 }}>
                        <Text style={styles.textFont}>15</Text>
                        <Text style={styles.textFont}>
            The bank reserves the right to effect the transfer through a correspondent
            bank if operational circumstances demand.            </Text>
                      </View>
                      </View>
                      <View
                        style={{
                          width: '47.5%',
                          flexDirection:'column'
                          ,alignItems:'flex-end',
                          gap:10
                        }}
                      >
                        <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5 }}>
                                      <Text style={styles.arabicText}>9</Text>
                                      <Text style={styles.arabicText}>
                                        يحق للبنك أن يرفض دفع أي مبلغ ألي شخص يحتمل مخالفته للقانون أو األنظمة
                        المتبعة في أي دولة وقد يتأخر أو يرفض البنك الدفع ألن الشخص أو أي هيئة معنية
                        تطلب معلومات وتوضيحات أخرى طبقا للقانون واألنظمة المتبعة أو أن ترفضها. للبنك
                        أن يتباحث مع جهات أخرى بخصوص الحوالة المالية حسب الحاجة.
                                      </Text>
                                    </View>
                         <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5 }}>
                          <Text style={styles.arabicText}>10</Text>
                          <Text style={styles.arabicText}>
                            سيتخذ البنك من وقت آلخر اإلجراءات المناسبة لتنفيذ المعامالت التي يستلمها قبل
            انتهاء الوقت المحدد للفروع أو المراكز. المعامالت المستلمة بعد انتهاء الوقت المحدد
            سوف يتم تنفيذها في يوم العمل التالي مع العلم أن جميع عطالت البنك وأيام
            الجمعة والسبت ليست أيام عمل. وفي حالة إذا وقع تاريخ المعاملة في يوم عطلة
            للبنك أو يوم جمعة أو سبت، فإن البنك سيقوم بإجراء المعاملة في يوم العمل التالي.
                          </Text>
                        </View>
                         <View style={{ flexDirection: 'row-reverse', gap: 5, marginLeft: 5 }}>
                        <Text style={styles.arabicText}>11</Text>
                        <Text style={styles.arabicText}>
                          يلتزم العميل بتقديم أي تفاصيل أو توضيحات إضافية قد يطلبها البنك أو البنك المراسل
            لمعالجة الطلب.
                        </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row-reverse', gap: 5, marginLeft: 5 }}>
                        <Text style={styles.arabicText}>12</Text>
                        <Text style={styles.arabicText}>

            ً ا للتعليمات المقدمة من العميل، وال يتحمل البنك أو
            . تنفيذ التحويالت بالكامل وف
            المراسلون أو الوكالء أي مسؤولية عن أي خسارة تنتج عن تعليمات صادرة من العميل.

                        </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5 }}>
                        <Text style={styles.arabicText}>13</Text>
                        <Text style={styles.arabicText}>
                          البنك ال يتحمل أي مسؤولية عن فقدان المبلغ أو تأخيره بسبب متطلبات تنظيمية أو
            قانونية أو بسبب أطراف ثالثة مثل البنوك الوسيطة.

                        </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5 }}>
                        <Text style={styles.arabicText}>14</Text>
                        <Text style={styles.arabicText}>
                          في معامالت معينه، قد يتواصل البنك مع الزبون بغرض التأكد من تفاصيل التحويل. إذا لم
            يقدم الزبون إجابة شافية، يحق للبنك او البنك المستفيد حجز المعاملة إلى أن يؤكد الزبون
            صحة هذه التفاصيل.

                        </Text>{' '}
                      </View>
                      <View style={{ flexDirection: 'row-reverse', gap: 5,  marginLeft: 5 }}>
                        <Text style={styles.arabicText}>15</Text>
                        <Text style={styles.arabicText}>
                         يحتفظ البنك بالحق في تنفيذ التحويل من خالل بنك مراسل إذا تطلبت الظروف التشغيلية
            ذلك.
                        </Text>{' '}
                      </View>
                      </View>


                    </View>
                  </Page>
    </Document>
  );
}
