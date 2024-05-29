import DeleteEntiteTravail from "./DeleteEntiteTravail";
import { useGetAllEntiteTravail } from "../../../../hooks/api/useEntiteTravailApi";
import EntiteDetail from "./EntiteDetail";
import Drawer from "../../../../components/Drawer/Drawer";
import { Typography } from "@mui/material";

// const createData = (
//   id,
//   idEntiteTravail,
//   nomEntiteTravail,
//   typeEntiteTravail,
//   ParentId,
//   nomParent = "",
//   status
// ) => {
//   return {
//     id,
//     idEntiteTravail,
//     nomEntiteTravail,
//     typeEntiteTravail,
//     ParentId,
//     nomParent,
//     status,
//   };
// };

function useAllEntiteTravail() {
  const rowsData = useGetAllEntiteTravail().data?.map((e, index) => ({
    id: (e.id = index),
    idEntiteTravail: e.idEntiteTravail,
    nomEntiteTravail: e.nomEntiteTravail,
    typeEntiteTravail: e.typeEntiteTravail,
    ParentId: e.parent?.idEntiteTravail,
    nomParent:
      e.parent?.idEntiteTravail == undefined
        ? ""
        : e.parent?.typeEntiteTravail.toLowerCase() +
          " " +
          e.parent?.nomEntiteTravail,
    status: e.deleted == true ? "Hors service" : "En Service",
  }));

  const sortedRowsData = rowsData?.sort((a, b) => {
    if (a.status === "En Service" && b.status !== "En Service") {
      return -1;
    }
    if (a.status !== "En Service" && b.status === "En Service") {
      return 1;
    }
    return 0;
  });

  const columns = [
    {
      field: "nomEntiteTravail",
      headerName: "Nom",
      width: 180,
      renderCell: (params) => (
        <Drawer
          width="60%"
          btnName={params.formattedValue}
          title="Details produit"
        >
          <EntiteDetail idEntiteTravail={params.row.idEntiteTravail} />
        </Drawer>
      ),
    },
    { field: "typeEntiteTravail", headerName: "Type", width: 180 },
    { field: "nomParent", headerName: "Appartient au", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        return (
          <Typography
            color={params.row.status === "En Service" ? "green" : "red"}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return (
          params.row.status === "En Service" && (
            <>
              <DeleteEntiteTravail data={params.row} />
            </>
          )
        );
      },
    },
  ];
  return {
    rowsData: sortedRowsData,
    columns,
  };
}

export default useAllEntiteTravail;
