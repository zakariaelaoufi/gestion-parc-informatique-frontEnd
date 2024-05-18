import { Box, Typography } from "@mui/material";
// import ExportMenu from "../../../../components/Export/ExportMenu";
import TableData from "../../../components/Table/TableData";
import useAllSupplier from "./components/useAllSupplier";
import CreateSupplier from "./components/CreateSupplier";
import ExportMenu from "../../../components/Export/ExportMenu";

export default function ListSupplier() {
  const { supplierData, columns } = useAllSupplier();
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Liste des fournisseur
      </Typography>
      <Box
        sx={{ my: 3, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <Box></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          {/* <CreateSupplier /> */}
          <ExportMenu allDataExport={supplierData} />
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
        <TableData rows={supplierData} columns={columns} />
      </Box>
    </Box>
  );
}
