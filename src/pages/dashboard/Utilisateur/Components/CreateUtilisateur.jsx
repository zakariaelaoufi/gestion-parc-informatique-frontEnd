import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useCreateUtilisateur } from "../../../../hooks/api/useUtilisateur";
import React from "react";
import { Alert } from "@mui/material";
import CreateUpdateForm from "./CreateUpdateForm";
function CreateUtilisateur() {
  const [formData, setFormData] = React.useState({
    nomUtilisateur: "",
    prenomUtilisateur: "",
    email: "",
    immatricule: "",
    entiteTravail: "",
    dateDebut: "",
  });
  const [errors, setErrors] = React.useState(null);

  const mutationCreateUtilisateur = useCreateUtilisateur({
    onError: () => {
      setErrors("vérifiez vos informations");
    },
  });

  const handleAction = () => {
    const obj = {
      utilisateur: {
        nomUtilisateur: formData.nomUtilisateur?.trim(),
        prenomUtilisateur: formData.prenomUtilisateur?.trim(),
        email: formData.email?.trim(),
        immatricule: formData.immatricule?.trim(),
      },
      entiteTravail: {
        idEntiteTravail: formData.entiteTravail,
      },
      dateDebut: formData.dateDebut,
    };
    console.log(obj);
    if (
      formData.nomUtilisateur &&
      formData.prenomUtilisateur &&
      formData.email &&
      formData.immatricule &&
      formData.entiteTravail &&
      formData.dateDebut
    ) {
      console.log("ddd", obj);
      mutationCreateUtilisateur.mutate(obj);
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
        btnName={" Créer un utilisateur"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un utilisateur "}
        modalActionName={"Créer"}
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

export default CreateUtilisateur;
