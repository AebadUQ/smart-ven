import { Typography } from '@mui/material';
import { Image, Text, View } from '@react-pdf/renderer';

import logo from '/assets/form-logo.jpg';

export function PdfArabicHeader({ formName }: any) {
  console.log('formName', formName);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',




        }}
      >
        <Text style={{ fontSize: 15, color: '#56004E',   width:'50%',textAlign:"left"}}>{formName}</Text>
        <Image
          src="/assets/form-logo.jpg" // Example image
          style={{ width: '100px', height: '80px', objectFit: 'contain' }}
        />
      </View>
    </>

    // <Text style={prop.headerText}><Typography variant="body2">Hello world</Typography></Text>
  );
}
