import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function MarqueProductInfo({ data = [] }) {
  if (!data) return <></>;

  const rows = data.map((e, i) => ({
    id: i,
    nomProduit: e?.nomProduit,
    libelle: e?.inventaireList[0]?.categorie,
    total: e?.totalPiece,
  }));

  const columns = [
    {
      field: "nomProduit",
      headerName: "Nom Produit",
      width: 180,
    },
    {
      field: "libelle",
      headerName: "Categorie",
      width: 180,
    },
    {
      field: "total",
      headerName: "Total piece",
      width: 180,
    },
  ];
  return (
    <>
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
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) =>
                    column.field === "nomProduit" ? (
                      <TableCell
                        key={column.field}
                        align="left"
                        style={{ minWidth: column.minWidth }}
                      >
                        {row[column.field]}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={column.field}
                        align="center"
                        style={{ minWidth: column.minWidth }}
                      >
                        {row[column.field]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Pas de données disponibles pour le moment
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
