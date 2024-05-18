import { createSlice } from "@reduxjs/toolkit";

export const DepartmentSlice = createSlice({
  name: "department",
  initialState: {
    allDepartment: [],
  },
  reducers: {
    setAllDepartment: (state, action) => {
      state.allDepartment = action.payload;
    },
  },
});

export const { setAllDepartment } = DepartmentSlice.actions;

export default DepartmentSlice.reducer;
