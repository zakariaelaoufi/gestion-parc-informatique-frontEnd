// import axios from "axios";
import ListUser from "./UserManagementList";
import { Box } from "@mui/material";
import { UserContext, UserContextData } from "./UserManagementContext";
import UserModel from "./UserfunctionsModal";

export default function Index() {
  const data = UserContextData();
  return (
    <UserContext.Provider value={data}>
      <UserManagement />
    </UserContext.Provider>
  );
}

function UserManagement() {
  return (
    <Box>
      <ListUser />
      <UserModel />
    </Box>
  );
}
