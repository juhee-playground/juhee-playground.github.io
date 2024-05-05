import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Nav from './nav/Nav';
import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';

import SettingsIcon from '@mui/icons-material/Settings';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import './Layout.scss';
import './FixButton.scss';
import ThemeCustomized from './ThemeCustomized';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Main = lazy(() => import('../pages/resume/Main'));

const renderLoader = () => <p>Loading</p>;
const Layout = () => {
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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

  const mode = isPrintMode ? 'print' : '';

  return (
    <div className='container'>
      <Header />
      <main className={isPrintMode ? `main__container main__container--${mode}` : 'main__container'}>
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
        <Nav />
        <Suspense fallback={renderLoader()}>
          <Routes>
            <Route path='' element={<Main />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
