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
    // gap: 8,
    width: '100%',
    alignItems: 'flex-start',
    flexShrink: 1,
    // padding: 3,
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
    borderBottom:'1px solid #6E2B8C',
    // borderBottomWidth: 1,
    // borderBottomColor: '#6E2B8C',
    // color: '#6E2B8C',
    // textAlign:'center',
    // width: '50%',
    flexWrap: 'wrap',
    fontSize: 8,
    flexGrow: 1,
    color: 'black',


  },
});
export const InputComp = ({
  n,
  inputEight,
  inputSeven,
  inputOne,
  inputTwo,
  inputThree,
  inputFour,
  inputFive,
  inputSix,
  outputOne,
  outputTwo,
  outputThree,
  outputFour,
  outputFive,
  outputSix,
  outputSeven,
  outputEight,
  outputNine,
  inputNine,
}: {
  n?: any;
  inputOne?: any;
  inputTwo?: any;
  inputThree?: any;
  inputFour?: any;
  inputFive?: any;
  inputSix?: any;
  inputSeven?: any;
  inputEight?:any;
  outputOne?: any;
  outputTwo?: any;
  outputThree?: any;
  outputFour?: any;
  outputFive?: any;
  outputSix?: any;
  outputSeven?: any;
  outputEight?:any;
  inputNine?: any;
  outputNine?: any;
}) => {
  const breakTextIntoLines = (str = '', n: any) => {
    const regex = new RegExp(`.{1,${n}}`, 'g');
    return str.match(regex) || [];
  };
  const linesSix = breakTextIntoLines(outputSix, n);
  const linesSeven = breakTextIntoLines(outputSeven, n);
  const linesEight = breakTextIntoLines(outputEight, n);
  // console.log('lines', lines);
  return (
    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
      {/* width:100% */}
      {inputOne && (
        <View style={styles.thirdRow}>
          <Text style={styles.textFont}>{inputOne} </Text>
          {outputOne && <Text style={styles.input}>{outputOne}</Text>}
        </View>
      )}

      {inputTwo && (
        <View style={styles.thirdRow}>
          <Text style={styles.textFont}>{inputTwo} </Text>
          {outputTwo && <Text style={styles.input}>{outputTwo}</Text>}
        </View>
      )}

      {inputThree && (
        <View style={styles.thirdRow}>
          <Text style={styles.textFont}>{inputThree} </Text>
          {outputThree && <Text style={styles.input}>{outputThree}</Text>}
        </View>
      )}

      {inputFour && (
        <View style={styles.thirdRow}>
          <Text style={styles.textFont}>{inputFour} </Text>
          {outputFour && <Text style={styles.input}>{outputFour}</Text>}
        </View>
      )}

      {inputFive && (
        <View style={styles.thirdRow}>
          <Text style={styles.textFont}>{inputFive} </Text>
          {outputFive && <Text style={styles.input}>{outputFive}</Text>}
        </View>
      )}

       {inputEight && (
        <View style={{ ...styles.thirdRow, alignItems: 'flex-start',gap:5 }}>
          <Text style={{...styles.textFont, minWidth:'10%'}}>{inputEight}</Text>

          <View>
            {linesEight?.length > 1
              ? outputEight &&
                linesEight?.map((line, idx) => (
                  <Text
                    key={idx}
                    style={{
                      // borderBottom: '1px solid black',
                      ...styles.input,
                      // lineHeight:2

                      marginBottom:2
                    }}
                  >
                    {line}
                  </Text>
                ))
              : outputEight && (
                  <Text
                    style={{
                      ...styles.input,
                    }}
                  >
                    {outputEight}
                  </Text>
                )}
          </View>

        </View>
      )}

      {/* {inputNine && ( */}
        <View style={{...styles.thirdRow,gap:2}}>
          <View style={{maxWidth:"40%", minWidth:'10%'}}>
          <Text style={{...styles.textFont}}>{inputNine}: </Text></View>
          <View style={{width:'60%',flexGrow:10}}>
          {outputNine && <Text style={{...styles.input,maxWidth:'100%',flexGrow:5,textAlign:'left'
                     }}>{outputNine}</Text>}</View>
        </View>
      {/* )} */}


      {/* {inputNine && (
        <View style={{...styles.thirdRow,gap:2}}>
          <View style={{width:'25%', minWidth:'10%'}}>
          <Text style={{...styles.textFont}}>{inputNine}: </Text></View>
          <View style={{width:'75%',minWidth:'10%',flexGrow:1}}>
          {outputNine && <Text style={{...styles.input,minWidth:'100%',flexGrow:5
                     }}>{outputNine}</Text>}</View>
        </View>
      )} */}

      {inputSix && (
        <View style={{ ...styles.thirdRow, alignItems: 'flex-start' }}>
          <Text style={styles.textFont}>{inputSix}</Text>

          <View style={{flexGrow:1}}>
            {linesSix?.length > 1
              ? outputSix &&
                linesSix?.map((line, idx) => (
                  <Text
                    key={idx}
                    style={{
                      // borderBottom: '1px solid black',
                      ...styles.input,
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
      <View>
{
// linesSeven?.length > 1 ?
<View>
{(inputSeven &&

          linesSeven?.map((line, idx) => (
        <Text
          key={idx}
          style={{
          fontSize: 8,
         flexGrow: 1,
         color: 'black',
          }}
        >
          {line}
        </Text>
      )))}</View>
    //   : (outputSeven &&


    //     <Text

    //       style={{

    //          fontSize: 8,
    // flexGrow: 1,
    // color: 'black',

    //       }}
    //     >
    //       {outputSeven}
    //     </Text>
    //    )
       }
          </View>
    </View>
  );
};
