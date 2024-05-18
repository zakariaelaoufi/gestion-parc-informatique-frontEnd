import DeleteEntiteTravail from "./DeleteEntiteTravail";
import { useGetAllEntiteTravail } from "../../../../hooks/api/useEntiteTravailApi";
import EntiteDetail from "./EntiteDetail";
import Drawer from "../../../../components/Drawer/Drawer";

const createData = (
  id,
  idEntiteTravail,
  nomEntiteTravail,
  typeEntiteTravail,
  ParentId,
  nomParent = ""
) => {
  return {
    id,
    idEntiteTravail,
    nomEntiteTravail,
    typeEntiteTravail,
    ParentId,
    nomParent,
  };
};

function useAllEntiteTravail() {
  const rowsData = useGetAllEntiteTravail().data?.map((e, index) =>
    createData(
      (e.id = index),
      e.idEntiteTravail,
      e.nomEntiteTravail,
      e.typeEntiteTravail,
      e.parent?.idEntiteTravail,
      e.parent?.idEntiteTravail == undefined
        ? ""
        : e.parent?.typeEntiteTravail.toLowerCase() +
            " " +
            e.parent?.nomEntiteTravail
    )
  );
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
      field: "action",
      headerName: "",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <DeleteEntiteTravail data={params.row} />
          </>
        );
      },
    },
  ];
  return {
    rowsData,
    columns,
  };
}

export default useAllEntiteTravail;
