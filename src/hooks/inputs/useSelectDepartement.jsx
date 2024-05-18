import { useEffect, useState } from "react";
import { useGetAllDepartment } from "../api/useDepartmentApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function useSelectDepartement({ reset }) {
  const [department, setDepartment] = useState("");
  const allDepartment = useGetAllDepartment();
  // console.log(allDepartment.data)
  const handleChange = (event) => {
    setDepartment(event.target.value);
  };
  useEffect(() => {
    setDepartment("");
  }, [reset]);

  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="dep_role_label">Departement</InputLabel>
        <Select
          labelId="dep_role_label"
          id="department_select"
          value={department}
          label="Age"
          onChange={handleChange}
        >
          {allDepartment?.data?.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.nameDepartement}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  return { selectEntiteTravailHTML: renderHTML, department };
}
