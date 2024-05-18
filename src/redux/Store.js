import { configureStore } from "@reduxjs/toolkit";

import GlobalReducer from "./GlobalSlice";
import ThemeReducer from "./ThemeSlice";
import AuthReducer from "./AuthSlice";
import DepartmentReducer from "./Department";
import UtilisateurReducer from "./UtilisateurSlice";

export default configureStore({
  reducer: {
    global: GlobalReducer,
    authentication: AuthReducer,
    theme: ThemeReducer,
    department: DepartmentReducer,
    utilisateur: UtilisateurReducer,
  },
});
