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
          text: 'Charges and Commissions : ',
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
          subClause: [],
        },

        {
          isClosure: true,
          text: 'This Demand Draft is the sole property of the Bank and normally is valid for a maximum period of 6 months. The Purchaser should not amend or alter it. It should be duly validated by the Bank.',
          subClause: [],
        },

        {
          isClosure: true,
          text: 'The Demand Draft should be handled safely and in case of loss of the draft, the purchaser should immediately inform the Bank. Refund will be considered only after confirmation of the stop payment instruction received from the Drawee Bank.',
          subClause: [],
        },

        {
          isClosure: true,
          text: 'I/We indemnify the Bank and the Bank is not liable for immediate refund if the Draft is lost or stolen and the Bank and it’s Correspondent are not liable for any fraudulent encashment. It is further understood that the Bank chooses its Correspondent at my/our risk and responsibility. I/We also declare that the issuing Bank shall not be liable for any compensation in respect of delay in encashment of the Draft by Drawee Bank including those caused by the variations of signature or missing drawing advices.',
          subClause: [],
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
    fontSize: 6,
    color: '#6E2B8C',
    // marginTop: 2,
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
    // color: '#6E2B8C',
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
    // textAlign:"right"
  },
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 6,
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

export function LetterOfGuaranteePDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
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

        <View style={{ flexDirection: 'row', width: '100%', gap: 5 }}>
          <View style={{ flexDirection: 'column', width: '50%', padding: 4 }}>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              <View style={{ flexDirection: 'column', gap: 2 }}>
                <InputComp inputOne="Branch" outputOne={formdetails?.letterGuartAppBranch?.value} />
                <CustomDate date={formatedDate} />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textFont}>
                  Kindly issue an Irrevocable Letter of Guarantee for our account and;
                </Text>
                <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                  <Text style={styles.textFont}>responsibility </Text>
                  <CheckBoxComp
                    label={formdetails?.letterGuartAppChooseOption?.value}
                    val={formdetails?.letterGuartAppChooseOption?.value}
                  />
                  {formdetails?.letterGuartAppInternationalCountrySelect && (
                    <CheckBoxComp
                      val={formdetails?.letterGuartAppInternationalCountrySelect?.value}
                      label={formdetails?.letterGuartAppInternationalCountrySelect?.value}
                    />
                  )}
                  <CheckBoxComp
                    label={formdetails?.letterGuartAppChooseLanguage?.value}
                    val={formdetails?.letterGuartAppChooseLanguage?.value}
                  />
                </View>
                <Text style={styles.textFont}>per details given below: (Instructions marked (X) to be followed)</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', width: '50%', padding: 4,justifyContent:'space-between',gap:2 }}>
            <View style={{ flexDirection: 'row', width: '100%', border: '1px solid #6E2B8C' }}>
              <View style={{ flexDirection: 'column', width: '50%' }}>
                <Text
                  style={{
                    ...styles.textFont,
                    borderBottom: '1px solid #6E2B8C',
                    padding: 2,
                    borderRight: '1px solid #6E2B8C',
                  }}
                >
                  Application Ref No.
                </Text>
                <Text style={{ ...styles.textFont, padding: 2, borderRight: '1px solid #6E2B8C' }}>G</Text>
              </View>
              <View style={{ flexDirection: 'column', width: '50%' }}>
                <Text style={{ ...styles.textFont, borderBottom: '1px solid #6E2B8C', padding: 2 }}>
                  For Bank Use Only
                </Text>
                <View style={{ paddingHorizontal: 2 }}>
                  <InputComp inputOne="L/G No" />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'column', marginTop: 3, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Text style={{ ...styles.arabicText }}>
                و أن تصميل لضباط وعلى كامل مسؤولياً تحليل ضمان غير فاعل النقص
              </Text>
              <View style={{ flexDirection: 'row', gap: 3 }}>
                <CheckBoxComp
                  // direction="arabic"
                  label={formdetails?.letterGuartAppChooseOption?.value}
                  val={formdetails?.letterGuartAppChooseOption?.value}
                />
                {formdetails?.letterGuartAppInternationalCountrySelect && (
                  <CheckBoxComp
                    val={formdetails?.letterGuartAppInternationalCountrySelect?.value}
                    label={formdetails?.letterGuartAppInternationalCountrySelect?.value}
                  />
                )}

                <CheckBoxComp
                  label={formdetails?.letterGuartAppChooseLanguage?.value}
                  val={formdetails?.letterGuartAppChooseLanguage?.value}
                />
              </View>

              <Text style={styles.arabicText}>(نمو علامة ولا على الدمج المطلوب)</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', maxWidth: '50%', padding: 4, gap: 4 }}>
            <InputComp
              // n={40}
              inputNine={`Applicant Name/Behalf Of`}
              outputNine={formdetails?.letterGuartAppApplicantDetailsNameonBehalf || 'N/A'}
            />
            <InputComp
              inputNine={`Applicant Address`}
              outputNine={formdetails?.letterGuartAppApplicantDetailsAddress || 'N/A'}
            />
            <InputComp
              inputOne="Telephone Number"
              outputOne={formdetails?.letterGuartAppApplicantDetailsInstructingTelphoneNo || 'N/A'}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              width: '50%',
              padding: 4,
              // alignItems: 'flex-end',
              // justifyContent: 'flex-end',
              gap: 4,
            }}
          >
            <InputArabicComp
              inputNine={`مقدم الطلب/ بالإيام عن`}
              outputNine={formdetails?.letterGuartAppApplicantDetailsNameonBehalf || 'N/A'}
            />
            {/* <InputArabicComp inputOne=":العنوان" outputOne={formdetails?.letterGuartAppApplicantDetailsAddress} /> */}
            <InputArabicComp
              inputNine="العنوان"
              outputNine={formdetails?.letterGuartAppApplicantDetailsAddress || 'N/A'}
            />
            <InputArabicComp
              inputOne="رقم الهاتف"
              outputOne={formdetails?.letterGuartAppApplicantDetailsInstructingTelphoneNo || 'N/A'}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', maxWidth: '50%', padding: 4, gap: 4 }}>
            <InputComp
              // n={40}
              inputNine={`Instructing Party Name`}
              outputNine={formdetails?.letterGuartAppApplicantDetailsInstructingPartyName || 'N/A'}
            />
            <InputComp
              inputNine="Instructing Party Address"
              outputNine={formdetails?.letterGuartAppApplicantDetailsInstructingPartyAddress || 'N/A'}
            />
            <InputComp
              inputOne="Telephone Number"
              outputOne={formdetails?.letterGuartAppApplicantDetailsInstructingTelphoneNo || 'N/A'}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              width: '50%',
              padding: 4,
              // alignItems: 'flex-end',
              // justifyContent: 'flex-end',
              gap: 4,
            }}
          >
            <InputArabicComp
              inputNine={` اسم الطرف المُصدِر للتعليمات عن`}
              outputNine={formdetails?.letterGuartAppApplicantDetailsNameonBehalf || 'N/A'}
            />
            {/* <InputArabicComp inputOne=":العنوان" outputOne={formdetails?.letterGuartAppApplicantDetailsAddress} /> */}
            <InputArabicComp
              inputNine="عنوان الطرف المُصدر للتعليمات"
              outputNine={formdetails?.letterGuartAppApplicantDetailsInstructingPartyAddress || 'N/A'}
            />
            <InputArabicComp
              inputOne="رقم الهاتف"
              outputOne={formdetails?.letterGuartAppApplicantDetailsInstructingTelphoneNo || 'N/A'}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <InputComp
              inputNine={`Beneficiary Name`}
              outputNine={formdetails?.letterGuartAppBeneficiaryDetailsBeneficiaryName || 'N/A'}
            />
            <InputComp
              inputNine={`Beneficiary Address`}
              outputNine={formdetails?.letterGuartAppBeneficiaryDetailsAddress || 'N/A'}
            />
            <InputComp
              inputOne={`Telephone Number`}
              outputOne={formdetails?.letterGuartAppBeneficiaryDetailsTelephone || 'N/A'}
            />
            <View style={{ flexDirection: 'row', gap: 1 }}>
              <InputComp
                inputOne="Postal Code:"
                outputOne={formdetails?.letterGuartAppBeneficiaryDetailsPostalCode || 'N/A'}
              />
              <InputComp inputOne="P.O. Box:" outputOne={formdetails?.letterGuartAppBeneficiaryDetailsPOBox || 'N/A'} />
            </View>
            <View style={{ flexDirection: 'row', gap: 1 }}>
              {/* <InputComp inputOne="Telephone:" outputOne={formdetails?.letterGuartAppBeneficiaryDetailsTelephone || "N/A"} inputTwo="Fax:" outputTwo={formdetails?.letterGuartAppBeneficiaryDetailsFax || "N/A"}/> */}
              {/* <InputComp  /> */}
            </View>
          </View>

          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <InputArabicComp
              inputNine={`اسم لمستهدف`}
              outputNine={formdetails?.letterGuartAppBeneficiaryDetailsBeneficiaryName}
            />
            <InputArabicComp inputNine="عنوان المستفيد" outputNine={formdetails?.letterGuartAppBeneficiaryDetailsAddress} />
            <InputArabicComp
              inputOne={`رقم الهاتف`}
              outputOne={formdetails?.letterGuartAppBeneficiaryDetailsTelephone || 'N/A'}
            />
            <View style={{ flexDirection: 'row-reverse', gap: 1 }}>
              <InputArabicComp
                inputOne="المركز الرئيسي"
                outputOne={formdetails?.letterGuartAppBeneficiaryDetailsPostalCode || 'N/A'}
              />
              <InputArabicComp
                inputOne="صندوق البريد: "
                outputOne={formdetails?.letterGuartAppBeneficiaryDetailsPOBox || 'N/A'}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4, justifyContent: 'flex-start' }}>
            <Text style={{ fontFamily: 'Times-Bold', ...styles.textFont }}>Types of Guarantee</Text>
            {/* <View style={{flexDirection:'row', alignItems:'center'}}></View> */}
            <CheckBoxComp
              label={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuarantee?.value}
              val={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuarantee?.value}
            />
            {formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuaranteeOther && (
              <InputComp
                inputNine="Other"
                outputNine={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuaranteeOther}
              />
            )}
            {/* <CheckBoxComp label="Other Specify:" val={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuaranteeOther} /> */}
            {/* <CheckBoxComp label="Performance Bond Guarantee" />
            <CheckBoxComp label="Advance Payment Guarantee" />

            <CheckBoxComp label="Other Specify:" /> */}
          </View>

          <View
            style={{
              flexDirection: 'column',
              width: '50%',
              padding: 4,
              gap: 4,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Text style={{ ...styles.arabicText }}>نوع الضمان:</Text>
            <CheckBoxComp
              direction={'arabic'}
              label={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuarantee?.value}
              val={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuarantee?.value}
            />
            {formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuaranteeOther && <InputArabicComp
              inputNine="أخرى"
              outputNine={formdetails?.letterGuartAppBeneficiaryDetailsTypeOfGuaranteeOther}
            />}


            {/* <CheckBoxComp label="Performance Bond Guarantee" />
            <CheckBoxComp label="Payment Guarantee" />
            <CheckBoxComp label="Advance Payment Guarantee" />
            <CheckBoxComp label="Other Specify:" /> */}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderBottom: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={styles.textFont}>Currency in figures:</Text>
              {formdetails?.letterGuartAppAddtionalDetailsCurreny?.map((item: any, index: number) => (
                <Text key={index} style={styles.inputLine}>
                  {item.value},
                </Text>
              ))}
            </View>

            <InputComp
              n={40}
              inputEight="Amount  in figures:"
              outputEight={formdetails?.letterGuartAppAddtionalDetailsAmountinFigures || 'N/A'}
            />
            <InputComp
              inputNine="In words:"
              outputNine={formdetails?.letterGuartAppAddtionalDetailsAmountinWords || 'N/A'}
            />
            <View style={{ flexDirection: 'row', gap: 1, width: '100%' }}>
              <View style={{ width: '65%' }}>
                <InputComp
                  inputOne="represents"
                  outputOne={formdetails?.letterGuartAppAddtionalDetailsContractValueinPer || 'N/A'}
                />
              </View>
              <View style={{ width: '35%' }}>
                <Text style={styles.textFont}> % of the contract value</Text>
              </View>
            </View>
            <InputComp
              // n={45}
              inputNine="purpose Project"
              outputNine={formdetails?.letterGuartAppAddtionalDetailsPurposeProject || 'N/A'}
            />
          </View>

          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
              <Text style={styles.arabicText}> المناخ والصفة بالأرقام</Text>
              {formdetails?.letterGuartAppAddtionalDetailsCurreny?.map((item: any, index: number) => (
                <Text key={index} style={styles.inputLine}>
                  {item.value},
                </Text>
              ))}
            </View>
            <InputArabicComp
              n={40}
              inputSix="المناخ والصفة بالأرقام"
              outputSix={formdetails?.letterGuartAppAddtionalDetailsAmountinFigures || 'N/A'}
            />
            {/* <InputArabicComp
              inputOne="المناخ والصفة بالأرقام"
              outputOne={formdetails?.letterGuartAppAddtionalDetailsAmountinFigures}
            /> */}
            <InputArabicComp
              inputNine="بالحروف"
              outputNine={formdetails?.letterGuartAppAddtionalDetailsAmountinWords || 'N/A'}
            />
            <View style={{ flexDirection: 'row-reverse', width: '100%', gap: 2, alignItems: 'flex-end' }}>
              <View style={{ width: '75%', flexGrow: 1 }}>
                <InputArabicComp
                  inputOne="بحثاً نسبة "
                  outputOne={formdetails?.letterGuartAppAddtionalDetailsContractValueinPer || 'N/A'}
                />
              </View>
              <View style={{ width: '25%' }}>
                <Text style={styles.arabicText}>% من قيمة الصفة</Text>
              </View>
            </View>
            <InputArabicComp
inputNine={`(اسم المشروع)\nغرض الضمان`}

              outputNine={formdetails?.letterGuartAppAddtionalDetailsPurposeProject || 'N/A'}
            />
          </View>
        </View>

        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        {/* FIXED: fontFmily -> fontFamily, proper alignment, RTL support */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
            // borderLeft: '1px solid #6E2B8C',
            // borderBottom: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <CheckBoxComp
                label="Valid From:"
                val={dayjs(formdetails?.letterGuartAppAddtionalDetailsValidFrom).format('MM-DD-YYYY')}
              />
              {/* <InputComp inputOne="To" /> */}
              <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Text style={styles.input}>
                  {dayjs(formdetails?.letterGuartAppAddtionalDetailsValidFrom).format('DD-MM-YYYY') || 'N/A'}
                </Text>
                <Text style={styles.textFont}>Untill</Text>
                <Text style={styles.input}>
                  {dayjs(formdetails?.letterGuartAppAddtionalDetailsValidUntil).format('DD-MM-YYYY') || 'N/A'}
                </Text>
              </View>
            </View>
            <CheckBoxComp
              label="Renewables Automatically"
              val={formdetails?.letterGuartAppAddtionalDetailsRenewableAutomatically}
            />
          </View>

          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <View style={{ flexDirection: 'row-reverse', gap: 2 }}>
              <CheckBoxComp
                direction={'arabic'}
                label="صالح من"
                val={dayjs(formdetails?.letterGuartAppAddtionalDetailsValidFrom).format('MM-DD-YYYY')}
              />
              {/* <InputComp inputOne="To" /> */}
              <View style={{ flexDirection: 'row-reverse', gap: 1, alignItems: 'flex-end' }}>
                <Text style={styles.input}>
                  {dayjs(formdetails?.letterGuartAppAddtionalDetailsValidFrom).format('DD-MM-YYYY') || 'N/A'}
                </Text>
                <Text style={styles.arabicText}>لغاية</Text>
                <Text style={styles.input}>
                  {dayjs(formdetails?.letterGuartAppAddtionalDetailsValidUntil).format('DD-MM-YYYY') || 'N/A'}
                </Text>
              </View>
            </View>
            <CheckBoxComp
              direction={'arabic'}
              label="تمديد بشكل تلقائي"
              val={formdetails?.letterGuartAppAddtionalDetailsRenewableAutomatically}
            />
          </View>
        </View>

        {/* First Section: Text of Guarantee */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 8, fontFamily: 'Times-Bold' }}>
              Text of guarantee to be issued
            </Text>
            <CheckBoxComp
              label={formdetails?.letterGuartAppAddtionalDetailsTextofGuarantee?.value}
              val={formdetails?.letterGuartAppAddtionalDetailsTextofGuarantee?.value}
            />
          </View>
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <Text style={{ ...styles.arabicText }}>نص الضمان</Text>
            <CheckBoxComp
              direction={'arabic'}
              label={formdetails?.letterGuartAppAddtionalDetailsTextofGuarantee?.value}
              val={formdetails?.letterGuartAppAddtionalDetailsTextofGuarantee?.value}
            />
          </View>
        </View>

        {/* Second Section: Authorization and Declaration */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <Text style={{ fontSize: 8, color: '#6E2585' }}>
              We irrevocably authorize you (i.e. the “Bank”) to deduct from our accounts with you for any cash margin,
              commissions, swift, courier service, or any other expenses incurred by you under this Letter of Guarantee
              (“Guarantee”).
            </Text>
            <Text style={{ fontSize: 8, color: '#6E2585' }}>
              We hereby declare that we have read, understood, and agree with the General Terms & Conditions related to
              this Guarantee.
            </Text>
          </View>
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 4 }}>
            <Text style={{ ...styles.arabicText }}>
              نفوضكم بصورة غير قابلة للنقض أو الإلغاء بالقيد على حسابنا لديكم قيمة الهامش النقدي والعمولات وأجور البريد
              وأجور السويفت وأي مصاريف أخرى قد تنشأ عن إصداركم الضمان أعلاه.
            </Text>
            <Text style={{ ...styles.arabicText }}>
              نُقر بأننا قرأنا ووافقنا على جميع الشروط العامة الخاصة بإصدار الضمان.
            </Text>
          </View>
        </View>

        {/* Signature Section */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 5,
            borderTop: '1px solid #6E2B8C',
            borderRight: '1px solid #6E2B8C',
            borderLeft: '1px solid #6E2B8C',
            borderBottom: '1px solid #6E2B8C',
          }}
        >
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 10 }}>
            <InputComp inputOne="Account Number" outputOne={formdetails?.letterGuartAppDeclarationAccountNo} />
            <InputComp inputNine="Customer Name" outputNine={formdetails?.letterGuartAppDeclarationCustomerName} />
            <InputComp inputOne="Signature and official Stamp" outputOne={' '} />
          </View>
          <View style={{ flexDirection: 'column', width: '50%', padding: 4, gap: 10 }}>
            <InputArabicComp inputOne="رقم الحساب" outputOne={formdetails?.letterGuartAppDeclarationAccountNo} />
            <InputArabicComp
              inputNine="اسم مقدم الطلب:"
              outputNine={formdetails?.letterGuartAppDeclarationCustomerName}
            />
            <InputArabicComp inputOne="التوقيع والختم الرسمي" outputOne={' '} />
          </View>
        </View>

        <View style={{ flexDirection: 'column', gap: 5, marginTop: 5 }}>
          <Text
            style={{
              fontSize: 10,
              // fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            General Terms And Conditions
          </Text>
          <View style={{ flexDirection: 'row', gap: '2%', width: '100%' }}>
            <View style={{ flexDirection: 'column', gap: 2, width: '49%' }}>
              <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
                <Text style={styles.textFont}>1.</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  In consideration of the Bank issuing this Guarantee, I/we hereby irrevocably and unconditionally
                  undertake to hold you harmless and to indemnify you against all claims (but not exceeding the
                  Guarantee amount), actions, losses, costs, charges, expenses, commissions, administrative expenses and
                  all consequences whatsoever which might be incurred by you as a result of your issuing this Guarantee,
                  and I/we authorize you for the following
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start', marginLeft: 10 }}>
                <Text style={styles.textFont}>a)</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  Debit my/our account with you, at your discretion, the full value of this Guarantee without the
                  necessity of giving any reason(s) therefor, or recovering the amount by obliging my/our prior
                  approval. Specifically, but not exclusively, in case of your cancellation of the Credit Facilities
                  granted to me/us, or if there exists any doubt of the wrongdoing amount of the Guarantee in his
                  favour, I/we hereby irrevocably and unconditionally authorize you to deduct from my/our account with
                  you the full value of the Guarantee, or its outstanding balance.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start', marginLeft: 10 }}>
                <Text style={styles.textFont}>b)</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  In the event that the beneficiary has requested from the Bank an extension of the validity of a
                  Guarantee, you may, at your sole discretion, extend the validity of the Guarantee as requested by the
                  Beneficiary, or else in such other way you deem suitable without reference to me/us or without my/our
                  prior approval.{' '}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start', marginLeft: 10 }}>
                <Text style={styles.textFont}>c)</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  You may pay to the Beneficiary indicated above, any amount (but not exceeding the Guarantee amount),
                  claimed from you under the Guarantee, notwithstanding any objection I/we or any third party may have
                  to such claim, and such amount paid under the Guarantee by the Bank to the Beneficiary may be made
                  without my/our prior approval.
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
                <Text style={styles.textFont}>2.</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  In the event of my/our failure to make timely payments as requested by the Bank of any amount under
                  the Guarantee, the Bank shall be entitled to set-off such amounts, from any of my/our accounts
                  maintained with you. In addition, the Bank is also entitled, without my/our prior approval, to sell
                  any of my/our securities/properties held with the Bank as collateral and apply the proceeds to my/our
                  obligations hereunder, and I/we shall remain liable for any deficiency. All entries recorded by the
                  Bank’s books shall be considered as final and conclusive evidence in this regard
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
                <Text style={styles.textFont}>3.</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  The Applicant agrees that the mere issuance by the Bank of a letter of guarantee for a specific
                  contract shall not obligate the Bank to issue further letters of guarantee required under the same
                  contract.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
                <Text style={styles.textFont}>4.</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  The Applicant agrees that mentioning the contract name or reference in the letter of guarantee, does
                  not commit the Bank to the terms and conditions of that contract
                </Text>
              </View>

            </View>
            <View style={{ flexDirection: 'column', gap: 5, width: '49%' }}>
              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.arabicText}>(1</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                  نتعهد لكم، عند قيامكم بإصدار الضمان المطلوب أعلاه، تعهداً نهائياً غير قابل للإلغاء ودون قيد أو شرط،
                  بأن نُعوضكم عن أي مطالبات، شريطة ألا تتجاوز مبلغ الضمان، أو عن أي دعاوى أو خسائر أو تكاليف أو رسوم أو
                  مصاريف أو عمولات أو أتعاب إدارية أو أي تبعات أخرى قد تتحملونها نتيجة إصدار هذا الضمان. ونُفوضكم
                  تفويضاً كاملاً بالتصرف وفقاً لما يلي:
                </Text>
              </View>

              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end', marginRight: 10 }}>
                {/* <Text style={styles.arabicText}>(أ</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                  أن تُقيّدوا على حسابنا لديكم، وبناءً على قراركم المنفرد، كامل قيمة الضمان المذكور أعلاه، دون الحاجة
                  إلى إبداء أي أسباب، ودون الرجوع إلينا أو الحصول على موافقتنا بهذا الشأن. كما نُفوضكم تفويضاً غير قابل
                  للنقض وغير مشروط، وخاصة دون حصر، في حال قيامكم بإلغاء التسهيلات الائتمانية الممنوحة لنا، أو في حال طلب
                  المستفيد حجز قيمة الضمان لصالحه، أن تُقيّدوا من حسابنا لديكم كامل قيمة الضمان أو الرصيد المتبقي منه.
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end', marginRight: 10 }}>
                {/* <Text style={styles.arabicText}>(ب</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                  يحق للبنك، بتقديره المطلق، تمديد صلاحية الضمان في حالة تسلّمه طلباً من المستفيد لتمديد صلاحية الضمان
                  إلى تاريخ جديد حسب طلب المستفيد أو لغاية التاريخ الذي يراه البنك مناسباً، دون الرجوع إلينا أو الحصول
                  على موافقتنا.
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end', marginRight: 10 }}>
                {/* <Text style={styles.textFont}>(c</Text> */}
                <Text style={{ ...styles.arabicText }}>
                  يحق لكم أن تدفعوا إلى المستفيد المذكور أعلاه أي مبلغ (شريطة ألا يزيد عن مبلغ الضمان) يُطالبكم به بموجب
                  الضمان، بغض النظر عن أي اعتراض من جانبنا أو من أي طرف ثالث على هذه المطالبة. ويحق للبنك أن يدفع أي
                  مبلغ بموجب الضمان إلى المستفيد دون الحصول على موافقتنا المسبقة
                </Text>
              </View>

              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.textFont}>2.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                 في حال إغلاقنا ودفع أي مبالغ مستحقة عند طلب البنك في مواجهتها بموجب مبلغ الضمان، يحق للبنك أن يقيد قيمة المبالغ من أي من حساباتنا لديه، متى ما يرى البنك ذلك، دون الحاجة إلى إنذار أو موافقتنا المسبقة.
يحق للبنك أن يبيع أي من الأوراق / الأموال / الممتلكات التي يحتفظ بها لدينا، وأن يستوفي عوائد التصرف فيها متى ما يراه البنك لازماً.
جميع الأتعاب، والرسوم، والمصاريف الناجمة عن قائمة بيع أي نوع من الأموال المرهونة أو العقود المسجلة في دفاتر البنك تعتبر قانونية وثابتة قطعاً بمبدأ الخصوص.


                </Text>
              </View>

              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.arabicText}>3.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
وافق مقدم الطلب أن إصدار البنك لأي ضمان بخصوص عقد معين، لا يلزم البنك بإصدار ضمانات أخرى مطلوبة بخصوص العقد ذاته                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.arabicText}>4.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                 وافق مقدم الطلب بأنه قد ذكر اسم ورقم العقد محل الضمان في الطلب طبقاً لأحكام وشروط البنك والعقد.
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.arabicText}>5.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                  يقر مقدم الطلب بأن إصدار البنك لأي ضمان بخصوص عقد معين لا يُلزم البنك بإصدار ضمانات إضافية لنفس العقد.
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.arabicText}>6.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                  يقر مقدم الطلب بأن ذكر اسم أو رقم العقد في نص الضمان لا يُلزم البنك بشروط وأحكام ذلك العقد.{' '}
                </Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.textFont}>7.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
                  في حال انقضاء مدة صلاحية خطاب الضمان ولم يُسلَّم البنك أصل الضمان، فإن البنك يحتفظ بحقه بإلغائه بعد ١٥ يوماً من تاريخ انتهاء صلاحيته (خاضع لموافقة البنك).


                </Text>
              </View>


            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>

        <View style={{ flexDirection: 'row', width: '100%', gap: '2%' }}>
          <View style={{ flexDirection: 'column', gap: 2, width: '49%' }}>
            <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              <Text style={styles.textFont}>6.</Text>
              <Text style={{ ...styles.textFont, textWrap: true }}>
                I/We authorize the Bank to buy or sell at the prevailing foreign exchange spot rate, the foreign
                currency equal to this Guarantee amount to pay the Beneficiary and/or the issuing Bank (correspondent
                Bank), and I/We undertake to bear any difference in the value due to foreign exchange
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              <Text style={styles.textFont}>7.</Text>
              <Text style={{ ...styles.textFont, textWrap: true }}>
                In case the original Guarantee has not been received by the Bank after its expiry, the Guarantee will be
                cancelled after 15 days from its expiry date, and shall be subject to your advice.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              <Text style={styles.textFont}>8.</Text>
              <Text style={{ ...styles.textFont, textWrap: true }}>
                I/We hereby irrevocably bound to the General Terms and Conditions of the Bank.
              </Text>
            </View>
            <Text style={styles.textFont}>
              The governing law of this Guarantee shall be Omani law, not in contradiction to Islamic Sharia rules and
              principles. Any dispute over the interpretation or execution of the terms and/or conditions of the
              Guarantee shall be referred to the jurisdiction of the competent courts of Muscat and the appellate Oman.
            </Text>
             <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
                <Text style={styles.textFont}>5.</Text>
                <Text style={{ ...styles.textFont, textWrap: true }}>
                  In case the Beneficiary is domiciled/located in another country, please arrange to issue the Guarantee
                  through your correspondent as per their normal/enclosed text. The Guarantee will be subject to the
                  rules and regulations of the country of issuance, not in contradiction to Islamic Sharia rules and
                  principles. This Guarantee will be considered as cancelled only upon your release by your
                  correspondent (issuing bank) and not automatically on its expiry date, and you may add the margin and
                  other such advice to the validity period as per your normal practice, or as desired by the issuing
                  bank.
                </Text>
              </View>
          </View>
          <View style={{ flexDirection: 'column', gap: 5, width: '49%' }}>
             <View style={{ flexDirection: 'row-reverse', gap: 2, alignItems: 'flex-end' }}>
                {/* <Text style={styles.arabicText}>8.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
نلزم / نلتزم، بشكل غير قابل للنقض، بالشروط والأحكام العامة للبنك.

                </Text>
              </View>
             <View style={{ flexDirection: 'row-reverse', gap: 5, alignItems: 'flex-end' }}>
                {/* <Text style={styles.arabicText}>9.</Text> */}
                <Text style={{ ...styles.arabicText, textWrap: true }}>
يخضع الضمان لقانون سلطنة عمان بما لا يتعارض مع أحكام الشريعة الإسلامية، ومجال أي نزاع قد ينشأ بخصوص تفسير أو تنفيذ نصوص وشروط الضمان إلى الجهات القضائية والمحاكم المختصة في سلطنة عُمان.


                </Text>
              </View>
          </View>

        </View>
        <PdfTable
          head="For Bank use only"
          body={
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <View
                style={{ flexDirection: 'row', width: '100%', gap: '1%', borderBottom: '1px solid black', padding: 10 }}
              >
                <View
                  style={{ flexDirection: 'row', width: '49%', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                    <Text style={styles.textFont}>Cash Margin:</Text>
                    <Text style={{ ...styles.textFont }}>%</Text>
                  </View>
                  <Text style={styles.arabicText}>الهامش النقدي</Text>
                </View>

                <View
                  style={{ flexDirection: 'row', width: '49%', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                    <Text style={styles.textFont}>Comission</Text>
                    {/* <Text style={{ ...styles.textFont }}>%</Text> */}
                  </View>
                  <Text style={styles.arabicText}>العمولة</Text>
                </View>
              </View>

              <View
                style={{ flexDirection: 'row', width: '100%', gap: '1%', paddingVertical: 10, paddingHorizontal: 10 }}
              >
                <View
                  style={{ flexDirection: 'row', width: '49%', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <InputComp inputOne="Staff Number" />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '49%',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <InputComp inputOne="Signature" />
                </View>
              </View>
            </View>
          }
        />
      </Page>
    </Document>
  );
}
