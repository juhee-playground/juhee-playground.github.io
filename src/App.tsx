import React, { useState, useMemo } from 'react';
import merge from 'ts-deepmerge';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './layout/Layout';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';

import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './theme/Theme';
import { ColorModeContext } from './context/ColorModeContext';

import './App.scss';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      query.state.data;
    },
  }),
  defaultOptions: {
    queries: {
      // ✅ globally default to 600 seconds
      staleTime: 1000 * 600,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (mode: ModeType) => {
        console.log('app mode', mode);
        setMode(mode);
        // setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  let theme: Theme = useMemo(
    () => createTheme(merge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode],
  );
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <div className='container'>
            <div className={`labeling__wrapper labeling__wrapper--${theme.palette.mode}`}>
              <Layout />
            </div>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
