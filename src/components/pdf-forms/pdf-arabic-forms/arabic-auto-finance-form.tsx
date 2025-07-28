'use client';
import * as React from 'react';
import { Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { dayjs } from '@/lib/dayjs';
import { AccountBoxes } from '../account-number-boxes-component';
import { PdfFooter } from '../pdf-footer';
import { InputArabicComp } from './arabic-input-component';
import { PdfArabicHeader } from './pdf-arabic-header';
import { CustomArabicDate } from './pdf-custom-arabic-date';
import { CheckBoxComp } from '../checkbox-component';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
});
const styles = StyleSheet.create({
    inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    fontSize: 10,
    flexGrow: 1,
    alignSelf: 'flex-end',
    textAlign:'right',
    fontFamily:'Cairo'
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

export function AutoFinanceArabicFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const relationshipSince = dayjs(formdetails?.autoFinBankRelBankRelationshipSince).format('MMM D, YYYY h:mm A');
  const yearOfMake = dayjs(formdetails?.autoFinVehInfYearofMake).format('MMM D, YYYY h:mm A');
  const purposeDateOfDelivery = dayjs(formdetails?.autoFinVehInfProposedDateofDelivery).format('MMM D, YYYY h:mm A');

  return (
    <>
    <Page size="A4" style={styles.page}>
      <PdfArabicHeader formName={data?.form_name} />
      <View style={styles.column}>
        <View style={{ flexDirection: 'row-reverse' }}>
          <CustomArabicDate />
        </View>

        <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
          <Text style={styles.arabicText}>مالحظة: الرجاء تعبئة هذا الطلب بخط واضح والتوقيع في الفراغ المخصص لذلك</Text>
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
                <InputArabicComp inputOne="رقم العميل" outputOne={formdetails?.autoFinPerDetCIFNumber} />
                <InputArabicComp inputOne=" اسم العميل" outputOne={formdetails?.autoFinPerDetCustomerName} />
              </View>
              <View style={{ width: '100%', flexDirection: 'row-reverse', gap: 4 }}>
                <View style={styles?.arabicThirdRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.arabicText}>الحالة االجتماعية</Text>
                  </View>
                  <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                    <CheckBoxComp direction={"rtl"} label={formdetails?.autoFinPerDetMaritalStatus?.value} val={formdetails?.autoFinPerDetMaritalStatus?.value} />
                    {/* <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}>
                        {formdetails?.autoFinPerDetMaritalStatus?.value ? (
                          <Text style={{ backgroundColor: '#6E2585', height: '100%', width: '100%' }}></Text>
                        ) : null}
                      </View>
                      <Text style={styles.arabicText}>{formdetails?.autoFinPerDetMaritalStatus?.value} </Text>
                    </View> */}
                  </View>
                </View>
                <View style={styles.arabicThirdRow}>
                  <Text style={styles.arabicText}>عدد المعالين:</Text>
                  <Text style={styles.inputLine}>{formdetails?.autoFinPerDetNoofDependents}</Text>
                </View>
              </View>
              {/* <View style={{ width: '40%' }}> */}
              <View style={styles?.arabicThirdRow}>
                <View style={styles.checkboxRow}>
                  <Text style={styles.arabicText}>المستوى التعليمي</Text>
                </View>
                <View style={{ width: '100px', justifyContent: 'flex-end' }}>
                <CheckBoxComp direction={"rtl"} label={formdetails?.autoFinPerDetEducationStatus?.value} val={formdetails?.autoFinPerDetEducationStatus?.value} />

                  {/* <View style={styles.checkboxRow}>
                    <View style={styles.smallCheckbox}>
                      {formdetails?.autoFinPerDetEducationStatus?.value ? (
                        <Text style={{ backgroundColor: '#6E2585', height: '100%', width: '100%' }}></Text>
                      ) : null}
                    </View>
                    <Text style={styles.arabicText}>{formdetails?.autoFinPerDetEducationStatus?.value} </Text>
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
                    <CheckBoxComp direction={'rtl'} label={formdetails?.autoFinPerDetResidenceStatus?.value} val={formdetails?.autoFinPerDetResidenceStatus?.value} />
                  {/* <View style={styles.checkboxRow}>
                    <View style={styles.smallCheckbox}>
                      {formdetails?.autoFinPerDetResidenceStatus?.value ? (
                        <Text style={{ backgroundColor: '#6E2585', height: '100%', width: '100%' }}></Text>
                      ) : null}
                    </View>
                    <Text style={styles.arabicText}>{formdetails?.autoFinPerDetResidenceStatus?.value} </Text>
                  </View> */}
                </View>
              </View>
              {/* </View> */}
            </View>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              <Text
                style={{
                  ...styles.arabicTextHead,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                بيانات التمويل
              </Text>
              <View style={{ flexDirection: 'column', gap: 3 }}>
                <View style={{ flexDirection: 'column', gap: 4 }}>
                  <InputArabicComp
                    inputOne="ثمن السيارة:"
                    outputTwo={formdetails?.autoFinFinDetHamishJiddiyahRO}
                    inputTwo="هامش الجدية (ريال عماني)"
                    outputOne={formdetails?.autoFinFinDetVehicleCost}
                  />
                  <InputArabicComp
                    inputOne="مبلغ التمويل"
                    inputTwo=" نسبة الربح ٪ "
                    inputThree="عدد األقساط"
                    outputOne={formdetails?.autoFinFinDetFinanceAmount}
                    outputTwo={formdetails?.autoFinFinDetTenure}
                    outputThree={formdetails?.autoFinFinDetNoofInstalments}
                  />
                  <InputArabicComp
                    inputOne="مبلغ القسط الشهري (مبدئي)"
                    inputTwo="رسوم اإلجراءات"
                    outputOne={formdetails?.autoFinFinDetMonthlyPaymentsTentative}
                    outputTwo={formdetails?.autoFinFinDetNoofPayments}
                  />

                  <View style={{ flexDirection: 'row-reverse', gap: 3 }}>
                    <InputArabicComp
                      inputOne="الدخل الشهري"
                      inputTwo="تاريخ استالم الراتب"
                      outputOne={formdetails?.autoFinFinDetMonthlyIncomeSalary}
                      outputTwo={formdetails?.autoFinFinDetSalaryDayofeachmonth}
                    />
                    <Text style={styles.arabicText}>من كل شهر</Text>
                  </View>

                  <View style={styles?.arabicThirdRow}>
                    <Text style={styles?.arabicText}>طريقة الدفع</Text>
                    <CheckBoxComp direction={"rtl"} label={formdetails?.autoFinFinDetPaymentMethod?.value} val={formdetails?.autoFinFinDetPaymentMethod?.value} />
                    {/* <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}>
                        {formdetails?.autoFinFinDetPaymentMethod?.value ? (
                          <Text
                            style={{ fontSize: 7, width: '100%', height: '100%', backgroundColor: '#6E2585' }}
                          ></Text>
                        ) : null}
                      </View>
                      <Text style={styles.arabicText}>{formdetails?.autoFinFinDetPaymentMethod?.value}</Text>
                    </View> */}
                  </View>

                  <View style={{ flexDirection: 'row-reverse', gap: 30 }}>
                    <Text style={styles.arabicText}>في حالة التعليمات الدائمة - رقم الحساب:</Text>
                    <AccountBoxes length={15} data={formdetails?.autFinPayMethodsSIAccountNoifApplicable?.split('')} />
                  </View>

                  <View style={styles?.arabicThirdRow}>
                    <Text style={styles?.arabicText}>تحويل الراتب إلى بنك نزوى: </Text>
                    <CheckBoxComp direction={"rtl"} label={formdetails?.autoFinFinDetSalaryTransfertoBankNizwa?.value} val={formdetails?.autoFinFinDetSalaryTransfertoBankNizwa?.value} />
{/*
                    <View style={styles.checkboxRow}>
                      <View style={styles.smallCheckbox}>
                        {formdetails?.autoFinFinDetSalaryTransfertoBankNizwa?.value ? (
                          <Text
                            style={{ fontSize: 7, width: '100%', height: '100%', backgroundColor: '#6E2585' }}
                          ></Text>
                        ) : null}
                      </View>
                      <Text style={styles.arabicText}>
                        {formdetails?.autoFinFinDetSalaryTransfertoBankNizwa?.value}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column', width: '100%' }}>
              <Text
                style={{
                  ...styles.arabicTextHead,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingRight: '5px',
                }}
              >
                بيانات السيارة
              </Text>

              <View style={{ flexDirection: 'row', width: '100%' }}>
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
                      padding: 2,
                      gap: 5,
                      flexDirection: 'row-reverse',

                    }}
                  >



                                      <InputArabicComp
                    inputOne="الشركة المصنعة"
                    inputTwo="رقم اللوحة"
                    outputOne={formdetails?.autoFinVehInfManufacture}
                    outputTwo={formdetails?.autoFinVehInfRegistrationNo}
                  />


                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row-reverse', width: '100%'}}>
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
                      padding: 2,
                      gap: 5,
                      flexDirection: 'row-reverse',
                    }}
                  >
                                      <InputArabicComp
                    inputOne="الطراز"
                    outputOne={formdetails?.autoFinVehInfModel}
                  />
                                      <InputArabicComp
                    inputOne="المسافة المقطوعة"
                    outputOne={formdetails?.autoFinVehInfCarMileage}
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
                      padding: 2,
                      flexDirection: 'row-reverse'
                    }}
                  >
                                      <InputArabicComp
                    inputOne="النوع"
                    outputOne={formdetails?.autoFinVehInfVehicleType?.value || 'N/A'}
                  />

                                                        <InputArabicComp
                    inputOne="التاريخ المتوقع للتسليم"
                    outputOne={purposeDateOfDelivery || 'N/A'}
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
                      padding: 2,
                      flexDirection: 'row-reverse'
                    }}
                  >

                                                          <InputArabicComp
                    inputOne="اللون"
                    outputOne={formdetails?.autoFinVehInfColor || 'N/A'}
                  />


                                                                            <InputArabicComp
                    inputOne="اسم الوكيل/البائع"
                    outputOne={formdetails?.autoFinSelInfDealerSellerName || 'N/A'}
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
                      padding: 2,
                      flexDirection: 'row-reverse'
                    }}
                  >


                                                                              <InputArabicComp
                    inputOne="سنة الصنع"
                    outputOne={yearOfMake || 'N/A'}
                  />


                                                                              <InputArabicComp
                    inputOne="رقم هاتف الوكيل/البائع"
                    outputOne={formdetails?.autoFinSelInfDealerSellerPhoneNumber || 'N/A'}
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
                      padding: 2,
                      flexDirection: 'row-reverse'
                    }}
                  >

                                                                                                  <InputArabicComp
                    inputOne="رقم الشاصي"
                    outputOne={formdetails?.autoFinVehInfChassisNo || 'N/A'}
                  />

                                                                                                  <InputArabicComp
                    inputOne="رقم فاكس الوكيل/البائع"
                    outputOne={formdetails?.homeFinInHomeCountryMobile || 'N/A'}
                  />


                  </View>
                </View>
              </View>
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
                    padding: 2,
                    flexDirection: 'row-reverse',
                  }}
                >                                                          <InputArabicComp
                    inputOne="قم المحرك"
                    outputOne={formdetails?.autoFinVehInfEngineNo || 'N/A'}
                  />


                  <InputArabicComp
                    inputOne="قم المحرك"
                    outputOne={formdetails?.autoFinSelInfDealerSellerAddress || 'N/A'}
                  />

                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column', gap: 2 }}>
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
                <View style={{ flexDirection: 'column', gap: 2,borderLeft:"1px solid #6E2B8C",  borderTop: '1px solid #6E2B8C'  }}>
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
                        {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                          <View
                            style={{
                              padding: 2,
                              borderBottom: '1px solid #6E2585',
                              borderRight: '1px solid #6E2585',
                            }}
                          >
                            <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                              {item.autoFinBankRelBankName || 'N/A'}
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
                        {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                          <View
                            style={{
                              padding: 2,
                              borderBottom: '1px solid #6E2585',
                              borderRight: '1px solid #6E2585',
                            }}
                          >
                            <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                              {item?.autoFinBankRelBankAccountNumber || 'N/A'}
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
                        {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                          <View
                            style={{
                              padding: 2,
                              borderBottom: '1px solid #6E2585',
                              borderRight: '1px solid #6E2585',
                            }}
                          >
                            <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                              {item?.autoFinBankRelBankTypeofAccount?.value}
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
                        {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                          <View
                            style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}
                          >
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
            </View>
        </View>
      </View>
      <PdfFooter/>
            </Page>
          <Page size="A4" style={styles.page}>

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
                        width: '18%',
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
                        width: '35%',
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
                        width: '26%',
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
                        width: '26%',
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
                        width: '18%',
                        flexDirection: 'row-reverse',
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
                        width: '35%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >

                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelPersonalFinanceBank || 'N/A'}</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',

                        width: '26%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>
                        {formdetails?.autoFinBankRelPersonalFinanceAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '26%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>
                        {formdetails?.autoFinBankRelPersonalFinanceMonthlyPayment || 'N/A'}
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
                        width: '18%',
                      }}
                    >
                      <Text style={styles.arabicText}>تمويل السيارات</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '35%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelAutoFinanceBank || 'N/A'}</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '26%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>
                        {formdetails?.autoFinBankRelAutoFinanceAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '26%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelAutoFinanceMonthlyPayment || 'N/A'}</Text>
                    </View>
                  </View>

                  <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        padding: 2,
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '18%',
                      }}
                    >
                      <Text style={styles.arabicText}>بطاقة ائتمان</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '35%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelCreditCardBank || 'N/A'}</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '26%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelCreditCardMonthlyPayment || 'N/A'}</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '26%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelCreditCardMonthlyPayment || 'N/A'}</Text>
                    </View>
                  </View>

                  <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        padding: 2,
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '18%',
                      }}
                    >
                      <Text style={styles.arabicText}>تمويل منزلي</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '35%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelHomeFinanceBank || 'N/A'}</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '26%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>
                        {formdetails?.autoFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        alignItems: 'flex-end',
                        width: '26%',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}</Text>
                    </View>
                  </View>

                  <View style={{ ...styles.arabicText, flexDirection: 'row-reverse', width: '100%' }}>
                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        padding: 2,
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '18%',
                      }}
                    >
                      <Text style={styles.arabicText}>إلتزامات أخرى)تشمل الضمانات تجاه األطراف األخرى)</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '35%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelOtherLiabilityBank || 'N/A'}</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '26%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>
                        {formdetails?.autoFinBankRelOtherLiabilityAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '26%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>
                        {formdetails?.autoFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}
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
                        width: '18%',
                      }}
                    >
                      <Text style={styles.arabicText}>المجموع</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '35%',
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
                        width: '26%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}</Text>
                    </View>

                    <View
                      style={{
                        borderBottom: '1px solid #6E2B8C',
                        borderRight: '1px solid #6E2B8C',
                        ...styles.arabicText,
                        width: '26%',
                        alignItems: 'flex-end',
                        padding: 2,
                      }}
                    >
                      <Text style={[styles.input,{width:'100%'}]}>{formdetails?.autoFinBankRelTotalMonthlyPayment || 'N/A'}</Text>
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
                  <Text style={{ width: '50%', borderLeft: '1px solid #6E2585', padding: 2, ...styles.arabicTextHead }}>
                    في سلطنة عمان{' '}
                  </Text>
                  <Text style={{ width: '50%', padding: 2, ...styles.arabicTextHead }}>في الموطن األصلي )لغير ا</Text>
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
                    inputOne="الاسم"
                    outputOne={formdetails?.autoFinInOmanName || 'N/A'}
                  />


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


                                            <InputArabicComp
                    inputOne="الاسم"
                    outputOne={formdetails?.autoFinInautoCountryName || 'N/A'}
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
                        gap: 5,
                        flexDirection: 'row-reverse',
                      }}
                    >
                                            <InputArabicComp
                    inputOne="صلة القرابة"
                    outputOne={formdetails?.autoFinInOmanRelationship?.value || 'N/A'}
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
                    outputOne={formdetails?.autoFinInautoCountryRelationship?.value || 'N/A'}
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
                                                                  <InputArabicComp
                    inputOne="جهة العمل"
                    outputOne={formdetails?.autoFinInOmanEmployer || 'N/A'}
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
                    inputOne="جهة العمل"
                    outputOne={formdetails?.autoFinInautoCountryEmployer || 'N/A'}
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

                      <InputArabicComp
                    inputOne="العنوان"
                    outputOne={formdetails?.autoFinInOmanAddress || 'N/A'}
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
                    inputOne="العنوان"
                    outputOne={formdetails?.autoFinInautoCountryAddress || 'N/A'}
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
                                                                  <InputArabicComp
                    inputOne="رقم هاتف المكتب"
                    outputOne={formdetails?.autoFinInOmanOfficeTel || 'N/A'}
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
                    inputOne="رقم هاتف المكتب"
                    outputOne={formdetails?.autoFinInautoCountryOfficeTel || 'N/A'}
                  />

                    </View>{' '}
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

                                                                                        <InputArabicComp
                    inputOne="قم الهاتف النقال"
                    outputOne={formdetails?.autoFinInOmanMobile || 'N/A'}
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
                    inputOne="قم الهاتف النقال"
                    outputOne={formdetails?.autoFinInautoCountryMobile || 'N/A'}
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
                      يطلب مقدم الطلب من البنك أن يشتري عقارًا، وحينما يُعلِم البنك مقدم الطلب بأنه (البنك) قد اشترى
                      العقار ليبيعه فيما بعد لمقدم الطلب، يكون مقدم الطلب بموجب ذلك ملتزمًا بصفة نهائية وبدون قيد أو شرط
                      بشراء العقار من البنك باسم مقدم الطلب شخصيًا، وذلك وفقًا لبنود عقد التمويل "المرابحة".
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                    <Text style={styles.arabicText}> ٢.</Text>
                    <Text style={styles.arabicText}>
                      تكون دفعات مقدم الطلب والالتزامات الأخرى بموجب اتفاقية التمويل "المرابحة" مؤمنة برهن يمنحه مقدم
                      الطلب للبنك، وأية تأمينات أخرى حسب الحاجة.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                    <Text style={styles.arabicText}> ٣.</Text>
                    <Text style={styles.arabicText}>
                      لا يكون البنك ملزمًا بأي حال من الأحوال بشراء العقار إذا لم يستوفِ مقدم الطلب كافة الشروط السابقة
                      لعقد التمويل "المرابحة" أو أهمل في تنفيذ أي التزام آخر منصوص عليه في العقد.
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                    <Text style={styles.arabicText}> ٤.</Text>
                    <Text style={styles.arabicText}>
                      سيتم التعامل مع أي مبلغ يقوم مقدم الطلب بإيداعه لدى البنك أو أي من وكلائه كضمان (هامش جدية) من
                      مقدم الطلب لشراء العقار، وفي حالة نكوث مقدم الطلب بتعهده، سيكون البنك مخولًا ببيع العقار والتسوية
                      مقابل خسائره الفعلية بين سعر تكلفة العقار والسعر الذي تم بيعه به لاحقًا. بعد حسم مثل هذه الخسارة
                      من المبلغ المودع بواسطة مقدم الطلب، يقوم البنك برد المبلغ المتبقي من المبلغ المودع إلى مقدم الطلب
                      – إن وجد. وعلى العكس، يكون مقدم الطلب مسؤولًا عن أي نقص ينتج بين مبلغ الإيداع والخسائر الفعلية
                      للبنك في هذا الشأن.
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                    <Text style={styles.arabicText}> ٥.</Text>
                    <Text style={styles.arabicText}>
                      إن البنود المستخدمة في هذا التعهد بالشراء يجب أن تحمل نفس المعنى الذي تحمله تلك البنود الواردة في
                      عقد التمويل "المرابحة"
                    </Text>
                  </View>
                </View>
          </View>
          </View>
        {/* Declaratrion */}
        <PdfFooter/>
      </Page>
      <Page size="A4" style={styles.page}>

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
                      أوافق أنا/نوافق نحن بأن المعلومات الموضحة أعلاه هي صحيحة وكاملة، وإنني/إننا قد تسلمت/تسلمنا بنود
                      وشروط البنك العامة لعملية الحسابات والخدمات المصرفية الإلكترونية وتلك الشروط المعينة القابلة
                      للتطبيق والخاصة بنوع الحساب/التمويل الذي تم اختياره بواسطتي أنا/بواسطتنا نحن، إنني أدرك/إننا ندرك
                      ونوافق بوضوح ونقبل أن نكون مقيدين بها سواء وردت باللغة الإنجليزية و/أو باللغة العربية، إنني/إننا
                      سنقوم بالتأكيد على أن كافة التحويلات المالية المتوقعة المحولة من الخارج لحسابي/لحسابنا ستكون
                      مطابقة لشروط البنك المركزي العماني
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
                              ستمر في تحويل راتبي شهريًا ومباشرة من صاحب العمل إلى رقم حسابي (حساب البنك) المحتفظ به لدى
                              بنك نزوى (البنك) إلى أن يتم تسديد كافة الأموال المستحقة للبنك،
                            </Text>
                          </View>
                          <View style={styles.arabicThirdRow}>
                            <Text style={{ ...styles.arabicText }}>ii)</Text>
                            <Text style={{ ...styles.arabicText }}>
                              أقوم بإعلام البنك مباشرة إذا تركت عملي الحالي أو تقاعدت وأقوم بتزويد البنك برسالة تحويل
                              راتب جديدة في موعد أقصاه خمسة أيام عمل من تاريخ استئنافي للعمل لدى صاحب عمل جديد، وأقوم
                              بتعزيز الالتزام بالاستمرار في تحويل راتبي شهريًا ومباشرة من صاحب العمل الجديد إلى حساب
                              البنك المحتفظ به لدى البنك إلى أن يتم تسديد كافة الأموال المستحقة للبنك، وفي كل الأحوال لا
                              يعتبر ترك العمل سببًا مشروعًا لإخلالي بسداد الأقساط في موعدها.
                            </Text>
                          </View>
                          <View style={styles.arabicThirdRow}>
                            <Text style={styles.arabicText}>iii)</Text>
                            <Text style={styles.arabicText}>
                              تحويل مكافآت نهاية الخدمة الخاصة بي إلى حسابي في بنك نزوى
                            </Text>
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
                          <View style={styles.arabicThirdRow}>
                            <Text style={styles.arabicText}>ii)</Text>
                            <Text style={styles.arabicText}>إذا أصبحت مقيمًا في الخارج؛ أو</Text>
                          </View>
                          <View style={styles.arabicThirdRow}>
                            <Text style={styles.arabicText}>iii)</Text>
                            <Text style={styles.arabicText}>
                              إذا أصبحت موظفًا لدى شركة لن تقوم بتحويل راتبي مباشرة إلى الحساب البنكي كما هو مطلوب من
                              قبل البنك
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
                      ستكون هذه التعهدات خاضعة ومبنية وفقًا لقوانين سلطنة عمان وأوافق بشكل لا رجعة فيه وغير مشروط على
                      الولاية القضائية الحصرية لمحاكم مسقط، ما لم يقرر البنك خلاف ذلك.
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
                    <Text style={styles.arabicText}>٤. </Text>
                    <Text style={styles.arabicText}>
                      علاوة على ذلك، في حال صدور حكم ضدي لصالح البنك في المحاكم، أوافق بشكل لا رجعة فيه وغير مشروط على
                      تنفيذ هذا الحكم.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Disclaimer */}

              <View style={{ marginTop: 10 }}>
                <Text style={{ color: '#6E2585', ...styles.arabicTextHead, marginBottom: 2 }}>إخالء المسؤولية:</Text>
                <Text style={styles.arabicText}>
                  إخالء المسؤولية ً بإبداء ً أن البنك ليس ملزما ،ً علما ً على قبول الطلب. وسيقوم البنك بإبالغي بقراره
                  النهائي بخصوص طلب التمويل الحقا أقر بأنني على علم تام بأن تقديم المستندات المطلوبة مع استمارة طلب
                  التمويل ال تعني موافقة البنك تلقائيا األسباب في حالة عدم الموافقة على الطلب.
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
                          <Text
                            style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginLeft: 1, marginRight: 2 }}
                          >
                            يوم
                          </Text>
                          <Text
                            style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginRight: 3, marginLeft: 15 }}
                          >
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
                        borderRight: '1px solid #6E2585',
                        borderBottom: '1px solid #6E2585',
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

                <InputArabicComp inputOne="رقم العميل" outputOne=' ' />
                <InputArabicComp inputOne="الفرع" outputOne=' ' />
                <InputArabicComp inputOne="رمز PBO/DSR" outputOne=' ' />
                <InputArabicComp inputOne="اسم DSR/PBO Name" outputOne=' ' />
                <InputArabicComp inputOne="توقيع DSR/PBO Signature" outputOne=' ' />

                      </View>
                    </View>

                    <View
                      style={{
                        height: 'auto',
                        borderRight: '1px solid #6E2585',
                        borderLeft: '1px solid #6E2585',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        borderBottom: '1px solid #6E2585',
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
                        <Text style={styles.arabicTextHead}>توصية من</Text>



                                        <InputArabicComp inputOne="التوقيع" outputOne=' ' />
                                        <InputArabicComp inputOne="الاسم" outputOne=' ' />




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
