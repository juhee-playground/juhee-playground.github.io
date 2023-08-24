import React, { useState, useMemo } from 'react';
import merge from 'ts-deepmerge';
import { AxiosError } from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import Layout from './layout/Layout';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './theme/Theme';
import { ColorModeContext } from './context/ColorModeContext';

import './App.scss';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if ((error as AxiosError).code == 'ERR_NETWORK') {
        //FIXME: 한번만 나오면 참 좋겠다~
        toast.error(`서버와 연결되지 않습니다`);
      }
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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
              <ToastContainer />
              <Layout />
            </div>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
