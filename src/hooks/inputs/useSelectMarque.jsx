import { useState } from "react";
import { useGetAllMarque } from "../api/useMarqueApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function useSelectMarque({ idMarqueUpdate = -1 }) {
  const [Marque, setMarque] = useState(idMarqueUpdate);
  const allMarque = useGetAllMarque();
  const handleChange = (event) => {
    setMarque(event.target.value);
  };
  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="Marque_label">Marque</InputLabel>
        <Select
          labelId="Marque_label"
          label="Marque"
          variant="outlined"
          value={Marque}
          onChange={handleChange}
          required
        >
          <MenuItem value={-1} disabled>
            Choisir une Marque
          </MenuItem>
          {allMarque?.data?.map((e) => (
            <MenuItem key={e.id + e.nomMarque} value={e.idMarque}>
              {e.nomMarque}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  return { selectMarqueHTML: renderHTML, Marque };
}

export default useSelectMarque;
