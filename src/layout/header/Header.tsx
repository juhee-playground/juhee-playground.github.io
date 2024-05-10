import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import type { RootState } from '@/redux/store';
import { changePrintMode } from '@/redux/modules/settings';

import './Header.scss';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ClearIcon from '@mui/icons-material/Clear';
import PrintIcon from '@mui/icons-material/Print';
import { useTheme } from '@mui/material/styles';

import { ColorModeContext } from '@/context/ColorModeContext';

export default function DenseAppBar() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { isPrintMode } = useAppSelector((state: RootState) => state.settings);

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
      {
      !isPrintMode ? 
      <ul className='links'> 
        <li role='menuItem'><a href='/'>이력서</a></li>
        <li role='menuItem'><a href='/portfolio'>포트폴리오</a></li>
      </ul> : null 
      }
      <div className='button__groups'>
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
            <IconButton aria-label='lightMode' onClick={colorMode.toggleColorMode}>
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
