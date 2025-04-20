import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';

import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { ColorModeContext } from '@/context/ColorModeContext';
import usePrintMode from '@/hooks/usePrintMode';
import ThemeCustomized from '@/layout/ThemeCustomized';
import { useSettings } from '@/stores/useSettings';

import './Header.scss';

export default function DenseAppBar() {
  const [menuDirection, setMenuDirection] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchor = 'right';

  const { togglePrintMode, pointColor } = useSettings();
  const { mode, isPrintMode } = usePrintMode();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const themeMode = theme.palette.mode;

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

  const handleClickOpen = () => {
    togglePrintMode();
  };

  const openPrint = () => {
    window.print();
  };

  useEffect(() => {
    if (isPrintMode) openPrint();
  }, [isPrintMode]);

  return (
    <header className={`header header--${themeMode} ${isPrintMode ? `header--${mode}` : ''}`}>
      {!isPrintMode && (
        <ul className='links'>
          <li role='menuItem'>
            <Link to='/'>이력서</Link>
          </li>
          <li role='menuItem'>
            <Link to='/dashboard'>대시보드</Link>
          </li>
        </ul>
      )}

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
                colorMode.toggleColorMode(themeMode === 'light' ? 'dark' : 'light');
              }}
            >
              {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
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
