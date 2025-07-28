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
  inlineProp: {
    display: 'flex',
    direction: 'row',
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
    // justifyContent: 'space-between',
    // gap: 5,
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
    // marginTop: 4,
    // marginRight: 5,
    color: '#6E2B8C',
    fontSize: 9,
  },

  inputLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#6E2B8C',
    color: 'black',
    // marginBottom: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

    justifyContent: 'center',
  },
});

export const CustomDate = ({ date }: any) => {
  return (
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
          <Text style={{ color: '#6E2B8C' }}>Date:</Text>
          <View style={{ flexDirection: 'row' }}>
            {date?.split('')?.map((items: any, index: number) => {
              const extraMargin = index === 1 || index === 3 ? 5 : 2;
              return (
                <View
                  key={index}
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: '#6E2B8C',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: '#000',
                    marginRight: extraMargin,
                    textAlign: 'center',
                    paddingTop: '2px',
                  }}
                >
                  <Text style={{ fontSize: 8 }}>{items ? items : null}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {/* <View style={{ flexDirection: "row", gap: 2 }}>
        <Text style={{ color: '#6E2B8C' }}>Date:</Text>
        <Text style={styles.inputLine}>{date || "N/A"}</Text>
      </View> */}
    </View>
  );
};
