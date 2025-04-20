import { useEffect } from 'react';

import { useSettings } from '@/stores/useSettings';

const usePrintMode = (): { mode: '' | 'print'; isPrintMode: boolean } => {
  const { isPrintMode, setThemeMode } = useSettings();
  const mode = isPrintMode ? 'print' : '';

  useEffect(() => {
    if (isPrintMode) {
      setThemeMode('light');
    }
  }, [isPrintMode, setThemeMode]);

  return { mode, isPrintMode };
};

export default usePrintMode;
