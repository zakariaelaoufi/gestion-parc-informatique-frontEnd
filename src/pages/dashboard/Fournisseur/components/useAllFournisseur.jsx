import UpdateFournisseur from "./UpdateFournisseur";
import DeleteFournisseur from "./DeleteFournisseur";
import { useGetAllFournisseur } from "../../../../hooks/api/useFournisseurApi";
import { Typography } from "@mui/material";

const createData = (
  id,
  idFournisseur,
  nomFournisseur,
  ice,
  tel,
  fax,
  adresse,
  email,
  deleted
) => {
  return {
    id,
    idFournisseur,
    nomFournisseur,
    ice,
    tel,
    fax,
    adresse,
    email,
    deleted,
  };
};

function useAllFournisseur() {
  const rowsData = useGetAllFournisseur().data?.map((e, index) =>
    createData(
      index,
      e.idFournisseur,
      e.nomFournisseur,
      e.ice,
      e.tel,
      e.fax,
      e.adresse,
      e.email,
      e.deleted
    )
  );
  const columns = [
    { field: "ice", headerName: "ICE", width: 180 },
    {
      field: "nomFournisseur",
      headerName: "Nom Fournisseur",
      width: 180,
      flex: 1.2,
    },
    { field: "tel", headerName: "Tel", width: 180 },
    { field: "fax", headerName: "Fax", width: 180 },
    { field: "adresse", headerName: "Adresse", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "deleted",
      headerName: "Status",
      width: 180,
      renderCell: (params) =>
        params.value ? (
          <Typography color="red">⛔ Supprimé</Typography>
        ) : (
          <Typography color="green">✅ Actif</Typography>
        ),
    },
    {
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          !params.row.deleted && (
            <>
              <UpdateFournisseur data={params.row} />
              <DeleteFournisseur data={params.row} />
            </>
          )
        );
      },
    },
  ];

  return { rowsData, columns };
}

export default useAllFournisseur;
