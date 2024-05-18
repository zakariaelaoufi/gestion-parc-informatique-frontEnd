import { createSlice } from "@reduxjs/toolkit";

export const UtilisateurSlice = createSlice({
  name: "Utilisateur",
  initialState: {
    allUtilisateur: [],
  },
  reducers: {
    setallUtilisateur: (state, action) => {
      state.allUtilisateur = action.payload;
    },
  },
});

export const { setallUtilisateur } = UtilisateurSlice.actions;

export default UtilisateurSlice.reducer;
