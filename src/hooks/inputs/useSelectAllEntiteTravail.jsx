import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetAllEntiteTravail } from "../api/useEntiteTravailApi";
import { useState } from "react";

export default function useSelectAllEntiteTravail() {
  const [entiteTravail, setEntiteTravail] = useState(null);
  const AllEntiteTravail = useGetAllEntiteTravail();

  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="entiteTravail">Entite de travail</InputLabel>
        <Select
          labelId="entiteTravail"
          label="Entite de travail"
          variant="outlined"
          value={entiteTravail}
          onChange={(e) => setEntiteTravail(e.target.value)}
          required
        >
          <MenuItem value={-1} disabled>
            Choisir une entite de travail
          </MenuItem>
          {AllEntiteTravail?.data?.map((e) => (
            <MenuItem key={e.id + e.libelle + 1} value={e.idEntiteTravail}>
              {`${e.typeEntiteTravail.toLowerCase()} ${e.nomEntiteTravail}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  return { selectAllEntiteTravail: renderHTML, entiteTravail };
}
