import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setFormData = null,
}) {
  /********** state ***************** */
  const [nomFournisseur, setNomFournisseur] = useState(
    isUpdate ? data?.nomFournisseur : ""
  );
  const [adresse, setAdresseFournisseur] = useState(
    isUpdate ? data?.adresseFournisseur : ""
  );
  const [ice, setICE] = useState(isUpdate ? data?.ICE : "");
  const [tel, setTel] = useState(isUpdate ? data?.Tel : "");
  const [fax, setFax] = useState(isUpdate ? data?.Fax : "");
  const [email, setEmail] = useState(isUpdate ? data?.email : "");

  /**********  Submit and validation ****************** */
  useEffect(() => {
    setFormData({
      nomFournisseur,
      adresse,
      ice,
      tel,
      fax,
      email,
    });
  }, [nomFournisseur, adresse, ice, tel, fax, email, setFormData]);

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
            id="nomFournisseur"
            label="Nom du fournisseur"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            autoComplete="name"
            value={nomFournisseur}
            onChange={(e) => setNomFournisseur(e.target.value)}
          />
          <TextField
            sx={{ flex: 3 }}
            id="ICE"
            label="ICE"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            autoComplete="name"
            value={ice}
            onChange={(e) => setICE(e.target.value)}
          />
          <TextField
            sx={{ flex: 3 }}
            id="Adresse"
            label="Adresse du fournisseur"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            autoComplete="name"
            value={adresse}
            onChange={(e) => setAdresseFournisseur(e.target.value)}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              sx={{ flex: 3 }}
              id="Tel"
              label="Tel"
              variant="outlined"
              required
              margin="normal"
              autoFocus
              autoComplete="name"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            <TextField
              sx={{ flex: 3 }}
              id="Fax"
              label="Fax"
              variant="outlined"
              required
              margin="normal"
              autoFocus
              autoComplete="name"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
            />
          </Box>
          <TextField
            sx={{ flex: 3 }}
            id="email"
            label="Email"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            autoComplete="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
}

export default CreateUpdateForm;
