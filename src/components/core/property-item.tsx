import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface PropertyItemProps {
  name: string;
  value: string | React.ReactNode;
}

export function PropertyItem({ name, value }: PropertyItemProps): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',

        display: 'grid',
        gridGap: 'var(--PropertyItem-gap, 8px)',
        gridTemplateColumns: '216px minmax(0, 1fr)',
        p: 'var(--PropertyItem-padding, 8px)',
      }}
    >
      <div>
        <Typography color="text.primary" variant="subtitle2">
          {name}
        </Typography>
      </div>
      <div>
        {typeof value === 'string' ? (
          <Typography color={value ? 'text.secondary' : 'text.secondary'} variant="body2">
            {value || 'None'}
          </Typography>
        ) : (
          <React.Fragment>{value}</React.Fragment>
        )}
      </div>
    </Box>
  );
}
