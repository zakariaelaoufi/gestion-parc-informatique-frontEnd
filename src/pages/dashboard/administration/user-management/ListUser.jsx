import { Box, Typography } from "@mui/material";
// import ExportMenu from "../../../../components/Export/ExportMenu";
import TableData from "../../../../components/Table/TableData";
import CreateUser from "./components/CreateUser";
import useAllUser from "./components/useAllUser";
import { useState } from "react";

export default function ListUser() {
  const { userData, columns } = useAllUser();
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Liste des utilisateurs
      </Typography>
      <Box
        sx={{ my: 3, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <Box></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          <CreateUser />
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
        <TableData rows={userData} columns={columns} />
      </Box>
    </Box>
  );
}
