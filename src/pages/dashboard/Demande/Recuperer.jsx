import { useState } from "react";
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
  const host_name = searchParams.get("host_name");

  const [hostname, setHostname] = useState(host_name || "");
  const [dateRetour, setDateRetour] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const allNotAvailable = useGetAllAvailableAffectation()?.data || [];
  const allNotAvailable2 = useGetAllNotAvailableAttachment()?.data || [];
  const all = [...allNotAvailable, ...allNotAvailable2];
  console.log(all, "all");

  const existenceHostname = (hostname) => {
    return all?.some((inv) => inv.hostname === hostname);
  };

  const inventaireInfo = (hostname) => {
    return all?.find((inv) => inv.hostname === hostname);
  };

  const mutationCreateAffectation = useUpdateAffectation({
    onSuccess: () => {
      navigate("/dashboard/inventaire/liste-inventaire");
    },
    onError: () => {
      setErrors("vérifiez vos informations");
    },
    idAffectation: inventaireInfo(hostname)?.idAffectation,
  });

  const mutationCreateAttachment = useUpdateAttachment({
    onSuccess: () => {
      navigate("/dashboard/inventaire/liste-inventaire");
    },
    onError: () => {
      setErrors("vérifiez vos informations");
    },
    idAttachment: inventaireInfo(hostname)?.idAttachment,
  });

  const onSubmit = () => {
    if (inventaireInfo(hostname).immatricule && dateRetour) {
      const obj = {
        idAffectation: inventaireInfo(hostname)?.idAffectation,
        dateAffectation: inventaireInfo(hostname)?.dateAffectation,
        dateRetour: dateRetour,
        idTravail: inventaireInfo(hostname)?.idTravail,
        idInventaire: inventaireInfo(hostname)?.idInventaire,
      };
      mutationCreateAffectation.mutate(obj);
      setErrors(null);
      return true;
    } else if (inventaireInfo(hostname)?.idAttachment && dateRetour) {
      console.log(inventaireInfo(hostname)?.idInventaire, "idInventaire");
      console.log(inventaireInfo(hostname)?.idTravail, "idTravail");
      const obj = {
        idAttachment: inventaireInfo(hostname)?.idAttachment,
        dateAttachment: inventaireInfo(hostname)?.dateAttachment,
        dateRetoure: dateRetour,
        entiteTravail: {
          idEntiteTravail: inventaireInfo(hostname)?.idEntiteTravail,
        },
        inventaire: {
          idInventaire: inventaireInfo(hostname)?.idInventaire,
        },
      };
      mutationCreateAttachment.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("veuillez remplir tous les champs correctement");
      return false;
    }
  };

  return (
    <>
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
        {/* start */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "Start",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
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
          {existenceHostname(hostname) ? (
            <Box>
              <TextField
                type="text"
                fullWidth
                required
                label="Nom du machine"
                variant="outlined"
                sx={{ mt: 2 }}
                value={inventaireInfo(hostname).nomMachine}
                disabled
              />
              {inventaireInfo(hostname).immatricule && (
                <TextField
                  fullWidth
                  required
                  label="Immatricule"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  value={inventaireInfo(hostname).immatricule}
                  disabled
                />
              )}
              <TextField
                fullWidth
                required
                label="Place"
                variant="outlined"
                sx={{ mt: 2 }}
                value={inventaireInfo(hostname).place}
                disabled
              />
              <TextField
                fullWidth
                required
                label={
                  inventaireInfo(hostname)?.immatricule
                    ? "Date affectation"
                    : "Date attachment"
                }
                variant="outlined"
                sx={{ mt: 2 }}
                value={
                  inventaireInfo(hostname)?.dateAffectation ||
                  inventaireInfo(hostname)?.dateAttachment ||
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
          ) : (
            <Box></Box>
          )}
        </Box>
        {/* end */}
      </Box>
    </>
  );
}
