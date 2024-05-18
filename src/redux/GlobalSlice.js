import { createSlice } from "@reduxjs/toolkit";

export const GlobalSlice = createSlice({
  name: "global",
  initialState: {
    
  },
  reducers: {
    setTest: (state, action) => {},
  },
});

export const { setTest } = GlobalSlice.actions;

export default GlobalSlice.reducer;
