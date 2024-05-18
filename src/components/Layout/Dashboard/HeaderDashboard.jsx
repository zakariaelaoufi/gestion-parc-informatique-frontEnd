import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";

import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useSelector, useDispatch } from "react-redux";
import { switchThemeMode } from "../../../redux/ThemeSlice";
import { deleteUser, deleteToken } from "../../../redux/Authslice";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

export default function HeaderDashboard({ setSideBarState }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(deleteUser());
    dispatch(deleteToken());
    navigate("/");
  };
  return (
    <Box
      sx={{
        mx: "2.5%",
        my: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <IconButton
          color="secondary"
          onClick={() => setSideBarState((prev) => !prev)}
        >
          <MenuRoundedIcon />
        </IconButton>
      </Box>
      <Box>
        <Button
          variant="text"
          sx={{ textTransform: "capitalize", ml: 1 }}
          onClick={handleLogout}
        >
          <LogoutRoundedIcon />
          <Typography sx={{ fontSize: 12, ml: 0.5 }}>Se déconnecter</Typography>
        </Button>
      </Box>
    </Box>
  );
}

function Notification() {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      ></Menu>
    </>
  );
}
