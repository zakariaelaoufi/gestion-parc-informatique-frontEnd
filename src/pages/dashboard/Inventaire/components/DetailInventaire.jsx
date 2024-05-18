import { Box, Grid } from "@mui/material";
import { useGetInventaireById } from "../../../../hooks/api/useInventaireApi";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TableHistorique from "./TableHistorique";

export default function DetailInventaire({ idInventaire }) {
  const inventaireByID = useGetInventaireById({ idInventaire }).data;
  if (!inventaireByID) return null;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item>
          <BlockInfo
            title={"Inventaire info"}
            infoList={[
              `Nom Produit : ${inventaireByID?.nomProduit}`,
              `Hostname : ${inventaireByID?.hostname}`,
              `Numero Serie : ${inventaireByID?.numeroSerie}`,
              `status : ${inventaireByID?.etat}`,
              `Categorie : ${inventaireByID?.categorie}`,
              `Marque : ${inventaireByID?.marque}`,
            ]}
          />
        </Grid>
      </Grid>
      <Box>
        <TabRender
          tabList={[
            {
              title: "Historique d'attribuation",
              component: <TableHistorique data={inventaireByID?.affecters} />,
            },
          ]}
        />
      </Box>
    </Box>
  );
}
