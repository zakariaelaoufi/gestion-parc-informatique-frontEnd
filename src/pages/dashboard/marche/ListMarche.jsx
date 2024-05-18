import { Box, Typography } from "@mui/material";
// import ExportMenu from "../../../../components/Export/ExportMenu";
import TableData from "../../../components/Table/TableData";
import useAllMarche from "./components/useAllMarche";
// import CreateMarche from "./components/CreateMarche";
import ExportMenu from "../../../components/Export/ExportMenu";
import Drawer from "../../../components/Drawer/Drawer";

export default function ListMarche() {
  const { marcheData, columns } = useAllMarche();
  console.log("marcheData" , marcheData);
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Liste des marchés
      </Typography>
      <Box
        sx={{ my: 3, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <Box></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          {/* <CreateMarche />
          <ExportMenu allDataExport={marcheData} /> */}
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
        <TableData rows={marcheData} columns={columns} />
      </Box>
    </Box>
  );
}
