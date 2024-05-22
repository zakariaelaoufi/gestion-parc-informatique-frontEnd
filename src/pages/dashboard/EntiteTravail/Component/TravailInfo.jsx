import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TravailInfo({ data = [] }) {
  if (!data) return <></>;
  console.log("data", data);

  const rows = data.map((e, i) => ({
    id: i,
    ...e,
  }));

  const columns = [
    { field: "immatricule", headerName: "Immatricule", width: 180 },
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
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.field === "dateFin"
                      ? row[column.field] == null
                        ? "En cours"
                        : row[column.field]
                      : row[column.field]}
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
