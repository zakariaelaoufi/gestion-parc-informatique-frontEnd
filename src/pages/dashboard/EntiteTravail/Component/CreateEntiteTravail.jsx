import React from "react";
import CreateUpdateForm from "./CreateUpdateForm";
import { Alert } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useCreateEntiteTravail } from "../../../../hooks/api/useEntiteTravailApi";

function CreateEntiteTravail() {
  const [formData, setFormData] = React.useState({
    nomEntiteTravail: "",
    typeEntiteTravail: "",
    entiteTravail: "",
  });

  const [formError, setFormError] = React.useState(null);

  const mutationCreateEntiteTravail = useCreateEntiteTravail({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const handleAction = () => {
    const obj = {
      nomEntiteTravail: formData?.nomEntiteTravail?.trim(),
      typeEntiteTravail: formData?.typeEntiteTravail?.trim(),
      parent: {
        idEntiteTravail: formData?.entiteTravail,
      },
    };

    if (obj.nomEntiteTravail && obj.typeEntiteTravail) {
      console.log(obj);
      mutationCreateEntiteTravail.mutate(obj);
      setFormError(null);
      return true;
    } else {
      setFormError("Veuillez vérifier vos informations.");
      return false;
    }
  };

  return (
    <>
      <Modal
        btnName={" Ajouter une entité de travail"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Ajouter une entité de travail"}
        modalActionName={"Ajouter"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateUpdateForm setFormData={setFormData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}

export default CreateEntiteTravail;
