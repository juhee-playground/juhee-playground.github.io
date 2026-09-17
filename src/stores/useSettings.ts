import { IColor } from 'react-color-palette';

import { PaletteMode } from '@mui/material';
import { create } from 'zustand';

interface ISettingsStore {
  themeMode: PaletteMode;
  isPrintMode: boolean;
  pointColor: IColor;
  showSideProjects: boolean;

  toggleThemeMode: () => void;
  setThemeMode: (mode: PaletteMode) => void;
  togglePrintMode: () => void;
  setPrintMode: (enabled: boolean) => void;
  setPointColor: (color: IColor) => void;
  toggleSideProjects: () => void;
}

const defaultColor: IColor = {
  hex: '#a7d94a',
  rgb: { r: 167, g: 217, b: 74, a: 1 },
  hsv: { h: 80, s: 66, v: 85, a: 1 },
};

export const useSettings = create<ISettingsStore>(set => ({
  themeMode: 'light',
  isPrintMode: false,
  pointColor: defaultColor,
  showSideProjects: false,

  toggleThemeMode: () =>
    set(state => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),
  setThemeMode: mode => set({ themeMode: mode }),
  togglePrintMode: () => set(state => ({ isPrintMode: !state.isPrintMode })),
  setPrintMode: enabled => set({ isPrintMode: enabled }),
  setPointColor: color => set({ pointColor: color }),
  toggleSideProjects: () => set(state => ({ showSideProjects: !state.showSideProjects })),
}));
