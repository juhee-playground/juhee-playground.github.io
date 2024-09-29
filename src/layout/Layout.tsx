import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';

import SettingsIcon from '@mui/icons-material/Settings';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Header from './header/Header';

import ThemeCustomized from '@/layout/ThemeCustomized';
import UnderConstruction from '@/pages/resume/UnderConstruction';

import './Layout.scss';
import './FixButton.scss';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Main = lazy(() => import('../pages/resume'));
// const Portfolio = lazy(() => import('../pages/portfolio'));

export default function Layout() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const anchor = 'right';

  return (
    <main className='container'>
      <Header />

      <button
        style={{ backgroundColor: pointColor }}
        className={`fixButton half-left toggler ripple ${isPrintMode ? `fixButton--${mode}` : ''}`}
        onClick={toggleDrawer(anchor, true)}
      >
        <SettingsIcon />
      </button>

      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        <ThemeCustomized />
      </SwipeableDrawer>

      <div className={isPrintMode ? `main__container main__container--${mode}` : 'main__container'}>
        <Suspense>
          <Routes>
            <Route path='' element={<Main />} />
            <Route path='/dashboard' element={<UnderConstruction />} />
            {/* <Route path='/portfolio' element={<Portfolio />} /> */}
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}
