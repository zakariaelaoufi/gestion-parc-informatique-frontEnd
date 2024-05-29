import { Place } from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Print from "../../../../components/Export/Print/Print";
import PrintIcon from "@mui/icons-material/Print";
import Logo from "/src/assets/radeef-logo.jpg";

export default function RapportSurMachineParUtilisateur({ data = [] }) {
  const renderTable = (datas, headers) => (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                align="center"
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Pas de données disponibles pour le moment
              </TableCell>
            </TableRow>
          ) : (
            <>
              {datas.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {Object.values(row).map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={headers.length} align="right">
                  <strong>Total:</strong> {datas.length}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const getAffectationData = (utilisateur) => {
    return (
      utilisateur?.travaillers?.flatMap((travail) =>
        travail?.affecters
          ?.filter((affectation) => affectation.dateRetoure === null)
          .map((affectation) => ({
            nomMachine: affectation.nomMachine,
            hostname: affectation.hostname,
            immatricule: affectation.immatricule,
            place: affectation.place,
            dateAffectation: affectation.dateAffectation,
          }))
      ) || []
    );
  };

  return (
    <Print
      btnName="rapport des machines"
      variant="outlined"
      btnIcon={<PrintIcon />}
      color="primary"
      sx={{ px: 5, color: "white" }}
    >
      <div
        style={{
          fontSize: "11px",
          fontFamily: "serif",
          width: "100%",
          height: "auto",
          aspectRatio: "3508/2480",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* ---------------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "12px",
          }}
        >
          <div>
            <img src={Logo} alt="logo" width={"36px"} />
          </div>
          <div style={{ fontSize: "10px", fontWeight: "bold" }}>
            <p>REGIE AUTONOME INTERCOMMUNALE</p>
            <p>DE DISTRIBUTION D’EAU ET D’ELECTRICITE DE FES</p>
          </div>
        </div>
        <Container>
          <Typography
            variant="h5"
            textAlign={"center"}
            sx={{
              textDecoration: "underline",
              fontFamily: "Roboto",
              letterSpacing: "0.18px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
            m={4}
          >
            Les machines actuelles avec{" "}
            {`${data?.nomUtilisateur.toUpperCase()} ${data?.prenomUtilisateur.toUpperCase()}`}
          </Typography>
          <Box mb={4}>
            {renderTable(getAffectationData(data), [
              "Machine",
              "Hostname",
              "Matricule",
              "Place",
              "Date d'Affectation",
            ])}

            <Typography
              variant="body1"
              m={2}
              sx={{
                color: "#000",
                letterSpacing: "0.18px",
                fontSize: "18px",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "normal",
              }}
            >
              Total des machines occupées :{" "}
              {getAffectationData(data).length || 0}
            </Typography>
          </Box>
        </Container>
      </div>
    </Print>
  );
}
