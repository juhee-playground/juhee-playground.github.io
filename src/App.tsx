import { useState, useMemo, useEffect } from 'react';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AxiosError } from 'axios';
import { merge } from 'ts-deepmerge';

import { ColorModeContext } from '@/context/ColorModeContext';
import Layout from '@/layout/Layout';
import store from '@/redux/store';
import { TPaletteMode, getDesignTokens, getThemedComponents } from '@/theme';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const MILISECOND = 1000;
const SECOND = 600;

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if ((error as AxiosError).code === 'ERR_NETWORK') {
        toast.error(`서버와 연결되지 않습니다`);
      }
      query.state.data;
    },
  }),

  defaultOptions: {
    queries: {
      // ✅ globally default to 600 seconds
      staleTime: MILISECOND * SECOND,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  const [mode, setMode] = useState<TPaletteMode>('light');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const colorMode = useMemo(
    () => ({
      currentMode: mode,
      toggleColorMode: (theme: TPaletteMode) => {
        setMode(theme);
      },
    }),
    [mode],
  );

  const theme: Theme = useMemo(() => createTheme(merge(getDesignTokens(mode), getThemedComponents(mode))), [mode]);
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={responsiveFontSizes(theme)}>
          <QueryClientProvider client={queryClient}>
            {/* <CssBaseline /> */}
            <ToastContainer />
            <Layout />
          </QueryClientProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
