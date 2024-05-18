import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function MachineAffecter({ data = [] }) {
  const rows = data[0].map((e, i) => ({
    id: i,
    ...e,
  }));

  rows.sort((a, b) => {
    // Convert date strings to Date objects
    const dateA = a.dateRetoure ? new Date(a.dateRetoure) : null;
    const dateB = b.dateRetoure ? new Date(b.dateRetoure) : null;
    // Sort in descending order
    if (dateA && dateB) {
      return dateB - dateA;
    }
    // Handle cases where one of the dates is null
    if (dateA === null && dateB !== null) {
      return -1;
    }
    if (dateA !== null && dateB === null) {
      return 1;
    }
    // If both dates are null or undefined, maintain current order
    return 0;
  });

  const columns = [
    { field: "numeroSerie", headerName: "Numero de Serie", width: 180 },
    { field: "nomMachine", headerName: "Nom de la Machine", width: 180 },
    { field: "dateAffectation", headerName: "Date d'Attribution", width: 180 },
    { field: "dateRetoure", headerName: "Date de Retoure", width: 180 },
    { field: "place", headerName: "Place", width: 180 },
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
                  {column.field === "nomMachine" ? (
                    <span>
                      {row[column.field].length > 16
                        ? `${row[column.field].substring(0, 16)}...`
                        : row[column.field]}
                    </span>
                  ) : column.field === "numeroSerie" ? (
                    row[column.field] === null ? (
                      ""
                    ) : (
                      row[column.field]
                    )
                  ) : row[column.field] !== null ? (
                    row[column.field]
                  ) : (
                    <b>{"En cours"}</b>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
