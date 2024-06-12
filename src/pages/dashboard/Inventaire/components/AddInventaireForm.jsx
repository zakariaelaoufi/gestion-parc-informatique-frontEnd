import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import useUploadDataXlsx from "../../../../hooks/utils/useUploadDataXlsx";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Alert, Box, TextField } from "@mui/material";
import useSelectFournisseur from "../../../../hooks/inputs/useSelectFournisseur";
import { useAddMoreInventaireLV } from "../../../../hooks/api/useProduitApi";

export default function AddInventaireForm({ data = [] }) {
  const { dataExcel = [], UploadButton } = useUploadDataXlsx();
  const { selectFournisseurHTML, fournisseur } = useSelectFournisseur(-1);

  const [errors, setErrors] = useState(null);
  const [dateLivraison, setDateLivraison] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [delai, setDelai] = useState("");
  const [prix, setPrix] = useState("");

  const mutationAddInventaire = useAddMoreInventaireLV({
    onError: () => {
      setErrors("Veuillez selectionner le fichier");
    },
  });

  const handleAction = () => {
    const datos = dataExcel.map((e) => e[0]);
    if (dataExcel.length > 0) {
      const obj = {
        idProduit: data.idProduit,
        quantite: dataExcel.length,
        numeroSerie: datos,
        fournisseur: {
          idFournisseur: fournisseur,
        },
        livraison: {
          dateLivraison: dateLivraison,
          delai: delai,
          prix: prix,
        },
      };
      if (
        obj.livraison.dateLivraison &&
        obj.livraison.delai &&
        obj.livraison.prix
      ) {
        mutationAddInventaire.mutate(obj);
        setErrors(null);
        return true;
      }
    } else {
      setErrors("Veuillez selectionner le fichier");
      return false;
    }
  };

  return (
    <>
      <Modal
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Ajouter autres machines "}
        modalActionName={"Ajouter"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setErrors(null)}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ flex: 3 }}
            label="Nom produit"
            id="nom_produit"
            variant="outlined"
            required
            autoFocus
            value={data?.nomProduit}
            disabled
            autoComplete="name"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Box sx={{ mt: 2, flex: 3 }}>{selectFournisseurHTML}</Box>
            <TextField
              sx={{ flex: 3 }}
              type="text"
              fullWidth
              id="prix"
              label="Prix"
              variant="outlined"
              margin="normal"
              required
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <TextField
              flex={3}
              type="date"
              fullWidth
              label="Date de livraison"
              variant="outlined"
              margin="normal"
              required
              value={dateLivraison}
              onChange={(e) => setDateLivraison(e.target.value)}
              inputProps={{ max: new Date().toISOString().split("T")[0] }}
            />
            <TextField
              flex={3}
              type="text"
              fullWidth
              id="delai"
              label="Délai"
              variant="outlined"
              margin="normal"
              required
              autoFocus
              value={delai}
              onChange={(e) => setDelai(e.target.value)}
            />
          </Box>
          <Box>
            {UploadButton(
              { mt: 2, mb: 1, p: 1, width: "100%" },
              "Importer les numéros de série"
            )}
            {dataExcel && dataExcel.length > 0 && (
              <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
                {dataExcel.length} numéros de série importés avec succès
              </Alert>
            )}
          </Box>
        </Box>
        {errors && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {errors}
          </Alert>
        )}
      </Modal>
    </>
  );
}
