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
    gap: 2,
     width: '100%',
     alignItems: 'flex-start',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-start',
    // padding: 3,
    flexShrink:1

    // alignItems: 'flex-end',
    // justifyContent:'flex-end'
    // padding: 3,
    // paddingLeft: 5,
    // paddingRight: 3,
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
    // borderBottomWidth: 1,
    // borderBottomColor: '#6E2B8C',
    // fontSize: 8,
    // textAlign:"right",
    // minWidth: '50px',
    // flexGrow:1,
    // color:'black',
    // fontFamily:'Cairo',
    // direction:'rtl'

    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    textAlign: 'right',
    fontSize: 8,
    flexGrow: 1,
    flexWrap: 'wrap',
    // fontFamily: 'Cairo',
    // direction: 'rtl',
    alignItems: 'flex-start',
    color: 'black',
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
    width: '60%',
    paddingRight: 2,
    fontSize: 10,
    textAlign: 'left',
  },
  arabicText: {
    fontFamily: 'Cairo',
    fontSize: 8,
    color: '#6E2B8C',
    // verticalAlign: 'sub',
    textAlign: 'right',
    // direction:"rtl"
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
export const InputArabicComp = ({
  inputOne,
  inputTwo,
  inputThree,
  inputFour,
  inputFive,
  outputOne,
  outputTwo,
  outputThree,
  outputFour,
  outputFive,
  inputNine,
  outputNine,
  inputSix,
  outputSix,
  n,
}: {
  inputOne?: any;
  inputTwo?: any;
  inputThree?: any;
  inputFour?: any;
  inputFive?: any;
  outputOne?: any;
  outputTwo?: any;
  outputThree?: any;
  outputFour?: any;
  outputFive?: any;
  inputNine?: any;
  outputNine?: any;
  inputSix?: any;
  outputSix?: any;
  n?: any;
}) => {
  const breakTextIntoLines = (str = '', n: any) => {
    const regex = new RegExp(`.{1,${n}}`, 'g');
    return str.match(regex) || [];
  };
  const linesSix = breakTextIntoLines(outputSix, n);
  return (
    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
      {inputOne && (
        <View style={styles.arabicThirdRow}>
          <Text style={styles.arabicText}>{inputOne}:</Text>
          <Text style={[styles.inputLine]}>{outputOne}</Text>
        </View>
      )}

      {inputTwo && (
        <View style={styles.arabicThirdRow}>
          <Text style={styles.arabicText}>{inputTwo}:</Text>
          <Text style={styles.inputLine}>{outputTwo}</Text>
        </View>
      )}

      {inputThree && (
        <View style={styles.arabicThirdRow}>
          <Text style={styles.arabicText}>{inputThree}:</Text>
          <Text style={styles.inputLine}>{outputThree}</Text>
        </View>
      )}

      {inputFour && (
        <View style={styles.arabicThirdRow}>
          <Text style={styles.arabicText}>{inputFour}:</Text>
          <Text style={styles.inputLine}>{outputFour}</Text>
        </View>
      )}

      {inputFive && (
        <View style={styles.arabicThirdRow}>
          <Text style={styles.arabicText}>{inputFive}:</Text>
          <Text style={styles.inputLine}>{outputFive}</Text>
        </View>
      )}
      {inputSix && (
        <View style={{ ...styles.arabicThirdRow }}>
          <Text style={styles.arabicText}>{inputSix}</Text>

          <View style={{ flexGrow: 1 }}>
            {linesSix?.length > 1
              ? outputSix &&
                linesSix?.map((line, idx) => (
                  <Text
                    key={idx}
                    style={{
                      paddingTop:3,
                      // borderBottom: '1px solid black',
                      ...styles.inputLine,
                    }}
                  >
                    {line}
                  </Text>
                ))
              : outputSix && (
                  <Text
                    style={{
                      ...styles.input,
                    }}
                  >
                    {outputSix}
                  </Text>
                )}
          </View>
        </View>
      )}
      {inputNine && (
        <View style={{ ...styles.arabicThirdRow, gap: 2 }}>
          <View style={{ maxWidth: '45%', minWidth: '10%' }}>
            <Text style={{ ...styles.arabicText }}>:{inputNine}</Text>
          </View>
          <View style={{ width:'55%',flexGrow:2 }}>
            {outputNine && <Text style={{ ...styles.inputLine,flexWrap: 'wrap',
    fontSize: 8,
    flexGrow: 1,
    color: 'black',
 }}>{outputNine}</Text>}
          </View>
        </View>
      )}
    </View>
  );
};
