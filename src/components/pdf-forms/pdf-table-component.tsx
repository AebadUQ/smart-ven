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
    gap: 2,
    // padding: 3,
    paddingLeft: 3,
    paddingRIght: 3,
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
    width: '100px',
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 1,
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
    color: 'white',
    fontWeight: 400,
  },
});

export const  PdfTable = ({ head, body, direction }: any) => {
  return (
    <>
      {direction ? (
        <View style={{ ...styles.secondColumn, textAlign: 'right' }}>
          <Text
            style={{
              ...styles.arabicTextHead,
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingRight: '5px',
              textAlign: 'right',
            }}
          >
            {head}
          </Text>
          <View style={{ flexDirection: 'column', gap: 2, border: '1px solid #6E2B8C' }}>{body}</View>
        </View>
      ) : (
        <View style={styles.secondColumn}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#6E2585',
              paddingTop: '4px',
              paddingLeft: '5px',
            }}
          >
            {head}
          </Text>
          <View style={{ flexDirection: 'column', gap: 2, border: '1px solid #6E2B8C' }}>{body}</View>
        </View>
      )}
    </>
  );
};
