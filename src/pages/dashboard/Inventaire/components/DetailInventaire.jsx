import { Box, Grid } from "@mui/material";
import { useGetInventaireById } from "../../../../hooks/api/useInventaireApi";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TableHistorique from "./TableHistorique";
import HistoriqueAttachment from "./HistoriqueAttachment";
import UpdateEtatIventaire from "./UpdateEtatIventaire";
import DeleteInventaire from "./DeleteInventaire";

export default function DetailInventaire({ idInventaire }) {
  const inventaireByID = useGetInventaireById({ idInventaire }).data;
  if (!inventaireByID) return null;
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "top",
        }}
      >
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
        {inventaireByID?.etat !== "ACTIF" && (
          <Box sx={{ mt: 1.5, display: "flex", alignItems: "start" }}>
            <UpdateEtatIventaire data={inventaireByID} />
            {inventaireByID?.etat !== "REFORME" && (
              <DeleteInventaire data={inventaireByID} />
            )}
          </Box>
        )}
      </Box>
      <Box>
        <TabRender
          tabList={[
            {
              title: "Historique d'utilisation",
              component: <TableHistorique data={inventaireByID?.affecters} />,
            },
            {
              title: "Historique d'attachement",
              component: (
                <HistoriqueAttachment data={inventaireByID?.attachers} />
              ),
            },
          ]}
        />
      </Box>
    </Box>
  );
}
