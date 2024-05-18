import Drawer from "../../../../components/Drawer/Drawer";
import { useGetAllMarque } from "../../../../hooks/api/useMarqueApi";
import DeleteMarque from "./DeleteMarque";
import DetailMarque from "./DetailMarque";
import UpdateMarque from "./UpdateMarque";

export default function useAllMarque() {
  const rows = useGetAllMarque().data?.map((e, index) => ({
    id: index,
    ...e,
  }));

  const columns = [
    {
      field: "nomMarque",
      headerName: "Nom Marque",
      width: 180,
      renderCell: (params) => {
        return (
          <Drawer
            width="60%"
            btnName={params.formattedValue}
            title="Details Marque"
          >
            <DetailMarque idMarque={params.row.idMarque} />
          </Drawer>
        );
      },
    },
    {
      field: "dateCreation",
      headerName: "Date de Creation",
      width: 180,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <UpdateMarque data={params.row} />
            <DeleteMarque data={params.row} />
          </>
        );
      },
    },
  ];
  return { rows, columns };
}
