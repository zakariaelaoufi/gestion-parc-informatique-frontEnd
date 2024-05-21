import { Box, Grid } from "@mui/material";
import { useGetMarqueById } from "../../../../hooks/api/useMarqueApi";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import MarqueProductInfo from "./MarqueProductInfo";

export default function DetailMarque({ idMarque }) {
  const MarqueByID = useGetMarqueById({ idMarque }).data;
  if (!MarqueByID) return <></>;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item>
          <BlockInfo
            title={"Marque info"}
            infoList={[
              `Nom Marque : ${MarqueByID?.nomMarque}`,
              `Date de création : ${MarqueByID?.dateCreation}`,
            ]}
          />
        </Grid>
      </Grid>
      <Box>
        <TabRender
          tabList={[
            {
              title: "Produits associés",
              component: <MarqueProductInfo data={MarqueByID?.produits} />,
            },
          ]}
        />
      </Box>
    </Box>
  );
}
