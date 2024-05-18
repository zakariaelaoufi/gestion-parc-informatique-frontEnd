import { Box, Typography } from "@mui/material";
import useAllMarque from "./components/useAllMarque";
import CreateMarque from "./components/CreateMarque";
import TableData from "../../../components/Table/TableData";

export default function ListMarque() {
  const { rows, columns } = useAllMarque();

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
          Liste des marques
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
            <CreateMarque />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.light",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <TableData rows={rows} columns={columns} />
        </Box>
      </Box>
    </>
  );
}
