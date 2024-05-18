import Drawer from "../../../../components/Drawer/Drawer";
import { useGetAllCategorie } from "../../../../hooks/api/useCategorieApi";
import DeleteCategorie from "./DeleteCategorie";
import DetailCategorie from "./DetailCategorie";
import UpdateCategorie from "./UpdateCategorie";

export default function useAllCategorie() {
  const rows = useGetAllCategorie().data?.map((e, index) => ({
    id: index,
    ...e,
  }));

  const columns = [
    {
      field: "libelle",
      headerName: "Libelle",
      width: 180,
      renderCell: (params) => {
        return (
          <Drawer
            width="60%"
            btnName={params.formattedValue}
            title="Details Categorie"
          >
            <DetailCategorie idCategorie={params.row.idCategorie} />
          </Drawer>
        );
      },
    },
    {
      field: "abv",
      headerName: "Abréviation",
      width: 180,
    },
    {
      field: "dateCreation",
      headerName: "Date Creation",
      width: 180,
    },
    {
      field: "Action",
      headerName: "",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <UpdateCategorie data={params.row} />
            <DeleteCategorie data={params.row} />
          </>
        );
      },
    },
  ];
  return { rows, columns };
}
