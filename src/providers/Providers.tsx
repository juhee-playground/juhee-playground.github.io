import { useMemo, useState, useEffect, PropsWithChildren } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { ThemeProvider, responsiveFontSizes, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ColorModeContext } from '@/context/ColorModeContext';
import queryClient from '@/lib/queryClient';
import store from '@/redux/store';
import { getDesignTokens, getThemedComponents, TPaletteMode } from '@/theme';

export default function Providers({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<TPaletteMode>('light');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      currentMode: mode,
      toggleColorMode: (theme: TPaletteMode) => setMode(theme),
    }),
    [mode],
  );

  const theme = useMemo(() => {
    const baseTheme = createTheme({
      ...getDesignTokens(mode),
      ...getThemedComponents(mode),
    });

    return responsiveFontSizes(baseTheme);
  }, [mode]);

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}
