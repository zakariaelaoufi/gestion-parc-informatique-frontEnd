import { Alert } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import { useCreateCategorie } from "../../../../hooks/api/useCategorieApi";
import CreateUpdateForm from "./CreateUpdateForm";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";

export default function CreateCategorie() {
  const [formData, setFormData] = useState({
    libelle: "",
    abv: "",
  });
  const [errors, setErrors] = useState(null);

  const mutationCreateCategorie = useCreateCategorie({
    onError: () => {
      setErrors(
        "Erreur lors de la création du fournisseur. Veuillez réessayer."
      );
    },
  });

  const handleAction = () => {
    const obj = {
      libelle: formData.libelle.trim(),
      abv: formData.abv.trim(),
    };
    if (obj.libelle && obj.abv) {
      mutationCreateCategorie.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("vérifiez vos informations");
      return false;
    }
  };
  return (
    <Modal
      btnName="Ajouter Categorie"
      btnIcon={<AddRoundedIcon />}
      modalTitle="Ajouter une categorie"
      modalActionName="Créer"
      modalActionEvent={handleAction}
      modalFinalEvent={() => setErrors(null)}
    >
      <CreateUpdateForm setFormData={setFormData} />
      {errors && (
        <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
          {errors}
        </Alert>
      )}
    </Modal>
  );
}
