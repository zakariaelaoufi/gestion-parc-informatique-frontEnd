import { useState } from "react";
import { useGetAllUtilisateur } from "../../../hooks/api/useUtilisateur";
import {
  Alert,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useGetAllAvailableInventaire } from "../../../hooks/api/useInventaireApi";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { useCreateAffectation } from "../../../hooks/api/useAffectationApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function Demander() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const host_name = searchParams.get("host_name");

  const allUser = useGetAllUtilisateur().data;
  const allInventaire = useGetAllAvailableInventaire().data;
  const [agent, setAgent] = useState("");
  const [hostname, setHostname] = useState(host_name || "");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const [dateAffection, setDateAffectation] = useState("");

  const mutationCreate = useCreateAffectation({
    onSuccess: () => {
      navigate("/dashboard/inventaire/liste-inventaire");
    },
    onError: () => {
      setErrors("vérifiez vos informations");
    },
  });

  const onSubmit = () => {
    if (existenceAgent(agent) && existenceHostname(hostname)) {
      const obj = {
        immatricule: agent,
        hostname: hostname,
        dateAffectation: dateAffection,
        idInventaire: inventaireInfo(hostname).idInventaire,
        idUtilisateur: userInfo(agent).idUtilisateur,
        idTravail: userInfo(agent).idTravail,
      };
      mutationCreate.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("veuillez remplir tous les champs correctement");
      return false;
    }
  };

  const existenceAgent = (agent) => {
    return allUser?.some((user) => user.immatricule === agent);
  };

  const existenceHostname = (hostname) => {
    return allInventaire?.some((inv) => inv.hostname === hostname);
  };

  const userInfo = (agent) => {
    return allUser?.find((user) => user.immatricule === agent);
  };
  const inventaireInfo = (hostname) => {
    return allInventaire?.find((inv) => inv.hostname === hostname);
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
          Attribuer une machine
        </Typography>
        {/* start */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "Start",
            alignItems: "start",
          }}
        >
          <Box component="form" sx={{ mr: 3, width: "100%" }}>
            {errors && <Alert severity="error">{errors}</Alert>}
            <TextField
              type="text"
              fullWidth
              required
              label="Immatricule"
              variant="outlined"
              sx={{ mt: 2 }}
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            />
            <TextField
              type="text"
              fullWidth
              required
              label="Hostname du machine"
              variant="outlined"
              sx={{ mt: 2 }}
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
            />

            <TextField
              type="date"
              fullWidth
              required
              label="Date d'affectation"
              variant="outlined"
              sx={{ mt: 2 }}
              onChange={(e) => setDateAffectation(e.target.value)}
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
              Créer Demande
            </Button>
          </Box>
          {/* Fin */}

          <Box
            sx={{
              width: "65%",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Typography
              textAlign={"center"}
              variant="h6"
              color={"secondary.main"}
              sx={{ fontWeight: 700 }}
            >
              Informations d'Atribuation
            </Typography>
            <Divider sx={{ my: 2 }} />
            {/* User Information Section */}
            {existenceAgent(agent) ? (
              <Box>
                <TextField
                  disabled
                  label="Immatricule"
                  value={userInfo(agent)?.immatricule}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <Box display={"flex"} gap={2}>
                  <TextField
                    disabled
                    label="Nom"
                    value={userInfo(agent)?.nomUtilisateur}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    disabled
                    label="Prénom"
                    value={userInfo(agent)?.prenomUtilisateur}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                  />
                </Box>
                <TextField
                  disabled
                  label="Travail dans"
                  value={userInfo(agent)?.travaillers?.[0].nomEntiteTravail}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  size="small"
                />
              </Box>
            ) : (
              <Typography variant="body1" color="textSecondary">
                Aucune information avec ce matricule
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
            {/* Inventory Information Section */}
            {existenceHostname(hostname) ? (
              <Box>
                <TextField
                  disabled
                  label="Nom de la machine"
                  value={inventaireInfo(hostname)?.nomProduit || ""}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <Box display={"flex"} gap={2}>
                  <TextField
                    disabled
                    label="Hostname"
                    value={inventaireInfo(hostname)?.hostname || ""}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    disabled
                    label="Numéro de série"
                    value={inventaireInfo(hostname)?.numeroSerie || ""}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                  />
                </Box>
                <Box display={"flex"} gap={2}>
                  <TextField
                    disabled
                    label="Catégorie"
                    value={inventaireInfo(hostname)?.categorie || ""}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    disabled
                    label="Marque"
                    value={inventaireInfo(hostname)?.marque || ""}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                  />
                </Box>
              </Box>
            ) : (
              <Typography variant="body1" color="textSecondary">
                Aucune information avec ce hostname
              </Typography>
            )}
            <Divider sx={{ my: 1 }} />
            <Box>
              <TextField
                disabled
                type="date"
                label="Date d'affectation"
                value={dateAffection}
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
