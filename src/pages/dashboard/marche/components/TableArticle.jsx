import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(
  id,
  price_UT,
  qte,
  article_id,
  article_name,
  article_unity,
  article_description
) {
  return {
    id,
    price_UT,
    qte,
    article_id,
    article_name,
    article_unity,
    article_description,
  };
}

export default function TableArticle({ data = [] }) {
  // console.log("TableArticle", data);
  if (!data || data.length < 1) return <></>;
  const rows = data?.map((e) =>
    createData(
      e.id,
      e?.price_UT,
      e?.qte,
      e?.article.id,
      e?.article.name,
      e?.article.unity,
      e?.article?.description
    )
  );
  const total = data.reduce((acc, e) => acc + e.qte * e.price_UT, 0);
  return (
    <TableContainer component={Paper}>
      <Table className=" table-style table-style-1" aria-label="table">
        <TableHead
        // sx={{ border: "1px solid #88888855" }}
        >
          <TableRow>
            <TableCell align="center">N°</TableCell>
            <TableCell align="left" width={"350px"}>
              Nom d'article
            </TableCell>
            <TableCell align="center">Unité</TableCell>
            <TableCell align="center">Quantité</TableCell>
            <TableCell align="center">PU DH/HT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                <b>{i + 1}</b>
              </TableCell>
              <TableCell align="left" sx={{ Width: "150%", flex: 5 }}>
                <b> {row.article_name}</b>
              </TableCell>
              <TableCell align="center">{row.article_unity}</TableCell>
              <TableCell align="center">{row.qte}</TableCell>
              <TableCell align="center">{row.price_UT}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <b>Totale DH/HT</b>
            </TableCell>
            <TableCell align="center" colSpan={3}>
              {total} dhs
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <b>TVA 20% </b>
            </TableCell>
            <TableCell align="center" colSpan={3}>
              {total * 0.2} dhs
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <b>Totale DH/TTC</b>
            </TableCell>
            <TableCell align="center" colSpan={3}>
              {total * 1.2} dhs
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
