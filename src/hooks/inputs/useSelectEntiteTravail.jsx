import { useState } from "react";
import { useGetAllEntiteTravail } from "../api/useEntiteTravailApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function useSelectEntiteTravail(typeEntiteTravail, initEntiteTravail = "") {
  const [entiteTravail, setEntiteTravail] = useState(initEntiteTravail);
  const allEntiteTravail = useGetAllEntiteTravail();

  const handleChange = (event) => {
    setEntiteTravail(event.target.value);
  };

  const filteredEntities = allEntiteTravail?.data?.filter((entity) =>
    entity.typeEntiteTravail.startsWith(typeEntiteTravail)
  );

  const renderHTML = (
    <FormControl fullWidth>
      <InputLabel id="parent_entite_travail_label">
        Entite Travail Parent
      </InputLabel>
      <Select
        labelId="parent_entite_travail_label"
        value={entiteTravail}
        onChange={handleChange}
        label="Entite Travail Parent"
      >
        {filteredEntities?.map((entity) => (
          <MenuItem key={entity.idEntiteTravail} value={entity.idEntiteTravail}>
            {`${entity.typeEntiteTravail.toLowerCase()} ${
              entity.nomEntiteTravail
            }`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return { selectEntiteTravail: renderHTML, entiteTravail };
}

export default useSelectEntiteTravail;
