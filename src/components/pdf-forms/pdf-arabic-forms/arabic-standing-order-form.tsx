'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from '../account-number-boxes-component';
import { CheckBoxComp } from '../checkbox-component';
import { PdfFooter } from '../pdf-footer';
import { PdfHeader } from '../pdf-header';
import { InputArabicComp } from './arabic-input-component';
import { CustomArabicDate } from './pdf-custom-arabic-date';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
    paddingLeft: 5,
    paddingRight: 3,
    paddingBottom: 1,
  },

  arabicThirdRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: 10,
    // padding: 3,
    alignItems: 'center',
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 2,
    textAlign: 'center',
    marginBottom: 4,
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
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    width: '60%',
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

export function StandingOrderArabicFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const standingOrderStartDate = dayjs(formdetails?.sofStandingOrderStartDate).format('MMM D, YYYY h:mm A');
  const standingOrderEndDate = dayjs(formdetails?.sofStandingOrderEndDate).format('MMM D, YYYY h:mm A');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={{ flexDirection: 'row-reverse' }}>
          <Text style={styles.arabicText}>مالحظة: الرجاء تعبئة هذا الطلب بخط واضح والتوقيع في الفراغ المخصص لذلك.</Text>
        </View>
        <View style={styles.column}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
              <View style={{ flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                <Text style={styles.arabicText}>لفاضل / مدير</Text>
                <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                  <Text style={styles.arabicText}>فرع:</Text>
                  <Text style={styles.arabicText}>{formdetails?.sofBranch?.value}</Text>
                </View>
                <Text style={styles.arabicText}>بنك نزوى (ش.م.ع.ع)</Text>
                <Text style={{ ...styles.arabicText }}>سلطنة عُمان</Text>
              </View>

              <Text style={{ ...styles.arabicText, marginVertical: 5 }}>الموضوع: تعليمات تحويل دائمة</Text>
              <Text style={styles.arabicText}>
                أفوضكم/ نفوضكم بتنفيذ تعليمات التحويل / الحوالة الدائمة الواردة أدناه بالنيابة عني/عنا:
              </Text>
            </View>
            <CustomArabicDate />
          </View>

          <View style={{ flexDirection: 'column', gap: 2 }}>
            <View style={{ flexDirection: 'row-reverse', gap: 5, marginTop: 5 }}>
              <Text style={{ ...styles.arabicText }}>الحسم من الحساب رقم:</Text>
              <AccountBoxes data={formdetails?.sofAccountToBeDebit.split('')} />
            </View>
            <InputArabicComp inputOne="سم الحساب: " outputOne={formdetails?.sofAccountName} />
            <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
              <InputArabicComp inputOne="المبلغ المراد تحويله: " outputOne={formdetails?.sofAmountFigures} />
              <InputArabicComp inputOne=" العملة: " outputOne={formdetails.sofCurrency?.value} />
            </View>
            <InputArabicComp inputOne="المبلغ بالحروف:" outputOne={formdetails.sofAmountWords} />
            <View style={styles.arabicThirdRow}>
              <Text style={styles.arabicText}>نظام التحويل الدوري:</Text>
              <CheckBoxComp
                direction={'rtl'}
                label={formdetails?.sofFrequencyOfTransfer?.value}
                val={formdetails?.sofFrequencyOfTransfer?.value}
              />
            </View>
            <InputArabicComp
              inputOne="من تاريخ: "
              inputTwo="لغاية تاريخ"
              outputOne={standingOrderStartDate}
              outputTwo={standingOrderEndDate}
            />
            <View style={styles.arabicThirdRow}>
              <Text style={styles.arabicText}>طريقة تنفيذ التعليمات الدائمة</Text>
              <CheckBoxComp
                direction="rtl"
                label={formdetails?.sofModeOfStandingOrderExecution?.value}
                val={formdetails?.sofModeOfStandingOrderExecution?.value}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 3 }}>
            <Text
              style={{
                ...styles.arabicText,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingRight: '5px',
              }}
            >
              تفاصيل المستفيد
            </Text>
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <InputArabicComp inputOne="اإلسم" outputOne={formdetails?.sofBeneficiarylName} />
              <InputArabicComp inputOne="رقم الحساب/ رقم IBAN:" outputOne={formdetails?.sofBeneficiaryAccNumOrIBAN} />
              <InputArabicComp inputOne=" اسم البنك:" outputOne={formdetails?.sofBeneficiaryBankName} />
              <InputArabicComp inputOne=" الفرع" outputOne={formdetails?.sofBeneficiaryBranch?.value} />
              <InputArabicComp inputOne=":SWIFT/ SORT/ BIC رمز ر" outputOne={formdetails?.sofBeneficiarySwiftCode} />
              <InputArabicComp inputOne="بيانات الدفع:" outputOne={formdetails?.sofBeneficiaryPaymentDetail} />
              <InputArabicComp inputOne=" العنوا" outputOne={formdetails?.sofBeneficiaryAddress} />
              <View style={styles.arabicThirdRow}>
                <Text style={styles.arabicText}>رسوم البنك المراسل</Text>
                <CheckBoxComp
                  direction="rtl"
                  label={formdetails?.sofBeneficiaryCorrespondentBankCharges?.value}
                  val={formdetails?.sofBeneficiaryCorrespondentBankCharges?.value}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 4 }}>
            <Text
              style={{
                ...styles.arabicText,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingRight: '5px',
              }}
            >
              الشروط واألحكام
            </Text>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              <Text style={styles.arabicText}>
                1.سينفذ البنك تعليمات التحويل الدائمة ابتداءً من تاريخ الاستحقاق الأول لهذه التعليمات. 2. سيتم حسم
                الرسوم المستحقة من حساب العميل عند تنفيذ كل معاملة تحويل، وذلك استنادًا إلى الرسوم السائدة. 3. سيتم
                استيفاء الرسوم المستحقة من العميل حتى وإن لم تُنفذ معاملة التحويل بسبب عدم توفر رصيد كافٍ في الحساب. 4.
                لن يكون البنك مسؤولًا عن عدم تنفيذ تعليمات التحويل نظراً لعدم توفر رصيد كافٍ في حساب العميل، سواء كان
                ذلك بسبب تغير في أسعار صرف العملات أو لأي سبب آخر. 5. إذا لم يتمكن البنك من تنفيذ تعليمات التحويل نظراً
                لعدم توفر رصيد كافٍ في حساب العميل، فإن البنك يحتفظ بحق إلغاء التعليمات المذكورة في أي وقت دون إنذار
                مسبق للعميل. 6. تُضاف الشروط والأحكام العامة الواردة أعلاه إلى الشروط والأحكام العامة التي وافق عليها
                العميل في استمارة طلب فتح الحساب واستمارة طلب تحويل الأموال.
              </Text>
              <Text style={styles.arabicText}>
                لقد قرأت/قرأنا الشروط والأحكام الواردة، وأوافق/نوافق على الالتزام بما جاء فيها. كما أتعهد/نتعهد بإبقاء
                رصيد كافٍ في حسابي/حسابنا لتنفيذ تعليمات التحويل الدائمة في التواريخ المحددة. أوافق/نوافق على تسديد رسوم
                تنفيذ تعليمات التحويل الدائمة في مواعيدها المحددة، وذلك حسب لائحة الرسوم والعمولات المطبقة في البنك.
              </Text>
            </View>
          </View>
          {/* <View style={styles.secondColumn}>
                     <Text
                       style={{
                         ...styles.arabicText,
                         color: 'white',
                         backgroundColor: '#6E2585',
                         paddingTop: '4px',
                         paddingRight: '5px',
                       }}
                     >
                       SCHEDULE OF CHARGES (tick on appropriate field)
                     </Text>
                     <View style={{ flexDirection: 'column', gap: 2 }}>
                       <View style={{ flexDirection: 'row', width: '100%' }}>
                         <View style={{ flexDirection: 'column', width: '50%', borderLeft:'1px solid #6E2585', borderBottom:'1px solid #6E2585' }}>
                           <View
                             style={{
                               height: '15px',
                               paddingHorizontal: 5,
                               borderBottom: '1px solid #6E2585',
                               textAlign: 'left',


                               backgroundColor: '#C0C0C0',
                               color: '#6E2585',
                             }}
                           >
                             <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>PAY ORDER/DEMAND DRAFT</Text>
                           </View>
                           <View style={{ ...styles.column, borderRight: '1px solid #6E2585' }}>
                             <View
                               style={{
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                 paddingVertical: 2,
                                 paddingHorizontal:5,
                                 borderBottom: '1px solid #6E2585',
                               }}
                             >
                               <View style={{ flexDirection: 'row', gap: 2 }}>
                                 <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>Pay Order</Text>
                                 <Text style={{ ...styles.textFont }}>- RO 2</Text>
                               </View>
                               <View style={styles.checkbox}></View>
                             </View>
                             <View
                               style={{
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                 paddingVertical: 2,
                                 paddingHorizontal:5,
                                 borderBottom: '1px solid #6E2585',
                                 alignItems:"center"
                               }}
                             >
                               <View style={{ flexDirection: 'row', gap: 2 }}>
                                 <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>TT Local</Text>
                                 <Text style={{ ...styles.textFont }}>- RO 1</Text>
                               </View>
                               <View style={styles.checkbox}></View>
                             </View>
                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2,
                                 paddingHorizontal:5, }}>
                               <View style={{ flexDirection: 'row', gap: 2 }}>
                                 <Text style={{ ...styles.textFont, fontFamily: 'Helvetica-Bold' }}>
                                   Standing Order Internal{' '}
                                 </Text>
                                 <Text style={{ ...styles.textFont }}>- RO 1</Text>
                               </View>
                               <View style={styles.checkbox}></View>
                             </View>
                           </View>
                         </View>
                         <View style={{ flexDirection: 'column', width: '50%',borderRight:'1px solid #6E2585', borderBottom:'1px solid #6E2585' }}>
                           <View
                             style={{
                               height: '15px',
                               borderBottom: '1px solid #6E2585',
                              //  textAlign: 'center',
                               alignItems: 'center',
                               justifyContent: 'center',
                               backgroundColor: '#C0C0C0',
                      // color: '#6E2585',
                               ...styles.arabicText
                             }}
                           ></View>
                           <View style={{ ...styles.column }}>
                             <View
                               style={{
                                 flexDirection: 'row-reverse',
                                 justifyContent: 'space-between',
                                 paddingVertical: 2,
                                 paddingHorizontal:5,
                                 borderBottom: '1px solid #6E2585',
                               }}
                             >
                               <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
                                 <Text style={{ ...styles.arabicText }}>Demand Draft </Text>
                                 <Text style={{ ...styles.arabicText }}>- RO 2 </Text>
                               </View>
                               <View style={styles.checkbox}></View>
                             </View>
                             <View
                               style={{
                                 flexDirection: 'row-reverse',
                                 justifyContent: 'space-between',
                                 paddingVertical: 2,
                                 paddingHorizontal:5,
                                 borderBottom: '1px solid #6E2585',
                               }}
                             >
                               <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
                                 <Text style={{ ...styles.arabicText }}>TT International SWIFT</Text>
                                 <Text style={{ ...styles.arabicText }}>RO 1 </Text>
                               </View>
                               <View style={styles.checkbox}></View>
                             </View>
                             <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between',paddingVertical: 2,
                                 paddingHorizontal:5, }}>
                               <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
                                 <Text style={{ ...styles.arabicText }}>
                                   Standing Order External{' '}
                                 </Text>
                                 <Text style={{ ...styles.arabicText }}>- RO 1 </Text>
                               </View>
                               <View style={styles.checkbox}></View>
                             </View>
                           </View>
                         </View>
                       </View>
                     </View>
              </View> */}
          <View style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 5 }}>
            <View
              style={{
                fontSize: '8px',
                borderTop: '1px solid #6E2585',
                borderLeft: '1px solid #6E2585',
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
                  height: '15px',
                }}
              >
                <Text style={styles.arabicText}></Text>
              </View>
              <View
                style={{
                  height: '30px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-start',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: 2,
                }}
              >
                                <Text style={styles.arabicText}>{formdetails?.sofScheduleOfChargesFirstApplicant || 'N/A'}</Text>

                <Text style={styles.arabicText}>مقدم الطلب األول</Text>
              </View>
              <View
                style={{
                  // height: '30px',
                  // backgroundColor: '#C0C0C0',
                  justifyContent: 'flex-end',
                  borderRight: 0,
                  alignItems: 'flex-end',
                  color: '#6E2585',
                  borderBottom: '1px solid #6E2585',
                  width: '100%',
                  padding: 3,
                }}
              >

                <Text style={styles.arabicText}>{formdetails?.sofScheduleOfChargesSecondApplicant || "N/A"}</Text>
                <Text style={styles.arabicText}>مقدّم الطلب الثاني (للحساب المشترك)</Text>
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
                  height: '15px',
                  // padding: '8px',
                }}
              >
                <Text style={styles.arabicText}>اسم العميل/ العمالء</Text>
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
                    borderBottom: '1px solid #6E2585',
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
                  height: '15px',
                }}
              >
                <Text style={styles.arabicText}>التوقيع/ البصمة</Text>
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
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
                </View>
              ))}
            </View>
          </View>




          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
            <CustomArabicDate />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.arabicText}>تم االعتماد من قبل:</Text>
              <Text style={styles.arabicText}>الفرع مدير / العمليات مدير</Text>
            </View>
          </View>
          </View>
      </Page>

    </Document>
  );
}

