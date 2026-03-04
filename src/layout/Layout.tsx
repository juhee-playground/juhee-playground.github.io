import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import Header from '@/layout/header/Header';
import usePrintMode from '@/hooks/usePrintMode';
import { cn } from '@/utils/classNames';

interface IMainLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: IMainLayoutProps) {
  const { isPrintMode } = usePrintMode();
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const { pathname } = useLocation();

  const isErrorPage = pathname === '/404' || !['/', '/dashboard', '/portfolio', '/resume'].includes(pathname);
  const isResumePage = pathname === '/resume';

  // children을 배열로 변환하여 Header와 컨텐츠 분리
  const childrenArray = React.Children.toArray(children);
  const headerChild = childrenArray.find((child: any) => {
    // Header 컴포넌트인지 확인
    if (React.isValidElement(child)) {
      return child.type === Header || (child.type as any)?.name === 'Header' || (child.type as any)?.name === 'DenseAppBar';
    }
    return false;
  });
  const contentChildren = childrenArray.filter((child: any) => {
    if (React.isValidElement(child)) {
      return child.type !== Header && (child.type as any)?.name !== 'Header' && (child.type as any)?.name !== 'DenseAppBar';
    }
    return true;
  });

  return (
    <main
      className={cn(
        'max-w-[1080px] mx-auto min-h-screen flex flex-col',
        themeMode === 'light' ? 'bg-[#fefefe] text-[#181717]' : 'bg-[#242424] text-white'
      )}
    >
      {headerChild && (
        <div className="shrink-0 sticky top-0 z-50">
          {headerChild}
        </div>
      )}
      <div
        className={cn(
          'flex gap-[0.4em] flex-1',
          isPrintMode && 'flex-col',
          isErrorPage && 'justify-center items-center min-h-[80vh]',
          'md:flex-row',
          isResumePage && 'items-start'
        )}
      >
        {contentChildren}
      </div>
    </main>
  );
}
