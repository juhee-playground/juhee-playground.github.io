import React from 'react';

import { PaletteMode } from '@/theme';

export const ColorModeContext = React.createContext({
  currentMode: 'light',
  toggleColorMode: (theme: PaletteMode) => {},
});
