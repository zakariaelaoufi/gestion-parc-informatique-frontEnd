import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";
import { useDeleteArticle } from "../../../../hooks/api/useArticleApi";

export default function DeleteArticle({ data }) {
  const mutation = useDeleteArticle();

  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer l'Article "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(data?.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer l{"'"} Article «{data?.article_name} »
          avec le ID « {data?.id}»
        </Typography>
      </Modal>
    </>
  );
}

DeleteArticle.propTypes = {
  data: PropTypes.object,
};
