import React from 'react';

export const ColorModeContext = React.createContext({
  currentMode: 'light',
  toggleColorMode: () => {},
});
