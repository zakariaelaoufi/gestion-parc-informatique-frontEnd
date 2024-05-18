import { useSelector } from "react-redux";
import { useCreateOperationAttachment } from "../../../../hooks/api/useAttachmentApi";
import Permission from "../../../../components/Utils/permission";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { operationAttachement, user_role } from "../../../../global";
import Modal from "../../../../components/Modal/Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateDecompte } from "../../../../hooks/api/useDecompte";

export default function ActionOperation({
  idAttachment,
  state = null,
  total = null,
}) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <OperationBtnModal
        {...{ idAttachment, state }}
        permission={[user_role.BO]}
        operationState={operationAttachement.BO_RETURN_FOUR}
        btnName="Retourner Fournisseur "
        btnVar="outlined"
        btnColor="error"
      />
      <OperationBtnModal
        {...{ idAttachment, state , total : 0 }}
        permission={[user_role.BO]}
        operationState={operationAttachement.Send_DEP}
        btnName=" Envoyer departement"
        btnVar="contained"
        btnColor="secondary"
      />

      <OperationBtnModal
        {...{ idAttachment, state  }}
        permission={[user_role.DEPARTMENT]}
        operationState={operationAttachement.Return_BO}
        btnName="  Retourner B.O"
        btnVar="outlined"
        btnColor="error"
      />

      <OperationBtnModal
        {...{ idAttachment, state, total }}
        permission={[user_role.DEPARTMENT]}
        operationState={operationAttachement.Valid_DEP}
        btnName="Valider l'attachement"
        modalActionName=" Valider l'attachement et créer decompte"
        btnVar="contained"
        btnColor="success"

        // disabled={operationAttachement.BO_RETURN_FOUR === state}
      />
    </Box>
  );
}

function OperationBtnModal(props) {
  const {
    idAttachment,
    state,
    total = null,
    operationState,
    permission = null,
    msg = "",
    btnName = "",
    modalActionName = "",
    btnVar = "",
    btnColor = "",
    modalTitle = "",
    disabled = false,

    ...other
  } = props;
  const mutation = useCreateOperationAttachment({ id: idAttachment });
  const mutationDecompte = useCreateDecompte();

  const user = useSelector((state) => state.authentication.user);

  const [show, setShow] = useState(false);
  const [observation, setObservation] = useState("");
  const handleOperation = () => {
    const operation = {
      state: operationState,
      sender: " ",
      receiver: " ",
      observation: observation || "",
      user: {
        id: user.id,
      },
    };
    // console.log(operation);
    mutation.mutate(operation);
    if (operationState === operationAttachement.Valid_DEP) {
      const dec = {
        attachementList: [
          {
            id: idAttachment,
          },
        ],
        decompte: {
          montant: total || "",
        },
        operationPiece: {
          sender: "",
          receiver: "",
          observation: "",
          user: {
            id: user.id,
          },
        },
      };
      console.log(dec);
      const res = mutationDecompte.mutate(dec);
      console.log(res);
    }

    setObservation("");

    return true;
  };
  return (
    <>
      <Permission {...{ permission }}>
        <Modal
          {...{
            btnName,
            btnVar,
            btnColor,
            modalActionName,
            btnActionColor: btnColor,
            modalTitle: modalTitle || "Operation sur l'attachement",
          }}
          // btnName=" Retourner Fournisseur"
          // btnVar="outlined"
          // btnColor="error"
          // modalTitle="Operation sur l'attachement"
          // modalActionName=" Retourner Fournisseur"
          modalActionEvent={handleOperation}
          disabled={disabled || operationAttachement[state] === operationState}
          {...other}
        >
          <b>{msg || "Voulez-vous faire cette opération?"}</b>
          <Box sx={{ py: 2.5 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={show} onChange={() => setShow(!show)} />
                }
                label="Ajouter une observation"
              />
            </FormGroup>

            {show && (
              <TextField
                sx={{ mt: 1.5 }}
                label="Observation"
                fullWidth
                multiline
                rows={2}
                value={observation}
                onChange={(e) => {
                  setObservation(e.target.value);
                }}
              />
            )}
          </Box>
        </Modal>
      </Permission>
    </>
  );
}
