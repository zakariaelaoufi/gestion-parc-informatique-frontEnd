import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "./redux/Authslice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import MainRouter from "./routers/MainRouter";
import axios from "axios";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { frFR as dataGridFrFR } from "@mui/x-data-grid";
import { frFR as coreFrFR } from "@mui/material/locale";
import { frFR } from "@mui/x-date-pickers/locales";
import useAxiosConfig from "./hooks/useAxiosConfig";

const queryClient = new QueryClient();

export default function App() {
  useAxiosConfig();
  useLocalUser();
  const themeStyle = useSelector((state) => state.theme.themeStyle);
  const theme = createTheme(
    themeStyle,
    frFR, // x-date-pickers translations
    dataGridFrFR, // x-data-grid translations
    coreFrFR // core translations
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter></MainRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function useLocalUser() {
  const dispatch = useDispatch();
  const AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
  const USER = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(setUser(USER ? USER : null));
    dispatch(setToken(AUTH_TOKEN ? AUTH_TOKEN : ""));
  }, [AUTH_TOKEN, USER, dispatch]);
}
