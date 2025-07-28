'use client';

import * as React from 'react';
import { SignalWifiStatusbarConnectedNoInternet4Outlined } from '@mui/icons-material';
import { flexbox, style, textAlign } from '@mui/system';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { symbol } from 'zod';



import { dayjs } from '@/lib/dayjs';



import { AccountBoxes } from './account-number-boxes-component';
import { CheckBoxComp } from './checkbox-component';
import { CustomDate } from './custom-date';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { InputComp } from './input-component';


// Invoice data should be received as a prop.
// For the sake of simplicity, we are using a hardcoded data.

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
  fourthRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingLeft: 5,
    gap: 8,
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
    justifyContent: 'space-between',
    // width: '70%',
    // paddingLeft: 5,
    // gap: 5,
  },
  thirdRow: {
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
  },
  secondLabel: {
    // fontWeight: 'bold',
    marginTop: 4,
    // marginRight: 5,
    color: '#6E2B8C',
    fontSize: 9,
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
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    justifyContent: 'center',
  },
});

export interface InvoicePDFDocumentProps {
  data: any;
}

export function AccountOpeningAdditionalApplicantFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  let formdetails = data?.user_form_detail;
  const formatedDate = dayjs(data?.updatedAt).format('DDMMYYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />
        <View style={styles.column}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
            <View style={styles.row}>
              <Text style={styles.label}>Branch: </Text>
              <Text style={styles.inputLine}>{formdetails?.addAppRelationshipDetailsBranch?.value}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={{ flexDirection: 'column', gap: '2px' }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Text style={styles.label}>Existing Account Number: </Text>

                <AccountBoxes data={formdetails?.addAppRelationshipDetailsExistingAccountNo?.split('')} />
              </View>
            </View>
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
                marginBottom: 12,
                color: 'white',
                backgroundColor: '#6E2585',
                paddingTop: '4px',
                paddingLeft: '5px',
              }}
            >
              Relationship Details
            </Text>
            <View style={{ flexDirection: 'column', gap: '1px' }}>
              <View style={{ width: '40%' }}>
                <View style={styles?.secondRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>CIF Types: </Text>
                  </View>
                  <View style={{ width: '100px', justifyContent: 'flex-start' }}>
                    <CheckBoxComp label={formdetails?.addAppRelationshipDetailsCIFType?.value} val={formdetails?.addAppRelationshipDetailsCIFType?.value} />

                  </View>
                </View>


              </View>

              {/*  */}
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.secondRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Account Type:</Text>
                  </View>
                  <View style={{ width: '100px' }}>
                  <CheckBoxComp label={formdetails?.addAppRelationshipDetailsAccountType?.value} val={formdetails?.addAppRelationshipDetailsAccountType?.value} />


                  </View>
                </View>


              </View>
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.secondRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Account Currency:</Text>
                  </View>
                  <View style={{ width: '100px' }}>
                  <CheckBoxComp label={formdetails?.addAppRelationshipDetailsCurrency?.value} val={formdetails?.addAppRelationshipDetailsCurrency?.value} />


                  </View>
                </View>


              </View>
              <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                <View style={styles?.secondRow}>
                  <View style={styles.checkboxRow}>
                    <Text style={styles.textFontCheckBox}>Relationship Criteria:</Text>
                  </View>
                  <View style={{ width: '100px' }}>
                  <CheckBoxComp label={formdetails?.addAppRelationshipDetailsRelationshipCriteria?.value} val={formdetails?.addAppRelationshipDetailsRelationshipCriteria?.value} />

                  </View>
                </View>


              </View>
            </View>

            <View style={{ flexDirection: 'column', gap: '5px' }}>
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


                {/*  */}
                <View style={styles.column}>
                                <Text style={styles.secondLabel}>Name(s) of Additional Applicant(s) - as per ID Card</Text>
                                <View style={[{ flexDirection:"row",gap:5, width:"100%",paddingLeft:2}]}>
                                  <Text style={{ width: '5%' }}>Title</Text>
                                  <Text style={{ width: '31.6666666667%' }}>First Name</Text>
                                  <Text style={{ width: '31.6666666667%' }}>Second Name</Text>
                                  <Text style={{ width: '31.6666666667%' }}>Surname/Tribe</Text>
                                </View>
                                <View style={{flexDirection:'column', gap:3}}>
                                  <View style={{flexDirection:'row', alignItems:"center"}}>
                                  <Text>1.</Text>
                                  <View style={[ {width:'100%',gap:5,flexDirection:'row',paddingLeft:2 }]}>
                                    <Text style={{ borderBottom: '1px solid black', width: '5%',textAlign:'center' }}>
                                      {formdetails?.addAppRelationshipDetailsTitle?.value || 'N/A'}
                                    </Text>
                                    <Text style={{ borderBottom: '1px solid black', width: '31.6666666667%' }}>
                                      {formdetails?.addAppRelationshipDetailsFirstName || 'N/A'}
                                    </Text>
                                    <Text style={{ borderBottom: '1px solid black', width: '31.6666666667%' }}>
                                      {formdetails?.ddAppRelationshipDetailsSecondName || 'N/A'}
                                    </Text>
                                    <Text style={{ borderBottom: '1px solid black', width: '31.6666666667%' }}>
                                      {formdetails?.addAppRelationshipDetailsSurnameTribe || 'N/A'}
                                    </Text>
                                    </View>
                                  </View>
                                  <View style={{flexDirection:'row', alignItems:'center'}}>
                                  <Text>2.</Text>
                                  <View style={[{flexDirection:'row',gap:5,width:'100%',paddingLeft:2}]}>
                                    <Text style={{ borderBottom: '1px solid black', width: '5%',textAlign:"center"}}>
                                      {formdetails?.addAppSecAppDetTitle?.value || 'N/A'}
                                    </Text>
                                    <Text style={{ borderBottom: '1px solid black', width: '31.6666666667%' }}>
                                      {formdetails?.addAppSecAppDetFirstName || 'N/A'}
                                    </Text>
                                    <Text style={{ borderBottom: '1px solid black', width: '31.6666666667%' }}>
                                      {formdetails?.addAppSecAppDetSecondName || 'N/A'}
                                    </Text>
                                    <Text style={{ borderBottom: '1px solid black', width: '31.6666666667%' }}>
                                      {formdetails?.addAppAppDetSurnameTribe || 'N/A'}
                                    </Text>
                                    </View>
                                    </View>
                                </View>
                              </View>
                {/*  */}


              {/* ------------------------------------------------------------------------ */}
                <View style={{ display: 'flex', flexDirection: 'row',marginTop:5 }}>
                              <View
                                style={{
                                  fontSize: '10px',
                                  borderTop: '1px solid #6E2585',
                                  borderLeft: '1px solid #6E2585',
                                  width: '15%',
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
                                    height: '20px',
                                    padding: '6px',
                                  }}
                                > <Text style={{ fontSize: 8 }}> </Text></View>
                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}>Applicant 1</Text>
                                </View>
                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                  }}
                                >
                                  <View style={{ flexDirection: 'column', gap: 2 }}>
                                    <Text style={{ fontSize: 8, color: '#6E2585' }}>Applicant 2</Text>
                                    <Text style={{ fontSize: 6, color: '#6E2585' }}>(if joint account)</Text>
                                  </View>
                                </View>
                              </View>

                              <View
                                style={{
                                  fontSize: '10px',
                                  borderTop: '1px solid #6E2585',
                                  borderLeft: '1px solid #6E2585',
                                  width: '16.6666666667%',
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

                                    height: '20px',
                                  }}
                                >
                                  <Text style={{ fontSize: 10 }}>Nationality</Text>
                                </View>

                                <View
                                  style={{
                                    height: '22px',

                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}> {formdetails?.addAppRelationshipDetailsNationality?.value || 'N/A'}</Text>
                                </View>

                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}> {formdetails?.addAppAppDetNationality?.value || 'N/A'}</Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  fontSize: '10px',
                                  borderTop: '1px solid #6E2585',
                                  borderLeft: '1px solid #6E2585',
                                  width: '16.6666666667%',
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
                                    height: '20px',
                                  }}
                                >
                                  <Text style={{ fontSize: 10 }}>ID/Resident Card</Text>
                                </View>
                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}>{formdetails?.addAppRelationshipDetailsIDResidentCard || 'N/A'}</Text>
                                </View>

                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}>{formdetails?.addAppAppDetIDResidentCard || 'N/A'}</Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  borderRight: '1px solid #6E2585',
                                  fontSize: '10px',
                                  borderTop: '1px solid #6E2585',
                                  borderLeft: '1px solid #6E2585',
                                  width: '16.6666666667%',
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
                                    height: '20px',
                                  }}
                                >
                                  <Text style={{ fontSize: 10 }}>Expiry Date</Text>
                                </View>
                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                    // padding: '8px',
                                  }}
                                >
                                  <Text style={{fontSize:8}}>
                                    {formdetails?.caoAppDetPerExpiryDate
                                      ? dayjs(formdetails?.addAppRelationshipDetailsExpiryDate)?.format('DD-MM-YYYY')
                                      : 'N/A'}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                    // padding: '8px',
                                  }}
                                >
                                  <Text style={{fontSize:8}}>
                                    {formdetails?.caoSecAppDetPerExpiryDate
                                      ? dayjs(formdetails?.addAppAppDetPerExpiryDate)?.format('DD-MM-YYYY')
                                      : 'N/A'}
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  fontSize: '10px',
                                  borderTop: '1px solid #6E2585',
                                  width: '16.6666666667%',
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
                                    height: '20px',
                                  }}
                                >
                                  <Text>Date of Birth</Text>
                                </View>
                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                    // padding: '8px',
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}>
                                    {formdetails?.addAppRelationshipDetailsDateofBirth
                                      ? dayjs(formdetails?.addAppRelationshipDetailsDateofBirth)?.format('DD-MM-YYYY')
                                      : 'N/A'}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                    // padding: '8px',
                                  }}
                                >
                                  <Text style={{ fontSize: 8 }}>
                                    {formdetails?.addAppAppDetDateofBirth
                                      ? dayjs(formdetails?.addAppAppDetDateofBirth)?.format('DD-MM-YYYY')
                                      : 'N/A'}
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  borderRight: '1px solid #6E2585',
                                  fontSize: '10px',
                                  borderTop: '1px solid #6E2585',
                                  borderLeft: '1px solid #6E2585',
                                  width: '16.6666666667%',
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
                                    height: '20px',
                                  }}
                                >
                                  <Text>Gender</Text>
                                </View>
                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                    // padding: '8px',
                                  }}
                                >
                                  {/* {formdetails?.caoAppDetTitle?.id && ( */}
                                    <View style={styles.fourthRow}>
                                      <View style={styles.checkboxRow}>
                                        <View />

                                        <Text style={{fontSize:8}}>
                                          {formdetails?.addAppSecAppDetTitle?.id === 506 || formdetails?.addAppSecAppDetTitle?.id === 507
                                            ? 'F'
                                            : 'M'}
                                        </Text>
                                      </View>
                                    </View>
                                  {/* )} */}
                                </View>

                                <View
                                  style={{
                                    height: '22px',
                                    justifyContent: 'center',
                                    borderRight: 0,
                                    alignItems: 'center',
                                    color: '#6E2585',
                                    borderBottom: '1px solid #6E2585',
                                    width: '100%',
                                    // padding: '8px',
                                  }}
                                >
                                  {/* {formdetails?.caoSecAppDetTitle?.id && ( */}
                                    <View style={styles.fourthRow}>
                                      <View style={styles.checkboxRow}>
                                        <View/>

                                        <Text style={{fontSize:8}}>
                                          {formdetails?.caoSecAppDetTitle?.id === 506 ? formdetails?.caoSecAppDetTitle?.id === 507
                                            ? 'F'
                                            : 'M' : "N/A"}
                                        </Text>
                                      </View>
                                    </View>
                                  {/* )} */}
                                </View>
                              </View>
                            </View>

              <InputComp inputTwo="Type of Relationship:" outputTwo={formdetails?.addAppRelationshipDetailsAccountName || 'N/A'} inputOne="Account Name:" outputOne={formdetails?.addAppRelationshipDetailsAccountName || 'N/A'}/>

              <View style={{ flexDirection: 'row', gap: 10, alignItems:'center' }}>
                <Text style={styles.secondLabel}>Instruction for Account Operation: </Text>
                <View style={styles.thirdRow}>
                  <CheckBoxComp label={formdetails?.addAppRelationshipDetailsInstructionforAccountOperation?.value} val={formdetails?.addAppRelationshipDetailsInstructionforAccountOperation?.value} />

                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 5,
              }}
            >
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
                ATTORNEY/GUARDIAN
              </Text>
              <View style={{...styles.column,gap:10}}>

                <InputComp inputOne="Name of Attorney/Guardian:"  outputOne={formdetails?.addAppRelationshipDetailsNameofAttorneyGuardian?.value || "N/A"}/>
                <InputComp inputTwo="ID/PP No.:" outputTwo={formdetails?.addAppRelationshipDetailsIDPassportNo?.value || "N/A"}/>
                  <InputComp inputOne="Power of Attorney Expiry Date:" outputOne={formdetails?.addAppRelationshipDetailsPowerofAttorneyExpiryDate
                      ? dayjs(formdetails?.addAppRelationshipDetailsPowerofAttorneyExpiryDate)?.format('DD-MM-YYYY')
                      : 'N/A'}/>

              </View>
            </View>
            </View>
        </View>
        <PdfFooter/>
          </Page>
      <Page size="A4" style={styles.page}>
        <View style={{flexDirection:'column',gap:5}}>

            <View
              style={{
                flexDirection: 'column',
                gap: 5,
              }}
            >
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
                ATM CARDS
              </Text>
              <View style={styles.column}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                  <CheckBoxComp label={formdetails?.addAppATMDebitCardIssuance?.value} val={formdetails?.addAppATMDebitCardIssuance?.value} />

                </View>

                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <View style={styles.customRow}>
                    <Text style={{ fontSize: 9, color: '#6E2585' }}>
                      Additional Applicant 1 Name-Supplementary Card:
                    </Text>
                    <Text style={{ fontSize: 8, color: '#6E2585' }}>(English only: max 20 characters)</Text>
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={{ paddingTop: 5, color: '#6E2B8C' }}>1.</Text>

                      <View style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
                        <AccountBoxes data={formdetails?.addAppATMDebitAdditionalApplicant1Name?.split("")} />
                    </View>

                        {/* {formdetails?.addAppATMDebitAdditionalApplicant1Name?.split('')?.map((item: any, ind: any) => {
                          return (
                            <View
                              key={ind}
                              style={{
                                width: 17,
                                height: 17,
                                borderWidth: 1.5,
                                borderColor: '#6E2B8C',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                paddingTop: 2,
                              }}
                            >
                              <Text style={{ fontSize: 8 }}> {item} </Text>
                            </View>
                          );
                        })} */}

                    </View>
                                        <InputComp inputOne="ID/PP No.:" outputOne={formdetails?.addAppATMDebitIDPPNo1 || "N/A"} />

                  </View>
                </View>
                {formdetails?.addAppATMDebitAdditionalApplicant2Name &&

                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <View style={styles.customRow}>
                    <Text style={{ fontSize: 9, color: '#6E2585' }}>
                      Additional Applicant 2 Name-Supplementary Card:
                    </Text>
                    <Text style={{ fontSize: 8, color: '#6E2585' }}>(English only: max 20 characters)</Text>
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <Text style={{ paddingTop: 5, color: '#6E2B8C' }}>2.</Text>

                      <View style={{ marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
                        <AccountBoxes data={formdetails?.addAppATMDebitAdditionalApplicant2Name?.split('')} />

                    </View>


                    </View>
                    <InputComp inputOne={"ID/PP No.:"} outputOne={formdetails?.addAppATMDebitIDPPNo2 || "N/A"} />
                  </View>
                </View>}


              </View>
            </View>
            <View style={{ flexDirection: 'column',gap:2 }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  // marginBottom: 12,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                ADDITIONAL APPLICANT (1) DETAILS
              </Text>
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
                    <View style={styles.customRow}>
                      <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Source of Income:</Text>
                      <CheckBoxComp label={formdetails?.addAppRelationshipDetailsSourceofIncome?.value} val={formdetails?.addAppRelationshipDetailsSourceofIncome?.value} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Sector (if salary): </Text>
                      <CheckBoxComp label={formdetails?.addAppRelationshipDetailsSectorifsalary?.value} val={formdetails?.addAppRelationshipDetailsSectorifsalary?.value} />
                    </View>
                    <InputComp inputOne="Name of the Employer:" outputOne={formdetails?.addAppRelationshipDetailsNameoftheEmployer || 'N/A'} />
                    <InputComp inputOne="Nature of Business:" outputOne={formdetails?.addAppRelationshipDetailsNatureofBusiness || 'N/A'} />
                    <InputComp inputOne="Designation:" outputOne={formdetails?.addAppRelationshipDetailsDesignation || 'N/A'} />
                    <InputComp inputOne="Employee No.:" inputTwo="Date of Joining:" outputOne={formdetails?.addAppRelationshipDetailsEmployeeNo || 'N/A'} outputTwo={dayjs(formdetails?.addAppRelationshipDetailsDateofJoining)?.format('DD-MM-YYYY')} />
                    <InputComp inputOne="Passport No.*:" inputTwo="Passport Expiry Date*:" outputOne={formdetails?.addAppRelationshipDetailsPassportNo || 'N/A'} outputTwo={dayjs(formdetails?.addAppRelationshipDetailsPassportExpiryDate)?.format('DD-MM-YYYY')} />
                    <InputComp inputOne="Telephone:" inputTwo="Fax:" outputOne={formdetails?.addAppRelationshipDetailsTelephone || 'N/A'} outputTwo={formdetails?.addAppRelationshipDetailsFax || "N/A"} />
                    <InputComp inputOne="Income p.m" outputOne={formdetails?.addAppRelationshipDetailsIncomepm || "N/A"} />
                    <InputComp inputOne="Source of Other Income:" outputOne={formdetails?.addAppRelationshipDetailsSourceofOtherIncome || "N/A"} />
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
                    padding: 2,
                  }}
                >
                  <View style={styles.column}>

                    <InputComp inputOne="P.O Box:" inputTwo="Postal Code" outputOne={formdetails?.addAppRelationshipDetailsPOBox || "N/A"} outputTwo={formdetails?.addAppRelationshipDetailsPostalCode || "N/A"}/>
                    <InputComp inputOne="House No./Flat No.:" inputTwo="Building No.:" outputOne={formdetails?.addAppRelationshipDetailsHouseNoFlatNo || "N/A"} outputTwo={formdetails?.addAppRelationshipDetailsBuildingNo || "N/A"} />
                    <InputComp inputOne="Way No.:" inputTwo="Area:" outputOne={formdetails?.addAppRelationshipDetailsWayNo || "N/A"} outputTwo={formdetails?.addAppRelationshipDetailsArea || "N/A"} />
                    <InputComp inputOne="Wilayat:" inputTwo="Res. Tel. No.:" outputOne={formdetails?.addAppRelationshipDetailsWilayat || "N/A"} outputTwo={formdetails?.addAppRelationshipDetailsResTelNo || "N/A"} />
                    <InputComp inputOne="Mobile (1):" inputTwo="Mobile (2):" outputOne={formdetails?.addAppRelationshipDetailsMobile1 || "N/A"} outputTwo={formdetails?.addAppRelationshipDetailsMobile2 || "N/A"} />
                    <InputComp inputOne="Email" outputOne={formdetails?.addAppRelationshipDetailsEmail || "N/A"} />
                    <InputComp inputOne="Permanent Address (Home Country):" outputOne={formdetails?.addAppRelationshipDetailsPermanentAddressHomeCountry || "N/A"} />
                    <InputComp inputOne="Telephone:" outputOne={formdetails?.addAppRelationshipDetailsContactTelephone || "N/A"} />


                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  // marginBottom: 12,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                ADDITIONAL APPLICANT (2) DETAILS
              </Text>
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
                    <View style={styles.customRow}>
                      <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Source of Income:</Text>
                      <CheckBoxComp label={formdetails?.addAppAppDetSourceofIncome?.value} val={formdetails?.addAppAppDetSourceofIncome?.value} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: '#6E2B8C', fontSize: 9 }}>Sector (if salary): </Text>
                      <CheckBoxComp label={formdetails?.addAppAppDetSectorifsalary?.value} val={formdetails?.addAppAppDetSectorifsalary?.value} />
                    </View>
                    <InputComp inputOne="Name of the Employer:" outputOne={formdetails?.addAppAppDetNameofEmployer || 'N/A'} />
                    <InputComp inputOne="Nature of Business:" outputOne={formdetails?.addAppAppDetNatureofBusiness || 'N/A'} />
                    <InputComp inputOne="Designation:" outputOne={formdetails?.addAppAppDetDesignation || 'N/A'} />
                    <InputComp inputOne="Employee No.:" inputTwo="Date of Joining:" outputOne={formdetails?.addAppAppDetEmployeeNo || 'N/A'} outputTwo={formdetails?.addAppAppDetDateofJoining ? dayjs(formdetails?.addAppAppDetDateofJoining)?.format('DD-MM-YYYY') : 'N/A'} />
                    <InputComp inputOne="Passport No.*:" inputTwo="Passport Expiry Date*:" outputOne={formdetails?.addAppAppDetPassportNo || 'N/A'} outputTwo={dayjs(formdetails?.addAppAppDetPassportExpiryDate)?.format('DD-MM-YYYY') || "N/A"} />
                    <InputComp inputOne="Telephone:" inputTwo="Fax:" outputOne={formdetails?.addAppAppDetEmploymentTelephone || 'N/A'} outputTwo={formdetails?.addAppAppDetFax || "N/A"} />
                    <InputComp inputOne="Income p.m" outputOne={formdetails?.addAppAppDetIncomepm || "N/A"} />
                    <InputComp inputOne="Source of Other Income:" outputOne={formdetails?.addAppAppDetSourceofOtherIncome || "N/A"} />
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
                    padding: 2,
                  }}
                >
                  <View style={styles.column}>

                    <InputComp inputOne="P.O Box:" inputTwo="Postal Code" outputOne={formdetails?.addAppAppDetPOBox || "N/A"} outputTwo={formdetails?.addAppAppDetPostalCode || "N/A"}/>
                    <InputComp inputOne="House No./Flat No.:" inputTwo="Building No.:" outputOne={formdetails?.addAppAppDetHouseNoFlatNo || "N/A"} outputTwo={formdetails?.addAppAppDetBuildingNo || "N/A"} />
                    <InputComp inputOne="Way No.:" inputTwo="Area:" outputOne={formdetails?.addAppAppDetWayNo || "N/A"} outputTwo={formdetails?.addAppAppDetArea || "N/A"} />
                    <InputComp inputOne="Wilayat:" inputTwo="Res. Tel. No.:" outputOne={formdetails?.addAppAppDetWilayat || "N/A"} outputTwo={formdetails?.addAppAppDetResTelNo || "N/A"} />
                    <InputComp inputOne="Mobile (1):" inputTwo="Mobile (2):" outputOne={formdetails?.addAppAppDetMobile1 || "N/A"} outputTwo={formdetails?.addAppAppDetMobile2 || "N/A"} />
                    <InputComp inputOne="Email" outputOne={formdetails?.addAppAppDetEmail || "N/A"} />
                    <InputComp inputOne="Permanent Address (Home Country):" outputOne={formdetails?.addAppAppDetPermanentAddressHomeCountry || "N/A"} />
                    <InputComp inputOne="Telephone:" outputOne={formdetails?.addAppAppDetTelephone || "N/A"} />


                  </View>
                </View>
              </View>

          </View>
          </View>
        <PdfFooter/>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{flexDirection:'column',gap:5}}>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                marginTop:5
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  // marginBottom: 12,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                BANKING SERVICE REQUIRED
              </Text>
              <View style={styles.rowFav}>
                <View
                  style={{ flexDirection: 'column', width: '60%', borderRight: '1px solid #6E2585', paddingRight: 5,gap:5 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CheckBoxComp label={"Cheque Book"} val={formdetails?.addAppATMDebitCardChequeBook?.value} />

                    <View style={styles.rowFav}>
                      <CheckBoxComp label={formdetails?.addAppATMDebitCardChequeBook?.value} val={formdetails?.addAppATMDebitCardChequeBook?.value} />


                    </View>
                  </View>

                  <View style={{ flexDirection: 'row',marginTop:5, alignItems: 'center', justifyContent: 'space-between' }}>
                  <CheckBoxComp val={formdetails?.addAppATMDebitCardSMSAlert?.value} label="SMS Alerts for Account Transactions:"/>


                    <View style={styles.rowFav}>
                      <CheckBoxComp label={formdetails?.addAppATMDebitCardSMSAlert?.value} val={formdetails?.addAppATMDebitCardSMSAlert?.value} />



                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', padding: 2 }}></View>
                <CheckBoxComp label={"Email Alerts for Account Transactions"} val={formdetails?.addAppATMDebitCardEmailAlertsAccountTransactions} />

              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                marginTop:5
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  // marginBottom: 12,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                STATEMENT TYPE AND FREQUENCY
              </Text>
              <View style={styles.rowFav}>
                <View
                  style={{ flexDirection: 'column', width: '60%', borderRight: '1px solid #6E2585', paddingRight: 5,gap:5 }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                    <Text style={{ color: '#6E2585', fontSize: 8 }}>Standard Frequencies: </Text>
                    <Text style={{ color: '#6E2585', fontSize: 8 }}>Printed (Biannually) </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <CheckBoxComp label={"Change in Printed Frequency*, please specify"} val={formdetails?.addAppATMDebitCardChangesPrintedFrequency?.value} />
                    <View style={styles.rowFav}>
                      <CheckBoxComp label={formdetails?.addAppATMDebitCardChangesPrintedFrequency?.value} val={formdetails?.addAppATMDebitCardChangesPrintedFrequency?.value} />

                    </View>

                  </View>


                  <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:2, justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 8 }}>*Charges applicable</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:'50%',paddingHorizontal:5 }}>
                <CheckBoxComp val={formdetails?.addAppATMDebitCardChangesEmailFrequency?.value} label={"Email"} />


                    <CheckBoxComp val={formdetails?.addAppATMDebitCardChangesEmailFrequency?.value} label={formdetails?.addAppATMDebitCardChangesEmailFrequency?.value} />

                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 5,
                marginTop:10,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  // marginBottom: 12,
                  color: 'white',
                  backgroundColor: '#6E2585',
                  paddingTop: '4px',
                  paddingLeft: '5px',
                }}
              >
                TERMS AND CONDITIONS:
              </Text>
              <Text style={{ fontSize: 8,marginTop:2 }}>
                I/We confirm that the information given above is true and complete, and that I/We have received the
                Bank’s General Terms and Conditions for the operation of the Account(s) and Electronic Banking Services
                and those applicable specifically to the type of account chosen by me/us. I/We understand and expressly
                agree and accept to be bound by them whether set out in English and/or Arabic. I/We confirm that all
                expected inward remittances to my/our account(s) will comply with the stipulation of Central Bank of
                Oman.
              </Text>
        </View></View>
        <PdfFooter/>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
              <View
                style={{
                  fontSize: '10px',
                  borderTop: '1px solid #6E2585',
                  borderLeft: '1px solid #6E2585',
                  // borderBottom: '1px solid #6E2585',
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
                    height: '30px',
                    padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Name</Text>
                </View>
                <View
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    // padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>Additional Applicant 1</Text>
                </View>
                <View
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    // padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>Additional Applicant 2</Text>
                </View>
                <View
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    // padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>Primary Applicant</Text>
                </View>
                <View
                  style={{
                    height: '30px',
                    // backgroundColor: '#C0C0C0',
                    justifyContent: 'center',
                    borderRight: 0,
                    alignItems: 'center',
                    color: '#6E2585',
                    borderBottom: '1px solid #6E2585',
                    width: '100%',
                    // padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>Secondary Applicant</Text>
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
                    height: '30px',
                    // padding: '8px',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Signature/Thumb Impression</Text>
                </View>
                {Array.from({ length: 4 })?.map((items: any, index: any) => (
                  <View
                    key={index}
                    style={{
                      height: '30px',
                      // backgroundColor: '#C0C0C0',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                      // padding: '8px',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  // height: '150px',
                  borderRight: '1px solid #6E2585',
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
                    height: '30px',
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Signature Verified by Branch</Text>
                </View>
                {Array.from({ length: 4 })?.map((items: any, index: any) => (
                  <View
                    style={{
                      height: '30px',
                      // backgroundColor: '#C0C0C0',
                      justifyContent: 'center',
                      borderRight: 0,
                      alignItems: 'center',
                      color: '#6E2585',
                      borderBottom: '1px solid #6E2585',
                      width: '100%',
                      // padding: '8px',
                    }}
                  >
                    <Text style={{ fontSize: 8 }}>{items?.ctdCardholderAmount}</Text>
                  </View>
                ))}
              </View>
        </View>
        </Page>
        <Page size="A4" style={styles.page}>

            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: '10px',
                backgroundColor: '#FFFACD',
                padding: '5px',
                gap: 5,
              }}
            >
              <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>

              <View style={styles.column}>
                <Text style={styles.label}>List of documents obtained and verified against original/KYC steps</Text>
                {/*  */}
                <View>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 'auto',
                          fontSize: '10px',
                          borderTop: '1px solid #6E2585',
                          borderLeft: '1px solid #6E2585',
                          width: '20%',
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Customer ID
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Customer Passport
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Resident
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
                          width: '35%',
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Specimen Signature Card
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 8,
                                }}
                              >
                                2 Photographs for Special Needs Customers
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Customer Met in Person
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
                          width: '45%',
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Power of Attorney Document
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 8,
                                }}
                              >
                                Attested Copies of Original Mandate from the Account Holder
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Birth Certificate (for Minor Account Only)
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 'auto',
                          fontSize: '10px',
                          // borderTop: '1px solid #6E2585',
                          borderLeft: '1px solid #6E2585',
                          borderRight: '1px solid #6E2585',
                          width: '55%',
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
                              <View style={styles.smallCheckbox}></View>
                              <Text
                                style={{
                                  marginTop: 4,
                                  fontWeight: 'extrabold',
                                  color: '#6E2B8C',
                                  fontSize: 9,
                                }}
                              >
                                Monthly turnover of the account:
                              </Text>
                              <Text style={{ borderBottom: '1px solid #6E2B8C', width: '100px', marginTop: 8 }}></Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {/*  */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Text style={styles.secondLabel}>Customer Segment:</Text>
                  <View style={styles.thirdRow}>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Mass</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Mass Affluent </Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>Affluent</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                      <View style={styles.checkbox} />
                      <Text style={styles.secondLabel}>VIP</Text>
                    </View>
                  </View>
                </View>
                {/*  */}
                <View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View
                      style={{
                        height: 'auto',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        borderLeft: '1px solid #6E2585',
                        // borderBottom: '1px solid #6E2585',
                        width: '33.33333%',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',
                          alignItems: 'flex-start',
                          color: '#6E2585',
                          height: '30px',
                          width: '100%',
                          padding: '4px',
                        }}
                      ></View>
                      <View
                        style={{
                          height: '30px',
                          // backgroundColor: '#C0C0C0',
                          justifyContent: 'center',
                          borderRight: 0,
                          alignItems: 'center',
                          color: '#6E2585',
                          borderBottom: '1px solid #6E2585',
                          width: '100%',
                          // padding: '8px',
                        }}
                      >
                        <Text style={styles.label}> For Branch Use</Text>
                      </View>
                      <View
                        style={{
                          height: '30px',
                          // backgroundColor: '#C0C0C0',
                          justifyContent: 'center',
                          borderRight: 0,
                          alignItems: 'center',
                          color: '#6E2585',
                          borderBottom: '1px solid #6E2585',
                          width: '100%',
                          // padding: '8px',
                        }}
                      >
                        <Text style={styles.label}> For Operation Use</Text>
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
                        width: '33.33333%',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',

                          alignItems: 'flex-start',
                          color: '#6E2585',
                          height: '30px',
                          width: '100%',
                          padding: '7px',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Processed and Input By</Text>
                      </View>
                      {Array.from({ length: 2 })?.map((items: any, index: any) => (
                        <View
                          key={index}
                          style={{
                            height: '30px',
                            // backgroundColor: '#C0C0C0',
                            justifyContent: 'center',
                            borderRight: 0,
                            alignItems: 'center',
                            color: '#6E2585',
                            borderBottom: '1px solid #6E2585',
                            width: '100%',
                            // padding: '8px',
                          }}
                        >
                          <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
                        </View>
                      ))}
                    </View>

                    <View
                      style={{
                        height: 'auto',
                        borderRight: '1px solid #6E2585',
                        fontSize: '10px',
                        borderTop: '1px solid #6E2585',
                        // borderBottom: '1px solid #6E2585',
                        // borderLeft: '1px solid #6E2585',
                        width: '33.33333%',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: '#C0C0C0',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          borderBottom: '1px solid #6E2585',

                          alignItems: 'flex-start',
                          color: '#6E2585',
                          height: '30px',
                          width: '100%',
                          padding: '7px',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Data Input Verified and Authorised By</Text>
                      </View>
                      {Array.from({ length: 2 })?.map((items: any, index: any) => (
                        <View
                          key={index}
                          style={{
                            height: '30px',
                            // backgroundColor: '#C0C0C0',
                            justifyContent: 'center',
                            borderRight: 0,
                            alignItems: 'center',
                            color: '#6E2585',
                            borderBottom: '1px solid #6E2585',
                            width: '100%',
                            // padding: '8px',
                          }}
                        >
                          <Text style={{ fontSize: 8 }}> {items?.ctdCardholderMerchantName}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                {/*  */}
              </View>
              <View style={styles.customRow}>
                <View style={styles.customRow}>
                  <Text style={styles.secondLabel}>DSR/PBO Code:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2585', width: '150px', marginTop: 7 }}></Text>
                </View>
                <View style={styles.customRow}>
                  <Text style={styles.secondLabel}>DSR/PBO Name:</Text>
                  <Text style={{ borderBottom: '1px solid #6E2585', width: '150px', marginTop: 7 }}></Text>
                </View>
              </View>
            </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}
