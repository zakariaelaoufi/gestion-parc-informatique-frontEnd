import { useState } from "react";
import { useUpdateInventaire } from "../../../../hooks/api/useInventaireApi";
import Modal from "../../../../components/Modal/Modal";
import UpdateForm from "./UpdateForm";
import { Alert } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function UpdateEtatIventaire({ data }) {
  const [formData, setFormData] = useState({
    etat: "",
  });
  const [errors, setErrors] = useState(null);

  const mutationUpdateEtatIventaire = useUpdateInventaire({
    onError: () => {
      setErrors(
        "Erreur lors de la changement d'état d'inventaire. Veuillez réessayer."
      );
    },
    idInventaire: data?.idInventaire,
  });

  const handleAction = () => {
    const obj = {
      idProduit: data?.idProduit,
      idInventaire: data?.idInventaire,
      etat: formData.etat,
      numeroSerie: data?.numeroSerie,
    };
    if (obj.etat) {
      mutationUpdateEtatIventaire.mutate(obj);
      console.log("obj", obj);
      setErrors(null);
      return true;
    } else {
      setErrors("Veuillez selectionner une etat");
      return false;
    }
  };

  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={" Update un utilisateur "}
        modalActionName={"Update"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setErrors(null)}
      >
        <UpdateForm data={data} setFormData={setFormData} isUpdate={true} />
        {errors && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {errors}
          </Alert>
        )}
      </Modal>
    </>
  );
}
