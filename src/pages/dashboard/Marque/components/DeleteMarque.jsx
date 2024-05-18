import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDeleteMarque } from "../../../../hooks/api/useMarqueApi";

export default function DeleteMarque({ data }) {
  const deleteMutation = useDeleteMarque();
  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer la marque "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          deleteMutation.mutate(data.idMarque);
        }}
      >
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer la marque «{data?.nomMarque} ».
        </Typography>
      </Modal>
    </>
  );
}
