import { Alert } from "@mui/material";
import Modal from "../../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { useState } from "react";
import { useCreateUser } from "../../../../../hooks/api/useUserApi";

export default function CreateUser() {
  const [userData, setUserData] = useState(null);
  const [formError, setFormError] = useState(null);

  const mutation = useCreateUser({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const hadelAction = () => {
    if (
      userData.userRole.length > 0 &&
      userData.userPassword === userData.userPasswordConfirm
    ) {
      const u = {
        fullName: userData.userName.trim(),
        userNumber: userData.userNbr,
        departement: { id: userData.userDepartment.toString() },
        password: userData.userPassword,
        role: userData.userRole,
      };
      console.log(u);
      mutation.mutate(u);

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
        btnName={" Créer un utilisateur"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un utilisateur "}
        modalActionName={"Créer"}
        modalActionEvent={hadelAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateUpdateForm setUserData={setUserData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
