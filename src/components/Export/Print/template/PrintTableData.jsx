import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function PrintTableData({ componentRef, data = [] }) {
  return (
    <Box ref={componentRef}>
      {data.length && (
        <Box sx={{ px: "24px", py: "32px" }}>
          <TableContainer component={Paper}>
            <Table sx={{
              minWidth: "100%",
              // transform :"scale(0.9)" ,
              border: "1px solid #88888855",
              boxShadow: "none",
              "& td, & th": {
                borderLeft: "1px solid #88888855",
                borderRight: "1px solid #88888855",
                py: 0.75,
                px: 1,
              },
              "& th ": { fontWeight: "bold", fontSize: "11px" },
              "& td ": { fontSize: "9px" },
            }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#242424" }}>
                <TableRow>
                  {Object.keys(data[0]).map((key, i) => (
                    <TableCell key={`${i}-${key}`} sx={{ color: "#fff" }}>
                      <b>{key}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow
                    key={i}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {Object.values(row).map((elem, i) => (
                      <TableCell key={`${i}-${elem}`}>{elem}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
