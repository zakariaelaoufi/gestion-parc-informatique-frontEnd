import { useGetEntiteTravailById } from "../../../../hooks/api/useEntiteTravailApi";
import { Box, Grid } from "@mui/material";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TravailInfo from "./TravailInfo";
import HistoriqueAttachment from "./HistoriqueAttachment";
import Print from "../../../../components/Export/Print/Print";
import RapportParEntite from "./RapportParEntite";
import PrintIcon from "@mui/icons-material/Print";

export default function EntiteDetail({ idEntiteTravail }) {
  const entiteByID = useGetEntiteTravailById({ idEntiteTravail }).data;
  if (!entiteByID) return <></>;
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
        <Box
          sx={{
            width: "100%",
            mt: -1,
            display: "flex",
            alignItems: "start",
            justifyContent: "end",
          }}
        >
          <Print
            btnName="rapport des machines"
            variant="outlined"
            btnIcon={<PrintIcon />}
            color="primary"
            sx={{ px: 5, color: "white" }}
          >
            <RapportParEntite data={entiteByID} />
          </Print>
        </Box>
      </Box>
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
