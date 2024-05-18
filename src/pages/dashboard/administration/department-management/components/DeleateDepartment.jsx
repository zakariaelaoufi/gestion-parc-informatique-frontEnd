import { Typography } from "@mui/material";
import Modal from "../../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";
import { useDeleteDepartment } from "../../../../../hooks/api/useDepartmentApi";

export default function DeleteDepartment({ data }) {
  const mutation = useDeleteDepartment();

  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer l'département "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(data?.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer l{"'"} département «{data?.department_name} »
          avec le ID « {data?.id}»
        </Typography>
      </Modal>
    </>
  );
}

DeleteDepartment.propTypes = {
  data: PropTypes.object,
};
