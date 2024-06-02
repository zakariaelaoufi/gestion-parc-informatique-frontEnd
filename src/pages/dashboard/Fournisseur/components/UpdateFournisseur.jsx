import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Modal from "../../../../components/Modal/Modal";
import CreateUpdateForm from "./CreateUpdateForm";
import { useState } from "react";
import { useUpdateFournisseur } from "../../../../hooks/api/useFournisseurApi";
import { Alert } from "@mui/material";

function UpdateFournisseur({ data }) {
  const [formData, setFormData] = useState({
    nomFournisseur: "",
    adresse: "",
    ice: "",
    tel: "",
    fax: "",
    email: "",
  });
  const [errors, setErrors] = useState(null);

  const mutateUpdate = useUpdateFournisseur({
    onError: () => {
      setErrors("Veuillez verifier vos informations");
    },
    idFournisseur: data.idFournisseur,
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
    mutateUpdate.mutate(obj);
    setErrors(null);
    return true;
  };

  const validateForm = (data) => {
    return (
      formData.nomFournisseur &&
      formData.adresse &&
      formData.ice &&
      formData.tel &&
      formData.fax &&
      formData.email &&
      isValidEmail(formData.email)
    );
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={" Update un fournisseur"}
        modalActionName={"Update"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setErrors(null)}
      >
        <CreateUpdateForm
          data={data}
          isUpdate={true}
          setFormData={setFormData}
        />
        {errors && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {errors}
          </Alert>
        )}
      </Modal>
    </>
  );
}

export default UpdateFournisseur;
