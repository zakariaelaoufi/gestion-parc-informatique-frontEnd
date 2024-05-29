import { Box, Typography } from "@mui/material";
import TableData from "../../../components/Table/TableData";
import CreateEntiteTravail from "./Component/CreateEntiteTravail";
import useAllEntiteTravail from "./Component/useAllEntiteTravail";
import RapportSurMachine from "./Component/RapportSurMachine";
import Print from "../../../components/Export/Print/Print";
import PrintIcon from "@mui/icons-material/Print";

function ListDepartment() {
  const { rowsData, columns } = useAllEntiteTravail();
  return (
    <>
      <Box>
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
            Liste des Entités de travail
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
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
                alignItems: "center",
              }}
            >
              <Print
                btnName="rapport des machines"
                variant="outlined"
                btnIcon={<PrintIcon />}
                color="primary"
                sx={{ px: 5, color: "white" }}
              >
                <RapportSurMachine />
              </Print>{" "}
              <Box>
                <CreateEntiteTravail />
              </Box>
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
          <TableData rows={rowsData} columns={columns} />
        </Box>
      </Box>
    </>
  );
}

export default ListDepartment;
