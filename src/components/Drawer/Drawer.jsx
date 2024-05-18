import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DrawerContainer from "./DrawerContainer";
import { useState } from "react";

export default function Drawer(props) {
  const {
    btnName = "",
    btnIcon = null,
    btnColor = null,
    children,
    title = "",
    drawerFinalEvent = null,
    width,
    ...other
  } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    drawerFinalEvent && drawerFinalEvent();
    setOpen(false);
  };

  // if (!attachment) return <></>;
  return (
    <>
      {btnName ? (
        <Button
          variant="text"
          startIcon={btnIcon}
          color={btnColor || "secondary"}
          onClick={handleOpen}
          style={{
            justifyContent: "start",
            fontWeight: "bold",
          }}
          // fullWidth
          size="small"
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

      <DrawerContainer state={open} handleDrawerClose={handleClose} width={width}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            px: 6,
            py: 3,
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
            {title}
          </Typography>
          <IconButton color="error" onClick={handleClose}>
            <CloseRoundedIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            px: 6,
            py: 3,
          }}
        >
          {children}
        </Box>
      </DrawerContainer>
    </>
  );
}
