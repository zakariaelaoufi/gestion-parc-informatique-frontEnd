import { useState, useMemo } from "react";
import {
  useGetAllAvailableAffectation,
  useUpdateAffectation,
} from "../../../hooks/api/useAffectationApi";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetAllNotAvailableAttachment,
  useUpdateAttachment,
} from "../../../hooks/api/useAttachmentApi";

export default function Recuperer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialHostName = searchParams.get("host_name") || "";

  const [hostname, setHostname] = useState(initialHostName);
  const [dateRetour, setDateRetour] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const { data: availableAffectations = [] } = useGetAllAvailableAffectation();
  const { data: notAvailableAttachments = [] } =
    useGetAllNotAvailableAttachment();
  const allData = useMemo(
    () => [...availableAffectations, ...notAvailableAttachments],
    [availableAffectations, notAvailableAttachments]
  );

  const currentInventaire = useMemo(
    () => allData.find((inv) => inv.hostname === hostname),
    [allData, hostname]
  );

  const mutationCreateAffectation = useUpdateAffectation({
    onSuccess: () => navigate("/dashboard/parc-informatique/liste-machines"),
    onError: () => setErrors("vérifiez vos informations"),
    idAffectation: currentInventaire?.idAffectation,
  });

  const mutationCreateAttachment = useUpdateAttachment({
    onSuccess: () => navigate("/dashboard/parc-informatique/liste-machines"),
    onError: () => setErrors("vérifiez vos informations"),
    idAttachment: currentInventaire?.idAttachment,
  });

  const onSubmit = () => {
    if (currentInventaire?.immatricule && dateRetour) {
      mutationCreateAffectation.mutate({
        idAffectation: currentInventaire.idAffectation,
        dateAffectation: currentInventaire.dateAffectation,
        dateRetour,
        idTravail: currentInventaire.idTravail,
        idInventaire: currentInventaire.idInventaire,
      });
      setErrors(null);
      return true;
    } else if (currentInventaire?.idAttachment && dateRetour) {
      mutationCreateAttachment.mutate({
        idAttachment: currentInventaire.idAttachment,
        dateAttachment: currentInventaire.dateAttachment,
        dateRetoure: dateRetour,
        entiteTravail: { idEntiteTravail: currentInventaire.idEntiteTravail },
        inventaire: { idInventaire: currentInventaire.idInventaire },
      });
      setErrors(null);
      return true;
    } else {
      setErrors("veuillez remplir tous les champs correctement");
      return false;
    }
  };

  return (
    <Box
      sx={{
        my: 5,
        mb: 5,
        mx: "5%",
        "& input , & .MuiFormLabel-root , & .MuiInputBase-root": {
          background: "#fff",
        },
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        sx={{
          mt: 2,
          mb: 6,
          fontWeight: 700,
          borderLeft: "4px solid",
          borderLeftColor: "primary.main",
          pl: 2,
        }}
      >
        Enregister retour
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {errors && (
          <Alert sx={{ width: "100%" }} severity="error">
            {errors}
          </Alert>
        )}
        <TextField
          type="text"
          fullWidth
          required
          label="Hostname du machine"
          variant="outlined"
          value={hostname}
          sx={{ mt: 2 }}
          onChange={(e) => setHostname(e.target.value)}
        />
        {currentInventaire && (
          <Box>
            <TextField
              type="text"
              fullWidth
              required
              label="Nom du machine"
              variant="outlined"
              sx={{ mt: 2 }}
              value={currentInventaire.nomMachine}
              disabled
            />
            {currentInventaire.immatricule && (
              <TextField
                fullWidth
                required
                label="Immatricule"
                variant="outlined"
                sx={{ mt: 2 }}
                value={currentInventaire.immatricule}
                disabled
              />
            )}
            <TextField
              fullWidth
              required
              label="Place"
              variant="outlined"
              sx={{ mt: 2 }}
              value={currentInventaire.place}
              disabled
            />
            <TextField
              fullWidth
              required
              label={
                currentInventaire.immatricule
                  ? "Date affectation"
                  : "Date attachment"
              }
              variant="outlined"
              sx={{ mt: 2 }}
              value={
                currentInventaire.dateAffectation ||
                currentInventaire.dateAttachment ||
                ""
              }
              disabled
            />
            <TextField
              type="date"
              fullWidth
              required
              label="Date de retour"
              variant="outlined"
              sx={{ mt: 2 }}
              inputProps={{ max: new Date().toISOString().split("T")[0] }}
              value={dateRetour}
              onChange={(e) => setDateRetour(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ p: 1.5, mt: 2 }}
              endIcon={<PlaylistAddRoundedIcon />}
              onClick={onSubmit}
            >
              Récupérer
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
