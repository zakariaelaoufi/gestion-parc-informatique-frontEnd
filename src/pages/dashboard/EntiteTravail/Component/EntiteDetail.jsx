import { useGetEntiteTravailById } from "../../../../hooks/api/useEntiteTravailApi";
import { Box, Grid } from "@mui/material";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TravailInfo from "./TravailInfo";
import HistoriqueAttachment from "./HistoriqueAttachment";

export default function EntiteDetail({ idEntiteTravail }) {
  const entiteByID = useGetEntiteTravailById({ idEntiteTravail }).data;
  if (!entiteByID) return <></>;
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item>
          <BlockInfo
            title={"Entite info"}
            infoList={[
              `Nom Entite : ${(
                entiteByID?.typeEntiteTravail +
                " " +
                entiteByID?.nomEntiteTravail
              ).toUpperCase()}`,
              `Offre par : ${
                entiteByID?.parent !== null
                  ? (
                      entiteByID?.parent?.typeEntiteTravail +
                      " " +
                      entiteByID?.parent?.nomEntiteTravail
                    ).toUpperCase()
                  : "Aucun"
              }`,
            ]}
          />
        </Grid>
      </Grid>
      <Box>
        <TabRender
          tabList={[
            {
              title: "Historique des travailleurs",
              component: <TravailInfo data={entiteByID?.travaillerList} />,
            },
            {
              title: "Historique des machines attachées",
              component: (
                <HistoriqueAttachment data={entiteByID?.attacherList} />
              ),
            },
          ]}
        />
      </Box>
    </Box>
  );
}
