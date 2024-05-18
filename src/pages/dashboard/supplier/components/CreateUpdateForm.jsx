import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

export function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setSupplierData = null,
}) {
  /********** state ***************** */

  const [supplierName, setSupplierName] = useState(
    isUpdate ? data?.supplier_name : ""
  );
  const [supplierDescription, setSupplierDescription] = useState(
    isUpdate ? data?.supplier_description : ""
  );

  /**********  Submit and validation ****************** */

  useEffect(() => {
    setSupplierData({
      supplierName,
      supplierDescription,
    });
  }, [supplierDescription, supplierName, setSupplierData]);

  console.log("--> c.Art");
  return (
    <>
      <Box>
        <TextField
          margin="normal"
          required
          id="supplier_name"
          label="Nom d'supplier"
          name="supplierName"
          autoFocus
          fullWidth
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />

        <TextField
          margin="normal"
          id="supplier_description"
          label="Description d'supplier"
          name="supplierDescription"
          fullWidth
          value={supplierDescription}
          onChange={(e) => setSupplierDescription(e.target.value)}
        />
      </Box>
    </>
  );
}
