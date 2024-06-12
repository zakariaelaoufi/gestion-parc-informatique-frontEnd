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
import useSelectCategoriewithName from "../../../../hooks/inputs/useSelectCategoriewithName";

export default function BarCodeCategorie() {
  const [typeBarcode, setTypeBarcode] = useState("CODE128");
  const { selectCategorieHTML, Categorie } = useSelectCategoriewithName();

  const allInventaire = useGetAllInventaire().data;

  if (!allInventaire) return <></>;

  const existenceCategorie = (Categorie) => {
    return allInventaire?.some(
      (inv) => inv.categorie === Categorie || inv.categorie === Categorie
    );
  };
  const inventaireInfo = (Categorie) => {
    return allInventaire?.filter((inv) => inv.categorie === Categorie) || [];
  };

  return (
    <>
      <Box>
        <Box>
          <Box sx={{ my: 2 }}>{selectCategorieHTML}</Box>
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
        {existenceCategorie(Categorie) && inventaireInfo(Categorie) && (
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
                key={inventaireInfo(Categorie)?.idInventaire}
                data={inventaireInfo(Categorie)}
                typeBarcode={typeBarcode}
              />
            </Box>
          </Print>
        )}
      </Box>
    </>
  );
}
