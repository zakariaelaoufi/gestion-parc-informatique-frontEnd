import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleateUser";
import { user_role as roles } from "../../../../../global";
import { useGetAllUser } from "../../../../../hooks/api/useUserApi";

const createData = (id, user_name, user_nbr, user_role, user_department) => {
  return { id, user_name, user_nbr, user_role, user_department };
};

export default function useAllUser() {
  const allUsers = useGetAllUser();
  console.log(allUsers?.data);
  const userData = allUsers?.data?.map((e) =>
    createData(
      e.id,
      e.fullName,
      e.userNumber,
      e.role,
      e.departement?.nameDepartement
    )
  );

  const columns = [
    {
      field: "user_name",
      headerName: "Nom",
      width: 180,
      flex: 1.5,
    },
    { field: "user_nbr", headerName: "Matrécule", width: 180 },
    {
      field: "user_role",
      headerName: "Roles",
      width: 180,
      flex: 2,
      renderCell: (params) =>
        params.row.user_role.map((e) => roles[e]).join(", "),
    },
    { field: "user_department", headerName: "Departement", width: 180 },
    {
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <UpdateUser data={params.row} />
            <DeleteUser data={params.row} />
          </>
        );
      },
    },
  ];
  return { userData, columns };
}
