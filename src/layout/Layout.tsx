import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();

  const isErrorPage = pathname === '/404' || !['/', '/dashboard', '/portfolio'].includes(pathname);

  return (
    <main className={`container container--${themeMode}`}>
      <div
        className={`main__container ${isPrintMode ? `main__container--${mode}` : ''} ${
          isErrorPage ? 'main__container--center' : ''
        }`}
      >
        {children}
      </div>
    </main>
  );
}
