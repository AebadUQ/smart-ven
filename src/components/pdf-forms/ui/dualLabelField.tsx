'use client';

import * as React from 'react';
import { Font, StyleSheet, Text, View } from '@react-pdf/renderer';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
});

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  secondRow: {
    display: 'flex',
    flexDirection: 'row',
    width:"100%",
    gap: 5,
  },
  label: {
    fontWeight: 'bold',
    // marginTop: 4,
    marginRight: 2,
    color: '#6E2B8C',
    fontSize: 12,
  },
  secondLabel: {
    marginTop: 4,
    color: '#6E2B8C',
    width:"auto",
    fontSize: 9,
  },
  helperLabel: {
    color: '#6E2B8C',
    fontSize: 8,
  },
  helperLabelAR: {
    color: '#6E2B8C',
    fontSize: 8,
    fontFamily: 'Cairo',
    textAlign: 'right',
    direction: 'rtl',
  },
  secondLabelAR: {
    marginTop: 4,
    width:"auto",
    color: '#6E2B8C',
    fontSize: 9,
    fontFamily: 'Cairo',
    textAlign:'right'
  },
  arabicLabel: {
    fontFamily: 'Cairo',
    textAlign: 'right',
    direction: 'rtl',
    marginTop: 4,
    color: '#6E2B8C',
    fontSize: 9,
  },
    column: {
    display: 'flex',
    flexDirection: 'column',
    gap:"0px"
  },

});
const DualLabelField = ({
  labelEN,
  labelAR,
  value,
  helperEN,
  helperAR,
}: {
  labelEN: string;
  labelAR: string;
  value: string;
  helperEN?: string;
  helperAR?: string;
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.secondRow}>
          <Text style={styles.secondLabel}>{labelEN} : </Text>

        <View
          style={{ borderBottom: '0.5px solid #6E2B8C', display:'flex', justifyContent:'center', alignItems:"center", flexGrow:1, padding:0}}
        >
          <Text style={{fontFamily:'Cairo', textAlign:'center'}}>
          {value}
          </Text>
        </View>
          <Text style={styles.secondLabelAR}> : {labelAR}</Text>

      </View>
    </View>
  );
};

export default DualLabelField;
