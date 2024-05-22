import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetAllEntiteTravail } from "../api/useEntiteTravailApi";
import { useState } from "react";

export default function useSelectAllEntiteTravail(initEntiteTravail = "") {
  const [entiteTravail, setEntiteTravail] = useState(initEntiteTravail);
  const [entiteTravailName, setEntiteTravailName] = useState("");
  const AllEntiteTravail = useGetAllEntiteTravail();

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setEntiteTravail(selectedId);
    const selectedEntity = AllEntiteTravail?.data?.find(
      (entity) => entity.idEntiteTravail === selectedId
    );
    if (selectedEntity) {
      setEntiteTravailName(
        `${selectedEntity.typeEntiteTravail.toLowerCase()} ${
          selectedEntity.nomEntiteTravail
        }`
      );
    } else {
      setEntiteTravailName("");
    }
  };

  const renderHTML = (
    <FormControl fullWidth>
      <InputLabel id="entiteTravail">Entite de travail</InputLabel>
      <Select
        labelId="entiteTravail"
        label="Entite de travail"
        variant="outlined"
        value={entiteTravail}
        onChange={handleChange}
        required
      >
        <MenuItem value={-1} disabled>
          Choisir une entite de travail
        </MenuItem>
        {AllEntiteTravail?.data?.map((e) => (
          <MenuItem key={e.idEntiteTravail} value={e.idEntiteTravail}>
            {`${e.typeEntiteTravail.toLowerCase()} ${e.nomEntiteTravail}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return {
    selectAllEntiteTravail: renderHTML,
    entiteTravail,
    entiteTravailName,
  };
}
