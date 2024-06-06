import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  pointColor: '#07b53b',
  isPrintMode: false,
};

const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changePointColor(state, action: PayloadAction<string>) {
      state.pointColor = action.payload;
    },
    changePrintMode(state) {
      state.isPrintMode = !state.isPrintMode;
    },
  },
});

export const { changePointColor, changePrintMode } = SettingSlice.actions;
export default SettingSlice.reducer;
