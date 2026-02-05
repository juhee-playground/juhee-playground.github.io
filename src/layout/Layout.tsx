import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import usePrintMode from '@/hooks/usePrintMode';
import { cn } from '@/utils/classNames';

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
    <main
      className={cn(
        'max-w-[1080px] mx-auto',
        themeMode === 'light' ? 'bg-[#fefefe] text-[#181717]' : 'bg-[#242424] text-white'
      )}
    >
      <div
        className={cn(
          'flex gap-[0.4em]',
          isPrintMode && 'flex-col',
          isErrorPage && 'justify-center items-center min-h-[80vh]',
          'md:flex-row'
        )}
      >
        {children}
      </div>
    </main>
  );
}
