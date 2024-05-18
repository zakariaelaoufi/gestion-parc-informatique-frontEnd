import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";
import { useDeleteMarche } from "../../../../hooks/api/useMarcheApi";

export default function DeleteMarche({ data }) {
  const mutation = useDeleteMarche();

  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer l'Marche "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(data?.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer l{"'"} Marche «{data?.marche_name} » avec le
          ID « {data?.id}»
        </Typography>
      </Modal>
    </>
  );
}

DeleteMarche.propTypes = {
  data: PropTypes.object,
};
