import { useContext } from "react";
import { AttachmentContext } from "./AttachmentContext";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

import {
  Alert,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

import { CreateAttachmentForm } from "./CreateAttachmentForm";

export default function AttachmentModel() {
  const { modalTypeData, modalStateData } = useContext(AttachmentContext);

  const currentModal = () => {
    const type = modalTypeData.modalType;
    if (type.toLowerCase() === "create")
      return <CreateAttachmentForm isUpdate={false} />;
    else if (type.toLowerCase() === "update")
      return <CreateAttachmentForm isUpdate={true} />;
    // else if (type.toLowerCase() === "delete") return <DeleteModal />;
  };

  return (
    <ModalContainer
      state={modalStateData.modalState}
      close={modalStateData.handleClose}
    >
      {currentModal()}
    </ModalContainer>
  );
}

// export function DeleteModal() {
//   const { activeUser, modalStateData, deleteUser } = useContext(AttachmentContext);
//   const handleDelete = () => {
//     modalStateData.handleClose();
//     deleteUser(activeUser.id);
//   };
//   return (
//     <Box>
//       <Typography variant="h5" component="h3">
//         Supprimer l{"'"}utilisateur
//       </Typography>
//       <Divider sx={{ my: 3 }} />
//       <Typography variant="p" component="p" sx={{ my: 2 }}>
//         souhaitez-vous supprimer l{"'"}utilisateur « {activeUser.user_name} »
//         avec le numéro « {activeUser.user_nbr} »
//       </Typography>
//       <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
//         <Button variant="text" onClick={modalStateData.handleClose}>
//           Annuler
//         </Button>
//         <Button variant="contained" color="error" onClick={handleDelete}>
//           Supprimer
//         </Button>
//       </Box>
//     </Box>
//   );
// }

export function ModalContainer({ children, state, close }) {
  return (
    <Modal
      open={Boolean(state)}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "400px",
          bgcolor: "background.paper",
          border: "1px solid #24242455",
          borderRadius: 8,
          boxShadow: "0px 1px 5px #24242433 ",
          px: 4,
          py: 6,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}

// ModalContainer.propTypes = {
//   children: PropTypes.node,
// };


