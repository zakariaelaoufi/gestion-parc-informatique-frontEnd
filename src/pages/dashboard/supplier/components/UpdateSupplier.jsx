import Modal from "../../../../components/Modal/Modal";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PropTypes from "prop-types";

export default function UpdateSupplier({ data }) {
  //   const queryClient = useQueryClient();

  //   const mutation = useMutation({
  //     mutationFn: deleteUser,
  //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  //   });

  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={"Update l'Supplier "}
        modalActionName={"Update"}
        // modalActionEvent={() => {
        //   mutation.mutate(data.id);
        // }}
      >
        {/* <CreateUpdateForm data={data} isUpdate={true} /> */}
        Update supplier
      </Modal>
    </>
  );
}

UpdateSupplier.propTypes = {
  data: PropTypes.object,
};
