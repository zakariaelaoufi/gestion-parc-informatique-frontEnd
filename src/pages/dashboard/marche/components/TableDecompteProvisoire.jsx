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
import { useGetDecompteByMarcheId } from "../../../../hooks/api/useDecompte";
import ComingSoon from "../../../../components/Utils/ComingSoon";
import Print from "../../../../components/Export/Print/Print";
import TemplateDecompteProvisoire from "../../../../components/Export/Print/template/TemplateDecompteProvisoire";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import CreateDecompteDefinitif from "./CreateDecompteDefinitif";

function createData(id, numberInsYear, montant, date) {
  return {
    id,
    numberInsYear,
    montant,
    date,
  };
}

export default function TableDecompteProvisoire({ idMarche }) {
  const data = useGetDecompteByMarcheId({ id: idMarche })?.data;

  const [selectedRowsData, setSelectedRowsData] = useState([]);

  const handleSelectionModelChange = (selectionData) => {
    setSelectedRowsData(rows.filter((e) => selectionData.includes(e.id)));
  };

  console.log("TableDecompteProvisoire", data);
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
      headerName: "N° d'inscription ",
      flex: 1,
    },
    {
      field: "montant",
      headerName: "Montant",
      flex: 1,
      valueGetter: (params) => `${params.row.montant} dhs`,
    },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "print",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Print
            btnIcon={<PrintRoundedIcon />}
            variant="contained"
            color="secondary"
            // sx={{ px: 5, color: "white" }}
          >
            <TemplateDecompteProvisoire
              data={data?.filter((e) => e.idPiece === params.row.id)[0]}
            />
          </Print>
        );
      },
    },
  ];
  return (
    // <TableContainer component={Paper}>
    //   <Table className="table-style" aria-label="table">
    //     <TableHead
    //     // sx={{ border: "1px solid #88888855" }}
    //     >
    //       <TableRow>
    //         <TableCell align="left">N° Decompte </TableCell>
    //         <TableCell align="center">Montant</TableCell>
    //         <TableCell align="center">Date</TableCell>
    //         <TableCell align="center"></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row, i) => (
    //         <TableRow key={row.id}>
    //           <TableCell component="th" scope="row" align="left">
    //             <b>N° {row.numberInYear}</b>
    //           </TableCell>
    //           <TableCell align="center">{row.montant} dhs</TableCell>
    //           <TableCell align="center">{row.date}</TableCell>
    //           <TableCell align="center">
    //             <Print
    //               btnIcon={<PrintRoundedIcon />}
    //               variant="contained"
    //               color="secondary"
    //               // sx={{ px: 5, color: "white" }}
    //             >
    //               <TemplateDecompteProvisoire data={data[i]} />
    //             </Print>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    <div style={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 3, mb: 2 }}>
        <CreateDecompteDefinitif
          variant="outlined"
          disabled={selectedRowsData.length < 1}
          selectedRowsData={selectedRowsData}
        />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={handleSelectionModelChange}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
