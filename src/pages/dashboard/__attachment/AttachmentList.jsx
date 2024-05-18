import { useContext, useEffect, useState } from "react";
import {
  CreateAttachment,
  // UpdateUser,
  // DeleteUser,
} from "./AttachmentFunctions";
import { AttachmentContext } from "./AttachmentContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";
// import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
// import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';

import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ListAttachment() {
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Liste des attachements
      </Typography>
      <Box
        sx={{ my: 4, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <AttachmentSearch />
        <CreateAttachment />
      </Box>
      <Box>
        <AttachmentTable />
      </Box>
    </Box>
  );
}

function AttachmentTable() {
  const { attachmentData } = useContext(AttachmentContext);
  const [open, setOpen] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const handleDrawerOpen = (data) => {
    setOpen(true);
    setAttachment(data);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 1800 }}>
        <Table aria-label="table">
          <TableHead>
            <TableRow
              sx={{ fontWeight: "bold", "&:last-child th": { fontSize: 16 } }}
            >
              <TableCell>
                <b> Numéro </b>
              </TableCell>
              <TableCell align="right">
                <b>État d'attachement</b>
              </TableCell>
              <TableCell align="right">
                <b>Numéro marché</b>
              </TableCell>
              <TableCell align="right">
                <b>Date des travaux</b>
              </TableCell>
              <TableCell align="right">
                <b>Date d'arrivée</b>
              </TableCell>
              <TableCell align="right">
                <b>Département</b>
              </TableCell>

              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attachmentData?.map((elem) => (
              <TableRow
                key={elem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => handleDrawerOpen(elem)}
                    sx={{
                      // borderLeft: "4px solid ",
                      // borderLeftColor: "warning.main",
                      // borderRadius: 0,
                      fontWeight: "bold",
                    }}
                    // color="warning"
                  >
                    {elem.nbr}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={
                      elem.date_attachment?.filter((e) => e.isActive)[0]?.state
                    }
                    // color="warning"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">{elem.marche.nbr}</TableCell>
                <TableCell align="right">
                  {elem.date_work_start + " - " + elem.date_work_end}
                </TableCell>
                <TableCell align="right">
                  {
                    elem.date_attachment?.filter((e) => e.isActive)[0]
                      ?.date_arrival
                  }
                </TableCell>
                <TableCell align="right">{elem.department.name}</TableCell>

                <TableCell align="right">
                  <Box></Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AttachmentDetailDrawer {...{ open, attachment, handleDrawerClose }} />
    </>
  );
}

function AttachmentDetailDrawer({ open, attachment, handleDrawerClose }) {
  const [showArch, setShowArch] = useState(false);
  useEffect(() => {
    setShowArch(false);
  }, [attachment]);

  if (!attachment) return <></>;
  return (
    <Drawer
      sx={{
        width: "100%",
        flexShrink: 0,
        borderRadius: "22px 0 0 22px",
        "& .MuiDrawer-paper": {
          resize: "horizontal",
          direction: "rtl",
          overflow: "auto",
          width: "49.5%",
          minWidth:"500px",
          boxSizing: "border-box",
          background: "rgba(255, 255, 255, 0.98)",
          borderRadius: "16px 0 0 16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(38px)",
          "-webkit-backdrop-filter": "blur(38px)",
          border: "1px solid rgba(255, 255, 255, 0.87",
        },
      }}
      variant="temporary"
      anchor="right"
      open={open}
      onClose={handleDrawerClose}
    >
      <Box sx={{ 
          direction: "ltr",
          width:"100%"
         }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          px: 6,
          py: 4,
         

        }}
      >
        {/* <Divider orientation="vertical"></Divider> */}
        <Typography
          variant="h5"
          component="h6"
          sx={{
            fontWeight: "bold",
            color: "secondary.main",
            // borderLeft: "4px solid ",
            // borderLeftColor: "secondary.main",
            // pl: 2,
          }}
        >
          Détails de l'attachement
        </Typography>
        <IconButton color="error" onClick={handleDrawerClose}>
          <CloseRoundedIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
      <Divider />
      <Box>
        <Box sx={{ px: 6, py: 4, opacity: "0.95", mt: 2 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  borderLeft: "4px solid ",
                  borderLeftColor: "primary.main",
                  pl: 2,
                }}
              >
                L'attachement
              </Typography>
              <Typography variant="body1">
                {" "}
                - Numéro : {attachment.nbr}
              </Typography>
              <Typography variant="body1">
                - Date debut travaux : {attachment.date_work_start}
              </Typography>
              <Typography variant="body1">
                - Date fin travaux : {attachment.date_work_end}
              </Typography>
              <Typography variant="body1">
                - Département : {attachment.department.name}
              </Typography>

              <Typography
                variant="subtitle1"
                component="h6"
                sx={{
                  my: 0,
                  fontWeight: "bold",
                  borderLeft: "4px solid ",
                  borderLeftColor: "primary.main",
                  pl: 2,
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  // justifyContent:"space-between"
                }}
              >
                Dates
                {attachment.date_attachment.length > 1 && (
                  <Button
                    sx={{ textTransform: "lowercase" }}
                    onClick={() => setShowArch(!showArch)}
                  >
                    Les archives
                  </Button>
                )}
              </Typography>
              <Typography variant="body1">
                - Date d'arrivée :{" "}
                {
                  attachment.date_attachment?.filter((e) => e.isActive)[0]
                    ?.date_arrival
                }
              </Typography>
              <Typography variant="body1">
                - Date d'envoi dép :{" "}
                {
                  attachment.date_attachment?.filter((e) => e.isActive)[0]
                    ?.date_send_dep
                }
              </Typography>
              {attachment.date_attachment?.filter((e) => e.isActive)[0]
                ?.date_return_dep && (
                <Typography variant="body1">
                  - Date de rejet du département :{" "}
                  {
                    attachment.date_attachment?.filter((e) => e.isActive)[0]
                      ?.date_return_dep
                  }
                </Typography>
              )}
              {attachment.date_attachment?.filter((e) => e.isActive)[0]
                ?.date_return_four && (
                <Typography variant="body1">
                  - Date de retour au fournisseur :{" "}
                  {
                    attachment.date_attachment?.filter((e) => e.isActive)[0]
                      ?.date_return_four
                  }
                </Typography>
              )}
              {attachment.date_attachment?.filter((e) => e.isActive)[0]
                ?.observation && (
                <Typography variant="body1">
                  - observation :{" "}
                  {
                    attachment.date_attachment?.filter((e) => e.isActive)[0]
                      ?.observation
                  }
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                variant="subtitle1"
                component="h6"
                sx={{
                  fontWeight: "bold",
                  borderLeft: "4px solid ",
                  borderLeftColor: "primary.main",
                  pl: 2,
                  my: 1,
                }}
              >
                Le Marché
              </Typography>
              <Typography variant="body1">
                - Identifiant : {attachment.marche.nbr}
              </Typography>
              <Typography variant="body1">
                - Libellé : {attachment.marche.label}
              </Typography>
              <Typography variant="body1">
                - montant : {attachment.marche.amount} DHS
              </Typography>
              <Typography variant="body1">
                - date Notification : {attachment.marche.dateNotification}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h6"
                sx={{
                  my: 1,
                  fontWeight: "bold",
                  borderLeft: "4px solid ",
                  borderLeftColor: "primary.main",
                  pl: 2,
                  mt: 3,
                }}
              >
                Fournisseur
              </Typography>
              <Typography variant="body1">
                - ICE : {attachment.marche.fournisseur.ice}
              </Typography>
              <Typography variant="body1">
                - Nom : {attachment.marche.fournisseur.name}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {showArch && (
          <Box sx={{ px: 3, py: 2 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 800 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "& th ": {
                        fontWeight: "bold ",
                        minWidth: "112px",
                        maxWidth: "320px",
                      },
                    }}
                  >
                    <TableCell>État</TableCell>
                    <TableCell>Envoi dep</TableCell>
                    <TableCell>Arrivée</TableCell>
                    <TableCell>Retour four</TableCell>
                    <TableCell>Rejet dép</TableCell>
                    <TableCell>Observation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attachment.date_attachment.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.state || "-"}</TableCell>
                      <TableCell>{e.date_arrival || "-"}</TableCell>
                      <TableCell>{e.date_send_dep || "-"}</TableCell>
                      <TableCell>{e.date_return_four || "-"}</TableCell>
                      <TableCell>{e.date_return_dep || "-"}</TableCell>
                      <TableCell>{e.observation || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>

      </Box>
    </Drawer>
  );
}

function AttachmentSearch() {
  const [search, setSearch] = useState("");
  const { searchAttachment } = useContext(AttachmentContext);

  const handleSearchInput = (e) => {
    const data = e.target.value;
    setSearch(data);
    searchAttachment(data);
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        boxShadow: "0px 2px 3px #24242422",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        searchAttachment(search);
      }}
    >
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => searchAttachment(search)}
      >
        <SearchRoundedIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={search}
        onChange={handleSearchInput}
        placeholder="Rechercher un utilisateur"
        inputProps={{ "aria-label": "search google maps" }}
      />
    </Paper>
  );
}
