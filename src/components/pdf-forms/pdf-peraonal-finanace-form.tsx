'use client';

import * as React from 'react';
import { AccountBox, SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { typographyClasses } from '@mui/material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';

import { dayjs } from '@/lib/dayjs';

import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
// import DinFont from '../../font/DinTextARRegular.otf'; // Double-check the path

// import Din from '../../font/DinTextARRegular.otf';
import { CustomDate } from './custom-date';
import { InputComp } from './input-component';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PdfTable } from './pdf-table-component';

Font.register({
  family: 'Amiri',
  src: 'https://fonts.gstatic.com/s/amiri/v8/wXG5Bltw6Qmj8zJm8jxZ5Q.woff2', // Use a web-hosted font as a test
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
  rowFav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',
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
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    fontSize: 10,
    flexGrow: 1,
    alignSelf: 'flex-end',
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
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function PersonalFinanceFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('data', data);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  const relationshipSince = dayjs(formdetails?.perFinBanRelRelationshipSince).format('MMM D, YYYY h:mm A');
  const dataa = {
    dat: 'موقعنا',
  };
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
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <View style={{ flexDirection: 'column', gap: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                  <InputComp inputOne="CIF" outputOne={formdetails?.perFinPerDetCIFNumber} />
                  <InputComp inputOne="Customer Name" outputOne={formdetails?.perFinPerDetCustomerName} />
                </View>
                 <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{...styles?.thirdRow,width:"85%"}}>
                                      <View style={{ ...styles.checkboxRow, minWidth: '12.7%', gap: 10 }}>
                                        <Text style={styles.textFont}>Marital Status:</Text>
                                      </View>
                                      <View style={{ minWidth: '20%', justifyContent: 'flex-start' ,flexDirection:"row",alignItems:"center"}}>
                                        <View style={{minWidth:"14%"}}>
                                        <CheckBoxComp
                                          label={formdetails?.perFinPerDetMaritalStatus?.value}
                                          val={formdetails?.perFinPerDetMaritalStatus?.value}
                                        /></View>
                                        {formdetails?.perFinPerDetMaritalStatusOther &&
                                        <InputComp inputOne=" " outputOne={formdetails?.perFinPerDetMaritalStatusOther} />
                                        }
                                      </View>
                                    </View>
                                    <View style={{...styles.thirdRow, width:'15%'}}>
                                      <Text style={styles.textFont}>No of Dependency</Text>
                                      <Text style={styles.inputLine}>{formdetails?.perFinPerDetNoofDependents || "N/A"}</Text>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles?.thirdRow}>
                                      <View style={{ ...styles.checkboxRow, minWidth: '70px', gap: 10 }}>
                                        <Text style={styles.textFont}>Education Status:</Text>
                                      </View>
                                      <View style={{ maxWidth:"100%", justifyContent: 'flex-start' ,flexDirection:"row",alignItems:"center" }}>

                                       <View style={{minWidth:"20%"}}>
                                        <CheckBoxComp
                                          label={formdetails?.perFinPerDetEducationStatus?.value}
                                          val={formdetails?.perFinPerDetEducationStatus?.value}
                                        /></View>
                                        <View style={{width:"70%"}}>
                                        {formdetails?.perFinPerDetEducationStatusOther &&
                                        <InputComp inputOne=" " outputOne={formdetails?.perFinPerDetEducationStatusOther} />
                                       }
                                      </View></View>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles?.thirdRow}>
                                      <View style={{ ...styles.checkboxRow, width: '70px', gap: 10 }}>
                                        <Text style={styles.textFont}>Residence Status:</Text>
                                      </View>
                                      <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                                        <CheckBoxComp
                                          label={formdetails?.perFinPerDetResidenceStatus?.value}
                                          val={formdetails?.perFinPerDetResidenceStatus?.value}
                                        />
                                      </View>
                                    </View>
                                  </View>

                {/* <View>
                  <View style={[styles?.thirdRow, { padding: 0 }]}>
                    <View style={{ ...styles.checkboxRow, width: '70px', gap: 10 }}>
                      <Text style={styles.textFont}>Marital Status:</Text>
                    </View>
                    <View style={{ minWidth: '100px', justifyContent: 'flex-start',flexDirection:"row", gap:10,alignItems:"center" }}>
                      <CheckBoxComp
                        label={formdetails?.perFinPerDetMaritalStatus?.value}
                        val={formdetails?.perFinPerDetMaritalStatus?.value}
                        />
                        {formdetails?.perFinPerDetMaritalStatusOther &&
                        <InputComp inputOne=" " outputOne={formdetails?.perFinPerDetMaritalStatusOther}/>}

                    </View>
                  </View>
                </View> */}
                {/* <View>
                  <View style={[styles?.thirdRow, { padding: 0 }]}>
                    <View style={{ ...styles.checkboxRow, minWidth: '70px', gap: 10 }}>
                      <Text style={styles.textFont}>Education Status:</Text>
                    </View>
                    <View style={{ minWidth: '100px', justifyContent: 'flex-start',flexDirection:"row", gap:10,alignItems:"center"}}>
                      <CheckBoxComp
                        label={formdetails?.perFinPerDetEducationStatus?.value}
                        val={formdetails?.perFinPerDetEducationStatus?.value}
                      />
                      {formdetails?.perFinPerDetEducationStatusOther &&
                        <InputComp inputOne=" " outputOne={formdetails?.perFinPerDetEducationStatusOther}/>}
                    </View>
                  </View>
                </View>
                <View>
                  <View style={[styles?.thirdRow, { padding: 0 }]}>
                    <View style={{ ...styles.checkboxRow, width: '70px', gap: 10 }}>
                      <Text style={styles.textFont}>Residence Status:</Text>
                    </View>
                    <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                      <CheckBoxComp
                        label={formdetails?.perFinPerDetResidenceStatus?.value}
                        val={formdetails?.perFinPerDetResidenceStatus?.value}
                      />
                    </View>
                  </View>
                </View> */}
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
                  <View style={{ flexDirection: 'row', gap: 4,alignItems:'center' }}>
                    <Text style={styles.textFont}>Purpose of Finance: </Text>
                    <View style={styles.thirdRow}>
                      <CheckBoxComp
                        label={formdetails?.perFinFinaDetPurposeofFinance?.value}
                        val={formdetails?.perFinFinaDetPurposeofFinance?.value}
                      />


                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', gap: 4 }}>
                    <InputComp
                      inputOne="Finance Amount:"

                      outputOne={formdetails?.perFinFinaDetFinanceAmount}
                    />
                    <InputComp
                      inputOne="Monthly Payments (tentative):"

                      outputOne={formdetails?.perFinFinaDetMonthlyPaymentTentative || "N/A"}
                    />
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ flexDirection: 'column', width: '80%', gap: 2 }}>
                        <InputComp
                          inputOne="Monthly Income/Salary:"
                          inputTwo="Salary Day "
                          outputOne={formdetails?.perFinFinaDetSalaryDayofEachMonth}
                          outputTwo={formdetails?.perFinFinaDetMonthlyIncomeSalary}
                        />
                      </View>
                      <Text style={styles.textFont}>of each month</Text>
                    </View>
                    <InputComp inputOne="Source Of Additional Income:" inputTwo=" " outputOne={formdetails?.perFinFinaDetSourceofAdditionalIncomeOther}/>
                    <InputComp inputOne="Payment Method" outputOne={formdetails?.perFinFinaDetSIPaymentMethod?.value}/>
                    <View style={styles.column}>
                      <Text style={styles.textFont}>Payment Method: Standing Instructions (SI)</Text>
                      <AccountBoxes length={15} data={formdetails?.perFinFinaDetSIAccountNo.split('')} />
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
                 Seller Information
                </Text>
                <InputComp inputOne="Dealer/Seller’s Name" inputTwo="Dealer/Seller’s Phone Number" outputOne={formdetails?.perFinSelInfDealerSellerName} outputTwo={formdetails?.perFinSelInfDealerSellerPhone}/>
                <InputComp inputOne="Dealer/Seller’s Email ID" inputTwo="Dealer/Seller’s Address" outputOne={formdetails?.perFinSelInfDealerSellerEmail} outputTwo={formdetails?.perFinSelInfDealerSellerAddress}/>
                <InputComp inputOne="Seller ID NO" inputTwo="Seller CR NO (if any)" outputOne={formdetails?.perFinSelInfSellerIDNo} outputTwo={formdetails?.perFinSelInfSellerCRNo}/>
              </View>


              <View style={{ flexDirection: 'column', gap: 2 }}>



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
                        <View style={{ width: '20%', backgroundColor: '#C0C0C0'}}>
                          <Text style={{ textAlign: 'center' }}>Relationship Since</Text>
                        </View>
                      </View>
                      {formdetails?.perFinBankingRelationships
                  ?.map((item: any, index: any) =>

                      <View
                        style={{
                          // key={index}
                          flexDirection: 'row',
                          width: '100%',
                          // borderTop: '1px solid #6E2585',
                          // borderBottom: '1px solid #6E2585',
                        }}
                      >
                        <View style={{ width: '40%',  borderRight: '1px solid #6E2585',padding:2 }}>
                          <Text style={{ textAlign: 'center',fontSize:8 }}>{item?.perFinBanRelBankName || "N/A"}</Text>
                        </View>
                        <View style={{ width: '20%',borderRight: '1px solid #6E2585' ,padding:2}}>
                          <Text style={{ textAlign: 'center',fontSize:8}}>{item?.perFinBanRelAccountNumber || "N/A"}</Text>
                        </View>
                        <View style={{ width: '20%', borderRight: '1px solid #6E2585',padding:2 }}>
                          <Text style={{ textAlign: 'center',fontSize:8 }}>{item.perFinBanRelTypeofAccount?.value || "N/A"}</Text>
                        </View>
                        <View style={{ width: '20%',padding:2}}>
                          <Text style={{ textAlign: 'center',fontSize:8 }}>{dayjs(item?.perFinBanRelRelationshipSince)?.format('DD-MM-YYYY') || 'N/A'}</Text>
                        </View>
                      </View>)}

                    </View>
                  }
                />

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
                      <Text style={{ textAlign: 'center'}}>Bank</Text>
                    </View>
                    <View style={{ width: '26%', backgroundColor: '#C0C0C0', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center'}}>Amount Outstanding</Text>
                    </View>

                    <View style={{ width: '26%', backgroundColor: '#C0C0C0' }}>
                      <Text style={{ textAlign: 'center'}}>Monthly Payment</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                    <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center',fontSize:8,color:"#6E2585" }}>Personal Finance</Text>
                    </View>

                    <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {formdetails?.typLibPersonalFinanceBank || 'N/A'}
                      </Text>
                      {/* Omani Bank Ul Hujjati */}
                    </View>
                    <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibPersonalFinanceAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View style={{ width: '26%' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibPersonalFinanceMonthlyPayment || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                    <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center',color:"#6E2585",fontSize:8 }}>Auto Finance</Text>
                    </View>

                    <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {formdetails?.typLibAutoFinanceBank || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibAutoFinanceAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View style={{ width: '26%' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibAutoFinanceMonthlyPayment || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                    <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize:8, color:'#6E2585' }}>Credit Card</Text>
                    </View>

                    <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {formdetails?.typLibCreditCardBank || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibCreditCardAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View style={{ width: '26%' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibCreditCardMonthlyPayment || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                    <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize:8, color:'#6E2585'  }}>Home Finance</Text>
                    </View>

                    <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {formdetails?.typLibHomeFinanceBank || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibHomeFinanceAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View style={{ width: '26%' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibHomeFinanceMonthlyPayment || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                    <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                      <Text
                        style={{ textAlign: 'center', fontSize:8, color:'#6E2585'  }}
                      >{`Other Liability (including\n3rd Party Guarantees)`}</Text>
                    </View>

                    <View style={{ width: '35%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize: 8 }}>
                        {formdetails?.typLibOtherLibalityBank || 'N/A'}
                      </Text>
                    </View>
                    <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibOtherLibalityAmountOutstanding || 'N/A'}
                      </Text>
                    </View>

                    <View style={{ width: '26%' }}>
                      <Text style={{ textAlign: 'center' }}>
                        {formdetails?.typLibOtherLibalityMonthlyPayment || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', borderTop: '1px solid #6E2585' }}>
                    <View style={{ width: '18%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center', fontSize:8, color:'#6E2585'  }}>Total</Text>
                    </View>

                    <View style={{ width: '35%', borderRight: '1px solid #6E2585', backgroundColor: '#C0C0C0' }}>
                      {/* <Text style={{ textAlign: 'center' }}>{formdetails?.autoFinBankRelTotalAmountOutstanding || 'N/A'}</Text> */}
                    </View>
                    <View style={{ width: '26%', borderRight: '1px solid #6E2585' }}>
                      <Text style={{ textAlign: 'center' }}>{formdetails?.typLibTotalAmountOutstanding || 'N/A'}</Text>
                    </View>

                    <View style={{ width: '26%' }}>
                      <Text style={{ textAlign: 'center' }}>{formdetails?.typLibTotalMonthlyPayment || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View></View>
            </View>
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
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
                  <InputComp inputOne="Name" outputOne={formdetails?.refInOmanName || 'N/A'} />
                  <InputComp inputOne="Relationship" outputOne={formdetails?.refInOmanRelationship?.value || 'N/A'} />
                  <InputComp inputOne="Employer" outputOne={formdetails?.refInOmanEmployer || 'N/A'} />
                  <InputComp inputOne="Address" outputOne={formdetails?.refInOmanAddress || 'N/A'} />
                  <InputComp inputOne="Office Tel" outputOne={formdetails?.refInOmanOfficeTel || 'N/A'} />
                  <InputComp inputOne="Mobile" outputOne={formdetails?.refInOmanMobile || 'N/A'} />
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
                <View style={[styles.column, { paddingHorizontal: 4 }]}>
                  <InputComp inputOne="Name" outputOne={formdetails?.refInHomeCountryName || 'N/A'} />
                  <InputComp
                    inputOne="Relationship"
                    outputOne={formdetails?.refInHomeCountryRelationship?.value || 'N/A'}
                  />
                  <InputComp inputOne="Employer" outputOne={formdetails?.refInHomeCountryEmployer || 'N/A'} />
                  <InputComp inputOne="Address" outputOne={formdetails?.refInHomeCountryAddress || 'N/A'} />
                  <InputComp inputOne="Office Tel" outputOne={formdetails?.refInHomeCountryOfficeTel || 'N/A'} />
                  <InputComp inputOne="Mobile" outputOne={formdetails?.refInHomeCountryMobile || 'N/A'} />
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
            TERMS AND CONDITIONS
          </Text>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>1.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                The Applicant requests the Bank to purchase the Goods/Services for onward sale/lease to the Applicant
                and once the Bank notifies the Applicant that it has become the owner of the Goods/Services, the
                Applicant hereby irrevocably and unconditionally undertakes to purchase/lease the Goods/Services from
                the Bank in the Applicant’s own name in accordance with the terms of the Goods Murabaha
                Agreement/Service Ijara Agreement.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>2.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                The Bank is not under any obligation to purchase the Goods/Services if the Applicant fails to fulfill
                all the conditions precedent to the Goods Murabaha Agreement/Service Ijara Agreement or defaults on any
                of the Applicant’s further obligation thereunder
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>3.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                Terms used in this Promise to Purchase shall have the same meaning as given to those terms in the Goods
                Murabaha Agreement/Service Ijara Agreement
              </Text>
            </View>
            <CheckBoxComp val={formdetails?.refPromisetoPurchaseLease} label="I I/We agree to the Promise to Purchase/Lease and acknowledge the terms as outlined in the Goods Murabaha Agreement/Service Ijara Agreement "/>
          </View>
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
            CONSENT & DECLARATION
          </Text>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>1.</Text>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>
                I/We agree that the information given above is true and complete, and that I/We have read and understood
                the Bank’s General Terms and Conditions for the operation of Accounts and Electronic Banking Services
                and those applicable specifically to the type of account/financing chosen by me/us. I/We understand and
                expressly agree and accept to be bound by them whether set out in English and/or Arabic, I/We confirm
                that all expected inward remittances to my/our account(s) will comply with the stipulations of the
                Central Bank of Oman.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              <Text style={{ color: '#6E2585', fontSize: 8 }}>2.</Text>
              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text style={{ color: '#6E2585', fontSize: 8 }}>
                  I hereby irrevocably and unconditionally undertake to do the following:
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
                                <CheckBoxComp val={formdetails?.refConsentandDeclaration} label="I/We agree to the terms and conditions of this Declaration"/>

          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
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

        <PdfFooter />
      </Page>
    </Document>
  );
}
3;
