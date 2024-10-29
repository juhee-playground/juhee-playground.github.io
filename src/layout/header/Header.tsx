import React, { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';

import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { ColorModeContext } from '@/context/ColorModeContext';
import ThemeCustomized from '@/layout/ThemeCustomized';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { changePrintMode } from '@/redux/modules/settings';
import type { TRootState } from '@/redux/store';

import './Header.scss';

export default function DenseAppBar() {
  const dispatch = useAppDispatch();
  const [menuDirection, setMenuDirection] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { pointColor, isPrintMode } = useAppSelector((state: TRootState) => state.settings);
  const anchor = 'right';
  const mode = isPrintMode ? 'print' : '';

  const toggleDrawer = (direction: TAnchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setMenuDirection({ ...menuDirection, [direction]: open });
  };

  const handleClickOpen = async () => {
    // change print mode
    await handlePrintModeChange();
  };

  const handlePrintModeChange = () => {
    dispatch(changePrintMode());
  };

  const openPrint = () => {
    window.print();
  };

  useEffect(() => {
    if (isPrintMode) {
      openPrint();
    }
  }, [isPrintMode]);

  return (
    <header className={isPrintMode ? 'header header--print' : 'header'}>
      {!isPrintMode ? (
        <ul className='links'>
          <li role='menuItem'>
            <a href='/'>이력서</a>
          </li>
          <li role='menuItem'>
            <a href='/dashboard'>대시보드</a>
          </li>
        </ul>
      ) : null}
      <div className='menu__groups'>
        {isPrintMode ? (
          <>
            <IconButton aria-label='printMode' onClick={openPrint}>
              <PrintIcon />
            </IconButton>
            <IconButton aria-label='offPrintMode' onClick={handleClickOpen}>
              <ClearIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label='lightMode'
              onClick={() => {
                colorMode.toggleColorMode(theme.palette.mode === 'light' ? 'dark' : 'light');
              }}
            >
              {theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <IconButton aria-label='printMode' onClick={handleClickOpen}>
              <PrintIcon />
            </IconButton>
          </>
        )}
      </div>
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
    </header>
  );
}
