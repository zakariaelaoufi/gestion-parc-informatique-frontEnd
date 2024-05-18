import { useDeleteCategorie } from "../../../../hooks/api/useCategorieApi";
import Modal from "../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Typography } from "@mui/material";

export default function DeleteCategorie({ data }) {
  const deleteMutation = useDeleteCategorie();
  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer le Categorie "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          deleteMutation.mutate(data.idCategorie);
        }}
      >
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer le categorie «{data?.libelle} » avec
          l'abreviation "{data?.abv}"
        </Typography>
      </Modal>
    </>
  );
}
