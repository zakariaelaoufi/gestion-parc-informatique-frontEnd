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
  import { useGetAttachmentBySupplier } from "../../../../hooks/api/useAttachmentApi";
  import { DataGrid } from "@mui/x-data-grid";
  import Drawer from "../../../../components/Drawer/Drawer";
  import DetailMarche from "../../marche/components/DetailMarche";
  
//   function createData(numberAttachement, date_works_start, date_works_end, state, departement) {
//     return {
//       id,
//       numberAttachement,
//       date_works_start,
//       date_works_end,
//       state,
//       departement
//     };
//   }
  
  export default function TableAttachmentBySupplier({ idSupplier }) {
    const data = useGetAttachmentBySupplier({ id: idSupplier })?.data;
    console.log(data);

    function parseDate(dateString) {
        const [day, month, year] = dateString.split("/");
        return new Date(`${year}-${month}-${day}`);
    }

    if (!data || data.length < 1)
      return <ComingSoon> Non Attachement exist </ComingSoon>;
    const rows = data?.map((e) =>{
        const sortedOper = e.operationAttachement?.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateA - dateB;
      }).reverse();

        return {
                        nbrAtt : e.numberAttachement, 
                        dateStart : e.date_works_start, 
                        dateEnd: e.date_works_end, 
                        state : sortedOper[0]?.state, 
                        dep : e.marche.departement.nameDepartement
                    }
    });
    console.log(rows);
    return (
      <TableContainer component={Paper}>
        <Table className="table-style" aria-label="table">
          <TableHead
          // sx={{ border: "1px solid #88888855" }}
          >
            <TableRow>
              <TableCell align="left">N° Attachement</TableCell>
              <TableCell align="center">Date travaux debut</TableCell>
              <TableCell align="center">Date travaux fin</TableCell>
              <TableCell align="center">Etat</TableCell>
              <TableCell align="center">Departement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.nbrAtt}</TableCell>
                <TableCell align="center">{row.dateStart} </TableCell>
                <TableCell align="center">{row.dateEnd}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">{row.dep}</TableCell>
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
  