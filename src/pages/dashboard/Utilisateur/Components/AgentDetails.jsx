import { Box, Grid } from "@mui/material";
import { useGetUtilisateurById } from "../../../../hooks/api/useUtilisateur";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TableAgentHistorique from "./TableAgentHistorique";
import { Component } from "react";
import MachineAffecter from "./MachineAffecter";

export default function AgentDetails({ idUtilisateur }) {
  const AgentByID = useGetUtilisateurById({ idUtilisateur })?.data;

  if (!AgentByID) return <></>;

  const machineAffecterData = AgentByID?.travaillers?.map((e) => {
    return e?.affecters;
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item>
          <BlockInfo
            title={"Agent info"}
            infoList={[
              `Immatricule : ${AgentByID?.immatricule}`,
              `Nom : ${AgentByID?.nomUtilisateur}`,
              `Prenom : ${AgentByID?.prenomUtilisateur}`,
              `Email : ${AgentByID?.email}`,
            ]}
          />
        </Grid>
      </Grid>
      <TabRender
        tabList={[
          {
            title: "Historique des machines occupées",
            component: <MachineAffecter data={machineAffecterData} />,
          },
          {
            title: "Historique des travaillers",
            component: (
              <TableAgentHistorique
                data={AgentByID?.travaillers}
                immatricule={AgentByID?.immatricule}
              />
            ),
          },
        ]}
      />
    </Box>
  );
}
