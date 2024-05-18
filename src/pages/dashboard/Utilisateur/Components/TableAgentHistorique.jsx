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
  const rows = data.map((e, i) => ({
    id: i,
    immatricule,
    ...e,
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
        className=" table-style table-style-1"
        aria-label="table"
        size="small"
      >
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
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="center"
                  scope="row"
                  style={{ minWidth: column.minWidth }}
                >
                  {row[column.field] ? row[column.field] : <b>{"En cours"}</b>}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
