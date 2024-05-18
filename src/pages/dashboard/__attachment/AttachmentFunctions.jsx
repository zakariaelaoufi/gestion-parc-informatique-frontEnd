
import { useContext } from "react";
import { AttachmentContext } from "./AttachmentContext";
import PropTypes from "prop-types";

import { Button, IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export function CreateAttachment() {
  const { modalStateData, modalTypeData } = useContext(AttachmentContext);

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        color="secondary"
        onClick={() => {
          modalStateData.handleOpen();
          modalTypeData.handleSetModalType("create");
        }}
      >
        Créer un attachement
        {/* un utilisateur */}
      </Button>
    </div>
  );
  
}

// export function UpdateUser({ user }) {
//   const { setActiveUser, modalStateData, modalTypeData } = useContext(AttachmentContext);

//   return (
//     <div style={{ display: "inline-block" }}>
//       <IconButton
//         variant="outlined"
//         color="primary"
//         sx={{ mx: 1 }}
//         onClick={() => {
//           modalStateData.handleOpen();
//           setActiveUser(user);
//           modalTypeData.handleSetModalType("update");
//         }}
//       >
//         <EditRoundedIcon />
//       </IconButton>
//     </div>
//   );
// }
// UpdateUser.propTypes = {
//   user: PropTypes.object.isRequired,
// };


// export function DeleteUser({ user }) {
//   const { setActiveUser, modalStateData, modalTypeData } =
//     useContext(AttachmentContext);
//   return (
//     <div style={{ display: "inline-block" }}>
//       <IconButton
//         variant="contained"
//         color="error"
//         sx={{ mx: 1 }}
//         onClick={() => {
//           modalStateData.handleOpen();
//           setActiveUser(user);
//           modalTypeData.handleSetModalType("delete");
//         }}
//       >
//         <DeleteRoundedIcon />
//       </IconButton>
//     </div>
//   );
// }

// DeleteUser.propTypes = {
//   user: PropTypes.object.isRequired,
// };
