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
import ComingSoon from "../../../../components/Utils/ComingSoon";
import { useGetMarcheBySupplier } from "../../../../hooks/api/useMarcheApi";
import { DataGrid } from "@mui/x-data-grid";
import Drawer from "../../../../components/Drawer/Drawer";
import DetailMarche from "../../marche/components/DetailMarche";

function createData(id, numberMarche, libelle, montant, date_notif) {
  return {
    id,
    numberMarche,
    libelle,
    montant,
    date_notif,
  };
}

export default function TableMarcheBySupplier({ idSupplier }) {
  const data = useGetMarcheBySupplier({ id: idSupplier })?.data;
  console.log(data);

  if (!data || data.length < 1)
    return <ComingSoon> No Marché exist </ComingSoon>;
  const rows = data?.map((e) =>
    createData(e.id, e.numberMarche, e.libelle, e.montant, e.date_notif)
  );
  return (
    <TableContainer component={Paper}>
      <Table className="table-style" aria-label="table">
        <TableHead
        // sx={{ border: "1px solid #88888855" }}
        >
          <TableRow>
            <TableCell align="center">N°</TableCell>

            <TableCell align="left">numberMarche</TableCell>
            <TableCell align="center">libelle</TableCell>
            <TableCell align="center">montant</TableCell>
            <TableCell align="center">date_notif</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                <b>{i + 1}</b>
              </TableCell>

              <TableCell component="th" scope="row" align="left">
                <Drawer
                  btnName={row.numberMarche}
                  title="Details marche"
                  width="48%"
                >
                  <DetailMarche id={row.id} />
                </Drawer>
              </TableCell>
              <TableCell align="center">{row.libelle} </TableCell>
              <TableCell align="center">{row.montant} dhs</TableCell>
              <TableCell align="center">{row.date_notif}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

{
  /* <DataGrid
  rows={data}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 5,
      },
    },
  }}
  pageSizeOptions={[5]}
  checkboxSelection
  disableRowSelectionOnClick
/> */
}
