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

const NAV_ITEMS = [
  {
    to: '/portfolio',
    label: 'Portfolio',
    match: (pathname: string) => pathname === '/portfolio' || pathname.startsWith('/projects'),
  },
  {
    to: '/resume',
    label: 'Resume',
    match: (pathname: string) => pathname === '/resume',
  },
] as const;

const SHELL_BUTTONS: readonly { key: TShellStyle; label: string }[] = [
  { key: 'dmg', label: 'DMG' },
  { key: 'light', label: 'LIGHT' },
  { key: 'pocket', label: 'POCKET' },
];

const getHudBackground = (shellStyle: TShellStyle) => {
  if (shellStyle === 'pocket') return 'bg-[#48515f]';
  if (shellStyle === 'light') return 'bg-[#c8ced8]';
  return 'bg-[#6a6a62]';
};

interface IHeaderNavProps {
  readonly pathname: string;
  readonly accentColor: string;
}

const HeaderNav = ({ pathname, accentColor }: IHeaderNavProps) => (
  <nav aria-label='Primary' className='flex items-center gap-1'>
    {NAV_ITEMS.map(item => {
      const isActive = item.match(pathname);
      return (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            'pixel-font px-2 py-1 text-[8px] tracking-wider transition-opacity',
            isActive ? 'opacity-100' : 'opacity-55 hover:opacity-90',
          )}
          style={isActive ? { color: accentColor } : undefined}
        >
          {item.label}
        </Link>
      );
    })}
  </nav>
);

export default function DenseAppBar() {
  const [menuDirection, setMenuDirection] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const {
    pointColor,
    isPrintMode,
    togglePrintMode,
    themeMode,
    toggleThemeMode,
    shellStyle,
    setShellStyle,
  } = useSettings();
  const { mode } = usePrintMode();
  const { pathname } = useLocation();

  const isResumePage = pathname === '/resume';

  const toggleDrawer =
    (direction: TAnchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event?.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setMenuDirection({ ...menuDirection, [direction]: open });
    };

  useEffect(() => {
    if (!isPrintMode) return undefined;
    const timeout = window.setTimeout(() => window.print(), PRINT_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [isPrintMode]);

  // 프린트 모드: 이력서 출력용 최소 헤더
  if (isPrintMode) {
    return (
      <header
        className={cn(
          'mx-auto flex w-full max-w-270 flex-col bg-[#fefefe] text-[#181717]',
          mode === 'print' && '[&_.menu__groups]:hidden [&:hover_.menu__groups]:inline',
        )}
      >
        <div className='menu__groups flex h-11 items-center justify-end gap-1 border-b border-black/8 px-3'>
          <IconButton aria-label='print' onClick={() => window.print()} size='small'>
            <PrintIcon fontSize='small' />
          </IconButton>
          <IconButton aria-label='offPrintMode' onClick={togglePrintMode} size='small'>
            <ClearIcon fontSize='small' />
          </IconButton>
        </div>
      </header>
    );
  }

  const hudBg = getHudBackground(shellStyle);
  const iconColor = shellStyle === 'light' ? '#48515f' : '#fff';
  const idleShellBorder =
    shellStyle === 'light' ? 'rgba(72,81,95,0.45)' : 'rgba(255,255,255,0.55)';
  const idleShellText = shellStyle === 'light' ? '#48515f' : '#fff';

  return (
    <header className='mx-auto flex w-full max-w-270 flex-col'>
      <div
        className={cn(
          'flex h-11 items-center justify-between px-4',
          hudBg,
          shellStyle === 'light' ? 'text-[#48515f]' : 'text-white',
        )}
      >
        <div className='flex min-w-0 items-center gap-3'>
          <span className='pixel-font text-body-3xs tracking-wider'>JUHEE-OS</span>
          <HeaderNav pathname={pathname} accentColor={pointColor.hex} />
        </div>

        <div className='flex shrink-0 items-center gap-1 sm:gap-2'>
          <div className='flex gap-1'>
            {SHELL_BUTTONS.map(({ key, label }) => {
              const active = shellStyle === key;
              return (
                <button
                  key={key}
                  type='button'
                  onClick={() => setShellStyle(key)}
                  className='pixel-font rounded-[3px] border-2 px-1.5 py-1 text-[7px] transition-colors'
                  style={
                    active
                      ? { backgroundColor: '#fff', color: '#48515f', borderColor: '#fff' }
                      : {
                          backgroundColor: 'transparent',
                          color: idleShellText,
                          borderColor: idleShellBorder,
                        }
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>

          <span className='ml-1 hidden items-center gap-1.5 pixel-font text-[8px] sm:flex'>
            <span
              className='inline-block h-2 w-2 rounded-full'
              style={{ backgroundColor: pointColor.hex, boxShadow: `0 0 8px ${pointColor.hex}` }}
            />
            ON
          </span>

          <IconButton
            aria-label='toggleTheme'
            onClick={toggleThemeMode}
            size='small'
            sx={{ color: iconColor }}
          >
            {themeMode === 'light' ? (
              <DarkModeIcon fontSize='small' />
            ) : (
              <LightModeIcon fontSize='small' />
            )}
          </IconButton>

          {isResumePage && (
            <IconButton
              aria-label='printMode'
              onClick={togglePrintMode}
              size='small'
              sx={{ color: iconColor }}
            >
              <PrintIcon fontSize='small' />
            </IconButton>
          )}

          <IconButton
            aria-label='color settings'
            onClick={toggleDrawer(anchor, true)}
            size='small'
            sx={{ color: iconColor }}
          >
            <PaletteIcon fontSize='small' />
          </IconButton>

          <span className='ml-1 hidden pixel-font text-[8px] sm:inline'>V2.0</span>
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
