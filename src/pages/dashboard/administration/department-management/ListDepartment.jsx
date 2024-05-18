import { Box, Typography } from "@mui/material";
// import ExportMenu from "../../../../components/Export/ExportMenu";
import TableData from "../../../../components/Table/TableData";
import useAllDepartment from "./components/useAllDepartment";
import CreateDepartment from "./components/CreateDepartment";

export default function ListDepartment() {
  const { departmentData, columns } = useAllDepartment();
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Liste des Départements
      </Typography>
      <Box
        sx={{ my: 3, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <Box></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          <CreateDepartment />
          {/* <ExportMenu allDataExport={[]} /> */}
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
        <TableData rows={departmentData} columns={columns} />
      </Box>
    </Box>
  );
}
