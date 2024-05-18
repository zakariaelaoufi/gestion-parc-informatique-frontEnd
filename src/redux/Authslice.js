import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
    token: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    deleteUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    deleteToken: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});



export const { setUser, setToken, deleteUser, deleteToken } = AuthSlice.actions;

export default AuthSlice.reducer;
