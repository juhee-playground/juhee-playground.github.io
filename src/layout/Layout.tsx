import { ReactNode } from 'react';

import { useTheme } from '@mui/material/styles';

import usePrintMode from '@/hooks/usePrintMode';

import './Layout.scss';
import './FixButton.scss';

interface IMainLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: IMainLayoutProps) {
  const { mode, isPrintMode } = usePrintMode();
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  return (
    <main className={`container container--${themeMode}`}>
      <div className={`main__container ${isPrintMode ? `main__container--${mode}` : ''}`}>{children}</div>
    </main>
  );
}
