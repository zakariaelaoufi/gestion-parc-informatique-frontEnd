import React from "react";
import useAllInventaire from "./components/useAllInventaire";
import { Box, Pagination, Typography } from "@mui/material";
import TableData from "../../../components/Table/TableData";

export default function InventaireList() {
  const { rows, columns } = useAllInventaire();
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            my: 3,
            fontWeight: "bold",
            borderLeft: "5px solid ",
            borderLeftColor: "secondary.main",
            px: 1.5,
          }}
        >
          Liste des machines
        </Typography>
        <Box
          sx={{
            my: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box></Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
          >
            {/* <CreateInventaire /> */}
            {/* <ExportMenu allDataExport={rows} /> */}
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
          <TableData
            pagination={<Pagination count={10} color="secondary.main" />}
            rows={rows}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
}
