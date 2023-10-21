import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate(props: { className: string }) {
  const { className } = props;

  return (
    <Box sx={{ width: '100%' }} className={className}>
      <LinearProgress />
    </Box>
  );
}
