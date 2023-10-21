import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate(props: { className: string }) {
  return (
    <Box className={props.className}>
      <CircularProgress color="inherit" />
    </Box>
  );
}
