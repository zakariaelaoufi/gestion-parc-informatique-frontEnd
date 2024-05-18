import { Category } from "@mui/icons-material";
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

export default function TableInventaire({ data = [] }) {
  if (!data || data.length < 1) return <></>;
  const rows = data?.map((e, index) => ({
    id: index,
    numeroSerie: e?.numeroSerie,
    hostname: e?.hostname,
    etat: e?.etat,
    place: e?.affectationPlace,
    Avec: e?.affectationPersonne,
  }));

  const columns = [
    { field: "hostname", headerName: "Hostname", width: 180 },
    { field: "numeroSerie", headerName: "Numero de serie", width: 180 },
    { field: "etat", headerName: "Etat", width: 180 },
    { field: "place", headerName: "Place", flex: 1.5 },
    { field: "Avec", headerName: "Avec", width: 180 },
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
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
