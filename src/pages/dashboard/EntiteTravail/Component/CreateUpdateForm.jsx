import { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useSelectEntiteTravail from "../../../../hooks/inputs/useSelectEntiteTravail";
import useSelectAllEntiteTravail from "../../../../hooks/inputs/useSelectAllEntiteTravail";

function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setFormData = null,
}) {
  /********** state ***************** */
  const [nomEntiteTravail, setNomEntiteTravail] = useState(
    isUpdate ? data?.nomEntiteTravail : ""
  );
  const [typeEntiteTravail, setTypeEntiteTravail] = useState(
    isUpdate ? data?.typeEntiteTravail : ""
  );
  const { selectAllEntiteTravail, entiteTravail } = useSelectAllEntiteTravail(
    isUpdate ? data?.parent?.idEntiteTravail : ""
  );

  /**********  Submit and validation ****************** */
  useEffect(() => {
    setFormData({
      nomEntiteTravail,
      typeEntiteTravail,
      entiteTravail,
    });
  }, [nomEntiteTravail, typeEntiteTravail, entiteTravail, setFormData]);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ flex: 3 }}
            label="Nom Entite travail"
            id="nom_entite_travail"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            autoComplete="name"
            value={nomEntiteTravail}
            onChange={(e) => setNomEntiteTravail(e.target.value)}
          />

          <FormControl fullWidth sx={{ flex: 3, my: 2 }}>
            <InputLabel id="type_entite_travail_label">
              Type Entite travail
            </InputLabel>
            <Select
              labelId="type_entite_travail_label"
              id="type_entite_travail_select"
              value={typeEntiteTravail}
              label="Type Entite travail"
              variant="outlined"
              required
              onChange={(e) => setTypeEntiteTravail(e.target.value)}
            >
              <MenuItem value={"DEPARTEMENT"}>Departement</MenuItem>
              <MenuItem value={"DIVISION"}>Division</MenuItem>
              <MenuItem value={"SERVICE"}>Service</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 3, my: 2 }}>{selectAllEntiteTravail}</Box>
        </Box>
      </Box>
    </>
  );
}

export default CreateUpdateForm;
