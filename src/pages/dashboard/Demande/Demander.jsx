import { useState } from "react";
import { useGetAllUtilisateur } from "../../../hooks/api/useUtilisateur";
import { useGetAllAvailableInventaire } from "../../../hooks/api/useInventaireApi";
import { useCreateAffectation } from "../../../hooks/api/useAffectationApi";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";

export default function Demander({ host_name }) {
  const { data: allUser } = useGetAllUtilisateur();
  const { data: allInventaire } = useGetAllAvailableInventaire();

  const [agent, setAgent] = useState("");
  const [hostname, setHostname] = useState(host_name || "");
  const [dateAffection, setDateAffectation] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const mutationCreate = useCreateAffectation({
    onSuccess: () => {
      navigate("/dashboard/inventaire/liste-inventaire");
    },
    onError: () => {
      setErrors("vérifiez vos informations");
    },
  });

  // Check if agent exists in the user list
  const existenceAgent = (agent) => {
    return allUser?.some((user) => user.immatricule === agent);
  };

  // Check if hostname exists in the inventory list
  const existenceHostname = (hostname) => {
    return allInventaire?.some((inv) => inv.hostname === hostname);
  };

  // Get user info based on agent
  const userInfo = (agent) => {
    return allUser?.find((user) => user.immatricule === agent);
  };

  // Get inventory info based on hostname
  const inventaireInfo = (hostname) => {
    return allInventaire?.find((inv) => inv.hostname === hostname);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (existenceAgent(agent) && existenceHostname(hostname)) {
      const user = userInfo(agent);
      const inventory = inventaireInfo(hostname);

      const obj = {
        immatricule: agent,
        hostname: hostname,
        dateAffectation: dateAffection,
        idInventaire: inventory?.idInventaire,
        idUtilisateur: user?.idUtilisateur,
        idTravail: user?.idTravail,
      };

      mutationCreate.mutate(obj);
      setErrors(null);
    } else {
      setErrors("veuillez remplir tous les champs correctement");
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        mb: 5,
        mx: "5%",
        "& input, & .MuiFormLabel-root, & .MuiInputBase-root": {
          background: "#fff",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
        }}
      >
        <Box component="form" sx={{ mr: 3, width: "100%" }} onSubmit={onSubmit}>
          {errors && (
            <Alert sx={{ mb: 2 }} severity="error">
              {errors}
            </Alert>
          )}
          <TextField
            type="text"
            fullWidth
            required
            label="Immatricule"
            variant="outlined"
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
            fullWidth
            endIcon={<PlaylistAddRoundedIcon />}
          >
            Créer Demande
          </Button>
        </Box>
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
            Informations d'Atribution
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
                value={
                  userInfo(agent)?.travaillers?.[0]?.nomEntiteTravail || ""
                }
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
  );
}
