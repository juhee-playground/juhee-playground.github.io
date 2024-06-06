import React from 'react';

import { PaletteMode } from '@mui/material';

export const ColorModeContext = React.createContext({
  currentMode: 'light',
  toggleColorMode: (theme: PaletteMode) => {},
});
