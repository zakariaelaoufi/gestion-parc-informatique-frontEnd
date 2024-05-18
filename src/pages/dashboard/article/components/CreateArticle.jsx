import { Alert } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { useState } from "react";
import { useCreateArticle } from "../../../../hooks/api/useArticleApi";

export default function CreateArticle({ ...other }) {
  const [articleData, setArticleData] = useState(null);
  const [formError, setFormError] = useState(null);

  const mutation = useCreateArticle({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const handleAction = () => {
    const obj = {
      name: articleData.articleName.trim(),
      unity: articleData.articleUnity.trim(),
      description: articleData.articleDescription.trim(),
    }
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
        btnName={" Créer un Article"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un Article "}
        modalActionName={"Créer"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setFormError(null)}
        {...other}
      >
        <CreateUpdateForm setArticleData={setArticleData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
