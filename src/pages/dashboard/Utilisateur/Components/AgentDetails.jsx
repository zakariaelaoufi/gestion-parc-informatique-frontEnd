import { Box, Grid } from "@mui/material";
import { useGetUtilisateurById } from "../../../../hooks/api/useUtilisateur";
import BlockInfo from "../../../../components/Utils/BlockInfo";
import TabRender from "../../../../components/Tab/TabRender";
import TableAgentHistorique from "./TableAgentHistorique";
import MachineAffecter from "./MachineAffecter";
import RapportSurMachineParUtilisateur from "./RapportSurMachineParUtilisateur";

export default function AgentDetails({ idUtilisateur }) {
  const AgentByID = useGetUtilisateurById({ idUtilisateur })?.data;

  if (!AgentByID) return <></>;

  const machineAffecterData = AgentByID?.travaillers?.map((e) => {
    return e?.affecters;
  });

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
              title={"Employé info"}
              infoList={[
                `Immatricule : ${AgentByID?.immatricule}`,
                `Nom : ${AgentByID?.nomUtilisateur}`,
                `Prenom : ${AgentByID?.prenomUtilisateur}`,
                `Email : ${AgentByID?.email}`,
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
          <RapportSurMachineParUtilisateur data={AgentByID} />
        </Box>
      </Box>
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
