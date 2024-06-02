import Modal from "../../../../components/Modal/Modal";
import CreateUpdateForm from "./CreateUpdateForm";
import { Alert } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import { useUpdateEntiteTravail } from "../../../../hooks/api/useEntiteTravailApi";

export default function UpdateEntiteTravail({ data }) {
  const [formData, setFormData] = useState({
    nomEntiteTravail: data?.nomEntiteTravail,
  });
  const [errors, setErrors] = useState(null);

  const mutateUpdate = useUpdateEntiteTravail({
    onError: () => setErrors("Veuillez verifier vos informations"),
    idEntiteTravail: data?.idEntiteTravail,
  });

  const handleAction = () => {
    const obj = {
      nomEntiteTravail: formData?.nomEntiteTravail?.trim(),
      typeEntiteTravail: data?.typeEntiteTravail,
      parent: {
        idEntiteTravail: data?.ParentId,
      },
    };
    setErrors(null);
    if (obj.nomEntiteTravail && obj.typeEntiteTravail) {
      mutateUpdate.mutate(obj);
      setErrors(null);
      return true;
    } else {
      setErrors("Veuillez verifier vos informations");
      return false;
    }
  };

  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={" Update une entité de travail "}
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
