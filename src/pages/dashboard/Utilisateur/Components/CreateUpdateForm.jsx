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

function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setFormData = null,
}) {
  /********** state ***************** */
  const [nomUtilisateur, setNomUtilisateur] = useState(
    isUpdate ? data?.nomUtilisateur : ""
  );
  const [prenomUtilisateur, setPrenomUtilisateur] = useState(
    isUpdate ? data?.prenomUtilisateur : ""
  );
  const [emailUtilisateur, setEmailUtilisateur] = useState(
    isUpdate ? data?.email : ""
  );
  const [immatriculeUtilisateur, setImmatriculeUtilisateur] = useState(
    isUpdate ? data?.immatricule : ""
  );
  const [dateDebut, setDateDebut] = useState(isUpdate ? data?.dateDebut : "");
  const [typeEntiteTravail, setTypeEntiteTravail] = useState(
    isUpdate ? data?.typeEntiteTravail : "DEFAULT"
  );
  const { selectEntiteTravail, entiteTravail } = useSelectEntiteTravail(
    typeEntiteTravail,
    isUpdate ? data?.idEntiteTravail : ""
  );

  /**********  Submit and validation ****************** */
  useEffect(() => {
    setFormData(
      isUpdate
        ? {
            nomUtilisateur,
            prenomUtilisateur,
            email: emailUtilisateur,
            immatricule: immatriculeUtilisateur,
          }
        : {
            nomUtilisateur,
            prenomUtilisateur,
            email: emailUtilisateur,
            immatricule: immatriculeUtilisateur,
            entiteTravail,
            dateDebut,
          }
    );
  }, [
    isUpdate,
    nomUtilisateur,
    prenomUtilisateur,
    emailUtilisateur,
    immatriculeUtilisateur,
    setFormData,
    entiteTravail,
    dateDebut,
  ]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <TextField
            sx={{ flex: 3 }}
            label="Immatricule Utilisateur"
            id="immatricule_utilisateur"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            autoComplete="name"
            value={immatriculeUtilisateur}
            onChange={(e) => setImmatriculeUtilisateur(e.target.value)}
          />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
          >
            <TextField
              sx={{ flex: 3 }}
              label="Nom Utilisateur"
              id="nom_utilisateur"
              variant="outlined"
              required
              margin="normal"
              autoFocus
              autoComplete="name"
              value={nomUtilisateur}
              onChange={(e) => setNomUtilisateur(e.target.value)}
            />

            <TextField
              sx={{ flex: 3 }}
              label="Prenom Utilisateur"
              id="prenom_utilisateur"
              variant="outlined"
              required
              margin="normal"
              autoFocus
              autoComplete="name"
              value={prenomUtilisateur}
              onChange={(e) => setPrenomUtilisateur(e.target.value)}
            />
          </Box>

          <TextField
            sx={{ flex: 3 }}
            label="Email Utilisateur"
            id="email_utilisateur"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            autoComplete="name"
            value={emailUtilisateur}
            onChange={(e) => setEmailUtilisateur(e.target.value)}
          />

          {!isUpdate && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                <FormControl fullWidth sx={{ flex: 3, my: 2 }}>
                  <InputLabel id="type_entite_travail_label">
                    Type Entite travail
                  </InputLabel>
                  <Select
                    labelId="type_entite_travail_label"
                    value={typeEntiteTravail}
                    onChange={(e) => setTypeEntiteTravail(e.target.value)}
                    label="Type Entite travail"
                    variant="outlined"
                    required
                  >
                    <MenuItem value="DEFAULT" disabled>
                      Choisir un type
                    </MenuItem>

                    <MenuItem value="DEPARTEMENT">Departement</MenuItem>
                    <MenuItem value="DIVISION">Division</MenuItem>
                    <MenuItem value="SERVICE">Service</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ flex: 3, my: 2 }}>{selectEntiteTravail}</Box>
              </Box>

              <TextField
                sx={{ flex: 3 }}
                id="date_debut"
                variant="outlined"
                required
                margin="normal"
                autoFocus
                autoComplete="name"
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CreateUpdateForm;
