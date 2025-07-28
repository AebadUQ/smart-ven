import { StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';

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
});

export const CustomArabicDate = ({date}:any) => {
  return (
    <View style={{ flexDirection: "row-reverse"}}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row-reverse' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row-reverse',
                width: 115,
                marginLeft: 5,
                marginRight: 23,
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginLeft: 1, marginRight: 2 }}>
                يوم
              </Text>
              <Text style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginRight: 3, marginLeft: 15 }}>
                شهر
              </Text>
              <Text style={{ fontFamily: 'Cairo', fontSize: 8, color: 'gray', marginRight: 8 }}>سنة</Text>
            </View>

            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 2 }}>
              <Text
                style={{
                  color: '#6E2B8C',
                  fontFamily: 'Cairo',

                  textAlign: 'right',
                  paddingTop: 2,
                }}
              >
              :التاريخ
              </Text>
              <View style={{ flexDirection: 'row-reverse' }}>
                {Array.from({ length: 8 })?.map((_, index: number) => {
                  const extraMargin = index === 2 || index === 4 ? '7px' : '2px';
                  return (
                    <View
                      key={index}
                      style={{
                        width: 20,
                        height: 20,
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
      </View></View>

  );
};
