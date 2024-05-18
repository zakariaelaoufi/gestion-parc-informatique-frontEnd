import { Alert } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { useState } from "react";
import { useCreateSupplier } from "../../../../hooks/api/useSupplierApi";

export default function CreateSupplier() {
  const [supplierData, setSupplierData] = useState(null);
  const [formError, setFormError] = useState(null);

  const mutation = useCreateSupplier({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const handleAction = () => {
    const obj = {
      name: supplierData.supplierName.trim(),
      description: supplierData.supplierDescription.trim(),
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
        btnName={" Créer un Supplier"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un Supplier "}
        modalActionName={"Créer"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateUpdateForm setSupplierData={setSupplierData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
