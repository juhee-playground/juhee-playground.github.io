import React from 'react';

import { PaletteMode } from '@mui/material';

interface IColorModeContextType {
  currentMode: PaletteMode;
  toggleColorMode: (theme: PaletteMode) => void;
}

export const ColorModeContext = React.createContext<IColorModeContextType>({
  currentMode: 'light',
  toggleColorMode: () => {},
});
