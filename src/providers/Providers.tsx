import { PropsWithChildren, useMemo } from 'react';
import { QueryClientProvider } from 'react-query';

import { ThemeProvider, responsiveFontSizes, createTheme } from '@mui/material/styles';

import queryClient from '@/lib/queryClient';
import { useSettings } from '@/stores/useSettings';
import { getDesignTokens, getThemedComponents } from '@/theme';

export default function Providers({ children }: PropsWithChildren) {
  const { themeMode } = useSettings();

  const theme = useMemo(() => {
    const baseTheme = createTheme({
      ...getDesignTokens(themeMode),
      ...getThemedComponents(themeMode),
    });

    return responsiveFontSizes(baseTheme);
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
