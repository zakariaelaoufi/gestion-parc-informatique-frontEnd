import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Modal from "../../../../components/Modal/Modal";

function UpdateFournisseur() {
  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={" Update un utilisateur "}
        modalActionName={"Update"}
      ></Modal>
    </>
  );
}

export default UpdateFournisseur;
