import { Alert } from "@mui/material";
import Modal from "../../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUpdateForm } from "./CreateUpdateForm";
import {  useState } from "react";
import { useCreateDepartment } from "../../../../../hooks/api/useDepartmentApi";

export default function CreateDepartment() {
  const [departmentData, setDepartmentData] = useState(null);
  const [formError, setFormError] = useState(null);

  const mutation = useCreateDepartment({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const hadelAction = () => {
    console.log( departmentData.departmentName.trim());
    if (departmentData.departmentName.length > 0) {
      mutation.mutate({
        nameDepartement: departmentData.departmentName.trim(),
      });

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
        btnName={" Créer un Department"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un Department "}
        modalActionName={"Créer"}
        modalActionEvent={hadelAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateUpdateForm setDepartmentData={setDepartmentData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
