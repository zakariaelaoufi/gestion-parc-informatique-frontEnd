import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function UpdateForm({ data = null, setFormData = null }) {
  const [etat, setEtat] = useState(data?.etat ? data.etat : "");

  useEffect(() => {
    setFormData({ etat: etat });
  }, [etat, setFormData]);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Etat</InputLabel>
          <Select
            labelId="etat_label"
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
            label="Etat d'inventaire"
            variant="outlined"
            required
          >
            <MenuItem value="DEFAULT" disabled>
              Choisir un type
            </MenuItem>

            <MenuItem value="ENSTOCK">ENSTOCK</MenuItem>
            <MenuItem value="ENREPARATION">ENREPARATION</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
