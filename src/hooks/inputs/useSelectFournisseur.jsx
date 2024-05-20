import { useState } from "react";
import { useGetAllFournisseur } from "../api/useFournisseurApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function useSelectFournisseur({ idFournisseurUpdate = -1 }) {
  const [fournisseur, setFournisseur] = useState(idFournisseurUpdate);
  const allFournisseur = useGetAllFournisseur();
  const handleChange = (event) => {
    setFournisseur(event.target.value);
  };
  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="fournisseur_label">Fournisseur</InputLabel>
        <Select
          labelId="fournisseur_label"
          label="Fournisseur"
          variant="outlined"
          value={fournisseur}
          onChange={handleChange}
        >
          <MenuItem value={-1} disabled>
            Choisir un fournisseur
          </MenuItem>
          {allFournisseur?.data?.map((e) => (
            <MenuItem key={e.id + e.nomFournisseur} value={e.idFournisseur}>
              {e.nomFournisseur}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  return { selectFournisseurHTML: renderHTML, fournisseur };
}

export default useSelectFournisseur;
