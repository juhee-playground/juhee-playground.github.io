import { IColor } from 'react-color-palette';

import { PaletteMode } from '@mui/material';
import { create } from 'zustand';

/** 포트폴리오 게임보이 셸 스타일. pocket = 다크, dmg/light = 라이트 계열. */
export type TShellStyle = 'dmg' | 'light' | 'pocket';

interface ISettingsStore {
  themeMode: PaletteMode;
  shellStyle: TShellStyle;
  isPrintMode: boolean;
  pointColor: IColor;
  showSideProjects: boolean;

  toggleThemeMode: () => void;
  setThemeMode: (mode: PaletteMode) => void;
  setShellStyle: (style: TShellStyle) => void;
  togglePrintMode: () => void;
  setPrintMode: (enabled: boolean) => void;
  setPointColor: (color: IColor) => void;
  toggleSideProjects: () => void;
}

const defaultColor: IColor = {
  hex: '#3b9eff',
  rgb: { r: 59, g: 158, b: 255, a: 1 },
  hsv: { h: 210, s: 77, v: 100, a: 1 },
};

export const useSettings = create<ISettingsStore>(set => ({
  themeMode: 'light',
  shellStyle: 'pocket',
  isPrintMode: false,
  pointColor: defaultColor,
  showSideProjects: false,

  toggleThemeMode: () =>
    set(state => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),
  setThemeMode: mode => set({ themeMode: mode }),
  // 셸 스타일 변경 시 themeMode도 동기화 (pocket=dark, dmg/light=light)
  setShellStyle: style =>
    set({ shellStyle: style, themeMode: style === 'pocket' ? 'dark' : 'light' }),
  togglePrintMode: () => set(state => ({ isPrintMode: !state.isPrintMode })),
  setPrintMode: enabled => set({ isPrintMode: enabled }),
  setPointColor: color => set({ pointColor: color }),
  toggleSideProjects: () => set(state => ({ showSideProjects: !state.showSideProjects })),
}));
