import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';

import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import SiteSectionNav from '@/components/site/SiteSectionNav';
import usePrintMode from '@/hooks/usePrintMode';
import ThemeCustomized from '@/layout/ThemeCustomized';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const anchor = 'right';
const PRINT_TIMEOUT_MS = 100;

export default function DenseAppBar() {
  const [menuDirection, setMenuDirection] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { pointColor, isPrintMode, togglePrintMode, themeMode, toggleThemeMode } = useSettings();

  const { mode } = usePrintMode();
  const { pathname } = useLocation();
  const isSitePage = pathname === '/site';

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
    if (!isPrintMode) return undefined;

    const timeout = window.setTimeout(() => {
      window.print();
    }, PRINT_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isPrintMode]);

  const bgColor = themeMode === 'light' ? 'bg-[#fefefe] text-[#181717]' : 'bg-[#181717] text-white';

  return (
    <header
      className={cn(
        'flex flex-col max-w-[1080px] mx-auto w-full',
        bgColor,
        isPrintMode && mode === 'print' && '[&_.menu__groups]:hidden [&:hover_.menu__groups]:inline'
      )}
    >
      {/* ─── Row 1: 페이지 nav + 아이콘 ─── */}
      <div className={cn('h-10 flex justify-between items-center md:pr-[45px]', bgColor)}>
        {!isPrintMode && (
          <ul className='flex gap-3 px-3 [&_a]:text-inherit items-center'>
            <li role='menuItem'>
              <Link to='/'>홈</Link>
            </li>
            <li role='menuItem'>
              <Link to='/resume'>이력서</Link>
            </li>
            <li role='menuItem'>
              <Link to='/dashboard'>대시보드</Link>
            </li>
            <li role='menuItem'>
              <Link
                to='/site'
                className='font-bold text-white px-2 py-0.5 rounded text-xs'
                style={{ backgroundColor: pointColor.hex }}
              >
                New
              </Link>
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
              <IconButton aria-label='lightMode' onClick={toggleThemeMode}>
                {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton aria-label='printMode' onClick={handleClickOpen}>
                <PrintIcon />
              </IconButton>
            </>
          )}
        </div>
      </div>

      {/* ─── Row 2: 섹션 앵커 nav (/site 전용) ─── */}
      {isSitePage && !isPrintMode && (
        <div className={cn(
          'border-t',
          themeMode === 'light' ? 'border-black/8' : 'border-white/10'
        )}>
          <SiteSectionNav />
        </div>
      )}

      <button
        style={{ backgroundColor: pointColor.hex }}
        className={cn(
          'font-["Roboto",sans-serif] appearance-none border-none uppercase box-border text-white align-middle text-sm text-center no-underline py-2 shadow-[0_1px_4px_0_rgba(0,0,0,0.37)] cursor-pointer hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.3)] focus:outline-0',
          'rounded-tl-lg rounded-bl-lg',
          'relative overflow-hidden',
          'before:content-[""] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:bg-[rgba(255,255,255,0.6)]',
          'focus:before:transition-all focus:before:duration-500 focus:before:ease-out focus:before:opacity-0 focus:before:w-[160px] focus:before:h-[160px] focus:before:-mt-20 focus:before:-ml-20',
          'fixed top-[10%] right-0 -translate-y-1/2 md:top-[2.6%]',
          isPrintMode && mode === 'print' && 'hidden'
        )}
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
