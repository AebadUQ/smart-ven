import { Typography } from '@mui/material';
import { Image, Text, View } from '@react-pdf/renderer';

import logo from '/assets/form-logo.jpg';

export function PdfHeader({ formName }: any) {
  console.log('formName', formName);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',




        }}
      >
        <Text style={{ fontSize: 15, color: '#56004E',textAlign:"left"}}>{formName}</Text>
        <Image
          src="/assets/form-logo.jpg"
          style={{ width: '100px', height: '70px', objectFit: 'contain' }}
        />
      </View>
    </>

  );
}
