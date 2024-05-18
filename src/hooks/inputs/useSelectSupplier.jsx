import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetAllSupplier } from "../api/useSupplierApi";
import { useEffect, useState } from "react";

export default function useSelectSupplier({reset}) {
  const [supplier, setSupplier] = useState("");
  const allSupplier = useGetAllSupplier();
  console.log(allSupplier.data);
  const handleChange = (event) => {
    setSupplier(event.target.value);
  };
  useEffect(() => {
    setSupplier("")
  }, [reset])
  
  const renderHTML = (
    <>
      <FormControl fullWidth>
        <InputLabel id="dep_role_label">Fournisseur</InputLabel>
        <Select
          labelId="dep_role_label"
          id="department_select"
          value={supplier}
          label="Age"
          onChange={handleChange}
        >
          {allSupplier?.data?.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
  return { selectSupplierHTML: renderHTML, supplier };
}
