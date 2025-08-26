import * as React from 'react';
import Box from '@mui/material/Box';

export interface CenteredLayoutProps {
  children: React.ReactNode;
}

export function CenteredLayout({ children }: CenteredLayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
        p: { xs: 2, md: 3 },
        backgroundColor:'#F6F7F9'
      }}
    >
      <Box sx={{ maxWidth: '500px', width: '100%',backgroundColor:'#FFFFFF',p:4,borderRadius:'20px',    boxShadow: '0px 5px 22px 0px #0000000A, 0px 0px 0px 1px #0000000F',border:'0px' }}>{children}</Box>
    </Box>
  );
}
