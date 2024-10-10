import React, { useEffect } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PrintIcon from '@mui/icons-material/Print';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { ColorModeContext } from '@/context/ColorModeContext';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { changePrintMode } from '@/redux/modules/settings';
import type { TRootState } from '@/redux/store';

import './Header.scss';

export default function DenseAppBar() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { isPrintMode } = useAppSelector((state: TRootState) => state.settings);

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
    </header>
  );
}
