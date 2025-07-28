'use client';

import * as React from 'react';
import { Font, StyleSheet, Text, View } from '@react-pdf/renderer';





Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
});

const styles = StyleSheet.create({
  customRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '100%',
  },
  secondLabel: {
    fontWeight: 'semibold',
    color: '#6E2B8C',
    fontSize: 7,
    fontFamily: 'Cairo',
  },

  secondLabelAR: {
    fontWeight: 'semibold',
    color: '#6E2B8C',
    fontSize: 7,
    fontFamily: 'Cairo',
  },

  checkbox: {
    minWidth: 20,
    width: 20,
    height:20,
    marginRight: 6,
    minHeight: 15,
    // height: 15,
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
  tickMark: {
    fontSize: 11,
    fontFamily: 'DejaVuSans-Bold',
  },
  column: {
    display: 'flex',
    width: '120px',
    flexDirection: 'column',
    gap: 0,
    justifyContent: 'center',
  },

  arabicLabel: {
    fontFamily: 'Cairo',
    textAlign: 'right',
    direction: 'rtl',
    marginTop: 4,
    color: '#6E2B8C',
    fontSize: 9,
  },
});
const DualCheckbox = ({ labelEN, labelAR, isChecked }: { labelEN: string; labelAR: string; isChecked: boolean }) => {
  return (
    <View style={styles.customRow}>
     <View style={styles.checkbox}>
  {isChecked ? <Text style={styles.tickMark}>{'\u2713'}</Text> : null}
</View>
      <View style={styles.column}>
        <Text style={styles.secondLabelAR}>{labelAR}</Text>
        <Text style={styles.secondLabel}>{labelEN}</Text>
      </View>
    </View>
  );
};

export default DualCheckbox;
