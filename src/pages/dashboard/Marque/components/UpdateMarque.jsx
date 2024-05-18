import { useState } from "react";
import { useUpdateMarque } from "../../../../hooks/api/useMarqueApi";
import Modal from "../../../../components/Modal/Modal";
import CreateUpdateForm from "./CreateUpdateForm";
import { Alert } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function UpdateMarque({ data }) {
  const [formData, setFormData] = useState({ nomMarque: "" });
  const [errors, setErrors] = useState(null);
  const mutationUpdateMarque = useUpdateMarque({
    onError: () => {
      setErrors("Veuillez vérifier vos informations");
    },

    idMarque: data.idMarque,
  });

  const handleAction = () => {
    const obj = {
      nomMarque: formData?.nomMarque?.trim(),
    };

    if (obj.nomMarque) {
      mutationUpdateMarque.mutate(obj);
      setErrors(null);
    } else {
      setErrors("Veuillez vérifier vos informations");
    }
  };

  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle="Ajouter une marque"
        modalActionName="Créer"
        modalActionEvent={handleAction}
        modalFinalEvent={() => setErrors(null)}
      >
        <CreateUpdateForm
          isUpdate={true}
          data={data}
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
