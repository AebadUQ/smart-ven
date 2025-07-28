import { StyleSheet, Text, View } from "@react-pdf/renderer";





const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12,
  },
  text: {
    fontSize: 8,
    color: '#6E2B8C',
  },
  foot: {
    position: 'absolute',
    bottom: '0px',
    width: '95%',
  },
});

export function PdfFooter() {
  return (
    <View style={styles.foot}>
      <View style={styles.row}>
      <Text style={styles.text}>www.banknizwa.om</Text>
      <Text style={styles.text}>Call Centre: 24 950 500</Text>

    </View>
    </View>
  )
}
