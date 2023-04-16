import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

function DChip({ backgroundColor, color, label, size }: any) {
  const customTheme = createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColor,
            color: color,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Chip label={label} size={size} />
    </ThemeProvider>
  );
}

export default DChip;
