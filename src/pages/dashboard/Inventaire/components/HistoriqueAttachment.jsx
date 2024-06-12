import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function HistoriqueAttachment({ data = [] }) {
  if (!data) return <></>;
  console.log("atat", data);

  // Map the data to rows
  const rows = data.map((e, i) => ({
    id: i,
    ...e,
  }));

  // Define the columns
  const columns = [
    { field: "place", headerName: "Entité", width: 180 },
    { field: "dateAttachment", headerName: "Date Attachment", width: 180 },
    { field: "dateRetoure", headerName: "Date Retoure", width: 180 },
  ];

  return (
    <TableContainer component={Paper}>
      <Table className="table-style table-style-1" aria-label="table">
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
