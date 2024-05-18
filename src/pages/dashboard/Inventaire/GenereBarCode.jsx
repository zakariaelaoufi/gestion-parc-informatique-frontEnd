import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useGetAllInventaire } from "../../../hooks/api/useInventaireApi";
import { useState } from "react";
import BarCodeINV from "./components/BarCodeINV";
import SingleBarCodeProduit from "./components/SingleBarCodeProduit";
import TabRender from "../../../components/Tab/TabRender";
import BarCodeCategorie from "./components/BarCodeCategorie";

export default function GenereBarCode() {
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            my: 3,
            fontWeight: "bold",
            borderLeft: "5px solid ",
            borderLeftColor: "secondary.main",
            px: 1.5,
          }}
        >
          Imprimer Codebar
        </Typography>

        <Box
          sx={{
            width: "100%",
            p: 0,
            borderRadius: 2,
          }}
        >
          <TabRender
            tabList={[
              {
                title: "Generer BarCode pour un inventaire",
                component: <SingleBarCodeProduit />,
              },
              {
                title: "Generer BarCode par Categorie",
                component: <BarCodeCategorie />,
              },
            ]}
          />
          {/* /////// */}
        </Box>
      </Box>
    </>
  );
}
