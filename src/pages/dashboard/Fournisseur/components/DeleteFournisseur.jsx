import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDeleteFournisseur } from "../../../../hooks/api/useFournisseurApi";
import Modal from "../../../../components/Modal/Modal";
import { Typography } from "@mui/material";

function DeleteFournisseur({ data }) {
  const mutationDelete = useDeleteFournisseur();
  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer le fournisseur "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutationDelete.mutate(data.idFournisseur);
        }}
      >
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          souhaitez-vous vraiment supprimer le fournisseur «{" "}
          {data?.nomFournisseur} » avec l'ICE "{data?.ice}"
        </Typography>
      </Modal>
    </>
  );
}

export default DeleteFournisseur;
