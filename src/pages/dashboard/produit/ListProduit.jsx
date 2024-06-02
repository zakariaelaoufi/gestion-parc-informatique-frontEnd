import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useAllProduit from "./components/useAllProduit";
import TableData from "../../../components/Table/TableData";
import { useNavigate } from "react-router-dom";

export default function ListProduit() {
  const { rows, columns } = useAllProduit();
  const navigate = useNavigate();

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
          Liste des produits
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
            <Box
              sx={{ display: "flex", justifyContent: "space-evenly", gap: 3 }}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => navigate("/dashboard/produits/ajouter-produit")}
              >
                Créer un produit
              </Button>
            </Box>
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
          <TableData rows={rows?.reverse()} columns={columns} isDense={true} />
        </Box>
      </Box>
    </>
  );
}
