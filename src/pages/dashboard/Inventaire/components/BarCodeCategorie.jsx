import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useGetAllInventaire } from "../../../../hooks/api/useInventaireApi";
import BarCodeINVCategorie from "./BarCodeINVCategorie";
import Print from "../../../../components/Export/Print/Print";
import PrintIcon from "@mui/icons-material/Print";

export default function BarCodeCategorie() {
  const [categorie, setCategorie] = useState("");
  const [typeBarcode, setTypeBarcode] = useState("CODE128");

  const allInventaire = useGetAllInventaire().data;

  if (!allInventaire) return <></>;

  const existenceCategorie = (categorie) => {
    return allInventaire?.some(
      (inv) => inv.categorie === categorie || inv.categorie === categorie
    );
  };
  const inventaireInfo = (categorie) => {
    return allInventaire?.filter((inv) => inv.categorie === categorie) || [];
  };

  return (
    <>
      <Box>
        <Box>
          <TextField
            fullWidth
            label="Choisir Categorie"
            variant="outlined"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
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
        {existenceCategorie(categorie) && inventaireInfo(categorie) && (
          <Print
            btnName="Imprimer"
            variant="outlined"
            btnIcon={<PrintIcon />}
            color="primary"
            sx={{ px: 5, color: "white" }}
          >
            <Box
              sx={{
                my: 2,
                display: "flex",
              }}
            >
              <BarCodeINVCategorie
                key={inventaireInfo(categorie)?.idInventaire}
                data={inventaireInfo(categorie)}
                typeBarcode={typeBarcode}
              />
            </Box>
          </Print>
        )}
      </Box>
    </>
  );
}
