import React, { ReactNode, useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import ThemeCustomized from '@/layout/ThemeCustomized';

import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';

import Header from './header/Header';

import './Layout.scss';
import './FixButton.scss';

type TAnchor = 'top' | 'left' | 'bottom' | 'right';

interface IMainLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: IMainLayoutProps) {
  const [menuDirection, setMenuDirection] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { pointColor, isPrintMode } = useAppSelector((state: TRootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const toggleDrawer = (anchor: TAnchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setMenuDirection({ ...menuDirection, [anchor]: open });
  };

  const anchor = 'right';

  return (
    <main className='container'>
      <Header />

      <button
        style={{ backgroundColor: pointColor.hex }}
        className={`fixButton half-left toggler ripple ${isPrintMode ? `fixButton--${mode}` : ''}`}
        onClick={toggleDrawer(anchor, true)}
      >
        <SettingsIcon />
      </button>

      <SwipeableDrawer
        anchor={anchor}
        open={menuDirection[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        <ThemeCustomized />
      </SwipeableDrawer>

      <div className={isPrintMode ? `main__container main__container--${mode}` : 'main__container'}>{children}</div>
    </main>
  );
}
