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

export default function TableInventaire({ data = [] }) {
  if (!data || data.length < 1) return <></>;
  console.log("data", data);
  const rows = data?.map((e, index) => ({
    id: index,
    numeroSerie: e?.numeroSerie,
    hostname: e?.hostname,
    etat: e?.etat,
    ice: e?.ice,
    place:
      e?.affectationPlace === null
        ? e?.attachers[0]?.place || "Aucun"
        : e?.affectationPlace,
    Avec: e?.affectationPersonne === null ? "Aucun" : e?.affectationPersonne,
  }));

  const columns = [
    { field: "hostname", headerName: "Hostname", width: 180 },
    { field: "numeroSerie", headerName: "Numero de serie", width: 180 },
    { field: "ice", headerName: "ICE", width: 180 },
    { field: "etat", headerName: "Etat", width: 180 },
    { field: "place", headerName: "Entité", flex: 1.5 },
    { field: "Avec", headerName: "Employé", width: 180 },
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
            rows.reverse().map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {row[column.field] ? (
                      row[column.field]
                    ) : (
                      <b>{"En cours"}</b>
                    )}
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
