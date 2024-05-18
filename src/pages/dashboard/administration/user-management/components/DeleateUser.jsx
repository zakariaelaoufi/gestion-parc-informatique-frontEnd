import { Typography } from "@mui/material";
import Modal from "../../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";
import { useDeleteUser } from "../../../../../hooks/api/useUserApi";

export default function DeleteUser({ data }) {
  const mutation = useDeleteUser();

  // const mutation = useMutation({
  //   mutationFn: deleteUser,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  // });

  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer l'utilisateur "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(data.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer l{"'"}utilisateur «{data?.user_name} » avec
          le numéro « {data?.user_nbr}»
        </Typography>
      </Modal>
    </>
  );
}

DeleteUser.propTypes = {
  data: PropTypes.object,
};
