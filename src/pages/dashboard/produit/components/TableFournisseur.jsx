import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Drawer from "../../../../components/Drawer/Drawer";
import DetailFournisseurModal from "./DetailFournisseurModal";

export default function TableFournisseur({ data = [] }) {
  if (!data || data.length < 1) return <></>;

  const rows = data?.livraisonList?.map((e, index) => ({
    id: index,
    ice: e?.fournisseur?.ice,
    nomFournisseur: e?.fournisseur?.nomFournisseur,
    prix: e?.prix + " DH",
    dateLivraison: e?.dateLivraison,
    dateExperation: e?.dateExperation,
    fournisseur: {
      ...e?.fournisseur,
    },
  }));

  const columns = [
    { field: "ice", headerName: "ICE", width: 180 },
    {
      field: "nomFournisseur",
      headerName: "Nom Fournisseur",
      width: 180,
      renderCell: (params) => (
        <DetailFournisseurModal data={params.row.fournisseur} />
      ),
    },
    { field: "prix", headerName: "Prix", width: 180 },
    { field: "dateLivraison", headerName: "Date Livraison", width: 180 },
    { field: "dateExperation", headerName: "Date Experation", width: 180 },
  ];

  return (
    <TableContainer component={Paper}>
      <Table className=" table-style table-style-1" aria-label="table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align="center"
                style={{ minWidth: column.minWidth }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="center"
                  style={{ minWidth: 140 }}
                >
                  {column.renderCell
                    ? column.renderCell({ value: row[column.field], row })
                    : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
