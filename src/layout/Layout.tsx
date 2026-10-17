import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import usePrintMode from '@/hooks/usePrintMode';
import Header from '@/layout/header/Header';
import { cn } from '@/utils/classNames';

interface IMainLayoutProps {
  children: ReactNode;
}

type TComponentType = {
  readonly name?: string;
};

const isHeaderChild = (child: React.ReactNode): boolean => {
  if (!React.isValidElement(child)) {
    return false;
  }
  if (child.type === Header) {
    return true;
  }
  const type = child.type as TComponentType | string;
  if (typeof type === 'string') {
    return false;
  }
  return type.name === 'Header' || type.name === 'DenseAppBar';
};

export default function Layout({ children }: IMainLayoutProps) {
  const { isPrintMode } = usePrintMode();
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const { pathname } = useLocation();

  const isResumePage = pathname === '/resume';
  const isErrorPage = pathname === '/404';

  const childrenArray = React.Children.toArray(children);
  const headerChild = childrenArray.find(isHeaderChild);
  const contentChildren = childrenArray.filter(child => !isHeaderChild(child));

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
          isPrintMode && 'items-stretch',
          isErrorPage && 'justify-center items-center min-h-[80vh]',
          !isPrintMode && 'md:flex-row',
          isResumePage && !isPrintMode && 'items-start'
        )}
      >
        {contentChildren}
      </div>
    </main>
  );
}
