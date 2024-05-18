import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetAttachmentByMarche } from "../../../../hooks/api/useAttachmentApi";
import Drawer from "../../../../components/Drawer/Drawer";
import DetailAttachment from "../../attachment/components/DetailAttachment";
import ComingSoon from "../../../../components/Utils/ComingSoon";

function createData(
  id,
  numberAttachement,
  date_works_start,
  date_works_end,
  state
) {
  return {
    id,
    numberAttachement,
    date_works_start,
    date_works_end,
    state,
  };
}
export default function TableAttachmentByMarche({ idMarche }) {
  const data = useGetAttachmentByMarche({ id: idMarche })?.data;
  // console.log(data);

  if (!data || data.length < 1)
    return <ComingSoon> No attachments exist </ComingSoon>;
  const rows = data?.map((e) =>
    createData(
      e.id,
      e.numberAttachement,
      e.date_works_start,
      e.date_works_end,
      e.operationAttachement[0]?.state
    )
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table className="table-style table-style-" aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N° Attachement</TableCell>
              <TableCell align="center">Etat</TableCell>
              <TableCell align="center">date_works_start</TableCell>
              <TableCell align="center">date_works_end</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="left">
                  <Drawer
                    btnName={row.numberAttachement}
                    title="Details Attachement"
                    width={"48%"}
                  >
                    <DetailAttachment id={row.id} />
                  </Drawer>
                </TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center">{row.date_works_start}</TableCell>
                <TableCell align="center">{row.date_works_end}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
