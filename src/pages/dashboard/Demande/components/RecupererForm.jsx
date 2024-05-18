import { Box, TextField } from "@mui/material";

export default function RecupererForm({
  affectation = null,
  setDateRetoure = null,
}) {
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
            label="Nom machine"
            id="immatricule_utilisateur"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            value={affectation?.nomMachine}
            disabled
          />
          <TextField
            sx={{ flex: 3 }}
            label="Hostname"
            id="hostname"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            value={affectation?.hostname}
            disabled
          />
          <TextField
            sx={{ flex: 3 }}
            label="Immatricule"
            id="immatricule"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            value={affectation?.immatricule}
            disabled
          />
          <TextField
            sx={{ flex: 3 }}
            label="Place"
            id="place"
            variant="outlined"
            required
            margin="normal"
            autoFocus
            value={affectation?.place}
            disabled
          />
          <TextField
            sx={{ flex: 3 }}
            label="Date Affectation"
            id="date_affectation"
            variant="outlined"
            required
            type="date"
            margin="normal"
            autoFocus
            value={affectation?.dateAffectation}
            disabled
          />
          <TextField
            sx={{ flex: 3 }}
            label="Date Affectation"
            id="date_affectation"
            variant="outlined"
            required
            type="date"
            margin="normal"
            autoFocus
            onChange={(e) => setDateRetoure(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
}
