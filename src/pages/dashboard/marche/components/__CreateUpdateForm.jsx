import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

export function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setMarcheData = null,
}) {
  /********** state ***************** */

  const [marcheName, setMarcheName] = useState(
    isUpdate ? data?.marche_name : ""
  );
  const [marcheDescription, setMarcheDescription] = useState(
    isUpdate ? data?.marche_description : ""
  );

  /**********  Submit and validation ****************** */

  useEffect(() => {
    setMarcheData({
      marcheName,
      marcheDescription,
    });
  }, [marcheDescription, marcheName, setMarcheData]);

  console.log("--> c.Art");
  return (
    <>
      <Box>
        <TextField
          margin="normal"
          required
          id="marche_name"
          label="Nom d'marche"
          name="marcheName"
          autoFocus
          fullWidth
          value={marcheName}
          onChange={(e) => setMarcheName(e.target.value)}
        />

        <TextField
          margin="normal"
          id="marche_description"
          label="Description d'marche"
          name="marcheDescription"
          fullWidth
          value={marcheDescription}
          onChange={(e) => setMarcheDescription(e.target.value)}
        />
      </Box>
    </>
  );
}
