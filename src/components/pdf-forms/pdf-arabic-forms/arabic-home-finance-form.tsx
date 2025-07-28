'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from '../account-number-boxes-component';
import { CheckBoxComp } from '../checkbox-component';
import { PdfFooter } from '../pdf-footer';
import { InputArabicComp } from './arabic-input-component';
import { PdfArabicHeader } from './pdf-arabic-header';
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
    width: '80px',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 1,
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

export function HomeFinanceArabicFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const relationshipSince = dayjs(formdetails?.homeFinBankRelBankRelationshipSince).format('MMM D, YYYY h:mm A');

  return (
    <>
      <Page size="A4" style={styles.page}>
        <PdfArabicHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <CustomArabicDate />
          </View>

          <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
            <Text style={styles.arabicText}>
              مالحظة: الرجاء تعبئة هذا الطلب بخط واضح والتوقيع في الفراغ المخصص لذلك
            </Text>
          </View>

          <View style={{ flexDirection: 'column', gap: 3 }}>
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
            <View style={{ flexDirection: 'column', gap: '1px' }}>
              <View style={{ flexDirection: 'column', gap: '1px' }}>
                <View style={{ flexDirection: 'row-reverse' }}>
                  <InputArabicComp inputOne="رقم العميل:" outputOne={formdetails?.homeFinPerDetCIFNumber} />
                  <InputArabicComp inputOne=" اسم العميل :" outputOne={formdetails?.homeFinPerDetCustomerName} />
                </View>
                <View style={{ width: '100%', flexDirection: 'row-reverse', gap: 4 }}>
                  <View style={{ ...styles?.arabicThirdRow, justifyContent: 'space-between' }}>
                    <View style={styles.checkboxRow}>
                      <Text style={styles.arabicText}>الحالة االجتماعية</Text>
                    </View>
                    {/* <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}>
                        {formdetails?.homeFinPerDetMaritalStatus?.value ? (
                          <Text style={{ backgroundColor: '#6E2585', height: '100%', width: '100%' }}></Text>
                        ) : null}
                      </View>
                      <Text style={styles.textFont}>{formdetails?.homeFinPerDetMaritalStatus?.value} </Text>
                    </View>
                  </View> */}
                    <CheckBoxComp
                      direction={'rtl'}
                      label={formdetails?.homeFinPerDetMaritalStatus?.value}
                      val={formdetails?.homeFinPerDetMaritalStatus?.value}
                    />
                  </View>
                  <View style={styles.arabicThirdRow}>
                    {/* <InputArabicComp inputOne={"عددالمعالين"} outputOne={formdetails?.homeFinPerDetNoofDependents} /> */}
                    <Text style={styles.arabicText}>عددالمعالين</Text>
                    <Text style={styles.inputLine}>{formdetails?.homeFinPerDetNoofDependents}</Text>
                  </View>
                </View>
                {/* <View style={{ width: '40%' }}> */}
                <View style={styles?.arabicThirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.arabicText}>المستوى التعليمي</Text>
                  </View>
                  <View style={{ width: '100px', justifyContent: 'flex-end' }}>
                    <CheckBoxComp
                      direction={'rtl'}
                      label={formdetails?.homeFinPerDetEducationStatus?.value}
                      val={formdetails?.homeFinPerDetEducationStatus?.value}
                    />
                    {/* <View style={styles.checkboxRow}>
                    <View style={styles.smallCheckbox}>
                      {formdetails?.homeFinPerDetEducationStatus?.value ? (
                        <Text style={{ backgroundColor: '#6E2585', height: '100%', width: '100%' }}></Text>
                      ) : null}
                    </View>
                    <Text style={styles.textFont}>{formdetails?.homeFinPerDetEducationStatus?.value} </Text>
                  </View> */}
                  </View>
                </View>
                {/* </View> */}
                {/* <View style={{ width: '40%' }}> */}
                <View style={styles?.arabicThirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.arabicText}>السكن:</Text>
                  </View>
                  <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                    <CheckBoxComp
                      direction={'rtl'}
                      label={formdetails?.homeFinPerDetResidenceStatus?.value}
                      val={formdetails?.homeFinPerDetResidenceStatus?.value}
                    />
                    {/* <View style={styles.checkboxRow}>
                    <View style={styles.smallCheckbox}>
                      {formdetails?.homeFinPerDetResidenceStatus?.value ? (
                        <Text style={{ backgroundColor: '#6E2585', height: '100%', width: '100%' }}></Text>
                      ) : null}
                    </View>
                    <Text style={styles.textFont}>{formdetails?.homeFinPerDetResidenceStatus?.value} </Text>
                  </View> */}
                  </View>
                </View>
                {/* </View> */}
              </View>

              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text
                  style={{
                    ...styles.arabicTextHead,
                    color: 'white',
                    backgroundColor: '#6E2585',
                    paddingTop: '4px',
                    paddingRight: '5px',
                  }}
                >
                  بيانات التمويل
                </Text>
                <View style={{ flexDirection: 'column', gap: 3 }}>
                  <View style={{ flexDirection: 'column', gap: 4 }}>
                    <InputArabicComp
                      inputOne="القيمة التقديرية للممتلكات:"
                      outputTwo={formdetails?.homeFinFinDetHamishJiddiyahRO}
                      inputTwo="هامش الجدية (%)"
                      outputOne={formdetails?.homeFinFinEstimatedPropertyValue}
                    />
                    <InputArabicComp
                      inputOne="مبلغ التمويل المطلوب:"
                      inputTwo="المدة:"
                      outputOne={formdetails?.homeFinFinDetFinanceAmount}
                      outputTwo={formdetails?.homeFinFinDetTenure}
                    />
                    <InputArabicComp
                      inputOne="عدد الدفعات:"
                      inputTwo="نسبة الربح:"
                      outputTwo={formdetails?.homeFinFinDetNoofPayments}
                      // outputTwo={formdetils?.}
                    />
                    <InputArabicComp
                      inputOne="مبلغ الدفعة الشهرية (مبدئي)"
                      inputTwo="نوع التمويل:"
                      outputOne={formdetails?.homeFinFinDetMonthlyPaymentAmountTentative}
                      outputTwo={formdetails?.homeFinFinDetTypeofFinancing?.value}
                    />
                    <InputArabicComp inputOne="رسوم االجراءات:" />
                    <View style={{ flexDirection: 'row-reverse', gap: 10, width: '100%' }}>
                      <View style={{ flexDirection: 'column', width: '80%', gap: 2 }}>
                        <InputArabicComp
                          inputOne="الدخل الشهري:"
                          inputTwo=" من كل شهر"
                          outputOne={formdetails?.homeFinFinDetMonthlyIncomeSalary}
                          outputTwo={formdetails?.homeFinFinDetSalaryDayofeachmonth}
                        />
                      </View>

                      <Text style={styles.arabicText}>وم استلام الراتب</Text>
                    </View>

                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
                      <View style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={styles.arabicText}>طريقة الدفع: التعليمات الدائمة</Text>
                        <AccountBoxes
                          length={15}
                          data={formdetails?.homeFinPayMethodsSIAccountNoifApplicable?.split('')}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text
                  style={{
                    ...styles.arabicTextHead,
                    color: 'white',
                    backgroundColor: '#6E2585',
                    paddingTop: '4px',
                    paddingRight: '5px',
                  }}
                >
                  بيانات العقار
                </Text>
                <View style={{ flexDirection: 'column', gap: 3 }}>
                  <View style={{ flexDirection: 'column', gap: 4 }}>
                    <InputArabicComp
                      inputOne="متعهد البناء:"
                      outputOne={formdetails?.homeFinProInfDeveloper || 'N/A'}
                    />

                    <View style={{ ...styles?.arabicThirdRow, alignItems: 'center' }}>
                      <Text style={styles?.arabicText}>نوع العقار المطلوب</Text>
                      <CheckBoxComp
                        label={formdetails?.homeFinProInfPropertyType?.value}
                        direction="rtl"
                        val={formdetails?.homeFinProInfPropertyType?.value}
                      />
                      {/* <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}>
                          {formdetails?.homeFinProInfPropertyType?.value ? (
                            <Text
                              style={{ fontSize: 7, width: '100%', height: '100%', backgroundColor: '#6E2585' }}
                            ></Text>
                          ) : null}
                        </View>
                        <Text style={styles.textFont}>{formdetails?.homeFinProInfPropertyType?.value}</Text>
                      </View> */}
                    </View>
                    <InputArabicComp inputOne="عنوان العقار:" outputOne={formdetails?.homeFinProInfPropertyAddress} />
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                      <View style={{ flexDirection: 'row-reverse', gap: 20, marginBottom: 2 }}>
                        <Text style={styles.arabicText}>هل سيتم استخدام جزء من العقار لعمل تجاري؟</Text>
                        <CheckBoxComp
                          label={formdetails?.homeFinProInfBusinessUse?.value}
                          direction="rtl"
                          val={formdetails?.homeFinProInfBusinessUse?.value}
                        />

                        {/* <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}>
                          {' '}
                          {formdetails?.homeFinProInfBusinessUse?.value ? (
                            <Text style={{ fontSize: 7, height: '100%', backgroundColor: '#6E2585' }}></Text>
                          ) : null}
                        </View>
                        <Text style={styles.arabicText}>{formdetails.homeFinProInfBusinessUse?.value}</Text>
                      </View> */}
                      </View>
                      {/* <View style={{ flexDirection: 'row-reverse', gap: 20, marginBottom: 2 }}>
                      <Text style={styles.arabicText}>هل سيتم استخدام العقار إلقامتك الدائمة؟</Text>
                      <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}></View>
                        <Text style={styles.arabicText}>Yes</Text>
                      </View>
                    </View> */}
                      <InputArabicComp
                        inputOne="هل سيتم استخدام العقار إلقامتك الدائمة؟"
                        outputOne={formdetails?.homeFinProInfMainResidence}
                      />

                      <View style={{ flexDirection: 'row-reverse', gap: 20, alignItems: 'center' }}>
                        <Text style={styles.arabicText}>هل ستقوم بتأجير العقار؟</Text>
                        <CheckBoxComp
                          label={formdetails?.homeFinProInfRentingOut?.value}
                          direction="rtl"
                          val={formdetails?.homeFinProInfRentingOut?.value}
                        />

                        {/* <View style={styles.checkboxRow}>
                        <View style={styles.smallCheckbox}>
                          {formdetails?.homeFinProInfRentingOut?.value ? (
                            <Text
                              style={{ fontSize: 7, width: '100%', height: '100%', backgroundColor: '#6E2585' }}
                            ></Text>
                          ) : null}
                        </View>
                        <Text style={styles.textFont}>{formdetails?.homeFinProInfRentingOut?.value}</Text>
                      </View> */}
                      </View>
                    </View>

                    <InputArabicComp
                      inputOne="الدخل المتوقع من التأجير:"
                      outputOne={formdetails?.homeFinProInfEstimatedRentalIncome || 'N/A'}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text
                  style={{
                    ...styles.arabicTextHead,
                    color: 'white',
                    backgroundColor: '#6E2585',
                    paddingTop: '4px',
                    paddingRight: '5px',
                  }}
                >
                  ملكية العقار
                </Text>
                {formdetails?.homeFinPropertyOwnership?.map((item: any, index: any) => (
                  <View key={index} style={{ gap: 7 }}>
                    <InputArabicComp
                      inputOne={`اسم البائع  ${index + 1}:`}
                      outputOne={item?.homeFinProOwnNameofSeller1 || 'N/A'}
                    />
                    <InputArabicComp
                      inputOne="العالقة مع مقدم الطلب:"
                      outputOne={formdetails?.homeFinProOwnRelationApplicant?.value || 'N/A'}
                    />
                  </View>
                ))}
              </View>

              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text
                  style={{
                    ...styles.arabicText,
                    color: 'white',
                    backgroundColor: '#6E2585',
                    paddingTop: '4px',
                    paddingRight: '5px',
                  }}
                >
                  األصول األخرى التي يمتلكها مقدم الطلب
                </Text>
                <View style={{ gap: 3 }}>
                  <InputArabicComp
                    inputOne={`عدد الممتلكات وقيمته`}
                    outputOne={formdetails?.homeFinOtherAssetOwnedAppNoofPropertiesOwnedValue || 'N/A'}
                  />
                  <View style={{ flexDirection: 'row-reverse', gap: 10, alignItems: 'center' }}>
                    <Text style={styles.arabicText}>هل العقار ممول؟</Text>
                    <CheckBoxComp
                      label={formdetails?.homeFinOtherAssetOwnedAppIsPropertFinanced?.value}
                      direction="rtl"
                      val={formdetails?.homeFinOtherAssetOwnedAppIsPropertFinanced?.value}
                    />
                    {/* <View style={styles.checkboxRow}>
                    <View style={styles.smallCheckbox}>
                      {' '}
                      {formdetails?.homeFinOtherAssetOwnedAppIsPropertFinanced?.value ? (
                        <Text style={{ fontSize: 7, width: '100%', height: '100%', backgroundColor: '#6E2585' }}></Text>
                      ) : null}
                    </View>
                    <Text style={styles.arabicText}>
                      {formdetails?.homeFinOtherAssetOwnedAppIsPropertFinanced?.value}
                    </Text>
                  </View> */}
                  </View>
                  <InputArabicComp
                    inputOne="إذا كانت اإلجابة بنعم، كم هو مبلغ القسط الشهري:"
                    outputOne={formdetails?.homeFinOtherAssetOwnedAppEMIAmountPerMonth || 'N/A'}
                    inputTwo=" المبلغ المتبقي:"
                    outputTwo={formdetails?.homeFinOtherAssetOwnedAppOutstandingAmount || 'N/A'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', gap: 2, marginBottom: 10 }}>
          <View style={styles.secondColumn}>
            <Text
              style={{
                ...styles.arabicTextHead,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingRight: '5px',
              }}
            >
              العالقات المصرفية
            </Text>
            <View
              style={{
                flexDirection: 'column',
                gap: 2,
                borderLeft: '1px solid #6E2B8C',
                borderTop: '1px solid #6E2B8C',
              }}
            >
              <View
                style={{
                  flexDirection: 'row-reverse',

                  width: '100%',
                }}
              >
                <View style={{ flexDirection: 'row-reverse', width: '50%' }}>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View
                      style={{
                        padding: 2,
                        borderBottom: '1px solid #6E2585',
                        textAlign: 'center',
                        borderRight: '1px solid #6E2585',
                        backgroundColor: '#C0C0C0',
                        color: '#6E2585',
                      }}
                    >
                      <Text style={{ height: '20px', paddingTop: 3, ...styles.arabicText }}>اسم البنك</Text>
                    </View>
                    {formdetails?.homeFinBankingRelationships?.map((item: any, index: any) => (
                      <View
                        style={{
                          padding: 2,
                          borderBottom: '1px solid #6E2585',
                          borderRight: '1px solid #6E2585',
                        }}
                      >
                        <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                          {item.homeFinBankRelBankName || 'N/A'}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View
                      style={{
                        padding: 2,
                        borderBottom: '1px solid #6E2585',
                        textAlign: 'center',
                        borderRight: '1px solid #6E2585',
                        backgroundColor: '#C0C0C0',
                        color: '#6E2585',
                      }}
                    >
                      <Text style={{ height: '20px', ...styles.arabicText, paddingTop: 3 }}>رقم الحساب</Text>
                    </View>
                    {formdetails?.homeFinBankingRelationships?.map((item: any, index: any) => (
                      <View
                        style={{
                          padding: 2,
                          borderBottom: '1px solid #6E2585',
                          borderRight: '1px solid #6E2585',
                        }}
                      >
                        <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                          {item?.homeFinBankRelBankAccountNumber || 'N/A'}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '50%' }}>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View
                      style={{
                        padding: 2,
                        borderBottom: '1px solid #6E2585',
                        textAlign: 'center',
                        borderRight: '1px solid #6E2585',
                        backgroundColor: '#C0C0C0',
                        color: '#6E2585',
                      }}
                    >
                      <Text style={{ height: '20px', ...styles.arabicText, paddingTop: 3 }}>نوع الحساب</Text>
                    </View>
                    {formdetails?.homeFinBankingRelationships?.map((item: any, index: any) => (
                      <View
                        style={{
                          padding: 2,
                          borderBottom: '1px solid #6E2585',
                          borderRight: '1px solid #6E2585',
                        }}
                      >
                        <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                          {item?.homeFinBankRelBankTypeofAccount?.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ flexDirection: 'column', width: '50%', textAlign: 'center' }}>
                    <View
                      style={{
                        padding: 2,
                        borderBottom: '1px solid #6E2585',
                        borderRight: '1px solid #6E2585',
                        backgroundColor: '#C0C0C0',
                        color: '#6E2585',
                      }}
                    >
                      <Text style={{ height: '20px', ...styles.arabicText, paddingTop: 3 }}>
                        eالعالقة منذ (شهر/سنة)
                      </Text>
                    </View>
                    {formdetails?.homeFinBankingRelationships?.map((item: any, index: any) => (
                      <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                        <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                          {relationshipSince || 'N/A'}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'column', gap: 10 }}>
          {/* Arabic Part has been started from here */}

          <View
            style={{
              flexDirection: 'column',
              borderLeft: '1px solid #6E2585',
              width: '100%',
              borderTop: '1px solid #6E2585',
              marginTop: 5,
            }}
          >
            <View style={{ ...styles.arabicText, flexDirection: 'column', width: '100%' }}>
              <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicTextHead,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={styles.arabicText}>نوع االلتزام</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={styles.arabicText}>البنك</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={styles.arabicText}>المبلغ المتبقي</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={styles.arabicText}>القسط الشهري</Text>
                </View>
              </View>

              <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={styles.arabicText}>تمويل شخصي</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelPersonalFinanceBank || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelPersonalFinanceAmountOutstanding || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelPersonalFinanceMonthlyPayment || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    padding: 2,
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                  }}
                >
                  <Text style={styles.arabicText}>تمويل السيارات</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelAutoFinanceBank || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelAutoFinanceAmountOutstanding || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelAutoFinanceMonthlyPayment || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    padding: 2,
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                  }}
                >
                  <Text style={styles.arabicText}>بطاقة ائتمان</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelCreditCardBank || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelCreditCardMonthlyPayment || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelCreditCardMonthlyPayment || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    padding: 2,
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                  }}
                >
                  <Text style={styles.arabicText}>تمويل منزلي</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelHomeFinanceBank || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelHomeFinanceMonthlyPayment || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    padding: 2,
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                  }}
                >
                  <Text style={styles.arabicText}>إلتزامات أخرى)تشمل الضمانات تجاه األطراف األخرى)</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelOtherLiabilityBank || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelOtherLiabilityAmountOutstanding || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}
                  </Text>
                </View>
              </View>

              <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    padding: 2,
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                  }}
                >
                  <Text style={[{ width: '100%' }]}>المجموع</Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                    backgroundColor: '#C0C0C0',
                  }}
                >
                  <Text
                    style={{ height: '18px', textAlign: 'center', backgroundColor: '#C0C0C0', paddingTop: 3 }}
                  ></Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelTotalAmountOutstanding || 'N/A'}
                  </Text>
                </View>

                <View
                  style={{
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                    ...styles.arabicText,
                    width: '25%',
                    padding: 2,
                  }}
                >
                  <Text style={[styles.input, { width: '100%' }]}>
                    {formdetails?.homeFinBankRelTotalMonthlyPayment || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/*Arabic Liability work here  */}
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <Text
              style={{
                // fontSize: 10,
                // fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
                ...styles.arabicTextHead,
              }}
            >
              أشخاص يمكن الرجوع إليهم
            </Text>
            <View
              style={{
                flexDirection: 'row-reverse',
                width: '100%',
                border: '1px solid #6E2585',
                backgroundColor: '#C0C0C0',
                color: '#6E2585',
              }}
            >
              <Text
                style={{
                  width: '50%',
                  borderLeft: '1px solid #6E2585',
                  padding: 2,
                  ...styles.arabicTextHead,
                  verticalAlign: 'sub',
                }}
              >
                في سلطنة عمان{' '}
              </Text>
              <Text style={{ width: '50%', padding: 2, ...styles.arabicTextHead, verticalAlign: 'sub' }}>
                في الموطن األصلي )لغير ا
              </Text>
            </View>
            <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  width: '100%',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',

                  color: '#6E2585',
                }}
              >
                <View
                  style={{
                    ...styles.arabicText,
                    borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    gap: 5,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp inputOne="الاسم" outputOne={formdetails?.homeFinInOmanName || 'N/A'} />
                </View>
                <View
                  style={{
                    ...styles.arabicText,
                    // borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    gap: 5,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp inputOne="الاسم" outputOne={formdetails?.homeFinInHomeCountryName || 'N/A'} />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  width: '100%',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',

                  color: '#6E2585',
                }}
              >
                <View
                  style={{
                    ...styles.arabicText,
                    borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    gap: 5,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp
                    inputOne="صلة القرابة"
                    outputOne={formdetails?.homeFinInOmanRelationship?.value || 'N/A'}
                  />
                </View>
                <View
                  style={{
                    ...styles.arabicText,
                    // borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp
                    inputOne="صلة القرابة"
                    outputOne={formdetails?.homeFinInHomeCountryRelationship?.value || 'N/A'}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  width: '100%',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',

                  color: '#6E2585',
                }}
              >
                <View
                  style={{
                    ...styles.arabicText,
                    borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp inputOne="جهة العمل" outputOne={formdetails?.homeFinInOmanEmployer || 'N/A'} />
                </View>
                <View
                  style={{
                    ...styles.arabicText,
                    // borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp
                    inputOne="جهة العمل"
                    outputOne={formdetails?.homeFinInHomeCountryEmployer || 'N/A'}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  width: '100%',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',

                  color: '#6E2585',
                }}
              >
                <View
                  style={{
                    ...styles.arabicText,
                    borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp inputOne="العنوان" outputOne={formdetails?.homeFinInOmanAddress || 'N/A'} />
                </View>
                <View
                  style={{
                    ...styles.arabicText,
                    // borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp inputOne="العنوان" outputOne={formdetails?.homeFinInHomeCountryAddress || 'N/A'} />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  width: '100%',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',

                  color: '#6E2585',
                }}
              >
                <View
                  style={{
                    ...styles.arabicText,
                    borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp inputOne="رقم هاتف المكت" outputOne={formdetails?.homeFinInOmanOfficeTel || 'N/A'} />
                </View>
                <View
                  style={{
                    ...styles.arabicText,
                    // borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp
                    inputOne="رقم هاتف المكتب"
                    outputOne={formdetails?.homeFinInHomeCountryOfficeTel || 'N/A'}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  width: '100%',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',

                  color: '#6E2585',
                }}
              >
                <View
                  style={{
                    ...styles.arabicText,
                    borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp inputOne="قم الهاتف النقال" outputOne={formdetails?.homeFinInOmanMobile || 'N/A'} />
                </View>
                <View
                  style={{
                    ...styles.arabicText,
                    // borderLeft: '1px solid #6E2585',
                    width: '50%',
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >
                  <InputArabicComp
                    inputOne="رقم الهاتف النقال"
                    outputOne={formdetails?.homeFinInHomeCountryMobile || 'N/A'}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* Promise to purchase */}
          <View style={{ flexDirection: 'column', gap: 3, marginTop: 5 }}>
            <Text
              style={{
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
                ...styles.arabicTextHead,
              }}
            >
              تعهد بالشراء
            </Text>
            <View style={{ flexDirection: 'column', gap: 6 }}>
              <View style={{ flexDirection: 'row-reverse', gap: 10, justifyContent: 'space-between' }}>
                <Text style={{ ...styles.arabicText, marginLeft: 5 }}>1- </Text>
                <Text style={styles.arabicText}>
                  يطلب مقدم الطلب من البنك أن يشتري عقارًا، وحينما يُعلِم البنك مقدم الطلب بأنه (البنك) قد اشترى العقار
                  ليبيعه فيما بعد لمقدم الطلب، يكون مقدم الطلب بموجب ذلك ملتزمًا بصفة نهائية وبدون قيد أو شرط بشراء
                  العقار من البنك باسم مقدم الطلب شخصيًا، وذلك وفقًا لبنود عقد التمويل "المرابحة".
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                <Text style={styles.arabicText}> ٢.</Text>
                <Text style={styles.arabicText}>
                  تكون دفعات مقدم الطلب والالتزامات الأخرى بموجب اتفاقية التمويل "المرابحة" مؤمنة برهن يمنحه مقدم الطلب
                  للبنك، وأية تأمينات أخرى حسب الحاجة.
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                <Text style={styles.arabicText}> ٣.</Text>
                <Text style={styles.arabicText}>
                  لا يكون البنك ملزمًا بأي حال من الأحوال بشراء العقار إذا لم يستوفِ مقدم الطلب كافة الشروط السابقة لعقد
                  التمويل "المرابحة" أو أهمل في تنفيذ أي التزام آخر منصوص عليه في العقد.
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                <Text style={styles.arabicText}> ٤.</Text>
                <Text style={styles.arabicText}>
                  سيتم التعامل مع أي مبلغ يقوم مقدم الطلب بإيداعه لدى البنك أو أي من وكلائه كضمان (هامش جدية) من مقدم
                  الطلب لشراء العقار، وفي حالة نكوث مقدم الطلب بتعهده، سيكون البنك مخولًا ببيع العقار والتسوية مقابل
                  خسائره الفعلية بين سعر تكلفة العقار والسعر الذي تم بيعه به لاحقًا. بعد حسم مثل هذه الخسارة من المبلغ
                  المودع بواسطة مقدم الطلب، يقوم البنك برد المبلغ المتبقي من المبلغ المودع إلى مقدم الطلب – إن وجد. وعلى
                  العكس، يكون مقدم الطلب مسؤولًا عن أي نقص ينتج بين مبلغ الإيداع والخسائر الفعلية للبنك في هذا الشأن.
                </Text>
              </View>

              <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                <Text style={styles.arabicText}> ٥.</Text>
                <Text style={styles.arabicText}>
                  إن البنود المستخدمة في هذا التعهد بالشراء يجب أن تحمل نفس المعنى الذي تحمله تلك البنود الواردة في عقد
                  التمويل "المرابحة"
                </Text>
              </View>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        {/* Declaratrion */}

        <View style={{ flexDirection: 'column', gap: 2, marginTop: 5 }}>
          <Text
            style={{
              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
              ...styles.arabicTextHead,
            }}
          >
            الموافقة والإقرار
          </Text>
          <View style={{ flexDirection: 'column', gap: 10 }}>
            <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
              <Text style={styles.arabicText}>
                أوافق أنا/نوافق نحن بأن المعلومات الموضحة أعلاه هي صحيحة وكاملة، وإنني/إننا قد تسلمت/تسلمنا بنود وشروط
                البنك العامة لعملية الحسابات والخدمات المصرفية الإلكترونية وتلك الشروط المعينة القابلة للتطبيق والخاصة
                بنوع الحساب/التمويل الذي تم اختياره بواسطتي أنا/بواسطتنا نحن، إنني أدرك/إننا ندرك ونوافق بوضوح ونقبل أن
                نكون مقيدين بها سواء وردت باللغة الإنجليزية و/أو باللغة العربية، إنني/إننا سنقوم بالتأكيد على أن كافة
                التحويلات المالية المتوقعة المحولة من الخارج لحسابي/لحسابنا ستكون مطابقة لشروط البنك المركزي العماني
              </Text>
            </View>
            <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 5,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Text style={styles.arabicText}>٢. بهذا ألتزم نهائيًا وبدون شرط أو قيد بالقيام بالآتي</Text>
                <View style={styles.arabicThirdRow}>
                  <View style={{ flexDirection: 'column', gap: 5 }}>
                    <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                      <Text style={styles.arabicText}>a)</Text>
                      <Text style={styles.arabicText}>
                        في حالة إذا كان طلب الشراء يعتمد على تحويل الراتب ومكافأة نهاية الخدمة:
                      </Text>
                    </View>
                    <View style={styles.arabicThirdRow}>
                      <Text style={styles.arabicText}>i)</Text>
                      <Text style={styles.arabicText}>
                        ستمر في تحويل راتبي شهريًا ومباشرة من صاحب العمل إلى رقم حسابي (حساب البنك) المحتفظ به لدى بنك
                        نزوى (البنك) إلى أن يتم تسديد كافة الأموال المستحقة للبنك،
                      </Text>
                    </View>
                    <View style={styles.arabicThirdRow}>
                      <Text style={{ ...styles.arabicText }}>ii)</Text>
                      <Text style={{ ...styles.arabicText }}>
                        أقوم بإعلام البنك مباشرة إذا تركت عملي الحالي أو تقاعدت وأقوم بتزويد البنك برسالة تحويل راتب
                        جديدة في موعد أقصاه خمسة أيام عمل من تاريخ استئنافي للعمل لدى صاحب عمل جديد، وأقوم بتعزيز
                        الالتزام بالاستمرار في تحويل راتبي شهريًا ومباشرة من صاحب العمل الجديد إلى حساب البنك المحتفظ به
                        لدى البنك إلى أن يتم تسديد كافة الأموال المستحقة للبنك، وفي كل الأحوال لا يعتبر ترك العمل سببًا
                        مشروعًا لإخلالي بسداد الأقساط في موعدها.
                      </Text>
                    </View>
                    <View style={styles.arabicThirdRow}>
                      <Text style={styles.arabicText}>iii)</Text>
                      <Text style={styles.arabicText}>تحويل مكافآت نهاية الخدمة الخاصة بي إلى حسابي في بنك نزوى</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.arabicThirdRow}>
                  <View
                    style={{
                      flexDirection: 'column',
                      gap: 5,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                      <Text style={styles.arabicText}>b)</Text>
                      <Text style={styles.arabicText}>
                        دفع، قبل أو عند وقوع أي من الأحداث التالية، كافة الأموال المستحقة لي للبنك في حالة حدوث:
                      </Text>
                    </View>
                    <View style={styles.arabicThirdRow}>
                      <Text style={styles.arabicText}>i)</Text>
                      <Text style={styles.arabicText}>إذا توقفت عن كونك مقيمًا في سلطنة عمان؛ أو</Text>
                    </View>
                    <View style={styles.thirdRow}>
                      <Text style={styles.arabicText}>ii)</Text>
                      <Text style={styles.arabicText}>إذا أصبحت مقيمًا في الخارج؛ أو</Text>
                    </View>
                    <View style={styles.arabicThirdRow}>
                      <Text style={styles.arabicText}>iii)</Text>
                      <Text style={styles.arabicText}>
                        إذا أصبحت موظفًا لدى شركة لن تقوم بتحويل راتبي مباشرة إلى الحساب البنكي كما هو مطلوب من قبل
                        البنك
                      </Text>
                    </View>
                    <View style={styles.arabicThirdRow}>
                      <Text style={styles.arabicText}>iv)</Text>
                      <Text style={styles.arabicText}>
                        إذا لم ألتزم بأي من المذكور أعلاه أو بشروط وأحكام البنك العامة
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
              <Text style={styles.arabicText}>٣. </Text>
              <Text style={styles.arabicText}>
                ستكون هذه التعهدات خاضعة ومبنية وفقًا لقوانين سلطنة عمان وأوافق بشكل لا رجعة فيه وغير مشروط على الولاية
                القضائية الحصرية لمحاكم مسقط، ما لم يقرر البنك خلاف ذلك.
              </Text>
            </View>

            <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
              <Text style={styles.arabicText}>٤. </Text>
              <Text style={styles.arabicText}>
                علاوة على ذلك، في حال صدور حكم ضدي لصالح البنك في المحاكم، أوافق بشكل لا رجعة فيه وغير مشروط على تنفيذ
                هذا الحكم.
              </Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}

        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#6E2585', ...styles.arabicTextHead, marginBottom: 2 }}>إخالء المسؤولية:</Text>
          <Text style={styles.arabicText}>
            إخالء المسؤولية ً بإبداء ً أن البنك ليس ملزما ،ً علما ً على قبول الطلب. وسيقوم البنك بإبالغي بقراره النهائي
            بخصوص طلب التمويل الحقا أقر بأنني على علم تام بأن تقديم المستندات المطلوبة مع استمارة طلب التمويل ال تعني
            موافقة البنك تلقائيا األسباب في حالة عدم الموافقة على الطلب.
          </Text>
        </View>

        {/* Column */}
        <View style={{ flexDirection: 'column', gap: 5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row-reverse', width: '100%', gap: 5 }}>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View style={styles.arabicThirdRow}>
                <Text style={styles.arabicText}>اسم العميل:</Text>
                <Text style={styles.input}></Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View style={styles.arabicThirdRow}>
                <Text style={styles.arabicText}>التوقيع:</Text>
                <Text style={styles.input}></Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row-reverse', width: '100%', gap: 5 }}>
            <View style={{ flexDirection: 'column-reverse', width: '50%' }}>
              <View style={styles.arabicThirdRow}>
                <Text style={styles.arabicText}>رقمالهاتف :</Text>
                <Text style={styles.input}></Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View style={{ flexDirection: 'row-reverse' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      width: 115,
                      marginLeft: 5,
                      marginRight: 23,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginLeft: 1, marginRight: 2 }}>
                      يوم
                    </Text>
                    <Text style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginRight: 3, marginLeft: 15 }}>
                      شهر
                    </Text>
                    <Text style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginRight: 8 }}>سنة</Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 2 }}>
                    <Text
                      style={{
                        color: '#6E2B8C',
                        fontFamily: 'Cairo',

                        textAlign: 'right',
                        paddingTop: 2,
                      }}
                    >
                      التاريخ:
                    </Text>
                    <View style={{ flexDirection: 'row-reverse' }}>
                      {Array.from({ length: 8 })?.map((_, index: number) => {
                        const extraMargin = index === 2 || index === 4 ? '7px' : '2px';
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
                            <Text style={{ fontSize: 7, padding: '0px' }}> </Text>
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
        {/* arabic bank use only */}

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
          <Text style={{ ...styles.arabicTextHead, color: '#56004E' }}>الستخدام البنك فقط</Text>

          <View>
            <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  // borderLeft: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  width: '50%',
                }}
              >
                <View
                  style={{
                    color: '#6E2585',
                    paddingHorizontal: '5px',
                    paddingVertical: '15px',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <InputArabicComp inputOne="رقم العميل" outputOne=" " />
                  <InputArabicComp inputOne="الفرع" outputOne=" " />
                  <InputArabicComp inputOne="رمز PBO/DSR" outputOne=" " />
                  <InputArabicComp inputOne="اسم DSR/PBO Name" outputOne=" " />
                  <InputArabicComp inputOne="توقيع DSR/PBO Signature" outputOne=" " />
                </View>
              </View>

              <View
                style={{
                  height: 'auto',
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderBottom: '1px solid #6E2585',
                  borderRight: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  width: '50%',
                }}
              >
                <View
                  style={{
                    color: '#6E2585',
                    paddingHorizontal: '5px',
                    paddingVertical: '15px',
                    flexDirection: 'column',
                    gap: '3px',
                  }}
                >
                  <InputArabicComp inputOne="توصية من" />

                  <InputArabicComp inputOne="التوقيع" outputOne=" " />
                  <InputArabicComp inputOne="الاسم" outputOne=" " />
                </View>
              </View>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>
    </>
  );
}
