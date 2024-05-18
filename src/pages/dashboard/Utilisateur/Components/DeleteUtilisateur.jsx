import Modal from "../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Typography } from "@mui/material";
import { useDeleteUtilisateur } from "../../../../hooks/api/useUtilisateur";

function DeleteUtilisateur({ data }) {
  const mutationDelete = useDeleteUtilisateur();
  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer l'utilisateur "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutationDelete.mutate(data.idUtilisateur);
        }}
      >
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer l{"'"}utilisateur «
          {data?.nomUtilisateur + " " + data?.prenomUtilisateur} » avec
          l'immatricule "{data?.immatricule}"
        </Typography>
      </Modal>
    </>
  );
}

export default DeleteUtilisateur;
