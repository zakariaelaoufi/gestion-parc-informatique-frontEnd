import { useState } from "react";
import { useCreateFournisseur } from "../../../../hooks/api/useFournisseurApi";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "../../../../components/Modal/Modal";
import { Alert } from "@mui/material";
import CreateUpdateForm from "./CreateUpdateForm";

function CreateFournisseur() {
  const [formData, setFormData] = useState({
    nomFournisseur: "",
    adresse: "",
    ice: "",
    tel: "",
    fax: "",
    email: "",
  });
  const [errors, setErrors] = useState(null);
  const mutationCreate = useCreateFournisseur({
    onError: () => {
      setErrors(
        "Erreur lors de la création du fournisseur. Veuillez réessayer."
      );
    },
  });

  const handleAction = () => {
    const obj = {
      nomFournisseur: formData.nomFournisseur.trim(),
      adresse: formData.adresse.trim(),
      ice: formData.ice.trim(),
      tel: formData.tel.trim(),
      fax: formData.fax.trim(),
      email: formData.email.trim(),
    };
    if (!validateForm(obj)) {
      setErrors("Veuillez remplir tous les champs correctement.");
      return false;
    }
    mutationCreate.mutate(obj);
    setErrors(null);
    return true;
  };

  const validateForm = (data) => {
    return (
      data.nomFournisseur &&
      data.adresse &&
      data.ice &&
      data.tel &&
      data.fax &&
      data.email &&
      isValidEmail(data.email)
    );
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Modal
        btnName="Créer un Fournisseur"
        btnIcon={<AddRoundedIcon />}
        modalTitle="Créer un Fournisseur"
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
    </>
  );
}

export default CreateFournisseur;
