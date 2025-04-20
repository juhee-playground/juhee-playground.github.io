import { IColor } from 'react-color-palette';

import { PaletteMode } from '@mui/material';
import { create } from 'zustand';

interface ISettingsStore {
  themeMode: PaletteMode;
  isPrintMode: boolean;
  pointColor: IColor;

  toggleThemeMode: () => void;
  setThemeMode: (mode: PaletteMode) => void;
  togglePrintMode: () => void;
  setPrintMode: (enabled: boolean) => void;
  setPointColor: (color: IColor) => void;
}

const defaultColor: IColor = {
  hex: '#5467f5',
  rgb: { r: 84, g: 103, b: 245, a: 1 },
  hsv: { h: 231, s: 65, v: 96, a: 1 },
};

export const useSettings = create<ISettingsStore>(set => ({
  themeMode: 'light',
  isPrintMode: false,
  pointColor: defaultColor,

  toggleThemeMode: () =>
    set(state => ({
      themeMode: state.themeMode === 'light' ? 'dark' : 'light',
    })),
  setThemeMode: mode => set({ themeMode: mode }),
  togglePrintMode: () => set(state => ({ isPrintMode: !state.isPrintMode })),
  setPrintMode: enabled => set({ isPrintMode: enabled }),
  setPointColor: color => set({ pointColor: color }),
}));
