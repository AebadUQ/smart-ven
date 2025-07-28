'use client';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { InputLabel } from '@mui/material';





export function AddUserRole({formikRole,formikDescription,change}:any): React.JSX.Element {



  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 1, py: 2 }}>
        <Stack direction="row"  sx={{ alignItems: 'center', flex: '1 1 auto', flexWrap: 'wrap' ,gap:"16px" , justifyContent:"center"}}>
         <Stack sx={{ width: '400px' }} >
         <InputLabel>User Role</InputLabel>
          <OutlinedInput
            name="name"
            sx={{width:"100%"}}
            placeholder="User Role"
            value={formikRole}
            onChange={change}


          />
         </Stack>

         <Stack sx={{ width: '400px' }} >
         <InputLabel>Description</InputLabel>
          <OutlinedInput
          onChange={change}
            name="description"
            sx={{width:"100%"}}
            placeholder="description"
            value={formikDescription}


          />
         </Stack>

        </Stack>


      </Stack>
    </div>
  );
}


