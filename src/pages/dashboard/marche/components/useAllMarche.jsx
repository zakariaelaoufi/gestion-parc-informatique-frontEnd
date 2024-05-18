// import UpdateMarche from "./UpdateMarche";
// import DeleteMarche from "./DeleateMarche";
import { useEffect } from "react";
import Drawer from "../../../../components/Drawer/Drawer";
import { useGetAllMarche } from "../../../../hooks/api/useMarcheApi";
import DetailMarche from "./DetailMarche";

const createData = (
  id,
  numberMarche,
  montant,
  libelle,
  date_notif,
  fournisseur_id,
  fournisseur_fullName,
  departement_id,
  departement_nameDepartement
) => {
  return {
    id,
    numberMarche,
    montant,
    libelle,
    date_notif,
    fournisseur_id,
    fournisseur_fullName,
    departement_id,
    departement_nameDepartement,
  };
};

export default function useAllMarche() {
  let allMarche = useGetAllMarche();
  let marcheData = allMarche?.data?.map((e) =>
    createData(
      e.id,
      e.numberMarche,
      e.montant,
      e.libelle,
      e.date_notif,
      e?.fournisseur?.id,
      e?.fournisseur?.name,
      e?.departement?.id,
      e?.departement?.nameDepartement
    )
  );
  if (allMarche.isError) {
    marcheData = [];
  }
  // useEffect(() => {

  // }, [allMarche.isError, marcheData]);

  const columns = [
    // { field: "id", headerName: "ID", width: 10 },
    {
      field: "numberMarche",
      headerName: "Numéro °",
      width: 180,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Drawer btnName={params.formattedValue} title="Details marche">
            <DetailMarche id={params.id} />
          </Drawer>
        );
      },
    },
    {
      field: "libelle",
      headerName: "libelle",
      width: 180,
      flex: 2,
    },
    {
      field: "montant",
      headerName: "montant",
      width: 80,
      // renderCell: (params) => `${params.formattedValue} Dhs`
      valueGetter: (params) => `${params.row.montant} dhs`,
    },
    { field: "date_notif", headerName: "Date notification", width: 80 },
    {
      field: "fournisseur_fullName",
      headerName: "Fournisseur",
      width: 180,
      flex: 1.5,
    },
    {
      field: "departement_nameDepartement",
      headerName: "Departement",
      width: 80,
    },
  ];
  return { marcheData, columns };
}
