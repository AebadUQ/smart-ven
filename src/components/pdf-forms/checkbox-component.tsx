import { Font, StyleSheet, Text, View } from '@react-pdf/renderer';





Font.register({
  family: 'DejaVuSans-Bold',
  src: '/fonts/DejaVuSans-Bold.ttf',
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
  tickMark: {
    fontSize: 11,
    fontFamily: 'DejaVuSans-Bold',
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
    color: '#6E2B8C',
    fontSize: 9,
    textAlign: 'left',
    lineHeight:1
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: '#6E2B8C',
  },
  checkboxRow: {
    alignItems: 'flex-end',
    gap: 2,
    // justifyContent: 'space-between',
    // textAlign: 'center',
    // marginBottom: 5,
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
    // borderWidth: 1,
    border: '1px solid #6E2B8C',
    display: 'flex',
    // justifyContent: 'flex-end',
    // textAlign: 'center',
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
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 8,
    direction: 'ltr',
    // textAlign: 'right',
    color: '#6E2B8C',
    // fontWeight: 400,
    marginTop: 4,
  },
});
export const CheckBoxComp = ({ val, label,direction}: { label?:any,val?: any,direction?:any }) => {
  return (
  <>
    { direction  ?
      <View style={{...styles.checkboxRow, flexDirection:"row-reverse",justifyContent: 'flex-start',alignItems:'center'}}>
      <View style={styles.checkbox}>
            {val ? <Text style={styles.tickMark}>{'\u2713'}</Text> : null}
      </View>
      <Text style={styles.arabicText}>{ label} </Text>
        </View> :
        <View style={{...styles.checkboxRow, flexDirection:"row",gap:5,alignItems:'center'}}>
        <View style={styles.checkbox}>
            {val ? <Text style={styles.tickMark}>{'\u2713'}</Text> : null}
        </View>
        <Text style={styles.secondLabel}>{label} </Text>
      </View>
    }</>

  );
};
