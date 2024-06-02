import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import { useDeleteInventaire } from "../../../../hooks/api/useInventaireApi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function DeleteInventaire({ data }) {
  const mutationDelete = useDeleteInventaire();
  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Mettre l'inventaire en réforme"}
        modalActionName={"mettre en réforme"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutationDelete.mutate(data?.idInventaire);
        }}
      >
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          souhaitez-vous vraiment mettre cet inventaire en réforme ?
        </Typography>
      </Modal>
    </>
  );
}
