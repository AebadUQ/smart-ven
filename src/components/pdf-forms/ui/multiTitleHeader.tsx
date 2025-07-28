'use client';

import * as React from 'react';
import { Font, StyleSheet, Text, View } from '@react-pdf/renderer';

Font.register({
  family: 'Cairo',
  src: 'https://fonts.gstatic.com/s/tajawal/v10/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf',
});

const styles = StyleSheet.create({
  multiTitleHeader: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6E2585'
  },

  label: {
    fontWeight: 'bold',
    color: '#6E2B8C',
    fontSize: 12,
  },

  arabicLabel: {
    fontFamily: 'Cairo',
    fontWeight: 'bold',
    textAlign: 'right',
    direction: 'rtl',
    color: '#6E2B8C',
    fontSize: 12,
  },
});
const MultiTitleHeader = ({ titleEN, titleAR }: { titleEN: string; titleAR: string }) => {
  return (
    <View style={styles.multiTitleHeader}>
      <Text
        style={[
          styles.label,
          {
            fontSize: 10,
            fontWeight: 'bold',
            color: 'white',
            paddingTop: '4px',
            paddingLeft: '5px',
          },
        ]}
      >
        {titleEN || ' '}
      </Text>

      <Text
        style={[
          styles.arabicLabel,
          {
            fontSize: 10,
            fontWeight: 'bold',
            color: 'white',
            paddingTop: '4px',
            paddingRight: '5px',
          },
        ]}
      >
        {titleAR || ' '}
      </Text>
    </View>
  );
};

export default MultiTitleHeader;
