import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData({
  id,
  qte,
  oldQte,
  marche_id,
  marche_qte,
  article_id,
  article_name,
  article_description,
}) {
  return {
    id,
    qte,
    oldQte,
    marche_id,
    marche_qte,
    article_id,
    article_name,
    article_description,
  };
}

export default function TableArticleAttachment({ data = [] }) {
  console.log("TableArticle", data);
  if (!data || data.length < 1) return <></>;
  const rows = data?.map((e) =>
    createData({
      id: e.id,
      qte: e.qte,
      oldQte: e.oldQte,
      marche_id: e.detailArticleMarche.id,
      marche_qte: e.detailArticleMarche.qte,
      article_id: e.detailArticleMarche.article.id,
      article_name: e.detailArticleMarche.article.name,
      article_description: e.detailArticleMarche.article.description,
    })
  );
  return (
    <>
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
              <TableCell align="left" width={"350px"}>
                Nom d'article
              </TableCell>
              <TableCell align="center">Unité</TableCell>
              <TableCell align="center"> Qté Marché</TableCell>
              <TableCell align="center">Qté réalisée précédement </TableCell>
              <TableCell align="center">Qté réalisée attachement</TableCell>
              <TableCell align="center">Quantité Cumulée </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="center">
                  <b>{i + 1}</b>
                </TableCell>
                <TableCell align="left" sx={{ Width: "150%", flex: 5 }}>
                  <b> {row.article_name}</b>
                </TableCell>
                <TableCell align="center">U</TableCell>
                <TableCell align="center">{row.marche_qte}</TableCell>
                <TableCell align="center">{row.oldQte}</TableCell>
                <TableCell align="center">{row.qte}</TableCell>
                <TableCell align="center">{row.qte + row.oldQte}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
