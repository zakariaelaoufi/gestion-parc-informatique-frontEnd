import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetAllSupplier } from "../api/useSupplierApi";
import { useState } from "react";
import { useGetAllMarche } from "../api/useMarcheApi";

export default function useSelectMarche() {
  const [marche, setMarche] = useState("");
  const allMarche = useGetAllMarche();
  //   console.log(allMarche.data);
  const handleChange = (event) => {
    setMarche(event.target.value);
  };
  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="marche_label">Marché</InputLabel>
        <Select
          labelId="dmarche_label"
          id="marche_select"
          value={marche}
          label="marche"
          onChange={handleChange}
        >
          {allMarche?.data?.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.numberMarche} - {e.libelle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  return { selectMarcheHTML: renderHTML, marche };
}
