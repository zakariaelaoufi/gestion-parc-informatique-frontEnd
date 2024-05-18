import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useReactToPrint } from "react-to-print";

// import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  Box,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  Switch,
  Typography,
} from "@mui/material";
import { CreateUser, UpdateUser, DeleteUser } from "./userfunctions";
import { useContext, useState, useRef } from "react";
import { UserContext } from "./UserManagementContext";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
  frFR,
} from "@mui/x-data-grid";
import Modal from "../../../../components/Modal/Modal";
import TableData from "../../../../components/Table/TableData";
import ExportMenu from "../../../../components/Export/ExportMenu";

const initialRows = [
  {
    id: 1,
    name: "iliasilias",
    age: 25,
    joinDate: "10/10/2023",
    role: "role1",
  },
  {
    id: 2,
    name: "aoube ",
    age: 6,
    joinDate: "10/10/2023",
    role: "role2",
  },
  {
    id: 3,
    name: "ayoub ghita",
    age: 60,
    joinDate: "10/10/2023",
    role: "role1",
  },
];

const columns = [
  { field: "name", headerName: "Name", width: 180 },

  {
    field: "age",
    headerName: "Age",
    // type: "number",
    width: 180, // Corrected typo from 'with' to 'width'
  },
  {
    field: "joinDate",
    headerName: "Join date",
    type: "Date",
    width: 180,
  },
  {
    field: "role",
    headerName: "Department",
    width: 220,
  },
  {
    width: 220,
    // minWidth: 200,
    // maxWidth: 1000,
    field: "actions",
    headerName: "",
    type: "actions",
    headerClassName: "header weight-700",

    renderCell: (params) => {
      return (
        <>
          <p>action</p>
          {/* <UpdateUser user={null} />
       <DeleteUser user={null} />  */}
        </>
      );
    },
  },
];

export default function ListUser() {
  const { userData, userRoles } = useContext(UserContext);

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ my: 3, fontWeight: "bold" }}
      >
        Liste des utilisateurs
      </Typography>
      <Box
        sx={{ my: 3, display: "flex", justifyContent: "space-between", gap: 3 }}
      >
        <Box>
          <Modal
            btnName={"test"}
            btnIcon={<KeyboardArrowDownIcon />}
            // btnEvent={()=>console.log("ili")}
          >
            <Box>Lorem ipsum dolor sit amet consectetur adipisicing</Box>
          </Modal>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
          <CreateUser />
          <ExportMenu allDataExport={initialRows} />
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
        <TableData rows={initialRows} columns={columns} />
      </Box>
    </Box>
  );
}
