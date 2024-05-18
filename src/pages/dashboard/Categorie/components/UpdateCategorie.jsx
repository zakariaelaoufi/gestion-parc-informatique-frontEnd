import { useState } from "react";
import { useUpdateCategorie } from "../../../../hooks/api/useCategorieApi";
import CreateUpdateForm from "./CreateUpdateForm";
import Modal from "../../../../components/Modal/Modal";
import { Alert } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function UpdateCategorie({ data }) {
  const [formData, setFormData] = useState({
    libelle: "",
    abv: "",
  });
  const [errors, setErrors] = useState(null);

  const mutationUpdateCategorie = useUpdateCategorie({
    onError: () => {
      setErrors(
        "Erreur lors de la création du fournisseur. Veuillez réessayer."
      );
    },
    idCategorie: data.idCategorie,
  });

  const handleAction = () => {
    const obj = {
      libelle: formData.libelle.trim(),
      abv: formData.abv.trim(),
    };
    console.log(obj);
    if (obj.libelle && obj.abv) {
      mutationUpdateCategorie.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("vérifiez vos informations");
      return false;
    }
  };
  return (
    <Modal
      btnIcon={<EditRoundedIcon />}
      modalTitle="Update une categorie"
      modalActionName="Créer"
      modalActionEvent={handleAction}
      modalFinalEvent={() => setErrors(null)}
    >
      <CreateUpdateForm isUpdate={true} data={data} setFormData={setFormData} />
      {errors && (
        <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
          {errors}
        </Alert>
      )}
    </Modal>
  );
}
