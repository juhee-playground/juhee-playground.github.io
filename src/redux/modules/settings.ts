import { IColor } from 'react-color-palette';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISettingState {
  pointColor: IColor;
  isPrintMode: boolean;
}

const initialState: ISettingState = {
  pointColor: { hex: '#5467f5', rgb: { r: 84, g: 103, b: 245, a: 1 }, hsv: { h: 231, s: 65, v: 96, a: 1 } },
  isPrintMode: false,
};

const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changePointColor(state, action: PayloadAction<IColor>) {
      state.pointColor = action.payload;
    },
    changePrintMode(state) {
      state.isPrintMode = !state.isPrintMode;
    },
  },
});

export const { changePointColor, changePrintMode } = SettingSlice.actions;
export default SettingSlice.reducer;
