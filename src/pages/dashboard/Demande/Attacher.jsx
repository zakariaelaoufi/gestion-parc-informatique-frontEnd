import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { useNavigate } from "react-router-dom";
import useSelectAllEntiteTravail from "../../../hooks/inputs/useSelectAllEntiteTravail";
import { useCreateAttachment } from "../../../hooks/api/useAttachmentApi";
import { useGetAllAvailableInventaire } from "../../../hooks/api/useInventaireApi";

export default function Attacher({ host_name }) {
  const { selectAllEntiteTravail, entiteTravail } = useSelectAllEntiteTravail();
  const allInventaire = useGetAllAvailableInventaire().data;
  const navigate = useNavigate();

  const [dateAttachment, setDateAttachment] = useState("");
  const [hostname, setHostname] = useState(host_name || "");
  const [errors, setErrors] = useState(null);

  const existenceHostname = (hostname) => {
    return allInventaire?.some((inv) => inv.hostname === hostname);
  };

  const inventaireInfo = (hostname) => {
    return allInventaire?.find((inv) => inv.hostname === hostname);
  };

  const createMutation = useCreateAttachment({
    onSuccess: () => navigate("/dashboard/inventaire/liste-inventaire"),
    onError: () => setErrors("Veuillez remplir tous les champs correctement"),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (existenceHostname(hostname) && entiteTravail && dateAttachment) {
      const obj = {
        hostname,
        dateAttachment,
        entiteTravail: { idEntiteTravail: entiteTravail },
        inventaire: { idInventaire: inventaireInfo(hostname).idInventaire },
      };
      console.log(obj);
      createMutation.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("Veuillez remplir tous les champs correctement");
      return false;
    }
  };

  return (
    <Box
      sx={{
        my: 2,
        mx: "5%",
        "& input , & .MuiFormLabel-root , & .MuiInputBase-root": {
          background: "#fff",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mr: 3,
            width: "100%",
          }}
          component="form"
          onSubmit={onSubmit}
        >
          {errors && (
            <Alert sx={{ mb: 2, width: "100%" }} severity="error">
              {errors}
            </Alert>
          )}
          <Box width={"100%"}>{selectAllEntiteTravail}</Box>
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
            label="Date d'attachment"
            variant="outlined"
            sx={{ mt: 2 }}
            value={dateAttachment}
            onChange={(e) => setDateAttachment(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ p: 1.5, mt: 2 }}
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
            Informations d{"'"}attachment
          </Typography>
          <Divider sx={{ my: 2 }} />
          {existenceHostname(hostname) ? (
            <Box display={"flex"} flexDirection={"column"} gap={2}>
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
                  size="small"
                />
                <TextField
                  disabled
                  label="Numéro de série"
                  value={inventaireInfo(hostname)?.numeroSerie || ""}
                  fullWidth
                  variant="outlined"
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
                  size="small"
                />
                <TextField
                  disabled
                  label="Marque"
                  value={inventaireInfo(hostname)?.marque || ""}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Aucune information avec ce hostname
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Box>
            <TextField
              disabled
              type="text"
              fullWidth
              label="Entite de travail"
              variant="outlined"
              value={entiteTravail?.nomEntiteTravail || ""}
              size="small"
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <TextField
              disabled
              type="date"
              label="Date d'attachment"
              value={dateAttachment}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
