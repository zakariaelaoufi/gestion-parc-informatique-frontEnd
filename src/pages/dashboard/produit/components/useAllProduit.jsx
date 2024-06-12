import { render } from "react-dom";
import { useGetAllProduit } from "../../../../hooks/api/useProduitApi";
import Drawer from "../../../../components/Drawer/Drawer";
import DeatailProduit from "./DeatailProduit";
import { server, serverIMG } from "../../../../global";

export default function useAllProduit() {
  const rows = useGetAllProduit().data?.map((e, index) => ({
    id: index,
    idProduit: e.idProduit,
    nomProduit: e.nomProduit,
    libelle: e?.libelle,
    enStockNB: e.nbEtatInv?.ENSTOCK,
    actif: e.nbEtatInv?.ACTIF,
    totalPiece: e.totalPiece,
    imageURL: e.imageURL,
  }));

  const columns = [
    {
      field: "img",
      headerName: "Image",
      flex: 0.75,
      width: 200,
      renderCell: (params) => (
        <img
          src={`${serverIMG}/${params.row.imageURL}`}
          alt="img"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "contain",
            borderRadius: "5px",
            padding: "2px",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      field: "nomProduit",
      headerName: "Nom",
      flex: 2,
      width: 200,
      renderCell: (params) => (
        <Drawer width="60%" btnName={params.value} title="Détails produit">
          <DeatailProduit idProduit={params.row.idProduit} />
        </Drawer>
      ),
    },
    {
      field: "totalPiece",
      headerName: "Nb Pièce",
      headerAlign: "center",
      flex: 1,
      type: "number",
      width: 100,
      align: "center",
    },
    {
      field: "enStockNB",
      headerName: "En Stock",
      headerAlign: "center",
      flex: 1,
      type: "number",
      width: 100,
      align: "center",
    },
    {
      field: "actif",
      headerName: "Affectée",
      headerAlign: "center",
      flex: 1,
      type: "number",
      width: 100,
      align: "center",
    },
    {
      field: "libelle",
      headerName: "Catégorie",
      flex: 1,
      width: 100,
    },
  ];

  return { rows, columns };
}
