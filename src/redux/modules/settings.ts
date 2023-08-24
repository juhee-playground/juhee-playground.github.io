import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  pointColor: '#009688',
};

const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changePointColor(state, action: PayloadAction<string>) {
      state.pointColor = action.payload;
    },
  },
});

export const { changePointColor } = SettingSlice.actions;
export default SettingSlice.reducer;
