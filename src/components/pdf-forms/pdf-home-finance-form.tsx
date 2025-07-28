'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { HomeFinanceArabicFormPDFProps } from './pdf-arabic-forms/arabic-home-finance-form';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PdfTable } from './pdf-table-component';

Font.register({
  family: 'DejaVuSans-Bold',
  src: '/fonts/DejaVuSans-Bold.ttf',
});
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
    // paddingLeft: 5,
    // paddingRight: 3,
    // paddingBottom: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  arabicThirdRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: 10,
    // padding: 3,
    paddingLeft: 5,
    paddingRight: 3,
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
    fontSize: 12,
  },
  secondLabel: {
    color: '#6E2B8C',
    fontSize: 9,
    textAlign: 'left',
    lineHeight: 1,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    // color: '#6E2B8C',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    textAlign: 'center',
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
  tickMark: {
    fontSize: 11,
    fontFamily: 'DejaVuSans-Bold',
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

export function HomeFinanceFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  const relationshipSince = dayjs(formdetails?.homeFinBankRelBankRelationshipSince).format('MMM D, YYYY h:mm A');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
          </View>

          <View style={{ flexDirection: 'column', gap: 4, marginTop: 2 }}>
            <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
              Note: Please complete in Block letters and sign in the appropriate space.
            </Text>
          </View>

          <View style={{ flexDirection: 'column', gap: 3 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',

                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              Personal Details
            </Text>
            <View style={{ flexDirection: 'column', gap: '1px' }}>
              <View style={{ flexDirection: 'column', gap: '1px' }}>
                <View style={{ flexDirection: 'row' }}>
                  <InputComp inputOne="CIF" outputOne={formdetails?.homeFinPerDetCIFNumber} />
                  <InputComp inputOne="Customer Name" outputOne={formdetails?.homeFinPerDetCustomerName} />
                </View>
                <View
                  style={{ flexDirection: 'column', gap: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ ...styles?.thirdRow, width: '85%' }}>
                      <View style={{ ...styles.checkboxRow, minWidth: '12.7%', gap: 10 }}>
                        <Text style={styles.textFont}>Marital Status:</Text>
                      </View>
                      <View
                        style={{
                          minWidth: '20%',
                          justifyContent: 'flex-start',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <View style={{ minWidth: '14%' }}>
                          <CheckBoxComp
                            label={formdetails?.homeFinPerDetMaritalStatus?.value}
                            val={formdetails?.homeFinPerDetMaritalStatus?.value}
                          />
                        </View>
                        {formdetails?.homeFinPerDetMaritalStatusOther && (
                          <InputComp inputOne=" " outputOne={formdetails?.homeFinPerDetMaritalStatusOther} />
                        )}
                      </View>
                    </View>
                    <View style={{ ...styles.thirdRow, width: '15%' }}>
                      <Text style={styles.textFont}>No of Dependency</Text>
                      <Text style={styles.inputLine}>{formdetails?.homeFinPerDetNoofDependents}</Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles?.thirdRow}>
                      <View style={{ ...styles.checkboxRow, minWidth: '70px', gap: 10 }}>
                        <Text style={styles.textFont}>Education Status:</Text>
                      </View>
                      <View
                        style={{
                          maxWidth: '100%',
                          justifyContent: 'flex-start',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <View style={{ minWidth: '20%' }}>
                          <CheckBoxComp
                            label={formdetails?.homeFinPerDetEducationStatus?.value}
                            val={formdetails?.homeFinPerDetEducationStatus?.value}
                          />
                        </View>
                        <View style={{ width: '70%' }}>
                          {/* {formdetails?.homeFinPerDetEducationStatusOther &&  */}
                          <InputComp inputOne=" " outputOne={formdetails?.homeFinPerDetEducationStatusOther} />
                          {/* } */}
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={styles?.thirdRow}>
                      <View style={{ ...styles.checkboxRow, width: '70px', gap: 10 }}>
                        <Text style={styles.textFont}>Residence Status:</Text>
                      </View>
                      <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                        <CheckBoxComp
                          label={formdetails?.homeFinPerDetResidenceStatus?.value}
                          val={formdetails?.homeFinPerDetResidenceStatus?.value}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',

                    color: 'white',
                    backgroundColor: '#6E2585',
                    paddingTop: '4px',
                    paddingLeft: '5px',
                  }}
                >
                  Financial Details
                </Text>
                <View style={{ flexDirection: 'column', gap: 3 }}>
                  <View style={{ flexDirection: 'column', gap: 4 }}>
                    <InputComp
                      inputOne="Estimated Property Value"
                      outputTwo={formdetails?.homeFinFinDetHamishJiddiyahRO || 'N/A'}
                      inputTwo="Hamish Jiddiyah (%)"
                      outputOne={formdetails?.homeFinFinEstimatedPropertyValue || 'N/A'}
                    />
                    <InputComp
                      inputOne="Amount of Finance Required"
                      inputTwo="Tenure"
                      outputOne={formdetails?.homeFinFinDetFinanceAmount || 'N/A'}
                      outputTwo={formdetails?.homeFinFinDetTenure || 'N/A'}
                    />
                    <InputComp
                      inputOne="No. of Payment(s):"
                      inputTwo="Type Of Financing"
                      outputOne={formdetails?.homeFinFinDetNoofPayments || 'N/A'}
                      outputTwo={formdetails?.homeFinFinDetTypeofFinancing?.value || 'N/A'}
                    />
                    <InputComp
                      inputOne="Monthly Payment Amount (tentative):"
                      inputTwo="Property Takaful Cover"
                      outputOne={formdetails?.homeFinFinDetMonthlyPaymentAmountTentative || 'N/A'}
                      outputTwo={formdetails?.homeFinFinDetPropertyTakafulCover?.value || 'N/A'}
                    />
                    {/* <InputComp inputOne="Processing Fee" /> */}
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ flexDirection: 'column', width: '80%', gap: 2 }}>
                        <InputComp
                          inputOne="Monthly Income/Salary"
                          inputTwo="Salary Day"
                          outputOne={formdetails?.homeFinFinDetMonthlyIncomeSalary}
                          outputTwo={formdetails?.homeFinFinDetSalaryDayofeachmonth}
                        />
                      </View>

                      <Text style={styles.textFont}>each month</Text>
                    </View>
                    <InputComp
                      inputOne="Additional income amount (RO) if any"
                      outputOne={formdetails?.homeFinFinDetAdditionalIncomeAmountROifany || 'N/A'}
                      inputTwo="Unified Credit Life Takaful"
                      outputTwo={formdetails?.homeFinFinDetUnifiedCreditLifeTakaful?.value || 'N/A'}
                    />
                    <View style={{ flexDirection: 'row', width: '100%', gap: 2 }}>
                      <View style={{ width: '50%' }}>
                        <InputComp
                          inputOne="Source of additional income"
                          outputOne={formdetails?.homeFinFinDetSourceofAdditionalIncome?.value || 'N/A'}
                        />
                      </View>
                      {formdetails?.homeFinFinDetSourceofAdditionalIncomeOther && (
                        <View style={{ width: '50%' }}>
                          <InputComp
                            inputOne=" "
                            outputOne={formdetails?.homeFinFinDetSourceofAdditionalIncomeOther || 'N/A'}
                          />
                        </View>
                      )}
                    </View>
                    <InputComp inputOne="Payment Method:" outputOne={formdetails?.homeFinFinDetPaymentMethod?.value} />
                    <View style={styles.column}>
                      <Text style={styles.textFont}>Payment Method: Standing Instructions (SI)</Text>
                      <AccountBoxes
                        length={15}
                        data={formdetails?.homeFinPayMethodsSIAccountNoifApplicable?.split('')}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginTop: 5,
                    color: 'white',
                    backgroundColor: '#6E2585',
                    paddingTop: '4px',
                    paddingLeft: '5px',
                  }}
                >
                  DETAILS OF THE PROPERTY
                </Text>
                <View style={{ flexDirection: 'column', gap: 3 }}>
                  <View style={{ flexDirection: 'column', gap: 4 }}>
                    <InputComp inputOne="Developer:" outputOne={formdetails?.homeFinProInfDeveloper || 'N/A'} />

                    <View style={styles?.thirdRow}>
                      <Text style={styles?.textFont}>Type of Property Interested In: </Text>
                      <CheckBoxComp
                        label={formdetails?.homeFinProInfPropertyType?.value}
                        val={formdetails?.homeFinProInfPropertyType?.value}
                      />
                    </View>
                    <InputComp
                      inputOne="Address"
                      outputOne={formdetails?.homeFinProInfPropertyType?.value}
                      outputTwo={formdetails?.homeFinProInfArea}
                      inputTwo="Area"
                    />
                    <View style={{ flexDirection: 'column', width: '100%', gap: 5 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '50%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.textFont}>Will any part of the property be used for business?</Text>
                        <CheckBoxComp
                          label={formdetails.homeFinProInfBusinessUse?.value}
                          val={formdetails.homeFinProInfBusinessUse?.value}
                        />
                      </View>

                      <InputComp
                        inputOne="Will the property be used as your main residence?"
                        outputOne={formdetails?.homeFinProInfMainResidence}
                      />

                      <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-between' }}>
                        <Text style={styles.textFont}>Will you be renting out this property?</Text>
                        <CheckBoxComp
                          label={formdetails?.homeFinProInfRentingOut?.value}
                          val={formdetails?.homeFinProInfRentingOut?.value}
                        />
                      </View>
                    </View>

                    <InputComp
                      inputOne="Estimated Rental Income"
                      outputOne={formdetails?.homeFinProInfEstimatedRentalIncome || 'N/A'}
                      inputTwo="Purpose"
                      outputTwo={formdetails?.homeFinProInfPurpose?.value || 'N/A'}
                    />
                    <InputComp
                      inputOne="Property Number:"
                      outputOne={formdetails?.homeFinProInfPropertyNumber || 'N/A'}
                      inputTwo="Wilayat"
                      outputTwo={formdetails?.homeFinProInfWalayat || 'N/A'}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',

                    color: 'white',
                    backgroundColor: '#6E2585',
                    paddingTop: '4px',
                    paddingLeft: '5px',
                  }}
                >
                  PROPERTY OWNERSHIP
                </Text>
                {formdetails?.homeFinPropertyOwnership?.map((item: any, index: any) => (
                  <View key={index} style={{ flexDirection: 'column', gap: 3 }}>
                    <InputComp
                      inputOne={`Name of Seller ${index + 1}:`}
                      outputOne={item?.homeFinProOwnNameofSeller1 || 'N/A'}
                      inputTwo="Relation to the Applicant:"
                      outputTwo={item?.homeFinProOwnRelationApplicant?.value || 'N/A'}
                    />
                    <InputComp
                      inputOne={`Seller ID NO`}
                      outputOne={item?.homeFinProOwnSellerIDNO || 'N/A'}
                      inputTwo="Project Name:"
                      outputTwo={item?.homeFinProOwnSellerCRNOifany || 'N/A'}
                    />
                    <View style={{width:'100%',flexDirection:'row',alignItems:'center',gap:5}}>
                      <View style={{minWidth:'15%'}}><CheckBoxComp label="Developer" val={item?.homeFinProOwnDeveloper
}/></View>
                      <View style={{minWidth:"50%"}}>
                    <InputComp
                      inputOne={`Developer`}
                      outputOne={item?.homeFinProDevName || 'N/A'}
                      inputTwo="Seller CR NO (if any):"
                      outputTwo={item?.homeFinProOwnProjectName || 'N/A'}
                    /></View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', gap: 5 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',

              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            OTHER ASSETS OWNED BY APPLICANT
          </Text>
          <View>
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <InputComp
                inputOne={`No. of Properties Owned & Value:`}
                outputOne={formdetails?.homeFinOtherAssetOwnedAppNoofPropertiesOwnedValue || 'N/A'}
                inputTwo="Bank Name:"
                outputTwo={formdetails?.homeFinOtherAssetOwnedAppBank || 'N/A'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  width: '30%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.textFont}>Is the property financed?</Text>

                <CheckBoxComp
                  label={formdetails?.homeFinOtherAssetOwnedAppIsPropertFinanced?.value}
                  val={formdetails?.homeFinOtherAssetOwnedAppIsPropertFinanced?.value}
                />
              </View>
              <InputComp
                inputOne="If Yes EMI Amount Per Month:"
                outputOne={formdetails?.homeFinOtherAssetOwnedAppEMIAmountPerMonth || 'N/A'}
                inputTwo="Outstanding Amount:"
                outputTwo={formdetails?.homeFinOtherAssetOwnedAppOutstandingAmount || 'N/A'}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            borderBottom: '1px solid #6E2585',
            borderTop: '1px solid #6E2585',
            borderLeft: '1px solid #6E2585',
            borderRight: '1px solid #6E2585',
          }}
        >
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '18%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>Type of Liability</Text>
            </View>

            <View style={{ width: '35%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>Bank</Text>
            </View>
            <View style={{ width: '26%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>Amount Outstanding</Text>
            </View>

            <View style={{ width: '26%', backgroundColor: '#C0C0C0' }}>
              <Text style={{ textAlign: 'center' }}>Monthly Payment</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
            <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', color: '#6E2585' }}>Personal Finance</Text>
            </View>

            <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', fontSize: 8 }}>
                {formdetails?.homeFinBankRelPersonalFinanceBank || 'N/A'}
              </Text>
              {/* Omani Bank Ul Hujjati */}
            </View>
            <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelPersonalFinanceAmountOutstanding || 'N/A'}
              </Text>
            </View>

            <View style={{ width: '26%' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelPersonalFinanceMonthlyPayment || 'N/A'}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
            <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', color: '#6E2585' }}>Auto Finance</Text>
            </View>

            <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', fontSize: 8 }}>
                {formdetails?.homeFinBankRelAutoFinanceBank || 'N/A'}
              </Text>
            </View>
            <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelAutoFinanceAmountOutstanding || 'N/A'}
              </Text>
            </View>

            <View style={{ width: '26%' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelAutoFinanceMonthlyPayment || 'N/A'}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
            <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', color: '#6E2585' }}>Credit Card</Text>
            </View>

            <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', fontSize: 8 }}>
                {formdetails?.homeFinBankRelCreditCardBank || 'N/A'}
              </Text>
            </View>
            <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelCreditCardAmountOutstanding || 'N/A'}
              </Text>
            </View>

            <View style={{ width: '26%' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelCreditCardMonthlyPayment || 'N/A'}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
            <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', color: '#6E2585' }}>Home Finance</Text>
            </View>

            <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', fontSize: 8 }}>
                {formdetails?.homeFinBankRelHomeFinanceBank || 'N/A'}
              </Text>
            </View>
            <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
              </Text>
            </View>

            <View style={{ width: '26%' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelHomeFinanceMonthlyPayment || 'N/A'}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
            <View style={{ width: '18%', borderRight: '1px solid #6E2585', color: '#6E2585' }}>
              <Text
                style={{ textAlign: 'center', fontSize: 8 }}
              >{`Other Liability (including\n3rd Party Guarantees)`}</Text>
            </View>

            <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', fontSize: 8 }}>
                {formdetails?.homeFinBankRelHomeFinanceBank || 'N/A'}
              </Text>
            </View>
            <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelOtherLiabilityAmountOutstanding || 'N/A'}
              </Text>
            </View>

            <View style={{ width: '26%' }}>
              <Text style={{ textAlign: 'center' }}>
                {formdetails?.homeFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
            <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center', color: '#6E2585' }}>Total</Text>
            </View>

            <View style={{ width: '35%', borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}>
              {/* <Text style={{ textAlign: 'center' }}>{formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}</Text> */}
            </View>
            <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
              <Text style={{ textAlign: 'center' }}>{formdetails?.homeFinBankRelTotalAmountOutstanding || 'N/A'}</Text>
            </View>

            <View style={{ width: '26%' }}>
              <Text style={{ textAlign: 'center' }}>{formdetails?.homeFinBankRelTotalMonthlyPayment || 'N/A'}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{ marginTop: 5 }}></View>
          <PdfTable
            head="BANKING RELATIONSHIPS"
            body={
              <View
                style={{
                  flexDirection: 'column',
                  // border: '1px solid #6E2585',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    // borderTop: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                  }}
                >
                  <View style={{ width: '40%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                    <Text style={{ textAlign: 'center' }}>Bank Name</Text>
                  </View>
                  <View style={{ width: '20%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                    <Text style={{ textAlign: 'center' }}>Account Number</Text>
                  </View>
                  <View style={{ width: '20%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                    <Text style={{ textAlign: 'center' }}>Type of Account</Text>
                  </View>
                  <View style={{ width: '20%', backgroundColor: '#C0C0C0' }}>
                    <Text style={{ textAlign: 'center' }}>Relationship Since</Text>
                  </View>
                </View>
                {formdetails?.homeFinBankingRelationships?.map((item: any, index: any) => (
                  <View
                    style={{
                      // key={index}
                      flexDirection: 'row',
                      width: '100%',
                      // borderTop: '1px solid #6E2585',
                      // borderBottom: '1px solid #6E2585',
                    }}
                  >
                    <View style={{ width: '40%', borderRight: '1px solid #6E2585', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>{item?.homeFinBankRelBankName || 'N/A'}</Text>
                    </View>
                    <View style={{ width: '20%', borderRight: '1px solid #6E2585', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {item?.homeFinBankRelBankAccountNumber || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '20%', borderRight: '1px solid #6E2585', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {item.homeFinBankRelBankTypeofAccount?.value || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '20%', padding: 2 }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {dayjs(item?.homeFinBankRelBankRelationshipSince)?.format('DD-MM-YYYY') || 'N/A'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            }
          />
        </View>
        <View style={{marginTop:5}}></View>

        <PdfTable
                      head="REFERENCE"
                      body={
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                          <View style={{ flexDirection: 'column', width: '50%', borderRight: '1px solid black' }}>
                            <View
                              style={{
                                padding: 3,
                                borderBottom: '1px solid #6E2585',
                                textAlign: 'center',
                                // borderRight: '1px solid #6E2585',
                                backgroundColor: '#C0C0C0',
                                color: '#6E2585',
                              }}
                            >
                              <Text>In Oman</Text>
                            </View>
                            <View style={[styles.column, { padding: 4 }]}>
                              <InputComp inputOne="Name" outputOne={formdetails?.homeFinInOmanName || 'N/A'} />
                              <InputComp
                                inputOne="Relationship"
                                outputOne={formdetails?.homeFinInOmanRelationship?.value || 'N/A'}
                              />
                              <InputComp inputOne="Employer" outputOne={formdetails?.homeFinInOmanEmployer || 'N/A'} />
                              <InputComp inputOne="Address" outputOne={formdetails?.homeFinInOmanAddress || 'N/A'} />
                              <InputComp inputOne="Office Tel" outputOne={formdetails?.homeFinInOmanOfficeTel || 'N/A'} />
                              <InputComp inputOne="Mobile" outputOne={formdetails?.homeFinInOmanMobile || 'N/A'} />
                            </View>
                          </View>
                          <View style={{ flexDirection: 'column', width: '50%' }}>
                            <View
                              style={{
                                padding: 3,
                                borderBottom: '1px solid #6E2585',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // borderRight: '1px solid #6E2585',
                                backgroundColor: '#C0C0C0',
                                color: '#6E2585',
                              }}
                            >
                              <Text>In Home Country (For Expatriates / GCC Nationals)</Text>
                            </View>
                            <View style={[styles.column, { padding: 4 }]}>
                              <InputComp inputOne="Name" outputOne={formdetails?.homeFinInHomeCountryName || 'N/A'} />
                              <InputComp
                                inputOne="Relationship"
                                outputOne={formdetails?.homeFinInHomeCountryRelationship?.value || 'N/A'}
                              />
                              <InputComp inputOne="Employer" outputOne={formdetails?.homeFinInHomeCountryEmployer || 'N/A'} />
                              <InputComp inputOne="Address" outputOne={formdetails?.homeFinInHomeCountryAddress || 'N/A'} />
                              <InputComp
                                inputOne="Office Tel"
                                outputOne={formdetails?.homeFinInHomeCountryOfficeTel || 'N/A'}
                              />
                              <InputComp inputOne="Mobile" outputOne={formdetails?.homeFinInHomeCountryMobile || 'N/A'} />
                            </View>
                          </View>
                        </View>
                      }
                    />
        <View style={{ flexDirection: 'column', gap: 2, marginTop: 5 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',

              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            PROMISE TO PURCHASE
          </Text>
          <View style={{ flexDirection: 'column', gap: 3 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>1.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                The Applicant requests the Bank to purchase the Property for onward sale to the Applicant and once the
                Bank notifies the Applicant that it has become the owner of the Property, the Applicant hereby
                irrevocably and unconditionally undertakes to purchase the Property from the Bank in the Applicant’s own
                name in accordance with the terms of the Murabaha Financing Agreement.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>2.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                The Applicant’s payment and other obligations under the Murabaha Financing Agreement will be secured by
                a Mortgage to be granted by the Applicant to the Bank, and other securities as needed.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>3.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                The Bank is not under any obligation to purchase the Property if the Applicant fails to fulfill all the
                conditions precedent to the Murabaha Financing Agreement or defaults on any of the Applicant’s further
                obligation thereunder.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>4.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                Any deposit paid by the Applicant to the Bank or any of its agents shall serve as a security (Hamish
                Jiddiyah) to secure the Applicant’s promise to purchase the Property and, in the event of the Applicant
                breaching this promise, the Bank shall be authorised to sell the Property and to set off against its
                actual losses between the cost price of the Property and the subsequent sales proceeds thereof.
                Following such deduction from the deposit, the Bank shall refund the balance of the deposit to the
                Applicant, if any, and conversely, the Applicant shall be liable for any shortfall between the deposit
                amount and the Bank’s actual losses in this regard.
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>4.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                . Terms used in this Promise to Purchase shall have the same meaning as given to those terms in the
                Murabaha Financing Agreement
              </Text>
            </View>
            <CheckBoxComp
              val={formdetails?.homeFinPromisetoPurchaseLease}
              label="The Applicant requests the Bank to purchase the Property for onward sale to the Applicant and once the Bank notifies"
            />
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', gap: 2, marginTop: 5 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',

              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            CONSENT & DECLARATION
          </Text>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>1.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                I/We agree that the information given above is true and complete, and that I/We have read and understood
                the Bank’s General Terms and Conditions for the operation of Accounts and Electronic Banking Services
                and those applicable specifically to the type of account/financing chosen by me/us, I/We understand and
                expressly agree and accept to be bound by them whether set out in English and/or Arabic, I/We confirm
                that all expected inward remittances to my/our account(s) will comply with the stipulations of the
                Central Bank of Oman.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>2.</Text>
              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>
                  I hereby irrevocably and unconditionally undertake to do the following
                </Text>
                <View style={styles.thirdRow}>
                  <View style={{ flexDirection: 'column', gap: 5 }}>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>a)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        In case finance is requested based on Salary transfer and End of service benefit:
                      </Text>
                    </View>
                    <View style={styles.thirdRow}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>i)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        Continue to transfer my salary on a monthly basis directly from my employer to my account number
                        (the “Bank Account”) held with Bank Nizwa (“The Bank”) until all moneys owed by me to the Bank
                        are fully paid; and
                      </Text>
                    </View>

                    <View style={styles.thirdRow}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>ii)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        Inform the Bank immediately on termination of my present employment & provide the Bank with a
                        new Salary Transfer Letter in the event that I am no longer employed by my current employer no
                        later than 5 business days from the date I resume work with a new employer and further undertake
                        to continue to transfer my salary on a monthly basis directly from my new employer to Bank
                        Account held with the Bank until all moneys owed by me to the Bank are fully paid; and
                      </Text>
                    </View>

                    <View style={styles.thirdRow}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>iii)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        Transfer all my end of service benefits to my account with Bank Nizwa
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.thirdRow}>
                  <View style={{ flexDirection: 'column', gap: 5 }}>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>b)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        Pay off, prior to or upon any of the below events occurring, all moneys owed by me to the Bank
                        in the event that:{' '}
                      </Text>
                    </View>
                    <View style={styles.thirdRow}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>i)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        I cease to be a resident of the Sultanate of Oman; or
                      </Text>
                    </View>

                    <View style={styles.thirdRow}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>ii)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>I become resident overseas; or</Text>
                    </View>

                    <View style={styles.thirdRow}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>iii)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        I become employed by a company who will not transfer my salary directly to the Bank Account as
                        required by the Bank
                      </Text>
                    </View>

                    <View style={styles.thirdRow}>
                      <Text style={{ color: '#6E2585', fontSize: 8 }}>iv)</Text>

                      <Text style={{ color: '#6E2585', fontSize: 8 }}>
                        I don’t comply with any of the above or the Bank’s General Terms and conditions{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>3.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                This undertaking shall be governed and construed pursuant to the laws of Sultanate of Oman and hereby
                irrevocably and unconditionally consent to the sole jurisdiction of the courts of Muscat, unless the
                Bank decides otherwise.
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>4.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                Furthermore, in the event that a judgment is entered against me in favour of the Bank in the courts, I
                hereby irrevocably and unconditionally consent to the execution of such judgment.
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#6E2585' }}>Disclaimer:</Text>
          <Text style={{ color: '#6E2585', fontSize: 8, marginTop: 2 }}>
            I fully understand that the submission of required documents in support of my finance application does not
            mean automatic approval thereof. I shall be informed of Bank’s decision regarding my finance application,
            without obligation on Bank’s part to furnish reason for rejection.
          </Text>
        </View>
        <CheckBoxComp
          val={formdetails?.homeFinConsentandDeclaration}
          label="I/We agree that the information given above is true and complete, and that I/We have read and understood the Bank’s General Terms and Conditions"
        />

        <View style={{ marginTop: 20, flexDirection: 'column', gap: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%', gap: 5 }}>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View style={styles.thirdRow}>
                <Text style={styles.textFont}>Applicant’s Name:</Text>
                <Text style={styles.input}></Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View style={styles.thirdRow}>
                <Text style={styles.textFont}>Signature:</Text>
                <Text style={styles.input}></Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', gap: 5 }}>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View style={styles.thirdRow}>
                <Text style={styles.textFont}>Contact:</Text>
                <Text style={styles.input}></Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 115,
                      marginRight: 5,
                      marginLeft: 23,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontSize: 8, color: 'gray', marginLeft: 1, marginRight: 2 }}>DD</Text>
                    <Text style={{ fontSize: 8, color: 'gray', marginRight: 15, marginLeft: 3 }}>MM</Text>
                    <Text style={{ fontSize: 8, color: 'gray', marginRight: 7 }}>YYYY</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Text style={{ color: '#6E2B8C', paddingTop: 2 }}>Date:</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {Array.from({ length: 8 })?.map((_, index: number) => {
                        const extraMargin = index === 1 || index === 3 ? '5px' : '2px';
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
            <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>

            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View
                  style={{
                    height: 'auto',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
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
                    <InputComp inputOne="CIF No" outputOne=" " />

                    <InputComp inputOne="Branch" outputOne=" " />

                    <InputComp inputOne="DSR/PBO Code" outputOne=" " />

                    <InputComp inputOne="DSR/PBO Name" outputOne=" " />

                    <InputComp inputOne="DSR/PBO Signature" outputOne=" " />
                  </View>
                </View>

                <View
                  style={{
                    height: 'auto',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
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
                      gap: '3px',
                    }}
                  >
                    <InputComp inputOne="Recommended by" />

                    <InputComp inputOne="Signature" outputOne=" " />

                    <InputComp inputOne="Name" outputOne=" " />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <PdfFooter />
      </Page>

      <HomeFinanceArabicFormPDFProps data={data} />
    </Document>
  );
}
