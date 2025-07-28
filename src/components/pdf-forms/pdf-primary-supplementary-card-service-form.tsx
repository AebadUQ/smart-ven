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
import { InputComp } from './input-component';
import { ArabicPrimarySupplementaryCardReqFormPDFProps } from './pdf-arabic-forms/arabic-primary-supplementary-card-service-form';
import { PdfFooter } from './pdf-footer';
import { PdfHeader } from './pdf-header';
import { PdfTable } from './pdf-table-component';

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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
    width: '100px',
    fontSize: 8,
    marginLeft: 5,
    paddingTop: 5,

    // textAlign:"right"},
  },
  checkBoxColor: {
    height: '100%',
    width: '100%',
    backgroundColor: '#6E2585',
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
    paddingLeft: 5,
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
    fontSize:8,
    // marginBottom: 1,
    // marginTop: 'auto',
    flexGrow:1
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

export function PrimarySupplementaryCardReqFormPDFProps({ data }: InvoicePDFDocumentProps): React.JSX.Element {
  console.log('here is our data', data?.creatdAt);
  let formdetails = data?.user_form_detail;
  console.log('formdetails', formdetails);
  const formatedDate = dayjs(data?.updatedAt)?.format('DDMMYYYY');
  const dateOfJoin = dayjs(formdetails?.createasrEmpDateOfJoiningdAt)?.format('DD/MM/YYYY');
  const passExpiry = dayjs(formdetails?.asrPassportExpiryDate)?.format('DD/MM/YYYY');
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader formName={data?.form_name} />

        <View style={{ flexDirection: 'column', gap: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomDate date={formatedDate} />
          </View>

          <Text style={{ color: '#6E2B8C', fontSize: 7 }}>
            Note: Please complete in Block letters and sign in the appropriate space.
          </Text>
          <View style={{ flexDirection: 'column', gap: 2 }}>
            {/* <InputComp inputOne="Request Time:" /> */}
            <InputComp inputOne="Branch:" outputOne={formdetails?.primSuppCSRBranch?.value} />

            <View style={{ flexDirection: 'row', gap: 50, alignItems: 'center', width: '40%' }}>
              <Text style={styles.secondLabel}>Card Type:</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <CheckBoxComp
                  label={formdetails?.primSuppCSRCardType?.value}
                  val={formdetails?.primSuppCSRCardType?.value}
                />

              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 19, alignItems: 'center', width: '40%',marginTop:5 }}>
              <Text style={styles.secondLabel}>Card Relationship:</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <CheckBoxComp
                  label={formdetails?.primSuppCSRCardRelationship?.value}
                  val={formdetails?.primSuppCSRCardRelationship?.value}
                />
                {/* <CheckBoxComp label="Supplementary " /> */}
              </View>
            </View>
            <View style={{flexDirection:"column", gap:5}}>

            <View style={{ flexDirection: 'row', gap: 4,marginTop:5 }}>
              <Text style={styles.secondLabel}>Card Number:</Text>
              <AccountBoxes data={formdetails?.primSuppCSRCardNumber.split('')} />
            </View>

            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={styles.secondLabel}>Account Number:</Text>
              <AccountBoxes data={formdetails?.primSuppCSRAccountNumber.split('')} />
              </View>
              </View>
            <InputComp inputOne="CardHolder Name" outputOne={formdetails?.primSuppCSRNameofCardholder} inputTwo="CIF Number:" outputTwo={formdetails?.primSuppCSRCIFType} />

            <View style={{ flexDirection: 'row', gap: '5px', marginTop: 5,alignItems:'flex-start'}}>
              <View style={{ width: '13%' }}>
                <Text style={{color:'#6E2585'}}>Name on card:</Text>
              </View>
              <View style={{ flexDirection: 'row', width: '85%',gap:5,alignItems:'flex-start'}}>
                <View style={{ flexDirection: 'column-reverse', width: '5%' }}>
                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRTitle?.value || "N/A"}</Text>
                  <Text style={{ color: '#6E2B8C' }}>Title</Text>
                </View>
                <View style={{ flexDirection: 'column-reverse', width: '32.6666666667%' }}>
                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRFirstName || "N/A"}</Text>
                  <Text style={{ color: '#6E2B8C' }}>FirstName</Text>
                </View>

                <View style={{ flexDirection: 'column-reverse', width: '32.6666666667%' }}>
                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRSecondName || "N/A"}</Text>
                  <Text style={{ color: '#6E2B8C' }}>Second Name</Text>
                </View>

                <View style={{ flexDirection: 'column-reverse', width: '32.6666666667%'}}>
                  <Text style={styles.inputLine}>{formdetails?.primSuppCSRSurnameTribe || "N/A"}</Text>
                  <Text style={{ color: '#6E2B8C' }}>Surname/Tribe</Text>
                </View>
              </View>
            </View>
            <PdfTable
              head="REQUEST NEW PRIMARY/SUPPLEMENTARY* CARD"
              body={
                <View style={{ flexDirection: 'column', gap: 4, padding: 5 }}>
                  <View style={{ flexDirection: 'row', gap: 6,alignItems:'center' }}>
                    <Text style={styles.textFont}>Card Reletionship</Text>
                    <CheckBoxComp
                      label={formdetails?.primSuppCSRCardRelationship?.value}
                      val={formdetails?.primSuppCSRCardRelationship?.value}
                    />
                    {/* <CheckBoxComp label="Primary card" />
                      <CheckBoxComp label="Supplementary card" /> */}
                  </View>
                  <View style={{ flexDirection: 'row', gap: 4,width:'100%',flexGrow:1,alignItems:'center'}}>
                    <View style={{width:'12%'}}>
                    <Text style={styles.secondLabel}>Name on Card*</Text></View>
                    <View style={{width:"88%"}}>
                      <InputComp inputOne=" " outputOne={formdetails?.primSuppRNPSCNameonCard}/>
                    {/* <AccountBoxes data={formdetails?.primSuppRNPSCNameonCard.split('')} /> */}
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Text style={styles.secondLabel}>New Card Number:</Text>
                    <AccountBoxes length={14} />
                  </View>
                  <Text style={{ fontSize: 6 }}>*Supplementary card to be activated by Primary Cardholder. </Text>
                </View>
              }
            />
            <PdfTable
              head="CARD MAINTENANCE REQUEST"
              body={
                <>
                  <View style={{ flexDirection: 'column', gap: 2, padding: 2 }}>
                    <View style={{flexDirection:'row',gap:5,alignItems:'flex-end'}}>
                    <CheckBoxComp label="Card Renewal" val={formdetails?.csrCardRenewalByDateCheckBox}/>
                    {formdetails?.csrCardRenewalByDate ? <CustomDate date={dayjs(formdetails?.csrCardRenewalByDate).format('DDMMYYYY')} />:null }
                    </View>
                    <CheckBoxComp label="PIN Regeneration / Reset" val={formdetails?.csrPinRegenerationReset} />
                    <View style={{ flexDirection: 'column' }}>
                      <CheckBoxComp label="Address Change" val={formdetails?.csrAddressChange} />
                      {formdetails?.csrAddressChange && (
                        <View style={{ flexDirection: 'column', gap: 2,marginTop:2 }}>
                          <InputComp
                            inputOne="P.O BOX"
                            outputOne={formdetails?.csrAddressChangePOBox}
                            inputTwo="PC:"
                            outputTwo={formdetails?.csrAddressChangePC}
                            inputThree="GSM:"
                            outputThree={formdetails?.csrAddressChangeGSM}
                            inputFour="Residential Tel:"
                            outputFour={formdetails?.csrAddressChangeResTel}
                          />

                          <InputComp inputOne="Email" outputOne={formdetails?.csrAddressChangeEmail} />
                        </View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2,width:"100%" }}>
                      <View style={{width:'17%'}}>
                      <CheckBoxComp label="Updated Salary:" val={formdetails?.csrUpdatedSalary} /></View>
                      {formdetails?.csrUpdatedSalary && (
                        <View style={{width:'83%',flexGrow:1}}>
                        <InputComp outputOne={formdetails?.csrUpdatedSalaryAmount} inputOne=" " /></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', width:'100%' }}>
                      <View style={{width:'24%'}}>
                      <CheckBoxComp label="Updated Employer Name" val={formdetails?.csrUpdatedEmployerName} /></View>
                      {formdetails?.csrUpdatedEmployerName && (
                        <View style={{width:'76%',flexDirection:'row',gap:3, alignItems:'center', flexGrow:1}}>
                          <View style={{minWidth:'10%',maxWidth:'25%'}}>
                          <CheckBoxComp label={formdetails?.csrUpdatedEmployerNameSelectField?.value} val={formdetails?.csrUpdatedEmployerNameSelectField?.value}/></View>
                        <View style={{width:'75%',flexGrow:1}}><InputComp outputOne={formdetails?.csrUpdatedEmployerNameTextField} inputOne=" " /></View></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width:'100%' }}>
                      <View style={{width:'26%'}}>
                      <CheckBoxComp label="Card limit change from OMR" val={formdetails?.csrCardLimitChange} /></View>
                      {formdetails?.csrCardLimitChange && (
                        <View style={{width:"74%"}}>
                        <InputComp
                          outputSix={formdetails?.csrCardLimitChangeTextField}
                          inputSix=" "
                          n={85}
                          // inputTwo="to" outputTwo="gfrgf"
                        /></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width:'100%' }}>
                      <View style={{width:'23%'}}>
                      <CheckBoxComp label="Change Credit Card type" val={formdetails?.csrChangeCreditCardType} /></View>
                      {formdetails?.csrChangeCreditCardType && (
                        <View style={{width:'77%'}}>
                        <InputComp
                          outputOne={formdetails?.csrChangeCreditCardTypeFrom?.value}
                          inputOne="from"
                          inputTwo="to"
                          outputTwo={formdetails?.csrChangeCreditCardTypeTo?.value}
                        /></View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width:'100%' }}>
                      <View style={{width:'27%'}}>
                      <CheckBoxComp
                        label="Duplicate monthly statement"
                        val={formdetails?.csrDuplicateMonthlyStatementFor}
                      /></View>
                      {formdetails?.csrDuplicateMonthlyStatementFor === true && (
                        <View style={{width:'73%'}}>
                        <InputComp outputOne={dayjs(formdetails?.csrDuplicateMonthlyStatementForFrom).format('DD-MM-YYYY')} inputOne="From" inputTwo="To" outputTwo={dayjs(formdetails?.csrDuplicateMonthlyStatementForTo).format('DD-MM-YYYY')} /></View>
                      )}
                    </View>

                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <CheckBoxComp label="other" val={formdetails?.csrOthers} />
                      {formdetails?.csrOthers && <InputComp outputOne={formdetails?.csrOthersTextField} inputOne=" " />}
                    </View> */}

                    <View style={{ flexDirection: 'row', gap: 10, color: '#6E2B8C', alignItems: 'center',width:'100%' }}>
                      {/* <Text style={styles.textFont}>Card Replacement Due to Following Reasons: </Text> */}
                      <View style={{width:'40%'}}>
                      <CheckBoxComp label="Card Replacement Due to Following Reasons:" val={formdetails?.csrCardReplacementReasonCheckBox}/></View>
                    {formdetails?.csrCardReplacementReason?.value && <View style={{width:'17%'}}><CheckBoxComp
                        label={formdetails?.csrCardReplacementReason?.value}
                        val={formdetails?.csrCardReplacementReason?.value}
                      /></View>}
                      <View style={{width:'43%'}}>
                      <InputComp inputOne=" " outputOne={formdetails?.csrOtherReplacementReason}/></View>

                    </View>
                  </View>
                </>
              }
            />
          </View>
        </View>
        <PdfFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={{flexDirection:'column', gap:5}}>
          {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount || formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrChangeLinkAccount || formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount || formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount  &&

           <PdfTable
          head="LINK / DELINK - DEFAULT ACCOUNT"
          body={
            <>
              <View style={{ flexDirection: 'column', gap: 4, padding: 4 }}>
                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount && (
                  <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', paddingHorizontal: 2 }}>
                    <CheckBoxComp
                      label="Add Link Account No.: "
                      val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount}
                    />

                    <AccountBoxes data={formdetails?.csrAddLinkAccountTextField?.split('')} />
                    <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
                    <CheckBoxComp
                      label={formdetails?.csrAddLinkAccountSelectField?.value}
                      val={formdetails?.csrAddLinkAccountSelectField?.value}
                    />
                  </View>
                )}

                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount && (
                  <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', paddingHorizontal: 2 }}>
                    <CheckBoxComp
                      label="Remove Link Account No.: "
                      val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount}
                    />

                    <AccountBoxes data={formdetails?.csrRemoveLinkAccountTextField?.split('')} />
                    <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
                    <CheckBoxComp
                      label={formdetails?.csrRemoveLinkAccountSelectField?.value}
                      val={formdetails?.csrRemoveLinkAccountSelectField?.value}
                    />
                  </View>
                )}
                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrChangeLinkAccount && (
                  <View style={{ flexDirection: 'column', gap: 4, padding: 2 }}>
                    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <CheckBoxComp label="Change Link Account from Account No.:" val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrChangeLinkAccount}/>
                      <AccountBoxes data={formdetails?.csrChangeLinkAccountFrom?.split('')} />
                      <Text style={{ fontSize: 8, color: '#6E2B8C' }}>to:</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                      <AccountBoxes data={formdetails?.csrChangeLinkAccountTo?.split('')} />
                      <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
                      <CheckBoxComp
                        label={formdetails?.csrChangeLinkAccountSelectField?.value}
                        val={formdetails?.csrChangeLinkAccountSelectField?.value}
                      />
                    </View>
                  </View>
                )}
                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount && (
                  <View style={{ flexDirection: 'column', gap: 1, padding: 2 }}>
                    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <CheckBoxComp
                        label="Change Default Account to Account No.:"
                        val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount}
                      />
                      <AccountBoxes data={formdetails?.csrDefaultAccountTextField?.split('')} />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                      <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
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
          }
        {/* <PdfTable
          head="LINK / DELINK - DEFAULT ACCOUNT"
          body={
            <>
              <View style={{ flexDirection: 'column', gap: 4, padding: 4 }}>
                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount && (
                  <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', paddingHorizontal: 2 }}>
                    <CheckBoxComp
                      label="Add Link Account No.: "
                      val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrAddLinkAccount}
                    />

                    <AccountBoxes data={formdetails?.csrAddLinkAccountTextField?.split('')} />
                    <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
                    <CheckBoxComp
                      label={formdetails?.csrAddLinkAccountSelectField?.value}
                      val={formdetails?.csrAddLinkAccountSelectField?.value}
                    />
                  </View>
                )}

                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount && (
                  <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', paddingHorizontal: 2 }}>
                    <CheckBoxComp
                      label="Remove Link Account No.: "
                      val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrRemoveLinkAccount}
                    />

                    <AccountBoxes data={formdetails?.csrRemoveLinkAccountTextField?.split('')} />
                    <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
                    <CheckBoxComp
                      label={formdetails?.csrRemoveLinkAccountSelectField?.value}
                      val={formdetails?.csrRemoveLinkAccountSelectField?.value}
                    />
                  </View>
                )}
                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrChangeLinkAccount && (
                  <View style={{ flexDirection: 'column', gap: 4, padding: 2 }}>
                    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <CheckBoxComp label="Change Link Account from Account No.:" val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrChangeLinkAccount}/>
                      <AccountBoxes data={formdetails?.csrChangeLinkAccountFrom?.split('')} />
                      <Text style={{ fontSize: 8, color: '#6E2B8C' }}>to:</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                      <AccountBoxes data={formdetails?.csrChangeLinkAccountTo?.split('')} />
                      <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
                      <CheckBoxComp
                        label={formdetails?.csrChangeLinkAccountSelectField?.value}
                        val={formdetails?.csrChangeLinkAccountSelectField?.value}
                      />
                    </View>
                  </View>
                )}
                {formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount && (
                  <View style={{ flexDirection: 'column', gap: 1, padding: 2 }}>
                    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                      <CheckBoxComp
                        label="Change Default Account to Account No.:"
                        val={formdetails?.csrAddRemoveChangeDefaultLinkAccount?.csrDefaultAccount}
                      />
                      <AccountBoxes data={formdetails?.csrDefaultAccountTextField?.split('')} />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                      <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Type of account:</Text>
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
        /> */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8,alignItems:'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 8 }}>Customer Signature:</Text>
            <Text style={styles.input}></Text>
          </View>
          <CustomDate date={' '.repeat(8)} />
        </View>
        <PdfTable
          head="POS / CASH WITHDRAWAL / FUND TRANSFER LIMIT CHANGE REQUEST FOR DEBIT CARD"
          body={
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '15%',
                    padding: 4,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>NETWORK</Text>
                </View>

                <View
                  style={{
                    width: '15%',
                    padding: 4,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>TRANSACTION TYPE</Text>
                </View>

                <View
                  style={{
                    width: '35%',
                    padding: 4,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>USAGE DAILY LIMIT (OMR)</Text>
                </View>

                <View
                  style={{
                    width: '35%',
                    padding: 4,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#6E2B8C',
                    backgroundColor: '#C0C0C0',
                    borderBottom: '1px solid #6E2B8C',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>NUMBER OF FREQUENCY PER DAY</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '15%',
                    justifyContent: 'center',
                    // padding: 4,
                    textAlign: 'center',
                    color: '#6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                  }}
                >
                  <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                    <Text style={{ fontSize: 8 }}>ON-US / Bank Nizwa</Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '15%',
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
                      <Text style={{ fontSize: 8 }}>Cash</Text>
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
                      <Text style={{ fontSize: 8 }}>Fund Transfer </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: '35%',

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
                        // textAlign: 'center',
                        color: '#6E2B8C',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        // flexWrap:'wrap'
                      }}
                    >
                      {/* <InputComp n={40} inputSeven=" " outputSeven={`1234567891234567891234567891234567899898`}/> */}
                      <Text style={{ fontSize: 7,textAlign:'start' }}>{formdetails?.csrOnUsBankNizwaCashUsageDailyLimit || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrOnUsBankNizwaFundUsageDailyLimit
                       || 'N/A'}</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: '35%',

                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                    // borderRight: "1px solid #6E2B8C",
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
                      <Text style={{ fontSize: 8 ,textAlign:'start'}}>{formdetails?.csrOnUsBankNizwaCashNoOfFreqPerDay || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}> {formdetails?.csrOnUsBankNizwaFundNoOfFreqPerDay || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '15%',
                    justifyContent: 'center',
                    // padding: 4,
                    textAlign: 'center',
                    color: '#6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                    borderRight: '1px solid #6E2B8C',
                  }}
                >
                  <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                    <Text style={{ fontSize: 8 }}>MasterCard</Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '15%',
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
                      <Text style={{ fontSize: 8 }}>POS</Text>
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
                      <Text style={{ fontSize: 8 }}>Cash</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: '35%',

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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrMasterCardPOSUsageDailyLimit || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrMasterCardCashUsageDailyLimit || 'N/A'}</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: '35%',

                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#6E2B8C',
                    borderBottom: '1px solid #6E2B8C',
                    // borderRight: "1px solid #6E2B8C",
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrMasterCardPOSNoOfFreqPerDay || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrMasterCardCashNoOfFreqPerDay || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '15%',
                    justifyContent: 'center',
                    // padding: 4,
                    textAlign: 'center',
                    color: '#6E2B8C',
                    // borderBottom: "1px solid #6E2B8C",
                    borderRight: '1px solid #6E2B8C',
                  }}
                >
                  <View style={{ color: '#6E2B8C', padding: 4, textAlign: 'center' }}>
                    <Text style={{ fontSize: 8 }}>OmanNet</Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '15%',
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
                      <Text style={{ fontSize: 8 }}>POS</Text>
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
                      <Text style={{ fontSize: 8 }}>Cash</Text>
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
                      <Text style={{ fontSize: 8 }}>Fund Transfer</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: '35%',

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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrOmannetPOSUsageDailyLimit || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8 ,textAlign:'start'}}>{formdetails?.csrOmannetCashUsageDailyLimit || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrOmannetFundTransferUsageDailyLimit || 'N/A'}</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: '35%',

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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrOmannetPOSCashNoOfFreqPerDay || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrOmannetCashUsageDailyLimit || 'N/A'}</Text>
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
                      <Text style={{ fontSize: 8,textAlign:'start' }}>{formdetails?.csrOmannetFundTransferNoOfFreqPerDay || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          }
        />
        {formdetails?.csrSelectDuration?.value &&
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <View style={{ width: '15%', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <CheckBoxComp label={formdetails?.csrSelectDuration?.value} val={formdetails?.csrSelectDuration?.value} />
          </View>
          <View style={{ flexDirection: 'row',width: '85%', alignItems: 'center', justifyContent: 'flex-start' }}>
            <InputComp inputOne="From" outputOne={dayjs(formdetails?.csrSelectDurationTempFrom).format('DD-MM-YYYY') || 'N/A'} />
            <InputComp inputOne="to" outputOne={dayjs(formdetails?.csrSelectDurationTempTo).format('DD-MM-YYYY') || 'N/A'} />
          </View>
        </View>}


        <PdfTable
          head="SUPPLEMENTARY CREDIT CARD LIMIT PER DAY"
          body={
            <View
              style={{
                flexDirection: 'row',

                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', width: '50%' }}>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>Retail/POS Trax Frequency</Text>
                  </View>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>ATM cash Trax Frequency</Text>
                  </View>
                  <View style={{ padding: 2, borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>Retail/POS amount per transaction</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>{formdetails?.csrRetailPOSTraxFrequency || 'N/A'}</Text>
                  </View>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>{formdetails?.csrATMCashTraxFrequency || 'N/A'}</Text>
                  </View>
                  <View style={{ padding: 2, borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>{formdetails?.csrRetailPOSAmountPerTransaction || 'N/A'}</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '50%' }}>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>Retail/POS amount</Text>
                  </View>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585', borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>ATM cash amount</Text>
                  </View>
                  <View style={{ padding: 2, borderRight: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>ATM cash amount per transaction</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', width: '50%' }}>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>{formdetails?.csrRetailPOSAmount || 'N/A'}</Text>
                  </View>
                  <View style={{ padding: 2, borderBottom: '1px solid #6E2585' }}>
                    <Text style={styles.textFont}>{formdetails?.csrATMCashAmount || 'N/A'}</Text>
                  </View>
                  <View style={{ padding: 2 }}>
                    <Text style={styles.textFont}>{formdetails?.csrATMCashAmountPerTransaction || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>
          }
        />
        <PdfTable
          head="CARD CANCELLATION REQUEST"
          body={
            <View style={{ flexDirection: 'column', gap: 2, paddingHorizontal: 10, paddingVertical: 5 }}>
              <Text style={styles.textFont}>Kindly request to cancel my card due to the following reasons:</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CheckBoxComp label="Card Services " val={formdetails?.csrCardService} />
                <CheckBoxComp
                  label="Transfer my Salary to another bank"
                  val={formdetails?.csrTransferMySalaryToAnotherBank}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CheckBoxComp label="Request for Finance Top-Up" val={formdetails?.csrRequestForFinanceTopUp} />
                <View style={{marginRight:63}}>
                  <CheckBoxComp label="Customer Services" val={formdetails?.csrCustomerService} />
                  </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <CheckBoxComp label="Fees and Charges" val={formdetails?.csrFeesAndChanges} />
              </View>
              <View style={{ flexDirection: 'row', width:'100%',gap:5,alignItems:'center' }}>
                <View style={{width:'19%'}}>
                <CheckBoxComp label="Customer Request" val={formdetails?.csrCardCancellationOthers} /></View>
                {formdetails?.csrCardCancellationOthersTextField && <View style={{width:'81%'}}>
                <InputComp inputOne=" " outputOne={formdetails?.csrCardCancellationOthersTextField}/></View>
             } </View>

              {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <CheckBoxComp
                  label="Cancel Relationship / Additional Card,"
                  val={formdetails?.csrCancelRelationshipAdditionalCard}
                /> {formdetails?.csrCancelRelationshipAdditionalCard &&
                <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Card Number: </Text>
                <AccountBoxes data={formdetails?.csrCancelRelationshipAdditionalCardTextField.split('')}/>
                  </View>
                }
              </View>
              <View style={{ flexDirection: 'row', gap: 2, width:'100%' }}>
                <CheckBoxComp label="Other:" val={formdetails?.csrCardCancellationOthers
} />
                <Text style={styles.input}>{formdetails?.csrCardCancellationOthersTextField || "N/A`"}</Text>
              </View> */}
              <Text style={{ textFont: 5, color: '#6E2B8C' }}>
                I confirm that I am fully aware and shall be held liable for any unauthorised/fraudulent transactions
                charged to my Card and not authorised by me before the request was given to the bank.
              </Text>
            </View>
          }
          />
        </View>
        <View style={{marginTop:5}}></View>
        <PdfTable
          head="Declaration"
          body={
            <View style={{ padding: 4 }}>
              <Text style={{ fontSize: 7, color: '#6E2B8C' }}>
                I hereby indemnify Bank Nizwa and hold the Bank harmless against any claim, cost, loss, liability,
                damage, expenses or otherwise of whatever nature arising fromincreasing the limit of the Bank Nizwa Card
                or from usage over the Internet or from the misuse, theft, fraud, negligence, bad faith or any illegal
                use of the card, and the Bank shall not in any circumstance whatsoever be held liable for any of the
                aforementioned. I also confirm that I am fully aware and shall be held liable for any
                unauthorised/fraudulent transactions charged to my Card and not authorised by me before the request of
                card cancellation/block was given to the bank.
              </Text>
            </View>
          }
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15  }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 8 }}>Customer Signature:</Text>
            <Text style={styles.input}></Text>
          </View>
          <CustomDate date={' '.repeat(8)} />
        </View>
        </Page>
      <Page size="A4" style={styles.page}>
        <View style={{flexDirection:'column', gap:5}}>

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
          <View style={{ flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR BANK USE ONLY</Text>
          </View>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textFont}> Staff Name/No.:</Text>
                <Text style={styles.input}></Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textFont}> Signature:</Text>
                <Text style={styles.input}></Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <CustomDate date={' '.repeat(8)} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textFont}> BM/ABM Signature & Stamp:</Text>

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
            <Text style={{ fontWeight: 400, fontSize: 10, color: '#56004E' }}>FOR CARD OPERATION USE ONLY</Text>
          </View>
          <View style={{ flexDirection: 'row-reverse', gap: 150, paddingTop: 10 }}>
            <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.textFont}>Signature:</Text>
                  </View>
                  <Text style={styles.input}></Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 30 }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Text style={styles.textFont}> BM/ABM Signature & Stamp:</Text>
                  </View>
                  <Text style={styles.input}></Text>
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
              <Text style={{ fontSize: 8, color: '#6E2B8C' }}>Date/Time Received & Stamp</Text>
            </View>
          </View>
          </View>
          </View>

        <PdfFooter />
      </Page>
      <ArabicPrimarySupplementaryCardReqFormPDFProps data={data} />
    </Document>
  );
}
