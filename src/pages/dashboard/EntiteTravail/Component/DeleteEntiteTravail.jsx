import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import { useDeleteEntiteTravail } from "../../../../hooks/api/useEntiteTravailApi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function DeleteEntiteTravail({ data }) {
  const mutationDelete = useDeleteEntiteTravail();
  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer l'utilisateur "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutationDelete.mutate(data.idEntiteTravail);
        }}
      >
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          souhaitez-vous vraiment supprimer l'entite de travail «
          {data?.typeEntiteTravail + " " + data?.nomEntiteTravail} »
        </Typography>
      </Modal>
    </>
  );
}

export default DeleteEntiteTravail;
