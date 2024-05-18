import Modal from "../../../../components/Modal/Modal";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import React from "react";
import CreateUpdateForm from "./CreateUpdateForm";
import { useUpdateUtilisateur } from "../../../../hooks/api/useUtilisateur";
import { Alert } from "@mui/material";

function UpdateUtilisateur({ data }) {
  const [formData, setFormData] = React.useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    email: "",
    immatricule: "",
  });
  const [errors, setErrors] = React.useState(null);
  const mutationUpdateUtilisateur = useUpdateUtilisateur({
    onError: () => {
      setErrors("vérifiez vos informations");
    },
    idUtilisateur: data.idUtilisateur,
  });

  const handleAction = () => {
    const obj = {
      nomUtilisateur: formData.nomUtilisateur?.trim(),
      prenomUtilisateur: formData.prenomUtilisateur?.trim(),
      email: formData.email?.trim(),
      immatricule: formData.immatricule?.trim(),
    };

    if (
      obj.nomUtilisateur &&
      obj.prenomUtilisateur &&
      obj.email &&
      obj.immatricule
    ) {
      mutationUpdateUtilisateur.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("vérifiez vos informations");
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
        <CreateUpdateForm
          data={data}
          setFormData={setFormData}
          isUpdate={true}
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

export default UpdateUtilisateur;
