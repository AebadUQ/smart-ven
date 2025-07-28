import { StyleSheet, Text, View } from '@react-pdf/renderer';

export function PDFTermsAndCondition({ data, direction }: any) {
  const { title, list } = data;
  let isRTL = direction === 'rtl';
  const styles = StyleSheet.create({
    page: {
      padding: 24,
      fontSize: 10,
      fontFamily: 'Helvetica',
      lineHeight: 1.3,
      borderTop: '8px solid #FFC000',
      borderBottom: '7px solid #6E2B8C',
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    inlineProp: {
      display: 'flex',
      direction: isRTL ? 'row-reverse' : 'row',
    },
    customRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: 5,
      alignItems: 'center',
      width: '100%',
    },
    row: {
      display: 'flex',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      gap: 2,
    },
    rowFav: {
      display: 'flex',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
    },
    secondRow: {
      display: 'flex',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      // justifyContent: 'space-between',
      // width: '70%',
      paddingLeft: 5,
      // gap: 5,
    },
    thirdRow: {
      display: 'flex',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',

      paddingLeft: 5,
    },
    fourthRow: {
      display: 'flex',
      flexDirection: isRTL ? 'row-reverse' : 'row',
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
    title: {
      fontWeight: 'bold',
      marginRight: 2,
      color: '#6E2B8C',
      fontSize: 18,
      textAlign: isRTL ? 'right' : 'left',
      fontFamily: 'Cairo',
    },
    subTitle: {
      fontWeight: 'semibold',
      color: '#6E2B8C',
      fontSize: 12,
      textAlign: isRTL ? 'right' : 'left',
      direction: direction,
      fontFamily: 'Cairo',
      lineHight:1
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
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: 2,
      // justifyContent: 'space-between',
      textAlign: 'center',
      marginBottom: 5,
    },
    dateCheckboxRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
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
    // arabicText: {
    //   fontFamily: 'Amiri', // Apply the Arabic font
    //   fontSize: 20,
    //   textAlign: 'right', // Right align text
    //   direction: 'rtl', // Force right-to-left text direction
    // },
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
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      justifyContent: 'center',
    },
  });

  return (
    <View style={{ flexDirection: 'column', marginTop: 5 }}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: 'column', gap: 2, marginTop: 5 }}>
        {list?.map((item: any, index: number) => (
          <View key={index} style={[styles.column, { marginLeft: 2 }]}>
            {item?.title && (
              <Text style={styles.subTitle}>
                {index + 1}. {item.title}
              </Text>
            )}
            {item?.description?.map((para: any, index: number) => (
              <>
                <View
                  style={[
                    styles.row,
                    {
                      // flexWrap: 'wrap',
                      fontFamily: 'Cairo',
                      maxWidth: '100%',
                      marginLeft: !isRTL ? 12 : 0,
                      marginRight: isRTL ? 12 : 0,
                    },
                  ]}
                >
                  {para?.isClosure && (
                    <Text
                      style={{
                        fontFamily: 'Cairo',
                        fontSize: 8,
                        color: '#6E2585',
                        textAlign: isRTL ? 'right' : 'left',
                      }}
                      >
                      {/* {item?.title ? {index + 1}.index + 1.{' '} : {index + 1}.{' '} }  */}
                    {item?.title ? `${index + 1}.${index + 1}. ` : `${index + 1}. `}


                    </Text>
                  )}
                  <Text
                    key={index}
                    style={{
                      fontSize: 8,
                      color: '#6E2585',
                      flexShrink: 1,
                      flexGrow: 1,
                      flexBasis: '0%',
                      fontFamily: 'Cairo',
                      textAlign: isRTL ? 'right' : 'left',
                    }}
                  >
                    {para?.text}
                  </Text>
                </View>

                {para?.subClause?.map((subClause: any, i: number) => (
                  <View key={i} style={[styles.row, { marginLeft: !isRTL ? 24 : 0, marginRight: isRTL ? 24 : 0 }]}>
                    {para?.isClosure && (
                      <Text
                        style={{
                          fontSize: 8,
                          color: '#6E2585',
                          textAlign: isRTL ? 'right' : 'left',
                          fontFamily: 'Cairo',
                        }}
                      >
                        {item?.title ? `${index + 1}.${index + 1}.${i + 1}. ` : `${index + 1}.${i + 1}. `}
                      </Text>
                    )}
                    <Text
                      key={i}
                      style={{
                        fontSize: 8,
                        textAlign: isRTL ? 'right' : 'left',
                        color: '#6E2585',
                        flexShrink: 1,
                        flexGrow: 1,
                        fontFamily: 'Cairo',
                        flexBasis: '0%',
                      }}
                    >
                      {subClause?.text}
                    </Text>
                  </View>
                ))}
              </>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
