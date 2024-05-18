import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setFormData = null,
}) {
  /********** state ***************** */
  const [libelle, setLibelle] = useState(isUpdate ? data?.libelle : "");
  const [abv, setAbv] = useState(isUpdate ? data.abv : "");

  useEffect(() => {
    setFormData({ libelle, abv });
  }, [libelle, abv, setFormData]);

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            required
            id="libelle"
            label="Libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
          />
          <TextField
            required
            id="abv"
            label="Abv"
            value={abv}
            onChange={(e) => setAbv(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
}
