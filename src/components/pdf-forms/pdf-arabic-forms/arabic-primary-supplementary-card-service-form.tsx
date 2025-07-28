'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import applyStyles from '@mui/system/createTheme/applyStyles';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from '../account-number-boxes-component';
import { CheckBoxComp } from '../checkbox-component';
import { CustomDate } from '../custom-date';
import { InputComp } from '../input-component';
import { PdfFooter } from '../pdf-footer';
import { PdfHeader } from '../pdf-header';
import { PdfTable } from '../pdf-table-component';
import { InputArabicComp } from './arabic-input-component';
import { PdfArabicHeader } from './pdf-arabic-header';
import { CustomArabicDate } from './pdf-custom-arabic-date';

// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.
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
    fontSize:8,
    // marginBottom: 1,
    // marginTop: 'auto',
    flexGrow:1
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
    fontSize:8,
    // minWidth:'15%',

    // marginBottom: 1,
    // marginTop: 'auto',
    flexGrow:1
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

export function ArabicPrimarySupplementaryCardReqFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('here is our data', data?.creatdAt);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt)?.format('DDMMYYYY');
  const dateOfJoin = dayjs(formdetails?.createasrEmpDateOfJoiningdAt)?.format('DD/MM/YYYY');
  const passExpiry = dayjs(formdetails?.asrPassportExpiryDate)?.format('DD/MM/YYYY');
  return (
    <>
    <Page size="A4" style={styles.page}>
      <PdfArabicHeader formName={data?.form_name} />
      <View style={styles.column}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
          <CustomArabicDate date={formatedDate} />
        </View>

        <View style={{ flexDirection: 'column', gap: 2 }}>
          <Text style={{ ...styles.arabicText }}>
            مالحظة: الرجاء تعبئة هذا الطلب بخط واضح والتوقيع في الفراغ المخصص لذلك.
          </Text>
          <View style={{ flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
            {/* <InputArabicComp inputOne="توقيت الطلب: " /> */}
            <InputArabicComp inputOne="الفرع:" outputOne={formdetails?.primSuppCSRBranch?.value} />
            <View style={{ flexDirection: 'column', gap: 3 }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  width: '40%',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.arabicText}>نوع البطاقة:</Text>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    gap: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <CheckBoxComp
                    direction={'row-reverse'}
                    label={formdetails?.primSuppCSRCardType?.value}
                    val={formdetails?.primSuppCSRCardType?.value}
                  />
                  {/* <CheckBoxComp label="Credit Card" /> */}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                width: '40%',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.arabicText}>طبيعة البطاقة: </Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <CheckBoxComp
                  label={formdetails?.primSuppCSRCardRelationship?.value}
                  val={formdetails?.primSuppCSRCardRelationship?.value}
                />
                {/* <CheckBoxComp label="Supplementary " /> */}
              </View>
            </View>

            <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
              <Text style={styles.arabicText}>:البطاقة رق</Text>
              <AccountBoxes data={formdetails?.primSuppCSRCardNumber.split('')} />
            </View>

            <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
              <Text style={styles.arabicText}>:الحساب ر</Text>
              <AccountBoxes data={formdetails?.primSuppCSRAccountNumber.split('')} />
            </View>
            <View style={{width:'100%'}}>
            <InputArabicComp inputOne="رقم العميل:" outputOne={formdetails?.primSuppCSRCIFType} inputTwo="اسم حامل البطاقة:" outputTwo={formdetails?.primSuppCSRNameofCardholder}/>
</View>
            <View style={{  flexDirection: 'row-reverse', gap: '5px', marginTop: 5,alignItems:'flex-start'}}>
              <View style={{ width: '13%' }}>
                <Text style={styles.arabicText}>اسم حامل البطاقة:</Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', width: '87%',gap:5 }}>
                <View style={{ flexDirection: 'column-reverse', width: '5%' }}>
                                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRTitle?.value || "N/A"}</Text>
                                  <Text style={{...styles.arabicText }}>العنوان</Text>
                                </View>
                <View style={{ flexDirection: 'column-reverse', width: '32.6666666667%',alignItems:'flex-end' }}>
                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRFirstName || "N/A"}</Text>
                  <Text style={styles.arabicText}>اسم حامل البطاقة:</Text>
                </View>

                <View style={{ flexDirection: 'column-reverse', width: '32.6666666667%',alignItems:'flex-end' }}>
                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRSecondName || "N/A"}</Text>
                  <Text style={styles.arabicText}>اإلسم الثاني</Text>
                </View>

                <View style={{ flexDirection: 'column-reverse', width: '32.6666666667%',alignItems:'flex-end' }}>
                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRSurnameTribe || "N/A"}</Text>
                  <Text style={styles.arabicText}>العائلة/القبيلة</Text>
                </View>
              </View>
            </View>
          </View>
          <PdfTable
            direction={'arabic'}
            head="طلب الحصول على بطاقة أساسية/ إضافية* جديدة"
            body={
              <View style={{ flexDirection: 'column', gap: 4, padding: 5 }}>
                <View style={{ flexDirection: 'row-reverse', gap: 6 }}>
                  <CheckBoxComp
                    label={formdetails?.primSuppCSRCardRelationship?.value}
                    val={formdetails?.primSuppCSRCardRelationship?.value}
                  />
                </View>
                <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                  <Text style={styles.arabicText}> :*البطاقة على ا</Text>
                  {/* <AccountBoxes data={formdetails?.primSuppRNPSCNameonCard.split('')} /> */}
                  <InputArabicComp inputNine=" " outputNine={formdetails?.primSuppRNPSCNameonCard}/>
                </View>

                <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
                  <Text style={styles.arabicText}>:الجديدة البطاقة ر</Text>
                  <AccountBoxes length={14} />
                </View>
                <Text style={styles.arabicText}>*البطاقة اإلضافية سيتم تفعيلها من جانب حامل البطاقة األساسية.</Text>
              </View>
            }
          />

          {/* <PdfTable
            direction={'arabic'}
            head="تفاصيل طلب البطاقة "
            body={
              <>
                <View style={{ flexDirection: 'column', gap: 2, padding: 2, alignItems: 'flex-end', width: '100%' }}>
                  <CustomDate date={dayjs(formdetails?.csrCardRenewalByDate).format('DDMMYYYY')} />
                  <CheckBoxComp
                    direction={'arabic'}
                    label="إصدار رقم سري جديد
"
                    val={formdetails?.csrPinRegenerationReset}
                  />
                  <View style={{ flexDirection: 'column', alignItems: 'flex-end', width: '20%' }}>
                    <CheckBoxComp direction={'arabic'} label="تغيير العنوان ::" val={formdetails?.csrAddressChange} />
                    {formdetails?.csrAddressChange && (
                      <View style={{ flexDirection: 'column', gap: 2 }}>
                        <InputArabicComp
                          inputOne="ص. ب:"
                          outputOne={formdetails?.csrAddressChangePOBox}
                          inputTwo="الرمز البريدي:"
                          outputTwo={formdetails?.csrAddressChangePC}
                          inputThree="هاتف نقال: "
                          outputThree={formdetails?.csrAddressChangeGSM}
                          inputFour="هاتف المنزل: _"
                          outputFour={formdetails?.csrAddressChangeResTel}
                        />

                        <InputArabicComp inputOne="البريد اإللكتروني:" outputOne={formdetails?.csrAddressChangeEmail} />
                      </View>
                    )}
                  </View>

                  <View
                    style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end', gap: 30 }}
                  >
                    <CheckBoxComp
                      direction={'arabic'}
                      label="تحديث بيانات الراتب الشهري:"
                      val={formdetails?.csrUpdatedSalary}
                    />
                    {formdetails?.csrUpdatedSalary && (
                      <InputArabicComp outputOne={formdetails?.csrUpdatedSalaryAmount} inputOne=" " />
                    )}
                  </View>

                  <View
                    style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end', gap: 30 }}
                  >
                    <CheckBoxComp
                      direction={'arabic'}
                      label="تغيير حد البطاقة من ريال عماني"
                      val={formdetails?.csrUpdatedEmployerName}
                    />
                    {formdetails?.csrUpdatedEmployerName && (
                      <InputArabicComp outputOne={formdetails?.csrUpdatedEmployerNameTextField} inputOne=" " />
                    )}
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <CheckBoxComp
                      direction={'arabic'}
                      label="تغير نوع البطاقة االئتمانية "
                      val={formdetails?.csrCardLimitChange}
                    />
                    {formdetails?.csrCardLimitChange && (
                      <InputArabicComp
                        outputOne={formdetails?.csrCardLimitChangeTextField}
                        inputOne=" من"
                        // inputTwo="to" outputTwo="gfrgf"
                      />
                    )}
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <CheckBoxComp
                      direction={'arabic'}
                      label="تغير نوع البطاقة االئتمانية  "
                      val={formdetails?.csrChangeCreditCardType}
                    />
                    {formdetails?.csrChangeCreditCardType && (
                      <InputArabicComp
                        outputOne={formdetails?.csrChangeCreditCardTypeFrom?.value}
                        inputOne="من"
                        inputTwo="إلى"
                        outputTwo={formdetails?.csrChangeCreditCardTypeTo?.value}
                      />
                    )}
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <CheckBoxComp
                      direction={'arabic'}
                      label="إعادة اصدار كشف الحساب الشهري لشهر"
                      val={formdetails?.csrDuplicateMonthlyStatementFor}
                    />
                    {formdetails?.csrDuplicateMonthlyStatementFor && (
                      <InputArabicComp outputOne={formdetails?.csrDuplicateMonthlyStatementForTextField} inputOne=" " />
                    )}
                  </View>

                  <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <CheckBoxComp direction={'arabic'} label=" أخرى:" val={formdetails?.csrOthers} />
                    {formdetails?.csrOthers && (
                      <InputArabicComp outputOne={formdetails?.csrOthersTextField} inputOne=" " />
                    )}
                  </View>

                  <View style={{ flexDirection: 'row-reverse', gap: 10, color: '#6E2B8C', alignItems: 'center' }}>
                    <Text style={styles.arabicText}>استبدال البطاقة لألسباب التالية:</Text>
                    <CheckBoxComp
                      direction={'arabic'}
                      label={formdetails?.csrCardReplacementReason?.value}
                      val={formdetails?.csrCardReplacementReason?.value}
                    />
                  </View>
                </View>
              </>
            }
          /> */}

          <PdfTable
          direction={'rtl'}
              head="تفاصيل طلب البطاقة"
              body={
                <>
                  <View style={{ flexDirection: 'column', gap: 2, padding: 2 }}>
                    <View style={{flexDirection:'row-reverse',gap:5,alignItems:'flex-end'}}>
                    <CheckBoxComp direction={'rtl'} label="Card Renewal" val={formdetails?.csrCardRenewalByDateCheckBox}/>
                    {formdetails?.csrCardRenewalByDate ? <CustomDate date={dayjs(formdetails?.csrCardRenewalByDate).format('DDMMYYYY')} />:null }
                    </View>
                    <CheckBoxComp direction={'rtl'} label="إصدار رقم سري جديد" val={formdetails?.csrPinRegenerationReset} />
                    <View style={{ flexDirection: 'column' }}>
                      <CheckBoxComp direction={'rtl'} label="تغيير العنوان" val={formdetails?.csrAddressChange} />
                      {formdetails?.csrAddressChange && (
                        <View style={{ flexDirection: 'column', gap: 2,marginTop:2 }}>
                          <InputArabicComp
                            inputOne="ص. ب"
                            outputOne={formdetails?.csrAddressChangePOBox}
                            inputTwo="الرمز البريدي"
                            outputTwo={formdetails?.csrAddressChangePC}
                            inputThree="هاتف نقال"
                            outputThree={formdetails?.csrAddressChangeGSM}
                            inputFour="هاتف المنزل"
                            outputFour={formdetails?.csrAddressChangeResTel}
                          />

                          <InputArabicComp inputOne="البريد اإللكتروني" outputOne={formdetails?.csrAddressChangeEmail} />
                        </View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 2,width:"100%" }}>
                      <View style={{width:'25%'}}>
                      <CheckBoxComp direction={'rtl'} label="تحديث بيانات الراتب الشهري" val={formdetails?.csrUpdatedSalary} /></View>
                      {formdetails?.csrUpdatedSalary && (
                        <View style={{width:'75%',flexGrow:1}}>
                        <InputArabicComp outputOne={formdetails?.csrUpdatedSalaryAmount} inputOne=" " /></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', width:'100%' }}>
                      <View style={{width:'24%'}}>
                      <CheckBoxComp direction={'rtl'} label="تغيير حد البطاقة من ريال عماني" val={formdetails?.csrUpdatedEmployerName} /></View>
                      {formdetails?.csrUpdatedEmployerName && (
                        <View style={{width:'76%',flexDirection:'row-reverse',gap:3, alignItems:'center', flexGrow:1}}>
                          <View style={{minWidth:'10%',maxWidth:'25%'}}>
                          <CheckBoxComp direction={'rtl'} label={formdetails?.csrUpdatedEmployerNameSelectField?.value} val={formdetails?.csrUpdatedEmployerNameSelectField?.value}/></View>
                        <View style={{width:'75%',flexGrow:1}}><InputArabicComp outputOne={formdetails?.csrUpdatedEmployerNameTextField} inputOne=" " /></View></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 5, width:'100%' }}>
                      <View style={{width:'26%'}}>
                      <CheckBoxComp direction={'rtl'} label="تغير نوع البطاقة االئتمانية" val={formdetails?.csrCardLimitChange} /></View>
                      {formdetails?.csrCardLimitChange && (
                        <View style={{width:"74%"}}>
                        <InputArabicComp
                          outputSix={formdetails?.csrCardLimitChangeTextField}
                          inputSix=" "
                          n={85}
                          // inputTwo="to" outputTwo="gfrgf"
                        /></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 5, width:'100%' }}>
                      <View style={{width:'23%'}}>
                      <CheckBoxComp direction={'rtl'} label="تغير نوع البطاقة االئتمانية" val={formdetails?.csrChangeCreditCardType} /></View>
                      {formdetails?.csrChangeCreditCardType && (
                        <View style={{width:'77%'}}>
                        <InputArabicComp
                          outputOne={formdetails?.csrChangeCreditCardTypeFrom?.value}
                          inputOne="من"
                          inputTwo="إلى"
                          outputTwo={formdetails?.csrChangeCreditCardTypeTo?.value}
                        /></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 5, width:'100%' }}>
                      <View style={{width:'33%'}}>
                      <CheckBoxComp
                      direction={'rtl'}
                        label="إعادة اصدار كشف الحساب الشهري لشهر"
                        val={formdetails?.csrDuplicateMonthlyStatementFor}
                      /></View>
                      {formdetails?.csrDuplicateMonthlyStatementFor === true && (
                        <View style={{width:'77%'}}>
                        <InputArabicComp outputOne={dayjs(formdetails?.csrDuplicateMonthlyStatementForFrom).format('DD-MM-YYYY')} inputOne="من" inputTwo=":إلى" outputTwo={dayjs(formdetails?.csrDuplicateMonthlyStatementForTo).format('DD-MM-YYYY')} /></View>
                      )}
                    </View>

                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <CheckBoxComp label="other" val={formdetails?.csrOthers} />
                      {formdetails?.csrOthers && <InputComp outputOne={formdetails?.csrOthersTextField} inputOne=" " />}
                    </View> */}

                    <View style={{ flexDirection: 'row-reverse', gap: 10, color: '#6E2B8C', alignItems: 'center',width:'100%' }}>
                      {/* <Text style={styles.textFont}>Card Replacement Due to Following Reasons: </Text> */}
                      <View style={{width:'40%'}}>
                      <CheckBoxComp direction={'rtl'} label="استبدال البطاقة لألسباب التالية" val={formdetails?.csrCardReplacementReasonCheckBox}/></View>
                    {formdetails?.csrCardReplacementReason?.value && <View style={{width:'17%'}}><CheckBoxComp direction='rtl'
                        label={formdetails?.csrCardReplacementReason?.value}
                        val={formdetails?.csrCardReplacementReason?.value}
                      /></View>}
                      <View style={{width:'43%'}}>
                      <InputArabicComp inputOne=" " outputOne={formdetails?.csrOtherReplacementReason || "N/A"}/></View>

                    </View>
                  </View>
                </>
              }
            />

          {/*  */}
          <PdfTable
            direction={'arabic'}
            head="ربط / عدم ربط حساب البطاقة األساسي"
            body={
              <>
                <View style={{ flexDirection: 'column', gap: 4,padding:4 }}>
                  {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount && (
                    <View style={{ flexDirection: 'row-reverse', gap: 2, alignItems: 'center', paddingHorizontal: 2 }}>
                      <CheckBoxComp
                        direction={'rtl'}
                        label=" إضافة إضافة ربط الحساب رقم"
                        val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount}
                      />

                      <AccountBoxes data={formdetails?.csrAddLinkAccountTextField?.split('')} />
                      <Text style={styles.arabicText}>نوع الحساب: </Text>
                      <CheckBoxComp
                       direction={'rtl'}
                        label={formdetails?.csrAddLinkAccountSelectField?.value}
                        val={formdetails?.csrAddLinkAccountSelectField?.value}
                      />
                    </View>
                  )}

                  {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount && (
                    <View style={{ flexDirection: 'row-reverse', gap: 2, alignItems: 'center', paddingHorizontal: 2 }}>
                      <CheckBoxComp
                        direction={'arabic'}
                        label="عدم إضافة ربط الحساب رقم"
                        val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount}
                      />

                      <AccountBoxes data={formdetails?.csrRemoveLinkAccountTextField?.split('')} />
                      <Text style={styles.arabicText}>نوع الحساب: </Text>
                      <CheckBoxComp
                        label={formdetails?.csrRemoveLinkAccountSelectField?.value}
                        val={formdetails?.csrRemoveLinkAccountSelectField?.value}
                      />
                    </View>
                  )}
                  {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrChangeLinkAccount && (
                    <View style={{ flexDirection: 'column', gap: 1, padding: 2 }}>
                      <View style={{ flexDirection: 'row-reverse', gap: 2, alignItems: 'center' }}>
                        <CheckBoxComp direction={'arabic'} label="تغيير حساب الربط من حساب رقم" />
                        <AccountBoxes data={formdetails?.csrChangeLinkAccountFrom} />
                        <Text style={styles.arabicText}>إلى:</Text>
                      </View>
                      <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'center' }}>
                        <AccountBoxes data={formdetails?.csrChangeLinkAccountTo?.split('')} />
                        <Text style={{ fontSize: 8, color: '#6E2B8C' }}>نوع الحساب: </Text>
                        <CheckBoxComp
                          label={formdetails?.csrChangeLinkAccountSelectField?.value}
                          val={formdetails?.csrChangeLinkAccountSelectField?.value}
                        />
                      </View>
                    </View>
                  )}
                  {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount && (
                    <View style={{ flexDirection: 'column', gap: 1, padding: 2 }}>
                      <View style={{ flexDirection: 'row-reverse', gap: 2, alignItems: 'center' }}>
                        <CheckBoxComp
                          direction={'arabic'}
                          label="تغيير حساب الربط األساسي إلى حساب رقم"
                          val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount}
                        />
                        <AccountBoxes data={formdetails?.csrDefaultAccountTextField?.split('')} />
                      </View>
                      <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'center' }}>
                        <Text style={styles.arabicText}>نوع الحساب:</Text>
                        <CheckBoxComp
                          label={formdetails?.csrDefaultAccountSelectField?.value}
                          val={formdetails?.csrDefaultAccountSelectField?.value}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </>
            }
          />
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 8,marginBottom:20}}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Text style={styles.arabicText}>توقيع العميل </Text>
              <Text style={styles.input}></Text>
            </View>
            <CustomArabicDate />
          </View>






        </View>
      </View>



      <PdfFooter />

    </Page>
    <Page size="A4" style={styles.page}>
       <PdfTable
            direction={'arabic'}
            head="طلب تغيير حدود السحب من منافذ البيع/ السحب النقدي/ تحويل المبالغ لبطاقات الحسم الفوري"
            body={
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                  <View
                    style={{
                      width: '25%',
                      padding: 4,
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      backgroundColor: '#C0C0C0',
                      borderBottom: '1px solid #6E2B8C',
                      // borderLeft: '1px solid #6E2B8C',
                    }}
                  >
                    <Text style={styles.arabicTextHead}>الشبكة</Text>
                  </View>

                  <View
                    style={{
                      width: '25%',
                      padding: 4,
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      backgroundColor: '#C0C0C0',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <Text style={styles.arabicTextHead}> نوع المعاملة</Text>
                  </View>

                  <View
                    style={{
                      width: '25%',
                      padding: 4,
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      backgroundColor: '#C0C0C0',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <Text style={styles.arabicTextHead}> الحد اليومي ر.ع</Text>
                  </View>

                  <View
                    style={{
                      width: '25%',
                      padding: 4,
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      backgroundColor: '#C0C0C0',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <Text style={styles.arabicTextHead}>عدد المعامالت في اليوم الواحد</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                  <View
                    style={{
                      width: '25%',
                      justifyContent: 'center',
                      // padding: 4,
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      // borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                      <Text style={styles.arabicText}>بنك نزوى</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',
                      // padding: 4,
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={styles.arabicText}>السحب النقدي</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={styles.arabicText}>تحويل المبالغ</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',

                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrOnUsBankNizwaCashUsageDailyLimit || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrOnUsBankNizwaFundUsageDailyLimit || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',

                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: "1px solid #6E2B8C",
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrOnUsBankNizwaCashNoOfFreqPerDay || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}> {formdetails?.csrOnUsBankNizwaFundNoOfFreqPerDay || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                  <View
                    style={{
                      width: '25%',
                      justifyContent: 'center',
                      // padding: 4,
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      // borderRight: '1px solid #6E2B8C',
                      // borderLeft: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                      <Text style={styles.arabicText}>ماستركارد</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',
                      // padding: 4,
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',
                      // borderLeft: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={styles.arabicText}>نقاط البيع</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={styles.arabicText}>السحب النقدي</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',

                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: '1px solid #6E2B8C',

                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrMasterCardPOSUsageDailyLimit || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrMasterCardCashUsageDailyLimit || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',

                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      borderBottom: '1px solid #6E2B8C',
                      borderRight: "1px solid #6E2B8C",
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrMasterCardPOSNoOfFreqPerDay || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrMasterCardCashNoOfFreqPerDay || 'N/A'}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
                  <View
                    style={{
                      width: '25%',
                      justifyContent: 'center',
                      // padding: 4,
                      textAlign: 'center',
                      color: '#6E2B8C',
                      // borderBottom: "1px solid #6E2B8C",
                      // borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                      <Text style={styles.arabicText}>شبكة عمان</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',
                      // padding: 4,
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      // borderBottom: "1px solid #6E2B8C",
                      borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={styles.arabicText}>نقاط البيع</Text>
                      </View>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={styles.arabicText}>السحب النقدي</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={styles.arabicText}> تحويل المبالغ</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',

                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                      // borderBottom: "1px solid #6E2B8C",
                      borderRight: '1px solid #6E2B8C',
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrOmannetPOSUsageDailyLimit || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrOmannetCashUsageDailyLimit || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>
                          {formdetails?.csrOmannetFundTransferUsageDailyLimit || 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '25%',
                        borderRight: '1px solid #6E2B8C',
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: '#6E2B8C',
                    }}
                  >
                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrOmannetPOSCashNoOfFreqPerDay || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          borderBottom: '1px solid #6E2B8C',
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>{formdetails?.csrOmannetCashUsageDailyLimit || 'N/A'}</Text>
                      </View>
                      <View
                        style={{
                          padding: 1,
                          textAlign: 'center',
                          color: '#6E2B8C',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ fontSize: 8 }}>
                          {formdetails?.csrOmannetFundTransferNoOfFreqPerDay || 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            }
          />
          <View style={{ flexDirection: 'row-reverse', gap: 5, width: '100%', alignItems: 'center' }}>
            <View style={{ width: '40%', flexDirection: 'row-reverse', gap: 5, alignItems: 'center' }}>
              <CheckBoxComp label={formdetails?.csrSelectDuration?.value} val={formdetails?.csrSelectDuration?.value} />
            </View>
            <View
              style={{ flexDirection: 'row-reverse', width: '60%', alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <InputArabicComp inputOne=" " outputOne={formdetails?.csrSelectDurationTempFrom || 'N/A'} />
              <InputArabicComp inputOne="إلى" outputOne={formdetails?.csrSelectDurationTempTo || 'N/A'} />
            </View>
          </View>
          <PdfTable
            direction={'arabic'}
            head="حد بطاقة االئتمان اإلضافية يومي"
            body={
              <View
                style={{
                  flexDirection: 'row-reverse',

                  width: '100%',
                }}
              >
                <View style={{ flexDirection: 'row-reverse', width: '50%' }}>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderLeft: '1px solid #6E2585' }}>
                      <Text style={styles.arabicText}>عدد المعامالت / نقاط البيع</Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderLeft: '1px solid #6E2585' }}>
                      <Text style={styles.arabicText}>عدد المعامالت/ السحب النقدي</Text>
                    </View>
                    <View style={{ padding: 2, borderLeft: '1px solid #6E2585' }}>
                      <Text style={styles.arabicText}>{"المبلغ المسموح/\nنقاط البيع لكل معاملة"}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585'}}>
                      <Text style={styles.arabicText}>{formdetails?.csrRetailPOSTraxFrequency || 'N/A'}</Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585' }}>
                      <Text style={styles.arabicText}>{formdetails?.csrATMCashTraxFrequency || 'N/A'}</Text>
                    </View>
                    <View style={{ padding: 2}}>
                      <Text style={styles.arabicText}>{formdetails?.csrRetailPOSAmountPerTransaction || 'N/A'}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row-reverse', width: '50%' }}>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' , borderLeft: '1px solid #6E2585'}}>
                      <Text style={styles.arabicText}>حد المبلغ/ نقاط البيع</Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', borderLeft: '1px solid #6E2585' }}>
                      <Text style={styles.arabicText}>حد المبلغ/ السحب النقدي</Text>
                    </View>
                    <View style={{ padding: 2, borderRight: '1px solid #6E2585' , borderLeft: '1px solid #6E2585'}}>
                      <Text style={styles.arabicText}>لمبلغ المسموح/ للسحب النقدي لكل معاملة</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', width: '50%' }}>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585' }}>
                      <Text style={styles.arabicText}>{formdetails?.csrRetailPOSAmount || 'N/A'}</Text>
                    </View>
                    <View style={{ padding: 2, borderBottom: '1px solid #6E2585' }}>
                      <Text style={styles.arabicText}>{formdetails?.csrATMCashAmount || 'N/A'}</Text>
                    </View>
                    <View style={{ padding: 2 }}>
                      <Text style={styles.arabicText}>{formdetails?.csrATMCashAmountPerTransaction || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              </View>
            }
          />

          <PdfTable
            direction={'arabic'}
            head="*طلب إلغاء البطاقة"
            body={
              <View style={{ flexDirection: 'column', gap: 2, paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={styles.arabicText}>يرجى طلب إلغاء بطاقتي لألسباب التالية:</Text>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                  <View style={{marginLeft:63}}>
                  <CheckBoxComp direction={'arabic'} label="خدمات البطاقة" val={formdetails?.csrCardService} /></View>
                  <CheckBoxComp
                    direction={'arabic'}
                    label="نقل راتبي إلى بنك آخر"
                    val={formdetails?.csrTransferMySalaryToAnotherBank}
                  />
                </View>

                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                  <CheckBoxComp
                    direction={'arabic'}
                    label="طلب تمويل أعلى"
                    val={formdetails?.csrRequestForFinanceTopUp}
                  />
                  <CheckBoxComp direction={'arabic'} label="خدمة العمالء " val={formdetails?.csrCustomerService} />
                </View>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
                  <CheckBoxComp direction={'arabic'} label="الرسوم والتكاليف" val={formdetails?.csrFeesAndChanges} />
                </View>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
                  <CheckBoxComp
                    direction={'arabic'}
                    label="إضافية بطاقة / العالقة إ"
                    val={formdetails?.csrCancelRelationshipAdditionalCard}
                  />
                  <View style={{ flexDirection: 'row-reverse', gap: 1, alignItems: 'center' }}>
                    <Text style={styles.arabicText}>:البطاقة رقم </Text>
                    {/* <AccountBoxes data={formdetails?.csrCancelRelationshipAdditionalCardTextField.split('')} /> */}
                  </View>
                </View>
                <View style={{ flexDirection: 'row-reverse', width:'100%',gap:5,alignItems:'center' }}>
                                <View style={{width:'19%'}}>
                                <CheckBoxComp direction={'rtl'} label="Customer Request" val={formdetails?.csrCardCancellationOthers} /></View>
                                {formdetails?.csrCardCancellationOthersTextField && <View style={{width:'81%'}}>
                                <InputArabicComp inputOne=" " outputOne={formdetails?.csrCardCancellationOthersTextField}/></View>
                             } </View>

                {/* <View style={{ flexDirection: 'row-reverse', gap: 2, alignItems: 'center' }}>
                  <CheckBoxComp direction={'arabic'} label="سبب آخر: " val={formdetails?.csrCardCancellationOthers} />
                  <Text style={styles.input}>{formdetails?.csrCardCancellationOthersTextField}</Text>
                </View> */}
                <Text style={styles.arabicText}>
                  أؤكد أنني على دراية كاملة، وسأكون مسؤولاً عن أي معاملات غير مصرح بها أو احتيالية يتم خصمها من بطاقتي،
                  ما لم أكن قد قدمت طلب الإلغاء أو الحجب للبنك مسبقًا.
                </Text>
              </View>
            }
          />

          <PdfTable
            direction={'arabic'}
            head="إقرار"
            body={
              <View style={{ padding: 4 }}>
                <Text style={styles.arabicText}>
                  موجب هذا، نقر بأننا سنتحمل المسؤولية الكاملة ونعوض بنك نزوى عن أي مطالبة أو خسارة أو تكلفة أو ضرر أو
                  مصروفات ناتجة عن زيادة الحد الائتماني لبطاقة بنك نزوى أو استخدام البطاقة عبر الإنترنت أو سوء الاستخدام
                  أو السرقة أو الاحتيال أو الإهمال أو سوء النية أو أي استخدام غير قانوني للبطاقة، ولن يكون البنك مسؤولاً
                  تحت أي ظرف من الظروف عن هذه الأمور. كما أؤكد أنني أتحمل المسؤولية الكاملة عن أي معاملة غير مصرح بها أو
                  احتيالية تم خصمها من بطاقتي قبل أن أقدم طلب إلغاء أو حجب البطاقة للبنك.
                </Text>
              </View>
            }
          />
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 5 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Text style={styles.arabicText}>توقيع العميل</Text>
              <Text style={styles.input}></Text>
            </View>
            <CustomArabicDate />
          </View>
    </Page>
    <Page size="A4" style={styles.page}>

          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              // alignItems: 'center',
              width: '100%',
              backgroundColor: '#FFFACD',
              padding: '5px',
            }}
          >
            <View style={{ flexDirection: 'column', gap: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ ...styles.arabicTextHead, color: '#56004E' }}>الستخدام الفرع فقط</Text>
            </View>
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <View style={{ flexDirection: 'row-reverse', gap: 5,width:'100%' }}>
                <View style={{ flexDirection: 'row-reverse',width:'50%' }}>
                  <Text style={styles.arabicText}>اسم / رقم الموظف:</Text>
                  <Text style={styles.input}></Text>
                </View>
                <View style={{ flexDirection: 'row-reverse',width:'50%' }}>
                  <Text style={styles.arabicText}> التوقيع :</Text>
                  <Text style={styles.input}></Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between',width:'100%' }}>
                <CustomArabicDate />
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center',width:'50%',gap:5 }}>
                  <Text style={styles.arabicText}>وقيع مدير الفرع / مساعد مدير الفرع والختم</Text>

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
              padding: '4px',
              backgroundColor: '#FFFACD',
              marginTop:5
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                gap: 2,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...styles.arabicTextHead, color: '#56004E' }}>الستخدام الفرع فقط</Text>
            </View>
            <View style={{ flexDirection: 'row-reverse', gap: 150, paddingTop: 10 }}>
              <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row-reverse', gap: 10, justifyContent: 'flex-start' }}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>

                      <Text style={styles.arabicText}>تمت المراجعة بواسطة:</Text>
                    </View>
                    <Text style={{borderBottom:"1px solid #56004E", width:'50px'}}></Text>

                </View>

                <View style={{ flexDirection: 'row-reverse', gap: 30 }}>
                  <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>

                        <Text style={styles.arabicText}> تم التحقق من البيانات المقدمة واعتمدت من قبل :</Text>
                      </View>
                      <Text style={{borderBottom:"1px solid #56004E", width:'50px'}}></Text>

                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '150px',
                  height: '60px',
                  flexDirection: 'column',
                  padding: 2,
                  border: '1px solid #56004E',
                }}
              >
                <Text style={styles.arabicText}>تاريخ ووقت االستالم والختم</Text>
              </View>
            </View>
          </View>
          <PdfFooter/>
      </Page></>
  );
}
