import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';





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
    marginBottom: 10,
  },
  inlineProp: {
    display: 'flex',
    direction: 'row',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    justifyContent: 'flex-start',
    marginTop: '5px',
  },
  headerText: {
    fontSize: 10,
    color: '#6E2B8C',
  },
  section: {
    marginBottom: 8,
  },
  textFont: {
    fontSize: 8,
  },
  textFontCheckBox: {
    fontSize: 8,
    marginTop: 2,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 4,
    marginRight: 5,
  },
  branchLabel: {
    fontWeight: 'bold',
    marginLeft: 20,
  },
  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 4,
    // paddingVertical: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 5,
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
    // marginLeft: 2,
    display: 'flex',
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // fontSize: 8,
    // fontWeight: 'bold',
    // color: '#000',
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
    // textAlign: 'center',
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 12,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  brand: {
    width: '300px',
    height: '250px',
  },
  // table css

  tableHeader: {
    // textAlign: 'center',
    // color: '#6E2B8C',
    // fontWeight:"bold"
    paddingHorizontal: '20px',
    paddingVertical: '10px',
  },
  tableText: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  table: {
    height: 'auto',
    width: '100%',
    border: '1px solid #6E2B8C',
    // padding: 10,
  },
  tableHalf: {
    display: 'flex',
    flexDirection: 'column',

    // width: '50%',
  },
  tableRow: {
    display: 'flex',
    borderRight: '1px solid #6E2B8C',
    flexDirection: 'row',
    width: '50%',
  },
});
export const AccountBoxes = ({ length, data }: { length?: number,data?:any}) => {


  const items = data?.length > 0 ? data : Array.from({ length: length ?? 0 })

  return (

        <View style={{ flexDirection: 'row' }}>

          {items?.map((item: any, ind: any) => {
            // const extraMargin = ind === 2 || ind === 10 ? 10 : 2;
            return (
              <View
                key={ind}
                style={{
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                  borderColor: '#6E2B8C',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Text style={{ fontSize: 7, color:'black' }}>{item || null}</Text>
              </View>
            );
          })}
        </View>

  );
};
