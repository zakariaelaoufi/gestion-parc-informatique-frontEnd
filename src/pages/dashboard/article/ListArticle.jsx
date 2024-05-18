import { Box, Typography } from "@mui/material";
// import ExportMenu from "../../../../components/Export/ExportMenu";
import TableData from "../../../components/Table/TableData";
import useAllArticle from "./components/useAllArticle";
import CreateArticle from "./components/CreateArticle";
import ExportMenu from "../../../components/Export/ExportMenu";

export default function ListArticle() {
  const { articleData, columns } = useAllArticle();
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Les articles
      </Typography>
      <Box
        sx={{ my: 3, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <Box></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          <CreateArticle variant="outlined" />
          <ExportMenu allDataExport={articleData} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.light",
          width: "100%",
          p: 0,
          borderRadius: 2,
        }}
      >
        <TableData rows={articleData} columns={columns} />
      </Box>
    </Box>
  );
}
