import UpdateFournisseur from "./UpdateFournisseur";
import DeleteFournisseur from "./DeleteFournisseur";
import { useGetAllFournisseur } from "../../../../hooks/api/useFournisseurApi";

const createData = (
  id,
  idFournisseur,
  nomFournisseur,
  ice,
  tel,
  fax,
  adresse,
  email
) => {
  return { id, idFournisseur, nomFournisseur, ice, tel, fax, adresse, email };
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
      e.email
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
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <UpdateFournisseur />
            <DeleteFournisseur data={params.row} />
          </>
        );
      },
    },
  ];

  return { rowsData, columns };
}

export default useAllFournisseur;
