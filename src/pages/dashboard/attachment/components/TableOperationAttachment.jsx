import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { operationAttachement } from "../../../../global";

const clcDateDifference = (date1, date2) => {
  let Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return Difference_In_Days;
};
const parseDMY = (s) => {
  let [d, m, y] = s.split(/\D/);
  return new Date(y, m - 1, d);
};

function createData({ id, state, date, observation, receiver, sender, user }) {
  return {
    id,
    state,
    date,
    observation,
    receiver,
    sender,
    user,
  };
}
export default function TableOperationAttachment({ data = [] }) {
  if (!data || data?.length < 1) return <></>;
  const rows = data?.map((e) =>
    createData({
      id: e.id,
      state: e.state,
      date: e.date,
      observation: e.observation,
      receiver: e.receiver,
      sender: e.sender,
      user: e.user,
    })
  );

  // const date1 = rows[0].date;
  // const date2 = rows[1].date;

  // console.log(date1, date2);
  // console.log(clcDateDifference(date1, date2));

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          border: "1px solid #88888855",
          boxShadow: "none",
          "& td, & th": {
            borderLeft: "1px solid #88888855",
            borderRight: "1px solid #88888855",
            py: 1.7,
          },
          "& th ": { fontWeight: "bold" },
        }}
        aria-label="simple table"
      >
        <TableHead
        // sx={{ border: "1px solid #88888855" }}
        >
          <TableRow>
            <TableCell align="center">N°</TableCell>
            <TableCell align="center">Etat</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center"> Observation</TableCell>
            <TableCell align="center"> Durée </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                <b>{rows.length - i}</b>
              </TableCell>
              <TableCell align="center">
                {operationAttachement[row.state]}
              </TableCell>
              <TableCell align="center">{row.date} </TableCell>
              <TableCell align="center">
                {row?.observation?.trim() || "-"}
              </TableCell>
              <TableCell align="center">
                {operationAttachement[row.state] ===
                operationAttachement.Valid_DEP
                  ? "-"
                  : clcDateDifference(
                      parseDMY(rows[i].date),
                      rows[i - 1]?.date
                        ? parseDMY(rows[i - 1].date)
                        : new Date()
                    )}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
