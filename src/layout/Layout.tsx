import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeCustomized from '@/layout/ThemeCustomized';

import './Layout.scss';
import './FixButton.scss';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Main = lazy(() => import('../pages/resume'));
const Portfolio = lazy(() => import('../pages/portfolio'));

// TODO: components/custom/Loading으로 변경
const renderLoader = () => <p>Loading</p>;

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
        <Suspense fallback={renderLoader()}>
          <Routes>
            <Route path='' element={<Main />} />
            <Route path='/portfolio' element={<Portfolio />} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}
