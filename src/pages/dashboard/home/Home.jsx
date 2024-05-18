import { Box, Typography } from "@mui/material";
import ListCardsSection from "./components/ListCardsSection";
import Chart from "./components/Chart";
import useAllMarche from "../marche/components/useAllMarche";
import TableData from "../../../components/Table/TableData";

export default function Home() {
  return (
    <>
      {/* <Box>
        <Typography variant="h4">Accueil</Typography>
      </Box> */}
      <ListCardsSection />
      <Box
        sx={{
          maxWidth: "100%",
          mt: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          py: 1,
        }}
      >
        <Chart />
      </Box>
      <Box
        sx={{
          backgroundColor: "background.light",
          width: "100%",
          my: 4,
          borderRadius: 2,
        }}
      ></Box>
    </>
  );
}
