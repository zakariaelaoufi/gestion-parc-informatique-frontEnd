import { Box, Paper, Typography } from "@mui/material";
import ListCardsSection from "./components/ListCardsSection";
import ChartBar from "./components/ChartBar";
import EtatPie from "./components/EtatPie";
import PolarChart from "./components/PolarChart";
import TableTop5Actif from "./components/TableTop5Actif";

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
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 2,
          py: 1,
          my: 4,
        }}
      >
        <Paper
          mx={2}
          sx={{
            flex: "1",
            width: "100%",
            maxWidth: "120%",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e9d5ff",
            borderRadius: 2,
            boxShadow: " 0 1px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              height: "40px",
              textAlign: "start",
              borderBottom: "1px solid #e9d5ff",
              bgcolor: "#e9d5ff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            mb={2}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "primary.secondary",
                pl: 2,
                py: 1,
                fontFamily: "cursive",
              }}
            >
              Nombre des machine par etat
            </Typography>
          </Box>
          <Box
            mx={2}
            sx={{ width: "100%", height: "100%", p: 2, overflow: "auto" }}
          >
            <EtatPie />
          </Box>
        </Paper>

        <Paper
          mx={2}
          sx={{
            flex: "2",
            width: "100%",
            maxWidth: "120%",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e9d5ff",
            borderRadius: 2,
            boxShadow: " 0 1px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              height: "40px",
              textAlign: "start",
              borderBottom: "1px solid #e9d5ff",
              bgcolor: "#e9d5ff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            mb={2}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "primary.secondary",
                pl: 2,
                py: 1,
                fontFamily: "cursive",
              }}
            >
              Nombre des machine par categorie
            </Typography>
          </Box>
          <Box sx={{ width: "100%", height: "100%", p: 2 }}>
            <ChartBar />
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
          height: "400px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 2,
          py: 1,
          my: 4,
        }}
      >
        <Paper
          mx={2}
          sx={{
            flex: "1.6",
            width: "100%",
            maxWidth: "120%",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e9d5ff",
            borderRadius: 2,
            boxShadow: "0 1px 12px rgba(0, 0, 0, 0.15)",
            overflow: "auto",
          }}
        >
          <TableTop5Actif />
        </Paper>

        <Paper
          mx={2}
          sx={{
            flex: "1",
            width: "100%",
            maxWidth: "120%",
            height: "410px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e9d5ff",
            borderRadius: 2,
            boxShadow: " 0 1px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              height: "40px",
              textAlign: "start",
              borderBottom: "1px solid #e9d5ff",
              bgcolor: "#e9d5ff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            mb={2}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "primary.secondary",
                pl: 2,
                py: 1,
                fontFamily: "cursive",
              }}
            >
              Nombre des machine par departement
            </Typography>
          </Box>
          <Box sx={{ width: "100%", height: "90%", p: 2 }}>
            <PolarChart />
          </Box>
        </Paper>
      </Box>
      {/* <Box
        sx={{
          backgroundColor: "background.light",
          width: "100%",
          my: 4,
          borderRadius: 2,
        }}
      >
        <PolarChart />
      </Box> */}
    </>
  );
}
