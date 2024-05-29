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
import { useGetAllEntiteTravail } from "../../../../hooks/api/useEntiteTravailApi";

export default function RapportSurMachine() {
  const allEntite = useGetAllEntiteTravail()?.data;

  const renderTable = (data, headers) => (
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
          {data.length === 0 ? (
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
            data.map((row, rowIndex) => (
              <TableRow
                scope="row"
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
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const getAffectationData = (entite) => {
    return (
      entite?.travaillerList?.flatMap((travail) =>
        travail?.affecters
          ?.filter((affectation) => affectation.dateRetoure === null)
          .map((affectation) => ({
            nomMachine: affectation.nomMachine,
            hostname: affectation.hostname,
            immatricule: affectation.immatricule,
            dateAffectation: affectation.dateAffectation,
          }))
      ) || []
    );
  };

  const getAttachmentData = (entite) => {
    return (
      entite?.attacherList
        ?.filter((attachment) => attachment.dateRetoure === null)
        .map((attachment) => ({
          nomMachine: attachment.nomMachine,
          hostname: attachment.hostname,
          dateAttachment: attachment.dateAttachment,
        })) || []
    );
  };

  return (
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
        Les machines actuelles avec chaque entité de travail
      </Typography>
      {allEntite?.map((entite, index) => (
        <Box key={index} mb={4}>
          <Typography
            variant="h6"
            mb={2}
            fontWeight={"bold"}
            sx={{ fontFamily: "Roboto", letterSpacing: "0.18px" }}
          >
            {`${entite?.typeEntiteTravail.toLowerCase()} ${
              entite?.nomEntiteTravail
            }`}
          </Typography>

          <Typography
            variant="body1"
            mx={2}
            mb={2}
            sx={{
              color: "#172B4D",
              letterSpacing: "0.18px",
              fontSize: "16px",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "normal",
            }}
          >
            Les machines affectées aux employés :
          </Typography>
          {renderTable(getAffectationData(entite), [
            "Nom de Machine",
            "Hostname",
            "Matricule",
            "Date d'Affectation",
          ])}

          <Typography
            variant="body1"
            m={2}
            sx={{
              color: "#172B4D",
              letterSpacing: "0.18px",
              fontSize: "16px",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "normal",
            }}
          >
            Les machines attacheées à l'entité :
          </Typography>
          {renderTable(getAttachmentData(entite), [
            "Nom de Machine",
            "Hostname",
            "Date Attachment",
          ])}
        </Box>
      ))}
    </Container>
  );
}
