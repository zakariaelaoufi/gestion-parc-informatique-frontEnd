import { createSlice } from "@reduxjs/toolkit";

const mode = JSON.parse(localStorage.getItem("theme-mode")) || "light";
const isDark = (mode) => mode === "dark";

const themeStyle = (mode) => ({
  palette: {
    mode: mode,
    common: {
      black: "#1f1c2d",
      white: "#fff",
    },
    primary: {
      main: "#FF7F00" /*#6c6ed0 */,
    },
    secondary: {
      main: "#fe5018" /*5A5CAD #454685  -- #30305C*/,
      dark: "#f14712" /**#333C61 */,
    },
    background: {
      main: isDark(mode) ? "#cffafe" : "#ECF1FFaa" /*#eff3f4*/,
      light: isDark(mode) ? "#0c0e11" : "#fff",
      dark: isDark(mode) ? "#000" : "#ECF1FF99",
    },
    shadow: {
      main: isDark(mode) ? "#24242466" : "#959da566",
    },
  },
});

const switchMode = (mode) => {
  if (mode === "light") return "dark";
  if (mode === "dark") return "light";
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    themeMode: mode,
    themeStyle: themeStyle(mode),
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      state.themeStyle = themeStyle(action.payload);
      localStorage.setItem("theme-mode", JSON.stringify(state.themeMode));
    },
    switchThemeMode: (state) => {
      const mode = switchMode(state.themeMode);
      state.themeMode = mode;
      state.themeStyle = themeStyle(mode);
      localStorage.setItem("theme-mode", JSON.stringify(mode));
    },
    switchThemeStyle: (state, action) => {
      state.themeStyle = action.payload;
    },
  },
});

export const { setThemeMode, switchThemeMode, switchThemeStyle } =
  ThemeSlice.actions;
export default ThemeSlice.reducer;
