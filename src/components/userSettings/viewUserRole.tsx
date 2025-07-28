'use client';

import * as React from 'react';
import { Card, CardContent, Typography, Stack, InputLabel, OutlinedInput } from '@mui/material';

export function UserRoleView({ role, description }: { role: string; description: string }) {
  return (




         <Stack direction="row"  sx={{marginY:'10px',marginX:'10px', alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap',gap:"16px" , justifyContent:"center"}} >
        <Stack  sx={{ width: '560px' }}>
         <InputLabel>User Role</InputLabel>
          <OutlinedInput
            disabled
            name="name"
            sx={{width:"100%"}}
            placeholder="User Role"
            value={role}



          />

</Stack>
         <Stack sx={{ width: '560px' }} >
         <InputLabel>Description</InputLabel>
          <OutlinedInput
            disabled
            name="description"
            sx={{width:"100%"}}
            placeholder="description"
            value={description}


          />
         </Stack>
         </Stack>



  );
}
