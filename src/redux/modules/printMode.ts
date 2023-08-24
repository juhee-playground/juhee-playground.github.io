import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPrintMode: false,
};

const PrintModeSlice = createSlice({
  name: 'printMode',
  initialState,
  reducers: {
    changePrintMode(state) {
      state.isPrintMode = !state.isPrintMode;
    },
  },
});

export const { changePrintMode } = PrintModeSlice.actions;
export default PrintModeSlice.reducer;
