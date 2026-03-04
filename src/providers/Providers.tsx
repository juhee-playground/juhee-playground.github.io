import { PropsWithChildren, useEffect, useMemo } from 'react';
import { QueryClientProvider } from 'react-query';

import { ThemeProvider, responsiveFontSizes, createTheme } from '@mui/material/styles';

import queryClient from '@/lib/queryClient';
import { useSettings } from '@/stores/useSettings';
import { getDesignTokens, getThemedComponents } from '@/theme';

export default function Providers({ children }: PropsWithChildren) {
  const { themeMode } = useSettings();

  // body 배경색을 테마에 맞게 적용 → 사이드바 등 max-width 밖 영역도 일관된 색상
  useEffect(() => {
    document.body.style.backgroundColor = themeMode === 'dark' ? '#181717' : '#fafafa';
  }, [themeMode]);

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
