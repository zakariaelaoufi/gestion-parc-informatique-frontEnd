import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useGetDecompteByMarcheId,
  useGetDecompteDefByMarcheId,
} from "../../../../hooks/api/useDecompte";
import ComingSoon from "../../../../components/Utils/ComingSoon";
import Print from "../../../../components/Export/Print/Print";
import TemplateDecompteProvisoire from "../../../../components/Export/Print/template/TemplateDecompteProvisoire";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import CreateDecompteDefinitif from "./CreateDecompteDefinitif";
import TemplateDecompteDefinitif from "../../../../components/Export/Print/template/TemplateDecompteDefinitif";

function createData(id, numberInsYear, montant, date) {
  return {
    id,
    numberInsYear,
    montant,
    date,
  };
}

export default function TableDecompteDefinitif({ idMarche }) {
  const data = useGetDecompteDefByMarcheId({ id: idMarche })?.data;

  console.log("TableDecompte definitif", data);
  if (!data || data.length < 1)
    return <ComingSoon> No Decompte exist </ComingSoon>;
  // if (true) return <> </>;

  const rows = data?.map((e) =>
    createData(e.idPiece, e.numberInsYear, e.montant, e.date)
  );
  const columns = [
    // { field: 'id', headerName: 'ID', flex:1},
    {
      field: "numberInsYear",
      headerName: "Number d'inscription par année",
      flex: 1.5,
    },
    { field: "montant", headerName: "Montant Total", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
  ];
  return (
    <TableContainer component={Paper}>
      <Table className="table-style" aria-label="table">
        <TableHead
        // sx={{ border: "1px solid #88888855" }}
        >
          <TableRow>
            <TableCell align="left">N° d'inscription </TableCell>
            <TableCell align="center">Montant Total</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Imprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="left">
                <b>N° {row.numberInsYear}</b>
              </TableCell>
              <TableCell align="center">{row.montant} dhs</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
                <Print
                  btnIcon={<PrintRoundedIcon />}
                  variant="contained"
                  color="secondary"
                  // sx={{ px: 5, color: "white" }}
                >
                  <TemplateDecompteDefinitif data={data[i]} />
                </Print>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: { page: 0, pageSize: 5 },
    //       },
    //     }}
    //     pageSizeOptions={[5, 10]}
    //   />
    // </div>
  );
}
