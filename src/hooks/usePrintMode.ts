import { useAppSelector } from '@/redux/hooks';

const usePrintMode = (): { mode: '' | 'print'; isPrintMode: boolean } => {
  const isPrintMode = useAppSelector(state => state.settings.isPrintMode);
  const mode = isPrintMode ? 'print' : '';

  return { mode, isPrintMode };
};

export default usePrintMode;
