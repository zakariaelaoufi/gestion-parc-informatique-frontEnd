import PropTypes from "prop-types";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { UserContext } from "./UserManagementContext";
import { useContext } from "react";
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

export default function UserModel() {
  const { modalTypeData } = useContext(UserContext);

  const currentModal = () => {
    const type = modalTypeData.modalType;
    if (type.toLowerCase() === "create")
      return <CreateUpdateModal isUpdate={false} />;
    else if (type.toLowerCase() === "update")
      return <CreateUpdateModal isUpdate={true} />;
    else if (type.toLowerCase() === "delete") return <DeleteModal />;
  };

  return <ModalContainer>{currentModal()}</ModalContainer>;
}

// const style = {

// };

export function CreateUpdateModal({ isUpdate }) {
  const { modalStateData, activeUser, userRoles, createUser, updateUser } =
    useContext(UserContext);

  /********** state ***************** */

  const [userName, setUserName] = useState(
    isUpdate ? activeUser?.user_name : ""
  );
  const [userNbr, setUserNbr] = useState(isUpdate ? activeUser?.user_nbr : "");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [userRole, setUserRole] = useState(
    isUpdate ? activeUser?.user_role : []
  );
  const [showPwdSection, SetShowPwdSection] = useState(false);
  const [formError, setFormError] = useState("");

  /**********  Submit and validation ****************** */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRole.length > 0 && userPassword === userPasswordConfirm) {
      const user = {
        name: userName.trim(),
        nbr: userNbr,
        password: !isUpdate || showPwdSection ? userPassword : "",
        role: userRole,
      };
      if (isUpdate) updateUser(user);
      else createUser(user);
      modalStateData.handleClose();
    } else setFormError("vérifiez vos informations");
  };

  return (
    <Box
      sx={{ width: "42vw", minWidth: "100%", maxWidth: "620px" }}
      component="form"
      method="post"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h3">
        {isUpdate ? "Modifier l'utilisateur" : "Créer un utilisateur"}
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            margin="normal"
            required
            sx={{ flex: 3 }}
            id="user_name"
            label="Nom"
            name="userName"
            autoComplete="name"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            sx={{ flex: 2 }}
            id="user_nbr"
            label="Matricule"
            name="userNbr"
            value={userNbr}
            onChange={(e) => setUserNbr(e.target.value.trim())}
          />
        </Box>

        <FormControl sx={{ mt: 2, mb: 1, width: "100%" }}>
          <InputLabel id="user_role_label">Rôle</InputLabel>
          <Select
            labelId="user_role_label"
            id="user_role"
            multiple
            value={userRole}
            onChange={(event) => {
              const value = event.target.value;
              setUserRole(typeof value === "string" ? value.split(",") : value);
            }}
            input={<OutlinedInput label="Tag" />}
            renderValue={(_userRole) =>
              userRoles
                .filter((role) => _userRole.indexOf(role.value) > -1)
                .map((e) => e.name)
                .join(" , ")
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {userRoles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                <Checkbox checked={userRole.indexOf(role.value) > -1} />
                <ListItemText primary={role.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          {isUpdate && (
            <>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPwdSection}
                    onChange={(e) => SetShowPwdSection(e.target.checked)}
                  />
                }
                label="Changer le mot de passe"
              />
            </>
          )}
          {(!isUpdate || showPwdSection) && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="user_password"
                label="Mot de passe"
                type="password"
                id="user_password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="user_password_conform"
                label="Comfirmer le mot de passe"
                type="password"
                id="user_password_conform"
                value={userPasswordConfirm}
                onChange={(e) => setUserPasswordConfirm(e.target.value)}
                error={Boolean(
                  userPasswordConfirm && userPassword !== userPasswordConfirm
                )}
              />
            </>
          )}
        </Box>
      </Box>

      {formError.length >0 && <Alert severity="error" sx={{mt:1, mb:4}}>{formError}</Alert>}

      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
        <Button variant="text" onClick={modalStateData.handleClose} >
          Annuler
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          {isUpdate ? "Modifier" : "Créer"}
        </Button>
      </Box>
    </Box>
  );
}

export function DeleteModal() {
  const { activeUser, modalStateData, deleteUser } = useContext(UserContext);
  const handleDelete = () => {
    modalStateData.handleClose();
    deleteUser(activeUser.id);
  };
  return (
    <Box>
      <Typography variant="h5" component="h3">
        Supprimer l{"'"}utilisateur
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="p" component="p" sx={{ my: 2 }}>
        souhaitez-vous supprimer l{"'"}utilisateur « {activeUser.user_name} »
        avec le numéro « {activeUser.user_nbr} »
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
        <Button variant="text" onClick={modalStateData.handleClose}>
          Annuler
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Supprimer
        </Button>
      </Box>
    </Box>
  );
}

function ModalContainer({ children }) {
  const { modalStateData } = useContext(UserContext);

  return (
    <Modal
      open={modalStateData.modalState}
      onClose={modalStateData.handleClose}
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

CreateUpdateModal.propTypes = {
  isUpdate: PropTypes.bool,
};

ModalContainer.propTypes = {
  children: PropTypes.node,
};
