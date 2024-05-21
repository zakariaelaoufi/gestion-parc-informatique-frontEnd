import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export default function CategorieProductInfo({ data = [] }) {
  if (!data) return <></>;

  console.log("s", data);

  const rows = data.map((e, i) => ({
    id: i,
    nomProduit: e?.inventaireList[0]?.nomProduit,
    marque: e?.inventaireList[0]?.marque,
    totalPiece: e?.totalPiece,
  }));

  console.log("rows", rows);

  const columns = [
    { field: "nomProduit", headerName: "Nom Produit", width: 70 },
    { field: "marque", headerName: "Marque", width: 130 },
    { field: "totalPiece", headerName: "Total piece", width: 130 },
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
  );
}
