import { useSettings } from '@/stores/useSettings';

const usePrintMode = (): { mode: '' | 'print'; isPrintMode: boolean } => {
  const { isPrintMode } = useSettings();
  const mode = isPrintMode ? 'print' : '';

  return { mode, isPrintMode };
};

export default usePrintMode;
