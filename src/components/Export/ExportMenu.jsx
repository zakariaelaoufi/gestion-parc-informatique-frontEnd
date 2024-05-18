import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Print from "./Print/ExportPrint";
import ExportExcel from "./Excel/ExportExcel";
import { useState } from "react";

export default function ExportMenu({
  allDataExport = null,
  selectedDataExport = null,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        id="basic-button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Export
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            p: 1,
            width: 180,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
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
      >
        {selectedDataExport && (
          <MenuItem onClick={handleClose}>
            <Print data={selectedDataExport}>imprimer les sélectionnés </Print>
          </MenuItem>
        )}
        {allDataExport && (
          <MenuItem onClick={handleClose}>
            <Print data={allDataExport}>imprimer tout</Print>
          </MenuItem>
        )}
        {allDataExport && (
          <MenuItem onClick={handleClose}>
            <ExportExcel data={allDataExport}>Excel </ExportExcel>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
