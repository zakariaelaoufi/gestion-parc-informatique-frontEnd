import { useState } from "react";
import { useGetAllCategorie } from "../api/useCategorieApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function useSelectCategorie() {
  const [Categorie, setCategorie] = useState(-1);
  const allCategorie = useGetAllCategorie();
  const handleChange = (event) => {
    setCategorie(event.target.value);
  };
  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="Categorie_label">Categorie</InputLabel>
        <Select
          labelId="Categorie_label"
          label="Categorie"
          variant="outlined"
          value={Categorie}
          onChange={handleChange}
          required
        >
          <MenuItem value={-1} disabled>
            Choisir une categorie
          </MenuItem>
          {allCategorie?.data?.map((e) => (
            <MenuItem key={e.id + e.libelle} value={e.idCategorie}>
              {e.libelle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  return { selectCategorieHTML: renderHTML, Categorie };
}

export default useSelectCategorie;
