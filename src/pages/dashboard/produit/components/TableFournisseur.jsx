import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function TableFournisseur({ data = [] }) {
  if (!data || data.length < 1) return <></>;

  const columns = [
    { field: "ice", headerName: "ICE", width: 180 },
    { field: "nomFournisseur", headerName: "Nom Fournisseur", width: 180 },
    { field: "adresse", headerName: "Adresse", width: 180 },
    { field: "tel", headerName: "Telephone", width: 180 },
    { field: "fax", headerName: "Fax", width: 180 },
    { field: "email", headerName: "Email", width: 180 },
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
          <TableCell scope="row" align="center">
            {data?.ice}
          </TableCell>
          <TableCell scope="row" align="center">
            {data?.nomFournisseur}
          </TableCell>
          <TableCell scope="row" align="center">
            {data?.adresse}
          </TableCell>
          <TableCell scope="row" align="center">
            {data?.tel}
          </TableCell>
          <TableCell scope="row" align="center">
            {data?.fax}
          </TableCell>
          <TableCell scope="row" align="center">
            {data?.email}
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
