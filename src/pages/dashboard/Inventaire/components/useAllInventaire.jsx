import React from "react";
// import Barcode from "react-barcode";
import { useGetAllInventaire } from "../../../../hooks/api/useInventaireApi";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Drawer from "../../../../components/Drawer/Drawer";
import DetailInventaire from "./DetailInventaire";
// import Recuperer from "../../Demande/Recuperer";
// import UpdateEtatIventaire from "./UpdateEtatIventaire";

export default function useAllInventaire() {
  const navigate = useNavigate();

  const handleClickAff = (hostname) => {
    navigate(`/dashboard/inventaire/attibution?host_name=${hostname}`);
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
      flex: 0.6,
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
    { field: "numeroSerie", headerName: "Numero de serie", flex: 0.9 },
    { field: "etat", headerName: "Etat", flex: 0.6 },
    { field: "affectationPlace", headerName: "Place", width: 180, flex: 1.3 },
    {
      field: "affectationPersonne",
      headerName: "Avec",
      flex: 1.1,
    },
    {
      field: "Action",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        return params.row.etat !== "ENREPARATION" &&
          params.row.etat !== "REFORME" ? (
          params.row.etat === "ENSTOCK" ? (
            <>
              <Button
                variant="outlined"
                color="success"
                sx={{ width: "65%" }}
                onClick={() => {
                  handleClickAff(params.row.hostname);
                }}
              >
                Attribuer
              </Button>
              {/* <UpdateEtatIventaire data={params.row} /> */}
            </>
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
          )
        ) : (
          <></>
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
