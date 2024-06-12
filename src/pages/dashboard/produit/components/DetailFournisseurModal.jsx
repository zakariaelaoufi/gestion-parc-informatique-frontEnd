import { Box, TextField } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";

export default function DetailFournisseurModal({ data = [] }) {
  if (data === null) return <></>;

  console.log("faya", data);
  return (
    <>
      <Modal
        nom={data?.nomFournisseur}
        noAction={true}
        modalCancelName={"Fermer"}
        modalTitle={"Detail du fournisseur"}
      >
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
              disabled
              value={data?.nomFournisseur}
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
              disabled
              value={data?.ice}
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
              disabled
              value={data?.adresse}
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
                disabled
                value={data?.tel}
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
                disabled
                value={data?.fax}
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
              disabled
              value={data?.email}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
