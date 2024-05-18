import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";
import { useDeleteSupplier } from "../../../../hooks/api/useSupplierApi";

export default function DeleteSupplier({ data }) {
  const mutation = useDeleteSupplier();

  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer l'Supplier "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(data?.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer l{"'"} Supplier «{data?.supplier_name} » avec
          le ID « {data?.id}»
        </Typography>
      </Modal>
    </>
  );
}

DeleteSupplier.propTypes = {
  data: PropTypes.object,
};
