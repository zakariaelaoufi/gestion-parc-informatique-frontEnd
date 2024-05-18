import { useEffect, useState } from "react";
import { user_role as roles } from "../../../../../global";
import { useGetAllDepartment } from "../../../../../hooks/api/useDepartmentApi";

import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

export function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setUserData = null,
}) {
  /********** state ***************** */

  const [userName, setUserName] = useState(isUpdate ? data?.user_name : "");
  const [userNbr, setUserNbr] = useState(isUpdate ? data?.user_nbr : "");
  const [userDepartment, setUserDepartment] = useState(
    isUpdate ? data?.user_department : ""
  );
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [userRole, setUserRole] = useState(isUpdate ? data?.user_role : []);
  const [showPwdSection, SetShowPwdSection] = useState(false);

  /**********  Submit and validation ****************** */

  useEffect(() => {
    setUserData({
      userName,
      userNbr,
      userDepartment,
      userPassword,
      userPasswordConfirm,
      userRole,
    });
  }, [
    setUserData,
    userName,
    userNbr,
    userDepartment,
    userPassword,
    userPasswordConfirm,
    userRole,
  ]);

  /********** Department ***************** */
  const allDepartment = useGetAllDepartment();

  console.log("--> c.u");
  // console.log(userDepartment);
  return (
    <>
      <Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            margin="normal"
            required
            sx={{ flex: 3 }}
            id="user_name"
            label="Nom"
            name="userName"
            autoComplete="name"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            sx={{ flex: 2 }}
            id="user_nbr"
            label="Matricule"
            name="userNbr"
            value={userNbr}
            onChange={(e) => setUserNbr(e.target.value.trim())}
          />
        </Box>
        <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
          <FormControl sx={{ flex: 2 }} fullWidth>
            <InputLabel id="dep_role_label">Departement</InputLabel>
            <Select
              labelId="dep_role_label"
              id="department_select"
              value={userDepartment}
              label="Age"
              onChange={(e) => setUserDepartment(e.target.value)}
            >
              {allDepartment?.data?.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.nameDepartement}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 3 }} fullWidth>
            <InputLabel id="user_role_label">Rôle</InputLabel>
            <Select
              labelId="user_role_label"
              id="user_role"
              multiple
              value={userRole}
              onChange={(event) => {
                const value = event.target.value;
                setUserRole(
                  typeof value === "string" ? value.split(",") : value
                );
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(_userRole) =>
                Object.keys(roles)
                  ?.filter((key) => _userRole.indexOf(key) > -1)
                  .map((key) => roles[key])
                  .join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {Object.keys(roles).map((key) => (
                <MenuItem key={key} value={key}>
                  <Checkbox checked={userRole.indexOf(key) > -1} />
                  <ListItemText primary={roles[key]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          {isUpdate && (
            <>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPwdSection}
                    onChange={(e) => SetShowPwdSection(e.target.checked)}
                  />
                }
                label="Changer le mot de passe"
              />
            </>
          )}
          {(!isUpdate || showPwdSection) && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="user_password"
                label="Mot de passe"
                type="password"
                id="user_password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="user_password_conform"
                label="Comfirmer le mot de passe"
                type="password"
                id="user_password_conform"
                value={userPasswordConfirm}
                onChange={(e) => setUserPasswordConfirm(e.target.value)}
                error={Boolean(
                  userPasswordConfirm && userPassword !== userPasswordConfirm
                )}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
