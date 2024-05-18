import { useState } from "react";
import ModalContainer from "./ModalContainer";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";

export default function Modal(props) {
  const {
    btnName,
    btnVar = null,
    btnIcon = null,
    btnEvent = null,
    btnColor = null,
    children,
    modalTitle = "",
    modalCancelName = null,
    modalCancelEvent = null,
    modalActionName = null,
    modalActionEvent = null,
    modalFinalEvent = null,
    btnActionColor = null,
    actionType = null,
    ...other
  } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    modalCancelEvent && modalCancelEvent();
    setOpen(true);
  };
  const handleClose = () => {
    modalFinalEvent && modalFinalEvent();
    setOpen(false);
  };
  const handleCancel = () => {
    btnEvent && btnEvent();
    modalFinalEvent && modalFinalEvent();
    setOpen(false);
  };
  const handleAction = () => {
    const state = modalActionEvent && (!modalActionEvent() || false);
    !state && modalFinalEvent && modalFinalEvent();
    setOpen(state);
  };

  return (
    <>
      {btnName ? (
        <Button
          variant={btnVar || "contained"}
          startIcon={btnIcon}
          color={btnColor || "secondary"}
          onClick={handleOpen}
          // disabled={disabled}
          {...other}
        >
          {btnName}
        </Button>
      ) : btnIcon ? (
        <IconButton
          variant="outlined"
          color={btnColor || "primary"}
          sx={{ mx: 1 }}
          onClick={handleOpen}
        >
          {btnIcon}
        </IconButton>
      ) : (
        <></>
      )}

      <ModalContainer state={open} handleClose={handleClose}>
        <Box>
          <Typography variant="h5" component="h3">
            {modalTitle || btnName || "Titre"}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <>{children}</>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
            <Button variant="text" onClick={handleCancel}>
              {modalCancelName || "Annuler"}
            </Button>
            <Button
              variant="contained"
              color={btnActionColor || "secondary"}
              onClick={handleAction}
              type={actionType}
            >
              {modalActionName || btnName || "Action"}
            </Button>
          </Box>
        </Box>
      </ModalContainer>
    </>
  );
}
