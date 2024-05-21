import { Box, Grid } from "@mui/material";
import { useGetCategorieById } from "../../../../hooks/api/useCategorieApi";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import CategorieProductInfo from "./CategorieProductInfo";

export default function DetailCategorie({ idCategorie }) {
  const categorieByID = useGetCategorieById({ idCategorie }).data;
  if (!categorieByID) return <></>;

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item>
          <BlockInfo
            title={"Categorie info"}
            infoList={[
              `Libelle : ${categorieByID?.libelle}`,
              `Abréviation : ${categorieByID?.abv}`,
              `Date de création : ${categorieByID?.dateCreation}`,
            ]}
          />
        </Grid>
      </Grid>
      <Box>
        <TabRender
          tabList={[
            {
              title: "Produits associés",
              component: (
                <CategorieProductInfo data={categorieByID?.produits} />
              ),
            },
          ]}
        />
      </Box>
    </Box>
  );
}
