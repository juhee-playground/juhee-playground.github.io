import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PaletteIcon from '@mui/icons-material/Palette';
import PrintIcon from '@mui/icons-material/Print';

import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import usePrintMode from '@/hooks/usePrintMode';
import ThemeCustomized from '@/layout/ThemeCustomized';
import { useSettings, TShellStyle } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const anchor = 'right';
const PRINT_TIMEOUT_MS = 100;


export default function DenseAppBar() {
  const [menuDirection, setMenuDirection] = useState({
    top: false, left: false, bottom: false, right: false,
  });

  const { pointColor, isPrintMode, togglePrintMode, themeMode, toggleThemeMode, showSideProjects, toggleSideProjects, shellStyle, setShellStyle } = useSettings();
  const { mode } = usePrintMode();
  const { pathname } = useLocation();

  const isPortfolioPage = pathname === '/portfolio';
  const isResumePage    = pathname === '/resume';
  const isDashboardPage = pathname === '/dashboard';

  const toggleDrawer = (direction: TAnchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event?.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) return;
    setMenuDirection({ ...menuDirection, [direction]: open });
  };

  useEffect(() => {
    if (!isPrintMode) return undefined;
    const timeout = window.setTimeout(() => window.print(), PRINT_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [isPrintMode]);

  const bgColor = themeMode === 'light' ? 'bg-[#fefefe] text-[#181717]' : 'bg-[#181717] text-white';
  const borderColor = themeMode === 'light' ? 'border-black/8' : 'border-white/8';

  // ─── 포트폴리오: 게임보이 HUD 바 ───
  // 셸 스타일(dmg/light/pocket) 3버튼 토글. pocket일 때만 다크 HUD.
  if (isPortfolioPage && !isPrintMode) {
    const hudBg =
      shellStyle === 'pocket'
        ? 'bg-[#48515f]'
        : shellStyle === 'light'
          ? 'bg-[#c8ced8]'
          : 'bg-[#6a6a62]';
    const shellButtons: { key: TShellStyle; label: string }[] = [
      { key: 'dmg', label: 'DMG' },
      { key: 'light', label: 'LIGHT' },
      { key: 'pocket', label: 'POCKET' },
    ];
    return (
      <header className='flex flex-col max-w-270 mx-auto w-full'>
        <div className={cn('h-11 flex justify-between items-center px-4 text-white', hudBg)}>
          {/* 좌: OS 라벨 + 브레드크럼 */}
          <div className='flex items-center gap-3'>
            <span className='pixel-font text-body-3xs tracking-wider'>JUHEE-OS</span>
            <span className='hidden sm:inline pixel-font text-[8px]' style={{ color: pointColor.hex }}>
              ▸ PORTFOLIO.EXE
            </span>
          </div>

          {/* 우: 셸 토글 + LED + 팔레트 + 버전 */}
          <div className='flex items-center gap-2'>
            {/* DMG / LIGHT / POCKET 3버튼 */}
            <div className='flex gap-1'>
              {shellButtons.map(({ key, label }) => {
                const active = shellStyle === key;
                return (
                  <button
                    key={key}
                    onClick={() => setShellStyle(key)}
                    className='pixel-font text-[7px] px-1.5 py-1 rounded-[3px] border-2 transition-colors'
                    style={
                      active
                        ? { backgroundColor: '#fff', color: '#48515f', borderColor: '#fff' }
                        : { backgroundColor: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.55)' }
                    }
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <span className='hidden sm:flex items-center gap-1.5 pixel-font text-[8px] ml-1'>
              <span
                className='inline-block w-2 h-2 rounded-full'
                style={{ backgroundColor: pointColor.hex, boxShadow: `0 0 8px ${pointColor.hex}` }}
              />
              ON
            </span>

            <IconButton
              aria-label='color settings'
              onClick={toggleDrawer(anchor, true)}
              size='small'
              sx={{ color: '#fff' }}
            >
              <PaletteIcon fontSize='small' />
            </IconButton>

            <span className='hidden sm:inline pixel-font text-[8px] ml-1'>V2.0</span>
          </div>
        </div>

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

  return (
    <header
      className={cn(
        'flex flex-col max-w-270 mx-auto w-full',
        bgColor,
        isPrintMode && mode === 'print' && '[&_.menu__groups]:hidden [&:hover_.menu__groups]:inline',
      )}
    >
      <div className={cn('h-11 flex justify-between items-center px-3 border-b', bgColor, borderColor)}>

        {/* ─── 좌: Portfolio → back 버튼 (포트폴리오 페이지에서는 숨김) ─── */}
        {!isPrintMode && !isPortfolioPage && (
          <Link
            to='/portfolio'
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium px-1 py-2 transition-all',
              themeMode === 'dark' ? 'opacity-50 hover:opacity-90' : 'opacity-45 hover:opacity-85',
            )}
          >
            <span className='text-base leading-none'>←</span>
            Portfolio
          </Link>
        )}

        {/* ─── 우: 아이콘 버튼들 ─── */}
        <div className='menu__groups flex items-center ml-auto'>
          {isPrintMode && isResumePage ? (
            <>
              <IconButton aria-label='print' onClick={() => window.print()} size='small'>
                <PrintIcon fontSize='small' />
              </IconButton>
              <IconButton aria-label='offPrintMode' onClick={togglePrintMode} size='small'>
                <ClearIcon fontSize='small' />
              </IconButton>
            </>
          ) : (
            <>
              {isDashboardPage && (
                <button
                  onClick={toggleSideProjects}
                  className={cn(
                    'text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-200 mr-1',
                    showSideProjects
                      ? 'text-white border-transparent'
                      : themeMode === 'dark'
                        ? 'border-white/25 text-white/50 hover:border-white/45 hover:text-white/70'
                        : 'border-black/20 text-black/45 hover:border-black/35 hover:text-black/65',
                  )}
                  style={showSideProjects ? { backgroundColor: pointColor.hex } : {}}
                >
                  {showSideProjects ? '✓ 사이드' : '+ 사이드'}
                </button>
              )}
              <IconButton aria-label='toggleTheme' onClick={toggleThemeMode} size='small'>
                {themeMode === 'light' ? <DarkModeIcon fontSize='small' /> : <LightModeIcon fontSize='small' />}
              </IconButton>
              {isResumePage && (
                <IconButton aria-label='printMode' onClick={togglePrintMode} size='small'>
                  <PrintIcon fontSize='small' />
                </IconButton>
              )}
              <IconButton
                aria-label='color settings'
                onClick={toggleDrawer(anchor, true)}
                size='small'
                className={cn(isPrintMode && mode === 'print' && 'hidden!')}
              >
                <PaletteIcon fontSize='small' />
              </IconButton>
            </>
          )}
        </div>
      </div>

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
