import { Box, Typography } from "@mui/material";
// import ExportMenu from "../../../../components/Export/ExportMenu";
import TableData from "../../../components/Table/TableData";
import useAllAttachment from "./components/useAllAttachment";
import ExportMenu from "../../../components/Export/ExportMenu";

export default function ListAttachment() {
  const { attachmentData, columns } = useAllAttachment();
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Liste des Attachement
      </Typography>
      <Box
        sx={{ my: 3, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <Box></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          {/* <CreateAttachment /> */}
          <ExportMenu allDataExport={attachmentData} />
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
        <TableData rows={attachmentData} columns={columns} /> 
      </Box>
    </Box>
  );
}