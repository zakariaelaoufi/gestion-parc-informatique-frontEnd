import { Box, Typography } from "@mui/material";
import useAllCategorie from "./components/useAllCategorie";
import CreateCategorie from "./components/CreateCategorie";
import TableData from "../../../components/Table/TableData";

export default function ListCategorie() {
  const { rows, columns } = useAllCategorie();
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{ my: 3, fontWeight: "bold" }}
        >
          Liste des categories
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
            <CreateCategorie />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.light",
            width: "100%",
          }}
        >
          <TableData rows={rows} columns={columns} />
        </Box>
      </Box>
    </>
  );
}
