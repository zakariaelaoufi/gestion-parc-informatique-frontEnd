import { Alert } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import CreateUpdateForm from "./CreateUpdateForm";
import { useState } from "react";
import { useCreateMarque } from "../../../../hooks/api/useMarqueApi";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function CreateMarque() {
  const [formData, setFormData] = useState({ nomMarque: "" });
  const [errors, setErrors] = useState(null);
  const mutationCreateMarque = useCreateMarque({
    onError: () => {
      setErrors("Veuillez vérifier vos informations");
    },
  });

  const handleAction = () => {
    const obj = {
      nomMarque: formData?.nomMarque?.trim(),
    };

    if (obj.nomMarque) {
      mutationCreateMarque.mutate(obj);
      setErrors(null);
    } else {
      setErrors("Veuillez vérifier vos informations");
    }
  };

  return (
    <>
      <Modal
        btnName="Ajouter Marque"
        btnIcon={<AddRoundedIcon />}
        modalTitle="Ajouter une marque"
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
