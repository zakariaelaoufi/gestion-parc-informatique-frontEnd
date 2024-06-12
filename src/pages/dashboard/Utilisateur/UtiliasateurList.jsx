import useAllUtilisateur from "./Components/useAllUtilisateur";
import { Box, Typography } from "@mui/material";
import CreateUtilisateur from "./Components/CreateUtilisateur";
import TableData from "../../../components/Table/TableData";
// import TableData from "components/Table/TableData";

function UtiliasateurList() {
  const { rowsData, columns } = useAllUtilisateur();
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
          Liste des Employées
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
            <CreateUtilisateur />
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
          <TableData rows={rowsData} columns={columns} />
        </Box>
      </Box>
      <Box />
    </>
  );
}

export default UtiliasateurList;
