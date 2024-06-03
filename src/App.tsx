import { useState, useMemo, useEffect } from 'react';
import { merge } from 'ts-deepmerge';
import { AxiosError } from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import Layout from './layout/Layout';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import { PaletteMode, getDesignTokens, getThemedComponents } from './theme';
import { ColorModeContext } from './context/ColorModeContext';

import './App.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if ((error as AxiosError).code == 'ERR_NETWORK') {
        // TODO: FIXME를 좀 더 업무 투로 적어주시면 좋을 것 같아요
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
  const [mode, setMode] = useState<PaletteMode>('light');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const colorMode = useMemo(
    () => ({
      currentMode: mode,
      toggleColorMode: (theme: PaletteMode) => {
        setMode(theme);
      },
    }),
    [mode],
  );

  const theme: Theme = useMemo(() => createTheme(merge(getDesignTokens(mode), getThemedComponents(mode))), [mode]);

  useEffect(() => {
    setMode(!prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={responsiveFontSizes(theme)}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <ToastContainer />
            <Layout />
          </QueryClientProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
