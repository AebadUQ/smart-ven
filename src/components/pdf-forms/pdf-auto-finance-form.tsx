'use client';

import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { AutoFinanceArabicFormPDFProps } from './pdf-arabic-forms/arabic-auto-finance-form';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PdfTable } from './pdf-table-component';

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
    flexDirection: 'row',
    padding: 3,
    gap: '20px',
  },
  thirdRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  arabicThirdRow: {
    display: 'flex',
    flexDirection: 'row',
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
    gap: 10,
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
  },
  // textFont: {
  //   fontFamily: 'Cairo',
  //   fontSize: 8,
  //   direction: 'rtl',
  //   textAlign: 'right',
  //   color: '#6E2B8C',
  // },
  textFontHead: {
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

export function AutoFinanceFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
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
              Personal Details
            </Text>
            <View style={{ flexDirection: 'column', gap: '10px' }}>
              <View style={{ flexDirection: 'column', gap: '1px' }}>
                <View style={{ flexDirection: 'row' }}>
                  <InputComp inputOne="CIF" outputOne={formdetails?.autoFinPerDetCIFNumber} />
                  <InputComp inputOne="Customer Name" outputOne={formdetails?.autoFinPerDetCustomerName} />
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
                            label={formdetails?.autoFinPerDetMaritalStatus?.value}
                            val={formdetails?.autoFinPerDetMaritalStatus?.value}
                          />
                        </View>
                        {formdetails?.autoFinPerDetMaritalStatusOther && (
                          <InputComp inputOne=" " outputOne={formdetails?.autoFinPerDetMaritalStatusOther} />
                        )}
                      </View>
                    </View>
                    <View style={{ ...styles.thirdRow, width: '15%' }}>
                      <Text style={styles.textFont}>No of Dependency</Text>
                      <Text style={styles.inputLine}>{formdetails?.autoFinPerDetNoofDependents}</Text>
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
                            label={formdetails?.autoFinPerDetEducationStatus?.value}
                            val={formdetails?.autoFinPerDetEducationStatus?.value}
                          />
                        </View>
                        <View style={{ width: '70%' }}>
                          <InputComp inputOne=" " outputOne={formdetails?.autoFinPerDetEducationStatusOther} />
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
                          label={formdetails?.autoFinPerDetResidenceStatus?.value}
                          val={formdetails?.autoFinPerDetResidenceStatus?.value}
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
                <View style={{ flexDirection: 'column', gap: 4 }}>
                  <InputComp
                    inputOne="Vehicle Cost"
                    outputTwo={formdetails?.autoFinFinDetHamishJiddiyahRO || 'N/A'}
                    inputTwo="Hamish Jiddiyah (%)"
                    outputOne={formdetails?.autoFinFinDetVehicleCost || 'N/A'}
                  />
                  <InputComp
                    inputOne="Amount of Finance Required"
                    // inputTwo="Profit Rate (%)"
                    inputThree="no of installments"
                    outputOne={formdetails?.autoFinFinDetFinanceAmount || 'N/A'}
                    // outputTwo={formdetails?.autoFinFinDetTenure || 'N/A'}
                    outputThree={formdetails?.autoFinFinDetNoofInstalments || 'N/A'}
                  />

                  <InputComp
                    inputOne="Monthly Payments (tentative)"
                    // inputTwo="Processing Fee"
                    outputOne={formdetails?.autoFinFinDetMonthlyPaymentsTentative || 'N/A'}
                    // outputTwo={formdetails?.autoFinFinDetNoofPayments || 'N/A'}
                  />

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ flexDirection: 'column', width: '80%', gap: 2 }}>
                      <InputComp
                        inputOne="Monthly Income/Salary"
                        inputTwo="Salary Day"
                        outputOne={formdetails?.autoFinFinDetMonthlyPaymentsSalary || 'N/A'}
                        outputTwo={formdetails?.autoFinFinDetSalaryDayofeachMonth || 'N/A'}
                      />
                    </View>
                    <Text style={styles.textFont}>each month</Text>
                  </View>

                  <View style={[styles?.thirdRow, { padding: 0 }]}>
                    <Text style={styles?.textFont}>Payment Method:</Text>
                    <CheckBoxComp
                      label={formdetails?.autoFinFinDetPaymentMethod?.value || 'N/A'}
                      val={formdetails?.autoFinFinDetPaymentMethod?.value || 'N/A'}
                    />
                  </View>

                  <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
                    <Text style={styles.textFont}>If SI, Account No.:</Text>
                    <AccountBoxes length={15} data={formdetails?.autFinPayMethodsSIAccountNoifApplicable?.split('')} />
                  </View>

                  <View style={[styles?.thirdRow, { padding: 0 }]}>
                    <Text style={styles?.textFont}>Salary Transfer to Smart Ven: </Text>
                    <CheckBoxComp
                      label={formdetails?.autoFinFinDetSalaryTransfertoBankNizwa?.value}
                      val={formdetails?.autoFinFinDetSalaryTransfertoBankNizwa?.value}
                    />
                  </View>
                  <InputComp
                    inputOne="Additional income amount (RO) if any:"
                    outputOne={formdetails?.autoFinFinDetAdditionalIncomeAmountROifany || 'N/A'}
                    inputTwo="Unified Credit Life Takaful:"
                    outputTwo={formdetails?.autoFinFinDetUnifiedCreditLifeTakaful?.value || 'N/A'}
                  />
                  <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                    <InputComp
                      inputOne="Source of additional income:"
                      outputOne={formdetails?.autoFinFinDetSourceofAdditionalIncome?.value || 'N/A'}
                    />
                    {formdetails?.autoFinFinDetSourceofAdditionalIncomeOther && (
                      <InputComp
                        inputOne=" "
                        outputOne={formdetails?.autoFinFinDetSourceofAdditionalIncomeOther || 'N/A'}
                      />
                    )}
                  </View>
                  {/* inputTwo="Fees & Charges:" outputTwo={formdetails?.autoFinFinDetFeesandCharges?.value || 'N/A'} */}
                </View>
              </View>

              <View style={{ flexDirection: 'column', width: '100%' }}>
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
                  Vehicle Information
                </Text>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderBottom: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',

                      color: '#6E2585',
                    }}
                  >
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        gap: 5,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp inputOne="Manufacturer" outputOne={formdetails?.autoFinVehInfManufacture || 'N/A'} />
                    </View>
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        gap: 5,
                        flexDirection: 'row',
                      }}
                    >

                                          <InputComp inputOne="Seller ID NO" outputOne={formdetails?.autoFinSelInfSellerIDNO || 'N/A'} />

                    </View>{' '}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderBottom: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',

                      color: '#6E2585',
                    }}
                  >
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        gap: 5,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp inputOne="Model" outputOne={formdetails?.autoFinVehInfModel || 'N/A'} />
                    </View>
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp inputOne="Car Mileage" outputOne={formdetails?.autoFinVehInfCarMileage || 'N/A'} />
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderBottom: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',

                      color: '#6E2585',
                    }}
                  >
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp inputOne="Type" outputOne={formdetails?.autoFinVehInfVehicleType?.value || 'N/A'} />
                    </View>
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp
                        inputOne="Proposed Date of Delivery"
                        outputOne={dayjs(formdetails?.autoFinVehInfProposedDateofDelivery).format('DD-MM-YYYY') || 'N/A'}
                      />
                    </View>{' '}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderBottom: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',

                      color: '#6E2585',
                    }}
                  >
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp inputOne="Colour" outputOne={formdetails?.autoFinVehInfColor || 'N/A'} />
                    </View>
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp
                        inputOne="Dealer/Seller’s Name"
                        outputOne={formdetails?.autoFinSelInfDealerSellerName || 'N/A'}
                      />
                    </View>{' '}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderBottom: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',

                      color: '#6E2585',
                    }}
                  >
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp
                        inputOne="Year of Make"
                        outputOne={dayjs(formdetails?.autoFinVehInfYearofMake)?.format('DD-MM-YYYY') || 'N/A'}
                      />
                    </View>
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp
                        inputOne="Dealer/Seller’s Phone Number"
                        outputOne={formdetails?.autoFinSelInfDealerSellerPhoneNumber || 'N/A'}
                      />
                    </View>{' '}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderBottom: '1px solid #6E2585',
                      borderRight: '1px solid #6E2585',
                      borderLeft: '1px solid #6E2585',

                      color: '#6E2585',
                    }}
                  >
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp inputOne="Chassis No" outputOne={formdetails?.autoFinVehInfChassisNo || 'N/A'} />
                    </View>
                    <View
                      style={{
                        ...styles.textFont,
                        // borderLeft: '1px solid #6E2585',
                        width: '50%',
                        padding: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <InputComp
                        inputOne="Dealer/Seller’s Fax Number"
                        outputOne={formdetails?.homeFinInHomeCountryMobile || 'N/A'}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderBottom: '1px solid #6E2585',
                    borderRight: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',

                    color: '#6E2585',
                  }}
                >
                  <View
                    style={{
                      ...styles.textFont,
                      // borderLeft: '1px solid #6E2585',
                      width: '50%',
                      padding: 2,
                      flexDirection: 'row',
                    }}
                  >
                    <InputComp inputOne="Engine No" outputOne={formdetails?.autoFinVehInfEngineNo || 'N/A'} />
                  </View>
                  <View
                    style={{
                      ...styles.textFont,
                      // borderLeft: '1px solid #6E2585',
                      width: '50%',
                      padding: 2,
                      flexDirection: 'row',
                    }}
                  >
                    <InputComp
                      inputOne="Dealer/Seller’s Address"
                      outputOne={formdetails?.autoFinSelInfDealerSellerAddress || 'N/A'}
                    />
                  </View>{' '}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderBottom: '1px solid #6E2585',
                    borderRight: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',

                    color: '#6E2585',
                  }}
                >
                  <View
                    style={{
                      ...styles.textFont,
                      // borderLeft: '1px solid #6E2585',
                      width: '50%',
                      padding: 2,
                      flexDirection: 'row',
                    }}
                  >
<InputComp
                        inputOne="Registration No"
                        outputOne={formdetails?.autoFinVehInfRegistrationNo || 'N/A'}
                      />                  </View>
                  <View
                    style={{
                      ...styles.textFont,
                      // borderLeft: '1px solid #6E2585',
                      width: '50%',
                      padding: 2,
                      flexDirection: 'row',
                    }}
                  >
                    <InputComp
                      inputOne="Dealer/Seller’s Email ID"
                      outputOne={formdetails?.autoFinSelInfDealerSellerEmailId || 'N/A'}
                    />
                  </View>{' '}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderBottom: '1px solid #6E2585',
                    borderRight: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',

                    color: '#6E2585',
                  }}
                >
                  <View
                    style={{
                      ...styles.textFont,
                      // borderLeft: '1px solid #6E2585',
                      width: '50%',
                      padding: 2,
                      flexDirection: 'row',
                    }}
                  >
                    <InputComp inputOne="Purpose:" outputOne={formdetails?.autoFinVehInfPurpose || 'N/A'} />
                  </View>
                  <View
                    style={{
                      ...styles.textFont,
                      // borderLeft: '1px solid #6E2585',
                      width: '50%',
                      padding: 2,
                      flexDirection: 'row',
                    }}
                  >
                    <InputComp
                      inputOne="Seller CR NO (if any):"
                      outputOne={formdetails?.autoFinSelInfSellerCRNOifany || 'N/A'}
                    />
                  </View>{' '}
                </View>
              </View>

               {/* (
                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <PdfTable
                    head="BANKING RELATIONSHIPS"
                    body={
                      <View
                        style={{
                          flexDirection: 'row',

                          width: '100%',
                        }}
                      >
                        <View style={{ flexDirection: 'row', width: '50%' }}>
                          <View style={{ flexDirection: 'column', width: '50%' }}>
                            <View
                              style={{
                                padding: 2,
                                // borderBottom: '1px solid #6E2585',
                                textAlign: 'center',
                                borderRight: '1px solid #6E2585',
                                backgroundColor: '#C0C0C0',
                                color: '#6E2585',
                              }}
                            >
                              <Text style={{ height: '20px', paddingTop: 3 }}>Bank Name</Text>
                            </View>
                            {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                              <View
                                style={{
                                  padding: 2,
                                  borderTop: '1px solid #6E2585',
                                  borderRight: '1px solid #6E2585',
                                }}
                              >
                                <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3, fontSize: 8 }}>
                                  {item.autoFinBankRelBankName || 'N/A'}
                                </Text>
                              </View>
                            ))}
                          </View>
                          <View style={{ flexDirection: 'column', width: '50%' }}>
                            <View
                              style={{
                                padding: 2,
                                // borderBottom: '1px solid #6E2585',
                                textAlign: 'center',
                                borderRight: '1px solid #6E2585',
                                backgroundColor: '#C0C0C0',
                                color: '#6E2585',
                              }}
                            >
                              <Text style={{ height: '20px', color: '#6E2585', paddingTop: 3 }}>Account Number</Text>
                            </View>
                            {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                              <View
                                style={{
                                  padding: 2,
                                  borderTop: '1px solid #6E2585',
                                  borderRight: '1px solid #6E2585',
                                }}
                              >
                                <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3, fontSize: 8 }}>
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
                                // borderBottom: '1px solid #6E2585',
                                textAlign: 'center',
                                borderRight: '1px solid #6E2585',
                                backgroundColor: '#C0C0C0',
                                color: '#6E2585',
                              }}
                            >
                              <Text style={{ height: '20px', textAlign: 'center', paddingTop: 2 }}>
                                Type of Account
                              </Text>
                            </View>
                            {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                              <View
                                style={{
                                  padding: 2,
                                  borderTop: '1px solid #6E2585',
                                  borderRight: '1px solid #6E2585',
                                }}
                              >
                                <Text style={{ height: '20px', textAlign: 'center', paddingTop: 2, fontSize: 8 }}>
                                  {item?.autoFinBankRelBankTypeofAccount?.value}
                                </Text>
                              </View>
                            ))}
                          </View>
                          <View style={{ flexDirection: 'column', width: '50%', textAlign: 'center' }}>
                            <View
                              style={{
                                padding: 2,
                                // borderBottom: '1px solid #6E2585',
                                // borderRight: '1px solid #6E2585',
                                backgroundColor: '#C0C0C0',
                                color: '#6E2585',
                              }}
                            >
                              <Text style={{ height: '20px', textAlign: 'center', paddingTop: 2 }}>
                                Relationship Since
                              </Text>
                            </View>
                            {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                              <View style={{ padding: 2, borderTop: '1px solid #6E2585' }}>
                                <Text style={{ height: '20px', textAlign: 'center', paddingTop: 2, fontSize: 8 }}>
                                  {dayjs(formdetails?.autoFinBankRelBankRelationshipSince)?.format('DD-MM-YYYY') ||
                                    'N/A'}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    }
                  />
                </View>
              ) */}
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>

          <View style={{ flexDirection: 'column', gap: 2, marginBottom: 5 }}>
            <PdfTable
              head="BANKING RELATIONSHIPS"
              body={
                <View
                  style={{
                    flexDirection: 'row',

                    width: '100%',
                  }}
                >
                  <View style={{ flexDirection: 'row', width: '50%' }}>
                    <View style={{ flexDirection: 'column', width: '50%' }}>
                      <View
                        style={{
                          padding: 2,
                          // borderBottom: '1px solid #6E2585',
                          textAlign: 'center',
                          borderRight: '1px solid #6E2585',
                          backgroundColor: '#C0C0C0',
                          color: '#6E2585',
                        }}
                      >
                        <Text style={{ height: '20px', paddingTop: 3 }}>Bank Name</Text>
                      </View>
                      {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                        <View
                          style={{
                            padding: 2,
                            borderTop: '1px solid #6E2585',
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
                          // borderBottom: '1px solid #6E2585',
                          textAlign: 'center',
                          borderRight: '1px solid #6E2585',
                          backgroundColor: '#C0C0C0',
                          color: '#6E2585',
                        }}
                      >
                        <Text style={{ height: '20px', color: '#6E2585', paddingTop: 3 }}>Account Number</Text>
                      </View>
                      {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                        <View
                          style={{
                            padding: 2,
                            borderTop: '1px solid #6E2585',
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
                          // borderBottom: '1px solid #6E2585',
                          textAlign: 'center',
                          borderRight: '1px solid #6E2585',
                          backgroundColor: '#C0C0C0',
                          color: '#6E2585',
                        }}
                      >
                        <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>Type of Account</Text>
                      </View>
                      {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                        <View
                          style={{
                            padding: 2,
                            borderTop: '1px solid #6E2585',
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
                          // borderBottom: '1px solid #6E2585',
                          // borderRight: '1px solid #6E2585',
                          backgroundColor: '#C0C0C0',
                          color: '#6E2585',
                        }}
                      >
                        <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>Relationship Since</Text>
                      </View>
                      {formdetails?.autoFinBankingRelationships?.map((item: any, index: any) => (
                        <View style={{ padding: 2, borderTop: '1px solid #6E2585' }}>
                          <Text style={{ height: '20px', textAlign: 'center', paddingTop: 3 }}>
                            {dayjs(item?.autoFinBankRelBankRelationshipSince)?.format('DD-MM-YYYY') || 'N/A'}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              }
            />
          </View>

        <View style={{ flexDirection: 'column' }}>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 5,
              borderBottom: '1px solid #6E2585',
              borderTop: '1px solid #6E2585',
              borderLeft: '1px solid #6E2585',
              borderRight: '1px solid #6E2585',
            }}
          >
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '18%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', color: '#6E2585' }}>Type of Liability</Text>
              </View>

              <View style={{ width: '35%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', color: '#6E2585' }}>Bank</Text>
              </View>
              <View style={{ width: '26%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', color: '#6E2585' }}>Amount Outstanding</Text>
              </View>

              <View style={{ width: '26%', backgroundColor: '#C0C0C0' }}>
                <Text style={{ textAlign: 'center', color: '#6E2585' }}>Monthly Payment</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Personal Finance</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>
                  {formdetails?.autoFinBankRelPersonalFinanceBank || 'N/A'}
                </Text>
                {/* Omani Bank Ul Hujjati */}
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelPersonalFinanceAmountOutstanding || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelPersonalFinanceMonthlyPayment || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Auto Finance</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>
                  {formdetails?.autoFinBankRelPersonalFinanceBank || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelAutoFinanceAmountOutstanding || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelAutoFinanceMonthlyPayment || 'N/A'}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Credit Card</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>
                  {formdetails?.autoFinBankRelCreditCardBank || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelCreditCardAmountOutstanding || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.autoFinBankRelCreditCardMonthlyPayment}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Home Finance</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>
                  {formdetails?.autoFinBankRelHomeFinanceBank || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelHomeFinanceAmountOutstanding || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelHomeFinanceMonthlyPayment || 'N/A'}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 8, color: '#6E2585',lineHeight:1.1 }}
                >{`Other Liability (including\n3rd Party Guarantees)`}</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>
                  {formdetails?.autoFinBankRelOtherLiabilityBank || 'N/A'}
                </Text>
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelOtherLiabilityAmountOutstanding || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
              <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center', fontSize: 8, color: '#6E2585' }}>Total</Text>
              </View>

              <View style={{ width: '35%', borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}>
                {/* <Text style={{ textAlign: 'center' }}>{formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}</Text> */}
              </View>
              <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                <Text style={{ textAlign: 'center' }}>
                  {formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}
                </Text>
              </View>

              <View style={{ width: '26%' }}>
                <Text style={{ textAlign: 'center' }}>{formdetails?.autoFinBankRelTotalMonthlyPayment || 'N/A'}</Text>
              </View>
            </View>
          </View>
          {/* <View
          style={{
            flexDirection: 'row',
            borderLeft: '1px solid #6E2585',
            width: '100%',
            borderRight: '1px solid #6E2585',
            borderTop: '1px solid #6E2585',
            marginTop: 5,
          }}
        >
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
                <Text style={{ height: '20px', paddingTop: 3 }}>Type of Liability</Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                <Text style={{ padding: 2, color: '#6E2585', textAlign: 'center', paddingTop: 3 }}>
                  Personal Finance
                </Text>
              </View>

              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                <Text style={{ padding: 2, color: '#6E2585', textAlign: 'center', paddingTop: 3 }}>Auto Finance</Text>
              </View>

              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                <Text style={{ padding: 2, color: '#6E2585', textAlign: 'center', paddingTop: 3 }}>Credit Card</Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                <Text style={{ padding: 2, color: '#6E2585', textAlign: 'center', paddingTop: 3 }}>auto Finance</Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                <Text style={{ padding: 0.5, color: '#6E2585', textAlign: 'center', fontSize: 7 }}>
                  Other Liability (including 3rd Party Guarantees)
                </Text>
              </View>

              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                <Text style={{ color: '#6E2585', textAlign: 'center', paddingTop: 2 }}>Total</Text>
              </View>
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
                <Text style={{ height: '20px', paddingTop: 3 }}>Bank</Text>
              </View>

              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelPersonalFinanceBank || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelAutoFinanceBank || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelCreditCardBank || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelautoFinanceBank || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelOtherLiabilityBank || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', backgroundColor: '#C0C0C0', paddingTop: 3 }}>
                </Text>
              </View>
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
                <Text style={{ height: '20px', paddingTop: 2 }}>Amount Outstanding </Text>
              </View>

              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelPersonalFinanceAmountOutstanding  || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelAutoFinanceAmountOutstanding || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelautoFinanceAmountOutstanding || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelautoFinanceAmountOutstanding || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelOtherLiabilityAmountOutstanding || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', width: '50%', textAlign: 'center' }}>
              <View
                style={{
                  padding: 2,
                  borderBottom: '1px solid #6E2585',
                  textAlign: 'center',
                  // borderRight: '1px solid #6E2585',
                  backgroundColor: '#C0C0C0',
                  color: '#6E2585',
                }}
              >
                <Text style={{ height: '20px', paddingTop: 3 }}>Monthly Payment</Text>
              </View>

              <View style={{ borderBottom: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelPersonalFinanceMonthlyPayment || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelAutoFinanceMonthlyPayment || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelCreditCardMonthlyPayment}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelautoFinanceMonthlyPayment || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelOtherLiabilityMonthlyPayment || 'N/A'}
                </Text>
              </View>
              <View style={{ borderBottom: '1px solid #6E2585', padding: 0.5 }}>
                <Text style={{ height: '18px', textAlign: 'center', paddingTop: 3 }}>
                  {formdetails?.autoFinBankRelTotalMonthlyPayment || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View> */}

          <View>
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
                      <InputComp inputOne="Name" outputOne={formdetails?.autoFinInOmanName || 'N/A'} />
                      <InputComp
                        inputOne="Relationship"
                        outputOne={formdetails?.autoFinInOmanRelationship?.value || 'N/A'}
                      />
                      <InputComp inputOne="Employer" outputOne={formdetails?.autoFinInOmanEmployer || 'N/A'} />
                      <InputComp inputOne="Address" outputOne={formdetails?.autoFinInOmanAddress || 'N/A'} />
                      <InputComp inputOne="Office Tel" outputOne={formdetails?.autoFinInOmanOfficeTel || 'N/A'} />
                      <InputComp inputOne="Mobile" outputOne={formdetails?.autoFinInOmanMobile || 'N/A'} />
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
                      <InputComp inputOne="Name" outputOne={formdetails?.autoFinInautoCountryName || 'N/A'} />
                      <InputComp
                        inputOne="Relationship"
                        outputOne={formdetails?.autoFinInautoCountryRelationship?.value || 'N/A'}
                      />
                      <InputComp inputOne="Employer" outputOne={formdetails?.autoFinInautoCountryEmployer || 'N/A'} />
                      <InputComp inputOne="Address" outputOne={formdetails?.autoFinInautoCountryAddress || 'N/A'} />
                      <InputComp
                        inputOne="Office Tel"
                        outputOne={formdetails?.autoFinInautoCountryOfficeTel || 'N/A'}
                      />
                      <InputComp inputOne="Mobile" outputOne={formdetails?.autoFinInautoCountryMobile || 'N/A'} />
                    </View>
                  </View>
                </View>
              }
            />
          </View>
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
                  irrevocably and unconditionally undertakes to purchase the Property from the Bank in the Applicant’s
                  own name in accordance with the terms of the Murabaha Financing Agreement.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>2.</Text>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>
                  The Applicant’s payment and other obligations under the Murabaha Financing Agreement will be secured
                  by a Mortgage to be granted by the Applicant to the Bank, and other securities as needed.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>3.</Text>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>
                  3. The Bank is not under any obligation to purchase the Property if the Applicant fails to fulfill all
                  the conditions precedent to the Murabaha Financing Agreement or defaults on any of the Applicant’s
                  further obligation thereunder.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>4.</Text>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>
                  Any deposit paid by the Applicant to the Bank or any of its agents shall serve as a security (Hamish
                  Jiddiyah) to secure the Applicant’s promise to purchase the Property and, in the event of the
                  Applicant breaching this promise, the Bank shall be authorised to sell the Property and to set off
                  against its actual losses between the cost price of the Property and the subsequent sales proceeds
                  thereof. Following such deduction from the deposit, the Bank shall refund the balance of the deposit
                  to the Applicant, if any, and conversely, the Applicant shall be liable for any shortfall between the
                  deposit amount and the Bank’s actual losses in this regard.
                </Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 2 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>4.</Text>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>
                  . Terms used in this Promise to Purchase shall have the same meaning as given to those terms in the
                  Murabaha Financing Agreement
                </Text>
              </View>
              <CheckBoxComp val={formdetails?.autoFinPromisetoPurchaseLease} label="I/We agree to the Promise to Purchase/Lease and acknowledge the terms as outlined in the Goods Murabaha Agreement/Service Ijara Agreement"/>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'column', gap: '5px' }}>
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
                  I/We agree that the information given above is true and complete, and that I/We have read and
                  understood the Bank’s General Terms and Conditions for the operation of Accounts and Electronic
                  Banking Services and those applicable specifically to the type of account/financing chosen by me/us,
                  I/We understand and expressly agree and accept to be bound by them whether set out in English and/or
                  Arabic, I/We confirm that all expected inward remittances to my/our account(s) will comply with the
                  stipulations of the Central Bank of Oman.
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
                          Continue to transfer my salary on a monthly basis directly from my employer to my account
                          number (the “Bank Account”) held with Smart Ven (“The Bank”) until all moneys owed by me to
                          the Bank are fully paid; and
                        </Text>
                      </View>

                      <View style={styles.thirdRow}>
                        <Text style={{ color: '#6E2585', fontSize: 8 }}>ii)</Text>

                        <Text style={{ color: '#6E2585', fontSize: 8 }}>
                          Inform the Bank immediately on termination of my present employment & provide the Bank with a
                          new Salary Transfer Letter in the event that I am no longer employed by my current employer no
                          later than 5 business days from the date I resume work with a new employer and further
                          undertake to continue to transfer my salary on a monthly basis directly from my new employer
                          to Bank Account held with the Bank until all moneys owed by me to the Bank are fully paid; and
                        </Text>
                      </View>

                      <View style={styles.thirdRow}>
                        <Text style={{ color: '#6E2585', fontSize: 8 }}>iii)</Text>

                        <Text style={{ color: '#6E2585', fontSize: 8 }}>
                          Transfer all my end of service benefits to my account with Smart Ven
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.thirdRow}>
                    <View style={{ flexDirection: 'column', gap: 5 }}>
                      <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Text style={{ color: '#6E2585', fontSize: 8 }}>b)</Text>

                        <Text style={{ color: '#6E2585', fontSize: 8 }}>
                          {' '}
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
              <CheckBoxComp label="I/We agree to the terms and conditions of this Declaration" val={formdetails?.autoFinConsentandDeclaration}/>
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
            <View style={{ flexDirection: 'row', width: '100%', gap: 5,alignItems:'center'}}>
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

            {/* For Bank use only */}

            {/* <View
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
                          <View style={styles.secondRow}>
                            <Text style={styles.textFont}>CIF No.:</Text>
                            <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                          </View>
                          <View style={styles.secondRow}>
                            <Text style={styles.textFont}>Branch:</Text>
                            <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                          </View>
                          <View style={styles.secondRow}>
                            <Text style={styles.textFont}>DSR/PBO Code:</Text>
                            <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                          </View>
                          <View style={styles.secondRow}>
                            <Text style={styles.textFont}>DSR/PBO Name:</Text>
                            <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                          </View>
                          <View style={styles.secondRow}>
                            <Text style={styles.textFont}>DSR/PBO Signature</Text>
                            <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          height: 'auto',
                          // borderRight: '1px solid #6E2585',
                          fontSize: '10px',
                          borderTop: '1px solid #6E2585',
                          borderBottom: '1px solid #6E2585',
                          // borderLeft: '1px solid #6E2585',
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
                          <Text style={styles.secondLabel}>Recommended by:</Text>
                          <View style={styles.secondRow}>
                            <Text style={styles.textFont}>Signature::</Text>
                            <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                          </View>

                          <View style={styles.secondRow}>
                            <Text style={styles.textFont}>Name:</Text>
                            <Text style={{ borderBottom: '1px solid black', width: '100px', marginBottom: 2 }}></Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View> */}

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

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View
                  style={{
                    height: 'auto',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderLeft: '1px solid #6E2585',
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
                      gap: 4,
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
                    borderRight: '1px solid #6E2585',
                    fontSize: '10px',
                    borderTop: '1px solid #6E2585',
                    borderBottom: '1px solid #6E2585',
                    // borderLeft: '1px solid #6E2585',
                    width: '50%',
                  }}
                >
                  <View
                    style={{
                      color: '#6E2585',
                      paddingHorizontal: '5px',
                      paddingVertical: '15px',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <InputComp inputOne="Recommended by" outputOne=" " />
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

      <AutoFinanceArabicFormPDFProps data={data} />
    </Document>
  );
}
