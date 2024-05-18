import { Alert, Box, TextField, Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";
import { useCreateDecompteDefinitif } from "../../../../hooks/api/useDecompte";

export default function CreateDecompteDefinitif({ selectedRowsData,...other }) {

  const [formError, setFormError] = useState('');

  const mutation = useCreateDecompteDefinitif({
    onError: () => setFormError("Problème dans création !!!"),
  });

  const getCurrentUser = localStorage.getItem("user");


  const idList = selectedRowsData.map(e => {
    return { idPiece:e.id }
  })

  const montant = selectedRowsData.reduce((acc,e) => 
       acc+e.montant
  ,0)
 

  const handleAction = () => {
    
    const obj = {
      decomptes: idList,
      operationPiece: {
            sender: "",
            receiver: "",
            Observation: "",
            user: { id: JSON.parse(getCurrentUser)?.id },
      },
      decompteDef:{
        montant:montant
      },
    }
    if (obj.decomptes && obj.decompteDef && obj.operationPiece) {
        console.log(obj);
      mutation.mutate(obj);
      setFormError("Votre decompte créer avec succées");
      return true;
    } else {
      setFormError("Problème dans création !!!");
      return false;
    }
  };

  return (
    <>
      <Modal
        btnName={" Créer un décompte définitif"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un décompte définitif "}
        modalActionName={"Créer"}
        modalActionEvent={handleAction}
        modalFinalEvent={() => setFormError(null)}
        {...other}
      >
        <Box>
            <Typography>
                    Montant Total : {montant}
            </Typography>   
        </Box>
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
