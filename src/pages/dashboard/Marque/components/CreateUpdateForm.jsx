import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setFormData = null,
}) {
  const [nomMarque, setNomMarque] = useState(isUpdate ? data?.nomMarque : "");

  useEffect(() => {
    setFormData({ nomMarque: nomMarque });
  }, [nomMarque, setFormData]);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          required
          id="nom_Marque"
          label="Nom de la marque"
          value={nomMarque}
          onChange={(e) => setNomMarque(e.target.value)}
        />
      </Box>
    </Box>
  );
}
