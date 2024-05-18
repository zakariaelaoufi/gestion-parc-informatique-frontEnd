import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData({ id, rib, bank, agency }) {
  return {
    id,
    rib,
    bank,
    agency,
  };
}

export default function TableRIB({ data = [] }) {
  if (!data || data.length < 1) return <></>;
  const rows = data?.map((e) =>
    createData({
      id: e.id,
      rib: e.rib,
      bank: e.bank,
      agency: e.agency,
    })
  );
  return (
    <>
      <TableContainer component={Paper}>
        <Table className="table-style table-style-1" aria-label="table">
          <TableHead
          // sx={{ border: "1px solid #88888855" }}
          >
            <TableRow>
              <TableCell align="center">N°</TableCell>
              <TableCell align="left" width={"250px"}>
                RIB
              </TableCell>
              <TableCell align="center"> bank </TableCell>
              <TableCell align="center">agency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="center">
                  <b>{i + 1}</b>
                </TableCell>
                <TableCell align="left">
                  <b> {row.rib}</b>
                </TableCell>
                <TableCell align="center">{row.bank}</TableCell>
                <TableCell align="center">{row.agency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
