import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function TableUploadData({ data = [] }) {
  console.log("TableUploadData", data);
  return (
    data.length > 0 && (
      <>
        <TableContainer component={Paper} sx={{ my: 3 }}>
          <Table
            sx={{ minWidth: 650 }}
            className="table-style-2"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Désignation article</TableCell>
                <TableCell align="right">Quantité</TableCell>
                <TableCell align="right">Unité</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, i) => (
                <TableRow
                  key={i}
                  //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                  <TableCell align="right">{row[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  );
}
