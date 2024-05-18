import { Box, Typography } from "@mui/material";
import useAllFournisseur from "./components/useAllFournisseur";
import CreateFournisseur from "./components/CreateFournisseur";
import TableData from "../../../components/Table/TableData";

function FournisseurList() {
  const { rowsData, columns } = useAllFournisseur();
  console.log("rowsData", rowsData);
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{ my: 3, fontWeight: "bold" }}
        >
          Liste des Fournisseurs
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
            <CreateFournisseur />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.light",
            width: "100%",
          }}
        >
          <TableData rows={rowsData} columns={columns} />
        </Box>
      </Box>
    </>
  );
}

export default FournisseurList;
