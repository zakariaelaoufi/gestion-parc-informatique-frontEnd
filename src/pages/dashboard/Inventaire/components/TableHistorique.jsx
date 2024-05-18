import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TableHistorique({ data = [] }) {
  if (!data) return <></>;
  console.log(data);
  const rows = data.map((e, i) => ({
    id: i,
    ...e,
  }));
  const columns = [
    { field: "immatricule", headerName: "Immatricule", width: 180 },
    { field: "place", headerName: "Place", width: 180 },
    { field: "dateAffectation", headerName: "Date Affectation", width: 180 },
    { field: "dateRetoure", headerName: "Date Retoure", width: 180 },
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
          {rows.reverse().map((row, i) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="center"
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
