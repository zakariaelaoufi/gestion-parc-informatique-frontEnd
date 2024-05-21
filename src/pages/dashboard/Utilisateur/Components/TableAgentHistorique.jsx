import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TableAgentHistorique({ data = [], immatricule }) {
  const rows = data.map((entry, index) => ({
    id: index,
    immatricule,
    ...entry,
  }));

  const columns = [
    { field: "immatricule", headerName: "Immatricule", width: 180 },
    { field: "nomEntiteTravail", headerName: "Place", width: 180 },
    { field: "dateDebut", headerName: "Date Debut", width: 180 },
    { field: "dateFin", headerName: "Date Fin", width: 180 },
  ];

  return (
    <TableContainer component={Paper}>
      <Table
        className="table-style table-style-1"
        aria-label="Agent History Table"
        size="small"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align="center"
                style={{ minWidth: column.width }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.reverse().map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align="center"
                    style={{ minWidth: column.width }}
                  >
                    {row[column.field] || <b>En cours</b>}
                  </TableCell>
                ))}
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
