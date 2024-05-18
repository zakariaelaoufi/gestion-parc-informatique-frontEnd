// import Barcode from "react-barcode";
import { useGetAllInventaire } from "../../../../hooks/api/useInventaireApi";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Drawer from "../../../../components/Drawer/Drawer";
import DetailInventaire from "./DetailInventaire";
// import Recuperer from "../../Demande/Recuperer";

export default function useAllInventaire() {
  const navigate = useNavigate();
  const handleClickAff = (hostname) => {
    navigate(`/dashboard/inventaire/affectation?host_name=${hostname}`);
  };
  const handleClickRec = (hostname) => {
    navigate(`/dashboard/inventaire/recuperation?host_name=${hostname}`);
  };

  const rows = useGetAllInventaire().data?.map((e, index) => ({
    id: index,
    idInventaire: e.idInventaire,
    nomProduit: e.nomProduit,
    etat: e.etat,
    numeroSerie: e.numeroSerie === null ? "" : e.numeroSerie,
    affectationPlace: e.etat === "ENSTOCK" ? "" : e.affectationPlace,
    affectationPersonne: e.etat === "ENSTOCK" ? "" : e.affectationPersonne,
    hostname: e.hostname,
    idAffectation: e.lastIdAffectation,
    // barcode: `${e.numeroSerie}`,
  }));

  const columns = [
    {
      field: "hostname",
      headerName: "Hostname",
      width: 180,
      renderCell: (params) => {
        return (
          <Drawer
            width="60%"
            btnName={params.formattedValue}
            title="Details produit"
          >
            <DetailInventaire idInventaire={params.row.idInventaire} />
          </Drawer>
        );
      },
    },
    { field: "numeroSerie", headerName: "Numero de serie", width: 180 },
    { field: "etat", headerName: "Etat", width: 180 },
    { field: "affectationPlace", headerName: "Place", width: 180 },
    {
      field: "affectationPersonne",
      headerName: "Affecter au",
      width: 180,
    },
    {
      field: "Action",
      headerName: "",
      width: 180,
      renderCell: (params) => {
        return params.row.etat === "ENSTOCK" ? (
          <Button
            variant="outlined"
            color="success"
            sx={{ width: "65%" }}
            onClick={() => {
              handleClickAff(params.row.hostname);
            }}
          >
            Affecter
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ width: "65%" }}
            onClick={() => {
              handleClickRec(params.row.hostname);
            }}
          >
            Récupérer
          </Button>
        );
      },
    },
    // {
    //   field: "barcode",
    //   headerName: "Barcode",
    //   width: 180,
    //   align: "center",
    //   renderCell: (params) => (
    //     <Barcode value={params.value} height={50} format="CODE39" />
    //   ),
    // },
  ];
  return { rows, columns };
}
