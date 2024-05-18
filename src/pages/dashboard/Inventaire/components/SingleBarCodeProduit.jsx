import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import BarCodeINV from "./BarCodeINV";
import { useState } from "react";
import { useGetAllInventaire } from "../../../../hooks/api/useInventaireApi";

export default function SingleBarCodeProduit() {
  const [NSorHostname, setNSorHostname] = useState("");
  const [typeBarcode, setTypeBarcode] = useState("CODE128");

  const allInventaire = useGetAllInventaire().data;

  const existenceNSorHostname = (NSorHostname) => {
    return allInventaire?.some(
      (inv) => inv.hostname === NSorHostname || inv.numeroSerie === NSorHostname
    );
  };

  const inventaireInfo = (NSorHostname) => {
    return allInventaire?.find(
      (inv) => inv.hostname === NSorHostname || inv.numeroSerie === NSorHostname
    );
  };
  return (
    <>
      <Box>
        <Box>
          <TextField
            fullWidth
            label="N° de serie ou Hostname"
            variant="outlined"
            value={NSorHostname}
            onChange={(e) => setNSorHostname(e.target.value)}
            sx={{ my: 2 }}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="type_barcode">Type de codebar</InputLabel>
            <Select
              value={typeBarcode}
              label="Type de codebar"
              onChange={(e) => setTypeBarcode(e.target.value)}
            >
              <MenuItem value="CODE128">CODE128</MenuItem>
              <MenuItem value="CODE39">CODE39</MenuItem>
              <MenuItem value="EAN13">EAN13</MenuItem>
              <MenuItem value="UPC">UPC</MenuItem>
              <MenuItem value="ITF">ITF</MenuItem>
              <MenuItem value="MSI">MSI</MenuItem>
              <MenuItem value="codabar">Codabar</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {existenceNSorHostname(NSorHostname) ? (
          <BarCodeINV
            data={inventaireInfo(NSorHostname)}
            typeBarcode={typeBarcode}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
