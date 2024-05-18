import { useGetAllDepartment } from "../../../../../hooks/api/useDepartmentApi";
import UpdateDepartment from "./UpdateDepartment";
import DeleteDepartment from "./DeleateDepartment";

const createData = (id, department_name) => {
  return { id, department_name };
};

export default function useAllDepartment() {
  const allDepartment = useGetAllDepartment();
  const departmentData = allDepartment?.data?.map((e) =>
    createData(
      e.id,
      e.nameDepartement,
    )
  );

  const columns = [
    // { field: "id", headerName: "ID", width: 180 },
    { field: "department_name", headerName: "Département", width: 180 },
    {
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <UpdateDepartment data={params.row} />
            <DeleteDepartment data={params.row} />
          </>
        );
      },
    },
  ];
  return { departmentData, columns };
}
