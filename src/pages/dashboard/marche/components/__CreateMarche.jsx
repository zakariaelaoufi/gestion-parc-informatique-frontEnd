import { Alert } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUpdateForm } from "./__CreateUpdateForm";
import { useState } from "react";
import { useCreateMarche } from "../../../../hooks/api/useMarcheApi";

export default function CreateMarche() {
  const [marcheData, setMarcheData] = useState(null);
  const [formError, setFormError] = useState(null);

  const mutation = useCreateMarche({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const handleAction = () => {
    const obj = {
      name: marcheData.marcheName.trim(),
      description: marcheData.marcheDescription.trim(),
    };
    if (obj.name && obj.description) {
      mutation.mutate(obj);
      setFormError(null);
      return true;
    } else {
      setFormError("vérifiez vos informations");
      return false;
    }
  };

  return (
    <>
      <Modal
        btnName={" Créer un Marche"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un Marche "}
        modalActionName={"Créer"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateUpdateForm setMarcheData={setMarcheData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
