import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import useUploadDataXlsx from "../../../../hooks/utils/useUploadDataXlsx";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Alert, Box, TextField } from "@mui/material";
import { useAddMoreInventaire } from "../../../../hooks/api/useInventaireApi";

export default function AddInventaireForm({ data = [] }) {
  const { dataExcel = [], UploadButton } = useUploadDataXlsx();
  const [errors, setErrors] = useState(null);

  const mutationAddInventaire = useAddMoreInventaire({
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
      };
      console.log(obj);
      mutationAddInventaire.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("Veuillez selectionner le fichier");
      return false;
    }
  };

  return (
    <>
      <Modal
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Ajouter inventaire "}
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
