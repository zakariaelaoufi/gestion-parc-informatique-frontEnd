import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

export function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setDepartmentData = null,
}) {
  /********** state ***************** */

  const [departmentName, setDepartmentName] = useState(
    isUpdate ? data?.department_name : ""
  );

  /**********  Submit and validation ****************** */

  useEffect(() => {
    setDepartmentData({
      departmentName,
    });
  }, [departmentName, setDepartmentData]);

  console.log("--> c.d");
  return (
    <>
      <Box>
        <TextField
          margin="normal"
          required
          id="department_name"
          label="Département"
          name="departmentName"
          autoComplete="name"
          autoFocus
          fullWidth
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
      </Box>
    </>
  );
}
